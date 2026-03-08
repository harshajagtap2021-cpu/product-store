"use client";

import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Header() {

  const { wishlist, toggle } = useWishlist();
  const { cartItems, cartCount, removeFromCart } = useCart();

  const [showWishlist, setShowWishlist] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);


  return (
    <header className="header">
      <div className="header-inner">

        <a href="/" className="header-logo">
          Shop<span>Zone</span>
        </a>

        <span className="product-tagline">
          Discover the best deals today ✨
        </span>

        <div className="header-actions">

          {/* Wishlist */}
<div
  className="icon-wrapper"
  onMouseEnter={() => setShowWishlist(true)}
  onMouseLeave={() => setShowWishlist(false)}
>
  <button className="icon-btn">
    🤍 {wishlist.length}
  </button>

  {showWishlist && (
    <div className="dropdown-box">
      <p className="dropdown-title">Wishlist Items</p>

      {wishlist.length === 0 ? (
        <p className="cart-empty-msg">Your wishlist is empty. Add some products to get started!</p>
      ) : (
        wishlist.map((item, index) => (
  <div key={`${item.id}-${index}`} className="cart-item">

            <img
              src={item.image}
              alt={item.title}
              className="cart-img"
            />

            <div className="cart-info">
              <p>{item.title}</p>
              <span>${item.price}</span>
            </div>

            <button
              className="remove-btn"
              onClick={() => toggle(item)}
            >
              ❌
            </button>

          </div>
        ))
      )}

    </div>
  )}
</div>


          {/* Cart */}
          <div
            className="icon-wrapper"
            onMouseEnter={() => setShowCart(true)}
            onMouseLeave={() => setShowCart(false)}
          >
            <button className="icon-btn">
              🛒 {cartCount}
            </button>

            {showCart && (
              <div className="dropdown-box">
                <p className="dropdown-title">Cart Items</p>

                {cartItems.length === 0 ? (
                  <p className="cart-empty-msg">Your cart is empty. Add some products to get started!</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="cart-img"
                      />

                      <div className="cart-info">
                        <p>{item.title}</p>
                        <span>${item.price}{item.quantity > 1 ? ` × ${item.quantity}` : ""}</span>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove from cart"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}

              </div>
            )}
          </div>


          {/* Profile */}
          <div
            className="icon-wrapper"
            onMouseEnter={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
          >
            <button className="icon-btn">👤</button>

            {showProfile && (
              <div className="dropdown-box">

                <p className="profile-title">
                  Hello User
                </p>

                <p className="profile-subtitle">
                  To access your ShopZone account
                </p>

                <button className="signup-btn">
                  Sign Up
                </button>

                <hr />

                <p className="dropdown-item">My Orders</p>
                <p className="dropdown-item">Delete Account</p>

              </div>
            )}

          </div>

        </div>

      </div>
    </header>
  );
}
