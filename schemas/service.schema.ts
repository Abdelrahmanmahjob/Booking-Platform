import { z } from "zod";

export const serviceSchema = z.object({
  name: z
    .string()
    .min(3, "Service name must be at least 3 characters")
    .max(100, "Service name must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
  category: z.enum(["medical", "fitness", "education"]),
  duration: z
    .number()
    .int()
    .min(15, "Duration must be at least 15 minutes")
    .max(480, "Duration must not exceed 480 minutes")
    .refine((data) => data % 15 === 0, {
      message: "Duration must be in 15-minute intervals",
    }),
  price: z
    .number()
    .positive("Price must be positive")
    .min(10, "Price must be at least 10")
    .max(10000, "Price must not exceed 10000")
    .refine((data) => Number.isInteger(data * 100), {
      message: "Price can have maximum 2 decimal places",
    }),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
