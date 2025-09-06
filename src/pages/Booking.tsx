import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, Users, MapPin, Star, Clock, Shield, CreditCard, 
  Check, AlertCircle, Phone, Mail, User, Camera, Utensils,
  Bed, Car, Mountain, TreePine, Waves, Heart, Info,
  ArrowLeft, ArrowRight, Plus, Minus, ChevronDown
} from 'lucide-react';

interface BookingData {
  planId?: string;
  planTitle?: string;
  destination?: string;
  duration?: string;
  price?: number;
  type?: 'plan' | 'destination' | 'custom';
}

interface TravelerInfo {
  name: string;
  email: string;
  phone: string;
  age: number;
  emergencyContact: string;
  dietaryRequirements: string;
  medicalConditions: string;
}

interface BookingDetails {
  startDate: string;
  endDate: string;
  travelers: number;
  rooms: number;
  accommodationType: string;
  specialRequests: string;
  addOns: string[];
  totalAmount: number;
}

export function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state as BookingData;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    startDate: '',
    endDate: '',
    travelers: 1,
    rooms: 1,
    accommodationType: 'standard',
    specialRequests: '',
    addOns: [],
    totalAmount: bookingData?.price || 25000
  });
  
  const [travelers, setTravelers] = useState<TravelerInfo[]>([{
    name: '',
    email: '',
    phone: '',
    age: 18,
    emergencyContact: '',
    dietaryRequirements: '',
    medicalConditions: ''
  }]);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  const accommodationTypes = [
    { id: 'budget', name: 'Budget Stay', price: 0, description: 'Comfortable homestays and guesthouses' },
    { id: 'standard', name: 'Standard Hotel', price: 2000, description: 'Well-appointed hotels with modern amenities' },
    { id: 'premium', name: 'Premium Resort', price: 5000, description: 'Luxury resorts with spa and fine dining' },
    { id: 'luxury', name: 'Ultra Luxury', price: 10000, description: 'Exclusive properties with personal service' }
  ];

  const addOns = [
    { id: 'guide', name: 'Personal Guide', price: 1500, description: 'Expert local guide for entire trip' },
    { id: 'photography', name: 'Photography Package', price: 3000, description: 'Professional photographer for memories' },
    { id: 'transport', name: 'Private Transport', price: 2500, description: 'Dedicated vehicle with driver' },
    { id: 'meals', name: 'All Meals Included', price: 2000, description: 'Breakfast, lunch, and dinner' },
    { id: 'adventure', name: 'Adventure Activities', price: 4000, description: 'Rock climbing, trekking, rafting' },
    { id: 'cultural', name: 'Cultural Experiences', price: 1800, description: 'Tribal village visits and workshops' }
  ];

  useEffect(() => {
    if (!bookingData) {
      navigate('/travel-planner');
    }
  }, [bookingData, navigate]);

  useEffect(() => {
    calculateTotal();
  }, [bookingDetails.accommodationType, bookingDetails.addOns, bookingDetails.travelers, bookingDetails.rooms]);

  const calculateTotal = () => {
    let basePrice = bookingData?.price || 25000;
    let accommodationPrice = accommodationTypes.find(acc => acc.id === bookingDetails.accommodationType)?.price || 0;
    let addOnsPrice = bookingDetails.addOns.reduce((total, addonId) => {
      const addon = addOns.find(a => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);
    
    let totalPerPerson = basePrice + accommodationPrice + addOnsPrice;
    let totalAmount = totalPerPerson * bookingDetails.travelers + (bookingDetails.rooms - 1) * 2000;
    
    setBookingDetails(prev => ({ ...prev, totalAmount }));
  };

  const addTraveler = () => {
    setTravelers([...travelers, {
      name: '',
      email: '',
      phone: '',
      age: 18,
      emergencyContact: '',
      dietaryRequirements: '',
      medicalConditions: ''
    }]);
    setBookingDetails(prev => ({ ...prev, travelers: prev.travelers + 1 }));
  };

  const removeTraveler = (index: number) => {
    if (travelers.length > 1) {
      const newTravelers = travelers.filter((_, i) => i !== index);
      setTravelers(newTravelers);
      setBookingDetails(prev => ({ ...prev, travelers: prev.travelers - 1 }));
    }
  };

  const updateTraveler = (index: number, field: keyof TravelerInfo, value: string | number) => {
    const newTravelers = [...travelers];
    newTravelers[index] = { ...newTravelers[index], [field]: value };
    setTravelers(newTravelers);
  };

  const toggleAddOn = (addonId: string) => {
    setBookingDetails(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addonId)
        ? prev.addOns.filter(id => id !== addonId)
        : [...prev.addOns, addonId]
    }));
  };

  const steps = [
    { number: 1, title: 'Trip Details', icon: Calendar, description: 'When & Where' },
    { number: 2, title: 'Travelers', icon: Users, description: 'Who\'s Going' },
    { number: 3, title: 'Add-ons', icon: Star, description: 'Enhance Your Experience' },
    { number: 4, title: 'Payment', icon: CreditCard, description: 'Secure Checkout' },
    { number: 5, title: 'Confirmation', icon: Check, description: 'Almost Done!' }
  ];

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return bookingDetails.startDate && bookingDetails.endDate;
      case 2:
        return travelers.every(t => t.name && t.email && t.phone);
      case 3:
        return true; // Add-ons are optional
      case 4:
        return agreeToTerms;
      default:
        return false;
    }
  };

  if (!bookingData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Link to="/travel-planner" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back to Travel Planner
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              Book Your
            </span>
            <span className="text-white"> Aaranya Adventure</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            You're just a few steps away from your dream journey through the forests of Jharkhand
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-premium rounded-2xl p-6 mb-8"
            >
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center flex-1">
                    <motion.div 
                      className={`flex items-center gap-3 ${
                        currentStep >= step.number ? 'text-emerald-400' : 'text-gray-500'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        currentStep >= step.number 
                          ? 'bg-gradient-to-r from-emerald-400 to-sky-400 text-black' 
                          : 'glass-dark border border-gray-500'
                      }`}>
                        {currentStep > step.number ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          <step.icon className="w-6 h-6" />
                        )}
                      </div>
                      <div className="hidden md:block">
                        <div className="font-bold text-sm">{step.title}</div>
                        <div className="text-xs opacity-70">{step.description}</div>
                      </div>
                    </motion.div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                        currentStep > step.number ? 'bg-gradient-to-r from-emerald-400 to-sky-400' : 'bg-gray-600'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Step Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-premium rounded-2xl p-8"
            >
              {/* Step 1: Trip Details */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">When would you like to travel?</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="flex items-center gap-2 text-white font-medium mb-3">
                        <Calendar className="w-5 h-5 text-emerald-400" />
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={bookingDetails.startDate}
                        onChange={(e) => setBookingDetails(prev => ({ ...prev, startDate: e.target.value }))}
                        className="w-full glass-dark rounded-xl px-4 py-4 text-white border border-white/20 focus:border-emerald-400 focus:outline-none transition-all duration-300"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-white font-medium mb-3">
                        <Calendar className="w-5 h-5 text-emerald-400" />
                        End Date
                      </label>
                      <input
                        type="date"
                        value={bookingDetails.endDate}
                        onChange={(e) => setBookingDetails(prev => ({ ...prev, endDate: e.target.value }))}
                        className="w-full glass-dark rounded-xl px-4 py-4 text-white border border-white/20 focus:border-emerald-400 focus:outline-none transition-all duration-300"
                        min={bookingDetails.startDate || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="flex items-center gap-2 text-white font-medium mb-3">
                        <Users className="w-5 h-5 text-emerald-400" />
                        Number of Travelers
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setBookingDetails(prev => ({ ...prev, travelers: Math.max(1, prev.travelers - 1) }))}
                          className="w-12 h-12 glass-dark rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Minus className="w-5 h-5 text-white" />
                        </button>
                        <span className="text-2xl font-bold text-white min-w-[3rem] text-center">
                          {bookingDetails.travelers}
                        </span>
                        <button
                          onClick={() => setBookingDetails(prev => ({ ...prev, travelers: Math.min(10, prev.travelers + 1) }))}
                          className="w-12 h-12 glass-dark rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Plus className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-white font-medium mb-3">
                        <Bed className="w-5 h-5 text-emerald-400" />
                        Number of Rooms
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setBookingDetails(prev => ({ ...prev, rooms: Math.max(1, prev.rooms - 1) }))}
                          className="w-12 h-12 glass-dark rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Minus className="w-5 h-5 text-white" />
                        </button>
                        <span className="text-2xl font-bold text-white min-w-[3rem] text-center">
                          {bookingDetails.rooms}
                        </span>
                        <button
                          onClick={() => setBookingDetails(prev => ({ ...prev, rooms: Math.min(5, prev.rooms + 1) }))}
                          className="w-12 h-12 glass-dark rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Plus className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="flex items-center gap-2 text-white font-medium mb-4">
                      <Bed className="w-5 h-5 text-emerald-400" />
                      Accommodation Type
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {accommodationTypes.map((acc) => (
                        <motion.button
                          key={acc.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setBookingDetails(prev => ({ ...prev, accommodationType: acc.id }))}
                          className={`p-4 rounded-xl text-left transition-all duration-300 ${
                            bookingDetails.accommodationType === acc.id
                              ? 'bg-gradient-to-r from-emerald-400 to-sky-400 text-black'
                              : 'glass-dark border border-white/20 text-white hover:border-emerald-400'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold">{acc.name}</h3>
                            <span className="font-bold">
                              {acc.price > 0 ? `+₹${acc.price.toLocaleString()}` : 'Included'}
                            </span>
                          </div>
                          <p className="text-sm opacity-80">{acc.description}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-white font-medium mb-3">
                      <Info className="w-5 h-5 text-emerald-400" />
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={bookingDetails.specialRequests}
                      onChange={(e) => setBookingDetails(prev => ({ ...prev, specialRequests: e.target.value }))}
                      placeholder="Any special dietary requirements, accessibility needs, celebration occasions, or specific preferences..."
                      className="w-full glass-dark rounded-xl px-4 py-4 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:outline-none transition-all duration-300 h-32 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Travelers */}
              {currentStep === 2 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-white">Traveler Information</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addTraveler}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-sky-400 text-black font-bold rounded-xl hover:shadow-lg transition-all duration-300 text-sm"
                    >
                      <Plus className="w-4 h-4 inline mr-2" />
                      Add Traveler
                    </motion.button>
                  </div>

                  <div className="space-y-6">
                    {travelers.map((traveler, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-dark rounded-2xl p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-white">
                            Traveler {index + 1} {index === 0 && '(Lead Traveler)'}
                          </h3>
                          {index > 0 && (
                            <button
                              onClick={() => removeTraveler(index)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-white font-medium mb-2">Full Name *</label>
                            <input
                              type="text"
                              value={traveler.name}
                              onChange={(e) => updateTraveler(index, 'name', e.target.value)}
                              className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:outline-none transition-all duration-300"
                              placeholder="Enter full name"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-2">Age *</label>
                            <input
                              type="number"
                              value={traveler.age}
                              onChange={(e) => updateTraveler(index, 'age', parseInt(e.target.value) || 18)}
                              className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:outline-none transition-all duration-300"
                              min="1"
                              max="100"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-2">Email Address *</label>
                            <input
                              type="email"
                              value={traveler.email}
                              onChange={(e) => updateTraveler(index, 'email', e.target.value)}
                              className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:outline-none transition-all duration-300"
                              placeholder="Enter email address"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-2">Phone Number *</label>
                            <input
                              type="tel"
                              value={traveler.phone}
                              onChange={(e) => updateTraveler(index, 'phone', e.target.value)}
                              className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:outline-none transition-all duration-300"
                              placeholder="+91 98765 43210"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-white font-medium mb-2">Emergency Contact</label>
                            <input
                              type="text"
                              value={traveler.emergencyContact}
                              onChange={(e) => updateTraveler(index, 'emergencyContact', e.target.value)}
                              className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:outline-none transition-all duration-300"
                              placeholder="Name and phone number of emergency contact"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-2">Dietary Requirements</label>
                            <input
                              type="text"
                              value={traveler.dietaryRequirements}
                              onChange={(e) => updateTraveler(index, 'dietaryRequirements', e.target.value)}
                              className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:outline-none transition-all duration-300"
                              placeholder="Vegetarian, vegan, allergies, etc."
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-2">Medical Conditions</label>
                            <input
                              type="text"
                              value={traveler.medicalConditions}
                              onChange={(e) => updateTraveler(index, 'medicalConditions', e.target.value)}
                              className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:outline-none transition-all duration-300"
                              placeholder="Any medical conditions we should know about"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Add-ons */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Enhance Your Experience</h2>
                  <p className="text-gray-300 mb-8">Add optional services to make your journey even more memorable</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {addOns.map((addon) => (
                      <motion.div
                        key={addon.id}
                        whileHover={{ scale: 1.02 }}
                        className={`glass-dark rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                          bookingDetails.addOns.includes(addon.id)
                            ? 'ring-2 ring-emerald-400 bg-gradient-to-r from-emerald-400/10 to-sky-400/10'
                            : 'hover:border-emerald-400/50'
                        }`}
                        onClick={() => toggleAddOn(addon.id)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-white font-bold text-lg mb-2">{addon.name}</h3>
                            <p className="text-gray-300 text-sm mb-3">{addon.description}</p>
                          </div>
                          <div className="ml-4 text-right">
                            <div className="text-emerald-400 font-bold text-xl">₹{addon.price.toLocaleString()}</div>
                            <div className="text-gray-400 text-xs">per person</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            bookingDetails.addOns.includes(addon.id)
                              ? 'border-emerald-400 bg-emerald-400'
                              : 'border-gray-400'
                          }`}>
                            {bookingDetails.addOns.includes(addon.id) && (
                              <Check className="w-4 h-4 text-black" />
                            )}
                          </div>
                          <span className="text-white font-medium">
                            {bookingDetails.addOns.includes(addon.id) ? 'Added' : 'Add to package'}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-8">Secure Payment</h2>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-white font-bold mb-4">Payment Method</h3>
                      <div className="space-y-3">
                        {[
                          { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
                          { id: 'upi', name: 'UPI Payment', icon: Phone },
                          { id: 'netbanking', name: 'Net Banking', icon: Shield },
                        ].map(({ id, name, icon: Icon }) => (
                          <motion.button
                            key={id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setPaymentMethod(id)}
                            className={`w-full p-4 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                              paymentMethod === id
                                ? 'bg-gradient-to-r from-emerald-400 to-sky-400 text-black'
                                : 'glass-dark text-white hover:bg-white/10'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{name}</span>
                            {paymentMethod === id && <Check className="w-5 h-5 ml-auto" />}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-bold mb-4">Security Features</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-300">
                          <Shield className="w-5 h-5 text-emerald-400" />
                          <span>SSL Encrypted Transaction</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                          <Shield className="w-5 h-5 text-emerald-400" />
                          <span>PCI DSS Compliant</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                          <Shield className="w-5 h-5 text-emerald-400" />
                          <span>Money Back Guarantee</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                          <Phone className="w-5 h-5 text-emerald-400" />
                          <span>24/7 Support Available</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-dark rounded-xl p-6 mb-8">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 text-emerald-400 bg-transparent border border-gray-300 rounded focus:ring-emerald-400 focus:ring-2"
                      />
                      <label htmlFor="terms" className="text-gray-300 text-sm">
                        I agree to the{' '}
                        <Link to="/terms" className="text-emerald-400 hover:text-emerald-300">
                          Terms and Conditions
                        </Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-emerald-400 hover:text-emerald-300">
                          Privacy Policy
                        </Link>
                        . I understand that this booking is subject to availability and confirmation from Aaranya Jharkhand.
                      </label>
                    </div>
                  </div>

                  <div className="glass-dark rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                      <h4 className="text-white font-bold">Important Information</h4>
                    </div>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Booking confirmation will be sent via email within 24 hours</li>
                      <li>• Full payment is required to confirm your reservation</li>
                      <li>• Cancellation policy applies as per terms and conditions</li>
                      <li>• Travel insurance is recommended but not included</li>
                      <li>• Valid ID proof required for all travelers</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 5: Confirmation */}
              {currentStep === 5 && (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-12 h-12 text-black" />
                  </motion.div>
                  
                  <h2 className="text-4xl font-bold text-white mb-6">Booking Confirmed!</h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Thank you for choosing Aaranya Jharkhand. Your forest adventure awaits!
                  </p>
                  
                  <div className="glass-dark rounded-2xl p-8 mb-8 text-left">
                    <h3 className="text-white font-bold text-xl mb-4">Booking Reference: #ARN{Date.now()}</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Trip:</span>
                        <span className="text-white ml-2">{bookingData.planTitle}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Travelers:</span>
                        <span className="text-white ml-2">{bookingDetails.travelers}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Start Date:</span>
                        <span className="text-white ml-2">{bookingDetails.startDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">End Date:</span>
                        <span className="text-white ml-2">{bookingDetails.endDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/guest-dashboard')}
                      className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-sky-400 text-black font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      View My Bookings
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/')}
                      className="px-8 py-3 glass-dark text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
                    >
                      Back to Home
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 5 && (
                <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="px-6 py-3 glass-dark text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all duration-300"
                  >
                    <ArrowLeft className="w-5 h-5 inline mr-2" />
                    Previous
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                    disabled={!isStepValid(currentStep)}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-sky-400 text-black font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
                  >
                    {currentStep === 4 ? 'Complete Booking' : 'Continue'}
                    <ArrowRight className="w-5 h-5 inline ml-2" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-premium rounded-2xl p-6 sticky top-24"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Booking Summary</h3>

              {/* Trip Details */}
              <div className="mb-6">
                <h4 className="text-emerald-400 font-bold mb-3">{bookingData.planTitle}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{bookingData.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Travelers:</span>
                    <span className="text-white">{bookingDetails.travelers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rooms:</span>
                    <span className="text-white">{bookingDetails.rooms}</span>
                  </div>
                  {bookingDetails.startDate && bookingDetails.endDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Dates:</span>
                      <span className="text-white text-xs">
                        {new Date(bookingDetails.startDate).toLocaleDateString()} - {new Date(bookingDetails.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-white/10 pt-4 mb-6">
                <button
                  onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                  className="flex items-center justify-between w-full text-white font-medium mb-3"
                >
                  <span>Price Breakdown</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${showPriceBreakdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showPriceBreakdown && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2 text-sm"
                  >
                    <div className="flex justify-between">
                      <span className="text-gray-400">Base Price ({bookingDetails.travelers}x):</span>
                      <span className="text-white">₹{((bookingData.price || 25000) * bookingDetails.travelers).toLocaleString()}</span>
                    </div>
                    
                    {bookingDetails.accommodationType !== 'budget' && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Accommodation Upgrade:</span>
                        <span className="text-white">
                          ₹{((accommodationTypes.find(acc => acc.id === bookingDetails.accommodationType)?.price || 0) * bookingDetails.travelers).toLocaleString()}
                        </span>
                      </div>
                    )}
                    
                    {bookingDetails.rooms > 1 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Extra Rooms ({bookingDetails.rooms - 1}):</span>
                        <span className="text-white">₹{((bookingDetails.rooms - 1) * 2000).toLocaleString()}</span>
                      </div>
                    )}
                    
                    {bookingDetails.addOns.map((addonId) => {
                      const addon = addOns.find(a => a.id === addonId);
                      return addon ? (
                        <div key={addonId} className="flex justify-between">
                          <span className="text-gray-400">{addon.name}:</span>
                          <span className="text-white">₹{(addon.price * bookingDetails.travelers).toLocaleString()}</span>
                        </div>
                      ) : null;
                    })}
                  </motion.div>
                )}
              </div>

              {/* Total */}
              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-white">Total Amount:</span>
                  <span className="text-2xl font-bold text-emerald-400">
                    ₹{bookingDetails.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mb-4">
                  *Final price may vary based on availability and seasonal rates
                </div>

                {/* Payment Security */}
                <div className="glass-dark rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span className="text-white font-medium text-sm">100% Secure Payment</span>
                  </div>
                  <p className="text-gray-400 text-xs">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>
              </div>

              {/* Contact Support */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-white font-bold mb-3">Need Help?</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>support@aaranya.com</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  24/7 customer support available
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}