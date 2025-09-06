import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  Heart, 
  Star, 
  User, 
  CreditCard, 
  Bell,
  Compass,
  Camera,
  Route,
  Gift,
  TrendingUp,
  Clock,
  CheckCircle,
  Plus,
  Eye,
  Edit,
  Share,
  MessageCircle,
  ThumbsUp,
  Mountain,
  Waves,
  TreePine
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import useScrollToTop from '../hooks/useScrollToTop';

const mockBookings = [
  {
    id: '1',
    destination: 'Netarhat Hill Station',
    date: '2024-03-15',
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    price: '₹12,500',
    type: 'accommodation',
    duration: '3 days'
  },
  {
    id: '2',
    destination: 'Hundru Falls Trek',
    date: '2024-03-22',
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    price: '₹8,750',
    type: 'adventure',
    duration: '1 day'
  },
  {
    id: '3',
    destination: 'Betla National Park Safari',
    date: '2024-02-28',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&h=300&fit=crop',
    price: '₹6,200',
    type: 'wildlife',
    duration: '2 days'
  }
];

const mockPurchases = [
  {
    id: '1',
    item: 'Tribal Handwoven Shawl',
    date: '2024-02-20',
    price: '₹2,850',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
    vendor: 'Jharkhand Crafts',
    rating: 5
  },
  {
    id: '2',
    item: 'Jharkhand Honey (500g)',
    date: '2024-02-15',
    price: '₹650',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop',
    vendor: 'Pure Honey Store',
    rating: 4
  },
  {
    id: '3',
    item: 'Dokra Art Elephant',
    date: '2024-02-10',
    price: '₹1,850',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    vendor: 'Traditional Arts',
    rating: 5
  }
];

const mockWishlist = [
  {
    id: '1',
    name: 'Deoghar Temple Stay',
    price: '₹3,500/night',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Sohrai Art Workshop',
    price: '₹2,200/person',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    rating: 4.9
  }
];

export function GuestDashboard() {
  useScrollToTop();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'purchases' | 'wishlist' | 'profile' | 'reviews'>('overview');

  if (!user || user.userType !== 'guest') {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">This page is only accessible to guests.</p>
          <Link to="/" className="text-[#18B668] hover:underline mt-4 inline-block">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'bookings', label: 'My Trips', icon: Calendar },
    { id: 'purchases', label: 'Purchases', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card p-6 border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#18B668]/20 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#18B668]" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Total Trips</p>
                <p className="text-2xl font-bold text-white">{user.totalBookings || 0}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card p-6 border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F59E0B]/20 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-white">₹{user.totalSpent?.toLocaleString() || '0'}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card p-6 border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#0EA5E9]" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Wishlist Items</p>
                <p className="text-2xl font-bold text-white">{mockWishlist.length}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card p-6 border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#8B4513]/20 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-[#8B4513]" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Purchases</p>
                <p className="text-2xl font-bold text-white">{mockPurchases.length}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card p-6 border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/travel-planner">
            <Button className="h-auto p-6 bg-[#18B668] hover:bg-[#18B668]/90 flex-col gap-3 w-full">
              <Route className="w-8 h-8" />
              <div className="text-center">
                <div className="font-semibold">Plan New Trip</div>
                <div className="text-sm opacity-80">AI-powered trip planning</div>
              </div>
            </Button>
          </Link>
          
          <Link to="/destinations">
            <Button variant="outline" className="h-auto p-6 border-white/20 hover:bg-white/10 flex-col gap-3 w-full">
              <Compass className="w-8 h-8 text-[#F59E0B]" />
              <div className="text-center">
                <div className="font-semibold">Explore Destinations</div>
                <div className="text-sm opacity-60">Discover new places</div>
              </div>
            </Button>
          </Link>
          
          <Link to="/marketplace">
            <Button variant="outline" className="h-auto p-6 border-white/20 hover:bg-white/10 flex-col gap-3 w-full">
              <Gift className="w-8 h-8 text-[#0EA5E9]" />
              <div className="text-center">
                <div className="font-semibold">Shop Local Crafts</div>
                <div className="text-sm opacity-60">Support local artisans</div>
              </div>
            </Button>
          </Link>
        </div>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card className="glass-card p-6 border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Recent Trips</h3>
            <Button variant="outline" size="sm" onClick={() => setActiveTab('bookings')}>
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {mockBookings.slice(0, 2).map((booking) => (
              <div key={booking.id} className="flex items-center gap-4 p-4 glass rounded-xl">
                <div className="w-16 h-16 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${booking.image})` }}></div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">{booking.destination}</h4>
                  <p className="text-sm text-white/60">{booking.date} • {booking.duration}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={`text-xs ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </Badge>
                    <span className="text-sm font-semibold text-[#18B668]">{booking.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Purchases */}
        <Card className="glass-card p-6 border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Recent Purchases</h3>
            <Button variant="outline" size="sm" onClick={() => setActiveTab('purchases')}>
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {mockPurchases.slice(0, 2).map((purchase) => (
              <div key={purchase.id} className="flex items-center gap-4 p-4 glass rounded-xl">
                <div className="w-16 h-16 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${purchase.image})` }}></div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">{purchase.item}</h4>
                  <p className="text-sm text-white/60">by {purchase.vendor}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < purchase.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-[#18B668]">{purchase.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Favorite Destinations */}
      <Card className="glass-card p-6 border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6">Your Favorite Destinations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {user.favoriteDestinations?.map((destination, index) => (
            <div key={index} className="flex items-center gap-3 p-4 glass rounded-xl">
              <div className="w-10 h-10 bg-[#18B668]/20 rounded-lg flex items-center justify-center">
                {index === 0 && <Mountain className="w-5 h-5 text-[#18B668]" />}
                {index === 1 && <Waves className="w-5 h-5 text-[#0EA5E9]" />}
                {index === 2 && <TreePine className="w-5 h-5 text-[#065F46]" />}
              </div>
              <span className="text-white font-medium">{destination}</span>
            </div>
          )) || (
            <div className="col-span-3 text-center py-8 text-white/60">
              <Heart className="w-12 h-12 mx-auto mb-4 text-white/30" />
              <p>No favorite destinations yet. Start exploring!</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">My Trips</h2>
          <p className="text-white/60">Track your bookings and travel history</p>
        </div>
        <Link to="/travel-planner">
          <Button className="bg-[#18B668] hover:bg-[#18B668]/90">
            <Plus className="w-4 h-4 mr-2" />
            Plan New Trip
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBookings.map((booking) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-card border-white/10 overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${booking.image})` }}>
                <div className="w-full h-full bg-black/40 p-4 flex justify-between items-start">
                  <Badge className={`${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0 border-white/20 hover:bg-white/20">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0 border-white/20 hover:bg-white/20">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-white mb-2">{booking.destination}</h3>
                <div className="space-y-2 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{booking.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-white/20 text-white/70">
                      {booking.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-[#18B668]">{booking.price}</span>
                  <Button size="sm" className="bg-[#18B668] hover:bg-[#18B668]/90">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderPurchases = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">My Purchases</h2>
          <p className="text-white/60">Your marketplace purchase history</p>
        </div>
        <Link to="/marketplace">
          <Button className="bg-[#18B668] hover:bg-[#18B668]/90">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Shop More
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPurchases.map((purchase) => (
          <motion.div
            key={purchase.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-card border-white/10 overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: `url(${purchase.image})` }}>
                <div className="w-full h-full bg-black/20 p-4 flex justify-end items-start">
                  <Button size="sm" variant="outline" className="w-8 h-8 p-0 border-white/20 hover:bg-white/20">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-white mb-2">{purchase.item}</h3>
                <p className="text-sm text-white/60 mb-3">by {purchase.vendor}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < purchase.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-lg font-bold text-[#18B668]">{purchase.price}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 border-white/20 hover:bg-white/10">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Review
                  </Button>
                  <Button size="sm" className="flex-1 bg-[#18B668] hover:bg-[#18B668]/90">
                    Buy Again
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">My Wishlist</h2>
        <p className="text-white/60">Save your favorite destinations and experiences</p>
      </div>

      {mockWishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockWishlist.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-card border-white/10 overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }}>
                  <div className="w-full h-full bg-black/40 p-4 flex justify-between items-start">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm">{item.rating}</span>
                    </div>
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0 border-red-500/20 hover:bg-red-500/20 text-red-400">
                      <Heart className="w-4 h-4 fill-current" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-white mb-2">{item.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-[#18B668]">{item.price}</span>
                    <Button size="sm" className="bg-[#18B668] hover:bg-[#18B668]/90">
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="glass-card p-12 border-white/10 text-center">
          <Heart className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Your wishlist is empty</h3>
          <p className="text-white/60 mb-6">Start exploring and save your favorite destinations!</p>
          <Link to="/destinations">
            <Button className="bg-[#18B668] hover:bg-[#18B668]/90">
              <Compass className="w-4 h-4 mr-2" />
              Explore Destinations
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000410] to-black"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#18B668]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#F59E0B]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-[#18B668]/20 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-[#18B668]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
              <p className="text-white/60">Welcome back, {user.name}!</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-[#18B668] text-white shadow-lg'
                      : 'glass hover:bg-white/10 text-white/70 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'bookings' && renderBookings()}
          {activeTab === 'purchases' && renderPurchases()}
          {activeTab === 'wishlist' && renderWishlist()}
          {activeTab === 'reviews' && (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Reviews & Ratings</h3>
              <p className="text-white/60">Share your experiences and help other travelers</p>
            </div>
          )}
          {activeTab === 'profile' && (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Profile Settings</h3>
              <p className="text-white/60">Manage your account information and preferences</p>
              <Link to="/profile" className="inline-block mt-4">
                <Button className="bg-[#18B668] hover:bg-[#18B668]/90">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}