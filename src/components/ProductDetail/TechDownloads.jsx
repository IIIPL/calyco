import React, { useState } from "react";
import { motion } from "framer-motion";

const TechDownloads = ({ documents, specs }) => {
  const [showTooltip, setShowTooltip] = useState(null);

  const handleDownload = (type, url) => {
    if (!url || url === "missing") {
      return;
    }
    
    // TODO: Implement actual download logic
    console.log(`Downloading ${type}:`, url);
    
    // Simulate download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${type.toUpperCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isDocumentAvailable = (url) => {
    return url && url !== "missing" && url !== "/public/docs/";
  };

  const getDocumentStatus = (url) => {
    if (isDocumentAvailable(url)) {
      return "available";
    }
    return "unavailable";
  };

  const documentTypes = [
    {
      key: "tds",
      name: "TDS",
      fullName: "Technical Data Sheet",
      description: "Detailed product specifications and technical information",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      key: "sds",
      name: "SDS",
      fullName: "Safety Data Sheet",
      description: "Safety information and handling instructions",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
    },
    {
      key: "warranty",
      name: "Warranty",
      fullName: "Warranty Information",
      description: "Product warranty terms and conditions",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <div className="text-center">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Technical Information
      </h2>
      <p className="text-lg text-gray-600 mb-12">
        Download technical documents and view product specifications
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Technical Downloads */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Download Documents</h3>
          
          <div className="space-y-4">
            {documentTypes.map((doc) => {
              const status = getDocumentStatus(documents[doc.key]);
              const isAvailable = status === "available";
              
              return (
                <motion.div
                  key={doc.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: documentTypes.indexOf(doc) * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                    isAvailable
                      ? "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isAvailable ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-400"
                    }`}>
                      {doc.icon}
                    </div>
                    
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {doc.fullName}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {doc.description}
                      </p>
                      
                      <button
                        onClick={() => handleDownload(doc.key, documents[doc.key])}
                        disabled={!isAvailable}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isAvailable
                            ? "bg-purple-600 text-white hover:bg-purple-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {isAvailable ? "Download" : "Coming Soon"}
                      </button>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                    isAvailable
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {isAvailable ? "Available" : "Unavailable"}
                  </div>

                  {/* Tooltip for unavailable documents */}
                  {!isAvailable && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Document will be available soon
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Product Specifications</h3>
          
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">Base Type</span>
                <span className="text-sm text-gray-900">{specs.base}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">Drying Time</span>
                <span className="text-sm text-gray-900">{specs.dryingTime}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">Thinning</span>
                <span className="text-sm text-gray-900">{specs.thinning}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600">Recoat Time</span>
                <span className="text-sm text-gray-900">{specs.recoatTime}</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-2">📋 Document Information</h4>
            <ul className="text-sm text-blue-700 space-y-1 text-left">
              <li>• TDS contains detailed technical specifications</li>
              <li>• SDS includes safety and handling information</li>
              <li>• Warranty covers product performance guarantees</li>
              <li>• All documents are updated regularly</li>
            </ul>
          </div>
        </div>
      </div>

      {/* B2B Information */}
      <div className="mt-12 p-6 bg-purple-50 rounded-2xl">
        <h3 className="text-xl font-semibold text-purple-900 mb-4">Business Customers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div>
            <h4 className="font-semibold text-purple-800 mb-2">Bulk Orders</h4>
            <p className="text-sm text-purple-700">
              Special pricing available for orders above 100L. Contact our sales team for custom quotes and volume discounts.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-purple-800 mb-2">Technical Support</h4>
            <p className="text-sm text-purple-700">
              Our technical team is available to assist with product selection, application guidance, and project specifications.
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <button className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
            Contact Sales Team
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechDownloads;
