import { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, Phone, ShoppingBag } from 'lucide-react';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setForm({ name: '', email: '', phone: '', password: '' });
        onClose();
      }, 1400);
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      style={{ background: 'rgba(10,10,26,0.70)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="h-1.5" style={{ background: 'linear-gradient(90deg,#0A0A1A,#D4A017,#D63838)' }} />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors z-10"
          style={{ background: '#F4F2ED', color: '#6B6877' }}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-8 pt-7 pb-8">
          {/* Branding */}
          <div className="flex items-center gap-2 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow"
              style={{ background: '#0A0A1A' }}
            >
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black" style={{ color: '#0A0A1A' }}>
              Shop<span style={{ color: '#D4A017' }}>Vibe</span>
            </span>
          </div>

          <h2 className="text-2xl font-black mb-1" style={{ color: '#0A0A1A' }}>
            {tab === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-sm mb-6" style={{ color: '#9896A2' }}>
            {tab === 'login'
              ? 'Sign in to access your orders and wishlist.'
              : 'Join thousands of happy shoppers worldwide.'}
          </p>

          {/* Tab switcher */}
          <div
            className="flex rounded-xl p-1 mb-6"
            style={{ background: '#F4F2ED' }}
          >
            {(['login', 'register'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all"
                style={{
                  background: tab === t ? 'white' : 'transparent',
                  color: tab === t ? '#0A0A1A' : '#9896A2',
                  boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
                }}
              >
                {t === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          {success ? (
            <div
              className="text-center py-8 rounded-xl"
              style={{ background: '#F0FBF5' }}
            >
              <div className="text-4xl mb-3">✓</div>
              <p className="font-bold text-lg" style={{ color: '#1B6C4A' }}>
                {tab === 'login' ? 'Signed in!' : 'Account created!'}
              </p>
              <p className="text-sm mt-1" style={{ color: '#9896A2' }}>
                Redirecting you now…
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 'register' && (
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9896A2' }} />
                  <input
                    type="text"
                    placeholder="Full name"
                    required
                    value={form.name}
                    onChange={set('name')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      border: '1.5px solid #E2DFD8',
                      background: '#FAFAF8',
                      color: '#1A1A2A',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#D4A017')}
                    onBlur={e => (e.target.style.borderColor = '#E2DFD8')}
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9896A2' }} />
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={form.email}
                  onChange={set('email')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    border: '1.5px solid #E2DFD8',
                    background: '#FAFAF8',
                    color: '#1A1A2A',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#D4A017')}
                  onBlur={e => (e.target.style.borderColor = '#E2DFD8')}
                />
              </div>

              {tab === 'register' && (
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9896A2' }} />
                  <input
                    type="tel"
                    placeholder="Phone number (optional)"
                    value={form.phone}
                    onChange={set('phone')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      border: '1.5px solid #E2DFD8',
                      background: '#FAFAF8',
                      color: '#1A1A2A',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#D4A017')}
                    onBlur={e => (e.target.style.borderColor = '#E2DFD8')}
                  />
                </div>
              )}

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9896A2' }} />
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={set('password')}
                  className="w-full pl-10 pr-11 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    border: '1.5px solid #E2DFD8',
                    background: '#FAFAF8',
                    color: '#1A1A2A',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#D4A017')}
                  onBlur={e => (e.target.style.borderColor = '#E2DFD8')}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: '#9896A2' }}
                  tabIndex={-1}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {tab === 'login' && (
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" style={{ accentColor: '#D4A017' }} />
                    <span className="text-xs" style={{ color: '#6B6877' }}>Remember me</span>
                  </label>
                  <button type="button" className="text-xs hover:underline" style={{ color: '#D4A017' }}>
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl py-3.5 text-sm font-bold transition-all mt-1"
                style={{
                  background: loading ? '#3a3a5a' : '#0A0A1A',
                  color: 'white',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading
                  ? 'Please wait…'
                  : tab === 'login'
                  ? 'Sign In to My Account'
                  : 'Create Free Account'}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: '#E2DFD8' }} />
            </div>
            <div className="relative text-center">
              <span className="bg-white px-4 text-xs" style={{ color: '#9896A2' }}>
                or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-colors border"
              style={{ borderColor: '#E2DFD8', color: '#1A1A2A', background: '#FAFAF8' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button
              className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-colors border"
              style={{ borderColor: '#E2DFD8', color: '#1A1A2A', background: '#FAFAF8' }}
            >
              <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          <p className="text-center text-xs mt-5" style={{ color: '#9896A2' }}>
            By continuing, you agree to our{' '}
            <button className="underline hover:no-underline" style={{ color: '#D4A017' }}>Terms</button>{' '}
            and{' '}
            <button className="underline hover:no-underline" style={{ color: '#D4A017' }}>Privacy Policy</button>.
          </p>
        </div>
      </div>
    </div>
  );
}
