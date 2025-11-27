"use client";
import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

export default function Step3() {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const options = [
    { label: "Consultation", value: "consultation", duration: 1800 },
    { label: "Repair", value: "repair", duration: 3600 },
    { label: "Maintenance", value: "maintenance", duration: 2700 },
  ];
  const selectedService = watch("serviceType");

  return (
    <div className="flex flex-col gap-4">
      <label className="font-semibold mb-1">Service Type</label>
      <select
        className="border rounded-lg p-2 mb-2"
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
        <div className="text-red-500 text-sm mb-2">{errors.serviceType.message?.toString()}</div>
      )}
    </div>
  );
}
