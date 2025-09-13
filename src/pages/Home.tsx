import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useRef } from "react";
import useScrollToTop from "../hooks/useScrollToTop";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  MapPin,
  Calendar,
  Star,
  Camera,
  Users,
  Compass,
  Palette,
  ShoppingBag,
  ArrowRight,
  Play,
  Heart,
  Mountain,
  TreePine,
  Waves,
  Music,
  Shirt,
  Coffee,
} from "lucide-react";

export function Home() {
  useScrollToTop();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuredDestinations = [
    {
      name: "Netarhat",
      description: "Queen of Chotanagpur",
      image: "/Detinations/netarhat%201.jpg",
      rating: 4.8,
      route: "/destinations/netarhat",
    },
    {
      name: "Hundru Falls",
      description: "320ft Spectacular Waterfall",
      image: "/Detinations/hundru%20falls%201.jpg",
      rating: 4.9,
      route: "/destinations/hundru-falls",
    },
    {
      name: "Betla National Park",
      description: "Wildlife & Tiger Reserve",
      image: "/Detinations/dasami%20falls.jpg",
      rating: 4.7,
      route: "/destinations/betla-national-park",
    },
  ];

  // Hero video playlist (files are in public/Hero video/)
  const heroVideos = [
    "/Hero%20video/Hero%20section%206.mp4",
    "/Hero%20video/hero%20section%203.mp4",

    "/Hero%20video/hero%20section%205.mp4",
  ];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    // attempt to play when index changes (muted allows autoplay)
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {
        /* ignore play promise rejection */
      });
    }
  }, [videoIndex]);

  const culturalHighlights = [
    {
      title: "Tribal Dance",
      description: "Traditional Santal & Oraon performances",
      icon: Music,
      image:
        "https://images.unsplash.com/photo-1585563741139-4d488b8291c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjBjdWx0dXJlJTIwZGFuY2UlMjBpbmRpYXxlbnwxfHx8fDE3NTY1NDIwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Handloom Weaving",
      description: "Exquisite traditional textiles",
      icon: Shirt,
      image:
        "https://images.unsplash.com/photo-1610070322384-4ce29b83db15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGhhbmRsb29tJTIwd2VhdmluZyUyMGluZGlhfGVufDF8fHx8MTc1NjY3MjY0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Local Cuisine",
      description: "Authentic tribal delicacies",
      icon: Coffee,
      image:
        "https://images.unsplash.com/photo-1596688382656-a341e7deeeb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHNjZW5pYyUyMHZpZXd8ZW58MXx8fHwxNzU2NTU5OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const marketplaceFeatures = [
    {
      category: "Handcrafts",
      items: "Traditional pottery & wood carvings",
      artisans: "50+ Local Artisans",
    },
    {
      category: "Textiles",
      items: "Handwoven sarees & fabrics",
      artisans: "30+ Weavers",
    },
    {
      category: "Jewelry",
      items: "Tribal silver ornaments",
      artisans: "25+ Craftsmen",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            key={videoIndex}
            ref={videoRef}
            src={heroVideos[videoIndex]}
            className="w-full h-full object-cover"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            muted
            autoPlay
            playsInline
            preload="auto"
            controls={false}
            onEnded={() =>
              setVideoIndex((i: number) => (i + 1) % heroVideos.length)
            }
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Patterns */}
          <motion.div
            className="absolute top-20 left-10 w-16 h-16 opacity-20"
            animate={{ rotate: 360, y: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-full h-full bg-[#F59E0B] rounded-full blur-sm"></div>
          </motion.div>

          <motion.div
            className="absolute top-40 right-20 w-8 h-8 opacity-30"
            animate={{ x: [-5, 5, -5], rotate: 180 }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-full h-full bg-[#18B668] rounded-full blur-sm"></div>
          </motion.div>

          <motion.div
            className="absolute bottom-40 left-1/4 w-12 h-12 opacity-25"
            animate={{ y: [-20, 20, -20], rotate: -180 }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-full h-full bg-[#0EA5E9] rounded-full blur-sm"></div>
          </motion.div>

          {/* Floating Leaves */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-6 h-6 opacity-20 ${
                i % 2 === 0 ? "bg-[#18B668]" : "bg-[#F59E0B]"
              } rounded-full blur-sm`}
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 10}%`,
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
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6">
                <span className="text-[#18B668]">Discover</span>
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

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link to="/destinations">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass px-8 py-4 rounded-2xl text-white font-medium text-lg backdrop-blur-lg border border-white/20 hover:bg-white/10 transition-all duration-300 animate-pulse-glow"
                >
                  <span className="flex items-center gap-3">
                    <Mountain className="h-5 w-5" />
                    Explore Destinations
                  </span>
                </motion.button>
              </Link>

              <Link to="/travel-planner">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-dark px-8 py-4 rounded-2xl text-white font-medium text-lg backdrop-blur-lg border border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                  <span className="flex items-center gap-3">
                    <Compass className="h-5 w-5" />
                    Plan Your Trip
                  </span>
                </motion.button>
              </Link>
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

      {/* Quick Access Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Your <span className="text-[#18B668]">Journey</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose your path to discover the wonders of Jharkhand
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Destinations",
                description: "Explore breathtaking landscapes and hidden gems",
                icon: Mountain,
                link: "/destinations",
                color: "#18B668",
              },
              {
                title: "Culture & Heritage",
                description: "Immerse in rich tribal traditions and art",
                icon: Palette,
                link: "/culture",
                color: "#F59E0B",
              },
              {
                title: "Travel Planner",
                description: "AI-powered personalized trip planning",
                icon: Compass,
                link: "/travel-planner",
                color: "#0EA5E9",
              },
              {
                title: "Artisan Marketplace",
                description: "Shop authentic handicrafts from local artisans",
                icon: ShoppingBag,
                link: "/marketplace",
                color: "#8B5CF6",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link to={item.link}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="glass rounded-2xl p-6 text-center group hover:bg-white/10 transition-all duration-300 h-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: item.color }}
                    >
                      <item.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-white font-bold text-xl mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      viewport={{ once: true }}
                      className="h-1 mt-4 rounded-full origin-left opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: item.color }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Featured <span className="text-[#18B668]">Destinations</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the most breathtaking places in Jharkhand
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredDestinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass rounded-2xl overflow-hidden group hover:bg-white/5 transition-all duration-300"
              >
                <Link to={destination.route}>
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4 flex items-center gap-1 glass-dark rounded-full px-3 py-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm">
                        {destination.rating}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-2xl font-bold mb-1">
                        {destination.name}
                      </h3>
                      <p className="text-gray-200 text-sm">
                        {destination.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <Button className="w-full bg-[#18B668] hover:bg-[#18B668]/80 text-white">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Explore Now
                    </Button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/destinations">
              <Button
                variant="outline"
                size="lg"
                className="border-[#18B668] text-[#18B668] hover:bg-[#18B668] hover:text-white"
              >
                View All Destinations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Culture & Heritage Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Rich <span className="text-[#F59E0B]">Culture</span> & Heritage
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the vibrant traditions and artistic heritage of
              Jharkhand's tribal communities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {culturalHighlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass rounded-2xl overflow-hidden group hover:bg-white/5 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <item.icon className="h-8 w-8 text-[#F59E0B] mb-2" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/culture">
              <Button
                variant="outline"
                size="lg"
                className="border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white"
              >
                Explore Culture
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Travel Planner Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                AI-Powered{" "}
                <span className="text-[#0EA5E9]">Travel Planner</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Let our intelligent travel planner create the perfect itinerary
                based on your preferences, interests, and budget.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Personalized recommendations",
                  "Real-time weather updates",
                  "Local guide connections",
                  "Budget optimization",
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-[#0EA5E9] rounded-full"></div>
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
              <Link to="/travel-planner">
                <Button
                  size="lg"
                  className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/80 text-white"
                >
                  <Compass className="mr-2 h-5 w-5" />
                  Start Planning
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0EA5E9] rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Group Size</h4>
                    <p className="text-gray-400 text-sm">2-4 travelers</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#18B668] rounded-xl flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Duration</h4>
                    <p className="text-gray-400 text-sm">5-7 days</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F59E0B] rounded-xl flex items-center justify-center">
                    <Mountain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Interests</h4>
                    <p className="text-gray-400 text-sm">Nature & Adventure</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Artisan Marketplace Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Artisan <span className="text-[#8B5CF6]">Marketplace</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Support local artisans by purchasing authentic handcrafted items
              directly from the makers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {marketplaceFeatures.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 text-center hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-[#8B5CF6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">
                  {category.category}
                </h3>
                <p className="text-gray-300 text-sm mb-4">{category.items}</p>
                <Badge
                  variant="outline"
                  className="border-[#8B5CF6] text-[#8B5CF6]"
                >
                  {category.artisans}
                </Badge>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/marketplace">
              <Button
                variant="outline"
                size="lg"
                className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white"
              >
                Visit Marketplace
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
