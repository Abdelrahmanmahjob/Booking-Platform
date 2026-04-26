import { z } from "zod";

const saudiNumberRegex = /^(05|09)\d{8}$/;

const phoneSchema = z.string().regex(saudiNumberRegex, {
  message: "Phone number must be Saudi format (05XXXXXXXXX or 09XXXXXXXXX)",
});

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const registerClientSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerProviderSchema = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    businessName: z
      .string()
      .min(2, "Business name must be at least 2 characters")
      .max(100, "Business name must not exceed 100 characters"),
    workingHours: z
      .object({
        start: z
          .string()
          .regex(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "Invalid time format (HH:mm)",
          ),
        end: z
          .string()
          .regex(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "Invalid time format (HH:mm)",
          ),
      })
      .refine((data) => data.start < data.end, {
        message: "End time must be after start time",
      }),
    workingDays: z
      .array(
        z.enum([
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ]),
      )
      .min(1, "Select at least one working day"),
    serviceCategories: z
      .array(z.enum(["medical", "fitness", "education"]))
      .min(1, "Select at least one service category"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterClientInput = z.infer<typeof registerClientSchema>;
export type RegisterProviderInput = z.infer<typeof registerProviderSchema>;
