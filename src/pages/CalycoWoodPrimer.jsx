import React from "react";
import ProductDetailPage from "./ProductDetailPage";
import { products } from "../data/products";

const CalycoWoodPrimer = () => {
  const product = products.find((p) => p.slug === "calyco-wood-primer");
  if (!product) return null;
  return <ProductDetailPage productData={product} />;
};

export default CalycoWoodPrimer;
