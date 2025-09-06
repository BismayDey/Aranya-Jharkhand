import { motion } from 'motion/react';
import { useState } from 'react';

const interests = [
  { id: 'nature', label: 'Nature & Wildlife', icon: '🌿' },
  { id: 'culture', label: 'Culture & Heritage', icon: '🎭' },
  { id: 'adventure', label: 'Adventure Sports', icon: '🏔️' },
  { id: 'spiritual', label: 'Spiritual Journey', icon: '🕉️' },
  { id: 'photography', label: 'Photography', icon: '📸' },
  { id: 'food', label: 'Local Cuisine', icon: '🍽️' }
];

const sampleItineraries = [
  {
    id: 1,
    title: "Nature Explorer - 5 Days",
    destinations: ["Netarhat", "Hundru Falls", "Betla National Park"],
    highlights: ["Sunset viewing", "Waterfall trekking", "Wildlife safari"],
    duration: "5 Days / 4 Nights",
    price: "₹15,000"
  },
  {
    id: 2,
    title: "Cultural Immersion - 7 Days",
    destinations: ["Deoghar", "Dumka", "Hazaribagh"],
    highlights: ["Temple visits", "Tribal villages", "Handicraft workshops"],
    duration: "7 Days / 6 Nights",
    price: "₹22,000"
  },
  {
    id: 3,
    title: "Adventure Seeker - 4 Days",
    destinations: ["Patratu Valley", "Hundru Falls", "Rock Garden"],
    highlights: ["Water sports", "Rock climbing", "Paragliding"],
    duration: "4 Days / 3 Nights",
    price: "₹18,000"
  }
];

export function TravelPlanner() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('');
  const [showItineraries, setShowItineraries] = useState(false);

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const generateItinerary = () => {
    setShowItineraries(true);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-slate-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Smart Travel
            </span>
            <span className="text-white"> Planner</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            AI-powered personalized itinerary generation based on your preferences
          </p>
        </motion.div>

        {/* Planner Interface */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 mb-12"
        >
          {/* Header with AI Icon */}
          <div className="flex items-center gap-4 mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full flex items-center justify-center"
            >
              <span className="text-xl">🤖</span>
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-white">AI Travel Assistant</h3>
              <p className="text-gray-400">Let's create your perfect Jharkhand experience</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Date and Duration */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full glass-dark rounded-xl px-4 py-3 text-white placeholder-gray-400 border border-white/20 focus:border-sky-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full glass-dark rounded-xl px-4 py-3 text-white border border-white/20 focus:border-sky-400 focus:outline-none transition-colors"
                  >
                    <option value="">Select Duration</option>
                    <option value="3-4">3-4 Days</option>
                    <option value="5-7">5-7 Days</option>
                    <option value="8-10">8-10 Days</option>
                    <option value="10+">10+ Days</option>
                  </select>
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-white font-medium mb-4">Your Interests</label>
                <div className="grid grid-cols-2 gap-3">
                  {interests.map((interest) => (
                    <motion.button
                      key={interest.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-3 rounded-xl text-left transition-all duration-300 ${
                        selectedInterests.includes(interest.id)
                          ? 'bg-gradient-to-r from-sky-400 to-emerald-400 text-black'
                          : 'glass-dark border border-white/20 text-white hover:border-sky-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{interest.icon}</span>
                        <span className="text-sm font-medium">{interest.label}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateItinerary}
                disabled={!startDate || !duration || selectedInterests.length === 0}
                className="w-full py-4 bg-gradient-to-r from-sky-400 to-emerald-400 text-black font-bold rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-sky-500/25 transition-all duration-300"
              >
                🚀 Generate My Itinerary
              </motion.button>
            </div>

            {/* AI Visualization */}
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative"
              >
                {/* Central AI Core */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-32 h-32 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full flex items-center justify-center"
                >
                  <span className="text-4xl">🧠</span>
                </motion.div>

                {/* Orbiting Elements */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 8 + i * 2, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="absolute inset-0"
                    style={{
                      transformOrigin: '50% 50%'
                    }}
                  >
                    <div
                      className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                      style={{
                        top: '10%',
                        left: '50%',
                        transform: `translateX(-50%) rotate(${i * 60}deg) translateY(${60 + i * 10}px)`
                      }}
                    />
                  </motion.div>
                ))}

                {/* Processing Text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sky-400 text-sm font-medium"
                >
                  Processing your preferences...
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Generated Itineraries */}
        {showItineraries && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-center text-white mb-8">
              <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Personalized Itineraries
              </span>
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {sampleItineraries.map((itinerary, index) => (
                <motion.div
                  key={itinerary.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-bold text-lg">{itinerary.title}</h4>
                    <span className="text-2xl bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent font-bold">
                      {itinerary.price}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">{itinerary.duration}</p>

                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-sky-400 font-medium text-sm">Destinations:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {itinerary.destinations.map((dest, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-300">
                            {dest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-emerald-400 font-medium text-sm">Highlights:</span>
                      <ul className="mt-1 space-y-1">
                        {itinerary.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full"></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 bg-gradient-to-r from-sky-400 to-emerald-400 text-black font-medium rounded-lg text-sm hover:shadow-lg transition-all duration-300"
                  >
                    Select This Plan
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}