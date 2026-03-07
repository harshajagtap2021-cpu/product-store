"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ searchQuery }) {

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const [priceFilter, setPriceFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState(0);

  useEffect(() => {
    fetch("/api/fakeStore")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // get unique categories
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

  // sort products
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

  // clear filters
  function clearFilters() {
    setCategory("All");
    setPriceFilter("all");
    setRatingFilter(0);
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

        <h4>Price 💰</h4>

        <button onClick={() => setPriceFilter("0-50")}>
          $0 - $50
        </button>

        <button onClick={() => setPriceFilter("50-100")}>
          $50 - $100
        </button>

        <button onClick={() => setPriceFilter("100+")}>
          $100+
        </button>

        <h4>Rating ⭐</h4>

        <button onClick={() => setRatingFilter(4)}>
          ⭐ 4 & up
        </button>

        <button onClick={() => setRatingFilter(3)}>
          ⭐ 3 & up
        </button>

        <button onClick={() => setRatingFilter(2)}>
          ⭐ 2 & up
        </button>

      

      </aside>


      {/* Main Section */}
      <div className="shop-main">

        {/* Toolbar */}
        <div className="shop-toolbar">

          <span>{filtered.length} Products</span>
 <span className="product-tagline">
    Discover the best deals today ✨
  </span>
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

          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>

      </div>

    </div>
  );
}