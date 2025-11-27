"use client";
import { Checkbox } from "@nextui-org/react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function Step5() {
    const { register, getValues, setValue, formState: { errors } } = useFormContext();
    const allData = getValues();
    const [loading, setLoading] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [status, setStatus] = useState<"idle" | "created" | "failed">("idle");
    const lottieRef = React.useRef<HTMLDivElement | null>(null);
    const lottieAnimRef = React.useRef<any>(null);

    const handleSubmit = async () => {
        if (!confirmed) {
            alert("Please confirm the information is correct");
            return;
        }

        try {
            setLoading(true);

            // Load lottie animation
            const lottieModule: any = await import('lottie-web');
            const lottie = lottieModule.default || lottieModule;
            try {
                const lottieRes = await fetch('/sandyloading.lottie');
                if (lottieRes.ok) {
                    const contentType = lottieRes.headers.get('content-type') || '';
                    let lottieJson: any = null;

                    if (contentType.includes('application/json')) {
                        lottieJson = await lottieRes.json();
                    } else {
                        const ab = await lottieRes.arrayBuffer();
                        const bytes = new Uint8Array(ab);
                        const isZip = bytes[0] === 0x50 && bytes[1] === 0x4B;
                        if (!isZip) {
                            try {
                                const text = new TextDecoder().decode(ab);
                                lottieJson = JSON.parse(text);
                            } catch (parseErr) {
                                console.info('Could not parse lottie JSON');
                            }
                        }
                    }

                    if (lottieJson && lottieRef.current) {
                        try {
                            lottieAnimRef.current = lottie.loadAnimation({
                                container: lottieRef.current,
                                renderer: 'svg',
                                loop: true,
                                autoplay: true,
                                animationData: lottieJson,
                            });
                        } catch (innerErr) {
                            console.warn('lottie loadAnimation failed', innerErr);
                        }
                    }
                }
            } catch (e) {
                console.info('Could not load lottie');
            }

            const res = await fetch('/api/create-appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(allData),
            });

            const json = await res.json();

            if (json.status === "created") {
                setStatus("created");
                setValue("status", "created");
            } else {
                setStatus("failed");
                setValue("status", "failed");
            }
        } catch (err) {
            console.error('Failed to create appointment', err);
            setStatus("failed");
            setValue("status", "failed");
        } finally {
            setLoading(false);
            if (lottieAnimRef.current) {
                try { lottieAnimRef.current.destroy(); } catch (e) { }
                lottieAnimRef.current = null;
            }
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 flex-col gap-4">
                    {lottieAnimRef.current ? (
                        <div ref={lottieRef} style={{ width: 220, height: 220 }} />
                    ) : (
                        <div className="flex items-center justify-center">
                            <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin" />
                        </div>
                    )}
                    <p className="text-white">Creating your appointment...</p>
                </div>
            )}

            {status === "idle" && (
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-bold">Review Your Booking</h2>

                    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg mb-3">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <span className="text-gray-600">Name:</span>
                                    <p className="font-medium">{allData.fullName}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Email:</span>
                                    <p className="font-medium">{allData.email}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Phone:</span>
                                    <p className="font-medium">{allData.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-lg mb-3">Service Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <span className="text-gray-600">Service:</span>
                                    <p className="font-medium">{allData.serviceType}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Date & Time:</span>
                                    <p className="font-medium">{allData.appointmentDay} at {allData.appointmentHour}</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-lg mb-3">Location</h3>
                            <p className="font-medium">{allData.formatted_address || allData.address}</p>
                        </div>

                        {allData.additionalInfo && (
                            <div className="border-t pt-4">
                                <h3 className="font-semibold text-lg mb-3">Additional Information</h3>
                                <p className="font-medium">{allData.additionalInfo}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                        <Checkbox
                            isSelected={confirmed}
                            onValueChange={setConfirmed}
                        >
                            <span className="text-sm">
                                I confirm that all the information above is correct and I want to proceed with booking this appointment.
                            </span>
                        </Checkbox>
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!confirmed}
                        className={`w-full py-3 rounded-lg font-semibold ${confirmed
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        Confirm Booking
                    </button>
                </div>
            )}

            {status === "created" && (
                <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-700 mb-2">Booking Created!</h3>
                    <p className="text-sm text-green-800 mb-4">Your appointment has been successfully created. You will receive a calendar invitation at {allData.email}.</p>
                    <div className="text-sm text-gray-700">
                        <div><strong>Date:</strong> {allData.appointmentDay}</div>
                        <div><strong>Time:</strong> {allData.appointmentHour}</div>
                        <div><strong>Service:</strong> {allData.serviceType}</div>
                        <div className="mt-3">
                            <a
                                className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                href="/"
                            >
                                Done
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {status === "failed" && (
                <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-700 mb-2">Booking Failed</h3>
                    <p className="text-sm text-red-800 mb-4">There was an error creating your booking. Please try again.</p>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setStatus("idle")}
                            className="px-4 py-2 bg-white border rounded hover:bg-gray-50"
                        >
                            Go back
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
