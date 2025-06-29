import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy } from "react";

const PrivateRoute = lazy(() => import("./PrivateRoute"));
const PublicRoute = lazy(() => import("./PublicRoute"));

const Login = lazy(() => import("@/pages/auth/Login/Login"));
const Signup = lazy(() => import("@/pages/auth/SignUp/Signup"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));

const UserManagement = lazy(() => import("@/pages/User/UserManagement"));
const AddNewUser = lazy(() => import("@/components/users/AddNewUser"));
const UserDetails = lazy(() => import("@/pages/UserDetails/UserDetails"));
const Index = lazy(() => import("@/pages/Index"));

const CompanyManagement = lazy(() => import("@/pages/Company/CompanyManagement"));
const AddNewCompany = lazy(() => import("@/pages/Company/AddNewCompany"));

const RolesAndAccess = lazy(() => import("@/pages/RolesAndAccess/RolesAndAccess"));
const AddRole = lazy(() => import("@/pages/RolesAndAccess/AddRole"));
const UserGroupDetails = lazy(() => import("@/pages/RolesAndAccess/UserGroupDetails"));

const Simulation = lazy(() => import("@/pages/Simulation/Simulation"));
const AddSimulation = lazy(() => import("@/pages/Simulation/AddSimulation/AddSimulation"));

const Software = lazy(() => import("@/pages/Software/Software"));
const AddNewSoftware = lazy(() => import("@/pages/Software/AddNewSoftware/AddNewSoftware"));

const Packages = lazy(() => import("@/pages/Packages/Packages"));
const AddNewPackage = lazy(() => import("@/pages/Packages/AddNewPackage"));
const ViewPackage = lazy(() => import("@/pages/Packages/ViewPackage"));
const DataScience = lazy(() => import("@/pages/Packages/DataScience"));
const Plans = lazy(() => import("@/pages/Packages/plans"));

const Invitations = lazy(() => import("@/components/Invitations/Invitations"));
const Payments = lazy(() => import("@/pages/Payments/Payments"));
const UserAssignment = lazy(() => import("@/pages/UserAssignment/UserAssignment"));
const Profile = lazy(() => import("@/components/Profile/Profile"));

const ViewSkillMatrix = lazy(() => import("@/pages/SkillMatrix/ViewSkillMatrix/ViewSkillMatrix"));
const SkillMatrix = lazy(() => import("@/pages/SkillMatrix/SkillMatrix"));
const SkillMatrixView = lazy(() => import("@/pages/SkillMatrix/SkillMatrixView"));
const Score = lazy(() => import("@/pages/SkillMatrix/ViewSkillMatrix/Score"));

const CaseStudyDetail = lazy(() => import("@/components/StudentDashbord/CaseStudyDetail"));
const UserPreferences = lazy(() => import("@/pages/UserPreferences/UserPreferences"));
const InnerPage = lazy(() => import("@/pages/InnerPage/InnerPage"));

// Helper layout for nested routes
const AdminLayout = () => <Outlet />;
const MainLayout = () => <Outlet />;

const router = createBrowserRouter([
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },

  {
    path: "/",
    element: (
      <PrivateRoute allowedRoles={["Student", "Admin"]}>
        <MainLayout />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Index /> },
      { path: "case-study/:id", element: <CaseStudyDetail /> },
      { path: "user-details/:id", element: <UserDetails /> },
      { path: "preferences", element: <UserPreferences /> },
    ],
  },

  {
    path: "/admin",
    element: (
      <PrivateRoute allowedRoles={["Admin"]}>
        <AdminLayout />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },

      // User Management
      {
        path: "user",
        element: <Outlet />,
        children: [
          { index: true, element: <UserManagement /> },
          { path: "add", element: <AddNewUser /> },
          { path: ":userId", element: <AddNewUser /> },
        ],
      },

      // Company Management
      {
        path: "company",
        element: <Outlet />,
        children: [
          { index: true, element: <CompanyManagement /> },
          { path: "add", element: <AddNewCompany /> },
          { path: "edit/:companyId", element: <AddNewCompany /> },
        ],
      },

      // Roles and Access
      {
        path: "user-role-&-access",
        element: <Outlet />,
        children: [
          { index: true, element: <RolesAndAccess /> },
          { path: "add-role", element: <AddRole /> },
          { path: ":UserGroupId", element: <UserGroupDetails /> },
        ],
      },

      // Simulation
      {
        path: "simulation",
        element: <Outlet />,
        children: [
          { index: true, element: <Simulation /> },
          { path: "new-simulation", element: <AddSimulation /> },
          { path: ":simulationId", element: <AddSimulation /> },
        ],
      },

      // Software
      {
        path: "software",
        element: <Outlet />,
        children: [
          { index: true, element: <Software /> },
          { path: "new-software", element: <AddNewSoftware /> },
          { path: ":softwareId", element: <AddNewSoftware /> },
        ],
      },

      // Packages
      {
        path: "packages",
        element: <Outlet />,
        children: [
          { index: true, element: <Packages /> },
          { path: "add-new-package", element: <AddNewPackage /> },
          { path: ":id", element: <ViewPackage /> },
        ],
      },

      { path: "datascience", element: <DataScience /> },
      { path: "plan", element: <Plans /> },
      { path: "user-assignment", element: <UserAssignment /> },
      { path: "payments", element: <Payments /> },
      { path: "skill-matrix", element: <SkillMatrix /> },
      { path: "view-skill-matrix", element: <ViewSkillMatrix /> },
      { path: "skill-matrix-view", element: <SkillMatrixView /> },
      { path: "score", element: <Score /> },
      { path: "profile", element: <Profile /> },
      { path: "invitations", element: <Invitations /> },
      { path: "inner-page", element: <InnerPage /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default router;
