import { motion } from 'motion/react';

const empowermentStories = [
  {
    id: 1,
    title: "Women's Self-Help Groups",
    description: "Empowering 500+ women through handicraft cooperatives, providing sustainable income and preserving traditional arts.",
    impact: "₹2.5 Cr+ generated",
    icon: "👩‍🎨",
    color: "from-pink-400 to-rose-500"
  },
  {
    id: 2,
    title: "Eco-Tourism Initiatives",
    description: "Local communities managing 15+ eco-tourism sites, creating jobs while protecting natural heritage.",
    impact: "200+ families benefited",
    icon: "🌱",
    color: "from-emerald-400 to-green-500"
  },
  {
    id: 3,
    title: "Youth Skill Development",
    description: "Training programs for tribal youth in hospitality, guiding, and digital skills for tourism industry.",
    impact: "80% employment rate",
    icon: "🎓",
    color: "from-blue-400 to-indigo-500"
  },
  {
    id: 4,
    title: "Cultural Preservation",
    description: "Documenting and promoting tribal languages, stories, and traditions through cultural exchange programs.",
    impact: "5 languages preserved",
    icon: "📚",
    color: "from-yellow-400 to-orange-500"
  }
];

const communityMembers = [
  {
    id: 1,
    name: "Sunita Devi",
    role: "Master Weaver & Cooperative Leader",
    story: "Leading a 50-member women's cooperative, preserving traditional textile arts while creating sustainable livelihoods.",
    avatar: "👩‍🦳"
  },
  {
    id: 2,
    name: "Birsa Munda",
    role: "Eco-Tourism Guide",
    story: "Third-generation forest guardian turned sustainable tourism entrepreneur, sharing indigenous knowledge with visitors.",
    avatar: "👨‍🌾"
  },
  {
    id: 3,
    name: "Prema Kumari",
    role: "Cultural Ambassador",
    story: "Preserving and teaching traditional Santhal dance forms while running a homestay for cultural immersion experiences.",
    avatar: "👩‍🎭"
  }
];

export function Community() {
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
            <span className="text-white">Community </span>
            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              Empowerment
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Tourism that transforms lives, preserves culture, and protects our natural heritage
          </p>
        </motion.div>

        {/* Empowerment Stories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20"
        >
          {empowermentStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass rounded-2xl p-6 text-center group hover:bg-white/10 transition-all duration-300"
            >
              {/* Animated Icon */}
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${story.color} flex items-center justify-center`}
              >
                <span className="text-3xl">{story.icon}</span>
              </motion.div>

              <h3 className="text-white font-bold text-lg mb-3">{story.title}</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{story.description}</p>
              
              {/* Impact Badge */}
              <div className={`inline-flex items-center px-3 py-2 bg-gradient-to-r ${story.color} rounded-full`}>
                <span className="text-black font-semibold text-xs">{story.impact}</span>
              </div>

              {/* Hover Effect Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className={`h-1 bg-gradient-to-r ${story.color} mt-4 rounded-full origin-left`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Community Stories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-4xl font-bold text-center text-white mb-12">
            Stories of <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">Transformation</span>
          </h3>

          <div className="grid lg:grid-cols-3 gap-8">
            {communityMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{member.avatar}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{member.name}</h4>
                    <p className="text-emerald-400 text-sm">{member.role}</p>
                  </div>
                </div>

                {/* Story */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  "{member.story}"
                </p>

                {/* Quote Decoration */}
                <div className="flex justify-end">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full flex items-center justify-center opacity-20">
                    <span className="text-black font-bold">"</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center glass rounded-3xl p-12"
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Be Part of the <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">Change</span>
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Your visit directly supports local communities, funds conservation efforts, and helps preserve Jharkhand's rich cultural heritage for future generations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-sky-400 text-black font-bold rounded-2xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
            >
              Support Local Communities
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 glass-dark border border-white/20 text-white font-medium rounded-2xl hover:border-emerald-400 transition-all duration-300"
            >
              Learn More About Our Impact
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}