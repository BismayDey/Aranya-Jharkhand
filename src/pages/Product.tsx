import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Heart, Star, Truck, Shield, Award, Plus, Minus } from 'lucide-react';

// Mock product data - will be replaced with API calls later
const mockProducts = [
  {
    id: 1,
    name: "Traditional Dokra Horse",
    price: 2500,
    originalPrice: 3500,
    category: "Metal Art",
    description: "A beautiful handcrafted Dokra horse made using the ancient lost-wax casting technique. This piece represents the rich tribal heritage of Jharkhand and showcases the exceptional skills of local artisans.",
    fullDescription: `This exquisite Dokra horse is a testament to the centuries-old craftsmanship of Jharkhand's tribal artisans. Created using the traditional lost-wax casting technique, each piece is unique and carries the soul of ancient artistic traditions.

The Dokra art form dates back over 4,000 years and is practiced by the tribal communities of Central and Eastern India. The process involves creating a clay core, covering it with wax, and then encasing it in clay again. When heated, the wax melts away, leaving a hollow space for molten metal.

This particular horse design is inspired by the sacred animals revered in tribal folklore and represents strength, loyalty, and prosperity. The intricate detailing and rustic finish make it a perfect centerpiece for any home or office.`,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500"
    ],
    artist: "Ramesh Kumar",
    location: "Dumka",
    rating: 4.8,
    reviews: 127,
    inStock: true,
    features: [
      "Handcrafted using traditional Dokra technique",
      "Made from brass and bronze alloy",
      "Dimensions: 8\" x 6\" x 3\"",
      "Weight: 850g",
      "Unique patina finish",
      "Certificate of authenticity included"
    ],
    specifications: {
      "Material": "Brass & Bronze Alloy",
      "Technique": "Lost-wax casting (Dokra)",
      "Dimensions": "8\" L x 6\" H x 3\" W",
      "Weight": "850 grams",
      "Origin": "Dumka, Jharkhand",
      "Care": "Clean with dry cloth, avoid water"
    }
  },
  {
    id: 2,
    name: "Tribal Bamboo Wall Art",
    price: 1800,
    originalPrice: 2200,
    category: "Bamboo Art",
    description: "Intricate bamboo weaving showcasing traditional tribal patterns and motifs from the heart of Jharkhand.",
    fullDescription: `This stunning bamboo wall art piece represents the sophisticated weaving techniques passed down through generations of tribal communities in Jharkhand. The intricate patterns tell stories of nature, mythology, and daily life.

Bamboo craft is one of the most sustainable art forms, utilizing the abundant natural resources of Jharkhand's forests. The artisans carefully select mature bamboo, treat it naturally, and weave it into complex geometric patterns that have deep cultural significance.

Each pattern in this piece has a meaning - the spirals represent the cycle of life, the diamond shapes symbolize protection, and the flowing lines represent the rivers that nourish the land. This art form not only preserves cultural heritage but also provides sustainable livelihoods to tribal communities.`,
    images: [
      "https://images.unsplash.com/photo-1544966503-7e22750c67b4?w=500",
      "https://images.unsplash.com/photo-1544966503-7e22750c67b4?w=500",
      "https://images.unsplash.com/photo-1544966503-7e22750c67b4?w=500"
    ],
    artist: "Sukanti Devi",
    location: "Khunti",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    features: [
      "Sustainable bamboo construction",
      "Traditional tribal patterns",
      "Ready to hang with mounting hardware",
      "Dimensions: 24\" x 18\"",
      "Natural eco-friendly finish",
      "Lightweight yet durable"
    ],
    specifications: {
      "Material": "Natural Bamboo",
      "Technique": "Traditional Weaving",
      "Dimensions": "24\" L x 18\" H x 2\" D",
      "Weight": "450 grams",
      "Origin": "Khunti, Jharkhand",
      "Care": "Dust with soft brush, avoid moisture"
    }
  }
];

export function Product() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    // Simulate API call - replace with actual API later
    const foundProduct = mockProducts.find(p => p.id === parseInt(id || '1'));
    setProduct(foundProduct || mockProducts[0]);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl">Loading product...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
      artisan: product.artist,
      quantity: quantity
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link to="/marketplace" className="text-[#18B668] hover:text-white transition-colors">
            Marketplace
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">{product.category}</span>
          <span className="text-gray-400">/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
            <div className="flex gap-4">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-[#18B668]' : 'border-gray-700'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-400 mb-4">{product.category}</p>
              </div>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-lg transition-colors ${
                  isWishlisted ? 'text-red-400 bg-red-400/10' : 'text-gray-400 hover:text-red-400'
                }`}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'
                    }`} 
                  />
                ))}
                <span className="ml-2 text-gray-400">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-[#18B668]">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-[#18B668] text-white px-2 py-1 rounded text-sm">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-2">Artist: <span className="text-white">{product.artist}</span></p>
              <p className="text-sm text-gray-400">Location: <span className="text-white">{product.location}</span></p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span>Quantity:</span>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-[#18B668] text-white py-3 rounded-xl hover:bg-[#065F46] transition-all duration-300 hover:scale-105"
              >
                Add to Cart - ₹{(product.price * quantity).toLocaleString()}
              </button>
              <button className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 transition-colors">
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Truck className="w-4 h-4" />
                <span>Free shipping across India</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Authentic handcrafted product</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Award className="w-4 h-4" />
                <span>Supporting local artisan communities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="flex gap-8 border-b border-gray-700 mb-8">
            {['description', 'specifications', 'features'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 capitalize transition-colors ${
                  activeTab === tab 
                    ? 'text-[#18B668] border-b-2 border-[#18B668]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="glass-card rounded-xl p-8">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">About This Product</h3>
                <div className="prose prose-invert max-w-none">
                  {product.fullDescription.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4 text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Specifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#18B668] rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}