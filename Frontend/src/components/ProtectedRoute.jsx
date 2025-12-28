// ProtectedRoute.jsx (تحسين)
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../ui/Spinner";
import { setUser } from "./../features/user/authSlice"; // action to set user
import axiosClient from "./../services/axiosClient"; // افتراضياً لديك axios client

function ProtectedRoute({ children, requiredRole }) {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          setChecking(false);
          return;
        }

        // if redux already has user and token exists, nothing to do
        if (user && token) {
          setChecking(false);
          return;
        }

        // fetch current user profile
        const res = await axiosClient.get("/users/me");
        if (res?.data?.user) {
          dispatch(setUser(res.data.user));
        } else {
          // If no user data received, clear token
          localStorage.removeItem("jwt");
        }
      } catch (err) {
        console.warn("Failed to fetch profile", err);
        // Clear invalid token
        localStorage.removeItem("jwt");
      } finally {
        setChecking(false);
      }
    }
    bootstrap();
  }, [dispatch, user]);

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  const token = localStorage.getItem("jwt");

  // If no token or not authenticated, redirect to login immediately
  if (!token || !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role requirement if specified
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 text-red-700 p-6 rounded-xl shadow">
          You are not authorized to view this page.
        </div>
      </div>
    );
  }

  // If all checks pass, render the protected content
  return children;
}

export default ProtectedRoute;
