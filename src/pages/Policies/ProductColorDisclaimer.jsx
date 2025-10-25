import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";

const digitalFactors = [
  {
    title: "Screen Variations",
    details: "Device displays (monitors, tablets, phones) differ in color calibration, brightness, contrast, and color gamut, affecting how colors appear digitally.",
  },
  {
    title: "Lighting Conditions",
    details: "Ambient lighting when viewing digital samples (natural daylight vs. artificial light) can significantly alter perceived color accuracy.",
  },
  {
    title: "Color Profiles",
    details: "Different browsers, operating systems, and color profiles (sRGB, Adobe RGB) may render the same color code differently.",
  },
  {
    title: "Image Compression",
    details: "Digital images may be compressed for web display, which can result in slight color shifts or loss of color accuracy.",
  },
];

const applicationFactors = [
  {
    title: "Surface Texture & Porosity",
    details: "Rough, porous, or uneven surfaces absorb paint differently than smooth surfaces, affecting color depth and consistency.",
  },
  {
    title: "Number of Coats",
    details: "Color appears lighter with one coat and deepens with additional coats. Recommended coats for each product are specified on the label.",
  },
  {
    title: "Sheen & Finish Type",
    details: "Matte, eggshell, satin, semi-gloss, and gloss finishes reflect light differently, altering how color is perceived in a space.",
  },
  {
    title: "Dilution & Application Method",
    details: "Over-dilution, brush vs. roller application, and spray techniques can impact color uniformity and final appearance.",
  },
  {
    title: "Surface Preparation",
    details: "Primer type, sanding quality, and substrate color influence how the topcoat color appears once dried.",
  },
  {
    title: "Environmental Conditions",
    details: "Temperature, humidity, and ventilation during application and drying can affect color consistency and finish quality.",
  },
];

const lightingImpact = [
  {
    title: "Natural Daylight",
    details: "Colors appear truest in natural daylight (north-facing light is most neutral). Morning vs. evening light changes color perception.",
  },
  {
    title: "Warm Artificial Light",
    details: "Incandescent and warm LED bulbs add yellow/orange tones, making cool colors appear muted and warm colors more vibrant.",
  },
  {
    title: "Cool Artificial Light",
    details: "Daylight or cool-white LEDs/CFLs add blue tones, making warm colors appear cooler and cool colors more vivid.",
  },
  {
    title: "Mixed Lighting",
    details: "Combining natural and artificial light sources in one room creates varying color appearances throughout the day.",
  },
];

const bestPractices = [
  "Order physical color cards or small sample pots before purchasing full quantities",
  "Test samples on your actual wall surface, not just on paper or isolated boards",
  "View samples under different lighting conditions: morning, afternoon, evening, and with lights on",
  "Apply at least two coats to accurately assess final color depth and coverage",
  "Consider the room's orientation (north, south, east, west) and natural light availability",
  "Test colors on multiple walls if the room has varying light exposure",
  "Wait 24-48 hours for paint to fully dry and cure before making final color decisions",
];

const importantNotes = [
  {
    title: "Batch Variation",
    details: "Slight color variations may occur between production batches. For large projects, purchase all paint from the same batch code.",
  },
  {
    title: "Custom Tinting Accuracy",
    details: "Tinted colors are matched to formulas with high precision, but minor variations (Delta E < 1.0) may occur due to pigment dispersion.",
  },
  {
    title: "Aging & Fading",
    details: "All paints may fade over time due to UV exposure, humidity, and environmental factors. Exterior paints are formulated for better UV resistance.",
  },
  {
    title: "Touch-Up Considerations",
    details: "Touch-ups may appear slightly different due to paint aging, surface wear, and original application conditions. Keep leftover paint for touch-ups.",
  },
];

export default function ColorDisclaimer() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F3EE] text-[#0F1221] font-poppins">
      <SEO
        title="Product & Color Disclaimer | CALYCO Paints"
        description="Understand digital vs. physical color variations, application factors affecting appearance, and best practices for accurate color selection."
        ogType="website"
      />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-24 pb-16 md:pt-28 bg-gradient-to-br from-[#4B007D] to-[#2E0053]">
          <div className="absolute inset-0">
            <img
              src="/Assets/InteriorInspiratoin/living-room.png"
              alt="CALYCO color palette showcase"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#4B007D]/90 via-[#4B007D]/85 to-[#2E0053]/82" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 text-center md:px-10 md:py-20 lg:px-12">
            <span className="inline-block rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white/85 backdrop-blur mb-6">
              Product & Color Disclaimer
            </span>
            <h1 className="text-3xl font-bold text-white md:text-5xl mb-4">
              Understanding Color Accuracy & Variations
            </h1>
            <p className="mx-auto max-w-3xl text-base text-white/90 md:text-lg mb-8">
              Digital previews are indicative only. Actual paint colors may vary due to screen settings, lighting conditions, surface preparation, and application methods.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="rounded-xl bg-[#D4AF37] px-8 py-3 text-base font-semibold text-[#0F1221] shadow-lg transition hover:bg-[#bb9831]"
            >
              Request Color Samples
            </button>
            <p className="mt-6 text-xs text-white/70">Last updated: 30 October 2025</p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-6">Color Accuracy Disclaimer</h2>
            <p className="text-lg text-[#31274B]/85 mb-4">
              CALYCO is committed to providing accurate color representations across our digital platforms. However, we cannot guarantee that colors displayed on your device will exactly match the physical paint color.
            </p>
            <p className="text-base text-[#31274B]/85 mb-4">
              Color perception is influenced by numerous factors including screen calibration, lighting conditions, surface texture, application technique, and individual vision differences.
            </p>
            <p className="text-base text-[#31274B]/85">
              We strongly recommend ordering physical color cards or sample pots and testing them in your space under actual lighting conditions before making final color decisions.
            </p>
          </div>
        </section>

        {/* Digital vs Physical */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Digital Display Limitations</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              Digital color representations are subject to various technical limitations that affect accuracy.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {digitalFactors.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#31274B]/80">{item.details}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border-2 border-[#D4AF37]/30 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4B007D] mb-2">💡 Recommendation</h3>
              <p className="text-sm text-[#31274B]/85">
                Never rely solely on digital color previews when making final color decisions. Always order and evaluate physical samples in your actual space before purchasing full quantities.
              </p>
            </div>
          </div>
        </section>

        {/* Application Factors */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-8">Factors Affecting Paint Appearance</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {applicationFactors.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#31274B]/80">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lighting Impact */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Lighting Conditions & Color Perception</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              Lighting is one of the most significant factors affecting how paint colors appear in your space.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {lightingImpact.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#31274B]/80">{item.details}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm border border-[#0F1221]/10">
              <h3 className="text-lg font-semibold text-[#4B007D] mb-3">Testing Tip</h3>
              <p className="text-sm text-[#31274B]/85">
                Paint large sample swatches (at least 2ft x 2ft) on different walls and observe them throughout the day—morning sunlight, afternoon shade, evening artificial light, and nighttime lighting all reveal different aspects of the color.
              </p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Best Practices for Color Selection</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              Follow these recommendations to ensure you choose the perfect color for your space.
            </p>
            <div className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-8 shadow-sm">
              <ul className="space-y-3 text-base text-[#31274B]/85">
                {bestPractices.map((practice, index) => (
                  <li key={practice} className="flex items-start">
                    <span className="text-[#D4AF37] mr-3 mt-1 font-bold">{index + 1}.</span>
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-8">Additional Important Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {importantNotes.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#31274B]/80">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Color Sample Services */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-6">Color Sample Services</h2>
            <p className="text-lg text-[#31274B]/85 mb-6">
              CALYCO offers multiple ways to help you confidently choose the right color for your project.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-xl bg-[#FBF9F6] p-6 text-center">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="text-lg font-bold text-[#4B007D] mb-2">Physical Color Cards</h3>
                <p className="text-sm text-[#31274B]/80 mb-3">
                  Request free color fan decks and single shade cards delivered to your address.
                </p>
                <button
                  onClick={() => navigate("/contact")}
                  className="text-sm font-semibold text-[#4B007D] hover:underline"
                >
                  Request Color Cards →
                </button>
              </div>
              <div className="rounded-xl bg-[#FBF9F6] p-6 text-center">
                <div className="text-3xl mb-3">🖌️</div>
                <h3 className="text-lg font-bold text-[#4B007D] mb-2">Sample Pots (100ml)</h3>
                <p className="text-sm text-[#31274B]/80 mb-3">
                  Purchase small tester pots to paint actual swatches on your walls.
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="text-sm font-semibold text-[#4B007D] hover:underline"
                >
                  Shop Sample Pots →
                </button>
              </div>
              <div className="rounded-xl bg-[#FBF9F6] p-6 text-center">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="text-lg font-bold text-[#4B007D] mb-2">Color Consultation</h3>
                <p className="text-sm text-[#31274B]/80 mb-3">
                  Book a free consultation with our color experts for personalized recommendations.
                </p>
                <button
                  onClick={() => navigate("/contact")}
                  className="text-sm font-semibold text-[#4B007D] hover:underline"
                >
                  Book Consultation →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Returns Policy Reference */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <div className="rounded-2xl border-2 border-[#4B007D]/20 bg-white p-8 shadow-sm text-center">
              <h2 className="text-2xl font-bold text-[#4B007D] mb-4">Returns & Color Dissatisfaction</h2>
              <p className="text-base text-[#31274B]/85 mb-6">
                Custom-tinted paints are non-returnable due to color preference unless there is a manufacturing defect or tinting error. Please refer to our Returns & Refunds policy for full details.
              </p>
              <a
                href="/policies/returns"
                className="inline-block rounded-xl bg-[#4B007D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3a0061]"
              >
                View Returns Policy
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Questions About Color Accuracy?</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              Our customer support team is here to help you make the right color choice for your project.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#4B007D] mb-3">Email</h3>
                <a href="mailto:support@calycopaints.com" className="text-sm text-[#31274B]/85 hover:text-[#4B007D] underline">
                  support@calycopaints.com
                </a>
              </div>
              <div className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#4B007D] mb-3">Phone</h3>
                <p className="text-sm text-[#31274B]/85">
                  Customer Support: <a href="tel:+919958966881" className="hover:text-[#4B007D] font-semibold">+91 99589 66881</a>
                </p>
                <p className="text-xs text-[#31274B]/70 mt-2">Monday - Saturday: 9:00 AM - 7:00 PM IST</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <section className="py-16 bg-[#FBF9F6]">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12 text-center">
            <p className="text-sm text-[#31274B]/70 mb-2">
              CALYCO makes every effort to ensure color accuracy in digital representations. However, final color matching responsibility rests with the customer after proper sampling and testing.
            </p>
            <p className="text-xs text-[#31274B]/70">
              For technical queries about color formulations or tinting, contact our technical support team.
            </p>
            <p className="mt-4 text-sm text-[#4B007D] font-semibold">Effective date: 30 October 2025</p>
          </div>
        </section>
      </main>
    </div>
  );
}
