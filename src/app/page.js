
"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Header onSearch={setSearchQuery} />
      <ProductList searchQuery={searchQuery} />
      <NewsletterForm/>
      <Footer />
    </>
  );
}