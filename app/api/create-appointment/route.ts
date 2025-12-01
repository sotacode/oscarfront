import { google } from "googleapis";
import { NextResponse } from "next/server";
import businessConfig, { getServiceDuration, createNZDateTimeString } from "@/config/business";

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

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            fullName,
            email,
            phone,
            serviceType,
            address,
            place_id,
            appointmentDay,
            appointmentHour,
            additionalInfo,
            lat,
            lng,
        } = body;

        if (!fullName || !email || !serviceType || !address || !appointmentDay || !appointmentHour) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const auth = getGoogleAuthClient();
        const calendar = google.calendar({ version: "v3", auth });

        // Get service duration from business config
        const duration = getServiceDuration(serviceType);

        // Create datetime in Pacific/Auckland timezone with automatic DST handling
        const startDateTimeString = createNZDateTimeString(appointmentDay, appointmentHour);

        // DEBUG: Log the datetime string being created
        console.log("Creating appointment:");
        console.log("  Input:", appointmentDay, appointmentHour);
        console.log("  DateTime string:", startDateTimeString);

        const startDateTime = new Date(startDateTimeString);
        console.log("  Parsed Date:", startDateTime.toISOString());
        console.log("  NZ Time:", startDateTime.toLocaleString('en-NZ', { timeZone: 'Pacific/Auckland' }));

        // Calculate end time
        const endDateTime = new Date(startDateTime.getTime() + (duration * 1000));

        // Format description with location coordinates for travel time calculation
        const placeUrl = place_id
            ? `https://www.google.com/maps/place/?q=place_id:${place_id}`
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

        const description = `Kia ora,
Client Name: ${fullName}
Service: ${serviceType}
Issue Description: ${body.issueDescription || 'No description provided.'}
Additional Notes: ${additionalInfo || 'None'}
Location: ${address} - ${placeUrl}
Phone contact: ${phone}

Coordinates (for travel time calculation):
Lat: ${lat}
Lng: ${lng}`;

        // Create event
        const event = {
            summary: `${fullName} - ${serviceType}`,
            location: address,
            description: description,
            start: {
                dateTime: startDateTime.toISOString(),
                timeZone: businessConfig.timezone,
            },
            end: {
                dateTime: endDateTime.toISOString(),
                timeZone: businessConfig.timezone,
            },
            attendees: [
                { email: email }
            ],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },
                    { method: 'popup', minutes: 30 },
                ],
            },
        };

        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
            sendUpdates: 'all',
        });

        return NextResponse.json({
            status: "created",
            eventId: response.data.id,
            eventLink: response.data.htmlLink,
            debug: {
                inputTime: `${appointmentDay} ${appointmentHour}`,
                dateTimeString: startDateTimeString,
                parsedISO: startDateTime.toISOString(),
            }
        });

    } catch (error) {
        console.error("Create Appointment API Error:", error);
        return NextResponse.json({
            status: "failed",
            error: error instanceof Error ? error.message : "Internal Server Error"
        }, { status: 500 });
    }
}
