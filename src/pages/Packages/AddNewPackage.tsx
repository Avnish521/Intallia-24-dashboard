import React, { useState } from "react";
import SidebarActions from "@/components/users/SidebarActions";
import { MainLayout } from "@/layout/MainLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import MultiSelect from "@/components/common/MultiSelect";

const packageSchema = z.object({
  packageName: z.string().min(1, "Package Name is required"),
  amount: z.string().min(1, "Amount is required"),
  validity: z.string().min(1, "Validity is required"),
  caseStudyCount: z.string().min(1, "No. of Case Study is required"),
  userCount: z.string().min(1, "No. of Users is required"),
  modifiedOn: z.string().min(1, "Modified On is required"),
  modifiedBy: z.string().min(1, "Modified By is required"),
  createdBy: z.string().min(1, "Created By is required"),
  simulation: z.array(z.string()).optional(),
});

type PackageFormValues = z.infer<typeof packageSchema>;

const defaultValues: PackageFormValues = {
  packageName: "",
  amount: "",
  validity: "",
  caseStudyCount: "",
  userCount: "",
  modifiedOn: "",
  modifiedBy: "",
  createdBy: "",
  simulation: [],
};

const AddNewPackage: React.FC<{
  editData?: Partial<PackageFormValues>;
}> = ({ editData }) => {
  const { id: packageId } = useParams();

  const [simulationSelection, setSimulationSelection] = useState<string[]>([]);
  console.log("simulationSelection", simulationSelection);
  const simulationOptions = [
    { label: "Simulation 1", value: "simulation1" },
    { label: "Simulation 2", value: "simulation2" },
    { label: "Simulation 3", value: "simulation3" },
    { label: "Simulation 4", value: "simulation4" },
    { label: "Simulation 5", value: "simulation5" },
    { label: "Simulation 6", value: "simulation6" },
    { label: "Simulation 7", value: "simulation7" },
    { label: "Simulation 8", value: "simulation8" },
    { label: "Simulation 9", value: "simulation9" },
    { label: "Simulation 10", value: "simulation10" },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: editData || defaultValues,
  });

  //use react query hook to fetch package data if editData is not provided

  const handleAddNewPackage = async (formData: PackageFormValues) => {
    try {
      if (editData) {
        // await updatePackage({ ...editData, ...data });
        console.log("FormData", formData);
      } else {
        // await createPackage(data);
        alert("Package created successfully!");
      }
      reset(defaultValues);
    } catch (error) {
      alert("Failed to save package.");
    }
  };

  const actions: {
    variant: "primary" | "outline" | "danger";
    text: string;
    onClick?: () => void;
  }[] = [
    {
      variant: "primary",
      text: editData ? "Update Package" : "Add New Package",
      onClick: () => {
        handleSubmit(handleAddNewPackage)();
      },
    },
    {
      variant: "outline",
      text: "Back",
      onClick: () => {
        handleSubmit(handleAddNewPackage)();
      },
    },
    {
      variant: "outline",
      text: "Save",
      onClick: () => {
        handleSubmit(handleAddNewPackage)();
      },
    },
    {
      variant: "danger",
      text: "Delete",
      onClick: () => alert("Delete clicked"),
    },
  ];

  return (
    <MainLayout>
      <div className="bg-[#F8F9FA] flex items-start gap-[35px] overflow-hidden flex-wrap p-8">
        <div className="flex flex-col items-stretch grow shrink-0 basis-0 w-fit">
          <h1 className="page-heading">
            {editData ? "Edit Package" : "Add New Package"}
          </h1>

          <div className="shadow-[0px_3.5px_5.5px_0px_rgba(0,0,0,0.02)] bg-white flex items-stretch gap-5 flex-wrap justify-between mt-[30px] px-[45px] py-[31px] rounded-[15px]  h-[88vh] sticky top-0 overflow-y-scroll">
            <div className="flex font-plusJakarta  flex-col gap-5 overflow-y-auto">
              <div className="w-full">
                <form noValidate className="flex flex-col gap-8">
                  {/* Package Details Row */}
                  <div className="flex flex-col md:flex-row md:flex-wrap gap-5">
                    <div className="flex-1 min-w-[220px] flex flex-col gap-1">
                      <label className="flex items-center gap-1 font-medium text-[#444446] text-[15px]">
                        Package Name{" "}
                        <span className="text-[#FF3A3A] text-sm">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("packageName")}
                        className="rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary transition"
                        placeholder="Enter package name"
                      />
                      {errors.packageName && (
                        <span className="text-xs text-red-500">
                          {errors.packageName.message}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-[220px] flex flex-col gap-1">
                      <label className="flex items-center gap-1 font-medium text-[#444446] text-[15px]">
                        Amount <span className="text-[#FF3A3A] text-sm">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("amount")}
                        className="rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary transition"
                        placeholder="Enter amount"
                      />
                      {errors.amount && (
                        <span className="text-xs text-red-500">
                          {errors.amount.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Counts Row */}
                  <div className="flex flex-col md:flex-row md:flex-wrap gap-5">
                    <div className="flex-1 min-w-[220px] flex flex-col gap-1">
                      <label className="flex items-center gap-1 font-medium text-[#444446] text-[15px]">
                        Validity (In Year){" "}
                        <span className="text-[#FF3A3A] text-sm">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("validity")}
                        className="rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary transition"
                        placeholder="e.g. 1, 2, 3"
                      />
                      {errors.validity && (
                        <span className="text-xs text-red-500">
                          {errors.validity.message}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-[220px] flex flex-col gap-1">
                      <label className="flex items-center gap-1 font-medium text-[#444446] text-[15px]">
                        No. of Case Study{" "}
                        <span className="text-[#FF3A3A] text-sm">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("caseStudyCount")}
                        className="rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary transition"
                        placeholder="e.g. 5"
                      />
                      {errors.caseStudyCount && (
                        <span className="text-xs text-red-500">
                          {errors.caseStudyCount.message}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-[220px] flex flex-col gap-1">
                      <label className="flex items-center gap-1 font-medium text-[#444446] text-[15px]">
                        No. of Users{" "}
                        <span className="text-[#FF3A3A] text-sm">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("userCount")}
                        className="rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary transition"
                        placeholder="e.g. 100"
                      />
                      {errors.userCount && (
                        <span className="text-xs text-red-500">
                          {errors.userCount.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Meta Row */}
                  <div className="flex flex-col md:flex-row md:flex-wrap gap-5">
                    <div className="flex-1 min-w-[220px] flex flex-col gap-1">
                      <label className="flex items-center gap-1 font-medium text-[#444446] text-[15px]">
                        Modified On{" "}
                        <span className="text-[#FF3A3A] text-sm">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("modifiedOn")}
                        placeholder="DD/MM/YYYY"
                        className="rounded border border-[#E5E5EA] bg-[#F2F2F7] min-h-12 px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary transition"
                      />
                      {errors.modifiedOn && (
                        <span className="text-xs text-red-500">
                          {errors.modifiedOn.message}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-[220px] flex flex-col gap-1">
                      <label className="flex items-center gap-1 font-medium text-[#444446] text-[15px]">
                        Modified By{" "}
                        <span className="text-[#FF3A3A] text-sm">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("modifiedBy")}
                        placeholder="Admin Name"
                        className="rounded border border-[#E5E5EA] min-h-12 px-4 py-3.5 bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-primary transition"
                      />
                      {errors.modifiedBy && (
                        <span className="text-xs text-red-500">
                          {errors.modifiedBy.message}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-[220px] flex flex-col gap-1">
                      <label className="flex items-center gap-1 font-medium text-[#444446] text-[15px]">
                        Created By{" "}
                        <span className="text-[#FF3A3A] text-sm">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("createdBy")}
                        className="rounded border border-[#E5E5EA] bg-[#F2F2F7] min-h-12 px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary transition"
                        placeholder="Admin Name"
                      />
                      {errors.createdBy && (
                        <span className="text-xs text-red-500">
                          {errors.createdBy.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Simulation Row */}
                  <div className="flex flex-col gap-2 mt-5 w-full lg:max-w-[690px]">
                    <label className="flex items-center gap-1 font-medium text-[#444446] text-[15px]">
                      Simulation{" "}
                      <span className="text-[#FF3A3A] text-sm">*</span>
                    </label>
                    <MultiSelect
                      options={simulationOptions}
                      value={simulationSelection}
                      onChange={setSimulationSelection}
                      placeholder="Select Simulation"
                      disabled={false}
                      className="rounded border border-[#E5E5EA] bg-white min-h-12 px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary transition"
                    />
                  </div>
                </form>
              </div>
            </div>

            <SidebarActions actions={actions} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddNewPackage;
