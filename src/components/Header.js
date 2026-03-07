"use client";
import Link from "next/link";
import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Header({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const { wishlist } = useWishlist();
  const { cartCount } = useCart();

  function handleSearch(e) {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  }

  return (
    <header className="header">
      <div className="header-inner">

        <a href="/" className="header-logo">
          Shop<span>Zone</span>
        </a>

        {/* Search Box */}
        <div className="search-box">
          
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={handleSearch}
            className="search-input"
          /><span className="search-icon">🔍</span>
        </div>

        <div className="header-actions">
          <button className="icon-btn">🤍 {wishlist.size}</button>
          <button className="icon-btn">🛒 {cartCount}</button>
          <button className="icon-btn">👤</button>
        </div>

      </div>
    </header>
  );
}