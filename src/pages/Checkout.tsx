import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';

export function Checkout() {
  const { state, clearCart } = useCart();
  const { items: cartItems, total } = state;
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const [formData, setFormData] = useState({
    // Contact Information
    email: '',
    phone: '',
    
    // Shipping Address
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: 'Jharkhand',
    pincode: '',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Order Notes
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = () => {
    // Simulate order processing
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate('/marketplace');
    }, 3000);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 text-center py-16">
          <h1 className="text-4xl font-bold mb-4">No Items to Checkout</h1>
          <p className="text-xl mb-8 text-gray-400">Add some items to your cart first</p>
          <Link 
            to="/marketplace"
            className="inline-flex items-center gap-2 bg-[#18B668] text-white px-8 py-3 rounded-xl hover:bg-[#065F46] transition-all duration-300"
          >
            Go to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-32 h-32 mx-auto mb-8 bg-[#18B668] rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-xl mb-8 text-gray-400">
              Thank you for supporting local artisans. You'll receive a confirmation email shortly.
            </p>
            <div className="glass-card rounded-xl p-6 mb-8">
              <p className="text-lg">Order ID: <span className="text-[#18B668] font-bold">#JH{Date.now().toString().slice(-6)}</span></p>
            </div>
            <p className="text-gray-400">Redirecting to marketplace...</p>
          </div>
        </div>
      </div>
    );
  }

  const totalAmount = total;
  const taxAmount = Math.round(totalAmount * 0.18);
  const finalAmount = totalAmount + taxAmount;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/cart"
            className="flex items-center gap-2 text-[#18B668] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-[#18B668] text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-[#18B668]' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Step 1: Contact Information */}
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#18B668] rounded-full flex items-center justify-center text-sm">1</span>
                  Contact Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#18B668]"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#18B668]"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#18B668] rounded-full flex items-center justify-center text-sm">2</span>
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#18B668]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#18B668]"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#18B668]"
                      placeholder="Street address"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#18B668]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2">State</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#18B668]"
                      >
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Bihar">Bihar</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2">PIN Code</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#18B668]"
                        placeholder="834001"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Information */}
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#18B668] rounded-full flex items-center justify-center text-sm">3</span>
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#18B668]"
                      placeholder="Name as on card"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#18B668]"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#18B668]"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#18B668]"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Order Notes (Optional)</h3>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#18B668]"
                  placeholder="Special instructions for delivery..."
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                      <p className="text-[#18B668] font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[#18B668]">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (18%)</span>
                  <span>₹{taxAmount.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-[#18B668]">₹{finalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="space-y-3 mb-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>256-bit SSL Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>Free Shipping Across India</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Secure Payment Gateway</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                className="w-full bg-[#18B668] text-white py-3 rounded-xl hover:bg-[#065F46] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Place Order - ₹{finalAmount.toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}