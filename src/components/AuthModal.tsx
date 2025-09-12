import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Sparkles,
  UserPlus,
  Users,
  Building,
  Store,
  Hotel,
  MapPin,
  Briefcase,
  Shield,
  CheckCircle,
  AlertCircle,
  Facebook,
  Instagram,
  Twitter,
  Github,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useAuth, UserType, HostType } from "../context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableElementRef = useRef<HTMLButtonElement>(null);
  const { login, signup, loginWithGoogle, isLoading } = useAuth() as any;
  const [mode, setMode] = useState<"login" | "signup" | "forgot-password">(
    "login"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserType>("guest");
  const [selectedHostType, setSelectedHostType] = useState<HostType>("vendor");
  const [step, setStep] = useState(1); // Multi-step signup

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
    // Host specific fields
    businessName: "",
    businessDescription: "",
  });

  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Password strength calculator
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(
        loginData.email,
        loginData.password,
        selectedUserType,
        selectedUserType === "host" ? selectedHostType : undefined
      );
      setSuccess("Successfully signed in! Redirecting...");
      toast.success("Welcome back! Successfully logged in.", {
        description: `Redirecting to your ${selectedUserType} dashboard...`,
        duration: 3000,
      });
      // Per request: always redirect users to guest dashboard after auth
      setTimeout(() => {
        try {
          window.location.pathname = "/guest-dashboard";
        } finally {
          onClose();
        }
      }, 1200);
    } catch (err) {
      const errorMessage =
        "Login failed. Please check your credentials and try again.";
      setError(errorMessage);
      toast.error("Login Failed", {
        description: errorMessage,
        duration: 4000,
      });
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (signupData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (passwordStrength < 3) {
      setError("Please choose a stronger password.");
      return;
    }

    try {
      await signup({
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        email: signupData.email,
        password: signupData.password,
        phone: signupData.phone,
        userType: selectedUserType,
        hostType: selectedUserType === "host" ? selectedHostType : undefined,
      });
      setSuccess("Account created successfully! Welcome to Jharkhand Tourism!");
      toast.success("🎉 Welcome to Jharkhand Tourism!", {
        description:
          "Your account has been created successfully. Redirecting...",
        duration: 3000,
      });
      // Per request: always redirect users to guest dashboard after signup
      setTimeout(() => {
        try {
          window.location.pathname = "/guest-dashboard";
        } finally {
          onClose();
        }
      }, 1500);
    } catch (err) {
      const errorMessage = "Signup failed. Please try again.";
      setError(errorMessage);
      toast.error("Signup Failed", {
        description: errorMessage,
        duration: 4000,
      });
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess("Password reset link sent to your email!");
      toast.success("Password Reset Email Sent", {
        description: "Check your email for password reset instructions.",
        duration: 4000,
      });
    } catch (err) {
      toast.error("Failed to send reset email", {
        description: "Please try again later.",
        duration: 4000,
      });
    }
    setTimeout(() => setMode("login"), 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "login" | "signup" | "forgot"
  ) => {
    const { name, value, type: inputType, checked } = e.target;

    if (type === "login") {
      setLoginData((prev) => ({
        ...prev,
        [name]: inputType === "checkbox" ? checked : value,
      }));
    } else if (type === "signup") {
      setSignupData((prev) => ({
        ...prev,
        [name]: inputType === "checkbox" ? checked : value,
      }));

      // Update password strength
      if (name === "password") {
        setPasswordStrength(calculatePasswordStrength(value));
      }
    } else {
      setForgotPasswordData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return "Very Weak";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Moderate";
    if (passwordStrength <= 4) return "Strong";
    return "Very Strong";
  };

  // Enhanced keyboard and focus management
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab") {
        // Focus trapping logic
        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [isOpen, onClose]
  );

  // Lock/unlock body scroll and setup keyboard listeners
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);

      // Focus the first element when modal opens
      setTimeout(() => {
        if (firstFocusableElementRef.current) {
          firstFocusableElementRef.current.focus();
        }
      }, 100);
    } else {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="auth-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="auth-modal-container">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              className="auth-modal-content glass-premium rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="auth-modal-title"
            >
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#18B668]/20 rounded-full blur-3xl animate-pulse"></div>
                <div
                  className="absolute bottom-0 left-0 w-32 h-32 bg-[#F59E0B]/20 rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#0EA5E9]/10 rounded-full blur-2xl animate-float"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8">
                {/* Close Button */}
                <motion.button
                  ref={firstFocusableElementRef}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                  aria-label="Close authentication modal"
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Modal Title */}
                <h2 id="auth-modal-title" className="sr-only">
                  {mode === "login"
                    ? "Sign In"
                    : mode === "signup"
                    ? "Create Account"
                    : "Reset Password"}
                </h2>

                {/* Modal Tabs */}
                <div className="flex bg-white/5 rounded-2xl p-1.5 mb-8 relative">
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute top-1.5 bottom-1.5 rounded-xl bg-[#18B668] transition-all duration-300 ${
                      mode === "login"
                        ? "left-1.5 right-1/2"
                        : mode === "signup"
                        ? "left-1/2 right-1.5"
                        : "left-1.5 right-1.5"
                    }`}
                  />
                  <button
                    onClick={() => setMode("login")}
                    className={`relative flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 z-10 ${
                      mode === "login"
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setMode("signup")}
                    className={`relative flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 z-10 ${
                      mode === "signup"
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* User Type Selection */}
                {(mode === "login" || mode === "signup") && (
                  <div className="mb-6">
                    <Label className="text-white/90 font-medium mb-4 block">
                      Join as:
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setSelectedUserType("guest")}
                        className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                          selectedUserType === "guest"
                            ? "border-[#18B668] bg-[#18B668]/15 shadow-lg shadow-[#18B668]/20"
                            : "border-white/20 hover:border-white/40 hover:bg-white/5"
                        }`}
                      >
                        <Users
                          className={`w-8 h-8 mx-auto mb-3 ${
                            selectedUserType === "guest"
                              ? "text-[#18B668]"
                              : "text-white/70"
                          }`}
                        />
                        <div
                          className={`font-semibold ${
                            selectedUserType === "guest"
                              ? "text-[#18B668]"
                              : "text-white"
                          }`}
                        >
                          Guest
                        </div>
                        <div className="text-xs text-white/60 mt-2">
                          Book trips & experiences
                        </div>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setSelectedUserType("host")}
                        className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                          selectedUserType === "host"
                            ? "border-[#18B668] bg-[#18B668]/15 shadow-lg shadow-[#18B668]/20"
                            : "border-white/20 hover:border-white/40 hover:bg-white/5"
                        }`}
                      >
                        <Building
                          className={`w-8 h-8 mx-auto mb-3 ${
                            selectedUserType === "host"
                              ? "text-[#18B668]"
                              : "text-white/70"
                          }`}
                        />
                        <div
                          className={`font-semibold ${
                            selectedUserType === "host"
                              ? "text-[#18B668]"
                              : "text-white"
                          }`}
                        >
                          Host
                        </div>
                        <div className="text-xs text-white/60 mt-2">
                          List properties & services
                        </div>
                      </motion.button>
                    </div>

                    {/* Host Type Selection */}
                    {selectedUserType === "host" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <Label className="text-white/90 text-sm mb-3 block">
                          Host Type:
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={() => setSelectedHostType("vendor")}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                              selectedHostType === "vendor"
                                ? "border-[#F59E0B] bg-[#F59E0B]/15"
                                : "border-white/20 hover:border-white/40"
                            }`}
                          >
                            <Store
                              className={`w-6 h-6 mx-auto mb-2 ${
                                selectedHostType === "vendor"
                                  ? "text-[#F59E0B]"
                                  : "text-white/70"
                              }`}
                            />
                            <div
                              className={`font-medium text-sm ${
                                selectedHostType === "vendor"
                                  ? "text-[#F59E0B]"
                                  : "text-white"
                              }`}
                            >
                              Vendor
                            </div>
                            <div className="text-xs text-white/60 mt-1">
                              Sell products in marketplace
                            </div>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={() => setSelectedHostType("hotel-owner")}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                              selectedHostType === "hotel-owner"
                                ? "border-[#0EA5E9] bg-[#0EA5E9]/15"
                                : "border-white/20 hover:border-white/40"
                            }`}
                          >
                            <Hotel
                              className={`w-6 h-6 mx-auto mb-2 ${
                                selectedHostType === "hotel-owner"
                                  ? "text-[#0EA5E9]"
                                  : "text-white/70"
                              }`}
                            />
                            <div
                              className={`font-medium text-sm ${
                                selectedHostType === "hotel-owner"
                                  ? "text-[#0EA5E9]"
                                  : "text-white"
                              }`}
                            >
                              Hotel Owner
                            </div>
                            <div className="text-xs text-white/60 mt-1">
                              List accommodations
                            </div>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Status Messages */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <p className="text-red-400 text-sm">{error}</p>
                    </motion.div>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <p className="text-green-400 text-sm">{success}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Login Form */}
                <AnimatePresence mode="wait">
                  {mode === "login" && (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Header */}
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 glass rounded-2xl mb-4">
                          <Sparkles className="w-8 h-8 text-[#18B668]" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                          Welcome Back
                        </h2>
                        <p className="text-white/70">
                          Sign in to continue your Jharkhand adventure
                        </p>
                      </div>

                      <form onSubmit={handleLoginSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-white/90 font-medium"
                          >
                            Email Address
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={loginData.email}
                              onChange={(e) => handleInputChange(e, "login")}
                              required
                              className="pl-12 h-14 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-xl"
                              placeholder="Enter your email address"
                            />
                          </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="password"
                            className="text-white/90 font-medium"
                          >
                            Password
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                            <Input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              value={loginData.password}
                              onChange={(e) => handleInputChange(e, "login")}
                              required
                              className="pl-12 pr-12 h-14 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-xl"
                              placeholder="Enter your password"
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </motion.button>
                          </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              name="rememberMe"
                              checked={loginData.rememberMe}
                              onChange={(e) => handleInputChange(e, "login")}
                              className="w-5 h-5 rounded-lg border-white/20 text-[#18B668] focus:ring-[#18B668]/20 bg-transparent"
                            />
                            <span className="text-sm text-white/70">
                              Remember me
                            </span>
                          </label>
                          <button
                            type="button"
                            onClick={() => setMode("forgot-password")}
                            className="text-sm text-[#18B668] hover:text-[#18B668]/80 transition-colors font-medium"
                          >
                            Forgot password?
                          </button>
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full h-14 bg-[#18B668] hover:bg-[#18B668]/90 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#18B668]/30 disabled:opacity-50 text-lg"
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Signing In...
                            </div>
                          ) : (
                            `Sign In as ${
                              selectedUserType === "guest"
                                ? "Guest"
                                : selectedHostType === "vendor"
                                ? "Vendor"
                                : "Hotel Owner"
                            }`
                          )}
                        </Button>

                        {/* Dedicated Pages Option */}
                        <div className="text-center my-4 p-4 glass-dark rounded-xl border border-white/10">
                          <p className="text-white/70 text-sm mb-2">
                            Need more space? Try our full-screen experience
                          </p>
                          <Link
                            to="/login"
                            onClick={onClose}
                            className="inline-flex items-center gap-2 text-[#18B668] hover:text-[#18B668]/80 text-sm font-medium transition-colors"
                          >
                            <span>Go to Full Sign In Page</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>

                        {/* Social Login */}
                        <div className="relative my-6">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/20"></div>
                          </div>
                          <div className="relative flex justify-center">
                            <span className="px-6 bg-black text-white/70 text-sm">
                              Or continue with
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={async () => {
                              try {
                                await loginWithGoogle(
                                  selectedUserType,
                                  selectedUserType === "host"
                                    ? selectedHostType
                                    : undefined
                                );
                                toast.success("Signed in with Google");
                                onClose();
                              } catch (err) {
                                console.error("Google sign-in failed", err);
                                toast.error("Google sign-in failed");
                              }
                            }}
                            className="h-12 glass-dark border-white/20 text-white hover:bg-white/10 p-0"
                          >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                          </Button>
                          <div />
                          <Button
                            type="button"
                            variant="outline"
                            className="h-12 glass-dark border-white/20 text-white hover:bg-white/10 p-0"
                            onClick={() =>
                              toast.info("Twitter sign-in not configured")
                            }
                          >
                            <Twitter className="w-5 h-5" />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="h-12 glass-dark border-white/20 text-white hover:bg-white/10 p-0"
                            onClick={() =>
                              toast.info("GitHub sign-in not configured")
                            }
                          >
                            <Github className="w-5 h-5" />
                          </Button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* Signup Form */}
                  {mode === "signup" && (
                    <motion.div
                      key="signup"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Header */}
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 glass rounded-2xl mb-4">
                          <UserPlus className="w-8 h-8 text-[#18B668]" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                          Join the Adventure
                        </h2>
                        <p className="text-white/70">
                          Create your Jharkhand tourism account
                        </p>
                      </div>

                      <form onSubmit={handleSignupSubmit} className="space-y-5">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="firstName"
                              className="text-white/90 font-medium text-sm"
                            >
                              First Name
                            </Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                              <Input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={signupData.firstName}
                                onChange={(e) => handleInputChange(e, "signup")}
                                required
                                className="pl-10 h-12 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-lg"
                                placeholder="First name"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="lastName"
                              className="text-white/90 font-medium text-sm"
                            >
                              Last Name
                            </Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              type="text"
                              value={signupData.lastName}
                              onChange={(e) => handleInputChange(e, "signup")}
                              required
                              className="h-12 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-lg"
                              placeholder="Last name"
                            />
                          </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-white/90 font-medium text-sm"
                          >
                            Email Address
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={signupData.email}
                              onChange={(e) => handleInputChange(e, "signup")}
                              required
                              className="pl-10 h-12 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-lg"
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>

                        {/* Phone & Location Fields */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="phone"
                              className="text-white/90 font-medium text-sm"
                            >
                              Phone Number
                            </Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                              <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={signupData.phone}
                                onChange={(e) => handleInputChange(e, "signup")}
                                required
                                className="pl-10 h-12 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-lg"
                                placeholder="+91 98765 43210"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="location"
                              className="text-white/90 font-medium text-sm"
                            >
                              Location
                            </Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                              <Input
                                id="location"
                                name="location"
                                type="text"
                                value={signupData.location}
                                onChange={(e) => handleInputChange(e, "signup")}
                                className="pl-10 h-12 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-lg"
                                placeholder="Your city"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Business Fields for Hosts */}
                        {selectedUserType === "host" && (
                          <div className="space-y-4 p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                              <Briefcase className="w-4 h-4 text-[#18B668]" />
                              <span className="text-white/90 font-medium text-sm">
                                {selectedHostType === "vendor"
                                  ? "Store Information"
                                  : "Property Information"}
                              </span>
                            </div>
                            <Input
                              name="businessName"
                              placeholder={
                                selectedHostType === "vendor"
                                  ? "Store name"
                                  : "Property name"
                              }
                              value={signupData.businessName}
                              onChange={(e) => handleInputChange(e, "signup")}
                              className="h-12 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-lg"
                            />
                          </div>
                        )}

                        {/* Password Fields */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="password"
                              className="text-white/90 font-medium text-sm"
                            >
                              Password
                            </Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                              <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={signupData.password}
                                onChange={(e) => handleInputChange(e, "signup")}
                                required
                                className="pl-10 pr-10 h-12 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-lg"
                                placeholder="Create a strong password"
                              />
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                              >
                                {showPassword ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </motion.button>
                            </div>
                            {/* Password Strength Indicator */}
                            {signupData.password && (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                      style={{
                                        width: `${
                                          (passwordStrength / 5) * 100
                                        }%`,
                                      }}
                                    />
                                  </div>
                                  <span
                                    className={`text-xs font-medium ${
                                      passwordStrength <= 2
                                        ? "text-red-400"
                                        : passwordStrength <= 3
                                        ? "text-yellow-400"
                                        : "text-green-400"
                                    }`}
                                  >
                                    {getPasswordStrengthText()}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="confirmPassword"
                              className="text-white/90 font-medium text-sm"
                            >
                              Confirm Password
                            </Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                              <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={signupData.confirmPassword}
                                onChange={(e) => handleInputChange(e, "signup")}
                                required
                                className="pl-10 pr-10 h-12 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-lg"
                                placeholder="Confirm your password"
                              />
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
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
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Terms & Newsletter */}
                        <div className="space-y-3">
                          <label className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              name="agreeToTerms"
                              checked={signupData.agreeToTerms}
                              onChange={(e) => handleInputChange(e, "signup")}
                              required
                              className="w-5 h-5 mt-0.5 rounded-lg border-white/20 text-[#18B668] focus:ring-[#18B668]/20 bg-transparent"
                            />
                            <span className="text-xs text-white/70 leading-relaxed">
                              I agree to the{" "}
                              <button
                                type="button"
                                className="text-[#18B668] hover:text-[#18B668]/80 underline"
                              >
                                Terms of Service
                              </button>{" "}
                              and{" "}
                              <button
                                type="button"
                                className="text-[#18B668] hover:text-[#18B668]/80 underline"
                              >
                                Privacy Policy
                              </button>
                            </span>
                          </label>

                          <label className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              name="subscribeNewsletter"
                              checked={signupData.subscribeNewsletter}
                              onChange={(e) => handleInputChange(e, "signup")}
                              className="w-5 h-5 mt-0.5 rounded-lg border-white/20 text-[#18B668] focus:ring-[#18B668]/20 bg-transparent"
                            />
                            <span className="text-xs text-white/70 leading-relaxed">
                              Subscribe to our newsletter for travel updates and
                              exclusive offers
                            </span>
                          </label>
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          disabled={
                            !signupData.agreeToTerms ||
                            isLoading ||
                            passwordStrength < 3
                          }
                          className="w-full h-14 bg-[#18B668] hover:bg-[#18B668]/90 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#18B668]/30 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Creating Account...
                            </div>
                          ) : (
                            `Create ${
                              selectedUserType === "guest"
                                ? "Guest"
                                : selectedHostType === "vendor"
                                ? "Vendor"
                                : "Hotel Owner"
                            } Account`
                          )}
                        </Button>

                        {/* Dedicated Pages Option */}
                        <div className="text-center my-4 p-4 glass-dark rounded-xl border border-white/10">
                          <p className="text-white/70 text-sm mb-2">
                            Need more space? Try our full-screen experience
                          </p>
                          <Link
                            to="/signup"
                            onClick={onClose}
                            className="inline-flex items-center gap-2 text-[#18B668] hover:text-[#18B668]/80 text-sm font-medium transition-colors"
                          >
                            <span>Go to Full Sign Up Page</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>

                        {/* Social Signup */}
                        <div className="relative my-6">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/20"></div>
                          </div>
                          <div className="relative flex justify-center">
                            <span className="px-6 bg-black text-white/70 text-sm">
                              Or sign up with
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            className="h-12 glass-dark border-white/20 text-white hover:bg-white/10 p-0"
                          >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="h-12 glass-dark border-white/20 text-white hover:bg-white/10 p-0"
                          >
                            <Facebook className="w-5 h-5" />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="h-12 glass-dark border-white/20 text-white hover:bg-white/10 p-0"
                          >
                            <Twitter className="w-5 h-5" />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="h-12 glass-dark border-white/20 text-white hover:bg-white/10 p-0"
                          >
                            <Github className="w-5 h-5" />
                          </Button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* Forgot Password Form */}
                  {mode === "forgot-password" && (
                    <motion.div
                      key="forgot-password"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Header */}
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 glass rounded-2xl mb-4">
                          <Shield className="w-8 h-8 text-[#18B668]" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                          Reset Password
                        </h2>
                        <p className="text-white/70">
                          Enter your email to receive a reset link
                        </p>
                      </div>

                      <form
                        onSubmit={handleForgotPassword}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-white/90 font-medium"
                          >
                            Email Address
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={forgotPasswordData.email}
                              onChange={(e) => handleInputChange(e, "forgot")}
                              required
                              className="pl-12 h-14 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-xl"
                              placeholder="Enter your email address"
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full h-14 bg-[#18B668] hover:bg-[#18B668]/90 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#18B668]/30 text-lg"
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Sending Reset Link...
                            </div>
                          ) : (
                            "Send Reset Link"
                          )}
                        </Button>

                        <div className="text-center">
                          <button
                            type="button"
                            onClick={() => setMode("login")}
                            className="text-sm text-[#18B668] hover:text-[#18B668]/80 transition-colors font-medium"
                          >
                            ← Back to Sign In
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Floating Elements */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    transition={{ delay: i * 0.2, duration: 1 }}
                    className="absolute w-1 h-1 bg-[#18B668] rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
