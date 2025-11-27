"use client";
import { Checkbox, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function Step4() {
    const { register, getValues, setValue, formState: { errors } } = useFormContext();
    const allData = getValues();
    const [availability, setAvailability] = useState<any[]>([]);
    const [selectedDayForView, setSelectedDayForView] = useState<number | null>(null); // For dropdown selection
    const [selectedDayId, setSelectedDayId] = useState<number | null>(null); // For final appointment
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

    // Get the currently selected day's data
    const selectedDayData = selectedDayForView ? availability.find(d => d.id === selectedDayForView) : null;

    return (
        <div className="flex flex-col gap-6">
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 flex-col gap-4">
                    {lottieAnimRef.current ? (
                        <div ref={lottieRef} style={{ width: 220, height: 220 }} />
                    ) : (
                        <div className="flex items-center justify-center">
                            <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin" />
                        </div>
                    )}
                    <p className="text-white text-center px-4">Loading available slots for your address...</p>
                </div>
            )}

            {/* Header Section */}
            <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-secondary">Select Your Appointment</h2>
                <p className="text-sm md:text-base text-gray-600">Choose a date and time that works best for you</p>
            </div>

            {/* Day Selector */}
            <div className="space-y-4">
                {availability.length === 0 && !loading && (
                    <div className="text-center py-8 px-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No available slots found. Please try again later.</p>
                    </div>
                )}

                {availability.length > 0 && (
                    <>
                        {/* Day Dropdown */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-secondary text-sm md:text-base">
                                Select a Day
                            </label>
                            <select
                                className="w-full px-4 py-3 md:py-3.5 rounded-lg border-2 border-gray-200 bg-white text-secondary font-medium text-sm md:text-base
                                    focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
                                    transition-all duration-200 cursor-pointer
                                    hover:border-gray-300"
                                value={selectedDayForView || ''}
                                onChange={(e) => {
                                    const dayId = e.target.value ? parseInt(e.target.value) : null;
                                    setSelectedDayForView(dayId);
                                    // Reset hour selection when day changes
                                    setSelectedHour(null);
                                    setSelectedDayId(null);
                                    setValue('appointmentDay', '', { shouldValidate: false });
                                    setValue('appointmentHour', '', { shouldValidate: false });
                                }}
                            >
                                <option value="">Choose a day...</option>
                                {availability.map(day => (
                                    <option key={day.id} value={day.id}>
                                        {day.day} ({day.hours.length} slots available)
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Time Slots for Selected Day */}
                        {selectedDayData && (
                            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
                                {/* Day Header */}
                                <div className="mb-4 pb-3 border-b border-gray-100">
                                    <h3 className="font-bold text-lg md:text-xl text-secondary">
                                        {selectedDayData.day}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {selectedDayData.hours.length} time slots available
                                    </p>
                                </div>

                                {/* Time Slots Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
                                    {selectedDayData.hours.map((h: string) => {
                                        const selected = selectedDayId === selectedDayData.id && selectedHour === h;
                                        return (
                                            <button
                                                key={h}
                                                type="button"
                                                className={`
                                                    px-4 py-3 md:py-3.5 rounded-lg font-medium text-sm md:text-base
                                                    transition-all duration-200 transform
                                                    ${selected
                                                        ? 'bg-primary text-white shadow-md scale-105 ring-2 ring-primary ring-offset-2'
                                                        : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 active:scale-95'
                                                    }
                                                `}
                                                onClick={() => chooseSlot(selectedDayData.id, h, selectedDayData.day)}
                                            >
                                                {h}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Prompt to select a day if none selected */}
                        {!selectedDayForView && (
                            <div className="flex items-center gap-2 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm md:text-base text-blue-700 font-medium">
                                    Please select a day from the dropdown above to view available time slots
                                </p>
                            </div>
                        )}

                        {/* Selection Status */}
                        {selectedDayId && selectedHour ? (
                            <div className="flex items-center gap-2 p-4 bg-primary/10 border-2 border-primary/30 rounded-lg">
                                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm md:text-base text-secondary font-medium">
                                    Selected: <span className="font-bold">{availability.find(d => d.id === selectedDayId)?.day} at {selectedHour}</span>
                                </p>
                            </div>
                        ) : selectedDayForView && (
                            <div className="flex items-center gap-2 p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
                                <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm md:text-base text-orange-700 font-medium">
                                    Please select a time slot to continue
                                </p>
                            </div>
                        )}
                    </>
                )}

                {/* Hidden inputs registered with react-hook-form so Zod can validate them */}
                <input type="hidden" {...register('appointmentDay')} />
                <input type="hidden" {...register('appointmentHour')} />
            </div>

            {/* Error Messages */}
            {errors.appointmentDay && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {errors.appointmentDay.message?.toString()}
                </div>
            )}
            {errors.appointmentHour && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {errors.appointmentHour.message?.toString()}
                </div>
            )}
            {errors.confirm && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {errors.confirm.message?.toString()}
                </div>
            )}
        </div>
    );
}
