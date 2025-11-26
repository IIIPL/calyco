import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { InvoiceGenerator } from "../components/InvoiceGenerator";
import RazorpayPayment from "../components/RazorpayPayment";
import { paymentService } from "../services/paymentService";

const expressPayments = [
  { name: "Shop Pay", color: "bg-[#5a31f4]", text: "text-white" },
  { name: "PayPal", color: "bg-[#ffc439]", text: "text-black" },
  { name: "G Pay", color: "bg-black", text: "text-white" },
];

const Checkout = () => {
  const { items, getCartTotal, removeFromCart, clearCart } = useCart();
  const [user, setUser] = useState({ email: "", subscribe: true });
  const [address, setAddress] = useState({
    country: "India",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    postcode: "",
    phone: "",
    sms: false,
  });
  const [discount, setDiscount] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [showDummyModal, setShowDummyModal] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showRazorpayPayment, setShowRazorpayPayment] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [razorpayOrderId, setRazorpayOrderId] = useState(null);
  const [shopifyDebugInfo, setShopifyDebugInfo] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('shopifyCheckoutDebug');
      if (raw) {
        const parsed = JSON.parse(raw);
        setShopifyDebugInfo(parsed);
        console.group('[CALYCO CHECKOUT][SESSION]');
        console.log('Status:', parsed.status);
        if (parsed.extra) {
          console.log('Extra:', parsed.extra);
        }
        if (parsed.steps) {
          console.log('Steps:', parsed.steps);
        }
        console.groupEnd();
        sessionStorage.removeItem('shopifyCheckoutDebug');
      }
    } catch (err) {
      console.warn('[CALYCO CHECKOUT] Failed to read session debug info', err);
    }
  }, []);

  const rawSubtotal = getCartTotal();
  const subtotal = isNaN(rawSubtotal) ? 0 : rawSubtotal;
  const shipping = 0; // Placeholder
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  // Debug logging
  console.log('Cart items:', items);
  console.log('Subtotal calculation:', subtotal);
  console.log('Tax calculation:', tax);
  console.log('Total calculation:', total);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  };
  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  };
  const handlePayment = async (e) => {
    e.preventDefault();
    setPaymentError("");
    setIsProcessingPayment(true);

    try {
      // Validate required fields
      if (!user.email || !address.firstName || !address.lastName || !address.address || !address.city || !address.postcode || !address.phone) {
        setPaymentError("Please fill in all required fields");
        setIsProcessingPayment(false);
        return;
      }

      // Validate cart has items
      if (!items || items.length === 0) {
        setPaymentError("Your cart is empty");
        setIsProcessingPayment(false);
        return;
      }

      // Check if Razorpay is configured
      const razorpayKey = import.meta.env.VITE_RAZORPAY_ID;
      console.log('Environment check - Razorpay Key:', razorpayKey);

      if (!razorpayKey || razorpayKey === 'your_razorpay_key_id_here') {
        // Fallback to dummy payment for testing
        setPaymentError("Razorpay not configured. Using test payment mode.");
        setShowDummyModal(true);
        setIsProcessingPayment(false);
        return;
      }

      // Step 1: Create order record in database
      console.log('[Checkout] Creating order record...');
      const orderRecord = await paymentService.createOrderRecord({
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selectedSheen: item.selectedSheen,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          image: item.image
        })),
        customer: {
          email: user.email,
          firstName: address.firstName,
          lastName: address.lastName,
          phone: address.phone,
          address: address.address,
          apartment: address.apartment,
          city: address.city,
          postcode: address.postcode,
          country: address.country
        },
        subtotal,
        tax,
        shipping,
        total,
        currency: 'INR'
      });

      console.log('[Checkout] Order record created:', orderRecord.id);
      setOrderId(orderRecord.id);

      // Step 2: Create Razorpay order
      console.log('[Checkout] Creating Razorpay order...');
      const razorpayOrder = await paymentService.createOrder(
        total,
        'INR',
        orderRecord.id,
        {
          customer_name: `${address.firstName} ${address.lastName}`,
          customer_email: user.email,
          order_id: orderRecord.id
        }
      );

      console.log('[Checkout] Razorpay order created:', razorpayOrder.id);

      // Step 3: Update order with Razorpay order ID
      await paymentService.updateOrderStatus(orderRecord.id, 'pending', {
        razorpayOrderId: razorpayOrder.id
      });

      // Step 4: Store Razorpay order ID and show payment modal
      setRazorpayOrderId(razorpayOrder.id);
      setShowRazorpayPayment(true);
    } catch (error) {
      console.error('[Checkout] Error initializing payment:', error);
      setPaymentError(`Failed to initialize payment: ${error.message}`);
      setIsProcessingPayment(false);
    }
  };
  const handleDummyPayment = (success) => {
    setShowDummyModal(false);
    if (success) {
      setShowInvoice(true);
    } else {
      setPaymentError("Payment failed. Please try again.");
    }
  };

  const handleRazorpaySuccess = async (response) => {
    try {
      console.log('[Checkout] Payment successful, verifying...', response);

      // Verify payment signature
      const verification = await paymentService.verifyPayment(response);

      if (verification.success && verification.verified) {
        console.log('[Checkout] Payment verified successfully');

        // Update order status to paid
        if (orderId) {
          await paymentService.updateOrderStatus(orderId, 'paid', {
            status: 'paid',
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature
          });
          console.log('[Checkout] Order status updated to paid');
        }

        // Clear cart and show invoice
        setShowRazorpayPayment(false);
        setIsProcessingPayment(false);
        setShowInvoice(true);
        clearCart();
      } else {
        console.error('[Checkout] Payment verification failed');
        setPaymentError("Payment verification failed. Please contact support.");
        setIsProcessingPayment(false);

        // Update order status to failed
        if (orderId) {
          await paymentService.updateOrderStatus(orderId, 'failed', {
            status: 'failed',
            error: 'Payment verification failed'
          });
        }
      }
    } catch (error) {
      console.error('[Checkout] Error during payment verification:', error);
      setPaymentError(`Payment verification failed: ${error.message}`);
      setIsProcessingPayment(false);

      // Update order status to failed
      if (orderId) {
        await paymentService.updateOrderStatus(orderId, 'failed', {
          status: 'failed',
          error: error.message
        });
      }
    }
  };

  const handleRazorpayError = (error) => {
    setPaymentError("Payment failed. Please try again.");
    setShowRazorpayPayment(false);
    setIsProcessingPayment(false);
  };

  const handleRazorpayClose = () => {
    setShowRazorpayPayment(false);
    setIsProcessingPayment(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-20">
      {shopifyDebugInfo && (
        <div className="max-w-3xl mx-auto mb-6 px-4">
          <div
            className={`rounded-xl border p-4 text-sm ${
              shopifyDebugInfo.status === 'shopify'
                ? 'border-green-200 bg-green-50 text-green-900'
                : 'border-amber-200 bg-amber-50 text-amber-900'
            }`}
          >
            <p className="font-semibold">
              Shopify checkout {shopifyDebugInfo.status === 'shopify' ? 'succeeded. Redirecting to Shopify checkout.' : 'did not run; using local checkout instead.'}
            </p>
            {shopifyDebugInfo.status !== 'shopify' && shopifyDebugInfo.extra?.reason && (
              <p className="mt-1">Reason: {shopifyDebugInfo.extra.reason}</p>
            )}
          </div>
        </div>
      )}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* LEFT: Checkout Form */}
        <div className="p-8 flex flex-col gap-8">
          {/* Express Checkout */}
          <div>
            <div className="text-center font-semibold mb-2">Express checkout</div>
            <div className="flex gap-4 justify-center mb-4">
              {expressPayments.map((p) => (
                <button key={p.name} className={`flex-1 py-3 rounded-lg font-bold text-lg ${p.color} ${p.text}`}>{p.name}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 border-t" />
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 border-t" />
            </div>
          </div>
          {/* Contact */}
          <div>
            <div className="font-bold text-lg mb-2">Contact</div>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full border p-2 rounded mb-2"
              required
            />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="subscribe" checked={user.subscribe} onChange={handleInputChange} />
              Email me with news and offers
            </label>
          </div>
          {/* Delivery */}
          <div>
            <div className="font-bold text-lg mb-2">Delivery</div>
            <select name="country" value={address.country} onChange={handleAddressChange} className="w-full border p-2 rounded mb-2">
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
              {/* Add more countries as needed */}
            </select>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input name="firstName" value={address.firstName} onChange={handleAddressChange} placeholder="First name" className="border p-2 rounded" required />
              <input name="lastName" value={address.lastName} onChange={handleAddressChange} placeholder="Last name" className="border p-2 rounded" required />
            </div>
            <input name="company" value={address.company} onChange={handleAddressChange} placeholder="Company (optional)" className="w-full border p-2 rounded mb-2" />
            <input name="address" value={address.address} onChange={handleAddressChange} placeholder="Address" className="w-full border p-2 rounded mb-2" required />
            <input name="apartment" value={address.apartment} onChange={handleAddressChange} placeholder="Apartment, suite, etc. (optional)" className="w-full border p-2 rounded mb-2" />
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input name="city" value={address.city} onChange={handleAddressChange} placeholder="City" className="border p-2 rounded" required />
              <input name="postcode" value={address.postcode} onChange={handleAddressChange} placeholder="Postcode" className="border p-2 rounded" required />
            </div>
            <input name="phone" value={address.phone} onChange={handleAddressChange} placeholder="Phone" className="w-full border p-2 rounded mb-2" required />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="sms" checked={address.sms} onChange={handleAddressChange} />
              Text me with news and offers
            </label>
          </div>
          {/* Shipping Method */}
          <div>
            <div className="font-bold text-lg mb-2">Shipping method</div>
            <div className="bg-gray-100 p-4 rounded text-gray-500 text-sm">Enter your shipping address to view available shipping methods.</div>
          </div>
        </div>
        {/* RIGHT: Cart Summary */}
        <div className="bg-gray-50 p-8 flex flex-col gap-6 min-h-full">
          {/* Cart Header with Clear All Button */}
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-lg font-semibold text-[#493657]">Order Summary</h3>
            {items.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all items from your cart?')) {
                    clearCart();
                  }
                }}
                className="text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
          
          <div className="flex flex-col gap-4">
            {items.length > 0 ? (
              items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 border-b pb-4 last:border-b-0 relative">
                  {/* Product Image - Generate SVG for colors or use existing image */}
                  <div className="w-14 h-14 rounded border overflow-hidden flex-shrink-0">
                    {item.selectedColor?.hex ? (
                      // Generate SVG for color swatches (same as product page)
                      <img 
                        src={`data:image/svg+xml;base64,${btoa(`
                          <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                            <rect width="56" height="56" fill="${item.selectedColor.hex}"/>
                          </svg>
                        `)}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      // Use existing image for non-color products
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="font-semibold text-[#493657]">{item.name}</div>
                    <div className="text-xs text-gray-600">{item.selectedSheen} / {item.selectedSize}</div>
                    {item.selectedColor?.name && (
                      <div className="text-xs text-gray-500">Color: {item.selectedColor.name}</div>
                    )}
                  </div>
                  
                  {/* Price */}
                  <div className="font-bold text-[#493657]">₹{item.price}</div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item)}
                    className="ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                    title="Remove item"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-lg font-medium mb-2">Your cart is empty</p>
                <p className="text-sm">Add some products to get started</p>
              </div>
            )}
          </div>
          {/* Only show checkout elements when cart has items */}
          {items.length > 0 && (
            <>
              {/* Discount code */}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Discount code or gift card"
                  value={discount}
                  onChange={e => setDiscount(e.target.value)}
                  className="flex-1 border p-2 rounded"
                />
                <button className="px-4 py-2 bg-gray-200 rounded font-semibold">Apply</button>
              </div>
              {/* Subtotal, shipping, total */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-sm">Enter shipping address</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <div className="text-xs text-gray-500">Including ₹{tax} in taxes</div>
              </div>
              {/* Payment Button */}
              <form onSubmit={handlePayment} className="mt-4">
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isProcessingPayment ? "Processing..." : "Pay Now"}
                </button>
              </form>
            </>
          )}
          {paymentError && (
            <div className="text-red-600 font-semibold mt-2">{paymentError}</div>
          )}
          {showDummyModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-bold mb-4">Dummy Payment Sandbox</h2>
                <p className="mb-4">Simulate a payment outcome:</p>
                <div className="flex gap-4">
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => handleDummyPayment(true)}
                  >
                    Simulate Success
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => handleDummyPayment(false)}
                  >
                    Simulate Failure
                  </button>
                </div>
              </div>
            </div>
          )}
          {showInvoice && (
            <div className="mt-8">
              <InvoiceGenerator items={items} total={total} onClose={() => setShowInvoice(false)} />
            </div>
          )}
        </div>
      </div>

      {/* Razorpay Payment Component */}
      {showRazorpayPayment && razorpayOrderId && (
        <RazorpayPayment
          amount={total}
          currency="INR"
          orderId={razorpayOrderId}
          customerDetails={{
            firstName: address.firstName,
            lastName: address.lastName,
            email: user.email,
            phone: address.phone,
            address: address.address,
            city: address.city,
            postcode: address.postcode,
          }}
          onSuccess={handleRazorpaySuccess}
          onError={handleRazorpayError}
          onClose={handleRazorpayClose}
        />
      )}
    </div>
  );
};

export default Checkout; 