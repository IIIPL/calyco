import React from "react";
import ProductDetailPage from "./ProductDetailPage";
import { products } from "../data/products";

const EpoxyPaint = () => {
  const product = products.find((p) => p.slug === "epoxy-paint");
  if (!product) return null;
  return <ProductDetailPage productData={product} />;
};

export default EpoxyPaint;
