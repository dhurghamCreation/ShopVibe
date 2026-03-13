import { useState } from 'react';
import { Outlet } from 'react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import { Toaster } from './components/ui/sonner';
import { SpecialOffersPopup } from './components/SpecialOffersPopup';
import { LoginModal } from './components/LoginModal';
import { Chatbot } from './components/Chatbot';
import { WishlistProvider } from './context/WishlistContext';

export function Root() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <Toaster position="bottom-right" />
        <SpecialOffersPopup />
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
        <Chatbot />
      </WishlistProvider>
    </CartProvider>
  );
}
