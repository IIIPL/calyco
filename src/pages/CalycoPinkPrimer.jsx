import React from "react";
import ProductDetailPage from "./ProductDetailPage";
import { products } from "../data/products";

const CalycoPinkPrimer = () => {
  const product = products.find((p) => p.slug === "calyco-pink-primer");
  if (!product) return null;
  return <ProductDetailPage productData={product} />;
};

export default CalycoPinkPrimer;
