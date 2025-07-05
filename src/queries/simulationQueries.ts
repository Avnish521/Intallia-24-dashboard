import {
  getScreen,
  addSection,
  addJobSimulation,
  getJobSimulationById,
  deleteSoftware,
} from "@/http/api.js";
import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// You may want to define proper types for your API responses
type ApiResponse = any;

export function useJobSimulation(): UseQueryResult<ApiResponse, unknown> {
  return useQuery({
    queryKey: ["JobSimulations"],
    queryFn: () =>
      getScreen({
        ScreenName: "JobSimulation",
        LookUpKey: "GetList",
        Filter1: "",
        Filter2: "",
        Filter3: "",
        Filter4: "",
        Filter5: "",
      }),
    retry: 2,
  });
}

export function useAddJobSimulation(): UseMutationResult<
  ApiResponse,
  unknown,
  { JSON: string }
> {
  return useMutation({
    mutationKey: ["addJobSimulation"],
    mutationFn: async (payload: { JSON: string }) => {
      return await addJobSimulation(payload);
    },
    onSuccess: (data) => {
      console.log("Job simulation added successfully:", data);
      toast.success("Job simulation added successfully");
    },
    onError: (error: unknown) => {
      console.error("Add job simulation failed:", error);
      toast.error("Failed to add job simulation");
    },
  });
}

// get Simulation data by SimulationId
export function useSimulationData(
  SimulationId: string | number,
  CompanyId: string,
): UseQueryResult<ApiResponse, unknown> {
  return useQuery({
    queryKey: ["JobSimulations", SimulationId],
    queryFn: () =>
      getJobSimulationById({
        JSON: JSON.stringify({
          Header: [{ SimulationId, CompanyId }],
          Response: [{ ResponseText: "", ErrorCode: "" }],
        }),
      }),
    enabled: !!(SimulationId && CompanyId),
    retry: 2,
  });
}

// Section Queries
export function useAddSection(): UseMutationResult<
  ApiResponse,
  unknown,
  { JSON: string }
> {
  return useMutation({
    mutationKey: ["addSection"],
    mutationFn: async (payload: { JSON: string }) => {
      const result = await addSection(payload);
      return result;
    },
    onSuccess: (data) => {
      console.log("Section added successfully:", data);
      toast.success("Section added successfully");
    },
    onError: (error: unknown) => {
      console.error("Add section failed:", error);
      toast.error("Add section failed");
    },
  });
}

// Software Queries
export function useSoftware(): UseQueryResult<ApiResponse, unknown> {
  return useQuery({
    queryKey: ["Software"],
    queryFn: () =>
      getScreen({
        ScreenName: "Software",
        LookUpKey: "GetList",
        Filter1: "",
        Filter2: "",
        Filter3: "",
        Filter4: "",
        Filter5: "",
      }),
    retry: 2,
  });
}

export function useDeleteSoftware() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["deleteSoftware"],
    mutationFn: async (SoftwareId: string | number) => {
      const payload = {
        JSON: JSON.stringify({
          Header: [{ SoftwareId: SoftwareId }],
          Response: [{ ResponseText: "", ErrorCode: "" }],
        }),
      };
      return deleteSoftware(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Software"] });
      navigate("/software");
      toast.success("Software deleted successfully.");
    },
    onError: (error: unknown) => {
      console.error("Delete failed:", error);
      toast.error("Failed to delete software.");
    },
  });
}
