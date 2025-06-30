import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "@/assets/indiaflag.svg";
import { signupSchema, SignupFormValues } from "@/schema/authSchema";

const SignupForm = ({
  onSubmit,
}: {
  onSubmit: (data: SignupFormValues) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <div className="w-full md:w-1/2 flex justify-center bg-[#FFFFFF] py-[3%] h-[89vh] overflow-y-scroll ">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-bold mb-1">Sign Up</h2>
        <p className="text-gray-500 mb-2 text-sm">
          Hello! Let’s get started and sharpen your skills with some
          expert-level quizzes!
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap items-center gap-6">
            <div className="w-full md:w-[47%]">
              <Label htmlFor="fullName">
                First Name<span className="text-red-500 text-sm">*</span>
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter Name"
                {...register("firstName")}
                error={errors.firstName?.message}
              />
            </div>
            <div className="w-full md:w-[47%]">
              <Label htmlFor="lastName">
                Last Name<span className="text-red-500 text-sm">*</span>
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter Name"
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </div>
          </div>
          {/* Email */}
          <div>
            <Label htmlFor="email">
              Email<span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter Email"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>

          {/* Contact Number */}
          <div>
            <Label htmlFor="contactNumber">
              Contact Number<span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <span className="mr-2 flex gap-2">
                <img src={Image} alt="India Flag" /> +91
              </span>
              <Input
                id="contactNumber"
                type="text"
                placeholder="1234567890"
                className="flex-1 border-none focus:ring-0"
                {...register("contactNumber")}
              />
            </div>
            {errors.contactNumber && (
              <p className="mt-1 text-sm text-destructive">
                {errors.contactNumber.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">
              Password<span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="*******"
              {...register("password")}
              error={errors.password?.message}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword">
              Confirm Password<span className="text-red-500">*</span>
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="*******"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
          </div>

          {/* Sign Up Button */}
          <div className="flex justify-center md:justify-end items-center">
            <Button
              type="submit"
              className="w-[300px] h-[50px] py-2 text-center text-white rounded-md bg-gradient-to-r from-cyan-400 to-green-500 hover:opacity-90 transition "
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
