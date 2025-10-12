/**
 * Product Reviews Database
 * Contains customer reviews for all products
 */

const normalizeKey = (productId) => String(productId || '').toLowerCase();

export const productReviews = {
  // Nova Interior Paint Reviews
  "nova": [
    {
      id: 1,
      author: "Ritu Sharma",
      rating: 5,
      date: "2024-09-15",
      review: "I like that this paint is safe, no strong chemical smell. Colour matching also came perfect. It went on very smooth, covered nicely in one coat, and shade looks just right in my flat.",
      verified: true
    },
    {
      id: 2,
      author: "Amit Verma",
      rating: 5,
      date: "2024-08-22",
      review: "After using this I dont think I will buy any other paint brand. The coverage was very good, colours look rich, and their team also helped me with small doubts. For this price its honestly best.",
      verified: true
    },
    {
      id: 3,
      author: "Suresh & Anjali Menon",
      rating: 5,
      date: "2024-07-10",
      review: "We selected the eco paint when doing up our new house, main reason was to make healthy environment for kids. They even matched one old colour we already had, that was very helpful.",
      verified: true
    },
    {
      id: 4,
      author: "Neha Gupta",
      rating: 4,
      date: "2024-06-18",
      review: "I did painting before in my home but this time it felt really premium. From odering to painting everything was simple. Finish is much better then normal paints I used earlier.",
      verified: true
    },
    {
      id: 5,
      author: "Ravi Iyer",
      rating: 5,
      date: "2024-05-25",
      review: "The paint is lasting long, marks wipe off easy and walls still fresh after months. I used this brand before also and it never dissapoints. Even the packing was neat.",
      verified: true
    }
  ],

  // You can add reviews for other products here
  // Example:
  // "product-id": [
  //   { ... review object ... }
  // ]
};

/**
 * Get reviews for a specific product
 * @param {string} productId - The product ID
 * @returns {Array} Array of review objects
 */
export const getProductReviews = (productId) => {
  const key = normalizeKey(productId);
  return productReviews[key] || [];
};

/**
 * Calculate average rating for a product
 * @param {string} productId - The product ID
 * @returns {number} Average rating (0-5)
 */
export const getAverageRating = (productId) => {
  const reviews = getProductReviews(productId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};

/**
 * Get total review count for a product
 * @param {string} productId - The product ID
 * @returns {number} Total number of reviews
 */
export const getTotalReviews = (productId) => {
  return getProductReviews(productId).length;
};
