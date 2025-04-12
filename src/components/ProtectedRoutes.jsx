import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export const ProtectedRoutes = ({ children }) => {
  const { getCurrentUser } = useUser();
  const user = getCurrentUser();
  const location = useLocation();
  const token = localStorage.getItem("token");
 

  if (!token || !user) {
    return <Navigate to="/loginregistro" state={{ from: location }} replace />;
  }

  return children;
};