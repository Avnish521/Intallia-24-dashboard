import React, { useState } from "react";
import { Plus, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Experience {
  id: string;
  collapsed?: boolean;
}

interface ExperienceSectionProps {
  register: any;
  errors: any;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  register,
  errors,
}) => {
  const [experiences, setExperiences] = useState<Experience[]>([
    { id: "1" },
    { id: "2" },
  ]);

  const handleAdd = () => {
    const newId = (experiences.length + 1).toString();
    setExperiences([...experiences, { id: newId }]);
  };

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const toggleCollapse = (id: string) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, collapsed: !exp.collapsed } : exp,
      ),
    );
  };

  return (
    <section className="w-full mt-[30px]">
      <h2 className="text-xl font-medium tracking-[0.38px] bg-clip-text bg-[linear-gradient(90deg,#0DAFDC_0%,#22E9A2_100%)] text-transparent">
        Experience
      </h2>

      <div className="w-full mt-5 space-y-2.5">
        {experiences.map((experience, idx) => (
          <div
            key={experience.id}
            className="rounded bg-white w-full p-4 border-2 border-[#F2F2F7]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => toggleCollapse(experience.id)}>
                  <ChevronDown
                    className={cn(
                      "w-6 h-6 transition-transform",
                      experience.collapsed && "rotate-180",
                    )}
                  />
                </button>
                <h3 className="text-[15px] font-semibold text-black tracking-[-0.24px]">
                  Experience {idx + 1}
                </h3>
              </div>
              <button type="button" onClick={() => handleDelete(experience.id)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {!experience.collapsed && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-1">
                    <span className="text-[15px] text-[#444446] tracking-[-0.24px]">
                      Job Title
                    </span>
                    <span className="text-[#FF3A3A] text-sm">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter job title"
                    className="rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5"
                    {...register(`experiences.${idx}.jobTitle`, { required: true })}
                  />
                  {errors?.experiences?.[idx]?.jobTitle && (
                    <span className="text-[#FF3A3A] text-xs">
                      {errors.experiences[idx].jobTitle.message || "Job Title is required"}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-1">
                    <span className="text-[15px] text-[#444446] tracking-[-0.24px] leading-5">
                      Company Name
                    </span>
                    <span className="text-[#FF3A3A] text-sm">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter company name"
                    className="rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5"
                    {...register(`experiences.${idx}.companyName`, { required: true })}
                  />
                  {errors?.experiences?.[idx]?.companyName && (
                    <span className="text-[#FF3A3A] text-xs">
                      {errors.experiences[idx].companyName.message || "Company Name is required"}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-1">
                    <span className="text-[15px] text-[#444446] tracking-[-0.24px] leading-5">
                      Start Date
                    </span>
                    <span className="text-[#FF3A3A] text-sm">*</span>
                  </label>
                  <input
                    type="date"
                    className="rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5"
                    {...register(`experiences.${idx}.startDate`, { required: true })}
                  />
                  {errors?.experiences?.[idx]?.startDate && (
                    <span className="text-[#FF3A3A] text-xs">
                      {errors.experiences[idx].startDate.message || "Start Date is required"}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-1">
                    <span className="text-[15px] text-[#444446] tracking-[-0.24px] leading-5">
                      End Date
                    </span>
                    <span className="text-[#FF3A3A] text-sm">*</span>
                  </label>
                  <input
                    type="date"
                    className="rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5"
                    {...register(`experiences.${idx}.endDate`, { required: true })}
                  />
                  {errors?.experiences?.[idx]?.endDate && (
                    <span className="text-[#FF3A3A] text-xs">
                      {errors.experiences[idx].endDate.message || "End Date is required"}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center gap-2 text-[15px] font-medium tracking-[-0.24px] mt-5 p-2 rounded"
      >
        <Plus className="w-6 h-6 text-[#0DAFDC]" />
        <span className="bg-clip-text bg-[linear-gradient(90deg,#0DAFDC_0%,#22E9A2_100%)] text-transparent">
          Add Experience
        </span>
      </button>
    </section>
  );
};
