import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { TourismMap } from "../components/TourismMap";

import destinationsData from "../data/destinationsData";

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
  const [page, setPage] = useState(0);
  const pageSize = 4;
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement | null>(null);

  const filteredDestinations =
    selectedCategory === "all"
      ? destinationsData
      : destinationsData.filter((dest) => dest.category === selectedCategory);

  // Reset to first page when category or filtered results change
  useEffect(() => {
    setPage(0);
  }, [selectedCategory]);

  // Smoothly scroll the list into view when the page changes
  useEffect(() => {
    if (
      listRef.current &&
      typeof listRef.current.scrollIntoView === "function"
    ) {
      try {
        listRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      } catch (e) {
        // fallback: no-op
      }
    }
  }, [page]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDestinations.length / pageSize)
  );
  const pagedDestinations = filteredDestinations.slice(
    page * pageSize,
    page * pageSize + pageSize
  );

  // Build prioritized candidates for images in `public/Detinations` (note the folder name)
  const makeImageCandidates = (destination: any) => {
    const remote = destination.image || "";
    const idBase = destination.id;
    const rawName = String(destination.name || "");
    const baseName = rawName
      .toLowerCase()
      .replace(/[^\n+a-z0-9 ]/g, "")
      .trim();

    const variants = [
      `${idBase}.jpg`,
      `${idBase}.jpeg`,
      `${idBase}.png`,
      `${baseName}.jpg`,
      `${baseName}.jpeg`,
      `${baseName}.png`,
      `${baseName} 1.jpg`,
      `${baseName} 2.jpg`,
      `${baseName.replace(/ /g, "-")}.jpg`,
    ];

    // map to public path and include encoded name forms as well
    const candidates = variants
      .map((fn) => `/Detinations/${fn}`)
      .concat([
        `/Detinations/${encodeURIComponent(rawName)}.jpg`,
        `/Detinations/${encodeURIComponent(rawName)}.jpeg`,
        `/Detinations/${encodeURIComponent(rawName)}.png`,
      ])
      .concat([remote]);

    return candidates.filter(Boolean);
  };

  // Motion variants for smooth, buttery transitions
  const containerVariants = {
    hidden: { opacity: 0, x: 28 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.56,
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.46, ease: [0.22, 1, 0.36, 1] },
    },
  };

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
                  // Map component uses id keys like netarhat etc; navigate if matching route id
                  const match = destinationsData.find((d) =>
                    dest.name.toLowerCase().includes(d.name.toLowerCase())
                  );
                  if (match) {
                    navigate(`/destinations/${match.id}`);
                  }
                }}
              />
            </motion.div>

            {/* Destination List with pagination controls */}
            <div className="relative">
              <motion.div
                // key the container to animate when page changes
                key={page}
                initial="hidden"
                animate="show"
                variants={containerVariants}
                className="space-y-6"
                ref={/* @ts-ignore */ (el) => (listRef.current = el)}
              >
                {pagedDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className={`glass rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                      activeDestination === destination.id
                        ? "ring-2 ring-[#18B668]"
                        : ""
                    }`}
                    onMouseEnter={() => setActiveDestination(destination.id)}
                    onMouseLeave={() => setActiveDestination(null)}
                    onClick={() => navigate(`/destinations/${destination.id}`)}
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        {/* Try images from public folder first (several name variations), then fall back to the remote `image` URL */}
                        <ImageWithFallback
                          sources={makeImageCandidates(destination)}
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

              {/* Pagination controls: vertical on the right */}
              {totalPages > 1 && (
                <>
                  {/* Desktop / tablet: vertical controls positioned outside the list to the right */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-4 pr-8 md:pr-10 lg:pr-14"
                    // push controls well outside the list/cards to the right
                    style={{ right: "-140px" }}
                  >
                    <motion.button
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 24,
                      }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page <= 0}
                      aria-label="Previous page"
                      title="Previous"
                      className={`w-12 h-12 flex items-center justify-center rounded-full text-white shadow-xl transition-colors duration-200 transform-gpu ${
                        page <= 0
                          ? "opacity-40 bg-black/25 cursor-not-allowed"
                          : "bg-[#18B668] hover:bg-[#13a350]"
                      }`}
                    >
                      {/* Chevron Up SVG (Lucide-like) */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <polyline points="18 15 12 9 6 15" />
                      </svg>
                    </motion.button>

                    <motion.div
                      key={page}
                      initial={{ y: -6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 160,
                        damping: 22,
                      }}
                      className="text-xs text-gray-200 bg-black/50 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm"
                    >
                      {page + 1}/{totalPages}
                    </motion.div>

                    <motion.button
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 24,
                        delay: 0.05,
                      }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setPage((p) => Math.min(totalPages - 1, p + 1))
                      }
                      disabled={page >= totalPages - 1}
                      aria-label="Next page"
                      title="Next"
                      className={`w-12 h-12 flex items-center justify-center rounded-full text-white shadow-xl transition-colors duration-200 transform-gpu ${
                        page >= totalPages - 1
                          ? "opacity-40 bg-black/25 cursor-not-allowed"
                          : "bg-[#18B668] hover:bg-[#13a350]"
                      }`}
                    >
                      {/* Chevron Down SVG (Lucide-like) */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Small screens: horizontal controls below the list to avoid overlap */}
                  <div className="sm:hidden mt-4 flex items-center justify-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page <= 0}
                      aria-label="Previous page"
                      title="Previous"
                      className={`px-3 py-2 rounded-lg text-white transition-colors duration-150 transform-gpu ${
                        page <= 0
                          ? "opacity-50 bg-black/20 cursor-not-allowed"
                          : "bg-[#18B668] hover:bg-[#13a350]"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="inline-block align-middle"
                      >
                        <polyline points="18 15 12 9 6 15" />
                      </svg>
                    </motion.button>

                    <div className="text-sm text-gray-200">
                      {page + 1}/{totalPages}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setPage((p) => Math.min(totalPages - 1, p + 1))
                      }
                      disabled={page >= totalPages - 1}
                      aria-label="Next page"
                      title="Next"
                      className={`px-3 py-2 rounded-lg text-white transition-colors duration-150 transform-gpu ${
                        page >= totalPages - 1
                          ? "opacity-50 bg-black/20 cursor-not-allowed"
                          : "bg-[#18B668] hover:bg-[#13a350]"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="inline-block align-middle"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </motion.button>
                  </div>
                </>
              )}
            </div>
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
                    sources={makeImageCandidates(destination)}
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
                        navigate(`/destinations/${destination.id}`)
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
