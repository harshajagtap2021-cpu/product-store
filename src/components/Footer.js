"use client";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <p className="footer-logo">Shop<span>Zone</span></p>

        <p className="footer-copy">© {new Date().getFullYear()} ShopZone. All rights reserved.</p>

      </div>
    </footer>
  );
}
