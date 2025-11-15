import React, { useEffect } from "react";
import { getTypographyClasses, getButtonClasses } from "../../data/admin/typography";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";


export default function ReturnsRefunds() {
  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="min-h-screen bg-[#F6F3EE] text-[#0F1221] font-poppins">
      <SEO
        title="Returns & Refunds Policy | CALYCO Paints"
        description="CALYCO's comprehensive returns and refunds policy. Learn about our 30-day return window, eligibility criteria, refund timelines, and hassle-free return process."
        ogType="website"
      />


      <main>
        {/* Hero */}
        <section className="relative h-[75vh] sm:h-[65vh] md:h-[70vh] lg:h-[70vh] overflow-hidden bg-[#0F1221]">
          <div className="absolute inset-0">
            <img
              src="/Assets/InteriorInspiratoin/living-room.webp"
              alt="CALYCO paints returns and refunds"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-10 lg:px-12 flex items-center justify-center h-full"><div>
            <span className="inline-block rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white/85 backdrop-blur mb-6">
              Returns & Refunds Policy
            </span>
            <h1 className="text-3xl font-bold text-white md:text-5xl mb-4">
              Returns & Refunds
            </h1>
            <p className="mx-auto max-w-3xl text-base text-white/90 md:text-lg mb-8">
              30-day return window for unopened products
            </p>
            <p className="mt-6 text-xs text-white/70">Last updated: 30 October 2025</p></div></div>
        </section>


        {/* Overview */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#0F1221] mb-6">Return Policy Overview</h2>
            <p className="text-lg text-[#31274B]/85 mb-6">
              At CALYCO, customer satisfaction is our priority. If you're not completely satisfied with your purchase, we're here to help with returns, exchanges, and refunds.
            </p>
            <p className="text-base text-[#31274B]/85 mb-4">
              Our team is committed to resolving issues quickly and transparently. Review the key conditions below before initiating a return request.
            </p>
            <div className="grid gap-4 md:grid-cols-3 mt-8">
              <div className="rounded-xl bg-[#FBF9F6] p-5 border border-[#0F1221]/10">
                <div className="text-2xl mb-2">📅</div>
                <h3 className="font-semibold text-[#0F1221] mb-1">30-Day Return Window</h3>
                <p className="text-sm text-[#31274B]/80">Returns accepted within 30 days of delivery</p>
              </div>
              <div className="rounded-xl bg-[#FBF9F6] p-5 border border-[#0F1221]/10">
                <div className="text-2xl mb-2">📦</div>
                <h3 className="font-semibold text-[#0F1221] mb-1">Original Packaging</h3>
                <p className="text-sm text-[#31274B]/80">Items must be unopened and in original condition</p>
              </div>
              <div className="rounded-xl bg-[#FBF9F6] p-5 border border-[#0F1221]/10">
                <div className="text-2xl mb-2">✅</div>
                <h3 className="font-semibold text-[#0F1221] mb-1">Quality Guaranteed</h3>
                <p className="text-sm text-[#31274B]/80">Full support for defects and quality issues</p>
              </div>
            </div>
          </div>
        </section>


        {/* Eligibility Criteria */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#0F1221] mb-4">Eligibility Criteria</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              To ensure a smooth return process, please review the following eligibility requirements:
            </p>


            <div className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-[#D4AF37]">
                <h3 className="text-xl font-bold text-[#0F1221] mb-3">✓ Eligible for Return</h3>
                <ul className="space-y-2 text-sm text-[#31274B]/85">
                  <li className="flex items-start">
                    <span className="text-[#D4AF37] mr-2">•</span>
                    <span><strong>Defective Products:</strong> Items with manufacturing defects, leaks, or performance issues</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#D4AF37] mr-2">•</span>
                    <span><strong>Damaged in Transit:</strong> Products damaged during shipping with visible external damage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#D4AF37] mr-2">•</span>
                    <span><strong>Wrong Item Received:</strong> Incorrect shade, finish, size, or product delivered</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#D4AF37] mr-2">•</span>
                    <span><strong>Unopened Products:</strong> Items in original, sealed packaging with all labels intact</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#D4AF37] mr-2">•</span>
                    <span><strong>Within 30 Days:</strong> Return request initiated within 30 days of delivery date</span>
                  </li>
                </ul>
              </div>


              <div className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-[#0F1221]">
                <h3 className="text-xl font-bold text-[#0F1221] mb-3">✗ Not Eligible for Return</h3>
                <ul className="space-y-2 text-sm text-[#31274B]/85">
                  <li className="flex items-start">
                    <span className="text-[#0F1221] mr-2">•</span>
                    <span><strong>Custom-Tinted Products:</strong> Made-to-order or custom-mixed colors (unless defective or wrong shade delivered)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0F1221] mr-2">•</span>
                    <span><strong>Opened/Used Products:</strong> Items that have been opened, used, or partially consumed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0F1221] mr-2">•</span>
                    <span><strong>Damaged Packaging Only:</strong> Outer carton damage without product damage doesn't qualify</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0F1221] mr-2">•</span>
                    <span><strong>After 30 Days:</strong> Return requests made after the 30-day window from delivery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0F1221] mr-2">•</span>
                    <span><strong>Clearance/Sale Items:</strong> Products marked as final sale or clearance (unless defective)</span>
                  </li>
                </ul>
              </div>


              <div className="rounded-xl bg-[#0F1221] p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">💡 Important Note</h3>
                <p className="text-white/90 text-sm">
                  All return requests require proof of purchase (order ID or invoice) and supporting documentation (photos/videos for defects or damage). Our quality team reviews each case individually to ensure fair and prompt resolution.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Return Process */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-[#0F1221] mb-4">How to Initiate a Return</h2>
              <p className="mx-auto max-w-3xl text-lg text-[#31274B]/85">
                Follow these simple steps for a smooth return experience. We'll guide you through every step of the process.
              </p>
            </div>


            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="rounded-2xl bg-[#FBF9F6] p-6">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F1221] text-white font-bold mr-3">1</div>
                  <h3 className="text-lg font-semibold text-[#0F1221]">Submit Return Request</h3>
                </div>
                <p className="text-[#31274B]/85 text-sm mb-3">
                  Contact our customer support team within 30 days of delivery with your order ID, reason for return, and supporting photos or videos (for defects/damage).
                </p>
                <ul className="space-y-1 text-xs text-[#31274B]/70">
                  <li>✓ Email: support@calycopaints.com</li>
                  <li>✓ <a href="https://wa.me/918826733064" className="underline font-semibold" target="_blank" rel="noopener noreferrer">WhatsApp Message</a> (Phone calls not accepted. Mon–Sat, 10:00 AM – 6:00 PM IST)</li>
                  <li>✓ Include clear photos of product and packaging</li>
                </ul>
              </div>


              <div className="rounded-2xl bg-[#FBF9F6] p-6">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F1221] text-white font-bold mr-3">2</div>
                  <h3 className="text-lg font-semibold text-[#0F1221]">Verification & Approval</h3>
                </div>
                <p className="text-[#31274B]/85 text-sm mb-3">
                  Our support team will review your request within 2 business days and verify eligibility based on our return policy criteria.
                </p>
                <ul className="space-y-1 text-xs text-[#31274B]/70">
                  <li>✓ Instant acknowledgment of your request</li>
                  <li>✓ Approval/rejection notification within 2 days</li>
                  <li>✓ Pickup/drop-off instructions provided</li>
                </ul>
              </div>


              <div className="rounded-2xl bg-[#FBF9F6] p-6">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F1221] text-white font-bold mr-3">3</div>
                  <h3 className="text-lg font-semibold text-[#0F1221]">Pickup or Drop-Off</h3>
                </div>
                <p className="text-[#31274B]/85 text-sm mb-3">
                  Once approved, we'll schedule a courier pickup from your address or provide the nearest drop-off location for self-return.
                </p>
                <ul className="space-y-1 text-xs text-[#31274B]/70">
                  <li>✓ Free pickup for quality issues/wrong items</li>
                  <li>✓ Pack items securely in original packaging</li>
                  <li>✓ Attach return authorization label</li>
                </ul>
              </div>


              <div className="rounded-2xl bg-[#FBF9F6] p-6">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F1221] text-white font-bold mr-3">4</div>
                  <h3 className="text-lg font-semibold text-[#0F1221]">Quality Check & Resolution</h3>
                </div>
                <p className="text-[#31274B]/85 text-sm mb-3">
                  Our quality team inspects returned items to confirm condition and eligibility. Once verified, we process your refund or send replacement.
                </p>
                <ul className="space-y-1 text-xs text-[#31274B]/70">
                  <li>✓ Inspection completed within 3-5 business days</li>
                  <li>✓ Email/SMS updates at every stage</li>
                  <li>✓ Refund initiated or replacement dispatched</li>
                </ul>
              </div>
            </div>


            <div className="rounded-xl bg-white p-6 shadow-sm border border-[#0F1221]/10">
              <h3 className="text-lg font-semibold text-[#0F1221] mb-3">⏱️ Processing Timelines</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-[#0F1221]">Request Acknowledgment:</span>
                  <p className="text-[#31274B]/80">Instant (within 1 hour)</p>
                </div>
                <div>
                  <span className="font-semibold text-[#0F1221]">Approval Decision:</span>
                  <p className="text-[#31274B]/80">Within 2 business days</p>
                </div>
                <div>
                  <span className="font-semibold text-[#0F1221]">Refund Processing:</span>
                  <p className="text-[#31274B]/80">3-7 days after inspection</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Refund Timelines */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#0F1221] mb-4">Refund Methods & Timelines</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              Refunds are issued to the original payment method once our quality check is complete. We keep you notified via email at every stage.
            </p>


            <div className="overflow-x-auto rounded-xl shadow-sm mb-6">
              <table className="min-w-full border-collapse">
                <thead className="bg-[#0F1221] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Payment Method</th>
                    <th className="px-6 py-4 text-left font-semibold">Refund Timeline</th>
                    <th className="px-6 py-4 text-left font-semibold">Processing Details</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b border-[#0F1221]/10">
                    <td className="px-6 py-4 font-semibold text-[#0F1221]">UPI / Digital Wallets</td>
                    <td className="px-6 py-4 text-[#31274B]/85">3-5 business days</td>
                    <td className="px-6 py-4 text-sm text-[#31274B]/80">Refund processed to original UPI ID or wallet account</td>
                  </tr>
                  <tr className="border-b border-[#0F1221]/10">
                    <td className="px-6 py-4 font-semibold text-[#0F1221]">Credit / Debit Card</td>
                    <td className="px-6 py-4 text-[#31274B]/85">4-7 business days</td>
                    <td className="px-6 py-4 text-sm text-[#31274B]/80">Reflected in 1-2 billing cycles depending on bank</td>
                  </tr>
                  <tr className="border-b border-[#0F1221]/10">
                    <td className="px-6 py-4 font-semibold text-[#0F1221]">Net Banking</td>
                    <td className="px-6 py-4 text-[#31274B]/85">3-5 business days</td>
                    <td className="px-6 py-4 text-sm text-[#31274B]/80">Direct credit to originating bank account</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-[#0F1221]">Bulk / B2B Orders</td>
                    <td className="px-6 py-4 text-[#31274B]/85">Within 7 business days</td>
                    <td className="px-6 py-4 text-sm text-[#31274B]/80">Credit note or account adjustment as per agreement</td>
                  </tr>
                </tbody>
              </table>
            </div>


            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#0F1221] mb-3">💰 Refund Amount</h3>
                <ul className="space-y-2 text-sm text-[#31274B]/85">
                  <li>• Full product price refunded for quality issues or wrong items</li>
                  <li>• Original shipping charges refunded if error was ours</li>
                  <li>• Return shipping deducted for change-of-mind returns</li>
                  <li>• Processing fees (if any) are non-refundable</li>
                </ul>
              </div>


              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#0F1221] mb-3">📧 Notifications</h3>
                <ul className="space-y-2 text-sm text-[#31274B]/85">
                  <li>• Return request received confirmation</li>
                  <li>• Approval/rejection notification</li>
                  <li>• Pickup scheduled/completed update</li>
                  <li>• Quality check completed notification</li>
                  <li>• Refund initiated confirmation with reference number</li>
                </ul>
              </div>
            </div>


            <p className="mt-6 text-sm text-[#31274B]/70 italic">
              * Refund timeline starts after quality inspection is completed. Bank processing times may vary by financial institution and are beyond CALYCO's control.
            </p>
          </div>
        </section>


        {/* Shipping Costs */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#0F1221] mb-8">Return Shipping & Exchange Policy</h2>


            <div className="space-y-6">
              <div className="rounded-2xl bg-[#FBF9F6] p-6 border-l-4 border-[#D4AF37]">
                <h3 className="text-xl font-bold text-[#0F1221] mb-3">🚚 Who Pays for Return Shipping?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-[#0F1221] text-sm mb-2">CALYCO Covers Shipping When:</h4>
                    <ul className="space-y-1 text-sm text-[#31274B]/80">
                      <li>✓ Product is defective or damaged</li>
                      <li>✓ Wrong item/shade was delivered</li>
                      <li>✓ Quality issue confirmed by our team</li>
                      <li>✓ Prepaid return labels provided</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0F1221] text-sm mb-2">Customer Pays Shipping When:</h4>
                    <ul className="space-y-1 text-sm text-[#31274B]/80">
                      <li>• Change of mind or preference</li>
                      <li>• Ordered wrong product by mistake</li>
                      <li>• No longer needed</li>
                      <li>• Return shipping charged at actuals</li>
                    </ul>
                  </div>
                </div>
              </div>


              <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#0F1221]/10">
                <h3 className="text-xl font-bold text-[#0F1221] mb-3">🔄 Exchange Policy</h3>
                <ul className="space-y-2 text-sm text-[#31274B]/85">
                  <li className="flex items-start">
                    <span className="text-[#D4AF37] mr-2">•</span>
                    <span><strong>Same Product Exchange:</strong> Equal-value exchanges supported for same product in different shade/finish</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#D4AF37] mr-2">•</span>
                    <span><strong>Different Product Exchange:</strong> Price differences will be adjusted (refunded or charged accordingly)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#D4AF37] mr-2">•</span>
                    <span><strong>Shade Correction:</strong> If wrong shade delivered, one-time free replacement with correct shade</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#D4AF37] mr-2">•</span>
                    <span><strong>Bulk/B2B Orders:</strong> Follow contractual terms agreed during purchase; contact account manager</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>


        {/* Quality Issues */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#0F1221] mb-4">Quality & Color Issues</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              We prioritize quick resolution for product defects, transit damage, or shade variances. Here's how we handle specific issues:
            </p>


            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl mb-3">🛠️</div>
                <h3 className="text-lg font-bold text-[#0F1221] mb-2">Defective Products</h3>
                <p className="text-sm text-[#31274B]/85 mb-3">
                  Manufacturing defects, damaged containers, leaks, or performance failures qualify for immediate free pickup and full refund or replacement.
                </p>
                <p className="text-xs text-[#31274B]/70">
                  Report within 48 hours of delivery with photos/videos for fastest resolution.
                </p>
              </div>


              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="text-lg font-bold text-[#0F1221] mb-2">Color Mismatch</h3>
                <p className="text-sm text-[#31274B]/85 mb-3">
                  If the delivered color differs significantly from the approved sample or swatch, we'll provide a one-time free shade correction.
                </p>
                <p className="text-xs text-[#31274B]/70">
                  Share comparison photos of delivered paint vs. original sample for verification.
                </p>
              </div>


              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="text-3xl mb-3">📦</div>
                <h3 className="text-lg font-bold text-[#0F1221] mb-2">Shipping Damage</h3>
                <p className="text-sm text-[#31274B]/85 mb-3">
                  Damage during transit must be reported within 48 hours with unboxing photos. We arrange immediate replacement at no cost to you.
                </p>
                <p className="text-xs text-[#31274B]/70">
                  Take photos before opening if packaging shows visible external damage.
                </p>
              </div>
            </div>


            <div className="rounded-xl bg-[#0F1221] p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">📸 Documentation for Faster Approval</h3>
              <p className="text-white/90 text-sm mb-3">
                To expedite your return/refund request, please provide:
              </p>
              <ul className="space-y-1 text-sm text-white/90">
                <li>• Clear photos of the product showing the defect or color issue</li>
                <li>• Photos of product packaging (all sides, including labels)</li>
                <li>• Close-up of batch number and manufacturing date</li>
                <li>• Video of leak or performance issue (if applicable)</li>
                <li>• Comparison with color sample or swatch (for color mismatch)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-br from-[#0F1221] to-[#2E0053]">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Initiate a Return or Need Help?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
              Our customer support team is here to assist you with returns, refunds, and exchanges. Reach out and we'll guide you through every step.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="https://wa.me/918826733064"
                className={getButtonClasses('accent')}
                target="_blank"
                rel="noopener noreferrer"
              >
                📱 WhatsApp Message
              </a>
              <a
                href="mailto:support@calycopaints.com"
                className="inline-block rounded-xl border-2 border-white/30 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                ✉️ Email: support@calycopaints.com
              </a>
            </div>
            <p className="text-sm text-white/80 text-center mb-4">
              Please contact us only via WhatsApp message for any grievance or urgent privacy concern. Phone calls are not accepted on this number.
            </p>

            <div className="text-sm text-white/80">
              <p className="mb-1"><strong>Customer Support Hours:</strong></p>
              <p>Monday - Saturday: 9:00 AM - 7:00 PM IST</p>
              <p>Sunday: 10:00 AM - 5:00 PM IST</p>
            </div>

            <p className="mt-8 text-sm text-white/70 italic">
              Your satisfaction is our priority. We're committed to making things right.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}

