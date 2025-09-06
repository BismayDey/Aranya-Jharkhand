import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Hotel, 
  Users, 
  Calendar, 
  TrendingUp, 
  Star, 
  Plus, 
  Eye, 
  Edit, 
  MapPin,
  Phone,
  Mail,
  Bed,
  Car,
  Wifi,
  Coffee,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  UserCheck,
  Settings
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import useScrollToTop from '../hooks/useScrollToTop';

interface Room {
  id: string;
  type: string;
  price: number;
  capacity: number;
  amenities: string[];
  status: 'available' | 'occupied' | 'maintenance';
  bookings: number;
  image: string;
}

interface Booking {
  id: string;
  guestName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
}

export const HotelDashboard = () => {
  useScrollToTop();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'bookings' | 'guests' | 'analytics' | 'property'>('overview');

  // Mock data for hotel dashboard
  const stats = {
    totalRooms: 25,
    occupiedRooms: 18,
    totalRevenue: 450000,
    averageRating: 4.6,
    totalGuests: 156,
    occupancyRate: 72,
    monthlyGrowth: 18.5
  };

  const mockRooms: Room[] = [
    {
      id: '1',
      type: 'Deluxe Suite',
      price: 4500,
      capacity: 4,
      amenities: ['AC', 'WiFi', 'TV', 'Balcony'],
      status: 'occupied',
      bookings: 28,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400'
    },
    {
      id: '2',
      type: 'Standard Room',
      price: 2500,
      capacity: 2,
      amenities: ['AC', 'WiFi', 'TV'],
      status: 'available',
      bookings: 45,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'
    },
    {
      id: '3',
      type: 'Family Room',
      price: 3800,
      capacity: 6,
      amenities: ['AC', 'WiFi', 'TV', 'Kitchen'],
      status: 'maintenance',
      bookings: 22,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400'
    }
  ];

  const mockBookings: Booking[] = [
    {
      id: 'BK001',
      guestName: 'Amit Sharma',
      roomType: 'Deluxe Suite',
      checkIn: '2024-01-20',
      checkOut: '2024-01-23',
      guests: 2,
      total: 13500,
      status: 'confirmed'
    },
    {
      id: 'BK002',
      guestName: 'Priya Patel',
      roomType: 'Standard Room',
      checkIn: '2024-01-18',
      checkOut: '2024-01-22',
      guests: 2,
      total: 10000,
      status: 'checked-in'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'occupied': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'maintenance': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'confirmed': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'checked-in': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'checked-out': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-4 h-4" />;
      case 'occupied': return <UserCheck className="w-4 h-4" />;
      case 'maintenance': return <Settings className="w-4 h-4" />;
      case 'confirmed': return <Clock className="w-4 h-4" />;
      case 'checked-in': return <CheckCircle className="w-4 h-4" />;
      case 'checked-out': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'rooms', label: 'Rooms', icon: Bed },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'guests', label: 'Guests', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'property', label: 'Property Info', icon: Hotel }
  ];

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
              <div className="w-12 h-12 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center">
                <Bed className="w-6 h-6 text-[#0EA5E9]" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Total Rooms</p>
                <p className="text-2xl font-bold text-white">{stats.totalRooms}</p>
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
              <div className="w-12 h-12 bg-[#18B668]/20 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-[#18B668]" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Occupied Rooms</p>
                <p className="text-2xl font-bold text-white">{stats.occupiedRooms}</p>
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
              <div className="w-12 h-12 bg-[#F59E0B]/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">₹{stats.totalRevenue.toLocaleString()}</p>
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
                <Star className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Average Rating</p>
                <p className="text-2xl font-bold text-white">{stats.averageRating}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Occupancy Overview */}
      <Card className="glass-card p-6 border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6">Occupancy Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#18B668"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${stats.occupancyRate * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">{stats.occupancyRate}%</span>
              </div>
            </div>
            <p className="text-white/60">Current Occupancy</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Available Rooms</span>
              <span className="text-[#18B668] font-semibold">{stats.totalRooms - stats.occupiedRooms}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Occupied Rooms</span>
              <span className="text-[#0EA5E9] font-semibold">{stats.occupiedRooms}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Total Guests</span>
              <span className="text-white font-semibold">{stats.totalGuests}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button className="w-full bg-[#18B668] hover:bg-[#18B668]/90">
              <Plus className="w-4 h-4 mr-2" />
              Add New Booking
            </Button>
            <Button variant="outline" className="w-full border-white/20 hover:bg-white/10">
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
            <Button variant="outline" className="w-full border-white/20 hover:bg-white/10">
              <Eye className="w-4 h-4 mr-2" />
              Check Availability
            </Button>
          </div>
        </div>
      </Card>

      {/* Recent Bookings */}
      <Card className="glass-card p-6 border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Recent Bookings</h3>
          <Button variant="outline" size="sm" onClick={() => setActiveTab('bookings')}>
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {mockBookings.slice(0, 3).map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-4 glass rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#0EA5E9]/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#0EA5E9]" />
                </div>
                <div>
                  <p className="font-medium text-white">{booking.guestName}</p>
                  <p className="text-sm text-white/60">{booking.roomType} • {booking.guests} guests</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">₹{booking.total.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusIcon(booking.status)}
                  <Badge className={`text-xs ${getStatusColor(booking.status)}`}>
                    {booking.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderRooms = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Room Management</h2>
          <p className="text-white/60">Manage your property rooms and pricing</p>
        </div>
        <Button className="bg-[#18B668] hover:bg-[#18B668]/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Room
        </Button>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRooms.map((room) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-card border-white/10 overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${room.image})` }}>
                <div className="w-full h-full bg-black/40 p-4 flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(room.status)}
                    <Badge className={`${getStatusColor(room.status)}`}>
                      {room.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0 border-white/20 hover:bg-white/20">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0 border-white/20 hover:bg-white/20">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white">{room.type}</h3>
                  <span className="text-lg font-bold text-[#18B668]">₹{room.price}/night</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {room.capacity} guests
                  </span>
                  <span>{room.bookings} bookings</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => (
                    <Badge key={amenity} variant="outline" className="text-xs border-white/20 text-white/70">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Bookings Management</h2>
        <p className="text-white/60">Track and manage guest reservations</p>
      </div>

      <Card className="glass-card border-white/10">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-white/80">Booking ID</th>
                  <th className="text-left py-3 text-white/80">Guest</th>
                  <th className="text-left py-3 text-white/80">Room Type</th>
                  <th className="text-left py-3 text-white/80">Check-in</th>
                  <th className="text-left py-3 text-white/80">Check-out</th>
                  <th className="text-left py-3 text-white/80">Guests</th>
                  <th className="text-left py-3 text-white/80">Total</th>
                  <th className="text-left py-3 text-white/80">Status</th>
                  <th className="text-left py-3 text-white/80">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-white/5">
                    <td className="py-4 text-white font-medium">{booking.id}</td>
                    <td className="py-4 text-white">{booking.guestName}</td>
                    <td className="py-4 text-white/70">{booking.roomType}</td>
                    <td className="py-4 text-white/70">{booking.checkIn}</td>
                    <td className="py-4 text-white/70">{booking.checkOut}</td>
                    <td className="py-4 text-white/70">{booking.guests}</td>
                    <td className="py-4 text-white font-semibold">₹{booking.total.toLocaleString()}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(booking.status)}
                        <Badge className={`${getStatusColor(booking.status)}`}>
                          {booking.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/10">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="bg-[#18B668] hover:bg-[#18B668]/90">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderProperty = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Property Information</h2>
        <p className="text-white/60">Manage your property details and amenities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property Info */}
        <div className="lg:col-span-2">
          <Card className="glass-card p-6 border-white/10">
            <h3 className="text-lg font-semibold text-white mb-6">Property Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/80 text-sm">Property Name</Label>
                  <Input 
                    defaultValue={user?.propertyName || "Jharkhand Heritage Hotel"} 
                    className="mt-2 glass-dark border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/80 text-sm">Property Type</Label>
                  <Input 
                    defaultValue={user?.propertyType || "Hotel"} 
                    className="mt-2 glass-dark border-white/20 text-white"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-white/80 text-sm">Description</Label>
                <textarea 
                  rows={4}
                  defaultValue="A beautiful heritage property showcasing the rich culture and hospitality of Jharkhand"
                  className="mt-2 w-full p-3 glass-dark border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/80 text-sm">Total Rooms</Label>
                  <Input 
                    defaultValue={user?.roomCount || stats.totalRooms} 
                    type="number"
                    className="mt-2 glass-dark border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/80 text-sm">Check-in Time</Label>
                  <Input 
                    defaultValue="2:00 PM" 
                    className="mt-2 glass-dark border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/80 text-sm">Phone Number</Label>
                  <Input 
                    defaultValue={user?.phone || "+91 98765 43210"} 
                    className="mt-2 glass-dark border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/80 text-sm">Email</Label>
                  <Input 
                    defaultValue={user?.email} 
                    className="mt-2 glass-dark border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white/80 text-sm">Address</Label>
                <Input 
                  defaultValue={user?.location || "Main Road, Ranchi, Jharkhand"} 
                  className="mt-2 glass-dark border-white/20 text-white"
                />
              </div>

              <Button className="bg-[#18B668] hover:bg-[#18B668]/90">
                Update Property Info
              </Button>
            </div>
          </Card>
        </div>

        {/* Property Stats */}
        <div className="space-y-6">
          <Card className="glass-card p-6 border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Property Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Property Rating</span>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-white font-semibold">{stats.averageRating}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white/70">Verification Status</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#18B668]" />
                  <span className="text-[#18B668] font-medium">Verified</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white/70">Occupancy Rate</span>
                <span className="text-[#18B668] font-semibold">{stats.occupancyRate}%</span>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Amenities</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5 text-[#18B668]" />
                <span className="text-white">Free WiFi</span>
              </div>
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-[#18B668]" />
                <span className="text-white">Parking</span>
              </div>
              <div className="flex items-center gap-3">
                <Coffee className="w-5 h-5 text-[#18B668]" />
                <span className="text-white">Restaurant</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#18B668]" />
                <span className="text-white">24/7 Front Desk</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Analytics & Performance</h2>
        <p className="text-white/60">Track your property performance and revenue</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card p-6 border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 glass rounded-xl">
              <span className="text-white/70">This Month</span>
              <span className="text-[#18B668] font-semibold text-lg">₹85,000</span>
            </div>
            <div className="flex items-center justify-between p-4 glass rounded-xl">
              <span className="text-white/70">Last Month</span>
              <span className="text-white font-semibold">₹72,000</span>
            </div>
            <div className="flex items-center justify-between p-4 glass rounded-xl">
              <span className="text-white/70">Growth</span>
              <span className="text-[#18B668] font-semibold">+{stats.monthlyGrowth}%</span>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Room Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Deluxe Suite</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-white/20 rounded-full">
                  <div className="w-4/5 h-full bg-[#18B668] rounded-full"></div>
                </div>
                <span className="text-white text-sm">80%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Standard Room</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-white/20 rounded-full">
                  <div className="w-3/5 h-full bg-[#F59E0B] rounded-full"></div>
                </div>
                <span className="text-white text-sm">60%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Family Room</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-white/20 rounded-full">
                  <div className="w-3/4 h-full bg-[#0EA5E9] rounded-full"></div>
                </div>
                <span className="text-white text-sm">75%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderGuests = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Guest Management</h2>
        <p className="text-white/60">View and manage guest information</p>
      </div>

      <Card className="glass-card p-6 border-white/10">
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Guest Management</h3>
          <p className="text-white/60 mb-6">Track guest preferences, history, and feedback</p>
          <Button className="bg-[#18B668] hover:bg-[#18B668]/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Guest Record
          </Button>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000410] to-black"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0EA5E9]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#18B668]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-[#0EA5E9]/20 rounded-2xl flex items-center justify-center">
              <Hotel className="w-8 h-8 text-[#0EA5E9]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Hotel Dashboard</h1>
              <p className="text-white/60">Welcome back, {user?.name}!</p>
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
          {activeTab === 'rooms' && renderRooms()}
          {activeTab === 'bookings' && renderBookings()}
          {activeTab === 'guests' && renderGuests()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'property' && renderProperty()}
        </motion.div>
      </div>
    </div>
  );
};