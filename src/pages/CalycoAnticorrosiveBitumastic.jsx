import React from "react";
import ProductDetailPage from "./ProductDetailPage";
import { products } from "../data/products";

const CalycoAnticorrosiveBitumastic = () => {
  const product = products.find((p) => p.slug === "calyco-anticorrosive-bitumastic");
  if (!product) return null;
  return <ProductDetailPage productData={product} />;
};

export default CalycoAnticorrosiveBitumastic;
