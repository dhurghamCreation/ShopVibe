import { Link } from 'react-router';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg,#F8F7F5 0%,#FFFFFF 100%)' }}>
        <div className="text-center max-w-md px-4">
          <div className="w-28 h-28 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ background: '#F2EFE8' }}>
            <Heart className="w-14 h-14" style={{ color: '#A27506' }} />
          </div>
          <h1 className="text-3xl font-black mb-3" style={{ color: '#0A0A1A' }}>Your wishlist is empty</h1>
          <p className="mb-8" style={{ color: '#6B6877' }}>
            Save products you love and come back to them anytime.
          </p>
          <Link to="/products">
            <Button style={{ background: '#0A0A1A', color: 'white' }}>
              Explore products <ArrowRight className="w-4 h-4 ml-2" />
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
          <div>
            <h1 className="text-4xl font-black" style={{ color: '#0A0A1A' }}>Wishlist</h1>
            <p style={{ color: '#6B6877' }}>{wishlist.length} saved items</p>
          </div>
          <Link to="/products">
            <Button variant="outline" style={{ borderColor: '#D9D6CE' }}>Continue Shopping</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map(item => (
            <Card key={item.id} className="overflow-hidden border" style={{ borderColor: '#E2DFD8' }}>
              <Link to={`/product/${item.id}`}>
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </Link>
              <CardContent className="p-4">
                <Link to={`/product/${item.id}`}>
                  <h2 className="font-bold line-clamp-2 mb-2" style={{ color: '#0A0A1A' }}>{item.name}</h2>
                </Link>
                <p className="text-2xl font-black mb-4" style={{ color: '#0A0A1A' }}>${item.price}</p>
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    style={{ background: '#0A0A1A', color: 'white' }}
                    onClick={() => {
                      addToCart(item);
                      toast.success('Added to cart', { description: item.name });
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                  <Button
                    variant="outline"
                    style={{ borderColor: '#D9D6CE' }}
                    onClick={() => {
                      removeFromWishlist(item.id);
                      toast.success('Removed from wishlist');
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
