"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};

    // Name validation (only letters and spaces)
    const namePattern = /^[A-Za-z\s]+$/;

    if (!name.trim()) {
      e.name = "Name is required";
    } else if (!namePattern.test(name)) {
      e.name = "Name should contain only letters";
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      e.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      e.email = "Enter a valid email address";
    }

    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      console.log("📬 Subscribed:", { name, email, at: new Date().toISOString() });
      setSuccess(true);
      setName("");
      setEmail("");

      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-wrap">

        {/* Left: copy */}
        <div className="newsletter-left">
          <h2>Get <em>exclusive</em> deals straight to your inbox</h2>
          <p>
            Join thousands of smart shoppers. We send curated deals,
            early-access sales, and new arrivals — never spam.
          </p>
        </div>

        {/* Right: form */}
        <form className="newsletter newsletter-form" onSubmit={handleSubmit} noValidate>

          <div className="input-group">
            <label htmlFor="nl-name">Full Name</label>
            <input
              id="nl-name"
              type="text"
              placeholder="Jane Doe"
              value={name}
              className={errors.name ? "error" : ""}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="nl-email">Email Address</label>
            <input
              id="nl-email"
              type="email"
              placeholder="jane@example.com"
              value={email}
              className={errors.email ? "error" : ""}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          {success ? (
            <div className="success-banner">
              🎉 You're subscribed successfully!
            </div>
          ) : (
            <button type="submit" className="newsletter-btn">
              Subscribe Now →
            </button>
          )}

        </form>

      </div>
    </section>
  );
}