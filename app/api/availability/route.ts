import { google } from "googleapis";
import { NextResponse } from "next/server";

// Helper to get Google Auth Client
const getGoogleAuthClient = () => {

    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
        throw new Error("Missing Google Auth Credentials");
    }

    const oauth2Client = new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
        refresh_token: GOOGLE_REFRESH_TOKEN,
    });

    return oauth2Client;
};

// Helper to calculate travel time
async function getTravelTime(origin: string, destination: string) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return 0;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.rows[0].elements[0].status === "OK") {
            return data.rows[0].elements[0].duration.value; // seconds
        }
    } catch (error) {
        console.error("Error fetching distance matrix:", error);
    }
    return 0; // Default to 0 if fails (should handle error better in prod)
}

export async function POST(request: Request) {
    try {
        const { address, date, lat, lng, serviceDuration = 3600 } = await request.json(); // serviceDuration in seconds

        if (!address || !date) {
            return NextResponse.json({ error: "Missing address or date" }, { status: 400 });
        }

        const auth = getGoogleAuthClient();
        const calendar = google.calendar({ version: "v3", auth });

        // Define time range: Selected Date 00:00 to +7 days 23:59
        const timeMin = new Date(date);
        timeMin.setHours(0, 0, 0, 0);

        const timeMax = new Date(timeMin);
        timeMax.setDate(timeMax.getDate() + 7);
        timeMax.setHours(23, 59, 59, 999);

        const eventsRes = await calendar.events.list({
            calendarId: "primary",
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString(),
            singleEvents: true,
            orderBy: "startTime",
        });

        const events = eventsRes.data.items || [];

        const availableSlots = [];
        const workingHoursStart = 9;
        const workingHoursEnd = 17;
        const slotDuration = 3600; // 1 hour slots for checking

        // Iterate through next 7 days
        for (let i = 0; i < 7; i++) {
            const currentDay = new Date(timeMin);
            currentDay.setDate(currentDay.getDate() + i);
            const dayString = currentDay.toISOString().split('T')[0];

            // Filter events for this day
            const dayEvents = events.filter(e => {
                if (!e.start?.dateTime) return false;
                return e.start.dateTime.startsWith(dayString);
            });

            const slots = [];
            // Check every hour
            for (let hour = workingHoursStart; hour < workingHoursEnd; hour++) {
                const slotTime = `${hour.toString().padStart(2, '0')}:00`;
                const slotStart = new Date(`${dayString}T${slotTime}:00`);
                const slotEnd = new Date(slotStart.getTime() + serviceDuration * 1000);

                // 1. Check for direct overlap
                const isOverlapping = dayEvents.some(e => {
                    const start = new Date(e.start?.dateTime || "");
                    const end = new Date(e.end?.dateTime || "");
                    return (slotStart < end && slotEnd > start);
                });

                if (isOverlapping) continue;

                // 2. Check Travel Time
                // Find previous event
                const previousEvent = dayEvents
                    .filter(e => new Date(e.end?.dateTime || "") <= slotStart)
                    .sort((a, b) => new Date(b.end?.dateTime || "").getTime() - new Date(a.end?.dateTime || "").getTime())[0];

                // Find next event
                const nextEvent = dayEvents
                    .filter(e => new Date(e.start?.dateTime || "") >= slotEnd)
                    .sort((a, b) => new Date(a.start?.dateTime || "").getTime() - new Date(b.start?.dateTime || "").getTime())[0];

                let valid = true;

                // Check travel from previous event
                if (previousEvent) {
                    // Extract lat/lng from description
                    // Assuming format "Lat: 12.34, Lng: 56.78" or similar
                    const desc = previousEvent.description || "";
                    const latMatch = desc.match(/Lat:?\s*(-?\d+(\.\d+)?)/i);
                    const lngMatch = desc.match(/Lng:?\s*(-?\d+(\.\d+)?)/i);

                    if (latMatch && lngMatch) {
                        const prevLat = latMatch[1];
                        const prevLng = lngMatch[1];
                        const origin = `${prevLat},${prevLng}`;
                        const destination = `${lat},${lng}`;

                        const travelTime = await getTravelTime(origin, destination);
                        const prevEnd = new Date(previousEvent.end?.dateTime || "").getTime();
                        const arrivalTime = prevEnd + (travelTime * 1000);

                        if (arrivalTime > slotStart.getTime()) {
                            valid = false;
                        }
                    }
                }

                // Check travel to next event
                if (valid && nextEvent) {
                    const desc = nextEvent.description || "";
                    const latMatch = desc.match(/Lat:?\s*(-?\d+(\.\d+)?)/i);
                    const lngMatch = desc.match(/Lng:?\s*(-?\d+(\.\d+)?)/i);

                    if (latMatch && lngMatch) {
                        const nextLat = latMatch[1];
                        const nextLng = lngMatch[1];
                        const origin = `${lat},${lng}`;
                        const destination = `${nextLat},${nextLng}`;

                        const travelTime = await getTravelTime(origin, destination);
                        const departureTime = slotEnd.getTime();
                        const nextStart = new Date(nextEvent.start?.dateTime || "").getTime();

                        if (departureTime + (travelTime * 1000) > nextStart) {
                            valid = false;
                        }
                    }
                }

                if (valid) {
                    slots.push(slotTime);
                }
            }

            if (slots.length > 0) {
                availableSlots.push({
                    id: i + 1,
                    day: dayString,
                    hours: slots
                });
            }
        }

        return NextResponse.json(availableSlots);

    } catch (error) {
        console.error("Availability API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
