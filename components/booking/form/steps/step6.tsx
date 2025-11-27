"use client";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@nextui-org/react";
import { useStepNavigation } from "../FormWrapper";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Service prices for display
const SERVICE_PRICES: Record<string, number> = {
    consultation: 20,
    maintenance: 25,
    repair: 35,
};

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const { getValues, setValue } = useFormContext();
    const navigation = useStepNavigation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const allData = getValues();

    const handleSubmit = async () => {
        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error: submitError } = await elements.submit();
            if (submitError) {
                setError(submitError.message || "Payment failed");
                setLoading(false);
                return;
            }

            const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
                elements,
                redirect: "if_required",
            });

            if (confirmError) {
                setError(confirmError.message || "Payment failed");
                setLoading(false);
                return;
            }

            if (paymentIntent && paymentIntent.status === "succeeded") {
                // Payment successful - now create appointment
                const appointmentRes = await fetch('/api/create-appointment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...allData,
                        paymentIntentId: paymentIntent.id,
                    }),
                });

                const appointmentJson = await appointmentRes.json();

                if (appointmentJson.status === "created") {
                    setValue("status", "created");
                    setValue("paymentStatus", "succeeded");
                } else {
                    setValue("status", "failed");
                    setValue("paymentStatus", "succeeded");
                }

                // Navigate to Step 7
                setTimeout(() => {
                    navigation?.goToNextStep();
                }, 100);
            }
        } catch (err) {
            setValue("status", "failed");
            setValue("paymentStatus", "failed");
            setError("An unexpected error occurred");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const price = SERVICE_PRICES[allData.serviceType?.toLowerCase()] || 0;

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Payment Summary</h3>
                <div className="flex justify-between">
                    <span>Service: {allData.serviceType}</span>
                    <span className="font-bold">${price}.00 NZD</span>
                </div>
            </div>

            <div className="border p-4 rounded-lg">
                <PaymentElement />
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
                    {error}
                </div>
            )}

            <Button
                type="button"
                color="primary"
                size="lg"
                isLoading={loading}
                disabled={!stripe || loading}
                className="w-full"
                onPress={handleSubmit}
            >
                {loading ? "Processing..." : `Pay $${price}.00`}
            </Button>
        </div>
    );
}

export default function Step6() {
    const { getValues } = useFormContext();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const allData = getValues();

    useEffect(() => {
        // Create payment intent when component mounts
        const createPaymentIntent = async () => {
            try {
                const res = await fetch('/api/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        serviceType: allData.serviceType,
                    }),
                });

                const data = await res.json();
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error("Failed to create payment intent:", error);
            } finally {
                setLoading(false);
            }
        };

        createPaymentIntent();
    }, [allData.serviceType]);

    // Don't render payment form if we're done (will show Step 7 instead)
    if (allData.status === "created" || allData.status === "failed") {
        return null;
    }

    if (loading || !clientSecret) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="w-16 h-16 border-4 border-t-transparent border-blue-600 rounded-full animate-spin" />
            </div>
        );
    }

    const options = {
        clientSecret,
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Payment</h2>
            <p className="text-gray-600">Complete your payment to confirm the booking.</p>

            <Elements stripe={stripePromise} options={options}>
                <PaymentForm />
            </Elements>
        </div>
    );
}
