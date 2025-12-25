import React from "react";
import ProductDetailPage from "./ProductDetailPage";
import { products } from "../data/products";

const WoodPrimer = () => {
  const product = products.find((p) => p.slug === "wood-primer");
  if (!product) return null;
  return <ProductDetailPage productData={product} />;
};

export default WoodPrimer;
