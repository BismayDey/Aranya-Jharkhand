import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Star, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  DollarSign,
  Calendar,
  Filter,
  Search,
  MapPin,
  Phone,
  Mail,
  Store,
  Award,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import useScrollToTop from '../hooks/useScrollToTop';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  sales: number;
  image: string;
  status: 'active' | 'inactive' | 'out-of-stock';
  description: string;
}

interface Order {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
}

export const VendorDashboard = () => {
  useScrollToTop();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'analytics' | 'profile'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for vendor dashboard
  const stats = {
    totalProducts: 45,
    totalSales: 125000,
    pendingOrders: 12,
    totalCustomers: 890,
    monthlyGrowth: 15.3,
    rating: 4.7
  };

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Traditional Dokra Art Elephant',
      price: 2500,
      category: 'Handicrafts',
      stock: 15,
      sales: 45,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      status: 'active',
      description: 'Handcrafted brass elephant using traditional Dokra technique'
    },
    {
      id: '2',
      name: 'Jharkhand Tribal Jewelry Set',
      price: 1800,
      category: 'Jewelry',
      stock: 8,
      sales: 23,
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400',
      status: 'active',
      description: 'Authentic tribal jewelry with traditional patterns'
    },
    {
      id: '3',
      name: 'Sohrai Painted Wall Hanging',
      price: 3200,
      category: 'Art',
      stock: 0,
      sales: 18,
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
      status: 'out-of-stock',
      description: 'Traditional Sohrai art on wood panel'
    }
  ];

  const mockOrders: Order[] = [
    {
      id: 'ORD001',
      customerName: 'Priya Sharma',
      items: ['Dokra Art Elephant', 'Tribal Jewelry'],
      total: 4300,
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 'ORD002',
      customerName: 'Rajesh Kumar',
      items: ['Sohrai Wall Hanging'],
      total: 3200,
      status: 'shipped',
      date: '2024-01-14'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'inactive': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'out-of-stock': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'confirmed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'shipped': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'profile', label: 'Store Profile', icon: Store }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card p-6 border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#18B668]/20 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-[#18B668]" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Total Products</p>
                <p className="text-2xl font-bold text-white">{stats.totalProducts}</p>
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
                <DollarSign className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Total Sales</p>
                <p className="text-2xl font-bold text-white">₹{stats.totalSales.toLocaleString()}</p>
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
                <ShoppingCart className="w-6 h-6 text-[#0EA5E9]" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Pending Orders</p>
                <p className="text-2xl font-bold text-white">{stats.pendingOrders}</p>
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
                <Users className="w-6 h-6 text-[#8B4513]" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Total Customers</p>
                <p className="text-2xl font-bold text-white">{stats.totalCustomers}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card p-6 border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="h-auto p-6 bg-[#18B668] hover:bg-[#18B668]/90 flex-col gap-3">
            <Plus className="w-8 h-8" />
            <div className="text-center">
              <div className="font-semibold">Add New Product</div>
              <div className="text-sm opacity-80">List a new item in your store</div>
            </div>
          </Button>
          
          <Button variant="outline" className="h-auto p-6 border-white/20 hover:bg-white/10 flex-col gap-3">
            <Eye className="w-8 h-8 text-[#F59E0B]" />
            <div className="text-center">
              <div className="font-semibold">View Analytics</div>
              <div className="text-sm opacity-60">Check your sales performance</div>
            </div>
          </Button>
          
          <Button variant="outline" className="h-auto p-6 border-white/20 hover:bg-white/10 flex-col gap-3">
            <ShoppingCart className="w-8 h-8 text-[#0EA5E9]" />
            <div className="text-center">
              <div className="font-semibold">Manage Orders</div>
              <div className="text-sm opacity-60">Process pending orders</div>
            </div>
          </Button>
        </div>
      </Card>

      {/* Recent Orders */}
      <Card className="glass-card p-6 border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Recent Orders</h3>
          <Button variant="outline" size="sm" onClick={() => setActiveTab('orders')}>
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {mockOrders.slice(0, 3).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 glass rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#18B668]/20 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-[#18B668]" />
                </div>
                <div>
                  <p className="font-medium text-white">{order.customerName}</p>
                  <p className="text-sm text-white/60">{order.items.join(', ')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">₹{order.total.toLocaleString()}</p>
                <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">My Products</h2>
          <p className="text-white/60">Manage your store inventory</p>
        </div>
        <Button className="bg-[#18B668] hover:bg-[#18B668]/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="glass-card p-6 border-white/10">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-dark border-white/20 text-white"
            />
          </div>
          <Button variant="outline" className="border-white/20 hover:bg-white/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-card border-white/10 overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }}>
                <div className="w-full h-full bg-black/40 p-4 flex justify-between items-start">
                  <Badge className={`${getStatusColor(product.status)}`}>
                    {product.status.replace('-', ' ')}
                  </Badge>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0 border-white/20 hover:bg-white/20">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0 border-white/20 hover:bg-white/20">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0 border-red-500/20 hover:bg-red-500/20 text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white line-clamp-2">{product.name}</h3>
                  <span className="text-lg font-bold text-[#18B668]">₹{product.price.toLocaleString()}</span>
                </div>
                <p className="text-white/60 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60">Stock: <span className="text-white">{product.stock}</span></span>
                  <span className="text-white/60">Sales: <span className="text-white">{product.sales}</span></span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Orders Management</h2>
        <p className="text-white/60">Track and manage customer orders</p>
      </div>

      <Card className="glass-card border-white/10">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-white/80">Order ID</th>
                  <th className="text-left py-3 text-white/80">Customer</th>
                  <th className="text-left py-3 text-white/80">Items</th>
                  <th className="text-left py-3 text-white/80">Total</th>
                  <th className="text-left py-3 text-white/80">Status</th>
                  <th className="text-left py-3 text-white/80">Date</th>
                  <th className="text-left py-3 text-white/80">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5">
                    <td className="py-4 text-white font-medium">{order.id}</td>
                    <td className="py-4 text-white">{order.customerName}</td>
                    <td className="py-4 text-white/70">{order.items.join(', ')}</td>
                    <td className="py-4 text-white font-semibold">₹{order.total.toLocaleString()}</td>
                    <td className="py-4">
                      <Badge className={`${getStatusColor(order.status)}`}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-white/70">{order.date}</td>
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

  const renderProfile = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Store Profile</h2>
        <p className="text-white/60">Manage your store information and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Store Info */}
        <div className="lg:col-span-2">
          <Card className="glass-card p-6 border-white/10">
            <h3 className="text-lg font-semibold text-white mb-6">Store Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/80 text-sm">Store Name</Label>
                  <Input 
                    defaultValue={user?.storeName || "Tribal Crafts Store"} 
                    className="mt-2 glass-dark border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/80 text-sm">Category</Label>
                  <Input 
                    defaultValue="Handicrafts & Art" 
                    className="mt-2 glass-dark border-white/20 text-white"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-white/80 text-sm">Store Description</Label>
                <textarea 
                  rows={4}
                  defaultValue={user?.storeDescription || "Traditional handicrafts and tribal art from Jharkhand"}
                  className="mt-2 w-full p-3 glass-dark border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:border-[#18B668] focus:ring-[#18B668]/20 resize-none"
                />
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
                <Label className="text-white/80 text-sm">Location</Label>
                <Input 
                  defaultValue={user?.location || "Ranchi, Jharkhand"} 
                  className="mt-2 glass-dark border-white/20 text-white"
                />
              </div>

              <Button className="bg-[#18B668] hover:bg-[#18B668]/90">
                Update Store Profile
              </Button>
            </div>
          </Card>
        </div>

        {/* Store Stats */}
        <div className="space-y-6">
          <Card className="glass-card p-6 border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Store Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Store Rating</span>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-white font-semibold">{stats.rating}</span>
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
                <span className="text-white/70">Monthly Growth</span>
                <span className="text-[#18B668] font-semibold">+{stats.monthlyGrowth}%</span>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">Total Revenue</span>
                <span className="text-white font-semibold">₹{stats.totalSales.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Products Listed</span>
                <span className="text-white font-semibold">{stats.totalProducts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Happy Customers</span>
                <span className="text-white font-semibold">{stats.totalCustomers}</span>
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
        <h2 className="text-2xl font-bold text-white">Analytics & Insights</h2>
        <p className="text-white/60">Track your store performance and sales data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card p-6 border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Sales Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 glass rounded-xl">
              <span className="text-white/70">This Month</span>
              <span className="text-[#18B668] font-semibold text-lg">₹35,000</span>
            </div>
            <div className="flex items-center justify-between p-4 glass rounded-xl">
              <span className="text-white/70">Last Month</span>
              <span className="text-white font-semibold">₹28,500</span>
            </div>
            <div className="flex items-center justify-between p-4 glass rounded-xl">
              <span className="text-white/70">Growth</span>
              <span className="text-[#18B668] font-semibold">+22.8%</span>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Top Categories</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Handicrafts</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-white/20 rounded-full">
                  <div className="w-3/4 h-full bg-[#18B668] rounded-full"></div>
                </div>
                <span className="text-white text-sm">75%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Jewelry</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-white/20 rounded-full">
                  <div className="w-1/2 h-full bg-[#F59E0B] rounded-full"></div>
                </div>
                <span className="text-white text-sm">50%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Art</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-white/20 rounded-full">
                  <div className="w-1/3 h-full bg-[#0EA5E9] rounded-full"></div>
                </div>
                <span className="text-white text-sm">33%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
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
            <div className="w-16 h-16 bg-[#F59E0B]/20 rounded-2xl flex items-center justify-center">
              <Store className="w-8 h-8 text-[#F59E0B]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Vendor Dashboard</h1>
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
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'profile' && renderProfile()}
        </motion.div>
      </div>
    </div>
  );
};