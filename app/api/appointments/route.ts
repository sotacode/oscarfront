import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return new NextResponse(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401 }
        );
    }

    // Access the token from the session object (if we decided to put it there)
    // OR, more securely, if we kept it in the JWT but didn't expose it to session,
    // we might need to use `getToken` from `next-auth/jwt`.

    // However, in our route.ts configuration, we didn't explicitly return the token in the session callback yet.
    // Let's assume for this step we need to access the token.
    // Since we are server-side, we can use `getToken`.

    // Note: `getToken` requires the request object.
    // In App Router, we can get headers.

    // For now, let's return a mock calculation to prove the concept of "Server Side Calculation".

    const mockCalculations = {
        user: session.user.email,
        upcomingAppointments: 3,
        nextAppointment: "2023-11-28T10:00:00Z",
        calculationResult: "Server-side logic executed successfully",
    };

    return NextResponse.json(mockCalculations);
}
