import { useState, useEffect } from 'react';
import { X, Clock, Tag } from 'lucide-react';

const OFFERS = [
  {
    id: 1,
    code: 'WELCOME20',
    title: '20% Off Your First Order',
    desc: 'New customers only. Automatically applied at checkout.',
    discount: '20%',
    badgeBg: '#D4A017',
    expires: '2 days left',
  },
  {
    id: 2,
    code: 'FLASH50',
    title: 'Flash Sale — Half Price on 200+ Items',
    desc: 'Limited stock available. Ends tonight at midnight.',
    discount: '50%',
    badgeBg: '#D63838',
    expires: 'Today only',
  },
  {
    id: 3,
    code: 'FREESHIP',
    title: 'Free Express Shipping Sitewide',
    desc: 'No minimum spend required. This weekend only.',
    discount: 'FREE',
    badgeBg: '#1B6C4A',
    expires: '3 days left',
  },
  {
    id: 4,
    code: 'VIP15',
    title: '15% Off for Newsletter Subscribers',
    desc: 'Sign up with your email below and the code is yours.',
    discount: '15%',
    badgeBg: '#4A5568',
    icon: '',
    expires: 'Ongoing',
  },
];

export function SpecialOffersPopup() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [time, setTime] = useState({ h: 5, m: 47, s: 33 });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('offers-dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setTime(t => {
        if (t.s > 0) return { ...t, s: t.s - 1 };
        if (t.m > 0) return { ...t, m: t.m - 1, s: 59 };
        if (t.h > 0) return { h: t.h - 1, m: 59, s: 59 };
        return t;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [open]);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem('offers-dismissed', '1');
  };

  const copy = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 2200);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(10,10,26,0.72)', backdropFilter: 'blur(6px)' }}
      onClick={close}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-[520px] w-full overflow-hidden"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Accent stripe */}
        <div className="h-1.5" style={{ background: 'linear-gradient(90deg,#0A0A1A 0%,#D4A017 50%,#D63838 100%)' }} />

        {/* Header */}
        <div className="px-7 pt-6 pb-5" style={{ background: '#0A0A1A' }}>
          <button
            onClick={close}
            className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors rounded-full p-1"
            style={{ zIndex: 10 }}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-1">
            <Tag className="w-5 h-5" style={{ color: '#D4A017' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#D4A017' }}>
              Exclusive Offers
            </span>
          </div>
          <h2 className="text-2xl font-black text-white leading-tight">
            Today's Special Deals
          </h2>
          <p className="text-white/50 text-sm mt-1">
            Copy a code and save at checkout — no sign-in required.
          </p>

          {/* Countdown */}
          <div className="flex items-center gap-2 mt-4 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <Clock className="w-4 h-4 shrink-0" style={{ color: '#D4A017' }} />
            <span className="text-white/70 text-xs">Flash sale ends in:</span>
            <div className="flex gap-1 ml-auto">
              {[
                `${String(time.h).padStart(2, '0')}h`,
                `${String(time.m).padStart(2, '0')}m`,
                `${String(time.s).padStart(2, '0')}s`,
              ].map((unit, i) => (
                <span
                  key={i}
                  className="text-xs font-black px-2 py-1 rounded min-w-[36px] text-center"
                  style={{ background: '#D4A017', color: '#0A0A1A' }}
                >
                  {unit}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Offer cards */}
        <div className="p-5 space-y-3" style={{ background: '#F8F7F5' }}>
          {OFFERS.map(offer => (
            <div
              key={offer.id}
              className="bg-white rounded-xl border p-4 flex items-center gap-4"
              style={{ borderColor: '#E2DFD8' }}
            >
              <div className="text-3xl shrink-0 select-none">{offer.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className="text-xs font-black px-2 py-0.5 rounded-full text-white"
                    style={{ background: offer.badgeBg }}
                  >
                    {offer.discount} OFF
                  </span>
                  <span className="text-xs flex items-center gap-1" style={{ color: '#9896A2' }}>
                    <Clock className="w-3 h-3" />
                    {offer.expires}
                  </span>
                </div>
                <p className="font-bold text-sm leading-tight" style={{ color: '#1A1A2A' }}>
                  {offer.title}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#9896A2' }}>
                  {offer.desc}
                </p>
              </div>
              <button
                onClick={() => copy(offer.code)}
                className="shrink-0 rounded-lg px-3 py-2 text-xs font-black transition-all border-2 border-dashed"
                style={{
                  borderColor: copied === offer.code ? '#1B6C4A' : '#E2DFD8',
                  color: copied === offer.code ? '#1B6C4A' : '#1A1A2A',
                  background: copied === offer.code ? '#F0FBF5' : 'white',
                }}
              >
                {copied === offer.code ? '✓ Copied!' : offer.code}
              </button>
            </div>
          ))}
        </div>

        {/* Newsletter quick-signup */}
        <div className="px-5 pb-5">
          <div className="rounded-xl p-4" style={{ background: '#0A0A1A' }}>
            {subscribed ? (
              <p className="text-center text-sm font-semibold py-1" style={{ color: '#D4A017' }}>
                ✓ You're in! Check your inbox for your exclusive code.
              </p>
            ) : (
              <>
                <p className="text-white text-sm font-semibold mb-3">
                  Get early access to every sale — join our list:
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                    }}
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors"
                    style={{ background: '#D4A017', color: '#0A0A1A' }}
                  >
                    Subscribe
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="px-5 pb-6">
          <button
            onClick={close}
            className="w-full rounded-xl py-3 text-sm font-bold transition-colors border-2"
            style={{ borderColor: '#E2DFD8', color: '#6B6877' }}
          >
            No thanks, continue browsing
          </button>
        </div>
      </div>
    </div>
  );
}
