import React from "react";
import ProductDetailPage from "./ProductDetailPage";
import { products } from "../data/products";

const CalycoFireRetardantPaint = () => {
  const product = products.find((p) => p.slug === "calyco-fire-retardant-paint");
  if (!product) return null;
  return <ProductDetailPage productData={product} />;
};

export default CalycoFireRetardantPaint;
