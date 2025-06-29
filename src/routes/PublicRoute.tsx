import RouteGuard from "./routeGuard";
import { ReactNode } from "react";

const PublicRoute = ({
  children,
  redirectTo = "/",
}: {
  children: ReactNode;
  redirectTo?: string;
}) => (
  <RouteGuard requireGuest redirectTo={redirectTo}>
    {children}
  </RouteGuard>
);

export default PublicRoute;
