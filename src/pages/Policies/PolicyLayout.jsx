import React from "react";
import { Link } from "react-router-dom";

const Crumb = ({ children }) => (
  <span className="text-sm text-gray-500">{children}</span>
);

export default function PolicyLayout({ title, lastUpdated = "—", children }) {
  return (
    <div className="pt-28 pb-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2">
          <Link to="/" className="text-sm underline text-[#493657]">Home</Link>
          <Crumb>›</Crumb>
          <Link to="/policies" className="text-sm underline text-[#493657]">Policies</Link>
          <Crumb>›</Crumb>
          <Crumb>{title}</Crumb>
        </nav>

        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2c2240]">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">Last updated: {lastUpdated}</p>
        </header>

        <section className="prose prose-sm md:prose-base max-w-none text-[#2c2240]">
          {children}
        </section>
      </div>
    </div>
  );
}
