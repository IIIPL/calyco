/**
 * Calyco trust signals — structured placeholders.
 *
 * ⚠️  DO NOT populate with fabricated data.
 * Fill these arrays only with verified, real information before publishing.
 * If a field cannot be verified, leave it as null or remove the entry entirely.
 */

/**
 * Real customer testimonials.
 * Required fields: name (first name + last initial only), city, rating, text, date.
 * Optional: serviceType, imageUrl (only if customer consented to photo use).
 */
export const testimonials = [
  // {
  //   id: 't1',
  //   name: 'Priya S.',
  //   city: 'Delhi',
  //   rating: 5,
  //   text: '…',
  //   date: 'YYYY-MM',
  //   serviceType: 'Interior Repaint',
  //   imageUrl: null,
  // },
];

/**
 * Awards and certifications.
 * Required: title, issuingBody, year, verificationUrl (public URL where it can be confirmed).
 * Leave empty until real credentials are in hand.
 */
export const certifications = [
  // {
  //   id: 'c1',
  //   title: '…',
  //   issuingBody: '…',
  //   year: 2025,
  //   verificationUrl: 'https://…',
  //   logoUrl: null,
  // },
];

/**
 * Press mentions.
 * Required: publication, headline, url, date.
 */
export const pressMentions = [
  // {
  //   id: 'p1',
  //   publication: 'Economic Times',
  //   headline: '…',
  //   url: 'https://…',
  //   date: 'YYYY-MM-DD',
  //   logoUrl: null,
  // },
];

/**
 * Key metrics displayed as trust badges.
 * Fill with actual verified numbers; do not guess or round up.
 */
export const trustMetrics = {
  citiesServed: null,       // e.g. 25
  projectsCompleted: null,  // e.g. 1200
  warrantyYears: 2,         // confirmed: 2-year warranty
  avgRating: null,          // e.g. 4.8 — only if sourced from real reviews
  verifiedPainters: null,   // e.g. 120
};
