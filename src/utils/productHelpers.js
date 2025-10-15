/**
 * Centralized product URL helper functions
 * Use these functions throughout the app for consistent product URLs
 */

/**
 * Get the product path/URL for navigation
 * Priority: slug > id > slugified name
 * @param {Object} product - Product object from products.js
 * @returns {string} - Product path like "/product/Exterior-Latex-Paint"
 */
export const getProductPath = (product) => {
  if (!product) return "#";

  // Priority 1: Use slug (preferred)
  if (product.slug) {
    return `/product/${product.slug}`;
  }

  // Priority 2: Use ID
  if (product.id) {
    return `/product/${product.id}`;
  }

  // Priority 3: Extract from URL
  if (product.url) {
    const slug = product.url.split("/").filter(Boolean).pop();
    if (slug) return `/product/${slug}`;
  }

  // Fallback: Slugify the name
  if (product.name) {
    const slug = product.name
      .toString()
      .trim()
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/(^-+|-+$)/g, "");
    return `/product/${slug}`;
  }

  return "#";
};

/**
 * Slugify a string (for backward compatibility)
 * @param {string} text - Text to slugify
 * @returns {string} - Slugified text
 */
export const slugify = (text = "") => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-&]+/g, "")
    .replace(/\-\-+/g, "-");
};
