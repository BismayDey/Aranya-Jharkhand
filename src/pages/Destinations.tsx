import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { TourismMap } from "../components/TourismMap";

const destinations = [
  {
    id: 1,
    name: "Netarhat",
    description:
      "Queen of Chotanagpur, known for mesmerizing sunsets and misty mornings",
    image:
      "https://images.unsplash.com/photo-1596688382656-a341e7deeeb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHNjZW5pYyUyMHZpZXd8ZW58MXx8fHwxNzU2NTU5OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    position: { top: "25%", left: "30%" },
    highlights: ["Hill Station", "Sunset Point", "Pine Forests"],
    category: "nature",
    rating: 4.8,
    bestTime: "Oct - Mar",
    duration: "2-3 days",
    route: "/destinations/netarhat",
  },
  {
    id: 2,
    name: "Hundru Falls",
    description:
      "Spectacular 320-meter waterfall cascading through rocky terrain",
    image:
      "https://images.unsplash.com/photo-1735567065045-97ba386867ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGxzJTIwZm9yZXN0JTIwbmF0dXJlJTIwamhhcmtoYW5kfGVufDF8fHx8MTc1NjY3MjU5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    position: { top: "60%", left: "45%" },
    highlights: ["Waterfall", "Trekking", "Photography"],
    category: "adventure",
    rating: 4.9,
    bestTime: "Jun - Nov",
    duration: "1-2 days",
    route: "/destinations/hundru-falls",
  },
  {
    id: 3,
    name: "Betla National Park",
    description:
      "Rich wildlife sanctuary with tigers, elephants, and diverse flora",
    image:
      "https://images.unsplash.com/photo-1596688382656-a341e7deeeb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHNjZW5pYyUyMHZpZXd8ZW58MXx8fHwxNzU2NTU5OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    position: { top: "40%", left: "20%" },
    highlights: ["Wildlife", "Safari", "Conservation"],
    category: "wildlife",
    rating: 4.7,
    bestTime: "Nov - Apr",
    duration: "2-3 days",
    route: "/destinations/betla-national-park",
  },
  {
    id: 4,
    name: "Deoghar",
    description:
      "Sacred temple town with spiritual significance and natural beauty",
    image:
      "https://images.unsplash.com/photo-1667115788157-72f063f2a7a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjBhcmNoaXRlY3R1cmUlMjBoZXJpdGFnZXxlbnwxfHx8fDE3NTY2NzI2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    position: { top: "20%", left: "65%" },
    highlights: ["Temples", "Spirituality", "Heritage"],
    category: "spiritual",
    rating: 4.6,
    bestTime: "Oct - Mar",
    duration: "2-3 days",
    route: "/destinations/deoghar",
  },
  {
    id: 5,
    name: "Patratu Valley",
    description: "Serene valley with pristine lake surrounded by rolling hills",
    image:
      "https://images.unsplash.com/photo-1596688382656-a341e7deeeb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHNjZW5pYyUyMHZpZXd8ZW58MXx8fHwxNzU2NTU5OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    position: { top: "50%", left: "60%" },
    highlights: ["Lake", "Boating", "Scenic Views"],
    category: "nature",
    rating: 4.5,
    bestTime: "Sep - Mar",
    duration: "1-2 days",
    route: "/destinations/patratu-valley",
  },
  {
    id: 6,
    name: "Dassam Falls",
    description:
      "Beautiful multi-tiered waterfall perfect for picnics and photography",
    image:
      "https://images.unsplash.com/photo-1735567065045-97ba386867ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGxzJTIwZm9yZXN0JTIwbmF0dXJlJTIwamhhcmtoYW5kfGVufDF8fHx8MTc1NjY3MjU5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    position: { top: "70%", left: "35%" },
    highlights: ["Waterfall", "Picnic Spot", "Photography"],
    category: "adventure",
    rating: 4.4,
    bestTime: "Jul - Dec",
    duration: "1 day",
    route: "#",
  },
];

const categories = [
  { id: "all", name: "All Destinations", icon: "🗺️" },
  { id: "nature", name: "Nature", icon: "🌿" },
  { id: "adventure", name: "Adventure", icon: "🏔️" },
  { id: "wildlife", name: "Wildlife", icon: "🦌" },
  { id: "spiritual", name: "Spiritual", icon: "🕉️" },
];

export function Destinations() {
  const [activeDestination, setActiveDestination] = useState<number | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"map" | "grid">("map");
  const navigate = useNavigate();

  const filteredDestinations =
    selectedCategory === "all"
      ? destinations
      : destinations.filter((dest) => dest.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-[#18B668]">Explore</span>
            <span className="text-white"> Destinations</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the hidden gems of Jharkhand through our interactive
            exploration
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="flex flex-wrap gap-3 glass rounded-2xl p-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-[#18B668] text-white"
                    : "glass-dark border border-white/20 text-white hover:border-[#18B668]"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div className="flex gap-2 glass rounded-xl p-2">
            <button
              onClick={() => setViewMode("map")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                viewMode === "map"
                  ? "bg-[#18B668] text-white"
                  : "text-white hover:bg-white/10"
              }`}
            >
              🗺️ Map View
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-[#18B668] text-white"
                  : "text-white hover:bg-white/10"
              }`}
            >
              ⊞ Grid View
            </button>
          </div>
        </motion.div>

        {/* Map View */}
        {viewMode === "map" && (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Interactive Map (real MapLibre) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <TourismMap
                height="600px"
                category={selectedCategory}
                textColorClass="text-white"
                onDestinationSelect={(dest) => {
                  // Map component uses id keys like netarhat etc; navigate if matching route
                  const match = destinations.find((d) =>
                    dest.name.toLowerCase().includes(d.name.toLowerCase())
                  );
                  if (match && match.route !== "#") {
                    navigate(match.route);
                  }
                }}
              />
            </motion.div>

            {/* Destination List */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {filteredDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className={`glass rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                    activeDestination === destination.id
                      ? "ring-2 ring-[#18B668]"
                      : ""
                  }`}
                  onMouseEnter={() => setActiveDestination(destination.id)}
                  onMouseLeave={() => setActiveDestination(null)}
                  onClick={() =>
                    destination.route !== "#" && navigate(destination.route)
                  }
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
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white text-xl font-semibold">
                          {destination.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-white text-sm">
                            {destination.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">
                        {destination.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                        <span>📅 Best: {destination.bestTime}</span>
                        <span>⏱️ Duration: {destination.duration}</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {destination.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-[#18B668]/20 text-[#18B668] text-xs rounded-full border border-[#18B668]/30"
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
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass rounded-2xl overflow-hidden group hover:bg-white/10 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 glass-dark rounded-full px-2 py-1">
                    <span className="text-yellow-400 text-sm">⭐</span>
                    <span className="text-white text-sm">
                      {destination.rating}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-white font-bold text-xl mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {destination.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <span>📅 {destination.bestTime}</span>
                    <span>⏱️ {destination.duration}</span>
                  </div>

                  <div className="flex gap-2 flex-wrap mb-4">
                    {destination.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-[#18B668]/20 text-[#18B668] text-xs rounded-full border border-[#18B668]/30"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        destination.route !== "#" && navigate(destination.route)
                      }
                      className="flex-1 py-2 bg-[#18B668] hover:bg-[#18B668]/80 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      Explore
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 glass-dark border border-white/20 text-white rounded-lg hover:border-[#18B668] transition-all duration-300"
                    >
                      ♡
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
