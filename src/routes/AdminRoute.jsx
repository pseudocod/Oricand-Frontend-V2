import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useAuth } from "@/features/auth/context/UserContext";

const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!user || user.role !== "ROLE_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
