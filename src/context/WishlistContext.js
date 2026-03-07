"use client";

import { createContext, useContext, useState, useEffect } from "react";

const WishlistCtx = createContext();

export function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState(new Set());

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      setWishlist(new Set(JSON.parse(stored)));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify([...wishlist]));
  }, [wishlist]);

  const toggle = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <WishlistCtx.Provider value={{ wishlist, toggle }}>
      {children}
    </WishlistCtx.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistCtx);
}