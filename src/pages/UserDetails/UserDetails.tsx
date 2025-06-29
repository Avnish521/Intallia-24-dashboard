import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Header } from "@/components/login/Header";
import { ProfileSidebar } from "@/components/login/ProfileSidebar";
import { PersonalDetailsForm } from "@/components/login/PersonalDetailsForm";
import { ResumeUpload } from "@/components/login/ResumeUpload";
import { EducationForm } from "@/components/login/EducationForm";
import { CustomButton } from "@/components/login/CustomButton";
import skipIcon from "@/assets/skip.svg";
import nextIcon from "@/assets/next.svg";
import { useUserById } from "@/queries/userQueries";

// Schema & Types
const personalDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  linkedUrl: z.string().url().optional().or(z.literal("")),
  resume: z.string().min(1, "Resume is required"),
  address: z.string().min(1, "Address is required"),
});

type PersonalDetailsFormValues = z.infer<typeof personalDetailsSchema>;

// Helpers
const mapUserDataToForm = (data: any): PersonalDetailsFormValues => ({
  firstName: data?.FirstName || "",
  lastName: data?.LastName || "",
  email: data?.Email || "",
  phoneNumber: data?.ContactNumber || "",
  linkedUrl: data?.LinkedInURL || "",
  resume: "",
  address: data?.Address || "",
});

const STEPS = {
  PERSONAL: 1,
  EDUCATION: 2,
} as const;

// Main Component
const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(STEPS.PERSONAL);

  const { data: users, isFetched } = useUserById(id);
  const userData = users?.UserProfile?.[0];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PersonalDetailsFormValues>({
    resolver: zodResolver(personalDetailsSchema),
  });

  // Prefill form when userData is fetched
  useEffect(() => {
    if (userData && isFetched) {
      const values = mapUserDataToForm(userData);
      Object.entries(values).forEach(([key, value]) =>
        setValue(key as keyof PersonalDetailsFormValues, value),
      );
    }
  }, [userData, setValue, isFetched]);

  const onSubmit = useCallback(
    (data: PersonalDetailsFormValues) => {
      // TODO: handle form submission (API call, state update, etc.)
      console.log("Personal Details Submitted:", data);
      navigate("/preferences");
    },
    [navigate],
  );

  const handleNext = useCallback(() => {
    if (step >= STEPS.EDUCATION) {
      navigate("/preferences");
      //handleSubmit(onSubmit)();
    } else {
      setStep((prev) => prev + 1);
    }
  }, [step, handleSubmit, onSubmit]);

  const handleSkip = useCallback(() => {
    navigate("/preferences");
  }, [navigate]);

  return (
    <div className="bg-white overflow-hidden pb-[90px] max-md:pb-[60px]">
      <Header />
      <div className="w-full max-w-[1388px] mt-[55px] container">
        <div className="self-stretch max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <aside className="w-[28%] max-md:w-full max-md:ml-0">
              <ProfileSidebar />
            </aside>
            <main className="w-[72%] ml-5 max-md:w-full max-md:ml-0">
              <section className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-10">
                <h1 className="text-center text-[34px] font-semibold leading-none tracking-[0.37px] bg-clip-text text-[#18d3c2] mb-2">
                  Let's get Started
                </h1>

                {step === STEPS.PERSONAL && (
                  <>
                    <PersonalDetailsForm register={register} errors={errors} />
                    <ResumeUpload
                      register={register}
                      errors={errors}
                      setValue={setValue}
                    />
                  </>
                )}

                {step === STEPS.EDUCATION && <EducationForm />}

                <div className="max-w-xl px-4 mt-6">
                  <div className="flex w-full justify-end gap-4 max-md:justify-start max-md:gap-3">
                    <CustomButton
                      variant="secondary"
                      icon={skipIcon}
                      onClick={handleSkip}
                    >
                      Skip
                    </CustomButton>
                    <CustomButton
                      variant="primary"
                      icon={nextIcon}
                      onClick={handleNext}
                    >
                      Next
                    </CustomButton>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
