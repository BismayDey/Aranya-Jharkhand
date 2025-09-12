import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  UserPlus,
  Users,
  Building,
  Compass,
  Mountain,
  TreePine,
  Waves,
  ArrowLeft,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth, UserType } from "../context/AuthContext";
import { toast } from "sonner";
import useScrollToTop from "../hooks/useScrollToTop";

export const Signup = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { user, signup, loginWithGoogle, isLoading } = useAuth() as any;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserType>("guest");
  const [error, setError] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      // Redirect to role-aware dashboard
      const pathForUser = () => {
        if (user.userType === "host") {
          if (user.hostType === "vendor") return "/vendor-dashboard";
          if (user.hostType === "hotel-owner") return "/hotel-dashboard";
          return "/host-dashboard";
        }
        return "/guest-dashboard";
      };

      navigate(pathForUser());
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      const error = "Passwords do not match!";
      setError(error);
      toast.error("Password Mismatch", {
        description: error,
        duration: 3000,
      });
      return;
    }

    if (formData.password.length < 6) {
      const error = "Password must be at least 6 characters long.";
      setError(error);
      toast.error("Weak Password", {
        description: error,
        duration: 3000,
      });
      return;
    }

    if (!formData.agreeToTerms) {
      const error = "Please agree to the terms and conditions.";
      setError(error);
      toast.error("Terms Required", {
        description: error,
        duration: 3000,
      });
      return;
    }

    try {
      await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        userType: selectedUserType,
      });
      toast.success("🎉 Welcome to Jharkhand Tourism!", {
        description: `Account created successfully. Welcome ${formData.firstName}!`,
        duration: 3000,
      });
    } catch (err) {
      const e: any = err;
      const errorMessage =
        e?.code || e?.message || "Signup failed. Please try again.";
      setError(errorMessage);
      toast.error("Account Creation Failed", {
        description: errorMessage,
        duration: 6000,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Immersive Background with Parallax */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000410] to-black"></div>

        {/* Animated Geometric Patterns */}
        <div className="absolute inset-0">
          {/* Tribal Pattern Elements */}
          <motion.div
            className="absolute top-32 right-20 w-40 h-40 opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#18B668]">
              <path
                fill="currentColor"
                d="M50 5 L95 50 L50 95 L5 50 Z M50 15 L85 50 L50 85 L15 50 Z M50 25 L75 50 L50 75 L25 50 Z"
              />
            </svg>
          </motion.div>

          <motion.div
            className="absolute top-40 left-16 w-28 h-28 opacity-10"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#F59E0B]">
              <polygon
                points="50,5 90,35 75,85 25,85 10,35"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <polygon
                points="50,20 75,40 65,70 35,70 25,40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="50" cy="45" r="8" fill="currentColor" />
            </svg>
          </motion.div>
        </div>

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/3 left-1/5 w-80 h-80 bg-[#18B668]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/5 w-72 h-72 bg-[#F59E0B]/15 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.15, 0.35, 0.15],
            y: [0, -40, 0],
          }}
          transition={{ duration: 7, repeat: Infinity }}
        />

        <motion.div
          className="absolute top-2/3 left-1/2 w-60 h-60 bg-[#0EA5E9]/12 rounded-full blur-2xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 9, repeat: Infinity }}
        />

        {/* Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[#18B668] rounded-full opacity-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -120, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-center p-12 xl:p-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-8 text-white/70 hover:text-white hover:bg-white/10 w-fit"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
                <UserPlus className="w-5 h-5 text-[#18B668]" />
                <span className="text-[#18B668] text-sm font-medium">
                  Join the Adventure
                </span>
              </div>

              <h1 className="text-5xl xl:text-7xl font-bold text-white leading-tight">
                Start Your
                <span className="block bg-gradient-to-r from-[#18B668] via-[#0EA5E9] to-[#F59E0B] bg-clip-text text-transparent">
                  Journey
                </span>
              </h1>

              <p className="text-xl text-white/70 max-w-lg leading-relaxed">
                Join thousands of explorers discovering the hidden gems of
                Jharkhand. Create your account and unlock exclusive access to
                curated experiences.
              </p>

              <div className="grid grid-cols-1 gap-6 pt-8 max-w-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
                    <Mountain className="w-6 h-6 text-[#18B668]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Explore Hill Stations
                    </p>
                    <p className="text-white/60 text-sm">
                      Netarhat, Deoghar, and more scenic destinations
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
                    <Waves className="w-6 h-6 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Discover Waterfalls
                    </p>
                    <p className="text-white/60 text-sm">
                      Hundru Falls and pristine natural wonders
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
                    <TreePine className="w-6 h-6 text-[#065F46]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Wildlife Adventures
                    </p>
                    <p className="text-white/60 text-sm">
                      Betla National Park safari experiences
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-1/2 xl:w-2/5 flex items-start justify-center p-6 lg:p-12 overflow-y-auto">
          <motion.div
            className="w-full max-w-md pt-8 lg:pt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Mobile Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="lg:hidden mb-6 text-white/70 hover:text-white hover:bg-white/10 w-fit"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="glass-premium rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#18B668]/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F59E0B]/20 rounded-full blur-xl"></div>

              {/* Mobile Header */}
              <div className="lg:hidden text-center mb-8 relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 glass rounded-2xl mb-4">
                  <Compass className="w-8 h-8 text-[#18B668]" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Join the Adventure
                </h2>
                <p className="text-white/70">
                  Create your Jharkhand tourism account
                </p>
              </div>

              {/* User Type Selection */}
              <div className="mb-8 relative z-10">
                <Label className="text-white/90 text-sm mb-4 block">
                  Join as:
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    type="button"
                    onClick={() => setSelectedUserType("guest")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedUserType === "guest"
                        ? "border-[#18B668] bg-[#18B668]/10 shadow-lg shadow-[#18B668]/20"
                        : "border-white/20 hover:border-white/40"
                    }`}
                  >
                    <Users
                      className={`w-6 h-6 mx-auto mb-2 ${
                        selectedUserType === "guest"
                          ? "text-[#18B668]"
                          : "text-white/70"
                      }`}
                    />
                    <div
                      className={`font-medium text-sm ${
                        selectedUserType === "guest"
                          ? "text-[#18B668]"
                          : "text-white"
                      }`}
                    >
                      Guest
                    </div>
                    <div className="text-xs text-white/60 mt-1">
                      Explore & Book
                    </div>
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() => setSelectedUserType("host")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedUserType === "host"
                        ? "border-[#18B668] bg-[#18B668]/10 shadow-lg shadow-[#18B668]/20"
                        : "border-white/20 hover:border-white/40"
                    }`}
                  >
                    <Building
                      className={`w-6 h-6 mx-auto mb-2 ${
                        selectedUserType === "host"
                          ? "text-[#18B668]"
                          : "text-white/70"
                      }`}
                    />
                    <div
                      className={`font-medium text-sm ${
                        selectedUserType === "host"
                          ? "text-[#18B668]"
                          : "text-white"
                      }`}
                    >
                      Host
                    </div>
                    <div className="text-xs text-white/60 mt-1">
                      List & Manage
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl relative z-10"
                >
                  <p className="text-red-400 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-white/90 text-sm"
                    >
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="pl-10 h-11 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-xl text-sm"
                        placeholder="First name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white/90 text-sm">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="h-11 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-xl text-sm"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90 text-sm">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="pl-10 h-11 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-xl text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/90 text-sm">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="pl-10 h-11 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-xl text-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/90 text-sm">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="pl-10 pr-10 h-11 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-xl text-sm"
                      placeholder="Create password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-white/90 text-sm"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="pl-10 pr-10 h-11 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-xl text-sm"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms & Newsletter */}
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      required
                      className="w-4 h-4 mt-0.5 rounded border-white/20 text-[#18B668] focus:ring-[#18B668]/20 bg-transparent"
                    />
                    <span className="text-xs text-white/70 leading-relaxed">
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-[#18B668] hover:text-[#18B668]/80 font-medium"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-[#18B668] hover:text-[#18B668]/80 font-medium"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onChange={handleInputChange}
                      className="w-4 h-4 mt-0.5 rounded border-white/20 text-[#18B668] focus:ring-[#18B668]/20 bg-transparent"
                    />
                    <span className="text-xs text-white/70 leading-relaxed">
                      Subscribe to newsletter for travel updates and offers
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={!formData.agreeToTerms || isLoading}
                    className="w-full h-12 bg-[#18B668] hover:bg-[#18B668]/90 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#18B668]/30 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      `Create ${
                        selectedUserType === "guest" ? "Guest" : "Host"
                      } Account`
                    )}
                  </Button>
                </motion.div>

                {/* Social Signup */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 glass-dark text-white/70 rounded-full">
                      Or sign up with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      onClick={async () => {
                        try {
                          await loginWithGoogle(selectedUserType);
                          toast.success("Signed up with Google");
                        } catch (err) {
                          console.error("Google sign-up failed", err);
                          toast.error("Google sign-up failed");
                        }
                      }}
                      className="w-full h-11 glass-dark border-white/20 text-white hover:bg-white/10 rounded-xl text-sm"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-11 glass-dark border-white/20 text-white hover:bg-white/10 rounded-xl text-sm"
                      onClick={() =>
                        toast.info(
                          "Facebook sign-in removed; use Google or email/password"
                        )
                      }
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </Button>
                  </motion.div>
                </div>
              </form>

              {/* Login Link */}
              <div className="text-center mt-6 relative z-10">
                <span className="text-white/70 text-sm">
                  Already have an account?{" "}
                </span>
                <Link
                  to="/login"
                  className="text-[#18B668] hover:text-[#18B668]/80 font-semibold text-sm transition-colors"
                >
                  Sign in here
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
