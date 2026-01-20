// src/data/cities.js

export const cities = [
  {
    id: 1,
    name: "Noida",
    slug: "painters-in-noida",
    metaTitle: "Professional Wall Texture Painters in Noida | Calyco Paints",
    description: "Transform your spaces with premium wall textures in Noida. Our expert painters deliver flawless finishes for homes and commercial properties across all sectors. Experience scientific luxury with eco-friendly, long-lasting texture solutions.",
    landmarks: [
      "Sector 18",
      "Sector 62",
      "Greater Noida West",
      "Noida Expressway"
    ]
  },
  {
    id: 2,
    name: "Gurugram",
    slug: "painters-in-gurugram",
    metaTitle: "Expert Wall Texture Painters in Gurugram | Calyco Paints",
    description: "Elevate your property with professional wall texture services in Gurugram. Serving residential complexes, corporate offices, and commercial spaces with premium, sustainable finishes that combine aesthetics with durability.",
    landmarks: [
      "Golf Course Road",
      "Cyber City",
      "DLF Phase 1-5",
      "Sohna Road"
    ]
  },
  {
    id: 3,
    name: "Delhi",
    slug: "painters-in-delhi",
    metaTitle: "Premium Wall Texture Painters in Delhi | Calyco Paints",
    description: "Discover exceptional wall texture painting services in Delhi. Our skilled craftsmen specialize in luxury residential projects, heritage properties, and upscale commercial spaces with eco-conscious, high-performance coatings.",
    landmarks: [
      "Hauz Khas",
      "Greater Kailash",
      "Saket",
      "Defence Colony"
    ]
  },
  {
    id: 4,
    name: "Ghaziabad",
    slug: "painters-in-ghaziabad",
    metaTitle: "Reliable Wall Texture Painters in Ghaziabad | Calyco Paints",
    description: "Get professional wall texture painting in Ghaziabad with Calyco Paints. We deliver superior finishes for residential societies, commercial buildings, and industrial properties using low-VOC, water-based formulas for lasting protection.",
    landmarks: [
      "Indirapuram",
      "Vaishali",
      "Crossings Republik",
      "Raj Nagar Extension"
    ]
  }
];

// Helper function to get city by slug
export const getCityBySlug = (slug) => {
  return cities.find(city => city.slug === slug);
};

// Helper function to get all city names
export const getAllCityNames = () => {
  return cities.map(city => city.name);
};