import React from "react";
import { motion } from "framer-motion";

const FinishSwatches = ({ finishes, selectedFinish, onChange }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getFinishIcon = (finishName) => {
    const name = finishName.toLowerCase();
    if (name.includes('matte') || name.includes('flat')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      );
    } else if (name.includes('satin') || name.includes('eggshell')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    } else if (name.includes('gloss') || name.includes('semi-gloss')) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
      </svg>
    );
  };

  const getFinishCharacteristics = (finishName) => {
    const name = finishName.toLowerCase();
    if (name.includes('matte') || name.includes('flat')) {
      return {
        durability: "Medium",
        washability: "Limited",
        sheen: "0-5%",
        bestFor: "Ceilings, low-traffic areas"
      };
    } else if (name.includes('satin') || name.includes('eggshell')) {
      return {
        durability: "High",
        washability: "Good",
        sheen: "10-25%",
        bestFor: "Living rooms, bedrooms"
      };
    } else if (name.includes('gloss') || name.includes('semi-gloss')) {
      return {
        durability: "Very High",
        washability: "Excellent",
        sheen: "60-90%",
        bestFor: "Kitchens, bathrooms, trim"
      };
    }
    return {
      durability: "Medium",
      washability: "Good",
      sheen: "15-35%",
      bestFor: "General use"
    };
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Choose Your Finish
      </h2>
      <p className="text-lg text-gray-600 mb-12">
        Different finishes offer varying levels of durability and sheen
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {finishes.map((finish, index) => {
          const isSelected = selectedFinish === index;
          const characteristics = getFinishCharacteristics(finish.name);
          
          return (
            <motion.div
              key={index}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "border-purple-600 bg-purple-50 ring-4 ring-purple-100"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => onChange(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              {/* Finish Icon */}
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                isSelected ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-600"
              }`}>
                {getFinishIcon(finish.name)}
              </div>

              {/* Finish Name */}
              <h3 className={`text-xl font-bold mb-2 ${
                isSelected ? "text-purple-900" : "text-gray-900"
              }`}>
                {finish.name}
              </h3>

              {/* Price */}
              <div className="text-2xl font-bold text-gray-900 mb-3">
                {formatPrice(finish.price)}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4">
                {finish.description}
              </p>

              {/* Characteristics */}
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Durability:</span>
                  <span className="font-medium text-gray-700">{characteristics.durability}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Washability:</span>
                  <span className="font-medium text-gray-700">{characteristics.washability}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Sheen:</span>
                  <span className="font-medium text-gray-700">{characteristics.sheen}</span>
                </div>
              </div>

              {/* Best For */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Best for:</span> {characteristics.bestFor}
                </p>
              </div>

              {/* Toggle Switch */}
              <div className="mt-4 flex justify-center">
                <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isSelected ? "bg-purple-600" : "bg-gray-200"
                }`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isSelected ? "translate-x-6" : "translate-x-1"
                  }`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Finish Comparison */}
      <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Finish Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-medium text-gray-700">Finish</th>
                <th className="text-center py-2 font-medium text-gray-700">Durability</th>
                <th className="text-center py-2 font-medium text-gray-700">Washability</th>
                <th className="text-center py-2 font-medium text-gray-700">Sheen</th>
                <th className="text-center py-2 font-medium text-gray-700">Best For</th>
              </tr>
            </thead>
            <tbody>
              {finishes.map((finish, index) => {
                const characteristics = getFinishCharacteristics(finish.name);
                return (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 font-medium text-gray-900">{finish.name}</td>
                    <td className="py-3 text-center text-gray-700">{characteristics.durability}</td>
                    <td className="py-3 text-center text-gray-700">{characteristics.washability}</td>
                    <td className="py-3 text-center text-gray-700">{characteristics.sheen}</td>
                    <td className="py-3 text-center text-gray-700 text-xs">{characteristics.bestFor}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pro Tips */}
      <div className="mt-8 p-4 bg-blue-50 rounded-xl max-w-2xl mx-auto">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Finish Selection Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1 text-left">
          <li>• <strong>Matte:</strong> Hides imperfections, great for ceilings and low-traffic areas</li>
          <li>• <strong>Satin:</strong> Balanced durability and washability, perfect for living spaces</li>
          <li>• <strong>Gloss:</strong> Maximum durability and washability, ideal for high-traffic areas</li>
          <li>• Consider the room's function and traffic level when choosing</li>
        </ul>
      </div>
    </div>
  );
};

export default FinishSwatches;
