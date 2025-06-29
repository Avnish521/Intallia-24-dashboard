import { login, otp, signup } from "@/http/api.js";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { storeUserData } from "@/utils";

// OTP verification mutation
export function useOtpVerification() {
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      return await otp(payload);
    },
    onSuccess: () => {
      toast.success("OTP verified successfully.");
    },
    onError: (error) => {
      console.error("OTP verification failed:", error);
      toast.error("OTP verification failed. Please try again.");
    },
  });
}

// Signup mutation
export function useSignup() {
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const { UserValid } = await signup(payload);
      if (!UserValid) {
        throw new Error("Invalid user data received from signup API.");
      }
      storeUserData("userData", UserValid[0]);
      return UserValid;
    },
    onError: (error) => {
      console.error("Signup failed:", error);
      toast.error("Signup failed. Please try again.");
    },
  });
}

// Login mutation
export function useLogin() {
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      return await login(payload);
    },
    onSuccess: () => {
      toast.success("Login successful.");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    },
  });
}
