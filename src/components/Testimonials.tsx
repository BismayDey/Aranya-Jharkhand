import { motion } from 'motion/react';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "California, USA",
    avatar: "👩‍🦰",
    rating: 5,
    text: "Jharkhand completely transformed my perspective on India. The tribal culture experiences were authentic and deeply moving. The waterfalls and forests are absolutely breathtaking!",
    trip: "7-day Cultural Immersion",
    highlights: ["Tribal village stay", "Hundru Falls", "Traditional handicrafts"]
  },
  {
    id: 2,
    name: "Marcus Weber",
    location: "Berlin, Germany",
    avatar: "👨‍🦲",
    rating: 5,
    text: "As a nature photographer, Jharkhand exceeded all expectations. The biodiversity in Betla National Park and the pristine landscapes provided incredible shooting opportunities.",
    trip: "10-day Wildlife Photography",
    highlights: ["Betla National Park", "Netarhat sunrise", "Wildlife photography"]
  },
  {
    id: 3,
    name: "Priya Sharma",
    location: "Mumbai, India",
    avatar: "👩‍💼",
    rating: 5,
    text: "Being from India, I thought I knew my country well. Jharkhand's hidden gems and the warmth of tribal communities created memories I'll treasure forever. Truly unexplored beauty!",
    trip: "5-day Weekend Getaway",
    highlights: ["Patratu Valley", "Local cuisine", "Cultural performances"]
  },
  {
    id: 4,
    name: "James Mitchell",
    location: "Sydney, Australia",
    avatar: "👨‍🧔",
    rating: 5,
    text: "The sustainable tourism approach here is commendable. Every activity supports local communities while preserving the environment. This is how responsible travel should be done.",
    trip: "8-day Eco-Adventure",
    highlights: ["Community projects", "Eco-lodges", "Conservation activities"]
  },
  {
    id: 5,
    name: "Elena Rodriguez",
    location: "Madrid, Spain",
    avatar: "👩‍🎨",
    rating: 5,
    text: "The artistic heritage of Jharkhand is phenomenal. Learning traditional crafts from master artisans and participating in tribal festivals was an incredible cultural exchange.",
    trip: "6-day Art & Culture Tour",
    highlights: ["Handicraft workshops", "Festival participation", "Art galleries"]
  },
  {
    id: 6,
    name: "David Kim",
    location: "Seoul, South Korea",
    avatar: "👨‍💻",
    rating: 5,
    text: "Perfect blend of adventure and spirituality. The temples in Deoghar and the adrenaline rush at Hundru Falls created a balanced and rejuvenating travel experience.",
    trip: "5-day Spiritual Adventure",
    highlights: ["Temple visits", "Waterfall trekking", "Meditation sessions"]
  }
];

export function Testimonials() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Traveler </span>
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Stories
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real experiences from adventurers who discovered the magic of Jharkhand
          </p>
        </motion.div>

        {/* Floating 3D Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.8,
                type: "spring",
                stiffness: 100 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15, 
                rotateY: 5, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredCard(testimonial.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative group"
              style={{ perspective: '1000px' }}
            >
              {/* 3D Card */}
              <div className="glass rounded-2xl p-6 relative overflow-hidden transform-gpu transition-all duration-300 hover:bg-white/10">
                {/* Floating Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <motion.div
                    animate={{ 
                      rotate: hoveredCard === testimonial.id ? 360 : 0,
                      scale: hoveredCard === testimonial.id ? 1.2 : 1
                    }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full absolute -top-8 -right-8"
                  />
                </div>

                {/* Header */}
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                  >
                    <span className="text-xl">{testimonial.avatar}</span>
                  </motion.div>
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="text-yellow-400 text-lg"
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-300 text-sm leading-relaxed mb-4 relative z-10">
                  "{testimonial.text}"
                </blockquote>

                {/* Trip Details */}
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full font-medium">
                      {testimonial.trip}
                    </span>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1">
                    {testimonial.highlights.map((highlight, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                        <span className="text-xs text-gray-400">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                {hoveredCard === testimonial.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-2xl pointer-events-none"
                  />
                )}

                {/* Quote Symbol */}
                <div className="absolute top-4 right-4 text-6xl text-yellow-400/10 font-serif">
                  "
                </div>
              </div>

              {/* 3D Shadow */}
              <motion.div
                animate={{
                  opacity: hoveredCard === testimonial.id ? 0.3 : 0.1,
                  scale: hoveredCard === testimonial.id ? 1.05 : 1,
                  y: hoveredCard === testimonial.id ? 5 : 0
                }}
                className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl blur-xl -z-10 transform translate-y-4"
              />
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 glass rounded-3xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "2,500+", label: "Happy Travelers", icon: "😊" },
              { number: "4.9/5", label: "Average Rating", icon: "⭐" },
              { number: "98%", label: "Would Recommend", icon: "👍" },
              { number: "50+", label: "Countries Visited From", icon: "🌍" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-3xl mb-2"
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-1"
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}