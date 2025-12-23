import React from "react";
import ProductDetailPage from "./ProductDetailPage";
import { products } from "../data/products";

const CalycoEpoxyPaint = () => {
  const product = products.find((p) => p.slug === "calyco-epoxy-paint");
  if (!product) return null;
  return <ProductDetailPage productData={product} />;
};

export default CalycoEpoxyPaint;
