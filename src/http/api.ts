import api from "./axios";
import { LoginResponse, LoginPayload, LookupResponse } from "@/types";

// Strongly type the login API function
export const login = (payload: LoginPayload) =>
  api.post<LoginResponse>("/Login", payload);

// Logout API function
export const logout = () => api.post("/LogOut");

//Screens
export const getScreen = (payload: Record<string, unknown>) =>
  api.post<LookupResponse, any>("/GETLookupData", payload);

// Company API
export const getCompanyById = (payload: Record<string, unknown>) => api.post("/GetCompany", payload);
export const addCompany = (payload: Record<string, unknown>) => api.post("/AddCompany", payload);
export const updateCompany = (payload: Record<string, unknown>) => api.post("/UpdateCompany", payload);
export const deleteCompany = (payload: Record<string, unknown>) => api.post("/DeleteCompany", payload);

// Plans API
export const plansById = (payload: Record<string, unknown>) => api.post("/GetPlans", payload);
export const addPlans = (payload: Record<string, unknown>) => api.post("/AddPlans", payload);
export const updatePlans = (payload: Record<string, unknown>) => api.post("/UpdatePlans", payload);
export const deletePlans = (payload: Record<string, unknown>) => api.post("/DeletePlans", payload);

// User Education
export const userEducationById = (payload: Record<string, unknown>) =>
  api.post("/GetUserEducation", payload);
export const addUserEducation = (payload: Record<string, unknown>) =>
  api.post("/AddUserEducation", payload);
export const updateUserEducation = (payload: Record<string, unknown>) =>
  api.post("/UpdateUserEduction", payload);
export const deleteUserEducation = (payload: Record<string, unknown>) =>
  api.post("/DeleteUserEduction", payload);

//Role and access
export const getRoleById = (payload: Record<string, unknown>) => api.post("/GetUserGroup", payload);
export const createRole = (payload: Record<string, unknown>) => api.post("/AddUserGroup", payload);
export const updateRole = (payload: Record<string, unknown>) => api.post("/UpdateUserGroup", payload);
export const deleteRole = (payload: Record<string, unknown>) => api.post("/DeleteUserGroup", payload);
export const getUserGroupScreens = (payload: Record<string, unknown>) =>
  api.post("/GetScreenGroup", payload);

//Simulation API
export const getJobSimulationById = (payload: Record<string, unknown>) =>
  api.post("/GetJobSimulation", payload);
export const addJobSimulation = (payload: Record<string, unknown>) =>
  api.post("/AddJobSimulation", payload);
export const updateJobSimulation = (payload: Record<string, unknown>) =>
  api.post("/UpdateJobSimulation", payload);
export const deleteJobSimulation = (payload: Record<string, unknown>) =>
  api.post("/DeleteJobSimulation", payload);

//Section API
export const getSectionById = (payload: Record<string, unknown>) => api.post("/GetSection", payload);
export const addSection = (payload: Record<string, unknown>) => api.post("/AddSection", payload);
export const updateSection = (payload: Record<string, unknown>) => api.post("/UpdateSection", payload);
export const deleteSection = (payload: Record<string, unknown>) => api.post("/DeleteSection", payload);

//User API
export const deleteUser = (payload: Record<string, unknown>) => api.post("/DeleteUserMaster", payload);
export const getUserProfileById = (payload: Record<string, unknown>) => api.post("/GetUserProfile", payload);
export const addUser = (payload: Record<string, unknown>) => api.post("/AddUserMaster", payload);
export const updateUser = (payload: Record<string, unknown>) => api.post("/UpdateUserMaster", payload);

// Software
export const deleteSoftware = (payload: Record<string, unknown>) => api.post("/DeleteSoftware", payload);
export const getSoftwareById = (payload: Record<string, unknown>) => api.post("/GetSoftware", payload);
export const updateSoftware = (payload: Record<string, unknown>) => api.post("/UpdateSoftware", payload);
export const addSoftware = (payload: Record<string, unknown>) => api.post("/AddSoftware", payload);
