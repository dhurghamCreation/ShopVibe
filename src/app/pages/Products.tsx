import { useMemo, useState, type MouseEvent } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router';
import { Star, SlidersHorizontal, X, SearchX, Sparkles, Heart, ShoppingBag, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { products, categories, Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { toast } from 'sonner';

type GenderFilter = 'all' | 'men' | 'women' | 'unisex';

const MEN_SUBCATEGORIES = [
  { label: 'T-Shirts', search: 'T-Shirt' },
  { label: 'Polos', search: 'Polo' },
  { label: 'Shirts', search: 'Shirt' },
  { label: 'Jeans', search: 'Jeans' },
  { label: 'Chinos', search: 'Chinos' },
  { label: 'Shorts', search: 'Shorts' },
  { label: 'Jackets', search: 'Jacket' },
  { label: 'Hoodies', search: 'Hoodie' },
  { label: 'Sweaters', search: 'Sweater' },
  { label: 'Blazers', search: 'Blazer' },
];

const WOMEN_SUBCATEGORIES = [
  { label: 'Dresses', search: 'Dress' },
  { label: 'Blouses', search: 'Blouse' },
  { label: 'Tops', search: 'Top' },
  { label: 'Skirts', search: 'Skirt' },
  { label: 'Jeans', search: 'Jeans' },
  { label: 'Trousers', search: 'Trousers' },
  { label: 'Coats', search: 'Coat' },
  { label: 'Knitwear', search: 'Knitwear' },
  { label: 'Jumpsuits', search: 'Jumpsuit' },
  { label: 'Blazers', search: 'Blazer' },
];

const COLOR_SWATCHES: Record<string, string> = {
  Black: '#111111',
  White: '#F8F8F5',
  Navy: '#223A5E',
  Gray: '#8D95A6',
  Grey: '#8D95A6',
  Stone: '#B7AC98',
  Olive: '#68724D',
  Cream: '#F0E5CF',
  Burgundy: '#7B2436',
  Sage: '#98A890',
  Rose: '#D98798',
  Silver: '#C6CBD3',
  Blue: '#3D6DCC',
  Graphite: '#4A4E57',
  Tan: '#C79B6E',
  Brown: '#7A4A2E',
};

function normalizeGender(input: string | null): GenderFilter {
  if (!input) return 'all';
  const value = input.toLowerCase();
  if (value === 'men' || value === 'man') return 'men';
  if (value === 'women' || value === 'woman') return 'women';
  if (value === 'unisex') return 'unisex';
  return 'all';
}

function normalizeCategory(input: string | null): string {
  if (!input) return 'All';
  const normalized = input.toLowerCase();
  if (normalized === 'jewellery') return 'Jewelry';
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

function formatTitle(selectedCategory: string, selectedGender: GenderFilter, searchParams: URLSearchParams): string {
  const search = searchParams.get('search');
  if (search) return `"${search}" Results`;

  const tag = searchParams.get('tag');
  if (tag === 'new') return 'New Arrivals';
  if (tag === 'bestseller') return 'Best Sellers';

  if (selectedGender !== 'all' && selectedCategory !== 'All') {
    return `${selectedGender === 'men' ? "Men's" : selectedGender === 'women' ? "Women's" : 'Unisex'} ${selectedCategory}`;
  }

  if (selectedGender !== 'all') {
    return selectedGender === 'men' ? "Men's Collection" : selectedGender === 'women' ? "Women's Collection" : 'Unisex Collection';
  }

  return selectedCategory === 'All' ? 'All Products' : selectedCategory;
}

function ProductCard({
  product,
  wishlisted,
  onQuickAdd,
  onWishlist,
}: {
  product: Product;
  wishlisted: boolean;
  onQuickAdd: (product: Product) => void;
  onWishlist: (event: MouseEvent<HTMLButtonElement>, product: Product) => void;
}) {
  const savings = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;
  const swatches = (product.colors ?? []).slice(0, 4);

  return (
    <div className="group overflow-hidden rounded-[18px] bg-white" style={{ boxShadow: '0 10px 30px rgba(10,10,26,0.08)' }}>
      <div className="relative overflow-hidden aspect-[0.9]">
        <Link to={`/product/${product.id}`}>
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="absolute inset-x-0 top-0 p-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {product.tags?.includes('new') && (
              <Badge className="border-0 font-bold" style={{ background: '#0A0A1A', color: '#FFFFFF' }}>
                New
              </Badge>
            )}
            {savings && (
              <Badge className="border-0 font-bold" style={{ background: '#D4A017', color: '#0A0A1A' }}>
                {savings}% off
              </Badge>
            )}
          </div>

          <button
            type="button"
            onClick={event => onWishlist(event, product)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{
              background: wishlisted ? '#0A0A1A' : 'rgba(255,255,255,0.9)',
              color: wishlisted ? '#D4A017' : '#0A0A1A',
              boxShadow: '0 6px 16px rgba(10,10,26,0.16)',
            }}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/product/${product.id}`}
              className="h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
              style={{ background: 'rgba(255,255,255,0.92)', color: '#0A0A1A', backdropFilter: 'blur(10px)' }}
            >
              <Eye className="w-4 h-4" /> View
            </Link>
            <button
              type="button"
              onClick={() => onQuickAdd(product)}
              className="h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
              style={{ background: '#0A0A1A', color: '#FFFFFF' }}
            >
              <ShoppingBag className="w-4 h-4" /> Add
            </button>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: '#9896A2' }}>
            {product.subcategory ?? product.category}
          </span>
          <span
            className="text-xs font-semibold px-2 py-1 rounded-full"
            style={{
              background: product.inStock ? '#EDF7EF' : '#F8ECEC',
              color: product.inStock ? '#2F6B45' : '#9F2F2F',
            }}
          >
            {product.inStock ? 'In stock' : 'Low stock'}
          </span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-lg leading-snug mb-2 line-clamp-2 transition-colors group-hover:text-[#A27506]" style={{ color: '#0A0A1A' }}>
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className="w-4 h-4"
              style={{
                fill: index < Math.floor(product.rating) ? '#D4A017' : 'transparent',
                color: index < Math.floor(product.rating) ? '#D4A017' : '#D3D3D3',
              }}
            />
          ))}
          <span className="text-sm ml-1" style={{ color: '#6B6877' }}>
            {product.rating} · {product.reviews}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl font-black" style={{ color: '#0A0A1A' }}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm line-through" style={{ color: '#9896A2' }}>
                ${product.originalPrice}
              </span>
            )}
          </div>

          {swatches.length > 0 && (
            <div className="flex items-center gap-1.5">
              {swatches.map(color => (
                <span
                  key={color}
                  className="w-4 h-4 rounded-full border"
                  title={color}
                  style={{ borderColor: '#E2DFD8', background: COLOR_SWATCHES[color] ?? '#CCCCCC' }}
                />
              ))}
            </div>
          )}
        </div>

        <Button
          onClick={() => onQuickAdd(product)}
          className="w-full h-11 rounded-xl text-sm font-semibold"
          style={{ background: '#0A0A1A', color: '#FFFFFF' }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </div>
  );
}

export function Products() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const selectedCategory = normalizeCategory(searchParams.get('category'));
  const selectedGender = normalizeGender(searchParams.get('gender'));
  const activeSearch = searchParams.get('search')?.trim() ?? '';
  const activeTag = searchParams.get('tag');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'All' && selectedCategory !== 'Men' && selectedCategory !== 'Women') {
      result = result.filter(product => product.category === selectedCategory);
    }

    if (selectedGender !== 'all') {
      result = result.filter(product => {
        if (selectedCategory === 'All' && !activeSearch) {
          return product.gender === selectedGender;
        }
        return product.gender === selectedGender || product.gender === 'unisex';
      });
    }

    if (activeSearch) {
      const tokens = activeSearch
        .toLowerCase()
        .split(/\s+/)
        .map(token => token.replace(/[^a-z0-9-]/g, ''))
        .filter(Boolean);

      result = result.filter(product => {
        const haystack = [
          product.name,
          product.description,
          product.category,
          product.subcategory,
          product.gender,
          ...(product.tags ?? []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return tokens.every(token => haystack.includes(token));
      });
    }

    if (activeTag) {
      result = result.filter(product => product.tags?.includes(activeTag));
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [activeSearch, activeTag, selectedCategory, selectedGender, sortBy]);

  const title = formatTitle(selectedCategory, selectedGender, searchParams);
  const subcategoryPills =
    selectedCategory === 'All' && selectedGender === 'men'
      ? MEN_SUBCATEGORIES
      : selectedCategory === 'All' && selectedGender === 'women'
        ? WOMEN_SUBCATEGORIES
        : null;

  const navigateWithParams = (next: URLSearchParams) => {
    const query = next.toString();
    navigate(query ? `/products?${query}` : '/products');
  };

  const updateFilters = (nextCategory: string, nextGender: GenderFilter) => {
    const next = new URLSearchParams(searchParams);

    if (nextCategory === 'All') next.delete('category');
    else next.set('category', nextCategory);

    if (nextGender === 'all') next.delete('gender');
    else next.set('gender', nextGender);

    next.delete('search');
    navigateWithParams(next);
  };

  const handleQuickAdd = (product: Product) => {
    addToCart(product);
    toast.success('Added to cart', {
      description: product.name,
    });
  };

  const handleWishlistToggle = (event: MouseEvent<HTMLButtonElement>, product: Product) => {
    event.preventDefault();
    event.stopPropagation();

    const added = toggleWishlist(product);
    toast(added ? 'Added to wishlist' : 'Removed from wishlist', {
      description: product.name,
    });
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg,#F8F7F5 0%,#FFFFFF 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div
            className="rounded-[28px] p-6 md:p-8 mb-6 overflow-hidden relative"
            style={{
              background: 'radial-gradient(circle at top left, rgba(212,160,23,0.18), transparent 28%), linear-gradient(135deg, #0A0A1A 0%, #1B1B2E 100%)',
            }}
          >
            <div className="max-w-2xl relative z-10">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(255,255,255,0.1)', color: '#F7D77B' }}>
                <Sparkles className="w-3.5 h-3.5" /> Refined Shopping
              </span>
              <h1 className="text-3xl md:text-5xl font-black mb-3 text-white leading-tight">
                {title}
              </h1>
              <p className="text-sm md:text-base max-w-xl" style={{ color: 'rgba(255,255,255,0.74)' }}>
                Shop sharper collections with working Men and Women filters, subcategory shortcuts, and stronger product discovery.
              </p>
            </div>
            <div className="absolute right-[-60px] top-[-40px] w-56 h-56 rounded-full blur-3xl" style={{ background: 'rgba(212,160,23,0.15)' }} />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <p style={{ color: '#6B6877' }}>
              {filteredProducts.length.toLocaleString()} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
            {selectedGender !== 'all' && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: '#FFF8E6', color: '#A27506' }}>
                {selectedGender === 'men' ? 'Men filtered' : selectedGender === 'women' ? 'Women filtered' : 'Unisex filtered'}
              </span>
            )}
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: '#F1EFEB', color: '#3A3A4A' }}>
                {selectedCategory}
              </span>
            )}
          </div>
        </div>

        {subcategoryPills && (
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => navigate(`/products?gender=${selectedGender}`)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all border"
              style={{
                borderColor: !activeSearch ? '#D4A017' : '#E2DFD8',
                background: !activeSearch ? '#FFF8E6' : '#FFFFFF',
                color: !activeSearch ? '#A27506' : '#3A3A4A',
              }}
            >
              All {selectedGender === 'men' ? "Men's" : "Women's"}
            </button>
            {subcategoryPills.map(item => (
              <button
                key={item.search}
                onClick={() => navigate(`/products?gender=${selectedGender}&search=${encodeURIComponent(item.search)}`)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all border"
                style={{
                  borderColor: activeSearch.toLowerCase() === item.search.toLowerCase() ? '#D4A017' : '#E2DFD8',
                  background: activeSearch.toLowerCase() === item.search.toLowerCase() ? '#FFF8E6' : '#FFFFFF',
                  color: activeSearch.toLowerCase() === item.search.toLowerCase() ? '#A27506' : '#3A3A4A',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {activeSearch && !subcategoryPills && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold" style={{ background: '#F0ECE8', color: '#3A3A4A' }}>
              <SearchX className="w-3.5 h-3.5" /> {activeSearch}
              <button
                type="button"
                onClick={() => {
                  const next = new URLSearchParams(searchParams);
                  next.delete('search');
                  navigateWithParams(next);
                }}
                className="ml-1 hover:text-[#D63838] transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:hidden">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full"
              style={{ borderColor: '#D9D6CE' }}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 flex-shrink-0`}>
            <Card className="sticky top-24 border-0 rounded-[22px]" style={{ boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg" style={{ color: '#0A0A1A' }}>Filters</h3>
                  {showFilters && (
                    <button onClick={() => setShowFilters(false)} className="lg:hidden">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3" style={{ color: '#3A3A4A' }}>Collection</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {(['all', 'men', 'women'] as const).map(gender => (
                      <button
                        key={gender}
                        onClick={() => updateFilters(selectedCategory, gender)}
                        className="px-2 py-2 rounded-lg text-sm font-semibold transition-all border"
                        style={{
                          borderColor: selectedGender === gender ? '#D4A017' : '#E2DFD8',
                          background: selectedGender === gender ? '#FFF8E6' : '#FFFFFF',
                          color: selectedGender === gender ? '#A27506' : '#3A3A4A',
                        }}
                      >
                        {gender === 'all' ? 'All' : gender === 'men' ? 'Men' : 'Women'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3" style={{ color: '#3A3A4A' }}>Categories</h4>
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {categories.map(category => (
                      <button
                        key={category.name}
                        onClick={() => updateFilters(category.name, selectedGender)}
                        className="w-full text-left px-3 py-2 rounded-lg transition-all border"
                        style={{
                          borderColor: selectedCategory === category.name ? '#0A0A1A' : '#E2DFD8',
                          background: selectedCategory === category.name ? '#0A0A1A' : '#FFFFFF',
                          color: selectedCategory === category.name ? '#FFFFFF' : '#3A3A4A',
                        }}
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span>{category.name}</span>
                          <Badge
                            variant="outline"
                            className="font-semibold"
                            style={{
                              borderColor: selectedCategory === category.name ? 'rgba(255,255,255,0.35)' : '#D9D6CE',
                              color: selectedCategory === category.name ? '#F7E2A6' : '#6B6877',
                              background: selectedCategory === category.name ? 'rgba(255,255,255,0.08)' : 'transparent',
                            }}
                          >
                            {category.count}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6 rounded-2xl p-4" style={{ background: '#F8F7F5' }}>
                  <p className="text-xs font-black uppercase tracking-[0.18em] mb-2" style={{ color: '#9896A2' }}>
                    Precision filtering
                  </p>
                  <p className="text-sm leading-6" style={{ color: '#3A3A4A' }}>
                    Men and Women now open dedicated results, and section shortcuts like Jeans, T-Shirts, Dresses, Jackets, and more map to real catalog results.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3" style={{ color: '#3A3A4A' }}>Sort</h4>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full" style={{ borderColor: '#D9D6CE' }}>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Most Popular</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="name">Name: A to Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm" style={{ color: '#6B6877' }}>
                Showing <span className="font-semibold" style={{ color: '#0A0A1A' }}>{filteredProducts.length.toLocaleString()}</span> results
              </p>
              <div className="hidden lg:flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-full" style={{ background: '#FFF8E6', color: '#A27506' }}>
                <Sparkles className="w-3 h-3" /> Better filtering, sharper cards
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border" style={{ borderColor: '#E2DFD8' }}>
                <div className="w-24 h-24 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: '#F8F7F5' }}>
                  <SearchX className="w-12 h-12" style={{ color: '#6B6877' }} />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#0A0A1A' }}>No products found</h3>
                <p style={{ color: '#6B6877' }} className="mb-6">Try another category, collection, or search term.</p>
                <Link to="/products">
                  <Button style={{ background: '#0A0A1A', color: '#FFFFFF' }}>
                    View Full Catalog
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    wishlisted={isWishlisted(product.id)}
                    onQuickAdd={handleQuickAdd}
                    onWishlist={handleWishlistToggle}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
