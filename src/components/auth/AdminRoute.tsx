import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AdminRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex h-screen w-full items-center justify-center bg-gray-900 text-white">Loading Admin...</div>;
    }

    // Require authentication
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Require developer role specifically
    if (user.role !== 'developer') {
        // Redirect unauthorized users to the main dashboard
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
