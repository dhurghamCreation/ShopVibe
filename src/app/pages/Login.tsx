import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Mail, Lock, User, Phone, ShoppingBag, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { toast } from 'sonner';

type AuthMode = 'login' | 'register';

export function Login() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const navigate = useNavigate();

  const setField = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success(mode === 'login' ? 'Welcome back!' : 'Account created successfully');
      navigate('/account');
    }, 900);
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg,#F8F7F5 0%,#FFFFFF 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
          <section
            className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
            style={{ background: '#0A0A1A' }}
          >
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #D4A017 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #D63838 0%, transparent 70%)' }} />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.12)' }}>
                  <ShoppingBag className="w-5 h-5" style={{ color: '#F7E2A6' }} />
                </div>
                <span className="text-xl font-black text-white">
                  Shop<span style={{ color: '#D4A017' }}>Vibe</span>
                </span>
              </div>

              <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: '#D4A017' }}>
                Member Access
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                {mode === 'login' ? 'Sign in and pick up where you left off.' : 'Create your account in under a minute.'}
              </h1>
              <p className="max-w-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Save your wishlist, track orders in real time, and unlock member-only deals tailored to your shopping style.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
                {[
                  { icon: <ShieldCheck className="w-4 h-4" />, title: 'Secure', text: 'Protected checkout' },
                  { icon: <Truck className="w-4 h-4" />, title: 'Fast', text: 'Priority fulfilment' },
                  { icon: <Sparkles className="w-4 h-4" />, title: 'Perks', text: 'Members-only offers' },
                ].map(item => (
                  <div
                    key={item.title}
                    className="rounded-xl p-3 border"
                    style={{ borderColor: 'rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.05)' }}
                  >
                    <div className="flex items-center gap-2 mb-1" style={{ color: '#F7E2A6' }}>
                      {item.icon}
                      <span className="text-sm font-bold">{item.title}</span>
                    </div>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.62)' }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border bg-white p-7 md:p-8" style={{ borderColor: '#E2DFD8' }}>
            <div className="flex rounded-xl p-1 mb-6" style={{ background: '#F4F2ED' }}>
              {(['login', 'register'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setMode(tab)}
                  className="flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all"
                  style={{
                    background: mode === tab ? 'white' : 'transparent',
                    color: mode === tab ? '#0A0A1A' : '#9896A2',
                    boxShadow: mode === tab ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
                  }}
                >
                  {tab === 'login' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9896A2' }} />
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={form.name}
                    onChange={setField('name')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                    style={{ border: '1.5px solid #E2DFD8', background: '#FAFAF8', color: '#1A1A2A' }}
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9896A2' }} />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={form.email}
                  onChange={setField('email')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: '1.5px solid #E2DFD8', background: '#FAFAF8', color: '#1A1A2A' }}
                />
              </div>

              {mode === 'register' && (
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9896A2' }} />
                  <input
                    type="tel"
                    placeholder="Phone number (optional)"
                    value={form.phone}
                    onChange={setField('phone')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                    style={{ border: '1.5px solid #E2DFD8', background: '#FAFAF8', color: '#1A1A2A' }}
                  />
                </div>
              )}

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9896A2' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  placeholder="Password"
                  value={form.password}
                  onChange={setField('password')}
                  className="w-full pl-10 pr-11 py-3 rounded-xl text-sm outline-none"
                  style={{ border: '1.5px solid #E2DFD8', background: '#FAFAF8', color: '#1A1A2A' }}
                />
                <button
                  type="button"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: '#9896A2' }}
                  onClick={() => setShowPassword(s => !s)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl py-3.5 text-sm font-bold transition-all"
                style={{ background: '#0A0A1A', color: 'white', opacity: loading ? 0.75 : 1 }}
              >
                {loading ? 'Please wait…' : mode === 'login' ? 'Sign In to My Account' : 'Create Free Account'}
              </button>
            </form>

            <p className="text-center text-xs mt-5" style={{ color: '#9896A2' }}>
              By continuing, you agree to our Terms and Privacy Policy.
            </p>

            <div className="text-center mt-5 text-sm" style={{ color: '#6B6877' }}>
              Prefer browsing first?{' '}
              <Link to="/products" className="font-semibold" style={{ color: '#A27506' }}>
                Continue as guest
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
