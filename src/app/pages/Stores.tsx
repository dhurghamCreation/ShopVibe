import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

const STORES = [
  {
    id: 1,
    name: 'ShopVibe Fifth Avenue',
    city: 'New York, NY',
    address: '123 Commerce Street, Fashion District, NY 10001',
    phone: '+1 (800) 555-0199',
    hours: 'Mon-Sat 10:00-20:00, Sun 11:00-18:00',
  },
  {
    id: 2,
    name: 'ShopVibe Westfield',
    city: 'Los Angeles, CA',
    address: '780 Sunset Blvd, Los Angeles, CA 90028',
    phone: '+1 (800) 555-0112',
    hours: 'Mon-Sat 10:00-21:00, Sun 11:00-19:00',
  },
  {
    id: 3,
    name: 'ShopVibe River North',
    city: 'Chicago, IL',
    address: '41 W Superior St, Chicago, IL 60654',
    phone: '+1 (800) 555-0143',
    hours: 'Mon-Sat 10:00-20:00, Sun 11:00-18:00',
  },
];

export function Stores() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg,#F8F7F5 0%,#FFFFFF 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-black mb-2" style={{ color: '#0A0A1A' }}>Find a Store</h1>
        <p className="mb-8" style={{ color: '#6B6877' }}>
          Visit us in person for personal styling help, product testing, and same-day pickup.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {STORES.map(store => (
            <article
              key={store.id}
              className="bg-white rounded-2xl border p-6 hover:-translate-y-1 transition-all"
              style={{ borderColor: '#E2DFD8' }}
            >
              <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: '#A27506' }}>
                {store.city}
              </p>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#0A0A1A' }}>{store.name}</h2>

              <div className="space-y-3 text-sm" style={{ color: '#3A3A4A' }}>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5" style={{ color: '#A27506' }} />
                  <span>{store.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: '#A27506' }} />
                  <a href={`tel:${store.phone.replace(/[^\d+]/g, '')}`} className="hover:underline">{store.phone}</a>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: '#A27506' }} />
                  <span>{store.hours}</span>
                </p>
              </div>

              <button
                className="mt-6 w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                style={{ background: '#0A0A1A', color: 'white' }}
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
