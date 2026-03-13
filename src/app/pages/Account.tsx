import { Link } from 'react-router';
import { User, Package, Heart, MapPin, CreditCard, ChevronRight, ShieldCheck } from 'lucide-react';

const ACCOUNT_ITEMS = [
  { title: 'My Orders', desc: 'Track, return, or reorder your purchases.', icon: Package, cta: 'View recent orders', href: '/cart' },
  { title: 'Wishlist', desc: 'Save favorites and get price-drop alerts.', icon: Heart, cta: 'Open wishlist', href: '/wishlist' },
  { title: 'Addresses', desc: 'Manage shipping and billing addresses.', icon: MapPin, cta: 'Store locator', href: '/stores' },
  { title: 'Payment Methods', desc: 'Update cards and checkout preferences.', icon: CreditCard, cta: 'Go to checkout', href: '/checkout' },
];

export function Account() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg,#F8F7F5 0%,#FFFFFF 100%)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white border rounded-2xl p-8 mb-8" style={{ borderColor: '#E2DFD8' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: '#0A0A1A' }}>
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black" style={{ color: '#0A0A1A' }}>My Account</h1>
              <p style={{ color: '#6B6877' }}>Manage your orders, profile, and saved preferences.</p>
            </div>
          </div>

          <p className="text-sm" style={{ color: '#6B6877' }}>
            Use the "Account" button in the header to sign in or create a new account.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {[
              { label: 'Wishlist Items', value: 'Saved products' },
              { label: 'Support', value: '24/7 live chat' },
              { label: 'Security', value: 'Protected checkout' },
            ].map(item => (
              <div key={item.label} className="rounded-xl p-4" style={{ background: '#F8F7F5' }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#9896A2' }}>{item.label}</p>
                <p className="font-semibold" style={{ color: '#0A0A1A' }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ACCOUNT_ITEMS.map(item => (
            <article
              key={item.title}
              className="bg-white border rounded-2xl p-5 hover:-translate-y-1 transition-all"
              style={{ borderColor: '#E2DFD8' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: '#FFF8E6' }}>
                <item.icon className="w-5 h-5" style={{ color: '#A27506' }} />
              </div>
              <h2 className="font-bold text-lg" style={{ color: '#0A0A1A' }}>{item.title}</h2>
              <p className="text-sm mt-1 mb-4" style={{ color: '#6B6877' }}>{item.desc}</p>
              <Link to={item.href} className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all" style={{ color: '#A27506' }}>
                {item.cta} <ChevronRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>

        <div className="bg-white border rounded-2xl p-6 mt-8" style={{ borderColor: '#E2DFD8' }}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#F0FBF5' }}>
              <ShieldCheck className="w-5 h-5" style={{ color: '#1B6C4A' }} />
            </div>
            <div>
              <h2 className="font-bold text-lg mb-1" style={{ color: '#0A0A1A' }}>Account protection</h2>
              <p className="text-sm" style={{ color: '#6B6877' }}>
                Your checkout and saved data are protected with encrypted connections and secure payment handling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
