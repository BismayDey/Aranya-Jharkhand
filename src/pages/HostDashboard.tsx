import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { VendorDashboard } from './VendorDashboard';
import { HotelDashboard } from './HotelDashboard';

export const HostDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not a host
    if (user && user.userType !== 'host') {
      navigate('/guest-dashboard');
      return;
    }
  }, [user, navigate]);

  // If user is not logged in, redirect to login
  if (!user) {
    navigate('/login');
    return null;
  }

  // Route to appropriate dashboard based on host type
  if (user.hostType === 'vendor') {
    return <VendorDashboard />;
  } else if (user.hostType === 'hotel-owner') {
    return <HotelDashboard />;
  }

  // Default fallback (shouldn't happen with proper auth flow)
  return <VendorDashboard />;
};