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

export async function GET() {
    try {
        const auth = getGoogleAuthClient();
        const calendar = google.calendar({ version: "v3", auth });

        // Try to fetch events from the next 7 days
        const timeMin = new Date();
        const timeMax = new Date();
        timeMax.setDate(timeMax.getDate() + 7);

        const eventsRes = await calendar.events.list({
            calendarId: "primary",
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString(),
            singleEvents: true,
            orderBy: "startTime",
        });

        const events = eventsRes.data.items || [];

        return NextResponse.json({
            success: true,
            message: "Successfully connected to Google Calendar!",
            eventCount: events.length,
            events: events.map(e => ({
                summary: e.summary,
                start: e.start?.dateTime || e.start?.date,
                end: e.end?.dateTime || e.end?.date,
                description: e.description?.substring(0, 100) + "..." // First 100 chars
            })),
            debugInfo: {
                hasAuth: !!auth,
                hasCalendar: !!calendar,
                timeRange: {
                    from: timeMin.toISOString(),
                    to: timeMax.toISOString()
                }
            }
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            errorDetails: error.toString(),
            message: "Failed to connect to Google Calendar. Check if refresh token is valid."
        }, { status: 500 });
    }
}
