import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion } from "motion/react";
import { Navigation, Compass, Mountain, Star, Clock } from "lucide-react";
import Map, {
  Marker,
  NavigationControl,
  MapRef,
  Source,
  Layer,
  Popup,
} from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import destinationsData, { DestinationData } from "../data/destinationsData";

type Destination = DestinationData & { type?: string };

interface TourismMapProps {
  selectedDestination?: string;
  onDestinationSelect?: (destination: Destination) => void;
  showAllDestinations?: boolean;
  height?: string;
  interactive?: boolean;
  styleVariant?: "light" | "dark";
  category?: string; // filter by category from Destinations page
  textColorClass?: string; // override text color classes for map container
}

export function TourismMap({
  selectedDestination,
  onDestinationSelect,
  showAllDestinations = true,
  height = "500px",
  interactive = true,
  styleVariant = "dark",
  category = "all",
  textColorClass = "text-white",
}: TourismMapProps) {
  const mapRef = useRef<MapRef | null>(null);
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(
    null
  );
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [internalStyle, setInternalStyle] = useState(styleVariant);
  const [searchTerm, setSearchTerm] = useState("");
  const [userPos, setUserPos] = useState<[number, number] | null>(null);

  const mapCenter = useMemo(
    () => ({
      longitude: 85.5, // center leaning east to include Deoghar
      latitude: 23.6,
      zoom: 7.2,
    }),
    []
  );

  const displayDestinations = useMemo(() => {
    let list = destinationsData as Destination[];
    if (category && category !== "all") {
      if (category === "wildlife") {
        list = list.filter((d) =>
          d.highlights.some((h) => /(Tiger|Elephant|Wildlife)/i.test(h))
        );
      } else if (category === "culture") {
        list = list.filter((d) => d.type === "cultural");
      } else {
        list = list.filter((d) => d.type === category);
      }
    }
    if (!showAllDestinations && selectedDestination) {
      list = list.filter((dest) => dest.id === selectedDestination);
    }
    return list;
  }, [showAllDestinations, selectedDestination, category]);

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "nature":
        return "🌿";
      case "cultural":
        return "🎭";
      case "adventure":
        return "🏔️";
      case "spiritual":
        return "🕉️";
      default:
        return "📍";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "nature":
        return "from-green-400 to-emerald-500";
      case "cultural":
        return "from-purple-400 to-pink-500";
      case "adventure":
        return "from-orange-400 to-red-500";
      case "spiritual":
        return "from-yellow-400 to-orange-500";
      default:
        return "from-blue-400 to-indigo-500";
    }
  };

  const flyToDestination = useCallback((destination: Destination) => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: destination.coordinates as any,
      zoom: 9.5,
      duration: 1400,
      essential: true,
    });
  }, []);

  const handleDestinationClick = (destination: Destination) => {
    setSelectedDest(destination);
    flyToDestination(destination);
    onDestinationSelect?.(destination);
  };

  useEffect(() => {
    if (selectedDestination) {
      const dest = destinationsData.find((d) => d.id === selectedDestination);
      if (dest) {
        setSelectedDest(dest);
        flyToDestination(dest);
      }
    }
  }, [selectedDestination, flyToDestination]);

  const baseMapStyle = useMemo(
    () => ({
      version: 8 as const,
      sources: {
        osm: {
          type: "raster" as const,
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
          attribution: "© OpenStreetMap contributors",
        },
      },
      layers: [
        {
          id: "osm-base",
          type: "raster" as const,
          source: "osm",
          paint: {
            "raster-saturation": internalStyle === "dark" ? -0.35 : 0,
            "raster-brightness-min": internalStyle === "dark" ? 0.2 : 0.9,
            "raster-brightness-max": internalStyle === "dark" ? 0.8 : 1.15,
            "raster-contrast": internalStyle === "dark" ? 0.35 : 0.05,
            "raster-opacity": 1,
          },
        },
      ],
    }),
    [internalStyle]
  );

  // Geolocate once (silent failure tolerated)
  useEffect(() => {
    if (!("geolocation" in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPos([pos.coords.longitude, pos.coords.latitude]),
      () => {},
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  // Fit bounds when category or search changes and nothing selected
  // (moved below after displayDestinationsFiltered is declared)

  const displayDestinationsFiltered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return displayDestinations;
    return displayDestinations.filter(
      (d) =>
        d.name.toLowerCase().includes(term) ||
        d.highlights.some((h) => h.toLowerCase().includes(term))
    );
  }, [displayDestinations, searchTerm]);

  // Fit bounds when category or search changes and nothing selected
  useEffect(() => {
    if (!mapRef.current) return;
    if (selectedDest) return; // keep focus on selected
    const feats = displayDestinationsFiltered;
    if (!feats || feats.length === 0) return;
    if (feats.length === 1) {
      mapRef.current.flyTo({
        center: feats[0].coordinates as any,
        zoom: 9.5,
        duration: 1000,
      });
      return;
    }
    const lons = feats.map((f) => f.coordinates[0]);
    const lats = feats.map((f) => f.coordinates[1]);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    try {
      // @ts-ignore fitBounds available
      mapRef.current.fitBounds(
        [
          [minLon, minLat],
          [maxLon, maxLat],
        ],
        { padding: 80, duration: 1000 }
      );
    } catch {}
  }, [category, searchTerm, displayDestinationsFiltered, selectedDest]);

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white ${textColorClass}`}
      style={{ height }}
    >
      <Map
        ref={mapRef}
        mapLib={maplibregl}
        initialViewState={mapCenter}
        mapStyle={baseMapStyle as any}
        style={{ width: "100%", height: "100%", background: "#ffffff" }}
        attributionControl={false}
        interactive={interactive}
      >
        <NavigationControl position="bottom-right" />

        {displayDestinationsFiltered.map((destination) => (
          <Marker
            key={destination.id}
            longitude={destination.coordinates[0]}
            latitude={destination.coordinates[1]}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              handleDestinationClick(destination);
            }}
          >
            <motion.div
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.9 }}
              onHoverStart={() => setHoveredDestination(destination.id)}
              onHoverEnd={() => setHoveredDestination(null)}
              className={`relative flex items-center justify-center w-10 h-10 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 border border-white/20 ${
                selectedDest?.id === destination.id
                  ? `bg-gradient-to-r ${getTypeColor(
                      destination.type
                    )} shadow-2xl`
                  : "glass-dark hover:bg-white/10"
              }`}
            >
              <span className="text-xl leading-none">
                {getMarkerIcon(destination.type)}
              </span>
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${getTypeColor(
                  destination.type
                )} opacity-20 animate-ping`}
              ></div>
            </motion.div>
          </Marker>
        ))}

        {hoveredDestination &&
          !selectedDest &&
          (() => {
            const d = destinationsData.find((x) => x.id === hoveredDestination);
            if (!d) return null;
            return (
              <Popup
                longitude={d.coordinates[0]}
                latitude={d.coordinates[1]}
                anchor="top"
                closeButton={false}
                closeOnClick={false}
                offset={25}
                className="!p-0"
              >
                <div className="px-3 py-2 text-xs font-medium bg-white/90 backdrop-blur rounded-md shadow border border-black/10 text-black">
                  <div className="flex items-center gap-1 text-amber-600 font-semibold">
                    <Star className="w-3 h-3" /> {d.rating}
                  </div>
                  <div className="font-semibold leading-snug">{d.name}</div>
                </div>
              </Popup>
            );
          })()}

        {userPos && (
          <Marker longitude={userPos[0]} latitude={userPos[1]} anchor="bottom">
            <div className="w-3.5 h-3.5 rounded-full bg-sky-400 ring-4 ring-sky-400/30 shadow animate-pulse" />
          </Marker>
        )}

        {/* Attribution */}
        <div className="absolute bottom-1 left-2 z-10 text-[10px] opacity-70">
          © OpenStreetMap • Aaranya
        </div>
      </Map>

      {/* Selected Destination Info Panel */}
      {selectedDest && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="absolute top-4 left-4 z-30 max-w-sm"
        >
          <div className="rounded-2xl p-6 text-black bg-white/95 backdrop-blur shadow-lg border border-black/10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{selectedDest.image}</span>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {selectedDest.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{selectedDest.rating}</span>
                      <span className="text-gray-400">•</span>
                      <span className="capitalize">{selectedDest.type}</span>
                    </div>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedDest(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 transition-colors"
              >
                ✕
              </motion.button>
            </div>

            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              {selectedDest.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="rounded-lg p-3 bg-emerald-50">
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-medium">Duration</span>
                </div>
                <span className="text-sm text-emerald-800 font-medium">
                  {selectedDest.duration}
                </span>
              </div>
              <div className="rounded-lg p-3 bg-sky-50">
                <div className="flex items-center gap-2 text-sky-600 mb-1">
                  <Mountain className="w-4 h-4" />
                  <span className="text-xs font-medium">Difficulty</span>
                </div>
                <span className="text-sm text-sky-800 font-medium">
                  {selectedDest.difficulty}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-emerald-600 text-sm font-medium">
                Highlights:
              </span>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedDest.highlights.map((highlight, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700 border border-gray-200"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-emerald-600">
                  {selectedDest.price}
                </span>
                <span className="text-xs text-gray-500 ml-1">per person</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  window.open(`/destinations/${selectedDest.id}`, "_blank")
                }
                className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-sky-400 text-black font-bold rounded-xl hover:shadow-lg transition-all duration-300 text-sm"
              >
                Explore
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Legend */}
      {showAllDestinations && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 right-4 z-20"
        >
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
            <h4 className="text-black font-bold text-sm mb-3">
              Destination Types
            </h4>
            <div className="space-y-2">
              {[
                { type: "nature", icon: "🌿", label: "Nature & Wildlife" },
                { type: "adventure", icon: "🏔️", label: "Adventure Sports" },
                { type: "spiritual", icon: "🕉️", label: "Spiritual Sites" },
                { type: "cultural", icon: "🎭", label: "Cultural Heritage" },
              ].map((item) => (
                <div key={item.type} className="flex items-center gap-2">
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-xs text-black">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Controls Top Right */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-3 items-end w-60 max-w-full">
        <div className="flex gap-2">
          <button
            onClick={() =>
              setInternalStyle((prev) => (prev === "dark" ? "light" : "dark"))
            }
            className="px-3 py-2 text-xs rounded-lg bg-black/40 backdrop-blur text-white hover:bg-black/60 transition"
            title="Toggle map style"
          >
            {internalStyle === "dark" ? "Light" : "Dark"}
          </button>
          <button
            onClick={() =>
              mapRef.current?.flyTo({
                center: { lon: 85.5, lat: 23.6 } as any,
                zoom: 7.2,
                duration: 1200,
              })
            }
            className="px-3 py-2 text-xs rounded-lg bg-black/40 backdrop-blur text-white hover:bg-black/60 transition"
            title="Reset view"
          >
            Reset
          </button>
          <button
            onClick={() => {
              if (userPos)
                mapRef.current?.flyTo({
                  center: userPos as any,
                  zoom: 11,
                  duration: 1000,
                });
            }}
            className="px-3 py-2 text-xs rounded-lg bg-black/40 backdrop-blur text-white hover:bg-black/60 transition disabled:opacity-40"
            disabled={!userPos}
            title="Go to my location"
          >
            Me
          </button>
        </div>
        <div className="w-full">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search destinations..."
            className="w-full text-xs px-3 py-2 rounded-lg bg-white/90 text-black placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
        {searchTerm && (
          <div className="w-full text-[10px] text-white/70 text-right">
            {displayDestinationsFiltered.length} match
            {displayDestinationsFiltered.length !== 1 && "es"}
          </div>
        )}
      </div>
    </div>
  );
}
