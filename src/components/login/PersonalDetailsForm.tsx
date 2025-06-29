import { ChevronDown } from "lucide-react";
import React from "react";
import india from "@/assets/indiaflag.svg";
import { Input } from "@/components/ui/input";

interface PersonalDetailsFormProps {
  register: any;
  errors: any;
}

export const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="mt-10 max-w-xl px-4">
      <h2 className="text-2xl font-semibold text-teal-500 mb-6 text-left">
        Personal Details
      </h2>
      <form className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[45%]">
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="firstName"
            >
              First Name
            </label>
            <Input
              id="firstName"
              type="text"
              placeholder="First Name"
              {...register("firstName")}
              error={errors.firstName?.message}
              className="max-w-full w-full rounded-md border border-gray-300 bg-teal-50 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div className="flex-1 min-w-[45%]">
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <Input
              id="lastName"
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
              error={errors.lastName?.message}
              className="max-w-full w-full rounded-md border border-gray-300 bg-teal-50 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[45%]">
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email")}
              error={errors.email?.message}
              className="max-w-full w-full rounded-md border border-gray-300 bg-teal-50 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div className="flex-1 min-w-[45%]">
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <div className="flex items-center rounded-md border border-gray-300 bg-teal-50 px-3">
              <div className="flex items-center gap-2 pr-1 border-gray-300">
                <img src={india} className="w-4 h-auto" />
                <span className="text-gray-700 font-normal">+91</span>
                <ChevronDown size={30} />
              </div>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                {...register("phoneNumber")}
                className="flex-1 bg-transparent text-gray-800 font-medium focus:outline-none px-2 py-2 border-none focus:ring-0"
              />
            </div>
            {errors.phoneNumber && (
              <p id="input-error" className="mt-1 text-sm text-destructive">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[45%]">
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="linkedUrl"
            >
              Linked URL
            </label>
            <Input
              id="linkedUrl"
              type="url"
              placeholder="url"
              {...register("linkedUrl")}
              error={errors.linkedUrl?.message}
              className="max-w-full w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div className="flex-1 min-w-[45%]">
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="dob"
            >
              DOB
            </label>
            <Input
              id="dob"
              type="text"
              placeholder="DD/MM/YYYY"
              {...register("dob")}
              error={errors.dob?.message}
              className="max-w-full w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        </div>

        <div>
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="address"
          >
            Address
          </label>
          <Input
            id="address"
            type="text"
            placeholder="Address"
            {...register("address")}
            error={errors.address?.message}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
      </form>
    </div>
  );
};
