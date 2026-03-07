"use client";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {

  const { toggle, wishlist } = useWishlist();
  const { addToCart } = useCart();

  const liked = wishlist.has(product.id);

  // calculate stars
  const stars = Math.round(product.rating?.rate || 0);

  return (
    <div className="card">

      <div className="card-image-wrap">
        <img src={product.image} alt={product.title} />

        <button
          className={`heart-btn ${liked ? "liked" : ""}`}
          onClick={() => toggle(product.id)}
        >
          ❤
        </button>
      </div>

      <div className="card-body">

        <span className="card-category">{product.category}</span>

        <h3>{product.title}</h3>

        {/* ⭐ Rating */}
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
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}