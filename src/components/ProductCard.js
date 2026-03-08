"use client";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductCard({ product }) {

  const { toggle, wishlist } = useWishlist();
  const { addToCart } = useCart();

 const liked = wishlist.some((item) => item.id === product.id);
  const stars = Math.round(product.rating?.rate || 0);

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  function showMessage(text, msgType) {
    setMessage(text);
    setType(msgType);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  }

  function handleAddCart() {
    addToCart(product);
    showMessage("Product added to cart successfully 🛒", "cart");
  }

 function handleWishlist() {
  if (liked) {
    toggle(product);
    showMessage("Product removed from wishlist ❌", "wishlist");
  } else {
    toggle(product);
    showMessage("Product added to wishlist ❤️", "wishlist");
  }
}

  return (
    <div className="card">

      {/* Wishlist message stays on top */}
      {message && type === "wishlist" && (
        <div className="success-box wishlist">
          {message}
        </div>
      )}

      <div className="card-image-wrap">
        <img src={product.image} alt={product.title} />

        <button
          className={`heart-btn ${liked ? "liked" : ""}`}
          onClick={handleWishlist}
        >
          ❤
        </button>
      </div>

      <div className="card-body">

        <span className="card-category">{product.category}</span>

        <h3>{product.title}</h3>

        <div className="star-row">
          <span className="rating-score">
            {product.rating?.rate.toFixed(1)}
          </span>

          <span className="stars">
            {"★".repeat(stars)}
            {"☆".repeat(5 - stars)}
          </span>

          <span className="rating-count">
            ({product.rating?.count})
          </span>
        </div>

        <p className="card-price">${product.price}</p>

      </div>

      <div className="card-footer">

        <button
          className="card-btn"
          onClick={handleAddCart}
        >
          Add to Cart
        </button>

        {/* Cart message on right side */}
        {message && type === "cart" && (
          <span className="cart-msg">
            {message}
          </span>
        )}

      </div>

    </div>
  );
}