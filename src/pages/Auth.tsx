import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
  Sparkles,
  Store,
  Hotel,
  ShoppingBag
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth, UserType, HostType } from '../context/AuthContext';
import { toast } from 'sonner';
import useScrollToTop from '../hooks/useScrollToTop';

export const Auth = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, login, signup, isLoading } = useAuth();
  
  // Get mode from URL params, default to 'signin'
  const [mode, setMode] = useState<'signin' | 'signup'>(
    searchParams.get('mode') === 'signup' ? 'signup' : 'signin'
  );
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserType>('guest');
  const [selectedHostType, setSelectedHostType] = useState<HostType>('vendor');
  const [error, setError] = useState('');
  const [scrollY, setScrollY] = useState(0);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      if (user.userType === 'host') {
        navigate('/host-dashboard');
      } else {
        navigate('/guest-dashboard');
      }
    }
  }, [user, navigate]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(loginData.email, loginData.password, selectedUserType);
      toast.success('🎉 Welcome back!', {
        description: `Successfully signed in as ${selectedUserType}. Redirecting to your dashboard...`,
        duration: 3000,
      });
    } catch (err) {
      const errorMessage = 'Login failed. Please check your credentials.';
      setError(errorMessage);
      toast.error('Sign In Failed', {
        description: errorMessage,
        duration: 4000,
      });
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (signupData.password !== signupData.confirmPassword) {
      const error = 'Passwords do not match!';
      setError(error);
      toast.error('Password Mismatch', {
        description: error,
        duration: 3000,
      });
      return;
    }
    
    if (signupData.password.length < 6) {
      const error = 'Password must be at least 6 characters long.';
      setError(error);
      toast.error('Weak Password', {
        description: error,
        duration: 3000,
      });
      return;
    }

    if (!signupData.agreeToTerms) {
      const error = 'Please agree to the terms and conditions.';
      setError(error);
      toast.error('Terms Required', {
        description: error,
        duration: 3000,
      });
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
        hostType: selectedUserType === 'host' ? selectedHostType : undefined,
      });
      toast.success('🎉 Welcome to Jharkhand Tourism!', {
        description: `Account created successfully. Welcome ${signupData.firstName}!`,
        duration: 3000,
      });
    } catch (err) {
      const errorMessage = 'Signup failed. Please try again.';
      setError(errorMessage);
      toast.error('Account Creation Failed', {
        description: errorMessage,
        duration: 4000,
      });
    }
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleMode = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    setError('');
    // Update URL without navigation
    const url = new URL(window.location.href);
    url.searchParams.set('mode', newMode);
    window.history.replaceState({}, '', url.toString());
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
            className="absolute top-20 left-10 w-32 h-32 opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#18B668]">
              <path fill="currentColor" d="M50 10 L90 50 L50 90 L10 50 Z M50 20 L80 50 L50 80 L20 50 Z"/>
            </svg>
          </motion.div>
          
          <motion.div
            className="absolute bottom-20 right-10 w-24 h-24 opacity-10"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#F59E0B]">
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="4"/>
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="50" cy="50" r="10" fill="currentColor"/>
            </svg>
          </motion.div>
        </div>

        {/* Floating Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#18B668]/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#F59E0B]/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <motion.div 
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#0EA5E9]/10 rounded-full blur-2xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#18B668] rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
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
                {mode === 'signin' ? (
                  <>
                    <Sparkles className="w-5 h-5 text-[#18B668]" />
                    <span className="text-[#18B668] text-sm font-medium">Welcome Back</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 text-[#18B668]" />
                    <span className="text-[#18B668] text-sm font-medium">Join the Adventure</span>
                  </>
                )}
              </div>
              
              <h1 className="text-5xl xl:text-7xl font-bold text-white leading-tight">
                {mode === 'signin' ? 'Continue Your' : 'Start Your'}
                <span className="block bg-gradient-to-r from-[#18B668] via-[#0EA5E9] to-[#F59E0B] bg-clip-text text-transparent">
                  {mode === 'signin' ? 'Adventure' : 'Journey'}
                </span>
              </h1>
              
              <p className="text-xl text-white/70 max-w-lg leading-relaxed">
                {mode === 'signin' 
                  ? 'Sign in to access your personalized travel dashboard and continue exploring the wonders of Jharkhand.'
                  : 'Join thousands of explorers discovering the hidden gems of Jharkhand. Create your account and unlock exclusive access to curated experiences.'
                }
              </p>
              
              <div className="grid grid-cols-1 gap-6 pt-8 max-w-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
                    <Mountain className="w-6 h-6 text-[#18B668]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Explore Hill Stations</p>
                    <p className="text-white/60 text-sm">Netarhat, Deoghar, and more scenic destinations</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
                    <Waves className="w-6 h-6 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Discover Waterfalls</p>
                    <p className="text-white/60 text-sm">Hundru Falls and pristine natural wonders</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
                    <TreePine className="w-6 h-6 text-[#065F46]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Wildlife Adventures</p>
                    <p className="text-white/60 text-sm">Betla National Park safari experiences</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
          <motion.div 
            className="w-full max-w-md"
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
                  {mode === 'signin' ? 'Welcome Back' : 'Join the Adventure'}
                </h2>
                <p className="text-white/70">
                  {mode === 'signin' 
                    ? 'Continue your Jharkhand adventure' 
                    : 'Create your Jharkhand tourism account'
                  }
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="mb-8 relative z-10">
                <div className="flex glass rounded-xl p-1">
                  <button
                    onClick={() => toggleMode('signin')}
                    className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-medium text-sm ${
                      mode === 'signin'
                        ? 'bg-[#18B668] text-white shadow-lg'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => toggleMode('signup')}
                    className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-medium text-sm ${
                      mode === 'signup'
                        ? 'bg-[#18B668] text-white shadow-lg'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* User Type Selection */}
              <div className="mb-8 relative z-10">
                <Label className="text-white/90 text-sm mb-4 block">
                  {mode === 'signin' ? 'Sign in as:' : 'Join as:'}
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    type="button"
                    onClick={() => setSelectedUserType('guest')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedUserType === 'guest'
                        ? 'border-[#18B668] bg-[#18B668]/10 shadow-lg shadow-[#18B668]/20'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <Users className={`w-6 h-6 mx-auto mb-2 ${
                      selectedUserType === 'guest' ? 'text-[#18B668]' : 'text-white/70'
                    }`} />
                    <div className={`font-medium text-sm ${
                      selectedUserType === 'guest' ? 'text-[#18B668]' : 'text-white'
                    }`}>
                      Guest
                    </div>
                    <div className="text-xs text-white/60 mt-1">
                      Explore & Book
                    </div>
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={() => setSelectedUserType('host')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedUserType === 'host'
                        ? 'border-[#18B668] bg-[#18B668]/10 shadow-lg shadow-[#18B668]/20'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <Building className={`w-6 h-6 mx-auto mb-2 ${
                      selectedUserType === 'host' ? 'text-[#18B668]' : 'text-white/70'
                    }`} />
                    <div className={`font-medium text-sm ${
                      selectedUserType === 'host' ? 'text-[#18B668]' : 'text-white'
                    }`}>
                      Host
                    </div>
                    <div className="text-xs text-white/60 mt-1">
                      List & Manage
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Host Type Selection - Only for signup and host type */}
              {mode === 'signup' && selectedUserType === 'host' && (
                <div className="mb-8 relative z-10">
                  <Label className="text-white/90 text-sm mb-4 block">Host Type:</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      type="button"
                      onClick={() => setSelectedHostType('vendor')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedHostType === 'vendor'
                          ? 'border-[#F59E0B] bg-[#F59E0B]/10 shadow-lg shadow-[#F59E0B]/20'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <Store className={`w-6 h-6 mx-auto mb-2 ${
                        selectedHostType === 'vendor' ? 'text-[#F59E0B]' : 'text-white/70'
                      }`} />
                      <div className={`font-medium text-sm ${
                        selectedHostType === 'vendor' ? 'text-[#F59E0B]' : 'text-white'
                      }`}>
                        Vendor
                      </div>
                      <div className="text-xs text-white/60 mt-1">
                        Sell Products
                      </div>
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      onClick={() => setSelectedHostType('hotel-owner')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedHostType === 'hotel-owner'
                          ? 'border-[#0EA5E9] bg-[#0EA5E9]/10 shadow-lg shadow-[#0EA5E9]/20'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <Hotel className={`w-6 h-6 mx-auto mb-2 ${
                        selectedHostType === 'hotel-owner' ? 'text-[#0EA5E9]' : 'text-white/70'
                      }`} />
                      <div className={`font-medium text-sm ${
                        selectedHostType === 'hotel-owner' ? 'text-[#0EA5E9]' : 'text-white'
                      }`}>
                        Hotel Owner
                      </div>
                      <div className="text-xs text-white/60 mt-1">
                        Manage Property
                      </div>
                    </motion.button>
                  </div>
                </div>
              )}

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

              {/* Auth Forms */}
              {mode === 'signin' ? (
                /* Sign In Form */
                <form onSubmit={handleLoginSubmit} className="space-y-6 relative z-10">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/90">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={loginData.email}
                        onChange={handleLoginInputChange}
                        required
                        className="pl-12 h-12 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-xl"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white/90">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={loginData.password}
                        onChange={handleLoginInputChange}
                        required
                        className="pl-12 pr-12 h-12 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-xl"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={loginData.rememberMe}
                        onChange={handleLoginInputChange}
                        className="w-4 h-4 rounded border-white/20 text-[#18B668] focus:ring-[#18B668]/20 bg-transparent"
                      />
                      <span className="text-sm text-white/70">Remember me</span>
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-[#18B668] hover:text-[#18B668]/80 transition-colors font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 bg-[#18B668] hover:bg-[#18B668]/90 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#18B668]/30 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Signing In...
                        </div>
                      ) : (
                        `Sign In as ${selectedUserType === 'guest' ? 'Guest' : 'Host'}`
                      )}
                    </Button>
                  </motion.div>
                </form>
              ) : (
                /* Sign Up Form */
                <form onSubmit={handleSignupSubmit} className="space-y-5 relative z-10">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white/90 text-sm">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={signupData.firstName}
                          onChange={handleSignupInputChange}
                          required
                          className="pl-10 h-11 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-xl text-sm"
                          placeholder="First name"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white/90 text-sm">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={signupData.lastName}
                        onChange={handleSignupInputChange}
                        required
                        className="h-11 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-xl text-sm"
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail" className="text-white/90 text-sm">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                      <Input
                        id="signupEmail"
                        name="email"
                        type="email"
                        value={signupData.email}
                        onChange={handleSignupInputChange}
                        required
                        className="pl-10 h-11 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-xl text-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white/90 text-sm">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={signupData.phone}
                        onChange={handleSignupInputChange}
                        required
                        className="pl-10 h-11 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-xl text-sm"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Password Fields */}
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword" className="text-white/90 text-sm">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                      <Input
                        id="signupPassword"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={signupData.password}
                        onChange={handleSignupInputChange}
                        required
                        className="pl-10 pr-10 h-11 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-xl text-sm"
                        placeholder="Create password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white/90 text-sm">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={signupData.confirmPassword}
                        onChange={handleSignupInputChange}
                        required
                        className="pl-10 pr-10 h-11 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 rounded-xl text-sm"
                        placeholder="Confirm password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Terms & Newsletter */}
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={signupData.agreeToTerms}
                        onChange={handleSignupInputChange}
                        required
                        className="w-4 h-4 mt-0.5 rounded border-white/20 text-[#18B668] focus:ring-[#18B668]/20 bg-transparent"
                      />
                      <span className="text-xs text-white/70 leading-relaxed">
                        I agree to the{' '}
                        <Link to="/terms" className="text-[#18B668] hover:text-[#18B668]/80 font-medium">Terms of Service</Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-[#18B668] hover:text-[#18B668]/80 font-medium">Privacy Policy</Link>
                      </span>
                    </label>

                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="subscribeNewsletter"
                        checked={signupData.subscribeNewsletter}
                        onChange={handleSignupInputChange}
                        className="w-4 h-4 mt-0.5 rounded border-white/20 text-[#18B668] focus:ring-[#18B668]/20 bg-transparent"
                      />
                      <span className="text-xs text-white/70 leading-relaxed">
                        Subscribe to newsletter for travel updates and offers
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={!signupData.agreeToTerms || isLoading}
                      className="w-full h-12 bg-[#18B668] hover:bg-[#18B668]/90 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#18B668]/30 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Creating Account...
                        </div>
                      ) : (
                        `Create ${selectedUserType === 'guest' ? 'Guest' : 
                          selectedUserType === 'host' && selectedHostType === 'vendor' ? 'Vendor' :
                          selectedUserType === 'host' && selectedHostType === 'hotel-owner' ? 'Hotel Owner' : 'Host'} Account`
                      )}
                    </Button>
                  </motion.div>
                </form>
              )}

              {/* Social Login/Signup */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 glass-dark text-white/70 rounded-full">
                    Or {mode === 'signin' ? 'continue' : 'sign up'} with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 glass-dark border-white/20 text-white hover:bg-white/10 rounded-xl"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 glass-dark border-white/20 text-white hover:bg-white/10 rounded-xl"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};