"use client";
import { Checkbox } from "@nextui-org/react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function Step5() {
    const { register, getValues, formState: { errors } } = useFormContext();
    const allData = getValues();
    const [confirmed, setConfirmed] = useState(false);

    return (
        <div className="flex flex-col gap-6">
            {/* Header Section */}
            <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-secondary">Review Your Booking</h2>
                <p className="text-sm md:text-base text-gray-600">Please review all details before proceeding to payment</p>
            </div>

            {/* Personal Information Card */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h3 className="font-bold text-base md:text-lg text-secondary">Personal Information</h3>
                </div>
                <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-sm md:text-base text-gray-600 font-medium min-w-[80px]">Name:</span>
                        <p className="text-sm md:text-base font-semibold text-secondary break-words">{allData.fullName}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-sm md:text-base text-gray-600 font-medium min-w-[80px]">Email:</span>
                        <p className="text-sm md:text-base font-semibold text-secondary break-all">{allData.email}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-sm md:text-base text-gray-600 font-medium min-w-[80px]">Phone:</span>
                        <p className="text-sm md:text-base font-semibold text-secondary break-words">{allData.phone}</p>
                    </div>
                </div>
            </div>

            {/* Service Details Card */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <h3 className="font-bold text-base md:text-lg text-secondary">Service Details</h3>
                </div>
                <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-sm md:text-base text-gray-600 font-medium min-w-[100px]">Service:</span>
                        <p className="text-sm md:text-base font-semibold text-secondary capitalize break-words">{allData.serviceType}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-sm md:text-base text-gray-600 font-medium min-w-[100px]">Date & Time:</span>
                        <p className="text-sm md:text-base font-semibold text-secondary break-words">{allData.appointmentDay} at {allData.appointmentHour}</p>
                    </div>
                </div>
            </div>

            {/* Location Card */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="font-bold text-base md:text-lg text-secondary">Service Location</h3>
                </div>
                <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm md:text-base font-medium text-secondary break-words flex-1">
                        {allData.formatted_address || allData.address}
                    </p>
                </div>
            </div>

            {/* Additional Information Card (conditional) */}
            {allData.additionalInfo && (
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <h3 className="font-bold text-base md:text-lg text-secondary">Additional Information</h3>
                    </div>
                    <p className="text-sm md:text-base text-secondary break-words whitespace-pre-wrap">
                        {allData.additionalInfo}
                    </p>
                </div>
            )}

            {/* Confirmation Checkbox */}
            <div className="bg-primary/5 border-2 border-primary/30 rounded-xl p-4 md:p-5">
                <Checkbox
                    {...register("confirm")}
                    isSelected={confirmed}
                    onValueChange={setConfirmed}
                    classNames={{
                        base: "max-w-full",
                        label: "text-sm md:text-base text-secondary font-medium w-full"
                    }}
                >
                    <span className="text-sm md:text-base leading-relaxed">
                        I confirm that all the information above is correct and I want to proceed with booking this appointment.
                    </span>
                </Checkbox>
            </div>

            {/* Error Message */}
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
