import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Mock product data - replace with actual product data from your database
const SAMPLE_PRODUCTS = [
  {
    id: 'black-01-matt',
    name: 'Calyco Latex Paint',
    color: 'Black 01',
    finish: 'Matt',
    hex: '#1a1a1a',
    undertones: 'Deep charcoal with subtle warm undertones',
    price: '₹1,299',
    size: '2.5L',
    image: '/Assets/Products/black-paint.jpg',
    url: '/products/black-01-matt'
  },
  {
    id: 'sage-green-silk',
    name: 'Calyco Latex Paint',
    color: 'Sage Green',
    finish: 'Silk Touch',
    hex: '#9CAF88',
    undertones: 'Soft green with gray undertones for calm spaces',
    price: '₹1,299',
    size: '2.5L',
    image: '/Assets/Products/sage-green.jpg',
    url: '/products/sage-green-silk'
  },
  {
    id: 'stain-sealer-clear',
    name: 'Waterproofing Sealer',
    color: 'Clear',
    finish: 'Primer/Sealer',
    hex: '#E8E4D9',
    undertones: 'Universal primer for all surfaces',
    price: '₹899',
    size: '1L',
    image: '/Assets/Products/stain-sealer.jpg',
    url: '/product/waterproofing-sealer'
  },
  {
    id: 'terracotta-silk',
    name: 'Calyco Latex Paint',
    color: 'Terracotta',
    finish: 'Silk Touch',
    hex: '#C86F4D',
    undertones: 'Warm earth tone with orange-red base',
    price: '₹1,299',
    size: '2.5L',
    image: '/Assets/Products/terracotta.jpg',
    url: '/products/terracotta-silk'
  },
  {
    id: 'powder-blue-matt',
    name: 'Calyco Latex Paint',
    color: 'Powder Blue',
    finish: 'Matt',
    hex: '#B0C4DE',
    undertones: 'Soft blue with slight gray for tranquility',
    price: '₹1,299',
    size: '2.5L',
    image: '/Assets/Products/powder-blue.jpg',
    url: '/products/powder-blue-matt'
  }
];

const ShopTheLook = ({ productIds = [], title = 'Shop the Look' }) => {
  const scrollRef = useRef(null);

  // If productIds provided, filter products; otherwise show all
  const displayProducts = productIds.length > 0
    ? SAMPLE_PRODUCTS.filter(p => productIds.includes(p.id))
    : SAMPLE_PRODUCTS;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (displayProducts.length === 0) return null;

  return (
    <section className="my-16 py-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl">
      <div className="px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>

          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-colors"
              aria-label="Scroll left"
            >
              <FaChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-colors"
              aria-label="Scroll right"
            >
              <FaChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-72 snap-start bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-yellow-400 hover:shadow-lg transition-all duration-200"
            >
              {/* Color Swatch */}
              <div className="relative h-48 flex items-center justify-center p-8">
                <div
                  className="w-full h-full rounded-lg shadow-md"
                  style={{ backgroundColor: product.hex }}
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="text-xs font-semibold tracking-wider text-yellow-700 uppercase mb-2">
                  {product.finish}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.color}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.undertones}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-gray-900">{product.price}</span>
                  <span className="text-sm text-gray-600">{product.size}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <Link
                    to={product.url}
                    className="block w-full px-4 py-2 text-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors duration-200"
                  >
                    Shop Now
                  </Link>
                  <button className="w-full px-4 py-2 text-center border border-gray-300 hover:border-yellow-400 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition-colors duration-200">
                    Add Sample
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile scroll hint */}
      <div className="md:hidden text-center mt-4">
        <p className="text-xs text-gray-500">Swipe to see more →</p>
      </div>
    </section>
  );
};

export default ShopTheLook;
