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

// ---- Google Translate loader (browser-only, module-level) ----
if (typeof window !== "undefined") {
  const win = window as any;
  if (!win.__googleTranslateLoaded) {
    win.googleTranslateElementInit = function () {
      try {
        new (win.google.translate as any).TranslateElement(
          {
            pageLanguage: "en",
            // include English, Hindi, Bengali
            includedLanguages: "en,hi,bn",
            layout: (win.google.translate as any).TranslateElement.InlineLayout
              .SIMPLE,
          },
          "google_translate_element"
        );
      } catch (e) {
        // ignore
      }
    };

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    win.__googleTranslateLoaded = true;
  }

  // Expose a simple helper to change language programmatically
  win.changeLanguage = function (lang: string) {
    const applyToSelect = (select: HTMLSelectElement) => {
      try {
        select.value = lang;
      } catch (e) {
        // ignore
      }

      const opts = Array.from(select.options || []);
      const match = opts.find((o) => {
        if (!o || !o.value) return false;
        return (
          o.value === lang ||
          (o.value && o.value.indexOf(lang) !== -1) ||
          (o.text && o.text.toLowerCase().indexOf(lang.toLowerCase()) !== -1)
        );
      });
      if (match) select.value = match.value;

      const ev = document.createEvent("HTMLEvents");
      ev.initEvent("change", true, true);
      select.dispatchEvent(ev);
    };

    const trySelect = () => {
      const s = document.querySelector<HTMLSelectElement>(
        "#google_translate_element select"
      );
      if (s) {
        applyToSelect(s);
        return true;
      }
      return false;
    };

    if (!trySelect()) {
      // If the select isn't available after retries, set the googtrans cookie and reload as a fallback.
      let tries = 0;
      const id = setInterval(() => {
        tries += 1;
        if (trySelect() || tries > 8) {
          clearInterval(id);
        }
      }, 300);

      setTimeout(() => {
        // If still not found, use cookie + reload fallback
        const still = document.querySelector<HTMLSelectElement>(
          "#google_translate_element select"
        );
        if (!still) {
          try {
            const setCookie = (name: string, value: string) => {
              // Set cookie for current path (avoid domain attribute which can be brittle locally)
              document.cookie = `${name}=${value};path=/;`;
              // Also set without leading dot for some environments
              document.cookie = `${name}=${value};path=/;`;
            };

            if (lang === "en") {
              setCookie("googtrans", "/en/en");
              console.info("Setting googtrans cookie to /en/en and reloading");
            } else if (lang === "auto") {
              setCookie("googtrans", "/auto/auto");
              console.info(
                "Setting googtrans cookie to /auto/auto and reloading"
              );
            } else {
              setCookie("googtrans", `/en/${lang}`);
              console.info(
                `Setting googtrans cookie to /en/${lang} and reloading`
              );
            }
            // small delay to ensure cookie written
            setTimeout(() => window.location.reload(), 250);
          } catch (e) {
            console.warn("cookie fallback failed, reloading anyway", e);
            window.location.reload();
          }
        }
      }, 1500);
    }
  };
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-black text-white overflow-x-hidden">
            {/* Container used by Google Translate widget (kept hidden) */}
            <div
              id="google_translate_element"
              aria-hidden="true"
              // keep the widget off-screen so it can render but not affect layout
              style={{ position: "absolute", left: "-9999px", top: 0 }}
            ></div>
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

            {/* Debug button removed; use Language Selector menu instead */}

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
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 group relative">
                  <span className="text-xl group-hover:animate-pulse">🌐</span>
                  <div
                    className="absolute left-16 -translate-y-1/2 top-1/2 lang-menu-card"
                    aria-hidden="false"
                  >
                    <div className="flex flex-col gap-1">
                      <button
                        className="text-xs text-white text-left hover:underline"
                        onClick={() => {
                          try {
                            const fn = (window as any).changeLanguage;
                            console.info("Language button clicked: en", {
                              fn: !!fn,
                            });
                            if (fn) {
                              fn("en");
                            } else {
                              // fallback cookie + reload
                              document.cookie = `googtrans=/en/en;path=/;`;
                              setTimeout(() => window.location.reload(), 200);
                            }
                          } catch (e) {
                            console.warn("changeLanguage failed", e);
                          }
                        }}
                      >
                        English
                      </button>
                      <button
                        className="text-xs text-white text-left hover:underline"
                        onClick={() => {
                          try {
                            const fn = (window as any).changeLanguage;
                            console.info("Language button clicked: hi", {
                              fn: !!fn,
                            });
                            if (fn) {
                              fn("hi");
                            } else {
                              document.cookie = `googtrans=/en/hi;path=/;`;
                              setTimeout(() => window.location.reload(), 200);
                            }
                          } catch (e) {
                            console.warn("changeLanguage failed", e);
                          }
                        }}
                      >
                        हिन्दी
                      </button>
                      <button
                        className="text-xs text-white text-left hover:underline"
                        onClick={() => {
                          try {
                            const fn = (window as any).changeLanguage;
                            console.info("Language button clicked: bn", {
                              fn: !!fn,
                            });
                            if (fn) {
                              fn("bn");
                            } else {
                              document.cookie = `googtrans=/en/bn;path=/;`;
                              setTimeout(() => window.location.reload(), 200);
                            }
                          } catch (e) {
                            console.warn("changeLanguage failed", e);
                          }
                        }}
                      >
                        বাংলা
                      </button>
                      <button
                        className="text-xs text-white text-left hover:underline"
                        onClick={() => {
                          try {
                            const fn = (window as any).changeLanguage;
                            console.info("Language button clicked: auto", {
                              fn: !!fn,
                            });
                            if (fn) {
                              fn("auto");
                            } else {
                              document.cookie = `googtrans=/auto/auto;path=/;`;
                              setTimeout(() => window.location.reload(), 200);
                            }
                          } catch (e) {
                            console.warn("changeLanguage failed", e);
                          }
                        }}
                      >
                        Auto
                      </button>
                    </div>
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
