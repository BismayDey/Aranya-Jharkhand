import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const socialLinks = [
  { 
    name: 'Facebook', 
    icon: '📘', 
    color: 'from-blue-400 to-blue-600',
    handle: '@AaranyaJharkhand'
  },
  { 
    name: 'Instagram', 
    icon: '📸', 
    color: 'from-pink-400 to-purple-600',
    handle: '@AaranyaJharkhand'
  },
  { 
    name: 'Twitter', 
    icon: '🐦', 
    color: 'from-sky-400 to-blue-500',
    handle: '@AaranyaJharkhand'
  },
  { 
    name: 'YouTube', 
    icon: '📺', 
    color: 'from-red-400 to-red-600',
    handle: '@AaranyaJharkhand'
  },
  { 
    name: 'WhatsApp', 
    icon: '💬', 
    color: 'from-green-400 to-green-600',
    handle: '+91 98765 43210'
  }
];

const footerLinks = [
  {
    title: "Destinations",
    links: [
      { name: "Netarhat", path: "/destinations" },
      { name: "Hundru Falls", path: "/destinations" },
      { name: "Betla National Park", path: "/destinations" },
      { name: "Deoghar", path: "/destinations" },
      { name: "Patratu Valley", path: "/destinations" }
    ]
  },
  {
    title: "Experiences",
    links: [
      { name: "Cultural Tours", path: "/culture" },
      { name: "Wildlife Safari", path: "/destinations" },
      { name: "Adventure Sports", path: "/destinations" },
      { name: "Spiritual Journey", path: "/culture" },
      { name: "Photography Tours", path: "/destinations" }
    ]
  },
  {
    title: "Plan Your Trip",
    links: [
      { name: "Travel Planner", path: "/travel-planner" },
      { name: "Best Time to Visit", path: "/destinations" },
      { name: "Accommodation", path: "/travel-planner" },
      { name: "Transportation", path: "/travel-planner" },
      { name: "Travel Tips", path: "/travel-planner" }
    ]
  },
  {
    title: "About",
    links: [
      { name: "Our Story", path: "/" },
      { name: "Community Impact", path: "/culture" },
      { name: "Marketplace", path: "/marketplace" },
      { name: "Sustainability", path: "/culture" },
      { name: "Contact Us", path: "/" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-black to-slate-900 pt-20 pb-8 overflow-hidden">
      {/* Tribal Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full"
          fill="currentColor"
        >
          {/* Tribal Pattern Elements */}
          <defs>
            <pattern id="tribalPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M20,20 L40,40 L60,20 L80,40 L80,60 L60,80 L40,60 L20,80 Z" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="50" cy="50" r="5" fill="currentColor" />
              <path d="M30,30 L70,30 M30,70 L70,70 M30,30 L30,70 M70,30 L70,70" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tribalPattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl font-bold text-white mb-4">
            Stay Connected with <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">Aaranya Jharkhand</span>
          </h3>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Get the latest updates on new destinations, cultural events, and exclusive travel offers
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 glass-dark rounded-xl text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:outline-none transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-sky-400 text-black font-bold rounded-xl whitespace-nowrap hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
            >
              Subscribe ✨
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Social Media Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          {socialLinks.map((social, index) => (
            <motion.div
              key={social.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="group cursor-pointer"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${social.color} rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}>
                {/* Neon Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`}
                  style={{ filter: 'blur(15px)' }}
                />
                
                <span className="text-2xl relative z-10">{social.icon}</span>
                
                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 glass-dark rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap"
                >
                  {social.handle}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
        >
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold text-lg mb-4 relative">
                {section.title}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="h-0.5 bg-gradient-to-r from-emerald-400 to-transparent mt-2 origin-left"
                />
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 + linkIndex * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Link to={link.path}>
                      <motion.span
                        whileHover={{ x: 5, color: '#18B668' }}
                        className="text-gray-400 hover:text-emerald-400 transition-all duration-300 text-sm block"
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo and Copyright */}
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-xl flex items-center justify-center"
              >
                <span className="text-black font-bold text-xl">A</span>
              </motion.div>
              <div>
                <div className="text-white font-bold text-lg">Aaranya Jharkhand</div>
                <div className="text-gray-400 text-sm">© 2025 All rights reserved</div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex gap-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Support'].map((link, index) => (
                <motion.a
                  key={link}
                  href="#"
                  whileHover={{ y: -2, color: '#10B981' }}
                  className="text-gray-400 hover:text-emerald-400 transition-all duration-300"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Floating Decorative Elements */}
          <div className="absolute bottom-4 left-4 opacity-30">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-emerald-400 rounded-full"
            >
              <div className="w-full h-full border-2 border-sky-400 rounded-full rotate-45"></div>
            </motion.div>
          </div>

          <div className="absolute bottom-4 right-4 opacity-30">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll-to-top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full flex items-center justify-center text-black font-bold shadow-lg hover:shadow-xl z-50 transition-all duration-300"
      >
        ↑
      </motion.button>
    </footer>
  );
}