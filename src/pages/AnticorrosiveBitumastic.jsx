import React from "react";
import ProductDetailPage from "./ProductDetailPage";
import { products } from "../data/products";

const AnticorrosiveBitumastic = () => {
  const product = products.find((p) => p.slug === "anticorrosive-bitumastic");
  if (!product) return null;
  return <ProductDetailPage productData={product} />;
};

export default AnticorrosiveBitumastic;
