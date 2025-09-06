import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const culturalElements = [
  {
    id: 1,
    title: "Tribal Dance Traditions",
    description: "Experience the vibrant Santhal, Munda, and Ho tribal dances that celebrate harvest, festivals, and life milestones with rhythmic beats and colorful costumes.",
    image: "https://images.unsplash.com/photo-1708434866032-90aedbeddabb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjBhcnQlMjBwYXR0ZXJucyUyMGN1bHR1cmV8ZW58MXx8fHwxNzU2NjcyNTk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    highlights: ["Santhal Dance", "Tribal Music", "Festival Celebrations"]
  },
  {
    id: 2,
    title: "Traditional Handicrafts",
    description: "Discover intricate bell metal work, bamboo crafts, and stone sculptures created by skilled artisans using techniques passed down through generations.",
    image: "https://images.unsplash.com/photo-1724709166740-96947d362a17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGhhbmRpY3JhZnRzJTIwYXJ0aXNhbnxlbnwxfHx8fDE3NTY2NzI2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    highlights: ["Bell Metal", "Bamboo Craft", "Stone Carving"]
  },
  {
    id: 3,
    title: "Sacred Architecture",
    description: "Marvel at ancient temples like Baidyanath Dham and architectural wonders that blend spiritual significance with artistic excellence.",
    image: "https://images.unsplash.com/photo-1667115788157-72f063f2a7a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjBhcmNoaXRlY3R1cmUlMjBoZXJpdGFnZXxlbnwxfHx8fDE3NTY2NzI2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    highlights: ["Ancient Temples", "Sacred Architecture", "Spiritual Heritage"]
  }
];

export function Culture() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Culture & </span>
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Heritage
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Immerse yourself in the rich tapestry of tribal traditions, ancient wisdom, and artistic excellence
          </p>
        </motion.div>

        {/* Cultural Elements */}
        <div className="space-y-32">
          {culturalElements.map((element, index) => (
            <motion.div
              key={element.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Section */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <div className="glass rounded-3xl p-4 overflow-hidden">
                    <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
                      <ImageWithFallback
                        src={element.image}
                        alt={element.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Floating Pattern Elements */}
                      <div className="absolute top-4 right-4">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="w-12 h-12 border-2 border-yellow-400/30 rounded-full"
                        >
                          <div className="w-full h-full border-2 border-orange-500/30 rounded-full rotate-45"></div>
                        </motion.div>
                      </div>

                      {/* Glowing Frame Effect */}
                      <div className="absolute inset-0 border-2 border-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-2xl animate-pulse-glow"></div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Content Section */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                      <span className="text-black font-bold text-xl">{element.id}</span>
                    </div>
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-yellow-400 to-transparent"></div>
                  </div>

                  <h3 className="text-4xl font-bold text-white mb-4">
                    {element.title}
                  </h3>

                  <p className="text-lg text-gray-300 leading-relaxed mb-8">
                    {element.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-3">
                    {element.highlights.map((highlight, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                        <span className="text-gray-300">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-2xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
                  >
                    Explore More
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Artisan Showcase Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Meet Our <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Master Artisans</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass rounded-2xl p-6 text-center group hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 p-1">
                  <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎨</span>
                  </div>
                </div>
                <h4 className="text-white font-semibold mb-2">Master Craftsperson</h4>
                <p className="text-gray-400 text-sm">Traditional Bell Metal Artist</p>
                <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}