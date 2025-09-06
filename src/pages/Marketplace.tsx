import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useCart } from '../context/CartContext';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import useScrollToTop from '../hooks/useScrollToTop';

const categories = [
  { id: 'all', name: 'All Products', icon: '🛍️' },
  { id: 'pottery', name: 'Pottery & Ceramics', icon: '🏺' },
  { id: 'textiles', name: 'Textiles & Fabrics', icon: '🧵' },
  { id: 'woodcraft', name: 'Wood Crafts', icon: '🪵' },
  { id: 'metalwork', name: 'Metal Works', icon: '⚒️' },
  { id: 'jewelry', name: 'Jewelry', icon: '💎' },
  { id: 'paintings', name: 'Art & Paintings', icon: '🎨' }
];

const artisans = [
  {
    id: 1,
    name: "Sunita Devi",
    specialty: "Master Weaver",
    location: "Dumka, Jharkhand",
    rating: 4.9,
    orders: 234,
    avatar: "👩‍🦳",
    verified: true,
    products: 12
  },
  {
    id: 2,
    name: "Birsa Munda",
    specialty: "Wood Sculptor",
    location: "Ranchi, Jharkhand",
    rating: 4.8,
    orders: 156,
    avatar: "👨‍🦲",
    verified: true,
    products: 8
  },
  {
    id: 3,
    name: "Prema Kumari",
    specialty: "Bell Metal Artist",
    location: "Dhanbad, Jharkhand",
    rating: 5.0,
    orders: 89,
    avatar: "👩‍🎨",
    verified: true,
    products: 15
  }
];

const products = [
  {
    id: 1,
    name: "Traditional Dokra Horse",
    artisan: "Ramesh Kumar",
    category: "metalwork",
    price: 2500,
    originalPrice: 3500,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
    rating: 4.8,
    reviews: 127,
    inStock: true,
    featured: true,
    description: "A beautiful handcrafted Dokra horse made using the ancient lost-wax casting technique."
  },
  {
    id: 2,
    name: "Tribal Bamboo Wall Art",
    artisan: "Sukanti Devi",
    category: "woodcraft",
    price: 1800,
    originalPrice: 2200,
    image: "https://images.unsplash.com/photo-1544966503-7e22750c67b4?w=500",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    featured: true,
    description: "Intricate bamboo weaving showcasing traditional tribal patterns and motifs."
  },
  {
    id: 3,
    name: "Handwoven Tribal Textile",
    artisan: "Sunita Devi",
    category: "textiles",
    price: 2850,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1562469162-c17fc5155156?w=500",
    rating: 4.9,
    reviews: 23,
    inStock: true,
    featured: true,
    description: "Authentic Santhal tribal pattern textile hand-woven using traditional techniques."
  },
  {
    id: 4,
    name: "Traditional Clay Pottery Set",
    artisan: "Rama Devi",
    category: "pottery",
    price: 1650,
    originalPrice: 2000,
    image: "https://images.unsplash.com/photo-1715463846875-0dd99c72899a?w=500",
    rating: 4.7,
    reviews: 45,
    inStock: true,
    featured: false,
    description: "Beautiful clay pottery set with intricate tribal motifs, perfect for traditional dining."
  },
  {
    id: 5,
    name: "Carved Wooden Sculpture",
    artisan: "Birsa Munda",
    category: "woodcraft",
    price: 4500,
    originalPrice: 5200,
    image: "https://images.unsplash.com/photo-1562468147-521b210456d2?w=500",
    rating: 5.0,
    reviews: 12,
    inStock: true,
    featured: true,
    description: "Intricate wooden sculpture depicting tribal folklore, carved from sustainable local wood."
  },
  {
    id: 6,
    name: "Bell Metal Decorative Bowl",
    artisan: "Prema Kumari",
    category: "metalwork",
    price: 3200,
    originalPrice: 3800,
    image: "https://images.unsplash.com/photo-1671476963151-b99a873e2bf3?w=500",
    rating: 4.8,
    reviews: 34,
    inStock: true,
    featured: false,
    description: "Handcrafted bell metal bowl with traditional patterns, perfect for ceremonies."
  },
  {
    id: 7,
    name: "Tribal Pattern Shawl",
    artisan: "Sunita Devi",
    category: "textiles",
    price: 1850,
    originalPrice: 2200,
    image: "https://images.unsplash.com/photo-1506629905607-265d3ec047d6?w=500",
    rating: 4.6,
    reviews: 67,
    inStock: false,
    featured: false,
    description: "Warm and comfortable shawl with authentic tribal patterns, ideal for winter wear."
  },
  {
    id: 8,
    name: "Handmade Jewelry Set",
    artisan: "Maya Devi",
    category: "jewelry",
    price: 2400,
    originalPrice: 2800,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
    rating: 4.9,
    reviews: 28,
    inStock: true,
    featured: true,
    description: "Elegant jewelry set made with traditional techniques and natural materials."
  },
  {
    id: 9,
    name: "Terracotta Garden Planters",
    artisan: "Santosh Das",
    category: "pottery",
    price: 850,
    originalPrice: 1200,
    image: "https://images.unsplash.com/photo-1578320339732-ec27b5a90d2e?w=500",
    rating: 4.5,
    reviews: 53,
    inStock: true,
    featured: false,
    description: "Beautiful terracotta planters with traditional tribal motifs, perfect for gardens."
  },
  {
    id: 10,
    name: "Tribal Art Canvas Painting",
    artisan: "Anita Kumari",
    category: "paintings",
    price: 3500,
    originalPrice: 4000,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500",
    rating: 4.7,
    reviews: 19,
    inStock: true,
    featured: true,
    description: "Vibrant tribal art painting depicting the rich cultural heritage of Jharkhand."
  },
  {
    id: 11,
    name: "Bamboo Basket Collection",
    artisan: "Rajesh Oraon",
    category: "woodcraft",
    price: 1200,
    originalPrice: 1500,
    image: "https://images.unsplash.com/photo-1578951447037-0e20ede2bd20?w=500",
    rating: 4.4,
    reviews: 76,
    inStock: true,
    featured: false,
    description: "Set of handwoven bamboo baskets in various sizes, perfect for storage and decor."
  },
  {
    id: 12,
    name: "Silver Tribal Necklace",
    artisan: "Kumari Devi",
    category: "jewelry",
    price: 5500,
    originalPrice: 6500,
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500",
    rating: 4.9,
    reviews: 41,
    inStock: true,
    featured: true,
    description: "Exquisite silver necklace with traditional tribal designs, handcrafted by master jewelers."
  }
];

export function Marketplace() {
  useScrollToTop();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      artisan: product.artisan,
      quantity: 1
    });
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'featured': return b.featured ? 1 : -1;
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Artisan </span>
            <span className="text-[#18B668]">
              Marketplace
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover authentic handicrafts directly from master artisans of Jharkhand
          </p>

          {/* Visit Marketplace Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#18B668] hover:bg-[#18B668]/90 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-[#18B668]/25 transition-all duration-300"
          >
            <span className="text-xl">🔍</span>
            View All Destinations
            <span className="text-xl">→</span>
          </motion.button>
        </motion.div>

        {/* Featured Artisans */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Meet Our <span className="text-[#18B668]">Master Artisans</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {artisans.map((artisan, index) => (
              <motion.div
                key={artisan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass rounded-2xl p-6 text-center group hover:bg-white/10 transition-all duration-300"
              >
                <div className="relative mb-4">
                  <div className="w-20 h-20 mx-auto bg-[#18B668] rounded-full flex items-center justify-center text-3xl">
                    {artisan.avatar}
                  </div>
                  {artisan.verified && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs">✓</span>
                    </div>
                  )}
                </div>

                <h3 className="text-white font-bold text-xl mb-2">{artisan.name}</h3>
                <p className="text-[#18B668] font-medium mb-1">{artisan.specialty}</p>
                <p className="text-gray-400 text-sm mb-4">{artisan.location}</p>

                <div className="flex justify-center gap-4 text-sm text-gray-300 mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span>{artisan.rating}</span>
                  </div>
                  <div>{artisan.orders} orders</div>
                  <div>{artisan.products} products</div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 bg-[#18B668] hover:bg-[#18B668]/90 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  View Products
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filters & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="glass rounded-2xl p-6">
            {/* Category Filters */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-4">Categories</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-[#18B668] text-white'
                        : 'glass-dark border border-white/20 text-white hover:border-[#18B668]'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sort & View Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="glass-dark rounded-lg px-3 py-2 text-white text-sm border border-white/20 focus:border-[#18B668] focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">View:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      viewMode === 'grid' ? 'bg-[#18B668] text-white' : 'glass-dark text-white'
                    }`}
                  >
                    ⊞
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      viewMode === 'list' ? 'bg-[#18B668] text-white' : 'glass-dark text-white'
                    }`}
                  >
                    ≡
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}
        >
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`glass rounded-2xl overflow-hidden group hover:bg-white/10 transition-all duration-300 ${
                viewMode === 'list' ? 'flex gap-6' : ''
              }`}
            >
              {/* Product Image */}
              <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-48' : 'h-64'}`}>
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.featured && (
                    <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-medium rounded-full">
                      Featured
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                      Out of Stock
                    </span>
                  )}
                  {product.originalPrice > product.price && (
                    <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 w-8 h-8 glass-dark rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Heart 
                    className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                  />
                </motion.button>
              </div>

              {/* Product Info */}
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-bold text-lg leading-tight">{product.name}</h3>
                </div>

                <p className="text-emerald-400 text-sm font-medium mb-2">by {product.artisan}</p>
                
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white text-sm">{product.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-white font-bold text-xl">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-gray-500 line-through text-sm">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="flex-1 py-2 bg-[#18B668] hover:bg-[#18B668]/90 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </motion.button>
                  <Link
                    to={`/product/${product.id}`}
                    className="px-4 py-2 glass-dark border border-white/20 text-white rounded-lg hover:border-[#18B668] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 glass-dark border border-white/20 text-white font-medium rounded-xl hover:border-[#18B668] transition-all duration-300"
          >
            Load More Products
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}