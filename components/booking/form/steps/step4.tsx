"use client";
import { Checkbox, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function Step4() {
    const { register, getValues, setValue, formState: { errors } } = useFormContext();
    const allData = getValues();
    const [availability, setAvailability] = useState<any[]>([]);
    const [selectedDayId, setSelectedDayId] = useState<number | null>(null);
    const [selectedHour, setSelectedHour] = useState<string | null>(null);
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
                const res = await fetch('/api/availability', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        address: allData.formatted_address || allData.address,
                        date: new Date().toISOString().split('T')[0], // Start from today
                        lat: allData.lat,
                        lng: allData.lng
                    }),
                });
                if (!res.ok) throw new Error('Network response was not ok');
                const json = await res.json();
                setAvailability(json);
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

    const chooseSlot = (dayId: number, hour: string, dayLabel: string) => {
        setSelectedDayId(dayId);
        setSelectedHour(hour);
        console.log('Chosen slot:', availability[dayId - 1].day, hour);
        // update registered fields and trigger validation immediately
        setValue('appointmentDay', dayLabel, { shouldValidate: true });
        setValue('appointmentHour', hour, { shouldValidate: true });
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
                    <p className="text-white">Loading available slots for your address...</p>
                </div>
            )}
            <div className="mb-4">
                <label className="font-semibold mb-2 block">Select an appointment slot</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {availability.map(day => (
                        <div key={day.id} className="border rounded-lg p-3">
                            <div className="font-semibold mb-2">{day.day}</div>
                            <div className="flex flex-wrap gap-2">
                                {day.hours.map((h: string) => {
                                    const selected = selectedDayId === day.id && selectedHour === h;
                                    return (
                                        <button
                                            key={h}
                                            type="button"
                                            className={`px-3 py-1 rounded ${selected ? 'bg-green-600 text-white' : 'bg-white border'}`}
                                            onClick={() => chooseSlot(day.id, h, day.day)}
                                        >
                                            {h}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                {(!selectedDayId || !selectedHour) && (
                    <div className="text-red-500 text-sm mt-2">Please select a slot</div>
                )}
                {/* Hidden inputs registered with react-hook-form so Zod can validate them */}
                <input type="hidden" {...register('appointmentDay')} />
                <input type="hidden" {...register('appointmentHour')} />
            </div>

            {/* <Checkbox {...register("confirm")}> 
                I confirm the information is correct
            </Checkbox> */}
            {errors.appointmentDay && <div className="text-red-500 text-sm mt-2">{errors.appointmentDay.message?.toString()}</div>}
            {errors.appointmentHour && <div className="text-red-500 text-sm mt-2">{errors.appointmentHour.message?.toString()}</div>}
            {errors.confirm && (
                <div className="text-red-500 text-sm mb-2">{errors.confirm.message?.toString()}</div>
            )}
        </div>
    );
}
