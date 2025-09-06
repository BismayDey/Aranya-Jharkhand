import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TourismMap } from '../components/TourismMap';
import { MapPin, Calendar, Users, Star } from 'lucide-react';

const interests = [
  { id: 'nature', label: 'Nature & Wildlife', icon: '🌿', color: 'from-green-400 to-emerald-500' },
  { id: 'culture', label: 'Culture & Heritage', icon: '🎭', color: 'from-purple-400 to-pink-500' },
  { id: 'adventure', label: 'Adventure Sports', icon: '🏔️', color: 'from-orange-400 to-red-500' },
  { id: 'spiritual', label: 'Spiritual Journey', icon: '🕉️', color: 'from-yellow-400 to-orange-500' },
  { id: 'photography', label: 'Photography', icon: '📸', color: 'from-blue-400 to-indigo-500' },
  { id: 'food', label: 'Local Cuisine', icon: '🍽️', color: 'from-pink-400 to-rose-500' }
];

const budgetRanges = [
  { id: 'budget', label: 'Budget (₹10,000 - ₹25,000)', icon: '💰' },
  { id: 'standard', label: 'Standard (₹25,000 - ₹50,000)', icon: '💳' },
  { id: 'premium', label: 'Premium (₹50,000 - ₹1,00,000)', icon: '💎' },
  { id: 'luxury', label: 'Luxury (₹1,00,000+)', icon: '👑' }
];

const accommodationTypes = [
  { id: 'homestay', label: 'Homestay', icon: '🏠' },
  { id: 'hotel', label: 'Hotel', icon: '🏨' },
  { id: 'resort', label: 'Resort', icon: '🏖️' },
  { id: 'camping', label: 'Camping', icon: '⛺' }
];

interface TravelPlan {
  id: string;
  title: string;
  duration: string;
  destinations: string[];
  highlights: string[];
  price: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  bestFor: string[];
  itinerary: Array<{
    day: number;
    location: string;
    activities: string[];
    accommodation: string;
  }>;
}

const generateItinerary = (formData: any): TravelPlan[] => {
  const basePlans: TravelPlan[] = [
    {
      id: '1',
      title: "Nature Explorer",
      duration: "5 Days / 4 Nights",
      destinations: ["Netarhat", "Hundru Falls", "Betla National Park"],
      highlights: ["Sunrise viewpoint", "Waterfall trekking", "Wildlife safari", "Night camping"],
      price: "₹18,500",
      difficulty: "Moderate",
      bestFor: ["Nature lovers", "Adventure seekers", "Photography enthusiasts"],
      itinerary: [
        {
          day: 1,
          location: "Ranchi to Netarhat",
          activities: ["Travel to Netarhat", "Check-in accommodation", "Evening nature walk", "Sunset viewing"],
          accommodation: "Forest Guest House"
        },
        {
          day: 2,
          location: "Netarhat",
          activities: ["Early morning sunrise", "Pine forest exploration", "Local tribal village visit", "Bonfire evening"],
          accommodation: "Forest Guest House"
        },
        {
          day: 3,
          location: "Netarhat to Hundru Falls",
          activities: ["Travel to Hundru", "Waterfall trekking", "Rock climbing", "Photography session"],
          accommodation: "Eco Lodge"
        },
        {
          day: 4,
          location: "Hundru to Betla National Park",
          activities: ["Wildlife safari", "Bird watching", "Nature interpretation", "Night camping"],
          accommodation: "Forest Camp"
        },
        {
          day: 5,
          location: "Betla to Ranchi",
          activities: ["Morning safari", "Travel back to Ranchi", "Departure"],
          accommodation: "Day trip"
        }
      ]
    },
    {
      id: '2',
      title: "Cultural Heritage",
      duration: "7 Days / 6 Nights",
      destinations: ["Deoghar", "Dumka", "Hazaribagh"],
      highlights: ["Temple visits", "Tribal village stays", "Handicraft workshops", "Cultural performances"],
      price: "₹25,200",
      difficulty: "Easy",
      bestFor: ["Culture enthusiasts", "Spiritual seekers", "Art lovers"],
      itinerary: [
        {
          day: 1,
          location: "Ranchi to Deoghar",
          activities: ["Travel to Deoghar", "Baidyanath Temple visit", "Evening aarti", "Local market exploration"],
          accommodation: "Heritage Hotel"
        },
        {
          day: 2,
          location: "Deoghar",
          activities: ["Temple complex tour", "Spiritual discourse", "Local cuisine tasting", "Cultural show"],
          accommodation: "Heritage Hotel"
        },
        {
          day: 3,
          location: "Deoghar to Dumka",
          activities: ["Travel to Dumka", "Santhal village visit", "Traditional music session", "Handicraft workshop"],
          accommodation: "Tribal Homestay"
        },
        {
          day: 4,
          location: "Dumka",
          activities: ["Tribal dance learning", "Organic farming experience", "Traditional cooking", "Storytelling evening"],
          accommodation: "Tribal Homestay"
        },
        {
          day: 5,
          location: "Dumka to Hazaribagh",
          activities: ["Travel to Hazaribagh", "Rock paintings visit", "Local art gallery", "Craft shopping"],
          accommodation: "Boutique Hotel"
        },
        {
          day: 6,
          location: "Hazaribagh",
          activities: ["National park visit", "Wildlife photography", "Local artisan meetup", "Cultural dinner"],
          accommodation: "Boutique Hotel"
        },
        {
          day: 7,
          location: "Hazaribagh to Ranchi",
          activities: ["Final shopping", "Travel back to Ranchi", "Departure"],
          accommodation: "Day trip"
        }
      ]
    },
    {
      id: '3',
      title: "Adventure Seeker",
      duration: "6 Days / 5 Nights",
      destinations: ["Patratu Valley", "Hundru Falls", "Rock Garden", "Dassam Falls"],
      highlights: ["Water sports", "Rock climbing", "Paragliding", "River rafting"],
      price: "₹22,800",
      difficulty: "Challenging",
      bestFor: ["Adventure enthusiasts", "Thrill seekers", "Sports lovers"],
      itinerary: [
        {
          day: 1,
          location: "Ranchi to Patratu Valley",
          activities: ["Travel to Patratu", "Valley exploration", "Boating setup", "Sunset photography"],
          accommodation: "Adventure Camp"
        },
        {
          day: 2,
          location: "Patratu Valley",
          activities: ["Water sports", "Kayaking", "Valley trekking", "Campfire evening"],
          accommodation: "Adventure Camp"
        },
        {
          day: 3,
          location: "Patratu to Hundru Falls",
          activities: ["Travel to Hundru", "Rock climbing", "Rappelling", "Photography workshop"],
          accommodation: "Adventure Lodge"
        },
        {
          day: 4,
          location: "Hundru Falls",
          activities: ["Advanced trekking", "Waterfall exploration", "Survival skills training", "Night camping"],
          accommodation: "Camping"
        },
        {
          day: 5,
          location: "Rock Garden",
          activities: ["Rock climbing", "Zip lining", "Adventure photography", "Team activities"],
          accommodation: "Resort"
        },
        {
          day: 6,
          location: "Return to Ranchi",
          activities: ["Final adventure activity", "Certificate ceremony", "Travel back", "Departure"],
          accommodation: "Day trip"
        }
      ]
    }
  ];

  // Filter based on interests and other criteria
  return basePlans.filter(plan => {
    if (formData.selectedInterests.includes('nature') && plan.title.includes('Nature')) return true;
    if (formData.selectedInterests.includes('culture') && plan.title.includes('Cultural')) return true;
    if (formData.selectedInterests.includes('adventure') && plan.title.includes('Adventure')) return true;
    return formData.selectedInterests.length === 0;
  });
};

export function TravelPlannerWithMap() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    groupSize: 1,
    selectedInterests: [] as string[],
    budget: '',
    accommodation: '',
    travelStyle: 'guided',
    specialRequests: ''
  });
  const [generatedPlans, setGeneratedPlans] = useState<TravelPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<TravelPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleInterest = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(interestId)
        ? prev.selectedInterests.filter(id => id !== interestId)
        : [...prev.selectedInterests, interestId]
    }));
  };

  const generatePlans = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const plans = generateItinerary(formData);
    setGeneratedPlans(plans);
    setIsGenerating(false);
    setCurrentStep(3);
  };

  const steps = [
    { number: 1, title: "Travel Details", icon: "📅" },
    { number: 2, title: "Preferences", icon: "🎯" },
    { number: 3, title: "Your Plans", icon: "🗺️" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              Smart Travel
            </span>
            <span className="text-white"> Planner</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            AI-powered personalized itinerary generation with free interactive map
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center gap-3 ${
                  currentStep >= step.number ? 'text-emerald-400' : 'text-gray-500'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                    currentStep >= step.number 
                      ? 'bg-gradient-to-r from-emerald-400 to-sky-400 text-black' 
                      : 'glass-dark border border-gray-500'
                  }`}>
                    {currentStep > step.number ? '✓' : step.icon}
                  </div>
                  <div>
                    <div className="font-medium">{step.title}</div>
                    <div className="text-sm opacity-70">Step {step.number}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 transition-colors duration-300 ${
                    currentStep > step.number ? 'bg-emerald-400' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-premium rounded-3xl p-8 mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="text-[#18B668]">Aaranya</span> Interactive Map
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Explore Jharkhand's pristine destinations with our advanced interactive map. 
              Discover hidden gems, plan your route, and get detailed information about each location.
            </p>
          </div>
          
          <div className="mb-6">
            <TourismMap 
              height="600px"
              onDestinationSelect={(destination) => {
                console.log('Selected destination:', destination);
                // Auto-populate form data based on selection
                setFormData(prev => ({
                  ...prev,
                  selectedInterests: destination.type ? [destination.type] : prev.selectedInterests
                }));
              }} 
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="glass-dark rounded-xl p-4">
              <MapPin className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <h3 className="text-white font-bold mb-1">50+ Destinations</h3>
              <p className="text-gray-400 text-sm">Curated locations across Jharkhand</p>
            </div>
            <div className="glass-dark rounded-xl p-4">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="text-white font-bold mb-1">Expert Reviewed</h3>
              <p className="text-gray-400 text-sm">All destinations verified by local experts</p>
            </div>
            <div className="glass-dark rounded-xl p-4">
              <Users className="w-8 h-8 text-sky-400 mx-auto mb-2" />
              <h3 className="text-white font-bold mb-1">Community Driven</h3>
              <p className="text-gray-400 text-sm">Reviews and tips from fellow travelers</p>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              This interactive map is powered by OpenStreetMap and is completely free to use. 
              <span className="text-[#18B668]"> No registration required - explore at your own pace!</span>
            </p>
          </div>
        </motion.div>

        {/* Step Content */}
        <div className="glass rounded-3xl p-8 mb-12">
          {/* Step 1: Travel Details */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-8 text-center">When are you planning to travel?</h2>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div>
                  <label className="block text-white font-medium mb-3">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full glass-dark rounded-xl px-4 py-3 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-3">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full glass-dark rounded-xl px-4 py-3 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-3">Group Size</label>
                  <select
                    value={formData.groupSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, groupSize: parseInt(e.target.value) }))}
                    className="w-full glass-dark rounded-xl px-4 py-3 text-white border border-white/20 focus:border-emerald-400 focus:outline-none transition-colors"
                  >
                    <option value={1}>Solo (1 person)</option>
                    <option value={2}>Couple (2 people)</option>
                    <option value={4}>Small Group (3-4 people)</option>
                    <option value={8}>Large Group (5-8 people)</option>
                    <option value={12}>Family/Extended Group (9+ people)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-3">Travel Style</label>
                  <select
                    value={formData.travelStyle}
                    onChange={(e) => setFormData(prev => ({ ...prev, travelStyle: e.target.value }))}
                    className="w-full glass-dark rounded-xl px-4 py-3 text-white border border-white/20 focus:border-emerald-400 focus:outline-none transition-colors"
                  >
                    <option value="guided">Guided Tour</option>
                    <option value="self">Self-Guided</option>
                    <option value="custom">Custom Experience</option>
                  </select>
                </div>
              </div>

              <div className="text-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep(2)}
                  disabled={!formData.startDate || !formData.endDate}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-sky-400 text-black font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
                >
                  Next: Choose Preferences →
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Preferences */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-8 text-center">What interests you most?</h2>

              {/* Interests */}
              <div className="mb-8">
                <h3 className="text-white font-medium mb-4">Select your interests (choose multiple)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {interests.map((interest) => (
                    <motion.button
                      key={interest.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-4 rounded-xl text-left transition-all duration-300 ${
                        formData.selectedInterests.includes(interest.id)
                          ? `bg-gradient-to-r ${interest.color} text-white`
                          : 'glass-dark border border-white/20 text-white hover:border-emerald-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{interest.icon}</span>
                        <span className="font-medium">{interest.label}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="mb-8">
                <h3 className="text-white font-medium mb-4">Budget Range</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {budgetRanges.map((budget) => (
                    <motion.button
                      key={budget.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData(prev => ({ ...prev, budget: budget.id }))}
                      className={`p-4 rounded-xl text-left transition-all duration-300 ${
                        formData.budget === budget.id
                          ? 'bg-gradient-to-r from-emerald-400 to-sky-400 text-black'
                          : 'glass-dark border border-white/20 text-white hover:border-emerald-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{budget.icon}</span>
                        <span className="font-medium">{budget.label}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Accommodation */}
              <div className="mb-8">
                <h3 className="text-white font-medium mb-4">Preferred Accommodation</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {accommodationTypes.map((acc) => (
                    <motion.button
                      key={acc.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData(prev => ({ ...prev, accommodation: acc.id }))}
                      className={`p-4 rounded-xl text-center transition-all duration-300 ${
                        formData.accommodation === acc.id
                          ? 'bg-gradient-to-r from-emerald-400 to-sky-400 text-black'
                          : 'glass-dark border border-white/20 text-white hover:border-emerald-400'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-2xl">{acc.icon}</span>
                        <span className="font-medium text-sm">{acc.label}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div className="mb-8">
                <h3 className="text-white font-medium mb-4">Special Requests (Optional)</h3>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                  placeholder="Any specific requirements, dietary restrictions, accessibility needs, or special interests..."
                  className="w-full glass-dark rounded-xl px-4 py-3 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:outline-none transition-colors h-32 resize-none"
                />
              </div>

              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep(1)}
                  className="px-8 py-3 glass-dark border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  ← Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generatePlans}
                  disabled={formData.selectedInterests.length === 0 || !formData.budget}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-sky-400 text-black font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
                >
                  Generate Travel Plans →
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Generated Plans */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Your Personalized Travel Plans</h2>

              {isGenerating ? (
                <div className="text-center py-16">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-400 mb-4"></div>
                  <p className="text-white text-lg">Generating your perfect itinerary...</p>
                  <p className="text-gray-400 text-sm mt-2">Analyzing your preferences and matching destinations</p>
                </div>
              ) : generatedPlans.length > 0 ? (
                <div className="grid gap-8">
                  {generatedPlans.map((plan) => (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{plan.title}</h3>
                          <p className="text-emerald-400 font-medium">{plan.duration}</p>
                          <p className="text-gray-300 text-sm">Difficulty: {plan.difficulty}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-emerald-400 mb-1">{plan.price}</div>
                          <div className="text-gray-400 text-sm">per person</div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-white font-semibold mb-3">Destinations</h4>
                        <div className="flex flex-wrap gap-2">
                          {plan.destinations.map((dest, index) => (
                            <span key={index} className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">
                              {dest}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-white font-semibold mb-3">Highlights</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {plan.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center gap-2 text-gray-300">
                              <span className="text-emerald-400">•</span>
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-white font-semibold mb-3">Perfect For</h4>
                        <div className="flex flex-wrap gap-2">
                          {plan.bestFor.map((category, index) => (
                            <span key={index} className="px-3 py-1 glass text-white rounded-full text-sm">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedPlan(selectedPlan?.id === plan.id ? null : plan)}
                          className="flex-1 py-3 px-4 glass border border-white/20 text-white rounded-xl font-medium hover:bg-white/10 transition-colors"
                        >
                          {selectedPlan?.id === plan.id ? 'Hide Details' : 'View Detailed Itinerary'}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => navigate('/booking', {
                            state: {
                              planId: plan.id,
                              planTitle: plan.title,
                              duration: plan.duration,
                              price: parseInt(plan.price.replace(/[₹,]/g, '')),
                              type: 'plan'
                            }
                          })}
                          className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-400 to-sky-400 text-black rounded-xl font-bold hover:shadow-lg transition-all duration-300"
                        >
                          Book This Plan
                        </motion.button>
                      </div>

                      {/* Detailed Itinerary */}
                      {selectedPlan?.id === plan.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 pt-6 border-t border-white/10"
                        >
                          <h4 className="text-white font-semibold mb-4">Detailed Itinerary</h4>
                          <div className="space-y-4">
                            {plan.itinerary.map((day) => (
                              <div key={day.day} className="glass rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                                    {day.day}
                                  </div>
                                  <h5 className="text-white font-medium">{day.location}</h5>
                                </div>
                                <div className="ml-11">
                                  <div className="mb-2">
                                    <span className="text-gray-400 text-sm">Activities:</span>
                                    <ul className="text-gray-300 text-sm mt-1">
                                      {day.activities.map((activity, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                          <span className="text-emerald-400">•</span>
                                          {activity}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="text-sm">
                                    <span className="text-gray-400">Accommodation:</span>
                                    <span className="text-emerald-300 ml-2">{day.accommodation}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-white text-lg mb-4">No plans match your criteria</p>
                  <p className="text-gray-400 mb-6">Try adjusting your preferences to see more options</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-sky-400 text-black font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Modify Preferences
                  </motion.button>
                </div>
              )}

              {generatedPlans.length > 0 && !isGenerating && (
                <div className="text-center mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-3 glass-dark border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    ← Modify Preferences
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}