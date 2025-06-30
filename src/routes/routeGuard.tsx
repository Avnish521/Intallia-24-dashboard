// src/routes/guards/RouteGuard.tsx
import { Navigate } from "react-router-dom";
import { type ReactNode, type FC } from "react";
import { STORAGE_KEY } from "@/constants";
import { getUserData } from "@/utils";

interface RouteGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireGuest?: boolean;
  allowedRoles?: string[];
  redirectTo?: string;
}

const ROUTES = {
  DEFAULT: "/",
  LOGIN: "/login",
  UNAUTHORIZED: "/unauthorized",
  ADMIN_DASHBOARD: "/admin/dashboard",
  STUDENT_DASHBOARD: "/",
} as const;

const RouteGuard: FC<RouteGuardProps> = ({
  children,
  requireAuth = false,
  requireGuest = false,
  allowedRoles,
  redirectTo = ROUTES.DEFAULT,
}) => {

  const userData = getUserData(STORAGE_KEY);

  const token = userData?.Token;
  const role = userData?.UserGroupId;

  if (requireAuth && !token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (requireGuest && token) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles?.length && (!role || !allowedRoles.includes(role))) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;
