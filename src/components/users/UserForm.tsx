import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EducationSection } from "./EducationSection";
import { ExperienceSection } from "./ExperienceSection";
import { useUserById } from "@/queries/userQueries";
import { FormRef, User } from "@/types";
import { UserFormValues, userSchema } from "@/schema/userSchema";

const mapuserDataToForm = (data: User): UserFormValues => ({
  firstName: data?.FirstName || "",
  lastName: data?.LastName || "",
  email: data?.Email || "",
  number: data?.ContactNumber || "",
  linkedin: data?.LinkedInURL || "",
  dob: "", // Default or map from data if available
  company: "", // Default or map from data if available
  address: data?.Address || "",
  education: data?.Education || [],
  experiences: data?.Experience || []
});

interface UserFormProps {
  userId?: string;
}

export const UserForm = forwardRef<FormRef, UserFormProps>(
  ({ userId }, ref) => {
    const { data: users, isFetched } = useUserById(userId);
    const userData = users?.UserProfile[0];
    console.log("Current user:", userData);

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<UserFormValues>({
      resolver: zodResolver(userSchema),
    });
    // const value = watch();
    // console.log("Form Data", value);
    // Expose submit method with mode to parent
    useImperativeHandle(ref, () => ({
      submit: (mode) => handleSubmit((formData) => onSubmit(formData, mode))(),
    }));

    //Add New User
    const addNewUser = (
      formData: UserFormValues,
      mode: "save" | "saveAndExit",
    ) => {
      console.log("Added New user:", formData);
    };

    // Update New User
    const handleUpdateUser = (
      formData: UserFormValues,
      mode: "save" | "saveAndExit",
    ) => {};

    // Unified submit handler
    const onSubmit = async (
      formData: UserFormValues,
      mode: "save" | "saveAndExit" = "save",
    ) => {
      if (userId) {
        await handleUpdateUser(formData, mode);
      } else {
        await addNewUser(formData, mode);
      }
    };

    useEffect(() => {
      if (userData) {
        const values = mapuserDataToForm(userData);
        Object.entries(values).forEach(([key, value]) =>
          setValue(key as keyof UserFormValues, value),
        );
      }
    }, [userData, setValue, isFetched]);

    return (
      <form
        className="flex font-plusJakarta flex-col gap-5 overflow-y-auto"
        noValidate
      >
        <div className="w-full">
          <div>
            <h2 className="text-xl font-medium tracking-[0.38px] bg-clip-text bg-[linear-gradient(90deg,#0DAFDC_0%,#22E9A2_100%)] text-transparent ">
              Personal Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1">
                  <span className="text-[15px] text-[#444446] leading-5 ">
                    First Name
                  </span>
                  <span className="text-[#FF3A3A] text-sm">*</span>
                </label>
                <input
                  {...register("firstName")}
                  type="text"
                  placeholder="Enter first name"
                  className="rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-xs">
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1">
                  <span className="text-[15px] text-[#444446] tracking-[-0.24px]">
                    Last Name
                  </span>
                  <span className="text-[#FF3A3A] text-sm">*</span>
                </label>
                <input
                  {...register("lastName")}
                  type="text"
                  placeholder="Enter last name"
                  className="rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-xs">
                    {errors.lastName.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1">
                  <span className="text-[15px] text-[#444446] tracking-[-0.24px]">
                    Email
                  </span>
                  <span className="text-[#FF3A3A] text-sm">*</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter email"
                  className="rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1">
                  <span className="text-[15px] text-[#444446] tracking-[-0.24px]">
                    Number
                  </span>
                  <span className="text-[#FF3A3A] text-sm">*</span>
                </label>
                <div className="flex items-center rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/4e93f2d3d72f4b58b47d979bd758d34a/b3e578b8881e144097eda901ab80255224febf55ffe07d1428a77e2beb4c1939"
                        alt="Country flag"
                        className="w-5 h-3.5"
                      />
                      <span>+91</span>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/4e93f2d3d72f4b58b47d979bd758d34a/610bae2bd3fec3226daeb553c69952d46dcb01bf137f75b31b35e8b80820ae1e"
                        alt="Dropdown"
                        className="w-4 h-4"
                      />
                    </div>
                    <input
                      {...register("number")}
                      type="tel"
                      placeholder=""
                      className="w-full outline-none placeholder:pl-4 placeholder:text-black"
                    />
                  </div>
                </div>
                {errors.number && (
                  <span className="text-red-500 text-xs">
                    {errors.number.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1">
                  <span className="text-[15px] text-[#444446] tracking-[-0.24px]">
                    LinkedIn URL
                  </span>
                  <span className="text-[#FF3A3A] text-sm">*</span>
                </label>
                <input
                  {...register("linkedin")}
                  type="url"
                  placeholder="Enter LinkedIn URL"
                  className="rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5"
                />
                {errors.linkedin && (
                  <span className="text-red-500 text-xs">
                    {errors.linkedin.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1">
                  <span className="text-[15px] text-[#444446] tracking-[-0.24px]">
                    DOB
                  </span>
                  <span className="text-[#FF3A3A] text-sm">*</span>
                </label>
                <input
                  {...register("dob")}
                  type="date"
                  className="rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5"
                />
                {errors.dob && (
                  <span className="text-red-500 text-xs">
                    {errors.dob.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <label className="flex items-center gap-1">
                <span className="text-[15px] text-[#444446] font-normal">
                  Company Name
                </span>
                <span className="text-[#FF3A3A] text-sm">*</span>
              </label>
              <input
                {...register("company")}
                type="text"
                placeholder="Enter company name"
                className="rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5"
              />
              {errors.company && (
                <span className="text-red-500 text-xs">
                  {errors.company.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <label className="flex items-center gap-1">
                <span className="text-[15px] text-[#444446] font-normal">
                  Address
                </span>
                <span className="text-[#FF3A3A] text-sm">*</span>
              </label>
              <input
                {...register("address")}
                type="text"
                placeholder="Enter address"
                className="rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5"
              />
              {errors.address && (
                <span className="text-red-500 text-xs">
                  {errors.address.message}
                </span>
              )}
            </div>
            <EducationSection register={register} errors={errors} />
            <ExperienceSection register={register} errors={errors} />
          </div>
        </div>
      </form>
    );
  },
);
