import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";

export default function ShippingDelivery() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F3EE] text-[#0F1221] font-poppins">
      <SEO
        title="Shipping & Delivery Policy | CALYCO Paints"
        description="CALYCO's complete shipping & delivery policy. Learn about free shipping, delivery timelines, coverage areas, charges, and customer support."
        ogType="website"
      />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-24 pb-16 md:pt-28 bg-[#0F1221]">
          <div className="absolute inset-0">
            <img
              src="/Assets/InteriorInspiratoin/living-room.png"
              alt="CALYCO paints delivery"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/35 to-black/20" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 text-center md:px-10 md:py-20 lg:px-12">
            <span className="inline-block rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white/85 backdrop-blur mb-6">
              Shipping & Delivery Policy
            </span>
            <h1 className="text-3xl font-bold text-white md:text-5xl mb-4">
              Fast, Reliable, and Eco-Conscious Delivery for Your CALYCO Order
            </h1>
            <p className="mx-auto max-w-3xl text-base text-white/90 md:text-lg mb-8">
              At CALYCO, we are committed to delivering premium paints and sealers to you quickly, safely, and with care for both your home and the environment.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="rounded-xl bg-[#D4AF37] px-8 py-3 text-base font-semibold text-[#0F1221] shadow-lg transition hover:bg-[#bb9831]"
            >
              Contact Support Team
            </button>
            <p className="mt-6 text-xs text-white/70">Last updated: 30 October 2025</p>
          </div>
        </section>


        {/* Overview */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-6">Shipping Policy Overview</h2>
            <p className="text-lg text-[#31274B]/85 mb-6">
              CALYCO is dedicated to providing fast, reliable, and eco-conscious delivery services across India. We partner with leading logistics providers to ensure your premium paint products reach you in perfect condition.
            </p>
            <p className="text-base text-[#31274B]/85 mb-4">
              This policy outlines our delivery coverage, timelines, costs, and customer support protocols. We continuously monitor and improve our shipping processes to meet your expectations.
            </p>
            <div className="grid gap-4 md:grid-cols-3 mt-8">
              <div className="rounded-xl bg-[#FBF9F6] p-5 border border-[#0F1221]/10">
                <div className="text-2xl mb-2">🇮🇳</div>
                <h3 className="font-semibold text-[#4B007D] mb-1">Pan-India Coverage</h3>
                <p className="text-sm text-[#31274B]/80">Delivering to 29 states and 8 union territories</p>
              </div>
              <div className="rounded-xl bg-[#FBF9F6] p-5 border border-[#0F1221]/10">
                <div className="text-2xl mb-2">📦</div>
                <h3 className="font-semibold text-[#4B007D] mb-1">Secure Packaging</h3>
                <p className="text-sm text-[#31274B]/80">Eco-friendly materials with spill-proof protection</p>
              </div>
              <div className="rounded-xl bg-[#FBF9F6] p-5 border border-[#0F1221]/10">
                <div className="text-2xl mb-2">🚚</div>
                <h3 className="font-semibold text-[#4B007D] mb-1">Trusted Partners</h3>
                <p className="text-sm text-[#31274B]/80">Working with India's leading courier services</p>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage & Timelines */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Delivery Coverage & Timelines</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              We deliver CALYCO products across India with precision and reliability. All delivery timelines mentioned are business days (Monday to Saturday, excluding public holidays).
            </p>

            <div className="mb-10">
              <h3 className="text-xl font-semibold text-[#4B007D] mb-4">Serviceable Areas</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <h4 className="font-semibold text-[#4B007D] mb-2">✓ Urban Coverage</h4>
                  <ul className="space-y-2 text-sm text-[#31274B]/85">
                    <li>• All major metro cities (Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata, Pune, Ahmedabad)</li>
                    <li>• Tier 2 cities and state capitals</li>
                    <li>• Industrial hubs and commercial zones</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <h4 className="font-semibold text-[#4B007D] mb-2">✓ Extended Reach</h4>
                  <ul className="space-y-2 text-sm text-[#31274B]/85">
                    <li>• Tier 3 cities and towns</li>
                    <li>• Rural areas (via India Post and regional partners)</li>
                    <li>• Remote locations with special handling</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-semibold text-[#4B007D] mb-4">Standard Delivery Timelines</h3>
              <div className="overflow-x-auto rounded-xl shadow-sm">
                <table className="min-w-full border-collapse">
                  <thead className="bg-[#4B007D] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Location Type</th>
                      <th className="px-6 py-4 text-left font-semibold">Estimated Delivery</th>
                      <th className="px-6 py-4 text-left font-semibold">Coverage Details</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-b border-[#0F1221]/10">
                      <td className="px-6 py-4 font-semibold text-[#4B007D]">Metro Cities</td>
                      <td className="px-6 py-4 text-[#31274B]/85">2–3 business days</td>
                      <td className="px-6 py-4 text-sm text-[#31274B]/80">Express delivery available for select pin codes</td>
                    </tr>
                    <tr className="border-b border-[#0F1221]/10">
                      <td className="px-6 py-4 font-semibold text-[#4B007D]">Tier 2 Cities</td>
                      <td className="px-6 py-4 text-[#31274B]/85">3–5 business days</td>
                      <td className="px-6 py-4 text-sm text-[#31274B]/80">State capitals and major towns</td>
                    </tr>
                    <tr className="border-b border-[#0F1221]/10">
                      <td className="px-6 py-4 font-semibold text-[#4B007D]">Tier 3 Cities</td>
                      <td className="px-6 py-4 text-[#31274B]/85">4–6 business days</td>
                      <td className="px-6 py-4 text-sm text-[#31274B]/80">Smaller towns and district headquarters</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-semibold text-[#4B007D]">Remote Areas</td>
                      <td className="px-6 py-4 text-[#31274B]/85">5–7 business days</td>
                      <td className="px-6 py-4 text-sm text-[#31274B]/80">Rural and hard-to-reach locations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-[#31274B]/70 italic">
                * Delivery timelines may vary during peak seasons, festive periods, or due to unforeseen circumstances such as natural disasters, political unrest, or logistical challenges.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4B007D] mb-3">Order Processing Time</h3>
              <p className="text-[#31274B]/85 mb-3">
                Orders are typically processed within 24-48 hours of confirmation. Orders placed before 2:00 PM IST on business days are usually processed the same day.
              </p>
              <ul className="space-y-2 text-sm text-[#31274B]/80">
                <li>• <strong>Order Cut-off Time:</strong> 2:00 PM IST (Monday to Saturday)</li>
                <li>• <strong>Processing Days:</strong> Monday to Saturday (excluding public holidays)</li>
                <li>• <strong>Dispatch Notification:</strong> You'll receive an email/SMS with tracking details once your order is dispatched</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Delivery Charges */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Delivery Charges & Shipping Options</h2>
            <p className="text-lg text-[#31274B]/85 mb-10">
              We offer transparent, competitive shipping rates with free delivery on qualifying orders. Choose the shipping option that best suits your project timeline and budget.
            </p>

            <div className="space-y-6">
              {/* Free Delivery */}
              <div className="rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 p-6 shadow-sm border-l-4 border-[#D4AF37]">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-[#4B007D]">🎉 Free Standard Delivery</h3>
                  <span className="rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-bold text-white">MOST POPULAR</span>
                </div>
                <p className="text-[#31274B]/85 mb-3 text-lg">
                  <span className="font-bold text-[#D4AF37]">Orders of ₹2,500 and above</span> qualify for free standard delivery to all serviceable pin codes across India.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-semibold text-[#4B007D] text-sm mb-2">What's Included:</h4>
                    <ul className="space-y-1 text-sm text-[#31274B]/80">
                      <li>✓ No hidden charges or surprise fees</li>
                      <li>✓ Eco-friendly, recyclable packaging materials</li>
                      <li>✓ Courier partner tracking via SMS/email</li>
                      <li>✓ Insurance coverage up to order value</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#4B007D] text-sm mb-2">Delivery Timeline:</h4>
                    <ul className="space-y-1 text-sm text-[#31274B]/80">
                      <li>• Metro cities: 2-3 business days</li>
                      <li>• Tier 2/3 cities: 3-6 business days</li>
                      <li>• Remote areas: 5-7 business days</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Standard Delivery */}
              <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-[#4B007D]">
                <h3 className="text-xl font-bold text-[#4B007D] mb-3">📦 Standard Delivery (Paid)</h3>
                <p className="text-[#31274B]/85 mb-3">
                  <span className="font-bold text-[#4B007D]">Flat ₹150 delivery charge</span> for orders below ₹2,500 to all standard serviceable locations.
                </p>
                <ul className="space-y-2 text-sm text-[#31274B]/80">
                  <li>✓ Same packaging and handling standards as free delivery</li>
                  <li>✓ Reliable courier partners (Blue Dart, Delhivery, FedEx)</li>
                  <li>✓ Tracking information provided via SMS and email</li>
                  <li>✓ Secure, tamper-proof packaging with brand seals</li>
                  <li>✓ Safe handling with specialized care for liquid products</li>
                </ul>
              </div>

              {/* Express Delivery */}
              <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-[#4B007D]">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-[#4B007D]">⚡ Express Delivery</h3>
                  <span className="rounded-full bg-[#4B007D] px-3 py-1 text-xs font-bold text-white">METRO ONLY</span>
                </div>
                <p className="text-[#31274B]/85 mb-3">
                  <span className="font-bold text-[#4B007D]">Next-day or same-day delivery</span> available for select pin codes in major metro cities. Additional charges apply based on location.
                </p>
                <ul className="space-y-2 text-sm text-[#31274B]/80">
                  <li>✓ Available in: Mumbai, Delhi NCR, Bangalore, Chennai, Hyderabad, Pune</li>
                  <li>✓ Same-day delivery: Orders placed before 10:00 AM</li>
                  <li>✓ Next-day delivery: Orders placed before 5:00 PM</li>
                  <li>✓ Express charges: ₹300-₹500 (calculated at checkout)</li>
                  <li>✓ Priority handling and faster processing</li>
                </ul>
              </div>

              {/* Remote Areas */}
              <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-[#D4AF37]">
                <h3 className="text-xl font-bold text-[#4B007D] mb-3">🏔️ Remote Area Delivery</h3>
                <p className="text-[#31274B]/85 mb-3">
                  <span className="font-bold text-[#D4AF37]">Additional ₹300 surcharge</span> for deliveries to remote, hilly, island, or hard-to-reach locations.
                </p>
                <ul className="space-y-2 text-sm text-[#31274B]/80">
                  <li>✓ Covers: Hill stations, island territories, north-eastern states, border areas</li>
                  <li>✓ Special handling with extra protective packaging</li>
                  <li>✓ Extended delivery timeline: 5-7 business days (may extend to 10 days)</li>
                  <li>✓ Partnered with India Post and regional logistics for last-mile delivery</li>
                  <li>✓ Our team will contact you before dispatch to confirm address details</li>
                </ul>
              </div>

              {/* Bulk Orders */}
              <div className="rounded-2xl bg-[#FBF9F6] p-6 shadow-sm">
                <h3 className="text-xl font-bold text-[#4B007D] mb-3">🏗️ Bulk & Commercial Orders</h3>
                <p className="text-[#31274B]/85 mb-3">
                  For large-scale projects, commercial orders, or dealer shipments, we offer customized freight solutions with negotiated rates.
                </p>
                <ul className="space-y-2 text-sm text-[#31274B]/80">
                  <li>✓ Pallet or truckload shipping available</li>
                  <li>✓ Dedicated account manager for coordination</li>
                  <li>✓ Flexible delivery scheduling (including weekends)</li>
                  <li>✓ Volume discounts on shipping costs</li>
                  <li>✓ Contact our corporate sales team at <a href="mailto:sales@calycopaints.com" className="text-[#4B007D] underline">sales@calycopaints.com</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Order Notifications */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Order Tracking & Notifications</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              Stay informed at every step with proactive notifications from our courier partners.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4B007D] text-white font-bold mr-3">1</div>
                  <h3 className="text-lg font-semibold text-[#4B007D]">Order Confirmation</h3>
                </div>
                <p className="text-[#31274B]/85 text-sm">
                  Immediately after placing your order, you'll receive a confirmation email with your order number, items purchased, and estimated delivery date.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4B007D] text-white font-bold mr-3">2</div>
                  <h3 className="text-lg font-semibold text-[#4B007D]">Dispatch Notification</h3>
                </div>
                <p className="text-[#31274B]/85 text-sm">
                  Once your order is dispatched, you'll receive an email and SMS with your tracking number and courier partner details. This typically happens within 24-48 hours.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4B007D] text-white font-bold mr-3">3</div>
                  <h3 className="text-lg font-semibold text-[#4B007D]">Tracking Updates</h3>
                </div>
                <p className="text-[#31274B]/85 text-sm">
                  Use the tracking number provided to monitor your package on the courier partner's website. You'll also receive SMS updates at key milestones.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4B007D] text-white font-bold mr-3">4</div>
                  <h3 className="text-lg font-semibold text-[#4B007D]">Delivery Notification</h3>
                </div>
                <p className="text-[#31274B]/85 text-sm">
                  On the day of delivery, you'll receive a notification when your package is out for delivery. The delivery partner may call to confirm your availability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Handling Delays */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Delivery Delays & Exceptions</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              While we strive for on-time deliveries, there may be rare delays due to factors beyond our control. Here's how we handle such situations:
            </p>

            <div className="space-y-4">
              <div className="rounded-2xl bg-[#FBF9F6] p-6 border-l-4 border-[#D4AF37]">
                <h3 className="text-lg font-semibold text-[#4B007D] mb-2">🌧️ Weather & Natural Disasters</h3>
                <p className="text-[#31274B]/85 text-sm mb-2">
                  Extreme weather conditions (heavy rains, floods, cyclones, snowfall) or natural disasters may cause temporary suspension or delay in courier services.
                </p>
                <p className="text-[#31274B]/80 text-sm">
                  <strong>Our Action:</strong> We monitor weather alerts and proactively inform you via email/SMS if your delivery is affected. Deliveries resume as soon as conditions improve.
                </p>
              </div>

              <div className="rounded-2xl bg-[#FBF9F6] p-6 border-l-4 border-[#4B007D]">
                <h3 className="text-lg font-semibold text-[#4B007D] mb-2">🏠 Address & Contact Issues</h3>
                <p className="text-[#31274B]/85 text-sm mb-2">
                  Incorrect or incomplete address, unreachable phone number, or unavailability at delivery time can cause delivery failures.
                </p>
                <p className="text-[#31274B]/80 text-sm">
                  <strong>Our Action:</strong> Our logistics team will contact you immediately to verify your address and reschedule delivery. We make up to 3 delivery attempts.
                </p>
              </div>

              <div className="rounded-2xl bg-[#FBF9F6] p-6 border-l-4 border-[#4B007D]">
                <h3 className="text-lg font-semibold text-[#4B007D] mb-2">🎄 Festive & Peak Season Delays</h3>
                <p className="text-[#31274B]/85 text-sm mb-2">
                  During major festivals (Diwali, Holi, Eid), courier services experience high volumes that may add 1-3 business days to delivery timelines.
                </p>
                <p className="text-[#31274B]/80 text-sm">
                  <strong>Our Action:</strong> We display updated delivery estimates during checkout for peak periods and work with multiple courier partners to minimize delays.
                </p>
              </div>

              <div className="rounded-2xl bg-[#FBF9F6] p-6 border-l-4 border-[#4B007D]">
                <h3 className="text-lg font-semibold text-[#4B007D] mb-2">🚧 Regional Disruptions</h3>
                <p className="text-[#31274B]/85 text-sm mb-2">
                  Local strikes, political unrest, road blockages, or restricted zones can temporarily affect delivery operations in specific areas.
                </p>
                <p className="text-[#31274B]/80 text-sm">
                  <strong>Our Action:</strong> We closely monitor ground situations and keep you informed. In case of extended delays, we offer the option to cancel and refund.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-[#4B007D] p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">🤝 Our Commitment to You</h3>
              <p className="text-white/90 text-sm">
                If your order is significantly delayed beyond the estimated delivery date (7+ business days), please contact our support team at <a href="tel:+919958966881" className="underline">+91-99589-66881</a> or <a href="mailto:support@calycopaints.com" className="underline">support@calycopaints.com</a>. We'll investigate and provide a resolution.
              </p>
            </div>
          </div>
        </section>

        {/* Packaging & Safety */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Packaging, Safety & Environmental Standards</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              Your CALYCO products are packaged with the highest standards of safety, protection, and environmental responsibility.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl mb-3">📦</div>
                <h3 className="text-lg font-bold text-[#4B007D] mb-2">Multi-Layer Protection</h3>
                <p className="text-sm text-[#31274B]/85">
                  Every paint container is individually sealed with tamper-proof lids, wrapped in bubble wrap or foam inserts, and placed in sturdy corrugated cartons.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl mb-3">♻️</div>
                <h3 className="text-lg font-bold text-[#4B007D] mb-2">Eco-Friendly Materials</h3>
                <p className="text-sm text-[#31274B]/85">
                  We use recyclable corrugated boxes, biodegradable fillers, and minimal plastic packaging. Our materials are FSC-certified and sustainably sourced.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl mb-3">✅</div>
                <h3 className="text-lg font-bold text-[#4B007D] mb-2">Safety Compliance</h3>
                <p className="text-sm text-[#31274B]/85">
                  All shipments comply with hazardous material transport regulations. Water-based and low-VOC products are packed according to safety guidelines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Safe, Timely, and Trusted */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4 text-center">Your CALYCO Order is Safe, Timely, and Handled with Care</h2>
            <p className="text-lg text-[#31274B]/85 mb-10 text-center max-w-3xl mx-auto">
              We understand that your paint project is important. That's why we go the extra mile to ensure your CALYCO products arrive in perfect condition, on time, and with the care they deserve.
            </p>

            <div className="grid gap-6 md:grid-cols-3 mb-10">
              <div className="rounded-2xl bg-[#FBF9F6] p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#4B007D] text-white text-2xl">
                  📦
                </div>
                <h3 className="text-lg font-bold text-[#4B007D] mb-2">Safe Handling</h3>
                <p className="text-sm text-[#31274B]/85">Specialized packaging designed for liquid paint products to prevent leaks, spills, and breakage during transit.</p>
              </div>
              <div className="rounded-2xl bg-[#FBF9F6] p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37] text-white text-2xl">
                  ⏱️
                </div>
                <h3 className="text-lg font-bold text-[#4B007D] mb-2">On-Time Delivery</h3>
                <p className="text-sm text-[#31274B]/85">Trusted logistics partners ensure reliable delivery within promised timelines—98% on-time delivery rate.</p>
              </div>
              <div className="rounded-2xl bg-[#FBF9F6] p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#4B007D] text-white text-2xl">
                  💬
                </div>
                <h3 className="text-lg font-bold text-[#4B007D] mb-2">Dedicated Support</h3>
                <p className="text-sm text-[#31274B]/85">Responsive customer service team available for any order or delivery questions—reach us 7 days a week.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl bg-[#FBF9F6] p-6">
                <h3 className="text-lg font-semibold text-[#4B007D] mb-3">🛡️ Insurance & Protection</h3>
                <p className="text-sm text-[#31274B]/85 mb-2">
                  All shipments are insured against loss or damage during transit up to the full order value. In the rare event of damage, we process replacements or refunds within 48 hours.
                </p>
                <p className="text-xs text-[#31274B]/70 mt-2">
                  To file a claim, contact us within 48 hours of delivery with photos of damaged packaging and products.
                </p>
              </div>

              <div className="rounded-xl bg-[#FBF9F6] p-6">
                <h3 className="text-lg font-semibold text-[#4B007D] mb-3">📝 Proof of Delivery</h3>
                <p className="text-sm text-[#31274B]/85 mb-2">
                  Signed proof of delivery (POD) is captured digitally by our courier partners. For contactless deliveries, a photo of the delivered package is taken.
                </p>
                <p className="text-xs text-[#31274B]/70 mt-2">
                  POD documents are available upon request from our customer support team.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-br from-[#4B007D] to-[#2E0053]">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Need Help With Your Delivery?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
              Our customer support team is here to assist you with any shipping or delivery questions. We're available 7 days a week to ensure your CALYCO experience is seamless.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="tel:+919958966881"
                className="inline-block rounded-xl bg-[#D4AF37] px-8 py-3 text-base font-semibold text-[#0F1221] shadow-lg transition hover:bg-[#bb9831]"
              >
                📞 Call: +91-99589-66881
              </a>
              <a
                href="mailto:support@calycopaints.com"
                className="inline-block rounded-xl border-2 border-white/30 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                ✉️ Email: support@calycopaints.com
              </a>
            </div>

            <div className="text-sm text-white/80">
              <p className="mb-1"><strong>Customer Support Hours:</strong></p>
              <p>Monday - Saturday: 9:00 AM - 7:00 PM IST</p>
              <p>Sunday: 10:00 AM - 5:00 PM IST</p>
            </div>

            <p className="mt-8 text-sm text-white/70 italic">
              Choose CALYCO for safe, timely, and eco-conscious delivery—every order, every time.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
