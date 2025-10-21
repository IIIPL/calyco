/**
 * Product Reviews Database
 * Contains customer reviews for all products
 */

const normalizeKey = (productId) => String(productId || '').toLowerCase();

const interiorLatexReviews = [
  {
    id: 1,
    author: "Mrs. Ritu Sharma",
    rating: 5,
    date: "2025-11-03",
    review: "Very nice paint for our bedroom. No smell issue like other paints and colour matching was perfect. My husband applied it easily and walls look so fresh now. Price is also reasonable compared to branded ones.",
    verified: true,
  },
  {
    id: 2,
    author: "Amit Kumar Verma",
    rating: 5,
    date: "2025-10-12",
    review: "This is really good quality paint. Coverage is excellent - we saved money because needed less coats. My wife is very happy with the finish and kids room looks bright. Customer service also helped when I had doubts about quantity.",
    verified: true,
  },
  {
    id: 3,
    author: "Suresh and Anjali Menon",
    rating: 5,
    date: "2025-09-22",
    review: "We choosed this eco friendly paint for our new home mainly thinking about children health. The shade matching service was very helpfull - they matched our existing colour perfectly. Quality is really good for the price point.",
    verified: true,
  },
  {
    id: 4,
    author: "Neha Gupta",
    rating: 4,
    date: "2025-09-05",
    review: "First time using this brand but very satisfied. Application was smooth and final look is much better than my previous paint. Only thing is it took little longer to dry completely but worth waiting for such finish.",
    verified: true,
  },
  {
    id: 5,
    author: "Ravi Iyer",
    rating: 5,
    date: "2025-08-18",
    review: "Durability is very good. After 6 months walls still look fresh and stains can be wiped easily. My mother-in-law also liked the colour and finish. Will definitely buy again for other rooms.",
    verified: true,
  },
];

const luxuryExteriorReviews = [
  {
    id: 1,
    author: "Sanjay Pillai",
    rating: 5,
    date: "2025-10-28",
    review: "Used for our house exterior before monsoon season. Rain water just slides off and colour has not faded at all even after heavy rains. My neighbours are asking which paint we used. Very happy with the result.",
    verified: true,
  },
  {
    id: 2,
    author: "Mrs. Meera D'Souza",
    rating: 4,
    date: "2025-09-19",
    review: "Good coverage on exterior walls. Applied two coats as suggested and looks really nice. The paint spreads evenly even on rough surface. Only issue was strong smell during application but goes away after drying.",
    verified: true,
  },
  {
    id: 3,
    author: "Arjun Batra",
    rating: 5,
    date: "2025-08-24",
    review: "Excellent for coastal area like ours. We were worried about humidity and salt air affecting the paint but its been 4 months and no problems. The glossy finish looks premium and easy to clean.",
    verified: true,
  },
];

const waterproofingSealerReviews = [
  {
    id: 1,
    author: "Rajesh Kumar Patel",
    rating: 5,
    date: "2025-11-08",
    review: "Best solution for terrace leakage problem. Earlier every monsoon we had seepage in bedroom ceiling but after using this sealer the problem is completely solved. Applied as per instruction and working perfectly till now.",
    verified: true,
  },
  {
    id: 2,
    author: "Priya and Vikram Nair",
    rating: 5,
    date: "2025-10-02",
    review: "We had major seepage issue in bathroom from neighbour side. After trying many solutions finally this waterproofing worked. Easy to apply with brush, no bad smell also. Two coats were sufficient for our small bathroom. Highly recomend.",
    verified: true,
  },
  {
    id: 3,
    author: "Mrs. Sunita Sharma",
    rating: 4,
    date: "2025-09-03",
    review: "Applied on terrace just before monsoon started. So far no water coming inside house which is great relief. Coverage was good for our 2BHK terrace area. Only thing is it takes more time to dry in humid weather.",
    verified: true,
  },
  {
    id: 4,
    author: "Manoj Deshmukh",
    rating: 5,
    date: "2025-08-26",
    review: "Excellent for stopping water seepage near windows. The consistency is thick so need to add little water but after mixing it applies smoothly. Problem of dampness has stopped completely. Worth every rupee spent on this.",
    verified: true,
  },
  {
    id: 5,
    author: "Mrs. Kavita Reddy",
    rating: 5,
    date: "2025-08-18",
    review: "Best waterproofing product I have used so far. Our balcony was leaking badly and I was very tensed about ceiling damage. After applying this the leakage stopped immediately. No chemical smell, brushes also cleaned easily.",
    verified: true,
  },
  {
    id: 6,
    author: "Anil and Geeta Joshi",
    rating: 4,
    date: "2025-08-09",
    review: "Used for society terrace waterproofing. Good coverage and rain water is not seeping inside flats now. Society members are satisfied with the result. Only suggestion is to have better instruction manual for application.",
    verified: true,
  },
];

const premiumInteriorReviews = [
  {
    id: 1,
    author: "Deepak and Swati Kulkarni",
    rating: 5,
    date: "2025-10-21",
    review: "The finish looks very rich and smooth. Even our painter commented that shade is looking like five star hotel quality. Colour depth is excellent and gives premium feel to our living room. Little expensive but worth it.",
    verified: true,
  },
  {
    id: 2,
    author: "Mrs. Lalitha Nair",
    rating: 5,
    date: "2025-09-30",
    review: "Colour matching was exactly like the catalogue sample. Very low odour which is good for us as we have small children at home. Walls have velvety smooth texture now. Delivery was also on time despite some confusion in address.",
    verified: true,
  },
  {
    id: 3,
    author: "Prakash Bhandari",
    rating: 4,
    date: "2025-09-12",
    review: "Coverage is superb - used less quantity than expected for entire hall. Finish quality is definitely premium as they claim. Only wish the drying time was faster but final result makes the wait worthwhile.",
    verified: true,
  },
  {
    id: 4,
    author: "Mrs. Shweta Agarwal",
    rating: 5,
    date: "2025-08-17",
    review: "Kids room transformation is amazing. Paint application was very smooth and cleaning crayon marks is so easy now. My daughter loves the new colour. Overall very satisfied with quality and customer service.",
    verified: true,
  },
];

const premiumExteriorReviews = [
  {
    id: 1,
    author: "Harish Patankar",
    rating: 5,
    date: "2025-10-11",
    review: "Used on compound wall and gate. The glossy finish makes everything look brand new. Colour is holding well against sun and dust. Neighbors are appreciating the look. Good value for money considering the quality.",
    verified: true,
  },
  {
    id: 2,
    author: "Mrs. Reshma Sane",
    rating: 4,
    date: "2025-09-25",
    review: "Colour retention is very good even in Pune's harsh sun and rain. Applied two coats for better result and finish looks very elegant. Made small mistake of diluting too much initially but second coat covered it well.",
    verified: true,
  },
  {
    id: 3,
    author: "Vikrant Jaiswal",
    rating: 5,
    date: "2025-09-07",
    review: "Love the matte finish - it hides minor wall cracks also which saved plastering cost. Used leftover paint for touching up iron gate and it blended perfectly. Overall very happy with the purchase decision.",
    verified: true,
  },
  {
    id: 4,
    author: "Mrs. Nalini Dutta",
    rating: 5,
    date: "2025-08-20",
    review: "Applied on society staircase exterior walls. No chalking problem and dust cleaning is very easy with wet cloth. For a middle class family like ours this gives premium feel without burning hole in pocket.",
    verified: true,
  },
];

export const productReviews = {
  "interior-latex-paint": interiorLatexReviews,
  "exterior-latex-paint": luxuryExteriorReviews,
  "luxury-exterior-emulsion": luxuryExteriorReviews,
  "waterproofing-sealer": waterproofingSealerReviews,
  "premium-interior-emulsion": premiumInteriorReviews,
  "premium-exterior-emulsion": premiumExteriorReviews,
};

// Rest of the functions remain the same...
export const getProductReviews = (productId) => {
  const key = normalizeKey(productId);
  return productReviews[key] || [];
};

export const getAverageRating = (productId) => {
  const reviews = getProductReviews(productId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};

export const getTotalReviews = (productId) => {
  return getProductReviews(productId).length;
};
