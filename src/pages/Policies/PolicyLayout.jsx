import React from "react";
import { Link } from "react-router-dom";

const Crumb = ({ children }) => (
  <span className="text-sm text-gray-500">{children}</span>
);

// Map policy titles to hero images with SEO-optimized alt text and titles
const getHeroDataForPolicy = (title) => {
  const dataMap = {
    "Privacy Policy": {
      src: "/Assets/updated hero images/3.webp",
      alt: "Secure professional office interior - Calyco Paints Privacy Policy and data protection",
      title: "Privacy Policy - Calyco Paints Data Protection & Security"
    },
    "Terms and Conditions": {
      src: "/Assets/updated hero images/4.webp",
      alt: "Professional legal office with painted walls - Calyco Paints Terms and Conditions",
      title: "Terms & Conditions - Calyco Paints Legal Agreement"
    },
    "Shipping & Delivery": {
      src: "/Assets/updated hero images/5.webp",
      alt: "Modern warehouse with organized paint inventory - Calyco Paints Shipping & Delivery",
      title: "Shipping & Delivery Policy - Calyco Paints Nationwide Distribution"
    },
    "Returns & Refunds": {
      src: "/Assets/updated hero images/6.webp",
      alt: "Customer-friendly retail space - Calyco Paints Returns and Refunds Policy",
      title: "Returns & Refunds Policy - Calyco Paints Customer Satisfaction"
    },
    "Warranty Policy": {
      src: "/Assets/updated hero images/7.webp",
      alt: "Premium painted living room showcasing durability - Calyco Paints 10-Year Warranty",
      title: "Warranty Policy - Calyco Paints 10-Year Quality Guarantee"
    },
    "Quality Policy": {
      src: "/Assets/updated hero images/8.webp",
      alt: "Quality control laboratory with paint testing equipment - Calyco Paints Quality Assurance",
      title: "Quality Policy - Calyco Paints Manufacturing Excellence"
    },
    "Environmental Sustainability": {
      src: "/Assets/updated hero images/9.webp",
      alt: "Eco-friendly green architecture with sustainable paint - Calyco Paints Environmental Commitment",
      title: "Environmental Sustainability - Calyco Paints Green & Low-VOC Solutions"
    },
    "Payments & GST": {
      src: "/Assets/updated hero images/10.webp",
      alt: "Modern payment counter with premium finishes - Calyco Paints Payment and GST Information",
      title: "Payments & GST Policy - Calyco Paints Transparent Pricing"
    },
    "Product Color Disclaimer": {
      src: "/Assets/updated hero images/11.webp",
      alt: "Color-accurate painted wall showcase - Calyco Paints Product Color Information",
      title: "Product Color Disclaimer - Calyco Paints Color Accuracy Guide"
    },
    "Customer Service": {
      src: "/Assets/updated hero images/12.webp",
      alt: "Welcoming customer support center - Calyco Paints Customer Service Excellence",
      title: "Customer Service - Calyco Paints Support & Assistance"
    },
  };

  return dataMap[title] || {
    src: "/Assets/updated hero images/13.webp",
    alt: "Premium painted interior space - Calyco Paints Policy Information",
    title: `${title} - Calyco Paints`
  };
};

export default function PolicyLayout({ title, lastUpdated = "—", children }) {
  const heroData = getHeroDataForPolicy(title);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroData.src}
            alt={heroData.alt}
            title={heroData.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#493657]/70 via-[#493657]/50 to-[#493657]/70"></div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {title}
            </h1>
            <p className="text-white/90 text-lg">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2">
          <Link to="/" className="text-sm underline text-[#493657] hover:text-[#D4AF37]">Home</Link>
          <Crumb>›</Crumb>
          <Link to="/policies" className="text-sm underline text-[#493657] hover:text-[#D4AF37]">Policies</Link>
          <Crumb>›</Crumb>
          <Crumb>{title}</Crumb>
        </nav>

        <section className="prose prose-sm md:prose-base max-w-none text-[#2c2240]">
          {children}
        </section>
      </div>
    </div>
  );
}
