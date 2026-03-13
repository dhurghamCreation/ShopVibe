import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, ChevronDown } from 'lucide-react';
import { products } from '../data/products';

type Msg = { from: 'bot' | 'user'; text: string; time: string };

const QUICK_REPLIES = ['Track my order', 'Return policy', "Today's deals", 'Shipping info', 'Contact support'];

const BOT_RESPONSES: Record<string, string> = {
  track: "To track your order, visit My Account → My Orders. You'll see live tracking for every shipment. Need help finding something specific? 📦",
  return: "We have a 30-day hassle-free return policy. Items must be unworn and in original packaging. Start a return from your account page — it takes under 2 minutes. ✅",
  deals: "🔥 Right now: 50% off 200+ items during our flash sale! Use code WELCOME20 for 20% off your first order. Free shipping sitewide this weekend with code FREESHIP.",
  contact: "Here's how to reach our team:\n📧 support@shopvibe.com\n📞 +1 (800) 555-0199\n⏰ Mon–Fri, 9am–6pm EST\n\nWe usually reply within 1 hour!",
  shipping: "Standard shipping is free on orders over $50. Express delivery (2–3 days) is $9.99, and next-day delivery is $19.99. We ship to 30+ countries. 🚚",
  store: "You can find us at 123 Commerce Street, Fashion District, New York, NY 10001. Store hours are Mon–Sat 10:00–20:00, Sun 11:00–18:00. You can also call +1 (800) 555-0199 before visiting.",
  account: "To access your account, click My Account in the top navigation and sign in. From there you can track orders, manage addresses, and save your wishlist.",
  shop: "Here's how to shop on ShopVibe:\n1. Browse Men, Women, or any category from the top navigation.\n2. Open a product page to choose color, size, and quantity.\n3. Click Add to Cart or Buy Now.\n4. Open Cart in the top-right corner and proceed to checkout.\n5. Enter shipping and payment details to place your order.\n\nIf you want, I can also help you find something specific by budget or category.",
  men: "For Men's products, use the Men tab in the navbar or go to /products?gender=men. You'll find hundreds of items, including unisex picks.",
  women: "For Women's products, use the Women tab in the navbar or go to /products?gender=women. You'll get the latest edit plus unisex selections.",
  size: "All our clothing pages have a detailed size guide button near the size selector. Need a specific item's measurements? Just tell me the product name!",
  payment: "We accept Visa, Mastercard, Amex, PayPal, Apple Pay, and Google Pay. All transactions are SSL-encrypted. 🔒",
  hello: "Hi there! 👋 Welcome to ShopVibe. I'm Vibe, your personal shopping assistant. How can I help you today?",
  help: "I can help with:\n• Order tracking & shipping\n• Returns & exchanges\n• Current deals & promo codes\n• Size guides\n• Payment questions\n\nJust ask!",
  default: "I'm not quite sure about that one. You can reach our human support team at support@shopvibe.com or call +1 (800) 555-0199 and they'll sort you out right away!",
};

function getBotReply(msg: string): string {
  const l = msg.toLowerCase();
  const hasWord = (word: string) => new RegExp(`(^|\\b)${word}(\\b|$)`, 'i').test(msg);
  const hasAny = (words: string[]) => words.some(word => hasWord(word));

  if (hasAny(['hello', 'hey', 'hiya', 'hi'])) return BOT_RESPONSES.hello;
  if (hasAny(['help', 'assist'])) return BOT_RESPONSES.help;
  if (l.includes('how can i shop') || l.includes('how do i shop') || l.includes('how to buy') || l.includes('how can i buy') || (l.includes('shop') && l.includes('website'))) return BOT_RESPONSES.shop;
  if (l.includes('store') || l.includes('location') || l.includes('address') || l.includes('find')) return BOT_RESPONSES.store;
  if (l.includes('account') || l.includes('login') || l.includes('sign in') || l.includes('register')) return BOT_RESPONSES.account;
  if (l.includes('men') || l.includes("men's") || l.includes('male')) return BOT_RESPONSES.men;
  if (l.includes('women') || l.includes("women's") || l.includes('female')) return BOT_RESPONSES.women;
  if (l.includes('track') || l.includes('order') || l.includes('where is') || l.includes('status')) return BOT_RESPONSES.track;
  if (l.includes('return') || l.includes('refund') || l.includes('exchange') || l.includes('send back')) return BOT_RESPONSES.return;
  if (l.includes('deal') || l.includes('offer') || l.includes('discount') || l.includes('sale') || l.includes('promo') || l.includes('coupon') || l.includes('code')) return BOT_RESPONSES.deals;
  if (l.includes('contact') || l.includes('phone') || l.includes('email') || l.includes('call') || l.includes('support')) return BOT_RESPONSES.contact;
  if (l.includes('ship') || l.includes('delivery') || l.includes('deliver') || l.includes('arrive')) return BOT_RESPONSES.shipping;
  if (l.includes('size') || l.includes('fit') || l.includes('measurement')) return BOT_RESPONSES.size;
  if (l.includes('pay') || l.includes('payment') || l.includes('card') || l.includes('paypal') || l.includes('checkout')) return BOT_RESPONSES.payment;

  const terms = l.split(/\s+/).filter(word => word.length > 2);
  const matches = products
    .filter(p => terms.some(term => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)))
    .slice(0, 3);

  if (matches.length > 0) {
    const suggestions = matches
      .map(p => `• ${p.name} — $${p.price}`)
      .join('\n');
    return `I found some great matches for you:\n${suggestions}\n\nTell me your budget or preferred category and I'll narrow this down further.`;
  }

  return `${BOT_RESPONSES.default}\n\nYou can also ask me things like: "show men's jackets", "best perfumes under $80", or "top-rated electronics".`;
}

function getTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: 'bot',
      text: "Hi! 👋 I'm Vibe, your ShopVibe assistant. I can help with orders, returns, deals, shipping, and more. What do you need?",
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages(m => [...m, { from: 'user', text: trimmed, time: getTime() }]);
    setInput('');
    setTyping(true);
    const delay = 700 + Math.random() * 700;
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { from: 'bot', text: getBotReply(trimmed), time: getTime() }]);
      if (!open) setUnread(u => u + 1);
    }, delay);
  };

  const handleOpen = () => {
    setOpen(true);
    setUnread(0);
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => (open ? setOpen(false) : handleOpen())}
        className="fixed bottom-6 right-6 z-[9990] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{ background: '#0A0A1A' }}
        aria-label="Open chat"
      >
        {open ? (
          <ChevronDown className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
        {!open && unread > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-black border-2 border-white"
            style={{ background: '#D63838' }}
          >
            {unread}
          </span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-[9990] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border"
          style={{ width: '360px', height: '500px', borderColor: '#E2DFD8', maxWidth: 'calc(100vw - 24px)' }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center gap-3 shrink-0"
            style={{ background: '#0A0A1A' }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background: '#D4A017' }}
            >
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm">Vibe — Shopping Assistant</p>
              <p className="text-white/50 text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Online · Replies instantly
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/50 hover:text-white transition-colors rounded p-1"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3"
            style={{ background: '#F8F7F5' }}
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                {m.from === 'bot' && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: '#D4A017' }}
                  >
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div className={`max-w-[78%]`}>
                  <div
                    className="px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
                    style={
                      m.from === 'user'
                        ? { background: '#0A0A1A', color: 'white', borderBottomRightRadius: '4px' }
                        : {
                            background: 'white',
                            color: '#1A1A2A',
                            border: '1px solid #E2DFD8',
                            borderBottomLeftRadius: '4px',
                          }
                    }
                  >
                    {m.text}
                  </div>
                  <p
                    className="text-xs mt-1 px-1"
                    style={{ color: '#9896A2', textAlign: m.from === 'user' ? 'right' : 'left' }}
                  >
                    {m.time}
                  </p>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex items-end gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: '#D4A017' }}
                >
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div
                  className="px-3.5 py-3 rounded-2xl flex gap-1.5 items-center border"
                  style={{ background: 'white', borderColor: '#E2DFD8', borderBottomLeftRadius: '4px' }}
                >
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ background: '#9896A2', animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div
            className="px-3 py-2 flex gap-2 overflow-x-auto shrink-0 border-t"
            style={{ background: 'white', borderColor: '#E2DFD8' }}
          >
            {QUICK_REPLIES.map(qr => (
              <button
                key={qr}
                onClick={() => send(qr)}
                className="shrink-0 text-xs rounded-full px-3 py-1.5 transition-all border whitespace-nowrap font-medium"
                style={{ borderColor: '#E2DFD8', color: '#1A1A2A', background: '#F8F7F5' }}
                onMouseEnter={e => {
                  (e.target as HTMLButtonElement).style.borderColor = '#D4A017';
                  (e.target as HTMLButtonElement).style.color = '#D4A017';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLButtonElement).style.borderColor = '#E2DFD8';
                  (e.target as HTMLButtonElement).style.color = '#1A1A2A';
                }}
              >
                {qr}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={e => { e.preventDefault(); send(input); }}
            className="flex gap-2 p-3 shrink-0 border-t"
            style={{ background: 'white', borderColor: '#E2DFD8' }}
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Message Vibe…"
              className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
              style={{
                background: '#F4F2ED',
                color: '#1A1A2A',
                border: '1.5px solid transparent',
              }}
              onFocus={e => (e.target.style.borderColor = '#D4A017')}
              onBlur={e => (e.target.style.borderColor = 'transparent')}
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all"
              style={{ background: '#0A0A1A' }}
              aria-label="Send"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
