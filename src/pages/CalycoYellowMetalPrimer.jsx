import React from "react";
import ProductDetailPage from "./ProductDetailPage";
import { products } from "../data/products";

const CalycoYellowMetalPrimer = () => {
  const product = products.find((p) => p.slug === "calyco-yellow-metal-primer");
  if (!product) return null;
  return <ProductDetailPage productData={product} />;
};

export default CalycoYellowMetalPrimer;
