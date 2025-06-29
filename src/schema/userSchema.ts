import { z } from "zod";

// 1. Define Zod schema
export const userSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email"),
	number: z.string().min(10, "Number is required"),
	linkedin: z.string().url("Invalid URL"),
	dob: z.string().min(1, "DOB is required"),
	company: z.string().min(1, "Company name is required"),
	address: z.string().min(1, "Address is required"),
});



export type UserFormValues = z.infer<typeof userSchema>;
