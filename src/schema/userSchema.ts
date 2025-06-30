import { z } from "zod";

// Education Schema
export const educationSchema = z.object({
  degree: z.string().min(1, { message: "Degree is required" }),
  college: z.string().min(1, { message: "College is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
});

// Experience Schema
export const experienceSchema = z.object({
  jobTitle: z.string().min(1, { message: "Job title is required" }),
  companyName: z.string().min(1, { message: "Company name is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
});

// User Schema
export const userSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  number: z.string().min(10, { message: "Number is required" }),
  linkedin: z.string().url({ message: "Invalid URL" }),
  dob: z.string().min(1, { message: "DOB is required" }),
  company: z.string().min(1, { message: "Company name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  education: z.array(educationSchema),
  experiences: z.array(experienceSchema),
});

export type UserFormValues = z.infer<typeof userSchema>;
