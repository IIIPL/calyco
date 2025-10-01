import React from "react";
import { motion } from "framer-motion";

const AssuranceStrip = () => {
  const assurances = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Green Certified",
      description: "Eco-friendly and low-VOC certified",
      color: "green"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Performance Warranty",
      description: "5-year performance guarantee",
      color: "blue"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
        </svg>
      ),
      title: "7-Day Support",
      description: "Round-the-clock customer assistance",
      color: "purple"
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case "green":
        return "text-green-600 bg-green-50";
      case "blue":
        return "text-blue-600 bg-blue-50";
      case "purple":
        return "text-purple-600 bg-purple-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Our Assurance to You
      </h2>
      <p className="text-lg text-gray-600 mb-12">
        Quality, performance, and support you can count on
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {assurances.map((assurance, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="text-center group"
          >
            <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${getColorClasses(assurance.color)} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              {assurance.icon}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {assurance.title}
            </h3>
            
            <p className="text-gray-600 leading-relaxed">
              {assurance.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Additional Trust Indicators */}
      <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">10M+</div>
            <div className="text-sm text-gray-600">Liters Sold</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">50K+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">25+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">99%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>

      {/* Certification Details */}
      <div className="mt-8 p-6 bg-green-50 rounded-2xl max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-green-800 mb-4">Environmental Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">Low VOC</h4>
            <p className="text-sm text-green-700">
              Meets or exceeds all low-VOC standards for healthier indoor air quality
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">Eco-Friendly</h4>
            <p className="text-sm text-green-700">
              Water-based formula with minimal environmental impact
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">Safe for Kids</h4>
            <p className="text-sm text-green-700">
              Non-toxic and safe for use in children's rooms and nurseries
            </p>
          </div>
        </div>
      </div>

      {/* Warranty Details */}
      <div className="mt-8 p-6 bg-blue-50 rounded-2xl max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Performance Warranty</h3>
        <div className="text-left space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-blue-700">
              <strong>5-year performance guarantee</strong> covering color retention, adhesion, and durability
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-blue-700">
              <strong>Coverage includes:</strong> peeling, blistering, cracking, and excessive fading
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-blue-700">
              <strong>Warranty applies</strong> when used according to application instructions
            </p>
          </div>
        </div>
      </div>

      {/* Support Information */}
      <div className="mt-8 p-6 bg-purple-50 rounded-2xl max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-purple-800 mb-4">Customer Support</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div>
            <h4 className="font-semibold text-purple-800 mb-2">Technical Support</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Application guidance and troubleshooting</li>
              <li>• Surface preparation advice</li>
              <li>• Color consultation and matching</li>
              <li>• Project planning assistance</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-purple-800 mb-2">Contact Options</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• 24/7 online chat support</li>
              <li>• Phone support: 9 AM - 6 PM</li>
              <li>• Email response within 2 hours</li>
              <li>• Video consultation available</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <button className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
            Get Support Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssuranceStrip;
