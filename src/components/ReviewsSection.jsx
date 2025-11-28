import React, { useState } from 'react';
import { FaStar, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

/**
 * ReviewsSection Component
 * Displays customer reviews with ratings, dates, and verification badges
 *
 * @param {Array} reviews - Array of review objects
 * @param {string} productName - Name of the product being reviewed
 */
const ReviewsSection = ({ reviews = [], productName = 'Product' }) => {
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'highest', 'lowest'
  const [showForm, setShowForm] = useState(false);

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: reviews.length > 0
      ? ((reviews.filter(r => r.rating === stars).length / reviews.length) * 100).toFixed(0)
      : 0
  }));

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Render stars for individual review
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-sm ${star <= rating ? 'text-[#FF9800]' : 'text-[#E0E0E0]'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="reviews-section" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#493657] mb-2">Customer Reviews</h2>
          <p className="text-gray-600">See what our customers are saying about {productName}</p>
        </div>

        {/* Rating Summary */}
        {reviews.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: Average Rating */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className="text-6xl font-bold text-[#493657] mb-2">{averageRating}</div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`text-2xl ${star <= Math.round(averageRating) ? 'text-[#FF9800]' : 'text-[#E0E0E0]'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</p>
              </div>

              {/* Right: Rating Distribution */}
              <div className="space-y-2">
                {ratingDistribution.map(({ stars, count, percentage }) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 w-12">{stars} stars</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-[#FF9800] h-full rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sort Controls */}
        {reviews.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-[#493657]">
              All Reviews ({reviews.length})
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {sortedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{review.author}</h4>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <FaCheckCircle className="text-xs" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed">{review.review}</p>

              {/* Helpful Actions (Optional - can add later) */}
              {/* <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4">
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Was this helpful?
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  👍 Yes (0)
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  👎 No (0)
                </button>
              </div> */}
            </motion.div>
        ))}
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center space-y-4">
          {reviews.length === 0 && (
            <p className="text-gray-600">
              No reviews yet. Be the first to share your thoughts!
            </p>
          )}
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-[#493657] text-white font-semibold rounded-lg hover:bg-[#301A44] transition-colors"
          >
            Write a Review
          </button>

          {showForm && (
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 text-left border border-gray-100">
              <h4 className="text-lg font-semibold text-[#493657] mb-4">Share your experience</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent"
                />
                <select
                  defaultValue="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Very Poor</option>
                </select>
              </div>
              <textarea
                rows="4"
                placeholder="Write your review..."
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent mb-4"
              />
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-5 py-2 bg-[#F0C85A] text-[#301A44] font-semibold rounded-md hover:opacity-90"
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
