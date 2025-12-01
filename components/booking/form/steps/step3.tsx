"use client";
import { Textarea } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

export default function Step3() {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const options = [
    { label: "Consultation", value: "consultation", duration: 1800 },
    { label: "Repair", value: "repair", duration: 3600 },
    { label: "Maintenance", value: "maintenance", duration: 2700 },
  ];
  const selectedService = watch("serviceType");
  const issueDescription = watch("issueDescription") || "";

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl font-bold text-secondary">Service Details</h2>
        <p className="text-sm md:text-base text-gray-600">Tell us what service you need</p>
      </div>

      {/* Service Type Selection */}
      <div className="space-y-2">
        <label className="block font-semibold text-secondary text-sm md:text-base">
          Service Type <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full px-4 py-3 md:py-3.5 rounded-lg border-2 border-gray-200 bg-white text-secondary font-medium text-sm md:text-base
            focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
            transition-all duration-200 cursor-pointer
            hover:border-gray-300"
          {...register("serviceType", {
            onChange: (e) => {
              const selected = options.find(opt => opt.value === e.target.value);
              setValue("serviceDuration", selected ? selected.duration : undefined);
            }
          })}
          defaultValue=""
        >
          <option value="" disabled>Select a service...</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.serviceType && (
          <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {errors.serviceType.message?.toString()}
          </div>
        )}
      </div>

      {/* Issue Description */}
      <div className="space-y-2">
        <label className="block font-semibold text-secondary text-sm md:text-base">
          Describe the Issue <span className="text-red-500">*</span>
        </label>
        <Textarea
          {...register("issueDescription")}
          placeholder="Please describe what's wrong with your vehicle or what service you need..."
          minRows={4}
          classNames={{
            input: "text-sm md:text-base",
            inputWrapper: "border-2 border-gray-200 hover:border-gray-300 focus-within:!border-primary focus-within:ring-2 focus-within:ring-primary/20"
          }}
        />
        <div className="flex justify-between items-center">
          <div className="text-xs md:text-sm text-gray-500">
            {issueDescription.length} / 500 characters
          </div>
          {errors.issueDescription && (
            <div className="flex items-center gap-1 text-red-600 text-xs md:text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {errors.issueDescription.message?.toString()}
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-sm md:text-base text-blue-700">
            The more details you provide, the better we can prepare for your appointment and bring the right tools and parts.
          </p>
        </div>
      </div>
    </div>
  );
}
