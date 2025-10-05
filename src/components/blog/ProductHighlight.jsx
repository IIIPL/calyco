import React from 'react';
import { Link } from 'react-router-dom';

const ProductHighlight = ({
  productName,
  colorHex,
  productUrl,
  price,
  size,
  context,
  position = 'inline'
}) => {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Color Swatch */}
        <div className="flex-shrink-0">
          <div
            className="w-24 h-24 rounded-xl shadow-lg border-2 border-white"
            style={{ backgroundColor: colorHex }}
            aria-label={`${productName} color swatch`}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="text-xs font-semibold tracking-wider text-yellow-700 uppercase mb-2">
            Featured Product
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {productName}
          </h3>
          {context && (
            <p className="text-sm text-gray-600 mb-3">
              {context}
            </p>
          )}
          <div className="flex items-center gap-3 text-sm">
            <span className="font-bold text-gray-900">{price}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">{size}</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex-shrink-0 w-full md:w-auto">
          <Link
            to={productUrl}
            className="block w-full md:w-auto px-6 py-3 text-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors duration-200 shadow-sm"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductHighlight;
