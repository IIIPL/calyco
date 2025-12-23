import React from "react";
import ProductDetailPage from "./ProductDetailPage";
import { products } from "../data/products";

const CalycoMelaminePolish = () => {
  const product = products.find((p) => p.slug === "calyco-melamine-polish");
  if (!product) return null;
  return <ProductDetailPage productData={product} />;
};

export default CalycoMelaminePolish;
