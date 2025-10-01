# Shopping Cart System for Calyco Paints

## Overview
A complete shopping cart system with invoice generation for the Calyco Paints website. Users can add products to cart, manage quantities, and generate downloadable invoices.

## Features

### 🛒 Shopping Cart
- **Add to Cart**: Click "Add to Cart" on any product page
- **Cart Icon**: Shows item count in navbar
- **Cart Modal**: View and manage cart items
- **Quantity Controls**: Increase/decrease quantities
- **Remove Items**: Delete items from cart
- **Persistent Storage**: Cart saved in localStorage

### 📄 Invoice Generation
- **PDF Invoice**: Generate professional invoices
- **Company Details**: Calyco Paints branding
- **Item Details**: Product name, finish, size, quantity, price
- **Tax Calculation**: 18% GST included
- **Download**: Automatic PDF download

### 🎨 UI Features
- **Animated Modals**: Smooth cart modal animations
- **Success Messages**: Confirmation when items added
- **Responsive Design**: Works on mobile and desktop
- **Color Coding**: Tier-based product organization

## How It Works

### 1. Adding to Cart
```javascript
// On product page
const { addToCart } = useCart();

// When user clicks "Add to Cart"
addToCart(product, selectedSheen, selectedSize, quantity);
```

### 2. Cart Management
```javascript
// Cart context provides:
const { 
  items,           // Array of cart items
  addToCart,       // Add item to cart
  removeFromCart,  // Remove item from cart
  updateQuantity,  // Update item quantity
  clearCart,       // Clear all items
  getCartTotal,    // Calculate total price
  getCartItemCount // Get total item count
} = useCart();
```

### 3. Invoice Generation
- Click "Generate Invoice" in cart modal
- Creates HTML invoice with Calyco branding
- Downloads as PDF file
- Includes all item details and totals

## Components

### CartContext.jsx
- Manages cart state across the app
- Handles localStorage persistence
- Provides cart management functions

### CartIcon.jsx
- Shows cart icon with item count
- Opens cart modal when clicked
- Responsive design for mobile/desktop

### CartModal.jsx
- Displays cart items in modal
- Quantity controls and remove buttons
- Checkout with invoice generation

### InvoiceGenerator.jsx
- Creates professional PDF invoices
- Includes company branding and details
- Automatic download functionality

## Cart Item Structure
```javascript
{
  id: "product-id",
  name: "Product Name",
  price: 499,
  selectedSheen: "Matte",
  selectedSize: "1L",
  quantity: 2,
  image: "/Assets/product-image.png"
}
```

## Invoice Features
- **Invoice Number**: Auto-generated (CAL-{timestamp})
- **Company Details**: Calyco Paints branding
- **Item List**: Product, finish, size, quantity, price
- **Subtotal**: Sum of all items
- **GST**: 18% tax calculation
- **Total**: Final amount with tax
- **Download**: Automatic PDF generation

## Usage Examples

### Add Product to Cart
1. Navigate to any product page (e.g., `/product/nova`)
2. Select sheen and size options
3. Choose quantity
4. Click "Add to Cart"
5. See success message and cart count update

### View Cart
1. Click cart icon in navbar
2. View all cart items
3. Adjust quantities or remove items
4. See total price

### Generate Invoice
1. Open cart modal
2. Click "Generate Invoice"
3. PDF downloads automatically
4. Invoice includes all cart items and totals

## Technical Details

### State Management
- **React Context**: Cart state shared across components
- **useReducer**: Complex cart state management
- **localStorage**: Persistent cart data

### File Structure
```
src/
├── context/
│   └── CartContext.jsx
├── components/
│   ├── CartIcon.jsx
│   ├── CartModal.jsx
│   └── InvoiceGenerator.jsx
└── pages/
    └── DynamicProductPage.jsx (updated)
```

### Dependencies
- **Framer Motion**: Animations
- **React Icons**: Icons
- **React Router**: Navigation
- **localStorage**: Data persistence

## Benefits

1. **User Experience**: Smooth cart management
2. **Professional**: Invoice generation for business
3. **Persistent**: Cart saved between sessions
4. **Responsive**: Works on all devices
5. **Scalable**: Easy to add new features

## Future Enhancements

- **Payment Integration**: Stripe/PayPal checkout
- **Order History**: Track past orders
- **Email Invoices**: Send via email
- **Bulk Orders**: Special pricing for large orders
- **Wishlist**: Save items for later

This cart system provides a complete e-commerce experience for Calyco Paints customers! 🎨 