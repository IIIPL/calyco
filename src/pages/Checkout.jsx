import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { InvoiceGenerator } from "../components/InvoiceGenerator";

const expressPayments = [
  { name: "Shop Pay", color: "bg-[#5a31f4]", text: "text-white" },
  { name: "PayPal", color: "bg-[#ffc439]", text: "text-black" },
  { name: "G Pay", color: "bg-black", text: "text-white" },
];

const Checkout = () => {
  const { items, getCartTotal } = useCart();
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

  const subtotal = getCartTotal();
  const shipping = 0; // Placeholder
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  };
  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  };
  const handlePayment = (e) => {
    e.preventDefault();
    setPaymentError("");
    setShowDummyModal(true);
  };
  const handleDummyPayment = (success) => {
    setShowDummyModal(false);
    if (success) {
      setShowInvoice(true);
    } else {
      setPaymentError("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-12">
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
          <div className="flex flex-col gap-4">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 border-b pb-4 last:border-b-0">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-contain rounded border" />
                <div className="flex-1">
                  <div className="font-semibold text-[#493657]">{item.name}</div>
                  <div className="text-xs text-gray-600">{item.selectedSheen} / {item.selectedSize}</div>
                </div>
                <div className="font-bold text-[#493657]">₹{item.price}</div>
              </div>
            ))}
          </div>
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
              className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
            >
              Pay Now
            </button>
          </form>
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
    </div>
  );
};

export default Checkout; 