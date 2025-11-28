# Checkout Flow for Service Products (No Shipping Required)

## Overview
This document explains how the checkout system handles service products like "Book Site Visit" that don't require physical shipping.

## Problem
Previously, when users purchased the "Book Site Visit" service (₹499), they were forced to enter a complete shipping address even though this is a service consultation that doesn't involve shipping physical products.

## Solution
Implemented a `requiresShipping` flag system that:
1. Identifies products/services that don't need shipping
2. Conditionally hides shipping-related fields in the checkout form
3. Adjusts validation to only require contact/billing info for service products

## Changes Made

### 1. Product Data Structure (`src/data/products.js`)
Added a new "Book Site Visit" product entry with `requiresShipping: false`:

```javascript
{
  "id": "BookSiteVisit",
  "slug": "book-site-visit",
  "name": "Book Site Visit",
  "display_name": "Professional Site Visit Consultation",
  "price": 499,
  "requiresShipping": false,
  "productType": "service",
  "category": "service"
}
```

### 2. Cart Context (`src/context/CartContext.jsx`)
Updated `createLocalCartItem` function to preserve the `requiresShipping` flag:

```javascript
const createLocalCartItem = ({ product, price, finish, size, quantity, color, productType }) => {
  return {
    // ... other fields
    requiresShipping: product?.requiresShipping !== false, // Default to true
    productType: product?.productType || productType || 'paint',
  };
};
```

**Key Logic**: Products default to `requiresShipping: true` unless explicitly set to `false`.

### 3. City Landing Page (`src/pages/CityLandingPage.jsx`)
Updated the site visit product definition to include the flags:

```javascript
const siteVisitProduct = {
  id: `site-visit-${city.slug}`,
  name: `Site Visit - ${city.name}`,
  display_name: `Site Visit Consultation in ${city.name}`,
  price: 499,
  requiresShipping: false,
  productType: 'service',
};
```

### 4. Checkout Page (`src/pages/Checkout.jsx`)

#### A. Cart Inspection
Added logic to check if any item in the cart requires shipping:

```javascript
const cartRequiresShipping = items.some(item => item.requiresShipping !== false);
```

#### B. Shipping Cost Calculation
Modified shipping calculation to be zero for service-only carts:

```javascript
const shipping = cartRequiresShipping ? shippingRates[selectedShipping] : 0;
```

#### C. Form Validation
Updated validation to only require shipping address fields when needed:

```javascript
const requiredContactFields = !user.email || !address.firstName || !address.lastName || !address.phone;
const requiredShippingFields = cartRequiresShipping && (!address.address || !address.city || !address.postcode);

if (requiredContactFields || requiredShippingFields) {
  setPaymentError("Please fill in all required fields");
  return;
}
```

#### D. UI Conditional Rendering

**Section Title**: Changes from "Delivery" to "Billing Details" for service-only orders:
```javascript
<div className="font-bold text-lg mb-2">
  {cartRequiresShipping ? 'Delivery' : 'Billing Details'}
</div>
```

**Shipping Address Fields**: Only shown when cart requires shipping:
```javascript
{cartRequiresShipping && (
  <>
    <input name="address" placeholder="Address" required />
    <input name="city" placeholder="City" required />
    <input name="postcode" placeholder="Postcode" required />
    {/* etc. */}
  </>
)}
```

**Shipping Method Section**: Completely hidden for service-only orders:
```javascript
{cartRequiresShipping && (
  <div>
    <div className="font-bold text-lg mb-2">Shipping method</div>
    {/* Shipping options */}
  </div>
)}
```

**Shipping Line Item**: Hidden in the order summary:
```javascript
{cartRequiresShipping && (
  <div className="flex justify-between text-gray-700">
    <span>Shipping</span>
    <span>₹{shipping}</span>
  </div>
)}
```

## User Experience

### For Service Products (Book Site Visit)
**Checkout Flow**:
1. ✅ Contact email
2. ✅ Billing Details (First name, Last name, Phone)
3. ❌ Shipping Address (Hidden)
4. ❌ Shipping Method (Hidden)
5. ✅ Payment

**Form Fields Required**:
- Email
- First Name
- Last Name
- Phone Number

**Not Required**:
- Address
- City
- Postcode
- Country (optional)
- Apartment/Suite (optional)
- Company (optional)

### For Physical Products (Paints, Primers, etc.)
**Checkout Flow**: Remains unchanged
1. ✅ Contact email
2. ✅ Delivery Address (Full address)
3. ✅ Shipping Method (Standard/Express)
4. ✅ Payment

## Mixed Cart Behavior
If a cart contains BOTH physical products AND services:
- The cart is treated as requiring shipping
- All shipping fields are shown and required
- Shipping costs are calculated normally

**Logic**: `cartRequiresShipping = items.some(item => item.requiresShipping !== false)`
- If ANY item requires shipping → Full shipping flow
- If ALL items are services (requiresShipping: false) → No shipping flow

## Adding New Service Products

To add a new service product that doesn't require shipping:

1. **Add to `src/data/products.js`**:
```javascript
{
  "id": "YourServiceId",
  "slug": "your-service-slug",
  "name": "Your Service Name",
  "price": 999,
  "requiresShipping": false,
  "productType": "service",
  "category": "service"
}
```

2. **When adding to cart**, ensure the product object includes these flags:
```javascript
const serviceProduct = {
  id: 'service-id',
  name: 'Service Name',
  price: 999,
  requiresShipping: false,
  productType: 'service',
};

addToCart(serviceProduct, 'Service', 'One-time', 1, 999, additionalOptions);
```

3. **No changes needed** in Checkout.jsx - it will automatically adapt!

## Testing Checklist

- [ ] Add "Book Site Visit" to cart
- [ ] Verify shipping address fields are hidden
- [ ] Verify shipping method section is hidden
- [ ] Verify shipping line item is hidden in summary
- [ ] Verify form validates with only contact fields
- [ ] Verify payment processes successfully
- [ ] Add physical product + service to cart
- [ ] Verify shipping fields appear for mixed cart
- [ ] Verify shipping costs are calculated for mixed cart

## Backend Considerations

When processing orders, the backend should:
1. Check `orderData.items[].requiresShipping` or `orderData.items[].productType === 'service'`
2. Skip shipment creation for service-only orders
3. Send appropriate confirmation emails (consultation booking vs. order shipment)
4. For Shiprocket integration: Only create shipments for orders with physical products

## Future Enhancements

1. **Service-Specific Fields**: Add custom fields for services (e.g., preferred consultation date/time)
2. **Multiple Service Types**: Support different service categories with unique workflows
3. **Digital Products**: Extend to handle downloadable/digital products
4. **Pickup Option**: Add "Store Pickup" as an alternative to shipping
