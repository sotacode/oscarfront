import { z } from "zod";

export const step1Schema = z.object({
  fullName: z.string().min(3, "Name is too short"),
  email: z.email("Invalid email"),
  phone: z.string().min(8, "Invalid phone number"),
});

export const step2Schema = z.object({
    address: z.string().min(10, "Please select an address from the suggestions."),
    formatted_address: z.string().min(10, "Please select an address from the suggestions."),
    place_id: z.string().min(1, "Please select an address from the suggestions."),
    lat: z.string().min(1, "Latitude is required."),
    lng: z.string().min(1, "Longitude is required."),
  })


export const step3Schema = z.object({
  serviceType: z.string().min(1, "Please select a service type."),
  serviceDuration: z.number().min(1, "Duration required."),
});

export const step4Schema = z.object({
  appointmentDay: z.string().min(1, "Please select an appointment day"),
  appointmentHour: z.string().min(1, "Please select an appointment hour")
});

export const step5Schema = z.object({
  appointmentDay: z.string().min(1, "Please select an appointment day"),
  appointmentHour: z.string().min(1, "Please select an appointment hour"),
  confirm: z.literal(true, { message: "You must confirm" }),
});

export const fullFormSchema = step1Schema
  .and(step2Schema)
  .and(step3Schema)
  .and(step4Schema);


