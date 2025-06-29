import { UploadField } from "@/pages/Simulation/AddSimulation/UploadField";
import React from "react";

interface ResumeUploadProps {
  register: any;
  errors: any;
  setValue: any;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({
  register,
  errors,
  setValue,
}) => {
  return (
    <div className="mt-10 max-w-xl px-4">
      <h2 className="text-2xl font-semibold text-teal-500 mb-6 text-left">
        Resume Upload
      </h2>
      <div>

        <UploadField
          label="Upload Resume"
          required
          icon="https://cdn.builder.io/api/v1/image/assets/d6885eedf052436eac8c331fe6a68cb8/bed87d6a4dc002519dad27c2456b96bf200e2c334181b0911b2f0b69d2941a8f?placeholderIfAbsent=true"
          placeholder="PDF, DOC (Max 10MB)"
          accept=".pdf,.doc,.docx"
          className="w-full"
          {...register("resume")}
          error={
            typeof errors.cardImage?.message === "string"
              ? errors.cardImage.message
              : undefined
          }
          onChange={(file) => setValue("resume", file)}
        />
      </div>
    </div>
  );
};
