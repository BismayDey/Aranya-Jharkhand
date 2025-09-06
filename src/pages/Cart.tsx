import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

export function Cart() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const { items: cartItems, total, itemCount } = state;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-8 glass-card rounded-full flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-[#18B668]" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-xl mb-8 text-gray-400">
              Discover amazing artisan products from Jharkhand
            </p>
            <Link 
              to="/marketplace"
              className="inline-flex items-center gap-2 bg-[#18B668] text-white px-8 py-3 rounded-xl hover:bg-[#065F46] transition-all duration-300 hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/marketplace"
            className="flex items-center gap-2 text-[#18B668] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="glass-card rounded-xl p-6">
                  <div className="flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold">{item.name}</h3>
                          <p className="text-gray-400">{item.category}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#18B668]">₹{(item.price * item.quantity).toLocaleString()}</p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-gray-400">₹{item.price.toLocaleString()} each</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[#18B668]">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>₹{Math.round(total * 0.18).toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-[#18B668]">₹{Math.round(total * 1.18).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full bg-[#18B668] text-white py-3 rounded-xl hover:bg-[#065F46] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-400">Secure checkout with 256-bit SSL encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}