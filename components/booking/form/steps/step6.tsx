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
            {/* Payment Summary Card */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <h3 className="font-bold text-base md:text-lg text-secondary">Payment Summary</h3>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-gray-600 font-medium capitalize">Service: {allData.serviceType}</span>
                    <span className="text-lg md:text-xl font-bold text-primary">${price}.00 NZD</span>
                </div>
            </div>

            {/* Payment Element - No wrapper to avoid touch interference */}
            <div className="-mx-1">
                <PaymentElement
                    options={{
                        layout: {
                            type: 'accordion',
                            defaultCollapsed: false,
                            radios: true,
                            spacedAccordionItems: true
                        }
                    }}
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="flex items-center gap-2 p-3 md:p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-600">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm md:text-base font-medium">{error}</span>
                </div>
            )}

            {/* Pay Button */}
            <Button
                type="button"
                color="primary"
                size="lg"
                isLoading={loading}
                disabled={!stripe || loading}
                className="w-full font-semibold text-base md:text-lg"
                onPress={handleSubmit}
            >
                {loading ? "Processing Payment..." : `Pay $${price}.00 NZD`}
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
        appearance: {
            theme: 'stripe' as const,
            variables: {
                colorPrimary: '#00a79e',
                colorBackground: '#ffffff',
                colorText: '#303642',
                colorDanger: '#df1b41',
                fontFamily: 'system-ui, sans-serif',
                spacingUnit: '4px',
                borderRadius: '8px',
            },
        },
        loader: 'auto' as const,
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Header Section */}
            <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-secondary">Payment</h2>
                <p className="text-sm md:text-base text-gray-600">Complete your payment to confirm the booking</p>
            </div>

            <Elements stripe={stripePromise} options={options}>
                <PaymentForm />
            </Elements>
        </div>
    );
}
