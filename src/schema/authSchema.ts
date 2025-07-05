import { z } from "zod";

export const loginSchema = z.object({
  userid: z.string().min(1, "User Id is required"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    contactNumber: z
      .string()
      .regex(/^\d{10}$/, "Contact Number must be 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
