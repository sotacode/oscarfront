"use client";
import { useFormContext } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { CheckCircle, XCircle } from "lucide-react";

export default function Step7() {
    const { getValues } = useFormContext();
    const allData = getValues();

    console.log("Step 7 - allData:", { status: allData.status, paymentStatus: allData.paymentStatus });

    const isSuccess = allData.status === "created" && allData.paymentStatus === "succeeded";

    if (isSuccess) {
        return (
            <div className="flex flex-col gap-6">
                {/* Success Icon and Header */}
                <div className="flex flex-col items-center gap-4 py-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                        <CheckCircle className="w-12 h-12 md:w-14 md:h-14 text-primary" strokeWidth={2.5} />
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-secondary">Booking Confirmed!</h2>
                        <p className="text-sm md:text-base text-gray-600 max-w-md">
                            Your payment was successful and your appointment has been created
                        </p>
                    </div>
                </div>

                {/* Appointment Details Card */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        <h3 className="font-bold text-base md:text-lg text-secondary">Appointment Details</h3>
                    </div>

                    <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 pb-3 border-b border-gray-100">
                            <span className="text-sm md:text-base text-gray-600 font-medium">Service:</span>
                            <span className="text-sm md:text-base font-semibold text-secondary capitalize">{allData.serviceType}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 pb-3 border-b border-gray-100">
                            <span className="text-sm md:text-base text-gray-600 font-medium">Date:</span>
                            <span className="text-sm md:text-base font-semibold text-secondary">{allData.appointmentDay}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 pb-3 border-b border-gray-100">
                            <span className="text-sm md:text-base text-gray-600 font-medium">Time:</span>
                            <span className="text-sm md:text-base font-semibold text-secondary">{allData.appointmentHour}</span>
                        </div>

                        <div className="flex flex-col gap-1 pb-3 border-b border-gray-100">
                            <span className="text-sm md:text-base text-gray-600 font-medium">Location:</span>
                            <span className="text-sm md:text-base font-semibold text-secondary break-words">
                                {allData.formatted_address || allData.address}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 pt-1">
                            <span className="text-sm md:text-base text-gray-600 font-medium">Confirmation sent to:</span>
                            <span className="text-sm md:text-base font-semibold text-secondary break-all">{allData.email}</span>
                        </div>
                    </div>
                </div>

                {/* Email Notification Banner */}
                <div className="bg-primary/5 border-2 border-primary/30 rounded-xl p-4 md:p-5">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm md:text-base text-secondary font-medium leading-relaxed">
                            A calendar invitation has been sent to your email. Please check your inbox for the appointment details.
                        </p>
                    </div>
                </div>

                {/* Home Button */}
                <Button
                    as="a"
                    href="/"
                    color="primary"
                    size="lg"
                    className="w-full font-semibold text-base md:text-lg"
                >
                    Continue to Home
                </Button>
            </div>
        );
    }

    // Error state
    return (
        <div className="flex flex-col gap-6">
            {/* Error Icon and Header */}
            <div className="flex flex-col items-center gap-4 py-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-red-50 rounded-full flex items-center justify-center">
                    <XCircle className="w-12 h-12 md:w-14 md:h-14 text-red-600" strokeWidth={2.5} />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-red-700">Booking Failed</h2>
                    <p className="text-sm md:text-base text-gray-600 max-w-md">
                        We encountered an issue processing your booking. Please try again.
                    </p>
                </div>
            </div>

            {/* Error Details Card */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 md:p-6">
                <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                        <p className="text-sm md:text-base text-red-800 font-medium leading-relaxed">
                            {allData.paymentStatus !== "succeeded"
                                ? "Payment was not completed successfully. Your card has not been charged."
                                : "Payment succeeded but appointment creation failed. Please contact support with your payment confirmation."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Support Info (if payment succeeded but appointment failed) */}
            {allData.paymentStatus === "succeeded" && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 md:p-5">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm md:text-base text-blue-800 font-medium leading-relaxed">
                            Please save your payment confirmation and contact our support team for assistance.
                        </p>
                    </div>
                </div>
            )}

            {/* Try Again Button */}
            <Button
                as="a"
                href="/booking"
                color="danger"
                size="lg"
                className="w-full font-semibold text-base md:text-lg"
            >
                Try Again
            </Button>
        </div>
    );
}
