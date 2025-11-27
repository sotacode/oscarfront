import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-11-17.clover",
});

// Service pricing in cents (USD)
const SERVICE_PRICES: Record<string, number> = {
    consultation: 2000, // $20.00
    maintenance: 2500,  // $25.00
    repair: 3500,       // $35.00
};

export async function POST(request: Request) {
    try {
        const { serviceType } = await request.json();

        if (!serviceType) {
            return NextResponse.json({ error: "Service type is required" }, { status: 400 });
        }

        // Get price from server-side mapping (secure - client can't manipulate)
        const amount = SERVICE_PRICES[serviceType.toLowerCase()];

        if (!amount) {
            return NextResponse.json({ error: "Invalid service type" }, { status: 400 });
        }

        // Create Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            metadata: {
                serviceType,
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            amount,
        });
    } catch (error) {
        console.error("Payment Intent Error:", error);
        return NextResponse.json(
            { error: "Failed to create payment intent" },
            { status: 500 }
        );
    }
}
