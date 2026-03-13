import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, ShoppingCart, Menu, X, Heart, User, ChevronDown, Phone, MapPin, LogIn } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const NAV_CATEGORIES = [
  {
    label: 'Men',
    href: '/products?gender=men',
    cols: [
      { heading: 'Clothing', links: [
        { label: 'T-Shirts & Polos', href: '/products?gender=men&search=T-Shirt' },
        { label: 'Jeans & Trousers', href: '/products?gender=men&search=Jeans' },
        { label: 'Jackets & Coats', href: '/products?gender=men&search=Jacket' },
        { label: 'Suits & Blazers', href: '/products?gender=men&search=Blazer' },
        { label: 'Hoodies & Sweaters', href: '/products?gender=men&search=Hoodie' },
        { label: 'Shorts & Chinos', href: '/products?gender=men&search=Shorts' },
      ]},
      { heading: 'Accessories', links: [
        { label: 'Bags & Backpacks', href: '/products?category=Accessories&search=Backpack' },
        { label: 'Watches', href: '/products?category=Accessories&search=Watch' },
        { label: 'Belts & Wallets', href: '/products?category=Accessories&search=Belt' },
        { label: 'Sunglasses', href: '/products?category=Accessories&search=Sunglasses' },
        { label: 'Caps & Hats', href: '/products?category=Accessories&search=Cap' },
      ]},
      { heading: 'More', links: [
        { label: 'Fragrances', href: '/products?category=Perfumes&gender=men' },
        { label: 'Electronics', href: '/products?category=Electronics' },
        { label: 'Jewellery', href: '/products?category=Jewelry&gender=men' },
        { label: 'View All Men', href: '/products?gender=men' },
      ]},
    ],
    featured: { label: 'New In Men', href: '/products?gender=men&tag=new' },
  },
  {
    label: 'Women',
    href: '/products?gender=women',
    cols: [
      { heading: 'Clothing', links: [
        { label: 'Dresses', href: '/products?gender=women&search=Dress' },
        { label: 'Tops & Blouses', href: '/products?gender=women&search=Blouse' },
        { label: 'Jeans & Trousers', href: '/products?gender=women&search=Jeans' },
        { label: 'Skirts', href: '/products?gender=women&search=Skirt' },
        { label: 'Jackets & Coats', href: '/products?gender=women&search=Coat' },
        { label: 'Knitwear & Jumpsuits', href: '/products?gender=women&search=Knitwear' },
      ]},
      { heading: 'Accessories', links: [
        { label: 'Handbags', href: '/products?category=Accessories&search=Handbag' },
        { label: 'Jewellery', href: '/products?category=Jewelry&gender=women' },
        { label: 'Sunglasses', href: '/products?category=Accessories&search=Sunglasses' },
        { label: 'Scarves', href: '/products?category=Accessories&search=Scarf' },
        { label: 'Watches', href: '/products?category=Accessories&search=Watch' },
      ]},
      { heading: 'More', links: [
        { label: 'Beauty', href: '/products?category=Beauty' },
        { label: 'Fragrances', href: '/products?category=Perfumes&gender=women' },
        { label: 'Jewellery', href: '/products?category=Jewelry' },
        { label: 'View All Women', href: '/products?gender=women' },
      ]},
    ],
    featured: { label: 'New In Women', href: '/products?gender=women&tag=new' },
  },
  { label: 'Electronics', href: '/products?category=Electronics', simple: true },
  { label: 'Beauty', href: '/products?category=Beauty', simple: true },
  { label: 'Accessories', href: '/products?category=Accessories', simple: true },
  { label: 'Jewellery', href: '/products?category=Jewelry', simple: true },
  { label: 'Sale', href: '/products?tag=bestseller', simple: true, sale: true },
];

const ANNOUNCEMENTS = [
  'Free standard shipping on all orders over $50 · Use code WELCOME20 for 20% off',
  'New arrivals every week — be the first to shop them',
  'Need help? Call us on +1 (800) 555-0199 · Mon–Fri, 9am–6pm',
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIdx(i => (i + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchFocused(false);
    }
  };

  const openDropdown = (label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };

  const closeDropdown = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <header className="sticky top-0 z-50 bg-white" style={{ boxShadow: '0 1px 0 #E2DFD8' }}>
      {/* Announcement bar */}
      <div
        className="text-center text-xs py-2.5 font-medium tracking-wide overflow-hidden"
        style={{ background: '#0A0A1A', color: '#D4A017' }}
      >
        <span
          key={announcementIdx}
          className="inline-block animate-pulse"
          style={{ animationDuration: '0.5s', animationIterationCount: 1 }}
        >
          {ANNOUNCEMENTS[announcementIdx]}
        </span>
      </div>

      {/* Secondary info bar */}
      <div
        className="hidden lg:flex items-center justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 gap-6 text-xs border-b"
        style={{ borderColor: '#F4F2ED', color: '#9896A2' }}
      >
        <a href="tel:+18005550199" className="flex items-center gap-1 hover:text-[#D4A017] transition-colors">
          <Phone className="w-3 h-3" /> +1 (800) 555-0199
        </a>
        <Link to="/stores" className="flex items-center gap-1 hover:text-[#D4A017] transition-colors">
          <MapPin className="w-3 h-3" /> Find a Store
        </Link>
        <Link to="/login" className="hover:text-[#D4A017] transition-colors">
          Sign In
        </Link>
        <Link to="/account" className="hover:text-[#D4A017] transition-colors">
          My Account
        </Link>
        <Link to="/products?tag=bestseller" className="hover:text-[#D4A017] transition-colors">
          Sale
        </Link>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 h-16">
          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center gap-2 group">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shadow-sm transition-transform group-hover:scale-105"
              style={{ background: '#0A0A1A' }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>
            <span className="text-xl font-black hidden sm:block" style={{ color: '#0A0A1A', letterSpacing: '-0.02em' }}>
              Shop<span style={{ color: '#D4A017' }}>Vibe</span>
            </span>
          </Link>

          {/* Desktop search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl relative"
          >
            <div
              className="w-full flex items-center rounded-xl overflow-hidden border transition-all"
              style={{
                borderColor: searchFocused ? '#D4A017' : '#E2DFD8',
                boxShadow: searchFocused ? '0 0 0 3px rgba(212,160,23,0.12)' : 'none',
                background: '#F8F7F5',
              }}
            >
              <Search className="w-4 h-4 ml-3.5 shrink-0" style={{ color: '#9896A2' }} />
              <input
                type="text"
                placeholder="Search products, brands, categories…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
                style={{ color: '#1A1A2A' }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mr-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>

          {/* Right icons */}
          <div className="flex items-center gap-1 ml-auto">
            <Link
              to="/login"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-[#F4F2ED]"
              style={{ color: '#1A1A2A' }}
              aria-label="Sign in"
            >
              <LogIn className="w-5 h-5" />
              <span className="hidden lg:block">Sign In</span>
            </Link>
            <Link
              to="/account"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-[#F4F2ED]"
              style={{ color: '#1A1A2A' }}
              aria-label="My account"
            >
              <User className="w-5 h-5" />
              <span className="hidden lg:block">Account</span>
            </Link>
            <Link
              to="/wishlist"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-[#F4F2ED] relative"
              style={{ color: '#1A1A2A' }}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              <span className="hidden lg:block">Wishlist</span>
              {getWishlistCount() > 0 && (
                <span
                  className="absolute -top-0.5 right-0.5 w-4.5 h-4.5 flex items-center justify-center text-xs font-black text-white rounded-full"
                  style={{ background: '#D4A017', minWidth: '18px', minHeight: '18px', lineHeight: 1 }}
                >
                  {getWishlistCount()}
                </span>
              )}
            </Link>
            <Link to="/cart">
              <button
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-[#F4F2ED] relative"
                style={{ color: '#1A1A2A' }}
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden lg:block">Cart</span>
                {getCartCount() > 0 && (
                  <span
                    className="absolute -top-0.5 right-0.5 w-4.5 h-4.5 flex items-center justify-center text-xs font-black text-white rounded-full"
                    style={{ background: '#D63838', minWidth: '18px', minHeight: '18px', lineHeight: 1 }}
                  >
                    {getCartCount()}
                  </span>
                )}
              </button>
            </Link>
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-[#F4F2ED] transition-colors"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div
            className="flex items-center rounded-xl border overflow-hidden"
            style={{ background: '#F8F7F5', borderColor: '#E2DFD8' }}
          >
            <Search className="w-4 h-4 ml-3 shrink-0" style={{ color: '#9896A2' }} />
            <input
              type="text"
              placeholder="Search products…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
              style={{ color: '#1A1A2A' }}
            />
          </div>
        </form>
      </div>

      {/* Category mega-nav */}
      <nav
        className="hidden md:block border-t"
        style={{ borderColor: '#F4F2ED' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-0">
            {NAV_CATEGORIES.map(cat => (
              <li
                key={cat.label}
                className="relative"
                onMouseEnter={() => !cat.simple && openDropdown(cat.label)}
                onMouseLeave={closeDropdown}
              >
                <Link
                  to={cat.href}
                  className="flex items-center gap-1 px-4 py-3.5 text-sm font-semibold transition-colors border-b-2 border-transparent"
                  style={{
                    color: cat.sale ? '#D63838' : '#1A1A2A',
                    borderBottomColor: activeDropdown === cat.label ? '#0A0A1A' : 'transparent',
                  }}
                  onMouseEnter={e => {
                    if (!cat.sale) (e.currentTarget as HTMLAnchorElement).style.color = '#D4A017';
                    (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = '#0A0A1A';
                  }}
                  onMouseLeave={e => {
                    if (!cat.sale) (e.currentTarget as HTMLAnchorElement).style.color = '#1A1A2A';
                    if (activeDropdown !== cat.label)
                      (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent';
                  }}
                >
                  {cat.label}
                  {!cat.simple && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                </Link>

                {/* Mega dropdown */}
                {!cat.simple && activeDropdown === cat.label && cat.cols && (
                  <div
                    className="absolute top-full left-0 bg-white rounded-b-2xl shadow-2xl z-50 border-t-2"
                    style={{
                      minWidth: '680px',
                      borderTopColor: '#0A0A1A',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                    }}
                    onMouseEnter={() => openDropdown(cat.label)}
                    onMouseLeave={closeDropdown}
                  >
                    <div className="flex p-6 gap-8">
                      {cat.cols.map(col => (
                        <div key={col.heading} className="flex-1">
                          <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: '#9896A2' }}>
                            {col.heading}
                          </p>
                          <ul className="space-y-2">
                            {col.links.map(link => (
                              <li key={link.label}>
                                <Link
                                  to={link.href}
                                  className="text-sm transition-colors hover:text-[#D4A017]"
                                  style={{ color: '#1A1A2A' }}
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {cat.featured && (
                        <div className="flex-shrink-0">
                          <Link
                            to={cat.featured.href}
                            className="block w-44 h-full rounded-xl p-4 text-center transition-transform hover:scale-[1.02]"
                            style={{ background: '#0A0A1A' }}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="text-3xl mb-2"></div>
                            <p className="text-white font-bold text-sm leading-tight">
                              {cat.featured.label}
                            </p>
                            <p className="mt-2 text-xs font-bold px-3 py-1.5 rounded-full inline-block" style={{ background: '#D4A017', color: '#0A0A1A' }}>
                              Shop Now →
                            </p>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{ borderColor: '#E2DFD8', background: 'white' }}
        >
          <div className="px-4 py-3 space-y-1">
            {NAV_CATEGORIES.map(cat => (
              <Link
                key={cat.label}
                to={cat.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-[#F4F2ED]"
                style={{ color: cat.sale ? '#D63838' : '#1A1A2A' }}
              >
                {cat.label}
              </Link>
            ))}
            <div className="border-t pt-3 mt-2 space-y-1" style={{ borderColor: '#E2DFD8' }}>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-[#F4F2ED]"
                style={{ color: '#1A1A2A' }}
              >
                <LogIn className="w-4 h-4" /> Sign In
              </Link>
              <Link
                to="/account"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-[#F4F2ED]"
                style={{ color: '#1A1A2A' }}
              >
                <User className="w-4 h-4" /> My Account
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-[#F4F2ED]"
                style={{ color: '#1A1A2A' }}
              >
                <Heart className="w-4 h-4" /> Wishlist
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
