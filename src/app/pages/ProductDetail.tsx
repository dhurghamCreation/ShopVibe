import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Star, ShoppingCart, Heart, Share2, Check, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { useWishlist } from '../context/WishlistContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// ── Review helpers ──────────────────────────────────────────────────────────
const REVIEW_NAMES = [
  'Alex M.', 'Sarah K.', 'James L.', 'Maria P.', 'Chris T.', 'Emma R.',
  'David W.', 'Lisa B.', 'Michael S.', 'Anna H.', 'Tom G.', 'Rachel N.',
  'Peter O.', 'Jessica F.', 'Ryan C.', 'Olivia D.', 'Nathan E.', 'Sophia Q.',
  'Benjamin T.', 'Charlotte U.',
];

const REVIEW_TEXTS = [
  'Absolutely love this! Quality exceeded expectations and delivery was incredibly fast.',
  'Great value for money. Using it daily and holds up remarkably well.',
  'Looks exactly like the photos — even better in person. My whole family loves it.',
  'Solid construction and thoughtful design. Very happy with this purchase.',
  'Was sceptical at first but this completely won me over. Highly recommend!',
  'The packaging was beautiful and the product itself is even better in real life.',
  'Fits perfectly and feels premium. The colour is spot-on, exactly as described.',
  'Bought this as a gift and the recipient was absolutely thrilled. Will order again.',
  'Excellent quality. Tried many similar products but this is the best by far.',
  'Customer service was brilliant and delivery was faster than expected. 10/10.',
  'The craftsmanship is really impressive at this price point. I can\'t fault it.',
  'I keep coming back to buy this — it\'s genuinely that good.',
  'Five stars isn\'t enough — this is an outstanding product.',
  'Arrived perfectly as described and in immaculate condition. Exactly what I needed.',
  'Very impressed with the build quality. Already recommended it to several friends.',
  'Bought it on a whim and now I can\'t imagine life without it.',
  'Works even better than advertised. Incredible value for the price.',
  'Simple, elegant, and exactly what I was looking for. Absolutely perfect.',
  'Looks premium and feels even better than it looks. Completely love it.',
  'Does everything it claims and more. Extremely satisfied with this purchase.',
];

function generateProductReviews(productId: number, productRating: number, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const seed = productId * 31 + i * 17;
    const starBase = Math.floor(productRating);
    const rating = Math.min(5, Math.max(3, starBase - ((seed + i) % 5 === 0 ? 2 : (seed + i) % 3 === 0 ? 1 : 0)));
    return {
      id: i,
      name: REVIEW_NAMES[seed % REVIEW_NAMES.length],
      rating,
      date: new Date(2024 + (i % 2), seed % 12, (seed % 28) + 1),
      text: REVIEW_TEXTS[seed % REVIEW_TEXTS.length],
      verified: i % 4 !== 0,
      helpful: (seed * 7) % 60,
    };
  });
}

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [reviewsVisible, setReviewsVisible] = useState(6);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/products">
            <Button style={{ background: '#0A0A1A', color: 'white' }}>
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const allGeneratedReviews = generateProductReviews(product.id, product.rating, Math.min(product.reviews, 50));
  const visibleReviews = allGeneratedReviews.slice(0, reviewsVisible);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    toast.success('Added to cart!', {
      description: `${quantity} x ${product.name}`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/cart');
  };

  const handleWishlist = () => {
    const added = toggleWishlist(product);
    toast.success(added ? 'Added to wishlist' : 'Removed from wishlist', {
      description: product.name,
    });
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/product/${product.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Take a look at ${product.name} on ShopVibe`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Product link copied', { description: product.name });
      }
    } catch {
      toast.error('Unable to share this product right now');
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg,#F8F7F5 0%,#FFFFFF 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-[#A27506]">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#A27506]">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-[#A27506]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div>
            <div className="sticky top-24">
              <div
                className="relative aspect-square rounded-2xl overflow-hidden mb-4"
                style={{ border: '2px solid #E2DFD8', boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
              >
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {product.tags?.includes('new') && (
                  <Badge className="absolute top-4 left-4 border-0 text-lg px-4 py-2" style={{ background: '#0A0A1A', color: 'white' }}>
                    NEW
                  </Badge>
                )}
                {product.originalPrice && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 border-0 text-lg px-4 py-2">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{product.rating}</span>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl font-black" style={{ color: '#0A0A1A' }}>
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-green-600 font-semibold">
                  You save ${(product.originalPrice - product.price).toFixed(2)} (
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">{product.description}</p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">
                  Color: <span style={{ color: '#A27506' }}>{selectedColor}</span>
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 rounded-lg border-2 font-semibold transition-all ${
                        selectedColor === color
                          ? 'border-[#D4A017] bg-[#FFF8E6] text-[#A27506]'
                          : 'border-gray-300 hover:border-[#D4A017]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">
                  Size: <span style={{ color: '#A27506' }}>{selectedSize}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-lg border-2 font-semibold transition-all ${
                        selectedSize === size
                          ? 'border-[#D4A017] bg-[#FFF8E6] text-[#A27506]'
                          : 'border-gray-300 hover:border-[#D4A017]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-[#D4A017] font-bold text-xl"
                >
                  -
                </button>
                <span className="w-16 text-center text-2xl font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-[#D4A017] font-bold text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-8">
              {product.inStock ? (
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <Check className="w-5 h-5" />
                  In Stock - Ready to Ship
                </div>
              ) : (
                <div className="text-red-600 font-semibold">Out of Stock</div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                size="lg"
                className="flex-1 text-lg h-14 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #1A1A2E 0%, #0A0A1A 100%)',
                  color: 'white',
                  boxShadow: '0 4px 14px rgba(10,10,26,0.28)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(10,10,26,0.5)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(10,10,26,0.28)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                size="lg"
                variant="outline"
                className="flex-1 text-lg h-14 transition-all duration-300"
                style={{ borderColor: '#D4A017', borderWidth: '2px', color: '#A27506' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #FFF8E6, #FFF0C0)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(212,160,23,0.35)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Buy Now
              </Button>
            </div>

            <div className="flex gap-3 mb-8">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                style={{ borderColor: isWishlisted(product.id) ? '#D4A017' : '#D9D6CE', color: isWishlisted(product.id) ? '#A27506' : '#0A0A1A' }}
                onClick={handleWishlist}
              >
                <Heart className="w-5 h-5 mr-2" />
                {isWishlisted(product.id) ? 'Saved' : 'Wishlist'}
              </Button>
              <Button variant="outline" size="lg" className="flex-1" style={{ borderColor: '#D9D6CE' }} onClick={handleShare}>
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <Truck className="w-5 h-5" />, title: 'Free Shipping', sub: 'On orders over $50' },
                { icon: <ShieldCheck className="w-5 h-5" />, title: 'Secure Payment', sub: '100% protected' },
                { icon: <RotateCcw className="w-5 h-5" />, title: 'Easy Returns', sub: '30-day guarantee' },
              ].map(({ icon, title, sub }) => (
                <Card
                  key={title}
                  className="transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                  style={{ border: '1px solid #E2DFD8' }}
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #FFF8E6, #FFF0C0)', color: '#A27506' }}
                    >
                      {icon}
                    </div>
                    <h4 className="font-bold text-sm mb-1" style={{ color: '#0A0A1A' }}>{title}</h4>
                    <p className="text-xs" style={{ color: '#6B6877' }}>{sub}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <h2 className="text-3xl font-black" style={{ color: '#0A0A1A' }}>Customer Reviews</h2>
            <span
              className="text-sm px-4 py-2 rounded-full font-semibold"
              style={{ background: '#FFF8E6', color: '#A27506', border: '1px solid rgba(212,160,23,0.35)' }}
            >
              {product.reviews.toLocaleString()} verified reviews
            </span>
          </div>

          {/* Rating overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div
              className="flex items-center gap-8 p-6 rounded-2xl"
              style={{ background: '#FAFAF8', border: '1px solid #E2DFD8' }}
            >
              <div className="text-center shrink-0">
                <div className="text-6xl font-black" style={{ color: '#0A0A1A' }}>{product.rating}</div>
                <div className="flex justify-center gap-0.5 my-2">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star
                      key={s}
                      className={`w-5 h-5 ${s <= Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
                <div className="text-sm font-medium" style={{ color: '#6B6877' }}>out of 5</div>
              </div>
              <div className="flex-1 space-y-2.5">
                {([5, 4, 3, 2, 1] as const).map((star, idx) => {
                  const pcts = [68, 18, 9, 3, 2];
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-3 font-bold text-right" style={{ color: '#0A0A1A' }}>{star}</span>
                      <Star className="w-3 h-3 shrink-0 fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#EDE9E0' }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pcts[idx]}%`, background: 'linear-gradient(90deg, #D4A017, #A27506)' }}
                        />
                      </div>
                      <span className="w-7 text-right font-medium" style={{ color: '#6B6877' }}>{pcts[idx]}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sentiment tags */}
            <div className="p-6 rounded-2xl" style={{ background: '#FAFAF8', border: '1px solid #E2DFD8' }}>
              <h4 className="font-bold mb-4 text-xs uppercase tracking-widest" style={{ color: '#9896A2' }}>
                What customers say
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Great quality', 'Fast delivery', 'True to size',
                  'Excellent value', 'Looks as described', 'Would buy again',
                  'Well packaged', 'Good customer service',
                ].map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: '#FFF8E6', color: '#A27506', border: '1px solid rgba(212,160,23,0.3)' }}
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Review cards */}
          <div className="space-y-4">
            {visibleReviews.map(review => (
              <div
                key={review.id}
                className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: 'white', border: '1px solid #E2DFD8' }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0"
                      style={{ background: '#0A0A1A' }}
                    >
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm" style={{ color: '#0A0A1A' }}>{review.name}</span>
                        {review.verified && (
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: '#F0FDF4', color: '#16a34a', border: '1px solid #bbf7d0' }}
                          >
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs" style={{ color: '#9896A2' }}>
                          {review.date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs shrink-0" style={{ color: '#9896A2' }}>👍 {review.helpful}</div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#4B4857' }}>{review.text}</p>
              </div>
            ))}
          </div>

          {/* Load more / summary */}
          {reviewsVisible < allGeneratedReviews.length ? (
            <button
              onClick={() => setReviewsVisible(v => Math.min(v + 6, allGeneratedReviews.length))}
              className="mt-6 w-full py-4 rounded-2xl font-bold text-sm border-2 transition-all duration-200 hover:bg-[#FFF8E6] active:scale-[0.99]"
              style={{ borderColor: '#D4A017', color: '#A27506' }}
            >
              Load more — showing {reviewsVisible} of {product.reviews.toLocaleString()} reviews
            </button>
          ) : (
            <p className="mt-6 text-center text-sm" style={{ color: '#9896A2' }}>
              Showing all {allGeneratedReviews.length} loaded reviews · {product.reviews.toLocaleString()} total verified
            </p>
          )}
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-black mb-8" style={{ color: '#0A0A1A' }}>
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="group transition-all duration-300 border overflow-hidden hover:-translate-y-1"
                  style={{ borderColor: '#E2DFD8' }}
                >
                  <Link to={`/product/${relatedProduct.id}`}>
                    <div className="relative overflow-hidden aspect-square">
                      <ImageWithFallback
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link to={`/product/${relatedProduct.id}`}>
                      <h3 className="font-bold mb-2 line-clamp-2 transition-colors group-hover:text-[#A27506]" style={{ color: '#0A0A1A' }}>
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(relatedProduct.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black" style={{ color: '#0A0A1A' }}>
                        ${relatedProduct.price}
                      </span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${relatedProduct.originalPrice}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
