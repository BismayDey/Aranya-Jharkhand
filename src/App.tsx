import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { ChatBot } from "./components/ChatBot";
import { Toaster } from "./components/ui/sonner";
import { Home } from "./pages/Home";
import { Destinations } from "./pages/Destinations";
import { Culture } from "./pages/Culture";
import { TravelPlanner } from "./pages/TravelPlanner";
import { TravelPlannerWithMap } from "./pages/TravelPlannerWithMap";
import { Marketplace } from "./pages/Marketplace";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Product } from "./pages/Product";
import { Profile } from "./pages/Profile";
import { Auth } from "./pages/Auth";
import { GuestDashboard } from "./pages/GuestDashboard";
import { HostDashboard } from "./pages/HostDashboard";
import { VendorDashboard } from "./pages/VendorDashboard";
import { HotelDashboard } from "./pages/HotelDashboard";
import { Booking } from "./pages/Booking";
import { Netarhat } from "./pages/destinations/Netarhat";
import { HundruFalls } from "./pages/destinations/HundruFalls";
import { BetlaNationalPark } from "./pages/destinations/BetlaNationalPark";
import { Deoghar } from "./pages/destinations/Deoghar";
import { PatratuValley } from "./pages/destinations/PatratuValley";
import DestinationDetail from "./pages/destinations/DestinationDetail";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { useScrollToTop } from "./hooks/useScrollToTop";

// Component to apply scroll-to-top globally on route change
const ScrollManager = () => {
  useScrollToTop();
  return null;
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <ScrollManager />
            {/* Navigation */}
            <Navigation />

            {/* Main Content */}
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/destinations/netarhat" element={<Netarhat />} />
                <Route
                  path="/destinations/hundru-falls"
                  element={<HundruFalls />}
                />
                <Route
                  path="/destinations/betla-national-park"
                  element={<BetlaNationalPark />}
                />
                <Route path="/destinations/deoghar" element={<Deoghar />} />
                <Route
                  path="/destinations/patratu-valley"
                  element={<PatratuValley />}
                />
                <Route
                  path="/destinations/:id"
                  element={<DestinationDetail />}
                />
                <Route path="/culture" element={<Culture />} />
                <Route path="/travel-planner" element={<TravelPlanner />} />
                <Route
                  path="/travel-planner-map"
                  element={<TravelPlannerWithMap />}
                />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/guest-dashboard" element={<GuestDashboard />} />
                <Route path="/host-dashboard" element={<HostDashboard />} />
                <Route path="/vendor-dashboard" element={<VendorDashboard />} />
                <Route path="/hotel-dashboard" element={<HotelDashboard />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/signup" element={<Auth />} />
                <Route path="/auth" element={<Auth />} />
                {/* Catch-all route for unmatched paths */}
                <Route
                  path="/preview_page.html"
                  element={<Navigate to="/" replace />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />

            {/* Toast Notifications */}
            <Toaster />

            {/* AI Chatbot - Replaces scroll-to-top functionality */}
            <ChatBot />

            {/* Floating Action Elements */}
            <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
              <div className="flex flex-col gap-4">
                {/* Quick Contact */}
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 group">
                  <span className="text-xl group-hover:animate-pulse">📞</span>
                  <div className="absolute left-16 glass-dark rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    +91 98765 43210
                  </div>
                </div>

                {/* Emergency Support */}
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 group">
                  <span className="text-xl group-hover:animate-pulse">🆘</span>
                  <div className="absolute left-16 glass-dark rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    24/7 Support
                  </div>
                </div>

                {/* Language Selector */}
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 group">
                  <span className="text-xl group-hover:animate-pulse">🌐</span>
                  <div className="absolute left-16 glass-dark rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    EN | HI | Others
                  </div>
                </div>
              </div>
            </div>

            {/* Background Ambient Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
              {/* Floating Particles */}
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-[#18B668] rounded-full opacity-20 animate-float"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${5 + Math.random() * 5}s`,
                  }}
                />
              ))}

              {/* Ambient Orbs */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#18B668]/5 rounded-full blur-3xl animate-pulse"></div>
              <div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
