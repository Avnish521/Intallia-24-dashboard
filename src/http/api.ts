import api from "./axios";
import { LoginResponse, LoginPayload, LookupResponse } from "@/types";
import { AxiosResponse } from "axios";

// Strongly type the login API function
export const login = (payload: LoginPayload) =>
  api.post<LoginResponse>("/Login", payload);

// Logout API function
export const logout = () => api.post("/LogOut");

//Screens
export const getScreen = (payload: Record<string, unknown>) =>
  api.post<LookupResponse, any>("/GETLookupData", payload);

// Company API
export const getCompanyById = (payload) => api.post("/GetCompany", payload);
export const addCompany = (payload) => api.post("/AddCompany", payload);
export const updateCompany = (payload) => api.post("/UpdateCompany", payload);
export const deleteCompany = (payload) => api.post("/DeleteCompany", payload);

// Plans API
export const plansById = (payload) => api.post("/GetPlans", payload);
export const addPlans = (payload) => api.post("/AddPlans", payload);
export const updatePlans = (payload) => api.post("/UpdatePlans", payload);
export const deletePlans = (payload) => api.post("/DeletePlans", payload);

// User Education
export const userEducationById = (payload) =>
  api.post("/GetUserEducation", payload);
export const addUserEducation = (payload) =>
  api.post("/AddUserEducation", payload);
export const updateUserEducation = (payload) =>
  api.post("/UpdateUserEduction", payload);
export const deleteUserEducation = (payload) =>
  api.post("/DeleteUserEduction", payload);

//Role and access
export const getRoleById = (payload) => api.post("/GetUserGroup", payload);
export const createRole = (payload) => api.post("/AddUserGroup", payload);
export const updateRole = (payload) => api.post("/UpdateUserGroup", payload);
export const deleteRole = (payload) => api.post("/DeleteUserGroup", payload);
export const getUserGroupScreens = (payload) =>
  api.post("/GetScreenGroup", payload);

//Simulation API
export const getJobSimulationById = (payload) =>
  api.post("/GetJobSimulation", payload);
export const addJobSimulation = (payload) =>
  api.post("/AddJobSimulation", payload);
export const updateJobSimulation = (payload) =>
  api.post("/UpdateJobSimulation", payload);
export const deleteJobSimulation = (payload) =>
  api.post("/DeleteJobSimulation", payload);

//Section API
export const getSectionById = (payload) => api.post("/GetSection", payload);
export const addSection = (payload) => api.post("/AddSection", payload);
export const updateSection = (payload) => api.post("/UpdateSection", payload);
export const deleteSection = (payload) => api.post("/DeleteSection", payload);

//User API
export const deleteUser = (payload) => api.post("/DeleteUserMaster", payload);
export const getUserProfileById = (payload) =>
  api.post("/GetUserProfile", payload);
export const addUser = (payload) => api.post("/AddUserMaster", payload);
export const updateUser = (payload) => api.post("/UpdateUserMaster", payload);

// Software
export const deleteSoftware = (payload) => api.post("/DeleteSoftware", payload);
export const getSoftwareById = (payload) => api.post("/GetSoftware", payload);
export const updateSoftware = (payload) => api.post("/UpdateSoftware", payload);
export const addSoftware = (payload) => api.post("/AddSoftware", payload);
