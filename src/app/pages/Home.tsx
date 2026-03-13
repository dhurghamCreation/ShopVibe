import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Star, Zap, Shield, TrendingUp, RotateCcw, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'New York, NY',
    avatar: 'https://i.pravatar.cc/150?img=47',
    rating: 5,
    text: "I've been shopping here for over a year now. The quality-to-price ratio is genuinely better than anything else I've found online. My last order arrived in two days — incredible.",
    product: 'Premium Leather Tote Bag',
    verified: true,
  },
  {
    id: 2,
    name: 'James K.',
    location: 'Chicago, IL',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: "Bought a pair of headphones that were on sale. Honestly thought it was too good to be true at that price. Two months later and they're still working perfectly. Brilliant site.",
    product: 'Wireless Noise-Cancelling Headphones',
    verified: true,
  },
  {
    id: 3,
    name: 'Amira T.',
    location: 'London, UK',
    avatar: 'https://i.pravatar.cc/150?img=30',
    rating: 4,
    text: "Sizing is accurate across the board — something that's rare with online clothing. The returns process is also genuinely hassle-free. Will definitely come back.",
    product: 'Stretch-Fit Midi Dress',
    verified: true,
  },
  {
    id: 4,
    name: 'David L.',
    location: 'Los Angeles, CA',
    avatar: 'https://i.pravatar.cc/150?img=68',
    rating: 5,
    text: "Customer service actually picks up the phone. Had a slight issue with my delivery address and they sorted it in minutes. That kind of service is rare. 10/10.",
    product: 'Slim-Fit Chino Trousers',
    verified: true,
  },
  {
    id: 5,
    name: 'Priya N.',
    location: 'Toronto, CA',
    avatar: 'https://i.pravatar.cc/150?img=25',
    rating: 5,
    text: "The skincare range is exceptional. I was sceptical buying beauty products online without testing them first, but the detailed descriptions and ingredient lists made it easy.",
    product: 'Vitamin C Brightening Serum',
    verified: true,
  },
  {
    id: 6,
    name: 'Marcus B.',
    location: 'Austin, TX',
    avatar: 'https://i.pravatar.cc/150?img=53',
    rating: 4,
    text: "Fast shipping, well-packaged, and exactly what was shown in the photos. Simple things done right. The chatbot helped me track my parcel in real time too — handy.",
    product: 'Stainless Steel Watch',
    verified: true,
  },
];

const GENDER_SECTIONS = [
  {
    label: 'Men',
    tagline: "Sharp looks, every season.",
    href: '/products?gender=men',
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&auto=format&fit=crop&q=80',
    cta: "Shop Men's",
  },
  {
    label: 'Women',
    tagline: "Style that speaks for itself.",
    href: '/products?gender=women',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop&q=80',
    cta: "Shop Women's",
  },
];

export function Home() {
  const { addToCart } = useCart();
  const [slideIndex, setSlideIndex] = useState(0);

  const featuredProducts = products.filter(p => p.tags?.includes('bestseller')).slice(0, 8);
  const newProducts = products.filter(p => p.tags?.includes('new')).slice(0, 4);
  const heroSlides = products.slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(current => (current + 1) % heroSlides.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleQuickAdd = (product: typeof products[0]) => {
    addToCart(product);
    toast.success('Added to cart', {
      description: product.name,
    });
  };

  return (
    <div className="min-h-screen" style={{ background: '#FFFFFF' }}>

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#0A0A1A', minHeight: '520px' }}
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Gold accent orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #D4A017 0%, transparent 60%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #D63838 0%, transparent 60%)', transform: 'translate(-30%, 30%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <span
              className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(212,160,23,0.15)', color: '#D4A017', border: '1px solid rgba(212,160,23,0.3)' }}
            >
              Spring / Summer 2026 Collection
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Dress for the<br />
              <span style={{ color: '#D4A017' }}>life you want.</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Premium fashion, electronics, and beauty — all in one place. Free shipping on orders over $50.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products">
                <button
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 hover:scale-[1.02]"
                  style={{ background: '#D4A017', color: '#0A0A1A' }}
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/products?tag=new">
                <button
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:bg-white/10 border"
                  style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'white' }}
                >
                  New Arrivals
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust strip ──────────────────────────────────────────────────── */}
      <section style={{ background: '#F8F7F5', borderBottom: '1px solid #E2DFD8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { Icon: Zap, title: 'Fast Delivery', desc: 'Free on orders over $50' },
              { Icon: Shield, title: 'Secure Payments', desc: 'SSL encrypted checkout' },
              { Icon: RotateCcw, title: '30-Day Returns', desc: 'No questions asked' },
              { Icon: TrendingUp, title: 'Best Price Guarantee', desc: 'We\'ll match any price' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: '#0A0A1A', color: '#D4A017' }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#1A1A2A' }}>{title}</p>
                  <p className="text-xs" style={{ color: '#9896A2' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Slideshow ───────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: '#9896A2' }}>Spotlight</p>
              <h2 className="text-2xl md:text-3xl font-black" style={{ color: '#1A1A2A' }}>Featured right now</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSlideIndex(current => (current - 1 + heroSlides.length) % heroSlides.length)}
                className="w-10 h-10 rounded-full border flex items-center justify-center"
                style={{ borderColor: '#D9D6CE', color: '#0A0A1A' }}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSlideIndex(current => (current + 1) % heroSlides.length)}
                className="w-10 h-10 rounded-full border flex items-center justify-center"
                style={{ borderColor: '#D9D6CE', color: '#0A0A1A' }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_0.95fr] gap-5">
            <Link
              to={`/product/${heroSlides[slideIndex].id}`}
              className="group relative overflow-hidden rounded-3xl min-h-[420px] block"
            >
              <ImageWithFallback
                src={heroSlides[slideIndex].image}
                alt={heroSlides[slideIndex].name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,26,0.72) 0%, rgba(10,10,26,0.15) 100%)' }} />
              <div className="absolute left-0 right-0 bottom-0 p-8 md:p-10">
                <span className="inline-flex text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(212,160,23,0.15)', color: '#F7E2A6', border: '1px solid rgba(212,160,23,0.3)' }}>
                  Featured Product
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-white max-w-xl leading-tight mb-3">
                  {heroSlides[slideIndex].name}
                </h3>
                <p className="text-sm md:text-base max-w-lg mb-5" style={{ color: 'rgba(255,255,255,0.68)' }}>
                  {heroSlides[slideIndex].description}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-2xl md:text-3xl font-black" style={{ color: '#F7E2A6' }}>
                    ${heroSlides[slideIndex].price}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl" style={{ background: 'white', color: '#0A0A1A' }}>
                    View product <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>

            <div className="grid grid-cols-1 gap-4">
              {heroSlides.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setSlideIndex(index)}
                  className="flex items-center gap-4 p-4 rounded-2xl border text-left transition-all hover:-translate-y-0.5"
                  style={{
                    borderColor: slideIndex === index ? '#D4A017' : '#E2DFD8',
                    background: slideIndex === index ? '#FFF8E6' : 'white',
                  }}
                >
                  <ImageWithFallback src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold line-clamp-2" style={{ color: '#0A0A1A' }}>{item.name}</p>
                    <p className="text-sm mt-1 line-clamp-2" style={{ color: '#6B6877' }}>{item.description}</p>
                    <p className="text-sm font-black mt-2" style={{ color: '#A27506' }}>${item.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Men / Women ──────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {GENDER_SECTIONS.map(s => (
              <Link key={s.label} to={s.href} className="group relative overflow-hidden rounded-2xl block" style={{ aspectRatio: '16/9' }}>
                <ImageWithFallback
                  src={s.image}
                  alt={s.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,26,0.7) 0%, rgba(10,10,26,0.2) 100%)' }} />
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: '#D4A017' }}>{s.tagline}</p>
                  <h2 className="text-3xl font-black text-white mb-4">{s.label}</h2>
                  <span
                    className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all group-hover:gap-3"
                    style={{ background: 'white', color: '#0A0A1A' }}
                  >
                    {s.cta} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Categories ───────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16" style={{ background: '#F8F7F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: '#9896A2' }}>Browse</p>
              <h2 className="text-2xl md:text-3xl font-black" style={{ color: '#1A1A2A' }}>Shop by Category</h2>
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { name: 'Clothing', icon: '👕', href: '/products?category=Clothing' },
              { name: 'Electronics', icon: '📱', href: '/products?category=Electronics' },
              { name: 'Accessories', icon: '👜', href: '/products?category=Accessories' },
              { name: 'Beauty', icon: '💄', href: '/products?category=Beauty' },
              { name: 'Perfumes', icon: '🌸', href: '/products?category=Perfumes' },
              { name: 'Jewellery', icon: '💎', href: '/products?category=Jewelry' },
            ].map(cat => (
              <Link
                key={cat.name}
                to={cat.href}
                className="group bg-white border rounded-xl p-4 text-center transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ borderColor: '#E2DFD8' }}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <p className="text-xs font-bold" style={{ color: '#1A1A2A' }}>{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── New Arrivals ─────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: '#9896A2' }}>Just landed</p>
              <h2 className="text-2xl md:text-3xl font-black" style={{ color: '#1A1A2A' }}>New Arrivals</h2>
            </div>
            <Link
              to="/products?tag=new"
              className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
              style={{ color: '#0A0A1A' }}
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {newProducts.map(product => (
              <div
                key={product.id}
                className="group bg-white border rounded-2xl overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
                style={{ borderColor: '#E2DFD8' }}
              >
                <Link to={`/product/${product.id}`} className="block relative overflow-hidden" style={{ aspectRatio: '1' }}>
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute top-3 left-3 text-xs font-black px-2.5 py-1 rounded-full"
                    style={{ background: '#0A0A1A', color: 'white' }}
                  >
                    NEW
                  </span>
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <p className="font-semibold text-sm leading-tight mb-2 line-clamp-2 hover:underline" style={{ color: '#1A1A2A' }}>
                      {product.name}
                    </p>
                  </Link>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5"
                        style={{
                          fill: i < Math.floor(product.rating) ? '#D4A017' : 'transparent',
                          color: i < Math.floor(product.rating) ? '#D4A017' : '#D1D1D1',
                        }}
                      />
                    ))}
                    <span className="text-xs ml-1" style={{ color: '#9896A2' }}>({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black" style={{ color: '#0A0A1A' }}>${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs line-through" style={{ color: '#9896A2' }}>${product.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:opacity-85"
                      style={{ background: '#0A0A1A', color: 'white' }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Best Sellers ─────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16" style={{ background: '#F8F7F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: '#9896A2' }}>Most popular</p>
              <h2 className="text-2xl md:text-3xl font-black" style={{ color: '#1A1A2A' }}>Best Sellers</h2>
            </div>
            <Link
              to="/products?tag=bestseller"
              className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
              style={{ color: '#0A0A1A' }}
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product, idx) => (
              <div
                key={product.id}
                className="group bg-white border rounded-2xl overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
                style={{ borderColor: '#E2DFD8' }}
              >
                <Link to={`/product/${product.id}`} className="block relative overflow-hidden" style={{ aspectRatio: '1' }}>
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {idx < 3 && (
                    <span
                      className="absolute top-3 left-3 text-xs font-black px-2.5 py-1 rounded-full"
                      style={{ background: '#D63838', color: 'white' }}
                    >
                      #{idx + 1} Seller
                    </span>
                  )}
                  {product.originalPrice && (
                    <span
                      className="absolute top-3 right-3 text-xs font-black px-2.5 py-1 rounded-full"
                      style={{ background: '#D4A017', color: '#0A0A1A' }}
                    >
                      SALE
                    </span>
                  )}
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <p className="font-semibold text-sm leading-tight mb-2 line-clamp-2 hover:underline" style={{ color: '#1A1A2A' }}>
                      {product.name}
                    </p>
                  </Link>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5"
                        style={{
                          fill: i < Math.floor(product.rating) ? '#D4A017' : 'transparent',
                          color: i < Math.floor(product.rating) ? '#D4A017' : '#D1D1D1',
                        }}
                      />
                    ))}
                    <span className="text-xs ml-1" style={{ color: '#9896A2' }}>({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black" style={{ color: '#0A0A1A' }}>${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs line-through" style={{ color: '#9896A2' }}>${product.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:opacity-85"
                      style={{ background: '#0A0A1A', color: 'white' }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: '#9896A2' }}>
              Customer Reviews
            </p>
            <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: '#1A1A2A' }}>
              What our customers say
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4" style={{ fill: '#D4A017', color: '#D4A017' }} />
                ))}
              </div>
              <span className="text-sm font-semibold" style={{ color: '#1A1A2A' }}>4.9 out of 5</span>
              <span className="text-sm" style={{ color: '#9896A2' }}>— based on 2,400+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t => (
              <div
                key={t.id}
                className="bg-white border rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
                style={{ borderColor: '#E2DFD8' }}
              >
                <Quote className="w-6 h-6 shrink-0" style={{ color: '#D4A017' }} />
                <p className="text-sm leading-relaxed flex-1" style={{ color: '#3A3A4A' }}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5"
                      style={{
                        fill: i < t.rating ? '#D4A017' : 'transparent',
                        color: i < t.rating ? '#D4A017' : '#D1D1D1',
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: '#F4F2ED' }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=E2DFD8&color=1A1A2A`; }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold" style={{ color: '#1A1A2A' }}>{t.name}</p>
                      {t.verified && (
                        <span className="text-xs font-semibold px-1.5 py-0.5 rounded" style={{ background: '#F0FBF5', color: '#1B6C4A' }}>
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs" style={{ color: '#9896A2' }}>{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold border-b-2 pb-0.5 hover:gap-3 transition-all"
              style={{ borderColor: '#0A0A1A', color: '#0A0A1A' }}
            >
              Read all 2,400+ reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: '#0A0A1A' }}>
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="text-xs font-black tracking-widest uppercase mb-4" style={{ color: '#D4A017' }}>
            Member Perks
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            Join ShopVibe and save on every order
          </h2>
          <p className="mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Create a free account and unlock early access to sales, exclusive member pricing, and personalised recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/login">
              <button
                className="px-8 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ background: '#D4A017', color: '#0A0A1A' }}
              >
                Create Free Account
              </button>
            </Link>
            <Link to="/products">
              <button
                className="px-8 py-3.5 rounded-xl text-sm font-bold border transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'white' }}
              >
                Continue as Guest
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}