import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { VendorDashboard } from "./VendorDashboard";
import { HotelDashboard } from "./HotelDashboard";

export const HostDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not logged in, navigate to login
    if (user === null) {
      navigate("/login");
      return;
    }

    // Redirect if logged-in user is not a host
    if (user && user.userType !== "host") {
      navigate("/guest-dashboard");
      return;
    }
  }, [user, navigate]);

  // While effect may redirect, render a small loading state until user is available
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#18B668]/30 border-t-[#18B668] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">
            Checking account... Redirecting if necessary.
          </p>
        </div>
      </div>
    );
  }

  // Route to appropriate dashboard based on host type
  if (user.hostType === "vendor") {
    return <VendorDashboard />;
  } else if (user.hostType === "hotel-owner") {
    return <HotelDashboard />;
  }

  // Default fallback (shouldn't happen with proper auth flow)
  return <VendorDashboard />;
};
