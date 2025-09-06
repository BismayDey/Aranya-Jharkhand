import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShoppingCart = ({ isOpen, onClose }: ShoppingCartProps) => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-black/90 backdrop-blur-md border-l border-white/20">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 glass rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#18B668]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
                <p className="text-white/60 text-sm">{state.itemCount} items</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-white/40" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Your cart is empty</h3>
                <p className="text-white/60 mb-6">Start adding some amazing tribal crafts!</p>
                <Button 
                  onClick={onClose}
                  className="bg-[#18B668] hover:bg-[#18B668]/90 text-white"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="glass rounded-2xl p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white truncate">{item.name}</h4>
                        <p className="text-sm text-white/60 truncate">by {item.artisan}</p>
                        <p className="text-lg font-bold text-[#18B668] mt-1">₹{item.price.toLocaleString()}</p>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-white/60 hover:text-red-400 hover:bg-red-400/10 flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0 border-white/20 text-white hover:bg-white/10"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-white font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0 border-white/20 text-white hover:bg-white/10"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <span className="font-bold text-white">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                {state.items.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full mt-4 border-red-400/30 text-red-400 hover:bg-red-400/10 hover:border-red-400"
                  >
                    Clear Cart
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Footer - Total and Checkout */}
          {state.items.length > 0 && (
            <div className="p-6 border-t border-white/20 bg-black/50">
              <div className="space-y-4">
                {/* Order Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal ({state.itemCount} items)</span>
                    <span>₹{state.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Shipping</span>
                    <span>₹99</span>
                  </div>
                  <div className="h-px bg-white/20" />
                  <div className="flex justify-between text-lg font-bold text-white">
                    <span>Total</span>
                    <span>₹{(state.total + 99).toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button 
                  className="w-full bg-[#18B668] hover:bg-[#18B668]/90 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#18B668]/20"
                >
                  Proceed to Checkout
                </Button>

                <p className="text-xs text-white/50 text-center">
                  Secure checkout • Free returns • 100% authentic
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};