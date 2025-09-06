import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1735567065045-97ba386867ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGxzJTIwZm9yZXN0JTIwbmF0dXJlJTIwamhhcmtoYW5kfGVufDF8fHx8MTc1NjY3MjU5OXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Jharkhand Waterfalls"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Tribal Patterns */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 opacity-20"
          animate={{ rotate: 360, y: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-sm"></div>
        </motion.div>

        <motion.div
          className="absolute top-40 right-20 w-8 h-8 opacity-30"
          animate={{ x: [-5, 5, -5], rotate: 180 }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-green-600 rounded-full blur-sm"></div>
        </motion.div>

        <motion.div
          className="absolute bottom-40 left-1/4 w-12 h-12 opacity-25"
          animate={{ y: [-20, 20, -20], rotate: -180 }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-sky-400 to-blue-600 rounded-full blur-sm"></div>
        </motion.div>

        {/* Floating Leaves */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-6 h-6 opacity-20 ${
              i % 2 === 0 ? 'bg-emerald-500' : 'bg-yellow-500'
            } rounded-full blur-sm`}
            style={{
              top: `${20 + (i * 15)}%`,
              left: `${10 + (i * 10)}%`,
            }}
            animate={{
              y: [-10, 20, -10],
              x: [-5, 10, -5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Animated Headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 via-yellow-400 to-sky-400 bg-clip-text text-transparent">
                Discover
              </span>
              <br />
              <span className="text-white">Jharkhand</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
            >
              Where Nature Meets Culture in Perfect Harmony
            </motion.p>
          </motion.div>

          {/* Glassmorphism CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass px-8 py-4 rounded-2xl text-white font-medium text-lg backdrop-blur-lg border border-white/20 hover:bg-white/10 transition-all duration-300 animate-pulse-glow"
            >
              <span className="flex items-center gap-3">
                🌿 Explore Destinations
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-dark px-8 py-4 rounded-2xl text-white font-medium text-lg backdrop-blur-lg border border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                ✨ Plan Your Trip
              </span>
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white/70 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}