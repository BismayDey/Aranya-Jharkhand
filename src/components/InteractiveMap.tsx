import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

// OpenStreetMap tile layer URL
const OSM_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

// Jharkhand destinations with coordinates
const destinations = [
  {
    id: 'ranchi',
    name: 'Ranchi',
    lat: 23.3441,
    lng: 85.3096,
    type: 'capital',
    color: '#18B668',
    description: 'Capital of Jharkhand known for its hills, lakes, and modern infrastructure.',
    attractions: ['Rock Garden', 'Jagannath Temple', 'Hatia Lake']
  },
  {
    id: 'netarhat',
    name: 'Netarhat',
    lat: 23.4667,
    lng: 84.25,
    type: 'hill_station',
    color: '#F59E0B',
    description: 'Queen of Chotanagpur - Famous for sunrise/sunset views, pine forests, and pleasant climate.',
    attractions: ['Sunrise Point', 'Pine Forest', 'Upper Ghaghri Falls']
  },
  {
    id: 'hundru-falls',
    name: 'Hundru Falls',
    lat: 23.4065,
    lng: 85.5979,
    type: 'waterfall',
    color: '#0EA5E9',
    description: '98-meter high waterfall formed by the Subarnarekha River.',
    attractions: ['Waterfall Trek', 'Rock Climbing', 'Photography Points']
  },
  {
    id: 'betla',
    name: 'Betla National Park',
    lat: 23.8833,
    lng: 84.1833,
    type: 'national_park',
    color: '#10B981',
    description: 'First tiger reserve in Jharkhand, home to diverse wildlife including tigers, elephants, and leopards.',
    attractions: ['Tiger Safari', 'Elephant Spotting', 'Bird Watching']
  },
  {
    id: 'deoghar',
    name: 'Deoghar',
    lat: 24.4833,
    lng: 86.7,
    type: 'religious',
    color: '#F97316',
    description: 'Baidyanath Dham - One of the 12 Jyotirlingas, major pilgrimage destination.',
    attractions: ['Baidyanath Temple', 'Naulakha Mandir', 'Satsang Ashram']
  },
  {
    id: 'patratu',
    name: 'Patratu Valley',
    lat: 23.2167,
    lng: 85.1833,
    type: 'valley',
    color: '#8B5CF6',
    description: 'Scenic valley with dam, boating facilities, and beautiful landscapes.',
    attractions: ['Patratu Dam', 'Boating', 'Valley Views']
  }
];

const typeIcons: { [key: string]: string } = {
  capital: '🏛️',
  hill_station: '🏔️',
  waterfall: '💧',
  national_park: '🦎',
  religious: '🕉️',
  valley: '🏞️'
};

interface InteractiveMapProps {
  onDestinationSelect?: (destination: any) => void;
}

export function InteractiveMap({ onDestinationSelect }: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDestinationClick = (destination: any) => {
    setSelectedDestination(destination);
    if (onDestinationSelect) {
      onDestinationSelect(destination);
    }
  };

  // Calculate position based on lat/lng relative to Jharkhand bounds
  const getPositionOnMap = (lat: number, lng: number) => {
    // Jharkhand bounds (approximate)
    const bounds = {
      north: 25.5,
      south: 21.5,
      east: 88.5,
      west: 83.5
    };

    const x = ((lng - bounds.west) / (bounds.east - bounds.west)) * 100;
    const y = ((bounds.north - lat) / (bounds.north - bounds.south)) * 100;

    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  return (
    <div className="relative w-full h-[600px] glass rounded-2xl overflow-hidden">
      {/* Loading State */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#18B668]/30 border-t-[#18B668] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Loading interactive map...</p>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div 
        ref={mapContainerRef}
        className={`relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 transition-opacity duration-1000 ${
          mapLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Background Map Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 800 600" className="w-full h-full">
            {/* Jharkhand state outline (simplified) */}
            <path
              d="M150 180 L300 120 L450 140 L580 160 L650 200 L680 280 L650 360 L580 420 L500 460 L400 480 L300 470 L200 430 L150 350 L120 280 Z"
              fill="none"
              stroke="#18B668"
              strokeWidth="2"
              strokeDasharray="8,4"
              className="animate-pulse"
            />
            
            {/* District boundaries (simplified) */}
            <g stroke="#18B668" strokeWidth="1" opacity="0.3" fill="none">
              <path d="M200 200 L350 180 L400 250 L300 280 Z" />
              <path d="M350 180 L500 190 L480 260 L400 250 Z" />
              <path d="M300 280 L400 250 L450 320 L350 340 Z" />
              <path d="M450 320 L520 300 L540 370 L480 390 Z" />
            </g>
          </svg>
        </div>

        {/* Destination Markers */}
        {destinations.map((destination) => {
          const position = getPositionOnMap(destination.lat, destination.lng);
          
          return (
            <motion.div
              key={destination.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + Math.random() * 0.5, duration: 0.6 }}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`
              }}
              onClick={() => handleDestinationClick(destination)}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="relative group"
              >
                {/* Marker */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20"
                  style={{ backgroundColor: destination.color }}
                >
                  <span className="text-white text-xs font-bold">
                    {typeIcons[destination.type]}
                  </span>
                </div>

                {/* Ripple Effect */}
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-20"
                  style={{ backgroundColor: destination.color }}
                />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="font-semibold">{destination.name}</div>
                  <div className="text-gray-300 capitalize">{destination.type.replace('_', ' ')}</div>
                  
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Map Controls */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <button className="w-10 h-10 glass rounded-lg flex items-center justify-center text-white hover:bg-white/10 transition-colors">
            <span className="text-lg font-bold">+</span>
          </button>
          <button className="w-10 h-10 glass rounded-lg flex items-center justify-center text-white hover:bg-white/10 transition-colors">
            <span className="text-lg font-bold">−</span>
          </button>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 right-4 glass-dark rounded-lg p-4 max-w-xs">
          <h4 className="text-white font-semibold mb-3 text-sm">Interactive Map</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(typeIcons).map(([type, icon]) => (
              <div key={type} className="flex items-center gap-2">
                <span>{icon}</span>
                <span className="text-gray-300 capitalize">{type.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-400">
            🖱️ Click markers to explore destinations
          </div>
        </div>

        {/* Attribution */}
        <div className="absolute bottom-2 left-2 text-xs text-gray-500">
          © OpenStreetMap contributors
        </div>
      </div>

      {/* Destination Details Modal */}
      {selectedDestination && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute inset-4 glass-premium rounded-2xl p-6 z-20 overflow-y-auto"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {typeIcons[selectedDestination.type]} {selectedDestination.name}
              </h3>
              <p className="text-gray-300 capitalize mb-4">
                {selectedDestination.type.replace('_', ' ')}
              </p>
            </div>
            <button
              onClick={() => setSelectedDestination(null)}
              className="text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>

          <p className="text-white/80 mb-6 leading-relaxed">
            {selectedDestination.description}
          </p>

          <div>
            <h4 className="text-white font-semibold mb-3">Top Attractions</h4>
            <div className="grid gap-2">
              {selectedDestination.attractions.map((attraction: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 glass rounded-lg"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedDestination.color }}
                  />
                  <span className="text-white">{attraction}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="flex-1 bg-[#18B668] hover:bg-[#18B668]/90 text-white py-3 px-4 rounded-xl font-semibold transition-colors">
              Plan Visit
            </button>
            <button className="flex-1 glass border border-white/20 text-white py-3 px-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}