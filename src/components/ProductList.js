"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductList() {

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const [priceFilter, setPriceFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/fakeStore")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // categories
  const categories = ["All", ...new Set(products.map(p => p.category))];

  let filtered = [...products];

  // category filter
  if (category !== "All") {
    filtered = filtered.filter(p => p.category === category);
  }

  // search filter
  if (searchQuery) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // price filter
  if (priceFilter === "0-50") {
    filtered = filtered.filter(p => p.price <= 50);
  }

  if (priceFilter === "50-100") {
    filtered = filtered.filter(p => p.price > 50 && p.price <= 100);
  }

  if (priceFilter === "100+") {
    filtered = filtered.filter(p => p.price > 100);
  }

  // rating filter
  if (ratingFilter > 0) {
    filtered = filtered.filter(p => p.rating.rate >= ratingFilter);
  }

  // sorting
  if (sortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  if (sortBy === "name") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="shop-layout">

      {/* Sidebar */}
      <aside className="sidebar">

        <h3>Categories</h3>

        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-btn ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}

        <h3>Price</h3>

        <button
          className={`cat-btn ${priceFilter === "all" ? "active" : ""}`}
          onClick={() => setPriceFilter("all")}
        >
          All
        </button>

        <button
          className={`cat-btn ${priceFilter === "0-50" ? "active" : ""}`}
          onClick={() => setPriceFilter("0-50")}
        >
          $0 - $50
        </button>

        <button
          className={`cat-btn ${priceFilter === "50-100" ? "active" : ""}`}
          onClick={() => setPriceFilter("50-100")}
        >
          $50 - $100
        </button>

        <button
          className={`cat-btn ${priceFilter === "100+" ? "active" : ""}`}
          onClick={() => setPriceFilter("100+")}
        >
          $100+
        </button>

        <h3>Rating</h3>

        <button
          className={`cat-btn ${ratingFilter === 0 ? "active" : ""}`}
          onClick={() => setRatingFilter(0)}
        >
          All
        </button>

        <button
          className={`cat-btn ${ratingFilter === 4 ? "active" : ""}`}
          onClick={() => setRatingFilter(4)}
        >
          ⭐ 4 & up
        </button>

        <button
          className={`cat-btn ${ratingFilter === 3 ? "active" : ""}`}
          onClick={() => setRatingFilter(3)}
        >
          ⭐ 3 & up
        </button>

        <button
          className={`cat-btn ${ratingFilter === 2 ? "active" : ""}`}
          onClick={() => setRatingFilter(2)}
        >
          ⭐ 2 & up
        </button>

      </aside>


      {/* Main Section */}
      <div className="shop-main">

        {/* Toolbar */}
        <div className="shop-toolbar">

          <span>{filtered.length} Products</span>

          {/* Search */}
          <div className="search-box">

            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              spellCheck="false"
            />

            <span className="search-icon">🔍</span>

          </div>

          {/* Sort */}
          <div>
            <label>Sort by: </label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Rating</option>
              <option value="name">Name A → Z</option>
            </select>

          </div>

        </div>


        {/* Products */}
        <div className="product-grid">

          {filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found 🔍</p>
          )}

        </div>

      </div>

    </div>
  );
}