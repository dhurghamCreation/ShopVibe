import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import {
  Facebook, Twitter, Instagram, Youtube, Mail,
  MapPin, Phone, Clock, Shield, RefreshCw, Headphones, CreditCard,
  ChevronDown, ChevronUp,
} from 'lucide-react';

const SHOP_LINKS = [
  { label: "Men's Collection", href: '/products?gender=men' },
  { label: "Women's Collection", href: '/products?gender=women' },
  { label: 'New Arrivals', href: '/products?tag=new' },
  { label: 'Best Sellers', href: '/products?tag=bestseller' },
  { label: 'Electronics', href: '/products?category=Electronics' },
  { label: 'Beauty & Skincare', href: '/products?category=Beauty' },
  { label: 'Accessories', href: '/products?category=Accessories' },
  { label: 'Jewellery', href: '/products?category=Jewelry' },
  { label: 'Sale Items', href: '/products?tag=bestseller' },
];

const HELP_LINKS = [
  { label: 'Contact Us', href: '#' },
  { label: 'Track Your Order', href: '#' },
  { label: 'Returns & Exchanges', href: '#' },
  { label: 'Shipping & Delivery', href: '#' },
  { label: 'Size Guide', href: '#' },
  { label: 'FAQ', href: '#' },
  { label: 'Gift Cards', href: '#' },
  { label: 'Student Discount', href: '#' },
];

const COMPANY_LINKS = [
  { label: 'About ShopVibe', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Press & Media', href: '#' },
  { label: 'Sustainability', href: '#' },
  { label: 'Affiliate Program', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Settings', href: '#' },
];

const PAYMENT_ICONS = [
  { name: 'Visa', color: '#1A1F71' },
  { name: 'MC', color: '#EB001B' },
  { name: 'Amex', color: '#006FCF' },
  { name: 'PayPal', color: '#009CDE' },
  { name: 'Apple', color: '#1A1A2A' },
  { name: 'GPay', color: '#1A73E8' },
];

function FooterLink({ href, label, isRouter = false }: { href: string; label: string; isRouter?: boolean }) {
  const [hov, setHov] = useState(false);
  const style: React.CSSProperties = {
    color: hov ? '#D4A017' : 'rgba(255,255,255,0.55)',
    transform: hov ? 'translateX(6px)' : 'translateX(0)',
    transition: 'color 0.2s ease, transform 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '14px',
    lineHeight: '1.5',
    textDecoration: 'none',
  };
  const arrow = (
    <span
      style={{
        opacity: hov ? 1 : 0,
        transform: hov ? 'translateX(0)' : 'translateX(-4px)',
        transition: 'opacity 0.2s, transform 0.2s',
        fontSize: '13px',
        color: '#D4A017',
        fontWeight: 700,
      }}
    >›</span>
  );
  if (isRouter) {
    return (
      <Link to={href} style={style} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
        {arrow}{label}
      </Link>
    );
  }
  return (
    <a href={href} style={style} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {arrow}{label}
    </a>
  );
}

function TrustBadge({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="flex items-start gap-3 rounded-xl p-3 cursor-default"
      style={{
        background: hov ? 'rgba(212,160,23,0.07)' : 'transparent',
        border: `1px solid ${hov ? 'rgba(212,160,23,0.25)' : 'transparent'}`,
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'background 0.25s, border 0.25s, transform 0.25s',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
        style={{
          background: hov ? 'rgba(212,160,23,0.22)' : 'rgba(255,255,255,0.07)',
          color: '#D4A017',
          transform: hov ? 'scale(1.12) rotate(-6deg)' : 'scale(1) rotate(0deg)',
          boxShadow: hov ? '0 0 14px rgba(212,160,23,0.35)' : 'none',
          transition: 'background 0.25s, transform 0.25s, box-shadow 0.25s',
        }}
      >
        {icon}
      </div>
      <div>
        <p
          className="font-bold text-sm"
          style={{ color: hov ? '#D4A017' : 'white', transition: 'color 0.2s' }}
        >{title}</p>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{desc}</p>
      </div>
    </div>
  );
}

function PaymentBadge({ name, color }: { name: string; color: string }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      className="px-3 py-1.5 rounded-lg text-xs font-black cursor-default select-none"
      style={{
        border: `1px solid ${hov ? color : 'rgba(255,255,255,0.15)'}`,
        color: hov ? color : 'rgba(255,255,255,0.7)',
        background: hov ? `${color}18` : 'rgba(255,255,255,0.07)',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hov ? `0 4px 10px ${color}25` : 'none',
        transition: 'all 0.2s ease',
        display: 'inline-block',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {name}
    </span>
  );
}

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b md:border-b-0" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
      <button
        className="w-full flex items-center justify-between py-4 md:py-0 text-left text-white font-bold text-sm tracking-wide"
        onClick={() => setOpen(o => !o)}
      >
        {title}
        <span className="md:hidden">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>
      <div className={`${open ? 'block' : 'hidden'} md:block pb-4 md:pb-0`}>
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={{ background: '#0A0A1A', color: 'white' }}>
      {/* Trust badges */}
      <div
        className="border-b"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TrustBadge icon={<RefreshCw className="w-5 h-5" />} title="30-Day Returns" desc="Hassle-free returns on all orders" />
            <TrustBadge icon={<Shield className="w-5 h-5" />} title="Secure Checkout" desc="SSL encrypted, 100% protected" />
            <TrustBadge icon={<CreditCard className="w-5 h-5" />} title="Flexible Payment" desc="Buy now, pay later options" />
            <TrustBadge icon={<Headphones className="w-5 h-5" />} title="24/7 Support" desc="We're always here to help" />
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="md:col-span-3">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <span className="text-xl font-black" style={{ letterSpacing: '-0.02em' }}>
                Shop<span style={{ color: '#D4A017' }}>Vibe</span>
              </span>
            </div>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Your destination for premium fashion, electronics, beauty, and lifestyle. Curated with care, delivered with love.
            </p>

            {/* Social icons */}
            <div className="flex gap-2 mb-6">
              {[
                { Icon: Facebook, label: 'Facebook', hover: '#1877F2' },
                { Icon: Instagram, label: 'Instagram', hover: '#E1306C' },
                { Icon: Twitter, label: 'Twitter', hover: '#1DA1F2' },
                { Icon: Youtube, label: 'YouTube', hover: '#FF0000' },
              ].map(({ Icon, label, hover }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
                  onMouseEnter={e => (e.currentTarget.style.background = hover)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Find Us */}
            <div className="space-y-3">
              <p className="text-xs font-black tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Find Us
              </p>
              <div className="flex items-start gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#D4A017' }} />
                <span>123 Commerce Street, Fashion District, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <Phone className="w-4 h-4 shrink-0" style={{ color: '#D4A017' }} />
                <a href="tel:+18005550199" className="hover:text-white transition-colors">+1 (800) 555-0199</a>
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <Mail className="w-4 h-4 shrink-0" style={{ color: '#D4A017' }} />
                <a href="mailto:support@shopvibe.com" className="hover:text-white transition-colors">support@shopvibe.com</a>
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <Clock className="w-4 h-4 shrink-0" style={{ color: '#D4A017' }} />
                <span>Mon–Fri: 9am–6pm EST</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            {/* Shop */}
            <AccordionSection title="Shop">
              <ul className="space-y-2.5 mt-1">
                {SHOP_LINKS.map(l => (
                  <li key={l.label}>
                    <FooterLink href={l.href} label={l.label} isRouter />
                  </li>
                ))}
              </ul>
            </AccordionSection>

            {/* Help */}
            <AccordionSection title="Help & Support">
              <ul className="space-y-2.5 mt-1">
                {HELP_LINKS.map(l => (
                  <li key={l.label}>
                    <FooterLink href={l.href} label={l.label} />
                  </li>
                ))}
              </ul>
            </AccordionSection>

            {/* Company */}
            <AccordionSection title="Company">
              <ul className="space-y-2.5 mt-1">
                {COMPANY_LINKS.map(l => (
                  <li key={l.label}>
                    <FooterLink href={l.href} label={l.label} />
                  </li>
                ))}
              </ul>
            </AccordionSection>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <p className="font-bold text-sm tracking-wide mb-1">Stay in the loop</p>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
              New arrivals, exclusive offers, and style inspiration — straight to your inbox.
            </p>
            {subscribed ? (
              <div
                className="rounded-xl p-4 text-center text-sm font-semibold"
                style={{ background: 'rgba(27,108,74,0.25)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}
              >
                ✓ You're subscribed! Expect great things.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div
                  className="flex items-center rounded-xl overflow-hidden border"
                  style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)' }}
                >
                  <Mail className="w-4 h-4 ml-3 shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 bg-transparent px-3 py-3 text-sm outline-none text-white placeholder-white/30"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: '#D4A017', color: '#0A0A1A' }}
                >
                  Subscribe & Save
                </button>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </form>
            )}

            <div className="mt-6 space-y-2">
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Customer care
              </p>
              <div className="rounded-xl p-3 text-sm" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.65)' }}>
                Live chat, email support, store visits, and order tracking are all available directly on the website.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Secure payments via:
            </p>
            {PAYMENT_ICONS.map(p => (
              <PaymentBadge key={p.name} name={p.name} color={p.color} />
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <Shield className="w-3.5 h-3.5 shrink-0" />
            256-bit SSL · PCI DSS Level 1 Compliant
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
          <p>© 2026 ShopVibe Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map(item => (
              <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
