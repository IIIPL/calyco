import React from "react";
import ProductDetailPage from "./ProductDetailPage";
import { products } from "../data/products";

const CalycoRedOxideZincChromate = () => {
  const product = products.find((p) => p.slug === "calyco-red-oxide-zinc-chromate");
  if (!product) return null;
  return <ProductDetailPage productData={product} />;
};

export default CalycoRedOxideZincChromate;
