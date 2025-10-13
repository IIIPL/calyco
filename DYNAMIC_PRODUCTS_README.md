# Dynamic Product System for Calyco Paints

## Overview
This system allows you to create dynamic product pages without hardcoding each individual product page. All product data is stored in a centralized JSON file, and a single dynamic component handles all product displays.

## How It Works

### 1. Product Data Structure
All products are defined in `src/data/products.js` with the following structure:

```javascript
{
  "product-id": {
    id: "product-id",
    name: "Product Name",
    category: "Interior|Exterior|Enamel & Wood Finishes|Industrial Coatings|Specialty",
    tier: "Ultra-Premium|Premium|Standard|Value|Specialty",
    price: 499,
    description: "Full product description...",
    shortDescription: "Brief description for cards",
    image: "/Assets/product-image.png",
    sizes: ["1L", "5L", "10L"],
    sheens: ["Matte", "Eggshell", "Satin"],
    features: ["Feature 1", "Feature 2", "Feature 3"],
    technicalSpecs: {
      coverage: "120-140 sq. ft. per liter",
      dryTime: "30 minutes to touch, 2 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Application 1", "Application 2"],
    warranty: "10 years"
  }
}
```

### 2. Dynamic Routing
- **URL Pattern**: `/product/:productId`
- **Example**: `/product/Interior-Latex-Paint`, `/product/lumen`, `/product/regal`
- **Component**: `DynamicProductPage.jsx` handles all product displays

### 3. Adding New Products

To add a new product:

1. **Add to products.js**:
```javascript
"new-product": {
  id: "new-product",
  name: "Calyco New Product",
  category: "Interior",
  tier: "Premium",
  price: 599,
  // ... all other required fields
}
```

2. **Add product image** to `/public/Assets/` directory
3. **Update image path** in the product data
4. **Access via URL**: `/product/new-product`

### 4. Product Categories & Tiers

#### Categories:
- **Interior**: Interior wall paints
- **Exterior**: Exterior wall paints  
- **Enamel & Wood Finishes**: Wood stains, enamels
- **Industrial Coatings**: Industrial applications
- **Specialty**: Fire retardant, anti-bacterial, etc.

#### Tiers:
- **Ultra-Premium**: ₹800+ (5 products)
- **Premium**: ₹400-800 (8 products)
- **Standard**: ₹200-400 (10 products)
- **Value**: Under ₹200 (4 products)
- **Specialty**: Special applications (3 products)

### 5. Features Included

#### Dynamic Product Page Features:
- ✅ Product image with hover effects
- ✅ Tier badges (color-coded)
- ✅ Sheen selection
- ✅ Size selection
- ✅ Quantity selector
- ✅ Key features list
- ✅ Technical specifications
- ✅ Applications list
- ✅ Warranty information
- ✅ Add to cart functionality
- ✅ Breadcrumb navigation
- ✅ Back to products link

#### Product Catalog Features:
- ✅ Category filtering
- ✅ Tier-based organization
- ✅ Product cards with pricing
- ✅ Smooth animations
- ✅ Responsive design

### 6. Helper Functions

```javascript
// Get product by ID
const product = getProductById("nova");

// Get products by category
const interiorProducts = getProductsByCategory("Interior");

// Get products by tier
const premiumProducts = getProductsByTier("Premium");

// Get all products
const allProducts = getAllProducts();

// Get categories
const categories = getProductCategories();

// Get tiers
const tiers = getProductTiers();
```

### 7. URL Examples

```
/product/Interior-Latex-Paint          → Nova interior paint
/product/lumen         → Lumen interior paint
/product/regal         → Regal ultra-premium paint
/product/emerald-exterior → Emerald exterior paint
/product/arborcoat     → Arborcoat wood stain
/product/fire-retardant → Fire retardant coating
```

### 8. Benefits

1. **Scalability**: Add unlimited products without creating new pages
2. **Consistency**: All products follow the same layout and structure
3. **Maintainability**: Update product info in one place
4. **SEO Friendly**: Each product has its own URL
5. **Performance**: No need to load multiple page components
6. **User Experience**: Consistent navigation and layout

### 9. Current Product Portfolio

**30 Products Total:**
- 5 Ultra-Premium products
- 8 Premium products  
- 10 Standard products
- 4 Value products
- 3 Specialty products

### 10. Technology Stack

- **React Router**: Dynamic routing
- **Framer Motion**: Animations
- **Tailwind CSS**: Styling
- **React Icons**: Icons
- **JSON/JS**: Data storage

This system provides a complete, scalable solution for managing your product catalog with minimal maintenance overhead. 
