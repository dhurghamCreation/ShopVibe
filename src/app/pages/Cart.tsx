import { Link, useNavigate } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg,#F8F7F5 0%,#FFFFFF 100%)' }}>
        <div className="text-center max-w-md px-4">
          <div className="w-32 h-32 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ background: '#F2EFE8' }}>
            <ShoppingBag className="w-16 h-16" style={{ color: '#0A0A1A' }} />
          </div>
          <h2 className="text-3xl font-black mb-4" style={{ color: '#0A0A1A' }}>Your cart is empty</h2>
          <p className="mb-8" style={{ color: '#6B6877' }}>
            Looks like you haven't added anything to your cart yet. Start shopping now!
          </p>
          <Link to="/products">
            <Button
              size="lg"
              className="text-lg px-8"
              style={{ background: '#0A0A1A', color: 'white' }}
            >
              Start Shopping
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg,#F8F7F5 0%,#FFFFFF 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-black" style={{ color: '#0A0A1A' }}>
            Shopping Cart
          </h1>
          <Button
            variant="outline"
            onClick={() => {
              clearCart();
              toast.success('Cart cleared');
            }}
            className="hover:bg-red-50"
            style={{ color: '#D63838', borderColor: '#D63838' }}
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="overflow-hidden border" style={{ borderColor: '#E2DFD8' }}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-bold mb-1 transition-colors line-clamp-2 hover:text-[#A27506]" style={{ color: '#0A0A1A' }}>
                          {item.name}
                        </h3>
                      </Link>
                      
                      <div className="text-sm mb-2" style={{ color: '#6B6877' }}>
                        {item.selectedColor && (
                          <span className="mr-3">Color: {item.selectedColor}</span>
                        )}
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                            className="w-8 h-8 rounded-lg border-2 flex items-center justify-center"
                            style={{ borderColor: '#D9D6CE' }}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                            className="w-8 h-8 rounded-lg border-2 flex items-center justify-center"
                            style={{ borderColor: '#D9D6CE' }}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-2xl font-black" style={{ color: '#0A0A1A' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm" style={{ color: '#6B6877' }}>${item.price} each</p>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => {
                        removeFromCart(item.id, item.selectedColor, item.selectedSize);
                        toast.success('Removed from cart');
                      }}
                      className="flex-shrink-0 p-2 h-fit text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-2xl font-black mb-6" style={{ color: '#0A0A1A' }}>Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">
                      {getCartTotal() >= 50 ? 'FREE' : '$9.99'}
                    </span>
                  </div>
                  {getCartTotal() < 50 && (
                    <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
                      Add ${(50 - getCartTotal()).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (estimated)</span>
                    <span className="font-semibold">${(getCartTotal() * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                  <div className="border-t pt-4 mb-6" style={{ borderColor: '#E2DFD8' }}>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold" style={{ color: '#0A0A1A' }}>Total</span>
                    <span className="text-3xl font-black" style={{ color: '#0A0A1A' }}>
                      $
                      {(
                        getCartTotal() +
                        (getCartTotal() >= 50 ? 0 : 9.99) +
                        getCartTotal() * 0.08
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  size="lg"
                  className="w-full text-lg h-14 mb-3"
                  style={{ background: '#0A0A1A', color: 'white' }}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <Link to="/products">
                  <Button variant="outline" size="lg" className="w-full" style={{ borderColor: '#D9D6CE' }}>
                    Continue Shopping
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t space-y-3" style={{ borderColor: '#E2DFD8' }}>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#6B6877' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#F0FBF5' }}>
                      ✓
                    </div>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#6B6877' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#EEF4FF' }}>
                      ✓
                    </div>
                    <span>Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#6B6877' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FFF8E6' }}>
                      ✓
                    </div>
                    <span>Money-back guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
