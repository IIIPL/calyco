/**
 * Product Reviews Database
 * Contains customer reviews for all products
 */

const normalizeKey = (productId) => String(productId || '').toLowerCase();

export const productReviews = {
  // Interior Latex Paint Reviews
  "interior-latex-paint": [
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

  // Exterior Latex Paint Reviews
  "exterior-latex-paint": [
    {
      id: 1,
      author: "Sanjay Pillai",
      rating: 5,
      date: "2024-09-02",
      review: "Painted our villa exterior before monsoon and the finish still looks fresh. Rain just beads off and colour has not faded.",
      verified: true
    },
    {
      id: 2,
      author: "Meera D'Souza",
      rating: 4,
      date: "2024-08-14",
      review: "Loved the coverage and how easily it rolled on textured plaster. Needed two coats as suggested but worth it for the protection.",
      verified: true
    },
    {
      id: 3,
      author: "Arjun Batra",
      rating: 5,
      date: "2024-07-29",
      review: "Used the satin finish for fascia boards and trims. No chalking and the hydrophobic effect is impressive even in coastal humidity.",
      verified: true
    }
  ],

  // Exterior Latex Paint Reviews (alternate key for "Calyco Exterior Latex Paint" product ID)
  "calyco exterior latex paint": [
    {
      id: 1,
      author: "Sanjay Pillai",
      rating: 5,
      date: "2024-09-02",
      review: "Painted our villa exterior before monsoon and the finish still looks fresh. Rain just beads off and colour has not faded.",
      verified: true
    },
    {
      id: 2,
      author: "Meera D'Souza",
      rating: 4,
      date: "2024-08-14",
      review: "Loved the coverage and how easily it rolled on textured plaster. Needed two coats as suggested but worth it for the protection.",
      verified: true
    },
    {
      id: 3,
      author: "Arjun Batra",
      rating: 5,
      date: "2024-07-29",
      review: "Used the satin finish for fascia boards and trims. No chalking and the hydrophobic effect is impressive even in coastal humidity.",
      verified: true
    }
  ],

  // Waterproofing Sealer Reviews
  "waterproofing-sealer": [
    {
      id: 1,
      author: "Rajesh Kumar Patel",
      rating: 5,
      date: "2024-10-05",
      review: "Very good product for terrace. Before this my ceiling was getting damp patches during rainy season but now problem is compleatly gone. Applied 2 coats as instruction said and its working perfect. Price is also reasonable compare to other brands.",
      verified: true
    },
    {
      id: 2,
      author: "Priya & Vikram Nair",
      rating: 5,
      date: "2024-09-18",
      review: "We use this for our bathroom walls where water seepage was happening from neighbours side. After application no more leakage problem. Easy to apply with roller, no strong smell also which is good thing. Highly recomend for anyone having damp walls issue.",
      verified: true
    },
    {
      id: 3,
      author: "Sunita Devi Sharma",
      rating: 4,
      date: "2024-08-27",
      review: "Applied on terrace before monsoon. So far no complains, water is not coming inside house anymore. One tin was suffcient for small terrace of my 2bhk flat. Painter said quality is very good and application was also smooth. Only thing is drying takes some time.",
      verified: true
    },
    {
      id: 4,
      author: "Manoj Deshmukh",
      rating: 5,
      date: "2024-08-10",
      review: "Excelent for external walls. I had seepage near window area and after using this product the problem stopped. Its been 3 months and no damp patches. The paint is little thick so need to mix some water but after that it spreads nicely. Worth every rupee spend on it.",
      verified: true
    },
    {
      id: 5,
      author: "Kavita Reddy",
      rating: 5,
      date: "2024-07-22",
      review: "Best waterproofing I have used till now. My balcony was leaking and I was so tensed about it. After applying this sealer the leakge stopped completly. No bad smell, easy to clean brushes with water. I am very satisfy with results. Will definately buy again if needed.",
      verified: true
    },
    {
      id: 6,
      author: "Anil & Geeta Joshi",
      rating: 4,
      date: "2024-07-05",
      review: "We did waterproofing of our society terrace with this. Coverage is good, one 20L can covered decent area. Rain water is not seeping now which was major problem for top floor residents. Product quality seems durable. Application was simple, our contractor also praised the product.",
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
