"use client";
import { Checkbox, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function Step5() {
    const { register, getValues, setValue, formState: { errors } } = useFormContext();
    const allData = getValues();
    const [loading, setLoading] = useState(false);
    const lottieRef = React.useRef<HTMLDivElement | null>(null);
    const lottieAnimRef = React.useRef<any>(null);

    useEffect(() => {
        // Fetch availability from API
        const fetchAvailability = async () => {
            try {
                // start loading animation
                setLoading(true);
                // lazy import lottie-web
                const lottieModule: any = await import('lottie-web');
                const lottie = lottieModule.default || lottieModule;
                // try to fetch the JSON and render it
                try {
                    const lottieRes = await fetch('/sandyloading.lottie');
                    if (!lottieRes.ok) throw new Error('Failed to fetch lottie');
                    const contentType = lottieRes.headers.get('content-type') || '';
                    let lottieJson: any = null;

                    if (contentType.includes('application/json')) {
                        // response is JSON
                        lottieJson = await lottieRes.json();
                    } else {
                        // peek at the first bytes to detect a ZIP (.lottie is often a zipped archive)
                        const ab = await lottieRes.arrayBuffer();
                        const bytes = new Uint8Array(ab);
                        const isZip = bytes[0] === 0x50 && bytes[1] === 0x4B; // 'PK' header
                        if (isZip) {
                            // It's a zipped .lottie file (PK..). lottie-web expects a JSON animationData; skip.
                            console.info('sandyloading.lottie appears to be a zipped .lottie archive; skipping animation.');
                        } else {
                            // try to decode and parse as text JSON
                            try {
                                const text = new TextDecoder().decode(ab);
                                lottieJson = JSON.parse(text);
                            } catch (parseErr) {
                                console.info('Could not parse lottie JSON, skipping animation.');
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
                } catch (e) {
                    console.info('Could not load lottie, skipping animation');
                }
                const body = {
                    details: {
                        day: allData.appointmentDay,
                        hour: allData.appointmentHour,
                        clientName: allData.fullName,
                        clientEmail: allData.email,
                        clientPlace: allData.formatted_address || allData.address,
                        placeId: allData.place_id,
                        placeUrl: `https://www.google.com/maps/place/?q=place_id:${allData.place_id}`,
                        clientPhone: allData.phone,
                        service: allData.serviceType,
                        clientDescription: allData.additionalInfo || "",
                        serviceDuration: 2700
                    }
                };
                const res = await fetch('http://localhost:5678/webhook-test/8dfcc3a8-a92f-4e81-85cc-35427e1c7932', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'osmoz-appointments-key': `3zUZFg1RS2uRvpmuIh7awCv0joqa6u6mDBEsiz4tSFuUlt8obK8YU5RTSvl25g1l`,
                    },
                    body: JSON.stringify(body),
                });
                if (!res.ok) throw new Error('Network response was not ok');
                const json = await res.json();
                // Expecting array with object that has `output` array
                const out = Array.isArray(json) && json[0] && json[0].output ? json[0].output : [];
            } catch (err) {
                console.error('Failed to load availability', err);
            } finally {
                // stop loading and cleanup animation
                setLoading(false);
                if (lottieAnimRef.current) {
                    try { lottieAnimRef.current.destroy(); } catch (e) { }
                    lottieAnimRef.current = null;
                }
            }
        };
        fetchAvailability();
    }, []);

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
                    <p className="text-white">Loading available slots for your address...</p>
                </div>
            )}

            {!loading &&
                (
                    (allData?.status) === "created" ? (
                        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                            <h3 className="text-lg font-semibold text-green-700 mb-2">Booking created</h3>
                            <p className="text-sm text-green-800 mb-4">Your booking was created successfully.</p>
                            <div className="text-sm text-gray-700">
                                <div><strong>Day:</strong> {allData?.appointmentDay || "-"}</div>
                                <div><strong>Hour:</strong> {allData?.appointmentHour || "-"}</div>
                                <div><strong>Name:</strong> {allData?.fullName || "-"}</div>
                                <div className="mt-3">
                                    <a
                                        className="inline-block px-4 py-2 bg-green-600 text-white rounded"
                                        href="/"
                                    >
                                        Done
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                            <h3 className="text-lg font-semibold text-red-700 mb-2">Booking failed</h3>
                            <p className="text-sm text-red-800 mb-4">There was an error creating your booking.</p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-4 py-2 bg-white border rounded"
                                >
                                    Go back
                                </button>
                                <button
                                    type="button"
                                    onClick={() => window.location.reload()}
                                    className="px-4 py-2 bg-red-600 text-white rounded"
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    )

                )}
        </div>
    );
}
