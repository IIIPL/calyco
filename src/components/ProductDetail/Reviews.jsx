import React, { useState } from "react";
import { motion } from "framer-motion";

const Reviews = ({ rating, reviewCount }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Sample review data - TODO: Replace with actual reviews
  const sampleReviews = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      date: "2 days ago",
      comment: "Excellent coverage and the color is exactly as shown. Very happy with this paint!"
    },
    {
      id: 2,
      author: "Rajesh K.",
      rating: 4,
      date: "1 week ago",
      comment: "Good quality paint, easy to apply. Dries quickly and looks great."
    },
    {
      id: 3,
      author: "Priya S.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Perfect for my living room. The finish is beautiful and it's holding up well."
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  const getRatingText = (rating) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4.0) return "Very Good";
    if (rating >= 3.5) return "Good";
    if (rating >= 3.0) return "Average";
    return "Below Average";
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-blue-600";
    if (rating >= 3.5) return "text-yellow-600";
    if (rating >= 3.0) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Customer Reviews
      </h2>
      <p className="text-lg text-gray-600 mb-12">
        See what our customers say about this product
      </p>

      {/* Rating Summary */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">{rating}</div>
              <div className="flex items-center justify-center mb-2">
                {renderStars(rating)}
              </div>
              <div className={`text-lg font-semibold ${getRatingColor(rating)} mb-1`}>
                {getRatingText(rating)}
              </div>
              <div className="text-sm text-gray-600">
                Based on {reviewCount} reviews
              </div>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const percentage = Math.round((star / 5) * 100);
              return (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm text-gray-600">{star}</span>
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-right text-sm text-gray-600">
                    {percentage}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Latest Reviews */}
      <div className="max-w-4xl mx-auto mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Latest Reviews</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              
              <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                "{review.comment}"
              </p>
              
              <div className="text-sm font-medium text-gray-900">
                — {review.author}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Write Review Section */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="bg-gray-50 rounded-2xl p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Share Your Experience</h4>
          <p className="text-sm text-gray-600 mb-4">
            Help other customers by writing a review about this product
          </p>
          
          <button className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
            Write a Review
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Review Guidelines */}
      <div className="max-w-3xl mx-auto p-6 bg-blue-50 rounded-2xl">
        <h4 className="font-semibold text-blue-800 mb-3">Review Guidelines</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700 text-left">
          <div>
            <p className="font-medium">What to include:</p>
            <ul className="space-y-1 mt-1">
              <li>• Your experience with the product</li>
              <li>• How it performed vs. expectations</li>
              <li>• Any tips for other users</li>
            </ul>
          </div>
          <div>
            <p className="font-medium">What to avoid:</p>
            <ul className="space-y-1 mt-1">
              <li>• Personal information</li>
              <li>• Offensive language</li>
              <li>• Spam or promotional content</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Verified Reviews
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure & Private
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            No Spam
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
