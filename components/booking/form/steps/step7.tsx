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
            <div className="flex flex-col items-center gap-6 p-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>

                <div className="text-center">
                    <h2 className="text-3xl font-bold text-green-700 mb-2">Booking Confirmed!</h2>
                    <p className="text-gray-600">Your payment was successful and your appointment has been created.</p>
                </div>

                <div className="w-full max-w-md bg-gray-50 rounded-lg p-6 space-y-3">
                    <h3 className="font-semibold text-lg mb-4">Appointment Details</h3>

                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Service:</span>
                        <span className="font-medium">{allData.serviceType}</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{allData.appointmentDay}</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{allData.appointmentHour}</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium text-right text-sm">{allData.formatted_address || allData.address}</span>
                    </div>

                    <div className="flex justify-between pt-2">
                        <span className="text-gray-600">Confirmation sent to:</span>
                        <span className="font-medium">{allData.email}</span>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full max-w-md">
                    <p className="text-sm text-blue-800">
                        📧 A calendar invitation has been sent to your email. Please check your inbox.
                    </p>
                </div>

                <Button
                    as="a"
                    href="/"
                    color="primary"
                    size="lg"
                    className="w-full max-w-md"
                >
                    Continue to Home
                </Button>
            </div>
        );
    }

    // Error state
    return (
        <div className="flex flex-col items-center gap-6 p-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-12 h-12 text-red-600" />
            </div>

            <div className="text-center">
                <h2 className="text-3xl font-bold text-red-700 mb-2">Booking Failed</h2>
                <p className="text-gray-600">
                    We encountered an issue processing your booking. Please try again.
                </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 w-full max-w-md">
                <p className="text-sm text-red-800">
                    {allData.paymentStatus !== "succeeded"
                        ? "Payment was not completed successfully."
                        : "Payment succeeded but appointment creation failed. Please contact support."}
                </p>
            </div>

            <Button
                as="a"
                href="/booking"
                color="danger"
                size="lg"
                className="w-full max-w-md"
            >
                Try Again
            </Button>
        </div>
    );
}
