import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useScrollToTop from "../hooks/useScrollToTop";

export function Profile() {
  useScrollToTop();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // If user is not logged in, redirect to home
    if (!user) {
      navigate("/");
      return;
    }

    // Per request: always redirect to guest dashboard after auth
    navigate("/guest-dashboard");
  }, [user, navigate]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#18B668]/30 border-t-[#18B668] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white/70">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
