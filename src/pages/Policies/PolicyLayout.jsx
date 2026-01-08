import React from "react";
import { Link } from "react-router-dom";

const Crumb = ({ children }) => (
  <span className="text-sm text-gray-500">{children}</span>
);

// Map policy titles to hero images
const getHeroImageForPolicy = (title) => {
  const imageMap = {
    "Privacy Policy": "/Assets/updated hero images/3.webp",
    "Terms and Conditions": "/Assets/updated hero images/4.webp",
    "Shipping & Delivery": "/Assets/updated hero images/5.webp",
    "Returns & Refunds": "/Assets/updated hero images/6.webp",
    "Warranty Policy": "/Assets/updated hero images/7.webp",
    "Quality Policy": "/Assets/updated hero images/8.webp",
    "Environmental Sustainability": "/Assets/updated hero images/9.webp",
    "Payments & GST": "/Assets/updated hero images/10.webp",
    "Product Color Disclaimer": "/Assets/updated hero images/11.webp",
    "Customer Service": "/Assets/updated hero images/12.webp",
  };

  return imageMap[title] || "/Assets/updated hero images/13.webp"; // Default fallback
};

export default function PolicyLayout({ title, lastUpdated = "—", children }) {
  const heroImage = getHeroImageForPolicy(title);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={title}
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
