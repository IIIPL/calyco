import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

/**
 * RatingStars Component
 * Displays a visual star rating with total reviews count
 *
 * @param {number} rating - Average rating (0-5)
 * @param {number} totalReviews - Total number of reviews
 * @param {function} onClick - Click handler for scrolling to reviews
 * @param {string} size - Size variant: 'sm', 'md', 'lg' (default: 'md')
 * @param {boolean} showCount - Whether to show review count (default: true)
 */
const RatingStars = ({
  rating = 0,
  totalReviews = 0,
  onClick = null,
  size = 'md',
  showCount = true
}) => {
  // Calculate filled, half, and empty stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Size configurations
  const sizeConfig = {
    sm: {
      star: 'text-sm',
      text: 'text-xs',
      gap: 'gap-0.5'
    },
    md: {
      star: 'text-base',
      text: 'text-sm',
      gap: 'gap-1'
    },
    lg: {
      star: 'text-xl',
      text: 'text-base',
      gap: 'gap-1.5'
    }
  };

  const config = sizeConfig[size] || sizeConfig.md;

  // Render individual stars
  const renderStars = () => {
    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar
          key={`full-${i}`}
          className={`${config.star} text-[#FF9800]`}
        />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt
          key="half"
          className={`${config.star} text-[#FF9800]`}
        />
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar
          key={`empty-${i}`}
          className={`${config.star} text-[#E0E0E0]`}
        />
      );
    }

    return stars;
  };

  return (
    <div
      className={`flex items-center ${config.gap} ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      aria-label={`Rated ${rating.toFixed(1)} out of 5 stars based on ${totalReviews} reviews`}
    >
      {/* Rating Number */}
      <span className={`${config.text} font-semibold text-gray-900`}>
        {rating.toFixed(1)}
      </span>

      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {renderStars()}
      </div>

      {/* Review Count */}
      {showCount && totalReviews > 0 && (
        <span className={`${config.text} text-gray-600`}>
          ({totalReviews} {totalReviews === 1 ? 'rating' : 'ratings'})
        </span>
      )}
    </div>
  );
};

export default RatingStars;
