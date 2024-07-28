import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouterProps {
  roles?: string[]; // Roles permitidos
}

const ProtectedRouter: React.FC<ProtectedRouterProps> = ({ roles }) => {
  const { user } = useAuth();

  if (!user || (roles && !roles.includes(user.role))) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRouter;
