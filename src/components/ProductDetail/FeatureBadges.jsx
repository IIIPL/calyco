import React from "react";
import { motion } from "framer-motion";

const FeatureBadges = ({ features }) => {
  const getFeatureIcon = (feature) => {
    const name = feature.toLowerCase();
    if (name.includes('voc') || name.includes('low-voc')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    } else if (name.includes('washable') || name.includes('cleanable')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    } else if (name.includes('uv') || name.includes('resistant')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    } else if (name.includes('fast') || name.includes('drying')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    } else if (name.includes('eco') || name.includes('green')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    } else if (name.includes('water') || name.includes('based')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  const getFeatureColor = (feature) => {
    const name = feature.toLowerCase();
    if (name.includes('voc') || name.includes('eco') || name.includes('green')) {
      return "text-green-600 bg-green-50";
    } else if (name.includes('washable') || name.includes('cleanable')) {
      return "text-blue-600 bg-blue-50";
    } else if (name.includes('uv') || name.includes('resistant')) {
      return "text-orange-600 bg-orange-50";
    } else if (name.includes('fast') || name.includes('drying')) {
      return "text-purple-600 bg-purple-50";
    } else if (name.includes('water') || name.includes('based')) {
      return "text-cyan-600 bg-cyan-50";
    }
    return "text-gray-600 bg-gray-50";
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Why Choose This Paint?
      </h2>
      <p className="text-lg text-gray-600 mb-12">
        Premium features that make a difference in your space
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
        {features.map((feature, index) => {
          const colorClasses = getFeatureColor(feature);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl ${colorClasses} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                {getFeatureIcon(feature)}
              </div>
              
              <h3 className="font-semibold text-gray-900 text-sm mb-2">
                {feature}
              </h3>
              
              {/* Feature Description */}
              <div className="text-xs text-gray-500 leading-relaxed">
                {feature.toLowerCase().includes('voc') && "Ultra-low volatile organic compounds for healthier indoor air"}
                {feature.toLowerCase().includes('washable') && "Easy to clean and maintain, perfect for busy households"}
                {feature.toLowerCase().includes('uv') && "Protects against sun damage and color fading"}
                {feature.toLowerCase().includes('fast') && "Quick drying time for faster project completion"}
                {feature.toLowerCase().includes('eco') && "Environmentally friendly and sustainable choice"}
                {feature.toLowerCase().includes('water') && "Easy cleanup with soap and water"}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Trust Indicators */}
      <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Certified Safe</h4>
            <p className="text-sm text-gray-600">Meets all safety standards</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Fast Results</h4>
            <p className="text-sm text-gray-600">Quick application & drying</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Premium Quality</h4>
            <p className="text-sm text-gray-600">Professional-grade materials</p>
          </div>
        </div>
      </div>

      {/* Feature Benefits */}
      <div className="mt-8 p-4 bg-blue-50 rounded-xl max-w-3xl mx-auto">
        <h4 className="font-semibold text-blue-800 mb-2">✨ What These Features Mean for You</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700 text-left">
          <div>
            <p className="font-medium">Health & Safety</p>
            <p className="text-xs">Low VOC means better indoor air quality for your family</p>
          </div>
          <div>
            <p className="font-medium">Easy Maintenance</p>
            <p className="text-xs">Washable surfaces make cleaning a breeze</p>
          </div>
          <div>
            <p className="font-medium">Long-lasting Beauty</p>
            <p className="text-xs">UV resistance keeps colors vibrant for years</p>
          </div>
          <div>
            <p className="font-medium">Project Efficiency</p>
            <p className="text-xs">Fast drying means quicker room completion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureBadges;
