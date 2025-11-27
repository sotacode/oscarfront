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
                    {...register("confirm")}
                    isSelected={confirmed}
                    onValueChange={setConfirmed}
                >
                    <span className="text-sm">
                        I confirm that all the information above is correct and I want to proceed with booking this appointment.
                    </span>
                </Checkbox>
            </div>
            {errors.confirm && (
                <div className="text-red-500 text-sm">{errors.confirm.message?.toString()}</div>
            )}
        </div>
    );
}
