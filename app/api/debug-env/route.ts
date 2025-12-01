import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        // Check if environment variables exist (don't expose actual values)
        hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
        hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
        hasRefreshToken: !!process.env.GOOGLE_REFRESH_TOKEN,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        hasGoogleMapsServerKey: !!process.env.GOOGLE_MAPS_SERVER_API_KEY,
        hasGoogleMapsPublicKey: !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        hasStripePublicKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        hasStripeSecretKey: !!process.env.STRIPE_SECRET_KEY,

        // Show actual NEXTAUTH_URL to verify it matches deployment
        nextAuthUrl: process.env.NEXTAUTH_URL,

        // Show Vercel system variables
        vercelUrl: process.env.VERCEL_URL,
        vercelEnv: process.env.VERCEL_ENV, // 'production', 'preview', or 'development'

        // Helpful message
        message: "⚠️ DELETE THIS FILE AFTER DEBUGGING! It exposes sensitive info about your environment variables."
    });
}
