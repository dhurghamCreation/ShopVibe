import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { Product } from '../data/products';

interface WishlistContextType {
  wishlist: Product[];
  isWishlisted: (productId: number) => boolean;
  toggleWishlist: (product: Product) => boolean;
  removeFromWishlist: (productId: number) => void;
  getWishlistCount: () => number;
}

const STORAGE_KEY = 'shopvibe-wishlist';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setWishlist(JSON.parse(raw));
    } catch {
      setWishlist([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const value = useMemo<WishlistContextType>(() => ({
    wishlist,
    isWishlisted: (productId: number) => wishlist.some(item => item.id === productId),
    toggleWishlist: (product: Product) => {
      const exists = wishlist.some(item => item.id === product.id);
      setWishlist(prev =>
        exists ? prev.filter(item => item.id !== product.id) : [...prev, product]
      );
      return !exists;
    },
    removeFromWishlist: (productId: number) => {
      setWishlist(prev => prev.filter(item => item.id !== productId));
    },
    getWishlistCount: () => wishlist.length,
  }), [wishlist]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
