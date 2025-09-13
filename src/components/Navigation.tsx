import { motion } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, User, LogIn, UserPlus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart as CartComponent } from "./ShoppingCart";

interface NavigationProps {
  onOpenAuthModal?: () => void;
}

export function Navigation({ onOpenAuthModal }: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state } = useCart();
  const { user, logout } = useAuth();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/destinations", label: "Destinations" },
    { path: "/culture", label: "Culture" },
    { path: "/gallery", label: "Gallery" },
    { path: "/marketplace", label: "Marketplace" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <motion.img
              whileHover={{ scale: 1.05, rotate: 3 }}
              src="/icon.jpg"
              alt="Aaranya Jharkhand logo"
              className="w-10 h-10 rounded-xl object-cover"
            />
            <div>
              <div className="text-white font-bold text-lg">
                Aaranya Jharkhand
              </div>
              <div className="text-gray-400 text-xs">
                Where Forests Meet Heritage
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-[#18B668]"
                    : "text-gray-300 hover:text-[#18B668]"
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#18B668] rounded-full"
                  />
                )}
              </Link>
            ))}

            {/* Cart Button */}
            <Link to="/cart">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 glass rounded-xl hover:bg-white/10 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-white" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#18B668] text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {state.itemCount > 9 ? "9+" : state.itemCount}
                  </span>
                )}
              </motion.button>
            </Link>

            {/* Profile/Login Button */}
            {user ? (
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 glass rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <User className="w-5 h-5 text-white" />
                  <span className="text-white text-sm hidden md:block">
                    {user.name}
                  </span>
                  {user.userType === "host" && (
                    <span
                      className={`text-black text-xs px-2 py-1 rounded-full font-medium hidden md:block ${
                        user.hostType === "vendor"
                          ? "bg-[#F59E0B]"
                          : "bg-[#0EA5E9]"
                      }`}
                    >
                      {user.hostType === "vendor" ? "VENDOR" : "HOTEL OWNER"}
                    </span>
                  )}
                </motion.button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 glass-premium rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <Link
                    to={
                      user.userType === "host"
                        ? "/host-dashboard"
                        : "/guest-dashboard"
                    }
                    className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                  >
                    {user.userType === "host"
                      ? "Host Dashboard"
                      : "My Dashboard"}
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                  >
                    Edit Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-[#18B668] hover:bg-[#18B668]/90 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#18B668]/25 transition-all duration-300 text-sm flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In / Join</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.button>

                {/* Auth Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 glass-premium rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <Link
                    to="/auth?mode=signin"
                    className="block px-4 py-3 text-white hover:bg-white/10 transition-colors border-b border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <LogIn className="w-4 h-4 text-[#18B668]" />
                      <div>
                        <div className="font-medium">Sign In</div>
                        <div className="text-xs text-white/60">
                          Access your account
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    className="block px-4 py-3 text-white hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <UserPlus className="w-4 h-4 text-[#F59E0B]" />
                      <div>
                        <div className="font-medium">Join Now</div>
                        <div className="text-xs text-white/60">
                          Start your journey
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            <Link to="/g">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-[#18B668] hover:bg-[#18B668]/90 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#18B668]/25 transition-all duration-300"
              >
                Plan Trips
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-8 h-8 flex flex-col justify-center items-center gap-1"
            >
              <motion.div
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 6 : 0,
                }}
                className="w-6 h-0.5 bg-white transition-all duration-300"
              />
              <motion.div
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                className="w-6 h-0.5 bg-white transition-all duration-300"
              />
              <motion.div
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -6 : 0,
                }}
                className="w-6 h-0.5 bg-white transition-all duration-300"
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-4 pb-2 space-y-2">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20,
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 px-4 rounded-lg transition-colors duration-300 ${
                    location.pathname === link.path
                      ? "text-[#18B668] bg-[#18B668]/10"
                      : "text-gray-300 hover:text-[#18B668] hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            {/* Mobile User Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : -20,
              }}
              transition={{ delay: navLinks.length * 0.1, duration: 0.3 }}
              className="pt-2 space-y-2"
            >
              {/* Mobile Cart */}
              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between w-full py-2 px-4 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Cart</span>
                </div>
                {state.itemCount > 0 && (
                  <span className="w-5 h-5 bg-[#18B668] text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {state.itemCount > 9 ? "9+" : state.itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile User Section */}
              {user ? (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="px-4 py-2">
                    <div className="text-white font-medium">{user.name}</div>
                    {user.userType === "host" && (
                      <div
                        className={`inline-block text-xs px-2 py-1 rounded-full font-medium mt-1 ${
                          user.hostType === "vendor"
                            ? "bg-[#F59E0B] text-black"
                            : "bg-[#0EA5E9] text-black"
                        }`}
                      >
                        {user.hostType === "vendor" ? "VENDOR" : "HOTEL OWNER"}
                      </div>
                    )}
                  </div>
                  <Link
                    to={
                      user.userType === "host"
                        ? "/host-dashboard"
                        : "/guest-dashboard"
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 px-4 text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {user.userType === "host"
                      ? "Host Dashboard"
                      : "My Dashboard"}
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 px-4 text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    Edit Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 px-4 text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <Link
                    to="/auth?mode=signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-4 text-white hover:bg-white/10 rounded-lg transition-colors border border-white/20"
                  >
                    <div className="flex items-center gap-3">
                      <LogIn className="w-4 h-4 text-[#18B668]" />
                      <div>
                        <div className="font-medium">Sign In</div>
                        <div className="text-xs text-white/60">
                          Access your account
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-4 bg-[#18B668] hover:bg-[#18B668]/90 text-white font-medium rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <UserPlus className="w-4 h-4" />
                      <div>
                        <div className="font-medium">Join Now</div>
                        <div className="text-xs text-white/60">
                          Start your journey
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              <Link
                to="/travel-planner"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 px-4 bg-[#18B668] hover:bg-[#18B668]/90 text-white font-medium rounded-lg text-center"
              >
                Plan Your Trip
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Shopping Cart Component */}
      <CartComponent isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}
