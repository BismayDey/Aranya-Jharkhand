import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import useScrollToTop from '../hooks/useScrollToTop';

const culturalElements = [
  {
    id: 1,
    title: "Tribal Dance Traditions",
    description: "Experience the vibrant Santhal, Munda, and Ho tribal dances that celebrate harvest, festivals, and life milestones with rhythmic beats and colorful costumes.",
    image: "https://images.unsplash.com/photo-1708434866032-90aedbeddabb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjBhcnQlMjBwYXR0ZXJucyUyMGN1bHR1cmV8ZW58MXx8fHwxNzU2NjcyNTk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    highlights: ["Santhal Dance", "Tribal Music", "Festival Celebrations"],
    category: "performing-arts"
  },
  {
    id: 2,
    title: "Traditional Handicrafts",
    description: "Discover intricate bell metal work, bamboo crafts, and stone sculptures created by skilled artisans using techniques passed down through generations.",
    image: "https://images.unsplash.com/photo-1724709166740-96947d362a17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGhhbmRpY3JhZnRzJTIwYXJ0aXNhbnxlbnwxfHx8fDE3NTY2NzI2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    highlights: ["Bell Metal", "Bamboo Craft", "Stone Carving"],
    category: "handicrafts"
  },
  {
    id: 3,
    title: "Sacred Architecture",
    description: "Marvel at ancient temples like Baidyanath Dham and architectural wonders that blend spiritual significance with artistic excellence.",
    image: "https://images.unsplash.com/photo-1667115788157-72f063f2a7a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjBhcmNoaXRlY3R1cmUlMjBoZXJpdGFnZXxlbnwxfHx8fDE3NTY2NzI2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    highlights: ["Ancient Temples", "Sacred Architecture", "Spiritual Heritage"],
    category: "architecture"
  }
];

const artisanCategories = [
  {
    id: 'textiles',
    name: 'Textiles & Weaving',
    icon: '🧵',
    count: 45,
    color: '#8B5CF6'
  },
  {
    id: 'metalwork',
    name: 'Metal Works',
    icon: '⚒️',
    count: 32,
    color: '#F59E0B'
  },
  {
    id: 'pottery',
    name: 'Pottery & Ceramics',
    icon: '🏺',
    count: 28,
    color: '#0EA5E9'
  },
  {
    id: 'woodcraft',
    name: 'Wood Crafts',
    icon: '🪵',
    count: 21,
    color: '#18B668'
  }
];

export function Culture() {
  useScrollToTop();
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Culture & </span>
            <span className="text-[#F59E0B]">
              Heritage
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Immerse yourself in the rich tapestry of tribal traditions, ancient wisdom, and artistic excellence
          </p>
        </motion.div>

        {/* Cultural Elements */}
        <div className="space-y-32 mb-32">
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
                          className="w-12 h-12 border-2 border-[#F59E0B]/30 rounded-full"
                        >
                          <div className="w-full h-full border-2 border-[#F59E0B]/50 rounded-full rotate-45"></div>
                        </motion.div>
                      </div>

                      {/* Glowing Frame Effect */}
                      <div className="absolute inset-0 border-2 border-[#F59E0B]/30 rounded-2xl animate-pulse-glow"></div>
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
                    <div className="w-12 h-12 rounded-full bg-[#F59E0B] flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{element.id}</span>
                    </div>
                    <div className="h-0.5 flex-1 bg-[#F59E0B]"></div>
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
                        <div className="w-2 h-2 bg-[#F59E0B] rounded-full"></div>
                        <span className="text-gray-300">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-8 py-3 bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-[#F59E0B]/25 transition-all duration-300"
                  >
                    Explore More
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Meet Our Master Artisans Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Meet Our <span className="text-[#F59E0B]">Master Artisans</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Discover authentic handicrafts and connect directly with the skilled artisans who preserve these ancient traditions
          </p>

          {/* Artisan Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {artisanCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass rounded-2xl p-6 text-center group hover:bg-white/10 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: category.color }}
                >
                  <span className="text-3xl">{category.icon}</span>
                </motion.div>
                
                <h3 className="text-white font-bold text-lg mb-2">{category.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{category.count} Master Artisans</p>
                
                {/* Hover Effect Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="h-1 rounded-full origin-left opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: category.color }}
                />
              </motion.div>
            ))}
          </div>

          {/* Visit Marketplace CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8"
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              Discover Authentic <span className="text-[#18B668]">Handicrafts</span>
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Support local artisans and bring home unique pieces that tell the story of Jharkhand's rich cultural heritage
            </p>

            <Link to="/marketplace">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#18B668] hover:bg-[#18B668]/90 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-[#18B668]/25 transition-all duration-300"
              >
                <span className="text-xl">🔍</span>
                Visit Our Marketplace
                <span className="text-xl">→</span>
              </motion.button>
            </Link>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: "🏆", label: "Quality Guaranteed", desc: "Authentic handmade products" },
                { icon: "🤝", label: "Direct from Artisans", desc: "Supporting local communities" },
                { icon: "🚚", label: "Nationwide Delivery", desc: "Free shipping on orders above ₹2000" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="text-white font-semibold mb-2">{feature.label}</h4>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Cultural Events & Festivals */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Cultural <span className="text-[#F59E0B]">Events & Festivals</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarhul Festival",
                date: "March - April",
                description: "Celebration of nature and harvest by tribal communities",
                image: "🌸"
              },
              {
                name: "Karam Festival",
                date: "September",
                description: "Traditional festival honoring the Karam tree and folklore",
                image: "🌳"
              },
              {
                name: "Tusu Parab",
                date: "December - January",
                description: "Winter harvest festival with folk songs and dances",
                image: "🎭"
              }
            ].map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-6 text-center group hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{event.image}</div>
                <h4 className="text-white font-bold text-lg mb-2">{event.name}</h4>
                <p className="text-[#18B668] text-sm mb-3">{event.date}</p>
                <p className="text-gray-400 text-sm">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}