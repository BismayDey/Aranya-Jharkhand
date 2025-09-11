import React, { useEffect, useState } from "react";
import { DestinationData } from "../data/destinationsData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Calendar,
  Star,
  Camera,
  Thermometer,
  Mountain,
  TreePine,
  Waves,
  Heart,
  Share2,
  Navigation,
  Info,
} from "lucide-react";

type Props = {
  dest: DestinationData & Record<string, any>;
};

function getIconForHighlight(title: string) {
  const t = title.toLowerCase();
  if (t.includes("water") || t.includes("fall")) return Waves;
  if (t.includes("photo") || t.includes("camera")) return Camera;
  if (t.includes("trek") || t.includes("trail") || t.includes("mount"))
    return Mountain;
  if (
    t.includes("pool") ||
    t.includes("tree") ||
    t.includes("forest") ||
    t.includes("nature")
  )
    return TreePine;
  return Camera;
}

export default function DestinationFull({ dest }: Props) {
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // normalize fields from dest with sensible defaults
  const heroImage = dest.heroImage || dest.image || "";
  const gallery: string[] =
    dest.gallery && dest.gallery.length
      ? dest.gallery
      : [dest.image || heroImage];
  const tagline = dest.tagline || dest.name;
  const reviews = dest.reviews ?? Math.round((dest.rating || 4) * 40);
  const location = dest.location || dest.name;
  const elevation = dest.elevation || dest.elevation || "";
  const temperature = dest.temperature || "";
  const activities: string[] =
    (dest.activities as any[]) ||
    (Array.isArray(dest.highlights)
      ? (dest.highlights as any[]).map((h: any) =>
          typeof h === "string" ? h : h.title
        )
      : []);
  const nearbyAttractions = dest.nearbyAttractions || [];
  const tips: string[] = dest.tips || [
    "Check weather and plan accordingly.",
    "Carry water and snacks for day trips.",
    "Respect local guidelines and signage.",
  ];

  const highlights = Array.isArray(dest.highlights)
    ? (dest.highlights as any[]).map((h: any) =>
        typeof h === "string"
          ? { title: h, description: "", icon: getIconForHighlight(h) }
          : {
              title: h.title,
              description: h.description,
              icon: h.icon || getIconForHighlight(h.title),
            }
      )
    : [];

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <ImageWithFallback
            src={heroImage}
            alt={dest.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/destinations")}
          className="absolute top-24 left-4 z-20 glass text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
        >
          <ArrowLeft className="h-6 w-6" />
        </motion.button>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-4xl px-4"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              {dest.name}
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              {tagline}
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-6 text-white/80 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400" />
                <span>{dest.rating}</span>
                <span>({reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{location}</span>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
            >
              <Button
                size="lg"
                className="bg-[#18B668] hover:bg-[#18B668]/80 text-white px-8"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Experience
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm">Discover More</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white/70 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Quick Info Bar */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="py-8 glass sticky top-0 z-30"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center gap-2 text-white">
              <Clock className="h-5 w-5 text-[#18B668]" />
              <span className="text-sm">{dest.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Calendar className="h-5 w-5 text-[#0EA5E9]" />
              <span className="text-sm">{dest.bestTime}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Mountain className="h-5 w-5 text-[#F59E0B]" />
              <span className="text-sm">{elevation}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Thermometer className="h-5 w-5 text-[#8B4513]" />
              <span className="text-sm">{temperature}</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                About {dest.name}
              </h2>
              <p className="text-white/80 leading-relaxed text-lg">
                {dest.description}
              </p>
            </motion.section>

            {/* Highlights */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">
                What Makes It Special
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass p-6 hover:scale-105 transition-transform duration-300 rounded-xl"
                  >
                    <highlight.icon className="h-12 w-12 text-[#18B668] mb-4" />
                    <h3 className="text-white font-semibold text-xl mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-white/70">{highlight.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Activities */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">
                Things To Do
              </h2>
              <div className="flex flex-wrap gap-3">
                {activities.map((activity, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#18B668]/20 text-[#18B668] border-[#18B668]/30 px-4 py-2 text-sm"
                  >
                    {activity}
                  </Badge>
                ))}
              </div>
            </motion.section>

            {/* Gallery */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Gallery</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative overflow-hidden rounded-xl cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${dest.name} gallery ${index + 1}`}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <Card className="glass sticky top-32">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Plan Your Visit
                  </h3>
                  <div className="space-y-4">
                    <Button className="w-full bg-[#18B668] hover:bg-[#18B668]/80 text-white">
                      <Calendar className="mr-2 h-4 w-4" />
                      Check Availability
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Destination
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      <Navigation className="mr-2 h-4 w-4" />
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Quick Info
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Best Time:</span>
                      <span className="text-white">{dest.bestTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Duration:</span>
                      <span className="text-white">{dest.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Difficulty:</span>
                      <span className="text-white">{dest.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Temperature:</span>
                      <span className="text-white">{temperature}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Nearby Attractions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Nearby Attractions
                  </h3>
                  <div className="space-y-3">
                    {nearbyAttractions.map((attraction: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="text-white text-sm font-medium">
                            {attraction.name}
                          </p>
                          <p className="text-white/60 text-xs">
                            {attraction.type}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-white/20 text-white/70 text-xs"
                        >
                          {attraction.distance}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Travel Tips */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Travel Tips
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-[#0EA5E9] mt-1 flex-shrink-0" />
                  <p className="text-white/80 text-sm leading-relaxed">{tip}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
