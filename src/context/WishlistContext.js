"use client";

import { createContext, useContext, useState, useEffect } from "react";

const WishlistCtx = createContext();

export function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Add or Remove product
  const toggle = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        // remove product
        return prev.filter((item) => item.id !== product.id);
      } else {
        // add product
        return [...prev, product];
      }
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