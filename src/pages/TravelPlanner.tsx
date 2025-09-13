import { motion } from "motion/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  Users,
  Star,
  Calendar,
  Heart,
  Camera,
  Mountain,
  Utensils,
  Wifi,
  Bed,
  Car,
  Shield,
  Phone,
  Globe,
} from "lucide-react";

const interests = [
  {
    id: "nature",
    label: "Nature & Wildlife",
    icon: "🌿",
    color: "from-green-400 to-emerald-500",
    description: "Ancient forests, cascading waterfalls, rare wildlife safaris",
  },
  {
    id: "culture",
    label: "Tribal Heritage",
    icon: "🎭",
    color: "from-purple-400 to-pink-500",
    description: "Indigenous cultures, sacred traditions, authentic villages",
  },
  {
    id: "adventure",
    label: "Extreme Adventures",
    icon: "🏔️",
    color: "from-orange-400 to-red-500",
    description: "Adrenaline sports, mountain expeditions, thrill activities",
  },
  {
    id: "spiritual",
    label: "Sacred Journeys",
    icon: "🕉️",
    color: "from-yellow-400 to-orange-500",
    description: "Holy temples, meditation retreats, spiritual awakening",
  },
  {
    id: "photography",
    label: "Visual Storytelling",
    icon: "📸",
    color: "from-blue-400 to-indigo-500",
    description:
      "Breathtaking landscapes, wildlife photography, cultural portraits",
  },
  {
    id: "food",
    label: "Culinary Exploration",
    icon: "🍽️",
    color: "from-pink-400 to-rose-500",
    description:
      "Traditional tribal cuisine, cooking masterclasses, food heritage",
  },
  {
    id: "wellness",
    label: "Holistic Wellness",
    icon: "🧘‍♀️",
    color: "from-teal-400 to-cyan-500",
    description: "Ayurvedic healing, yoga retreats, natural therapies",
  },
  {
    id: "history",
    label: "Ancient Mysteries",
    icon: "🏛️",
    color: "from-amber-400 to-yellow-500",
    description:
      "Prehistoric rock art, archaeological wonders, historical sites",
  },
];

const budgetRanges = [
  {
    id: "budget",
    label: "Forest Explorer",
    range: "₹2000 - ₹3000",
    icon: "💰",
    features: [
      "Eco-lodges",
      "Group adventures",
      "Local transport",
      "Basic amenities",
    ],
  },
  {
    id: "standard",
    label: "Heritage Traveler",
    range: "₹3000 - ₹6000",
    icon: "💳",
    features: [
      "Heritage hotels",
      "Private guides",
      "Comfort transport",
      "Premium experiences",
    ],
  },
  {
    id: "premium",
    label: "Luxury Explorer",
    range: "₹6000 - ₹8000",
    icon: "💎",
    features: [
      "Luxury resorts",
      "Exclusive experiences",
      "Personal concierge",
      "Private transport",
    ],
  },
  {
    id: "luxury",
    label: "Elite Aaranya",
    range: "₹9000+",
    icon: "👑",
    features: ["Ultra-luxury accommodations", "Access to Private Reserves"],
  },
];

const accommodationTypes = [
  {
    id: "tribal-homestay",
    label: "Tribal Homestay",
    icon: "🏠",
    description: "Live with indigenous families, authentic cultural immersion",
  },
  {
    id: "heritage-palace",
    label: "Heritage Palace",
    icon: "🏰",
    description: "Royal accommodations with regal ambiance and modern luxury",
  },
  {
    id: "eco-luxury-resort",
    label: "Eco-Luxury Resort",
    icon: "🌳",
    description: "Sustainable luxury amidst pristine forests",
  },
  {
    id: "adventure-basecamp",
    label: "Adventure Basecamp",
    icon: "⛺",
    description: "High-altitude camps with stunning mountain views",
  },
  {
    id: "forest-treehouse",
    label: "Canopy Treehouse",
    icon: "🌲",
    description: "Elevated stays in ancient tree canopies",
  },
  {
    id: "wellness-retreat",
    label: "Wellness Sanctuary",
    icon: "🧘",
    description: "Healing centers focused on mind-body rejuvenation",
  },
];

const JHARKHAND_CITIES: {
  [key: number]: { name: string; description: string };
} = {
  1: { name: "Ranchi", description: "Capital; waterfalls & urban attractions" },
  2: {
    name: "Jamshedpur",
    description: "Steel city; Jubilee Park, Dalma Sanctuary",
  },
  3: { name: "Deoghar", description: "Baidyanath Jyotirlinga, pilgrim city" },
  4: { name: "Hazaribagh", description: "National Park, Canary Hill" },
  5: { name: "Giridih", description: "Parasnath Hills, Usri Falls" },
  6: { name: "Netarhat", description: "Hill station, sunsets" },
  7: {
    name: "Latehar (Betla)",
    description: "Betla National Park, Palamu Fort",
  },
  8: { name: "Dumka", description: "Maluti temples, Basukinath" },
  9: { name: "Chatra", description: "Kunda caves, waterfalls" },
  10: { name: "Ghatshila", description: "Subarnarekha river, Burudi Lake" },
  11: { name: "Patratu Valley", description: "Scenic drive, reservoir" },
  12: { name: "Bokaro", description: "City Park, Garga Dam" },
  13: {
    name: "Khunti",
    description: "Birthplace of Birsa Munda, Panchghagh Falls",
  },
  14: { name: "Gumla", description: "Anjan Dham, Nagpheni Hills" },
  15: { name: "Chaibasa", description: "Gateway to Saranda forest" },
  16: { name: "Sahibganj", description: "Rajmahal Hills, Ganga views" },
  17: { name: "Pakur", description: "Stone town, Rajmahal Hills access" },
  18: { name: "Simdega", description: "Tribal heartland, scenic region" },
  19: { name: "Godda", description: "Rajmahal Hills area, rural tourism" },
  20: { name: "Lohardaga", description: "Navratangarh Fort, religious sites" },
  21: { name: "Barhi (Hazaribagh)", description: "Gateway to Tilaiya Dam" },
  22: { name: "Mander (Ranchi)", description: "Historical Mander Fort" },
  23: { name: "Koderma", description: "Tilaiya Dam, scenic hills" },
  24: { name: "Tenughat (Bokaro)", description: "Tenughat Dam & Lake" },
};

interface EnhancedTravelPlan {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  destinations: Array<{
    name: string;
    type: "primary" | "secondary" | "hidden-gem";
    coordinates: string;
    highlights: string[];
  }>;
  detailedHighlights: Array<{
    category: string;
    icon: string;
    experiences: string[];
  }>;
  price: string;
  priceBreakdown: {
    accommodation: number;
    transport: number;
    activities: number;
    meals: number;
    guide: number;
    miscellaneous: number;
  };
  difficulty: "Relaxed" | "Moderate" | "Challenging" | "Extreme";
  bestFor: string[];
  seasonality: {
    best: string[];
    good: string[];
    avoid: string[];
  };
  inclusions: string[];
  exclusions: string[];
  expertTips: string[];
  localSecrets: string[];
  sustainabilityScore: number;
  culturalImpact: string;
  itinerary: Array<{
    day: number;
    title: string;
    location: string;
    theme: string;
    weather: string;
    sunrise: string;
    sunset: string;
    activities: Array<{
      time: string;
      duration: string;
      activity: string;
      description: string;
      difficulty: string;
      cost: number;
    }>;
    meals: Array<{
      type: "breakfast" | "lunch" | "dinner" | "snack";
      venue: string;
      cuisine: string;
      speciality: string;
      cost: number;
    }>;
    accommodation: {
      name: string;
      type: string;
      rating: number;
      amenities: string[];
      sustainabilityFeatures: string[];
    };
    transportation: {
      mode: string;
      distance: string;
      duration: string;
      scenicValue: number;
    };
    emergencyContacts: {
      local: string;
      medical: string;
      police: string;
    };
    packingTips: string[];
    culturalEtiquette: string[];
  }>;
  testimonials: Array<{
    name: string;
    location: string;
    rating: number;
    review: string;
    highlight: string;
  }>;
}

const generateSuperDetailedItinerary = (
  formData: any
): EnhancedTravelPlan[] => {
  const calculateDynamicPrice = (
    basePrice: number,
    groupSize: number,
    budget: string,
    duration: number,
    complexity: number = 1
  ) => {
    let price = basePrice * groupSize;

    const budgetMultipliers = {
      budget: 0.75,
      standard: 1.0,
      premium: 1.6,
      luxury: 2.5,
    };

    price *= budgetMultipliers[budget as keyof typeof budgetMultipliers] || 1.0;
    price *= duration * 0.18 + complexity * 0.3;

    return Math.round(price);
  };

  // Return a randomized budget between ₹15,000 and ₹20,000 based on user's selected budget tier
  const getRandomBudgetForTier = (tier: string) => {
    const ranges: Record<string, [number, number]> = {
      budget: [15000, 16500],
      standard: [16000, 18000],
      premium: [17500, 19500],
      luxury: [18500, 20000],
    };
    const [min, max] = ranges[tier as keyof typeof ranges] || [15000, 20000];
    const val = Math.floor(Math.random() * (max - min + 1)) + min;
    return val;
  };

  const calculateTripDuration = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(diffDays, 3);
    }
    return 7; // Default enhanced duration
  };

  const tripDuration = calculateTripDuration();
  const basePrice = 18000;

  const superPlans: EnhancedTravelPlan[] = [
    {
      id: "ultimate-nature",
      title: "🌿 Ultimate Aaranya Wildlife Expedition",
      subtitle: "Deep Forest Immersion with Rare Wildlife Encounters",
      duration: `${tripDuration} Days / ${tripDuration - 1} Nights`,
      destinations: [
        {
          name: "Betla National Park Core Zone",
          type: "primary",
          coordinates: "23.8738° N, 84.1892° E",
          highlights: ["Tiger tracking", "Elephant corridors", "Night safari"],
        },
        {
          name: "Netarhat Queen of Chotanagpur",
          type: "primary",
          coordinates: "23.4670° N, 84.2609° E",
          highlights: ["Sunrise viewpoint", "Pine forests", "Tribal villages"],
        },
        {
          name: "Hundru Falls Adventure Zone",
          type: "secondary",
          coordinates: "23.4210° N, 85.5897° E",
          highlights: ["320ft waterfall", "Rock climbing", "Photography"],
        },
        {
          name: "Hidden Tribal Settlement",
          type: "hidden-gem",
          coordinates: "Undisclosed for protection",
          highlights: [
            "Authentic culture",
            "Traditional crafts",
            "Oral histories",
          ],
        },
      ],
      detailedHighlights: [
        {
          category: "Wildlife Encounters",
          icon: "🐅",
          experiences: [
            "Track Bengal tigers with expert naturalists using advanced camera traps",
            "Witness Asian elephant herds at secret watering holes during golden hour",
            "Night safari with thermal imaging to spot leopards and sloth bears",
            "Rare bird watching: 300+ species including endangered hornbills",
            "Butterfly expedition with endemic species documentation",
          ],
        },
        {
          category: "Adventure Thrills",
          icon: "🧗‍♂️",
          experiences: [
            "Multi-pitch rock climbing on Hundru Falls granite walls",
            "Rappelling down 320ft waterfall with professional equipment",
            "Forest canopy walk 100ft above ground on suspension bridges",
            "White water rafting on seasonal rapids (monsoon season)",
            "Mountain biking through ancient forest trails",
          ],
        },
        {
          category: "Cultural Deep Dive",
          icon: "🏘️",
          experiences: [
            "Live with Santhal families for authentic cultural exchange",
            "Learn traditional hunting techniques with bamboo tools",
            "Participate in sacred forest rituals under full moon",
            "Master tribal art forms: Pattachitra painting and bamboo crafts",
            "Experience shamanic healing ceremonies with tribal medicine men",
          ],
        },
      ],
      price: `₹${getRandomBudgetForTier(formData.budget).toLocaleString()}`,
      priceBreakdown: {
        accommodation: 35,
        transport: 15,
        activities: 25,
        meals: 12,
        guide: 8,
        miscellaneous: 5,
      },
      difficulty: "Challenging",
      bestFor: [
        "Wildlife photographers",
        "Adventure seekers",
        "Nature enthusiasts",
        "Cultural explorers",
      ],
      seasonality: {
        best: [
          "October-March (Cool & Clear)",
          "November-February (Peak Wildlife)",
        ],
        good: ["April-May (Pre-monsoon)", "September (Post-monsoon)"],
        avoid: ["June-August (Heavy rains)", "Extreme summer periods"],
      },
      inclusions: [
        "Professional wildlife guide with 15+ years experience",
        "All park entry fees and special permits",
        "High-quality camping and photography equipment",
        "Expert-led cultural immersion sessions",
        "Emergency satellite communication device",
        "Comprehensive travel insurance",
        "All meals including traditional tribal cuisine",
        "Private transportation with backup vehicle",
      ],
      exclusions: [
        "Personal photography equipment (rentals available)",
        "Alcoholic beverages",
        "Personal shopping and souvenirs",
        "Medical expenses not covered by insurance",
        "Tips for local staff and guides",
      ],
      expertTips: [
        "Carry telephoto lens minimum 400mm for wildlife photography",
        "Pack neutral colors - avoid bright clothing in forest areas",
        "Bring power banks - limited charging in forest camps",
        "Learn basic Santhal greetings for cultural interactions",
        "Download offline maps - network coverage is patchy",
      ],
      localSecrets: [
        "Visit the hidden waterfall behind Hundru - known only to locals",
        "Best tiger sighting spot: Southern boundary near Kechki bridge at dawn",
        "Secret tribal market opens every Wednesday in Netarhat village",
        "Ancient rock paintings location - shared only with respectful visitors",
        "Traditional honey harvesting spot - seasonal September activity",
      ],
      sustainabilityScore: 9.2,
      culturalImpact:
        "High positive impact - 70% of tour fees support local tribal communities and forest conservation initiatives",
      itinerary: [
        {
          day: 1,
          title: "Forest Gateway & First Encounters",
          location: "Ranchi to Betla National Park",
          theme: "Arrival and Orientation",
          weather: "Clear skies, 22-28°C",
          sunrise: "06:15 AM",
          sunset: "05:45 PM",
          activities: [
            {
              time: "08:00 AM",
              duration: "2 hours",
              activity: "Departure from Ranchi",
              description:
                "Private vehicle journey through scenic Chotanagpur plateau with expert guide providing historical context and wildlife briefing",
              difficulty: "Easy",
              cost: 0,
            },
            {
              time: "12:00 PM",
              duration: "3 hours",
              activity: "Forest Border Entry & Setup",
              description:
                "Check into eco-lodge, equipment briefing, forest department permits, and orientation session with chief naturalist",
              difficulty: "Easy",
              cost: 2500,
            },
            {
              time: "04:00 PM",
              duration: "3 hours",
              activity: "Sunset Wildlife Safari",
              description:
                "First game drive in open jeep through core area with chances of spotted deer, peacocks, and if lucky - big cats",
              difficulty: "Moderate",
              cost: 3500,
            },
            {
              time: "08:00 PM",
              duration: "2 hours",
              activity: "Night Photography Workshop",
              description:
                "Learn advanced techniques for low-light wildlife photography with professional wildlife photographer",
              difficulty: "Easy",
              cost: 1500,
            },
          ],
          meals: [
            {
              type: "breakfast",
              venue: "Hotel in Ranchi",
              cuisine: "Continental & Indian",
              speciality: "Fresh fruit platter & energy bars for journey",
              cost: 350,
            },
            {
              type: "lunch",
              venue: "Forest Rest House",
              cuisine: "Traditional Jharkhand",
              speciality: "Handia (rice beer) and wild mushroom curry",
              cost: 450,
            },
            {
              type: "dinner",
              venue: "Eco-Lodge",
              cuisine: "Organic Farm-to-Table",
              speciality: "Grilled forest honey chicken with tribal rice",
              cost: 650,
            },
          ],
          accommodation: {
            name: "Aaranya Forest Lodge",
            type: "Eco-Luxury Tented Camp",
            rating: 4.8,
            amenities: [
              "Solar powered",
              "Organic toiletries",
              "Private bathrooms",
              "Forest view deck",
            ],
            sustainabilityFeatures: [
              "Rainwater harvesting",
              "Solar energy",
              "Waste composting",
              "Local staff employment",
            ],
          },
          transportation: {
            mode: "Private 4WD Vehicle",
            distance: "165 km",
            duration: "4 hours",
            scenicValue: 8.5,
          },
          emergencyContacts: {
            local: "+91 8987654321 (Forest Guide)",
            medical: "+91 8765432109 (Nearest Hospital)",
            police: "100 (Emergency)",
          },
          packingTips: [
            "Binoculars essential for wildlife spotting",
            "Flashlight with red filter for night activities",
            "Insect repellent for evening activities",
            "Warm jacket for early morning safaris",
          ],
          culturalEtiquette: [
            "Maintain silence during wildlife encounters",
            "Seek permission before photographing locals",
            "Respect tribal customs and traditions",
            "Do not litter in forest areas",
          ],
        },
        {
          day: 2,
          title: "Deep Forest Expedition",
          location: "Betla Core Zone Exploration",
          theme: "Wildlife Tracking Adventure",
          weather: "Cool morning, warm afternoon 18-26°C",
          sunrise: "06:15 AM",
          sunset: "05:45 PM",
          activities: [
            {
              time: "05:30 AM",
              duration: "4 hours",
              activity: "Dawn Tiger Tracking Expedition",
              description:
                "Follow fresh tiger pugmarks with expert tracker, use camera traps, and experience the forest awakening with 300+ bird species",
              difficulty: "Challenging",
              cost: 4500,
            },
            {
              time: "11:00 AM",
              duration: "2 hours",
              activity: "Elephant Corridor Walk",
              description:
                "Guided walk through elephant migration paths, observe feeding signs, and learn about human-animal conflict resolution",
              difficulty: "Moderate",
              cost: 2000,
            },
            {
              time: "02:30 PM",
              duration: "3 hours",
              activity: "Canopy Research Station Visit",
              description:
                "Climb 80ft observation tower, butterfly identification workshop, and contribute to citizen science data collection",
              difficulty: "Moderate",
              cost: 2500,
            },
            {
              time: "07:00 PM",
              duration: "2.5 hours",
              activity: "Night Safari with Thermal Imaging",
              description:
                "Advanced night safari using thermal cameras to spot leopards, sloth bears, and nocturnal wildlife behavior",
              difficulty: "Challenging",
              cost: 5000,
            },
          ],
          meals: [
            {
              type: "breakfast",
              venue: "Forest Camp",
              cuisine: "Energy-rich expedition food",
              speciality: "Hot oats with forest honey and nuts",
              cost: 300,
            },
            {
              type: "lunch",
              venue: "Canopy Observation Deck",
              cuisine: "Packed gourmet meal",
              speciality: "Tribal-spiced chicken wraps with herbal tea",
              cost: 500,
            },
            {
              type: "dinner",
              venue: "Eco-Lodge",
              cuisine: "Traditional Tribal Feast",
              speciality: "Wild boar curry with bamboo shoot vegetables",
              cost: 750,
            },
          ],
          accommodation: {
            name: "Aaranya Forest Lodge",
            type: "Eco-Luxury Tented Camp",
            rating: 4.8,
            amenities: [
              "Solar powered",
              "Organic toiletries",
              "Private bathrooms",
              "Forest view deck",
            ],
            sustainabilityFeatures: [
              "Rainwater harvesting",
              "Solar energy",
              "Waste composting",
              "Local staff employment",
            ],
          },
          transportation: {
            mode: "Forest Department Jeep + Walking",
            distance: "45 km + 8 km walking",
            duration: "Multiple trips",
            scenicValue: 9.5,
          },
          emergencyContacts: {
            local: "+91 8987654321 (Forest Guide)",
            medical: "+91 8765432109 (Nearest Hospital)",
            police: "100 (Emergency)",
          },
          packingTips: [
            "Sturdy trekking boots for forest walks",
            "Headlamp for night safari",
            "Daypack for equipment",
            "Extra batteries for devices",
          ],
          culturalEtiquette: [
            "Follow forest guide instructions strictly",
            "No loud noises during wildlife tracking",
            "Respect wildlife photography guidelines",
            "Support local conservation efforts",
          ],
        },
      ],
      testimonials: [
        {
          name: "Dr. Sarah Williams",
          location: "Wildlife Photographer, UK",
          rating: 5,
          review:
            "Absolutely extraordinary! The level of detail and expertise exceeded all expectations. Captured Bengal tiger shots that are now featured in National Geographic.",
          highlight: "Professional guides made all the difference",
        },
        {
          name: "Rajesh Mehta",
          location: "Adventure Enthusiast, Mumbai",
          rating: 5,
          review:
            "This wasn't just a trip, it was a life-changing experience. The cultural immersion with tribal families gave me perspectives I never imagined.",
          highlight: "Authentic cultural experiences",
        },
      ],
    },
    {
      id: "cultural-heritage",
      title: "🎭 Sacred Aaranya Heritage Immersion",
      subtitle: "Spiritual Awakening Through Ancient Traditions",
      duration: `${Math.max(tripDuration, 8)} Days / ${
        Math.max(tripDuration, 8) - 1
      } Nights`,
      destinations: [
        {
          name: "Deoghar - Sacred Jyotirlinga Complex",
          type: "primary",
          coordinates: "24.4847° N, 86.6908° E",
          highlights: [
            "Baidyanath Temple",
            "Spiritual ceremonies",
            "Sacred geography",
          ],
        },
        {
          name: "Ancient Santhal Heartland - Dumka",
          type: "primary",
          coordinates: "24.2676° N, 87.2454° E",
          highlights: [
            "Traditional villages",
            "Living heritage",
            "Oral traditions",
          ],
        },
        {
          name: "Prehistoric Rock Art Galleries - Hazaribagh",
          type: "secondary",
          coordinates: "23.9929° N, 85.3647° E",
          highlights: [
            "10,000-year-old paintings",
            "Archaeological sites",
            "Historical mysteries",
          ],
        },
        {
          name: "Secret Shamanic Caves",
          type: "hidden-gem",
          coordinates: "Protected sacred location",
          highlights: [
            "Healing ceremonies",
            "Ancient rituals",
            "Spiritual masters",
          ],
        },
      ],
      detailedHighlights: [
        {
          category: "Spiritual Experiences",
          icon: "🕉️",
          experiences: [
            "Participate in 4 AM Rudra Abhishek at Baidyanath Jyotirlinga with 108 sacred chants",
            "Receive blessings from 300-year-old banyan tree considered highly sacred",
            "Experience Santhal Sohrai festival rituals with traditional drum ceremonies",
            "Meditation sessions in ancient caves used by sages for 1000+ years",
            "Sacred geometry workshop: Understanding temple architecture and cosmic alignments",
          ],
        },
        {
          category: "Cultural Deep Dive",
          icon: "👥",
          experiences: [
            "Live with Santhal families: Learn traditional hunting, farming, and craft techniques",
            "Master the art of Pattachitra painting with 4th generation artists",
            "Participate in traditional wedding ceremony (if timing permits)",
            "Learn oral histories passed down through 40+ generations",
            "Traditional music lessons: Santhal drums, flutes, and folk songs",
          ],
        },
        {
          category: "Historical Exploration",
          icon: "🏛️",
          experiences: [
            "Decode 10,000-year-old rock paintings with leading archaeologists",
            "Explore underground temple complexes hidden for centuries",
            "Visit manuscript libraries with Sanskrit texts dating back 800 years",
            "Archaeological dig participation with proper permissions",
            "Ancient metallurgy workshop: Traditional iron-making techniques",
          ],
        },
      ],
      price: `₹${getRandomBudgetForTier(formData.budget).toLocaleString()}`,
      priceBreakdown: {
        accommodation: 30,
        transport: 20,
        activities: 25,
        meals: 15,
        guide: 10,
        miscellaneous: 0,
      },
      difficulty: "Moderate",
      bestFor: [
        "Spiritual seekers",
        "Cultural enthusiasts",
        "History buffs",
        "Art lovers",
        "Philosophy students",
      ],
      seasonality: {
        best: [
          "October-March (Festival season)",
          "November-January (Perfect weather)",
        ],
        good: [
          "April-June (Pre-monsoon)",
          "September (Post-monsoon clear skies)",
        ],
        avoid: ["July-August (Monsoon affects outdoor activities)"],
      },
      inclusions: [
        "Sanskrit scholar guide with PhD in Indian philosophy",
        "All temple and archaeological site permissions",
        "Cultural workshop materials and certifications",
        "Traditional clothing for ceremonies",
        "Spiritual consultation with authenticated gurus",
        "Historical documents and research materials access",
        "Photography permits for restricted areas",
        "Cultural exchange program certification",
      ],
      exclusions: [
        "Personal spiritual accessories",
        "Donation to temples (optional but recommended)",
        "Personal meditation equipment",
        "Shopping for antiques and artifacts",
        "Extended private sessions with spiritual teachers",
      ],
      expertTips: [
        "Learn basic Sanskrit phrases - enhances temple experiences significantly",
        "Carry white or light-colored cotton clothing for temple visits",
        "Respect photography restrictions in sacred spaces",
        "Participate actively in cultural activities for deeper understanding",
        "Keep an open mind - some experiences may challenge preconceptions",
      ],
      localSecrets: [
        "Hidden underground passage in Baidyanath temple complex - ask priest Pandit Ramji",
        "Secret rock art site accessible only during dry season - local guide required",
        "Traditional healer who uses 200+ forest herbs - consultation by appointment",
        "Ancient library with palm leaf manuscripts - special permission needed",
        "Sacred grove where tribal shamans conduct healing ceremonies",
      ],
      sustainabilityScore: 9.5,
      culturalImpact:
        "Maximum positive impact - direct support to traditional artisans, cultural preservation, and community development",
      itinerary: [
        {
          day: 1,
          title: "Sacred Journey Begins",
          location: "Ranchi to Deoghar Spiritual Complex",
          theme: "Spiritual Initiation",
          weather: "Pleasant, 20-25°C",
          sunrise: "06:10 AM",
          sunset: "05:50 PM",
          activities: [
            {
              time: "05:00 AM",
              duration: "4 hours",
              activity: "Spiritual Preparation & Travel",
              description:
                "Traditional purification rituals, Sanskrit introduction session, and scenic journey through spiritual landscapes",
              difficulty: "Easy",
              cost: 1500,
            },
            {
              time: "11:00 AM",
              duration: "3 hours",
              activity: "Baidyanath Temple Complex Exploration",
              description:
                "Detailed temple architecture study, historical significance briefing, and participation in daily ceremonies",
              difficulty: "Easy",
              cost: 2000,
            },
            {
              time: "03:00 PM",
              duration: "2 hours",
              activity: "Sacred Geography Walking Tour",
              description:
                "Explore 12 connected temples, understand cosmic alignments, and learn about temple construction mysteries",
              difficulty: "Moderate",
              cost: 1500,
            },
            {
              time: "07:00 PM",
              duration: "2 hours",
              activity: "Evening Aarti & Meditation",
              description:
                "Participate in traditional evening prayers with hundreds of devotees, followed by guided meditation session",
              difficulty: "Easy",
              cost: 500,
            },
          ],
          meals: [
            {
              type: "breakfast",
              venue: "Sattvic Restaurant",
              cuisine: "Pure Vegetarian",
              speciality: "Traditional temple breakfast with herbal tea",
              cost: 200,
            },
            {
              type: "lunch",
              venue: "Temple Community Kitchen",
              cuisine: "Sacred Food (Prasadam)",
              speciality: "Free community meal served to all visitors",
              cost: 0,
            },
            {
              type: "dinner",
              venue: "Heritage Haveli",
              cuisine: "Royal Vegetarian",
              speciality: "Traditional Maithil cuisine with 12 courses",
              cost: 800,
            },
          ],
          accommodation: {
            name: "Sacred Heritage Hotel",
            type: "Spiritual Retreat Center",
            rating: 4.6,
            amenities: [
              "Meditation rooms",
              "Prayer halls",
              "Spiritual library",
              "Ayurvedic spa",
            ],
            sustainabilityFeatures: [
              "Solar heating",
              "Organic gardens",
              "Rainwater systems",
              "Zero plastic policy",
            ],
          },
          transportation: {
            mode: "Private Comfortable Vehicle",
            distance: "280 km",
            duration: "6 hours with stops",
            scenicValue: 7.5,
          },
          emergencyContacts: {
            local: "+91 9876543210 (Cultural Guide)",
            medical: "+91 8765432100 (Deoghar Hospital)",
            police: "100 (Emergency)",
          },
          packingTips: [
            "Conservative clothing for temple visits",
            "Cotton scarves for head covering",
            "Comfortable walking shoes (removable)",
            "Personal meditation cushion if preferred",
          ],
          culturalEtiquette: [
            "Remove shoes before entering temples",
            "Maintain silence in meditation areas",
            "Follow photography guidelines strictly",
            "Respect local customs and traditions",
          ],
        },
      ],
      testimonials: [
        {
          name: "Professor Maria Rodriguez",
          location: "Religious Studies, Spain",
          rating: 5,
          review:
            "Incredible depth of knowledge from guides. The cultural immersion was authentic and respectful. Learned more in 8 days than years of academic study.",
          highlight: "Authentic spiritual experiences",
        },
      ],
    },
    {
      id: "extreme-adventure",
      title: "🏔️ Aaranya Extreme Adventure Challenge",
      subtitle: "Ultimate Adrenaline Rush in Pristine Wilderness",
      duration: `${Math.max(tripDuration, 7)} Days / ${
        Math.max(tripDuration, 7) - 1
      } Nights`,
      destinations: [
        {
          name: "Patratu Valley Adventure Hub",
          type: "primary",
          coordinates: "23.6693° N, 84.9294° E",
          highlights: ["Water sports", "Valley expeditions", "Extreme camping"],
        },
        {
          name: "Hundru Falls Vertical Challenge",
          type: "primary",
          coordinates: "23.4210° N, 85.5897° E",
          highlights: ["Rappelling", "Rock climbing", "Cliff jumping"],
        },
        {
          name: "Secret High-Altitude Base Camp",
          type: "hidden-gem",
          coordinates: "Undisclosed for safety",
          highlights: [
            "Extreme camping",
            "Survival training",
            "Elite challenges",
          ],
        },
      ],
      detailedHighlights: [
        {
          category: "Extreme Sports",
          icon: "🪂",
          experiences: [
            "Multi-pitch rock climbing on 400ft granite walls with certified instructors",
            "320ft waterfall rappelling with advanced equipment and safety protocols",
            "Tandem paragliding from 2000ft altitude with breathtaking valley views",
            "White water rafting Grade IV rapids during monsoon season",
            "Zip-lining across valleys at 80kmph on 500-meter steel cables",
          ],
        },
        {
          category: "Survival Mastery",
          icon: "🔥",
          experiences: [
            "3-day wilderness survival course with ex-military instructors",
            "Learn fire-making, shelter building, and water purification techniques",
            "Night navigation using stars and natural landmarks",
            "Wild edible plant identification and emergency food procurement",
            "Advanced first aid and emergency response training in wilderness",
          ],
        },
        {
          category: "Elite Challenges",
          icon: "🏆",
          experiences: [
            "24-hour endurance challenge combining multiple adventure sports",
            "Solo wilderness camping with minimal equipment (supervised)",
            "Rock climbing competition with difficulty grades up to 5.10",
            "Night rappelling using only moonlight and minimal artificial lighting",
            "Cross-country navigation challenge through unmarked forest terrain",
          ],
        },
      ],
      price: `₹${getRandomBudgetForTier(formData.budget).toLocaleString()}`,
      priceBreakdown: {
        accommodation: 25,
        transport: 15,
        activities: 40,
        meals: 8,
        guide: 10,
        miscellaneous: 2,
      },
      difficulty: "Extreme",
      bestFor: [
        "Adrenaline junkies",
        "Adventure athletes",
        "Survival enthusiasts",
        "Extreme sports professionals",
      ],
      seasonality: {
        best: ["October-February (Perfect weather)", "March-May (Clear skies)"],
        good: ["September (Post-monsoon)", "June (Pre-monsoon activities)"],
        avoid: [
          "July-August (Monsoon - safety concerns)",
          "Peak summer for altitude activities",
        ],
      },
      inclusions: [
        "International-standard safety equipment for all activities",
        "Certified adventure sports instructors with rescue training",
        "Comprehensive adventure sports insurance coverage",
        "Emergency helicopter evacuation facility",
        "Professional adventure photography and videography",
        "Survival course completion certificates",
        "High-energy nutrition supplements and sports drinks",
        "Emergency satellite communication devices",
      ],
      exclusions: [
        "Personal extreme sports equipment (rentals available)",
        "Medical expenses for pre-existing conditions",
        "Additional rescue operations if required",
        "Personal adventure gear purchases",
        "Additional instructor fees for private sessions",
      ],
      expertTips: [
        "Physical fitness training 6 weeks before trip is essential",
        "Bring personal climbing shoes for better grip and comfort",
        "Waterproof action camera recommended for water activities",
        "Pack extra dry clothes - you will get wet frequently",
        "Learn basic rope knots beforehand to maximize climbing time",
      ],
      localSecrets: [
        "Hidden cliff jumping spot with 60ft deep natural pool - locals only",
        "Secret cave system behind waterfall - advanced spelunking opportunity",
        "Unmarked mountain biking trail with 15% gradient - extreme challenge",
        "Natural rock slide formation perfect for extreme sliding experiences",
        "Underground river system for advanced cave diving (experienced only)",
      ],
      sustainabilityScore: 8.0,
      culturalImpact:
        "Moderate positive impact - supports local adventure tourism and employs tribal youth as guides",
      itinerary: [
        {
          day: 1,
          title: "Adventure Base Setup",
          location: "Ranchi to Patratu Valley",
          theme: "Arrival and Equipment Briefing",
          weather: "Clear, 18-24°C",
          sunrise: "06:12 AM",
          sunset: "05:48 PM",
          activities: [
            {
              time: "07:00 AM",
              duration: "3 hours",
              activity: "Journey to Adventure Base",
              description:
                "Scenic drive to Patratu Valley with equipment loading and safety briefing during transport",
              difficulty: "Easy",
              cost: 2000,
            },
            {
              time: "12:00 PM",
              duration: "4 hours",
              activity: "Equipment Familiarization & Basic Training",
              description:
                "Complete equipment check, safety protocol training, and basic rope techniques practice",
              difficulty: "Moderate",
              cost: 3500,
            },
            {
              time: "05:00 PM",
              duration: "2 hours",
              activity: "Valley Reconnaissance & Planning",
              description:
                "Explore activity zones, weather briefing, and customize adventure plan based on group skills",
              difficulty: "Easy",
              cost: 1000,
            },
            {
              time: "08:00 PM",
              duration: "2 hours",
              activity: "Team Building & Strategy Session",
              description:
                "Group bonding activities, safety protocols review, and preparation for upcoming challenges",
              difficulty: "Easy",
              cost: 500,
            },
          ],
          meals: [
            {
              type: "breakfast",
              venue: "Adventure Base Cafe",
              cuisine: "High-Energy Breakfast",
              speciality: "Protein-rich breakfast with energy bars",
              cost: 400,
            },
            {
              type: "lunch",
              venue: "Valley Viewpoint",
              cuisine: "Packed Adventure Meal",
              speciality: "High-calorie trail mix and energizing beverages",
              cost: 350,
            },
            {
              type: "dinner",
              venue: "Base Camp",
              cuisine: "Hearty Adventure Food",
              speciality: "Grilled meats with complex carbohydrates",
              cost: 600,
            },
          ],
          accommodation: {
            name: "Extreme Adventure Base Camp",
            type: "High-Altitude Camping",
            rating: 4.3,
            amenities: [
              "Weather-resistant tents",
              "Shared facilities",
              "Equipment storage",
              "Emergency communication",
            ],
            sustainabilityFeatures: [
              "Solar power",
              "Waste management",
              "Local sourcing",
              "Environmental impact minimization",
            ],
          },
          transportation: {
            mode: "4WD Adventure Vehicle",
            distance: "120 km",
            duration: "3 hours",
            scenicValue: 8.8,
          },
          emergencyContacts: {
            local: "+91 9988776655 (Adventure Guide)",
            medical: "+91 8877665544 (Emergency Medical)",
            police: "100 (Emergency)",
          },
          packingTips: [
            "High-quality adventure gear essential",
            "Waterproof clothing and equipment",
            "Personal first aid kit",
            "High-energy snacks and hydration",
          ],
          culturalEtiquette: [
            "Respect safety guidelines absolutely",
            "Support team members in challenges",
            "Follow Leave No Trace principles",
            "Respect local environmental regulations",
          ],
        },
      ],
      testimonials: [
        {
          name: "Alex Thompson",
          location: "Extreme Sports Athlete, Australia",
          rating: 5,
          review:
            "Incredible adrenaline rush! The safety standards were top-notch and the challenges pushed my limits. Best adventure experience in Asia.",
          highlight: "World-class safety standards",
        },
      ],
    },
  ];

  // If user selected preferred cities, bias plans to include them as primary destinations
  if (
    formData.preferredCities &&
    Array.isArray(formData.preferredCities) &&
    formData.preferredCities.length > 0
  ) {
    const selectedCityIds: number[] = formData.preferredCities.map((c: any) =>
      Number(c)
    );
    superPlans.forEach((plan) => {
      // prepend selected cities that aren't already in the destinations
      const existingNames = new Set(plan.destinations.map((d) => d.name));
      const toAdd = selectedCityIds
        .map((id) => JHARKHAND_CITIES[id])
        .filter(Boolean)
        .map((city) => ({
          name: city.name,
          type: "primary" as const,
          coordinates: "TBD",
          highlights: [city.description],
        }))
        .filter((d: any) => !existingNames.has(d.name));
      if (toAdd.length > 0) {
        // Insert preferred cities but keep the most relevant primary destinations first
        plan.destinations = [...toAdd.slice(0, 2), ...plan.destinations];
      }
    });
  }

  // Advanced filtering algorithm
  const filteredPlans = superPlans.filter((plan) => {
    // Interest-based matching with weighted scoring
    const interestScore = formData.selectedInterests.reduce(
      (score: number, interest: string) => {
        switch (interest) {
          case "nature":
            return (
              score +
              (plan.id.includes("nature") ? 10 : 0) +
              (plan.id.includes("ultimate") ? 5 : 0)
            );
          case "culture":
            return (
              score +
              (plan.id.includes("heritage") || plan.id.includes("cultural")
                ? 10
                : 0)
            );
          case "adventure":
            return (
              score +
              (plan.id.includes("adventure") || plan.id.includes("extreme")
                ? 10
                : 0)
            );
          case "spiritual":
            return (
              score +
              (plan.id.includes("heritage") || plan.id.includes("cultural")
                ? 8
                : 0)
            );
          case "photography":
            return (
              score +
              (plan.id.includes("nature") || plan.id.includes("ultimate")
                ? 7
                : 0)
            );
          default:
            return score + 3;
        }
      },
      0
    );

    // Budget compatibility scoring
    const budgetScore = (() => {
      switch (formData.budget) {
        case "budget":
          return plan.difficulty === "Extreme" ? 3 : 10;
        case "standard":
          return plan.difficulty === "Extreme" ? 7 : 10;
        case "premium":
          return 10;
        case "luxury":
          return plan.difficulty === "Extreme" ||
            plan.difficulty === "Challenging"
            ? 10
            : 8;
        default:
          return 5;
      }
    })();

    // Group size compatibility
    const groupScore = (() => {
      if (formData.groupSize <= 2)
        return plan.difficulty === "Extreme" ? 6 : 10;
      if (formData.groupSize <= 4) return 10;
      if (formData.groupSize <= 8) return plan.id.includes("heritage") ? 10 : 8;
      return plan.id.includes("nature") ? 9 : 7;
    })();

    const totalScore = interestScore + budgetScore + groupScore;
    return totalScore > 15; // Threshold for inclusion
  });

  // Return top 3 best matches or fallback to all plans
  return filteredPlans.length >= 2
    ? filteredPlans.slice(0, 3)
    : superPlans.slice(0, 3);
};

export function TravelPlanner() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    groupSize: 1,
    selectedInterests: [] as string[],
    budget: "",
    accommodation: "",
    travelStyle: "guided",
    specialRequests: "",
    fitnessLevel: "moderate",
    previousExperience: "some",
    preferredCities: [] as number[],
  });

  // Preferred cities selection (store keys from JHARKHAND_CITIES)
  // type note: number[] stored in JS but TS inference will be fine for runtime
  // we'll treat ids as numbers when reading
  // Add preferredCities to the form state via setFormData updates
  // Helper to toggle preferred city selection
  const togglePreferredCity = (cityId: number) => {
    setFormData((prev: any) => ({
      ...prev,
      preferredCities:
        prev.preferredCities && Array.isArray(prev.preferredCities)
          ? prev.preferredCities.includes(cityId)
            ? prev.preferredCities.filter((c: number) => c !== cityId)
            : [...prev.preferredCities, cityId]
          : [cityId],
    }));
  };
  const [generatedPlans, setGeneratedPlans] = useState<EnhancedTravelPlan[]>(
    []
  );
  const [selectedPlan, setSelectedPlan] = useState<EnhancedTravelPlan | null>(
    null
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<
    "overview" | "detailed" | "comparison"
  >("overview");

  const toggleInterest = (interestId: string) => {
    setFormData((prev: any) => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(interestId)
        ? prev.selectedInterests.filter((id: any) => id !== interestId)
        : [...prev.selectedInterests, interestId],
    }));
  };

  const generateAdvancedPlans = async () => {
    setIsGenerating(true);

    const enhancedLoadingSteps = [
      "🧠 AI analyzing 200+ data points from your preferences...",
      "🗺️ Mapping optimal routes using satellite imagery and local intelligence...",
      "🏨 Scanning 500+ accommodations for perfect matches...",
      "💰 Calculating dynamic pricing with 15 cost factors...",
      "👥 Consulting local experts and tribal leaders...",
      "🌟 Crafting your ultimate Aaranya experience...",
      "✨ Finalizing your personalized adventure masterpiece...",
    ];

    // Realistic loading simulation with progress
    for (let i = 0; i < enhancedLoadingSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    const plans = generateSuperDetailedItinerary(formData);
    setGeneratedPlans(plans);
    setIsGenerating(false);
    setCurrentStep(3);
  };

  const steps = [
    {
      number: 1,
      title: "Travel Details",
      icon: "📅",
      description: "When & Who",
    },
    { number: 2, title: "Preferences", icon: "🎯", description: "What & How" },
    {
      number: 3,
      title: "Your Aaranya Plans",
      icon: "🗺️",
      description: "Customized Adventures",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Aaranya
              </span>
              <br />
              <span className="text-white">Smart Planner</span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-6">
              AI-Powered Forest Adventure Architect
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Advanced algorithms analyze 500+ variables to craft your perfect
              Jharkhand wilderness experience
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(24, 182, 104, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#18B668] text-white font-bold rounded-2xl hover:bg-[#065F46] transition-all duration-300 shadow-lg"
            >
              🚀 Current Advanced Planner
            </motion.button>
            <Link to="/travel-planner-map">
              <motion.button
                whileHover={{ scale: 1.05, borderColor: "#18B668" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-dark border border-white/20 text-white font-bold rounded-2xl hover:border-[#18B668] transition-all duration-300"
              >
                🗺️ Interactive Map Version
              </motion.button>
            </Link>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { icon: "🧠", title: "AI-Powered", desc: "Advanced algorithms" },
              {
                icon: "🌿",
                title: "Eco-Conscious",
                desc: "Sustainable tourism",
              },
              {
                icon: "🏆",
                title: "Expert-Curated",
                desc: "Local insider knowledge",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="glass-card rounded-xl p-4"
              >
                <div className="text-2xl mb-2">{feature.icon}</div>
                <div className="text-white font-medium">{feature.title}</div>
                <div className="text-gray-400 text-sm">{feature.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="flex items-center gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <motion.div
                  className={`flex items-center gap-4 ${
                    currentStep >= step.number
                      ? "text-emerald-400"
                      : "text-gray-500"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all duration-500 ${
                      currentStep >= step.number
                        ? "bg-gradient-to-r from-emerald-400 to-sky-400 text-black shadow-lg"
                        : "glass-dark border border-gray-500"
                    }`}
                  >
                    {currentStep > step.number ? "✓" : step.icon}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{step.title}</div>
                    <div className="text-sm opacity-70">{step.description}</div>
                  </div>
                </motion.div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-20 h-1 mx-6 transition-all duration-500 rounded-full ${
                      currentStep > step.number
                        ? "bg-gradient-to-r from-emerald-400 to-sky-400"
                        : "bg-gray-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step Content with enhanced styling */}
        <div className="glass-premium rounded-3xl p-10 mb-12 border border-white/20">
          {/* Step 1: Enhanced Travel Details */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Plan Your <span className="text-emerald-400">Aaranya</span>{" "}
                Adventure
              </h2>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <motion.div whileHover={{ scale: 1.02 }} className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-white font-medium mb-3">
                      <Calendar className="w-5 h-5 text-emerald-400" />
                      Journey Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                      className="w-full glass-dark rounded-xl px-4 py-4 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:outline-none transition-all duration-300 hover:border-white/40"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-white font-medium mb-3">
                      <Calendar className="w-5 h-5 text-emerald-400" />
                      Journey End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                      className="w-full glass-dark rounded-xl px-4 py-4 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:outline-none transition-all duration-300 hover:border-white/40"
                    />
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-white font-medium mb-3">
                      <Users className="w-5 h-5 text-emerald-400" />
                      Adventure Group Size
                    </label>
                    <select
                      value={formData.groupSize}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          groupSize: parseInt(e.target.value),
                        }))
                      }
                      className="w-full glass-dark rounded-xl px-4 py-4 text-white border border-white/20 focus:border-emerald-400 focus:outline-none transition-all duration-300 hover:border-white/40"
                    >
                      <option value={1}>Solo Explorer (1 person)</option>
                      <option value={2}>Couple Adventure (2 people)</option>
                      <option value={4}>Small Squad (3-4 people)</option>
                      <option value={8}>Large Group (5-8 people)</option>
                      <option value={12}>
                        Extended Family/Corporate (9+ people)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-white font-medium mb-3">
                      <MapPin className="w-5 h-5 text-emerald-400" />
                      Adventure Style
                    </label>
                    <select
                      value={formData.travelStyle}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          travelStyle: e.target.value,
                        }))
                      }
                      className="w-full glass-dark rounded-xl px-4 py-4 text-white border border-white/20 focus:border-emerald-400 focus:outline-none transition-all duration-300 hover:border-white/40"
                    >
                      <option value="guided">Expert-Guided Journey</option>
                      <option value="self">Independent Exploration</option>
                      <option value="custom">
                        Signature Experience Experience
                      </option>
                      <option value="luxury">Premium Adventure</option>
                    </select>
                  </div>
                </motion.div>
              </div>

              {/* Preferred Cities Selector */}
              <div className="max-w-5xl mx-auto mt-8">
                <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-emerald-400" />
                  Which Jharkhand cities do you prefer to include?
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(JHARKHAND_CITIES).map(([id, city]) => {
                    const numId = parseInt(id, 10);
                    const selected =
                      Array.isArray(formData.preferredCities) &&
                      formData.preferredCities.includes(numId);
                    return (
                      <button
                        key={id}
                        onClick={() => togglePreferredCity(numId)}
                        className={`p-3 rounded-xl text-left transition-all duration-200 flex items-center gap-3 ${
                          selected
                            ? "bg-gradient-to-r from-emerald-400 to-sky-400 text-black shadow-md"
                            : "glass-dark border border-white/20 text-white hover:border-emerald-400"
                        }`}
                      >
                        <div className="flex-1">
                          <div className="font-semibold">{city.name}</div>
                          <div className="text-xs opacity-80">
                            {city.description}
                          </div>
                        </div>
                        {selected && <div className="text-2xl">✓</div>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="text-center mt-12">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(24, 182, 104, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep(2)}
                  disabled={!formData.startDate || !formData.endDate}
                  className="px-12 py-4 bg-gradient-to-r from-emerald-400 to-sky-400 text-black font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all duration-300 text-lg"
                >
                  Next: Customize Your Adventure →
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Enhanced Preferences */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Craft Your Perfect{" "}
                <span className="text-emerald-400">Aaranya</span> Experience
              </h2>

              {/* Enhanced Interests */}
              <div className="mb-12">
                <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-emerald-400" />
                  What Sets Your Soul on Fire? (Select Multiple)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {interests.map((interest) => (
                    <motion.button
                      key={interest.id}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-6 rounded-2xl text-left transition-all duration-300 ${
                        formData.selectedInterests.includes(interest.id)
                          ? `bg-gradient-to-r ${interest.color} text-white shadow-2xl`
                          : "glass-dark border border-white/20 text-white hover:border-emerald-400 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{interest.icon}</span>
                        <div className="flex-1">
                          <div className="font-bold text-lg mb-2">
                            {interest.label}
                          </div>
                          <div className="text-sm opacity-90">
                            {interest.description}
                          </div>
                        </div>
                        {formData.selectedInterests.includes(interest.id) && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-2xl"
                          >
                            ✓
                          </motion.span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Enhanced Budget */}
              <div className="mb-12">
                <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-emerald-400" />
                  Choose Your Adventure Investment Level
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {budgetRanges.map((budget) => (
                    <motion.button
                      key={budget.id}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, budget: budget.id }))
                      }
                      className={`p-6 rounded-2xl text-left transition-all duration-300 ${
                        formData.budget === budget.id
                          ? "bg-gradient-to-r from-emerald-400 to-sky-400 text-black shadow-2xl"
                          : "glass-dark border border-white/20 text-white hover:border-emerald-400"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{budget.icon}</span>
                        <div className="flex-1">
                          <div className="font-bold text-lg mb-1">
                            {budget.label}
                          </div>
                          <div className="text-lg font-medium mb-3">
                            {budget.range}
                          </div>
                          <div className="text-sm grid grid-cols-2 gap-2">
                            {budget.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="inline-block px-3 py-1 bg-black/20 rounded-full text-xs"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        {formData.budget === budget.id && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-2xl"
                          >
                            ✓
                          </motion.span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Enhanced Accommodation */}
              <div className="mb-12">
                <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                  <Bed className="w-6 h-6 text-emerald-400" />
                  Your Preferred Forest Sanctuary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {accommodationTypes.map((acc) => (
                    <motion.button
                      key={acc.id}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          accommodation: acc.id,
                        }))
                      }
                      className={`p-6 rounded-2xl text-left transition-all duration-300 ${
                        formData.accommodation === acc.id
                          ? "bg-gradient-to-r from-emerald-400 to-sky-400 text-black shadow-2xl"
                          : "glass-dark border border-white/20 text-white hover:border-emerald-400"
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-3xl">{acc.icon}</span>
                        <div className="flex-1">
                          <div className="font-bold text-lg mb-2">
                            {acc.label}
                          </div>
                          <div className="text-sm opacity-90">
                            {acc.description}
                          </div>
                        </div>
                        {formData.accommodation === acc.id && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-2xl"
                          >
                            ✓
                          </motion.span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Special Requests Enhanced */}
              <div className="mb-12">
                <label className="flex items-center gap-2 text-white font-bold text-xl mb-4">
                  <Mountain className="w-6 h-6 text-emerald-400" />
                  Special Requirements & Dreams
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      specialRequests: e.target.value,
                    }))
                  }
                  placeholder="Tell us about dietary needs, accessibility requirements, special occasions, or any unique experiences you're dreaming of..."
                  className="w-full glass-dark rounded-2xl px-6 py-4 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:outline-none transition-all duration-300 h-32 resize-none hover:border-white/40"
                />
              </div>

              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: "#18B668" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep(1)}
                  className="px-8 py-4 glass-dark border border-white/20 text-white font-bold rounded-2xl hover:border-emerald-400 transition-all duration-300"
                >
                  ← Back to Details
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(24, 182, 104, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateAdvancedPlans}
                  disabled={
                    formData.selectedInterests.length === 0 || !formData.budget
                  }
                  className="px-12 py-4 bg-gradient-to-r from-emerald-400 to-sky-400 text-black font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all duration-300 text-lg"
                >
                  {isGenerating
                    ? "Crafting Magic..."
                    : "Generate My Aaranya Adventure 🚀"}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Enhanced Generated Plans */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {isGenerating ? (
                <div className="text-center py-20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-2xl flex items-center justify-center"
                  >
                    <span className="text-3xl">🧠</span>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-6">
                    🚀 Advanced AI Crafting Your Perfect Adventure
                  </h3>
                  <p className="text-gray-400 mb-8 text-lg">
                    Our sophisticated algorithms are analyzing hundreds of
                    variables to create your ultimate Aaranya experience...
                  </p>

                  {/* Enhanced Progress Indicators */}
                  <div className="space-y-4 max-w-lg mx-auto">
                    {[
                      "🧠 AI analyzing 200+ data points from your preferences...",
                      "🗺️ Mapping optimal routes using satellite imagery and local intelligence...",
                      "🏨 Scanning 500+ accommodations for perfect matches...",
                      "💰 Calculating dynamic pricing with 15 cost factors...",
                      "👥 Consulting local experts and tribal leaders...",
                      "🌟 Crafting your ultimate Aaranya experience...",
                      "✨ Finalizing your personalized adventure masterpiece...",
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.6, duration: 0.6 }}
                        className="flex items-center gap-4 text-sm text-gray-300"
                      >
                        <motion.div
                          className="w-3 h-3 bg-emerald-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        {step}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                      Your Personalized{" "}
                      <span className="text-emerald-400">Aaranya</span>{" "}
                      Adventures
                    </h2>
                    <p className="text-xl text-gray-300">
                      Expertly crafted experiences tailored to your preferences
                    </p>
                  </div>

                  {/* View Mode Selector */}
                  <div className="flex justify-center mb-8">
                    <div className="glass-dark rounded-2xl p-2 flex gap-2">
                      {[
                        { mode: "overview", label: "Overview", icon: "👁️" },
                        { mode: "detailed", label: "Detailed", icon: "📋" },
                        { mode: "comparison", label: "Compare", icon: "⚖️" },
                      ].map((view) => (
                        <motion.button
                          key={view.mode}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setViewMode(view.mode as any)}
                          className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                            viewMode === view.mode
                              ? "bg-gradient-to-r from-emerald-400 to-sky-400 text-black font-bold"
                              : "text-white hover:bg-white/10"
                          }`}
                        >
                          {view.icon} {view.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Plans Grid with Enhanced Cards */}
                  <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                    {generatedPlans.map((plan, index) => (
                      <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        whileHover={{
                          y: -10,
                          boxShadow: "0 25px 50px rgba(24, 182, 104, 0.2)",
                        }}
                        className={`glass-premium rounded-3xl p-8 cursor-pointer transition-all duration-500 ${
                          selectedPlan?.id === plan.id
                            ? "ring-2 ring-emerald-400 bg-gradient-to-br from-emerald-400/10 to-sky-400/10"
                            : "hover:bg-white/5"
                        }`}
                        onClick={() => setSelectedPlan(plan)}
                      >
                        {/* Plan Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            <h3 className="text-white font-bold text-2xl mb-2">
                              {plan.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">
                              {plan.subtitle}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {plan.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400" />
                                {plan.difficulty}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                              {plan.price}
                            </div>
                            <div className="text-xs text-gray-400">
                              per person
                            </div>
                          </div>
                        </div>

                        {/* Destinations */}
                        <div className="mb-6">
                          <span className="text-emerald-400 font-medium text-sm">
                            Key Destinations:
                          </span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {plan.destinations.slice(0, 3).map((dest, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-300"
                              >
                                �� {dest.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Highlights Preview */}
                        <div className="mb-6">
                          <span className="text-sky-400 font-medium text-sm">
                            Experience Highlights:
                          </span>
                          <ul className="mt-2 space-y-2">
                            {plan.detailedHighlights[0]?.experiences
                              .slice(0, 3)
                              .map((highlight, idx) => (
                                <li
                                  key={idx}
                                  className="text-xs text-gray-300 flex items-start gap-2"
                                >
                                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                  {highlight}
                                </li>
                              ))}
                          </ul>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-3 glass-dark rounded-xl">
                            <div className="text-emerald-400 font-bold">
                              {plan.sustainabilityScore}/10
                            </div>
                            <div className="text-xs text-gray-400">
                              Eco Score
                            </div>
                          </div>
                          <div className="text-center p-3 glass-dark rounded-xl">
                            <div className="text-sky-400 font-bold">
                              {plan.destinations.length}
                            </div>
                            <div className="text-xs text-gray-400">
                              Destinations
                            </div>
                          </div>
                        </div>

                        {/* Best For Tags */}
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {plan.bestFor.slice(0, 2).map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 bg-gradient-to-r from-emerald-400/20 to-sky-400/20 rounded-full text-emerald-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-4 font-bold rounded-2xl text-lg transition-all duration-300 ${
                            selectedPlan?.id === plan.id
                              ? "bg-gradient-to-r from-emerald-400 to-sky-400 text-black shadow-lg"
                              : "glass-dark border border-white/20 text-white hover:border-emerald-400"
                          }`}
                        >
                          {selectedPlan?.id === plan.id
                            ? "✓ Selected - View Details"
                            : "Select This Adventure"}
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Detailed Itinerary */}
                  {selectedPlan && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="glass-premium rounded-3xl p-8 mb-8"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-3xl font-bold text-white">
                          Complete Journey: {selectedPlan.title}
                        </h3>
                        <div className="flex gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-emerald-400">
                              {selectedPlan.sustainabilityScore}/10
                            </div>
                            <div className="text-xs text-gray-400">
                              Sustainability
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Detailed Highlights */}
                      <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {selectedPlan.detailedHighlights.map(
                          (category, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="glass-dark rounded-2xl p-6"
                            >
                              <h4 className="flex items-center gap-2 text-white font-bold mb-4">
                                <span className="text-2xl">
                                  {category.icon}
                                </span>
                                {category.category}
                              </h4>
                              <ul className="space-y-2">
                                {category.experiences.map((exp, expIdx) => (
                                  <li
                                    key={expIdx}
                                    className="text-sm text-gray-300 flex items-start gap-2"
                                  >
                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                    {exp}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )
                        )}
                      </div>

                      {/* Detailed Day-by-Day Itinerary */}
                      <div className="mb-8">
                        <h4 className="text-2xl font-bold text-white mb-6">
                          Detailed Day-by-Day Journey
                        </h4>
                        <div className="space-y-6">
                          {selectedPlan.itinerary.map((day, index) => (
                            <motion.div
                              key={day.day}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="glass-dark rounded-2xl p-6"
                            >
                              <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-2xl flex items-center justify-center text-black font-bold text-xl">
                                    Day {day.day}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h5 className="text-white font-bold text-xl mb-2">
                                    {day.title}
                                  </h5>
                                  <p className="text-gray-400 mb-4">
                                    {day.location} • {day.theme}
                                  </p>

                                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                      <h6 className="text-emerald-400 font-medium mb-3">
                                        🎯 Activities & Experiences
                                      </h6>
                                      <div className="space-y-3">
                                        {day.activities.map(
                                          (activity, actIdx) => (
                                            <div
                                              key={actIdx}
                                              className="glass rounded-xl p-4"
                                            >
                                              <div className="flex items-center justify-between mb-2">
                                                <span className="text-white font-medium">
                                                  {activity.time}
                                                </span>
                                                <span className="text-xs px-2 py-1 bg-emerald-400/20 rounded-full text-emerald-400">
                                                  {activity.duration}
                                                </span>
                                              </div>
                                              <div className="text-white font-medium text-sm">
                                                {activity.activity}
                                              </div>
                                              <p className="text-gray-400 text-xs mt-1">
                                                {activity.description}
                                              </p>
                                              <div className="flex justify-between mt-2 text-xs">
                                                <span className="text-gray-400">
                                                  Difficulty:{" "}
                                                  {activity.difficulty}
                                                </span>
                                                <span className="text-emerald-400">
                                                  ₹{activity.cost}
                                                </span>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>

                                    <div>
                                      <h6 className="text-sky-400 font-medium mb-3">
                                        🍽️ Culinary Journey
                                      </h6>
                                      <div className="space-y-3">
                                        {day.meals.map((meal, mealIdx) => (
                                          <div
                                            key={mealIdx}
                                            className="glass rounded-xl p-4"
                                          >
                                            <div className="flex items-center justify-between mb-2">
                                              <span className="text-white font-medium capitalize">
                                                {meal.type}
                                              </span>
                                              <span className="text-sky-400 text-xs">
                                                ₹{meal.cost}
                                              </span>
                                            </div>
                                            <p className="text-gray-400 text-sm">
                                              {meal.venue}
                                            </p>
                                            <p className="text-white text-xs mt-1">
                                              {meal.speciality}
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="grid md:grid-cols-3 gap-4 text-xs">
                                    <div className="glass rounded-xl p-3">
                                      <span className="text-emerald-400 font-medium">
                                        🏨 Stay:
                                      </span>
                                      <p className="text-white mt-1">
                                        {day.accommodation.name}
                                      </p>
                                      <p className="text-gray-400">
                                        {day.accommodation.type} • ⭐{" "}
                                        {day.accommodation.rating}
                                      </p>
                                    </div>
                                    <div className="glass rounded-xl p-3">
                                      <span className="text-sky-400 font-medium">
                                        🚗 Transport:
                                      </span>
                                      <p className="text-white mt-1">
                                        {day.transportation.mode}
                                      </p>
                                      <p className="text-gray-400">
                                        {day.transportation.distance} •{" "}
                                        {day.transportation.duration}
                                      </p>
                                    </div>
                                    <div className="glass rounded-xl p-3">
                                      <span className="text-yellow-400 font-medium">
                                        ☀️ Weather:
                                      </span>
                                      <p className="text-white mt-1">
                                        {day.weather}
                                      </p>
                                      <p className="text-gray-400">
                                        🌅 {day.sunrise} | 🌅 {day.sunset}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Price Breakdown */}
                      <div className="glass-dark rounded-2xl p-6 mb-8">
                        <h4 className="text-xl font-bold text-white mb-4">
                          💰 Investment Breakdown
                        </h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          {Object.entries(selectedPlan.priceBreakdown).map(
                            ([category, percentage]) => (
                              <div
                                key={category}
                                className="flex justify-between items-center p-3 glass rounded-xl"
                              >
                                <span className="text-gray-300 capitalize">
                                  {category}
                                </span>
                                <span className="text-emerald-400 font-bold">
                                  {percentage}%
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Expert Tips & Local Secrets */}
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="glass-dark rounded-2xl p-6">
                          <h4 className="text-xl font-bold text-emerald-400 mb-4">
                            💡 Expert Insider Tips
                          </h4>
                          <ul className="space-y-2">
                            {selectedPlan.expertTips.map((tip, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-300 flex items-start gap-2"
                              >
                                <span className="text-emerald-400 font-bold">
                                  •
                                </span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="glass-dark rounded-2xl p-6">
                          <h4 className="text-xl font-bold text-sky-400 mb-4">
                            🤫 Local Secrets
                          </h4>
                          <ul className="space-y-2">
                            {selectedPlan.localSecrets.map((secret, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-300 flex items-start gap-2"
                              >
                                <span className="text-sky-400 font-bold">
                                  •
                                </span>
                                {secret}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Testimonials */}
                      <div className="mb-8">
                        <h4 className="text-2xl font-bold text-white mb-6">
                          🌟 Traveler Experiences
                        </h4>
                        <div className="grid md:grid-cols-2 gap-6">
                          {selectedPlan.testimonials.map((testimonial, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.1 }}
                              className="glass-dark rounded-2xl p-6"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                {[...Array(testimonial.rating)].map(
                                  (_, starIdx) => (
                                    <Star
                                      key={starIdx}
                                      className="w-4 h-4 text-yellow-400 fill-current"
                                    />
                                  )
                                )}
                              </div>
                              <p className="text-gray-300 text-sm mb-4">
                                "{testimonial.review}"
                              </p>
                              <div className="text-emerald-400 text-xs font-medium mb-1">
                                {testimonial.highlight}
                              </div>
                              <div className="text-gray-400 text-xs">
                                — {testimonial.name}, {testimonial.location}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <motion.button
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 20px 40px rgba(24, 182, 104, 0.3)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            navigate("/booking", {
                              state: {
                                planId: selectedPlan.id,
                                planTitle: selectedPlan.title,
                                duration: selectedPlan.duration,
                                price: parseInt(
                                  selectedPlan.price.replace(/[₹,]/g, "")
                                ),
                                type: "plan",
                              },
                            })
                          }
                          className="flex-1 py-4 bg-gradient-to-r from-emerald-400 to-sky-400 text-black font-bold rounded-2xl hover:shadow-xl transition-all duration-300 text-lg"
                        >
                          🎯 Book This Epic Adventure
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02, borderColor: "#18B668" }}
                          whileTap={{ scale: 0.98 }}
                          className="px-8 py-4 glass-dark border border-white/20 text-white font-bold rounded-2xl hover:border-emerald-400 transition-all duration-300"
                        >
                          ✏️ Customize Further
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02, borderColor: "#18B668" }}
                          whileTap={{ scale: 0.98 }}
                          className="px-8 py-4 glass-dark border border-white/20 text-white font-bold rounded-2xl hover:border-emerald-400 transition-all duration-300"
                        >
                          📤 Share Plan
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Controls */}
                  <div className="flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.05, borderColor: "#18B668" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentStep(2)}
                      className="px-8 py-4 glass-dark border border-white/20 text-white font-bold rounded-2xl hover:border-emerald-400 transition-all duration-300"
                    >
                      ← Modify Preferences
                    </motion.button>

                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(24, 182, 104, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={generateAdvancedPlans}
                      className="px-8 py-4 bg-gradient-to-r from-emerald-400 to-sky-400 text-black font-bold rounded-2xl hover:shadow-xl transition-all duration-300"
                    >
                      🔄 Generate New Adventures
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </div>

        {/* AI Features Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Powered by Advanced{" "}
            <span className="text-emerald-400">Aaranya AI</span>
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: "🧠",
                title: "Smart Learning",
                desc: "AI learns from every interaction",
              },
              {
                icon: "🔄",
                title: "Real-time Updates",
                desc: "Weather, events, and conditions",
              },
              {
                icon: "🎯",
                title: "Precision Matching",
                desc: "99.2% satisfaction rate",
              },
              {
                icon: "🌱",
                title: "Sustainable Focus",
                desc: "Eco-conscious recommendations",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.05 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h4 className="text-white font-bold mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
