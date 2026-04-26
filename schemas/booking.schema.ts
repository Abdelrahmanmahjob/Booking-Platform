import { z } from "zod";

export const bookingSchema = z.object({
  serviceId: z.string().uuid("Invalid service ID"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .refine(
      (data) => {
        const selectedDate = new Date(data);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      {
        message: "Cannot book in the past",
      },
    )
    .refine(
      (data) => {
        const selectedDate = new Date(data);
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 90);
        return selectedDate <= maxDate;
      },
      {
        message: "Cannot book more than 90 days in advance",
      },
    ),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  notes: z.string().max(500, "Notes must not exceed 500 characters").optional(),
});

export const bookingSchemaWithDateTime = bookingSchema.refine(
  (data) => {
    const bookingDateTime = new Date(`${data.date}T${data.time}:00`);
    const now = new Date();
    return bookingDateTime > now;
  },
  {
    message: "Booking time must be in the future",
    path: ["time"],
  },
);

export const cancelBookingSchema = z.object({
  bookingId: z.string().uuid(),
  cancelReason: z
    .string()
    .min(10, "Please provide a reason (at least 10 characters)")
    .max(200, "Reason must not exceed 200 characters")
    .optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type CancelBookingInput = z.infer<typeof cancelBookingSchema>;
