import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import destinationsData from "../data/destinationsData";

// positions used for the small interactive mini-map in this component
const positionMap: Record<string, { top: string; left: string }> = {
  netarhat: { top: "25%", left: "30%" },
  "hundru-falls": { top: "60%", left: "45%" },
  "betla-national-park": { top: "40%", left: "20%" },
  deoghar: { top: "20%", left: "65%" },
  "patratu-valley": { top: "50%", left: "60%" },
};

const hotspots = [
  "netarhat",
  "hundru-falls",
  "betla-national-park",
  "deoghar",
  "patratu-valley",
]
  .map((id) => {
    const d = destinationsData.find((x) => x.id === id);
    if (!d) return null;
    return {
      ...d,
      position: positionMap[id] || { top: "50%", left: "50%" },
    };
  })
  .filter(Boolean) as any[];

export function Destinations() {
  const [activeDestination, setActiveDestination] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 to-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              Explore
            </span>
            <span className="text-white"> Destinations</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the hidden gems of Jharkhand through our interactive map
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass rounded-3xl p-8 h-96 lg:h-[500px] relative overflow-hidden">
              {/* Map Background */}
              <div className="absolute inset-4 bg-gradient-to-br from-emerald-900/30 to-blue-900/30 rounded-2xl">
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full opacity-20"
                  fill="currentColor"
                >
                  <path d="M50,50 Q200,30 350,50 Q370,150 350,250 Q200,270 50,250 Q30,150 50,50 Z" />
                </svg>
              </div>

              {/* Destination Hotspots */}
              {hotspots.map((destination) => (
                <motion.div
                  key={destination.id}
                  className="absolute w-6 h-6 cursor-pointer"
                  style={destination.position}
                  whileHover={{ scale: 1.5 }}
                  onHoverStart={() => setActiveDestination(destination.id)}
                  onHoverEnd={() => setActiveDestination(null)}
                  onClick={() => navigate(`/destinations/${destination.id}`)}
                >
                  <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse-glow"></div>
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>

                  {/* Tooltip */}
                  {activeDestination === destination.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 glass-dark rounded-lg p-3 min-w-48 z-10"
                    >
                      <h4 className="text-white font-semibold text-sm">
                        {destination.name}
                      </h4>
                      <p className="text-gray-300 text-xs mt-1">
                        {destination.description}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 glass-dark rounded-lg p-3">
                <h4 className="text-white font-semibold text-sm mb-2">
                  Interactive Map
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                  <span>Hover to explore</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Destination Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {destinationsData.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className={`glass rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  activeDestination === destination.id
                    ? "ring-2 ring-yellow-400"
                    : ""
                }`}
                onMouseEnter={() => setActiveDestination(destination.id)}
                onMouseLeave={() => setActiveDestination(null)}
                onClick={() => navigate(`/destinations/${destination.id}`)}
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-xl font-semibold mb-2">
                      {destination.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">
                      {destination.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {destination.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-sky-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
