import React from "react";
import ProductDetailPage from "./ProductDetailPage";
import { products } from "../data/products";

const RedOxideZincChromate = () => {
  const product = products.find((p) => p.slug === "red-oxide-zinc-chromate");
  if (!product) return null;
  return <ProductDetailPage productData={product} />;
};

export default RedOxideZincChromate;
