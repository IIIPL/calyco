import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductHero = ({ product, selectedFinish, onAddToCart, onSampleOrder, onVisualizer }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <section className="py-16 lg:py-24 bg-linen-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Media Carousel */}
          <div className="space-y-6">
            {/* Main Image/Video */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={product.images[currentImageIndex]}
                  alt={`${product.name} - ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              
              {/* Video Play Button (if first image is video) */}
              {currentImageIndex === 0 && (
                <button
                  onClick={toggleVideo}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform">
                    {isPlaying ? (
                      <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              )}
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index
                      ? "border-purple-600 ring-2 ring-purple-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Small Bucket Render (Below fold) */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <img
                  src={product.bucketImage}
                  alt={`${product.name} bucket`}
                  className="w-16 h-16 object-contain"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Real bucket size</p>
                  <p className="text-xs text-gray-500">Actual product packaging</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Information */}
          <div className="space-y-8">
            {/* Product Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-calyco-purple bg-lilac px-3 py-1 rounded-full">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-charcoal-black leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-grey-mist text-grey-thunder">
                  {product.finishes[selectedFinish].name}
                </span>
                <span className="text-2xl font-bold text-charcoal-black">
                  {formatPrice(product.finishes[selectedFinish].price)}
                </span>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-charcoal-black">Key Benefits</h3>
              <ul className="space-y-2">
                {product.keyBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sage-green rounded-full flex-shrink-0"></div>
                    <span className="text-grey-thunder">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Micro Copy */}
            <p className="text-sm text-grey-thunder border-l-4 border-sage-green pl-4">
              {product.microCopy}
            </p>

            {/* Primary CTA */}
            <div className="space-y-4">
              <button
                onClick={onAddToCart}
                className="w-full btn-primary py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Add to Cart
              </button>

              {/* Secondary CTAs */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={onSampleOrder}
                  className="btn-gold py-3 px-6 rounded-xl font-semibold"
                >
                  ₹99 Sample
                </button>
                <button
                  onClick={onVisualizer}
                  className="btn-secondary py-3 px-6 rounded-xl font-semibold"
                >
                  Try in Visualizer
                </button>
              </div>
            </div>

            {/* Finish Description */}
            <div className="bg-grey-mist rounded-xl p-4">
              <h4 className="font-semibold text-charcoal-black mb-2">
                {product.finishes[selectedFinish].name} Finish
              </h4>
              <p className="text-sm text-grey-thunder">
                {product.finishes[selectedFinish].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
