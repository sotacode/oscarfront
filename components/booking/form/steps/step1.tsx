"use client";
import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

export default function Step1() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Full Name"
        {...register("fullName")}
        isInvalid={!!errors.fullName}
        errorMessage={errors.fullName?.message?.toString()}
      />
      <Input
        label="Email"
        {...register("email")}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message?.toString()}
      />
      <Input
        label="Phone"
        {...register("phone")}
        isInvalid={!!errors.phone}
        errorMessage={errors.phone?.message?.toString()}
      />
    </div>
  );
}
