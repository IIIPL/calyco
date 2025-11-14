import React, { useEffect } from "react";
import { getTypographyClasses, getButtonClasses } from "../../data/admin/typography";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";

const digitalFactors = [
  { title: "Screen Variations", details: "Device displays (monitors, tablets, phones) differ in color calibration, brightness, contrast, and color gamut, affecting how colors appear digitally." },
  { title: "Lighting Conditions", details: "Ambient lighting when viewing digital samples (natural daylight vs. artificial light) can significantly alter perceived color accuracy." },
  { title: "Color Profiles", details: "Different browsers, operating systems, and color profiles (sRGB, Adobe RGB) may render the same color code differently." },
  { title: "Image Compression", details: "Digital images may be compressed for web display, which can result in slight color shifts or loss of color accuracy." },
];

const applicationFactors = [
  { title: "Surface Texture & Porosity", details: "Rough, porous, or uneven surfaces absorb paint differently than smooth surfaces, affecting color depth and consistency." },
  { title: "Number of Coats", details: "Color appears lighter with one coat and deepens with additional coats. Recommended coats for each product are specified on the label." },
  { title: "Sheen & Finish Type", details: "Matte, eggshell, satin, semi-gloss, and gloss finishes reflect light differently, altering how color is perceived in a space." },
  { title: "Dilution & Application Method", details: "Over-dilution, brush vs. roller application, and spray techniques can impact color uniformity and final appearance." },
  { title: "Surface Preparation", details: "Primer type, sanding quality, and substrate color influence how the topcoat color appears once dried." },
  { title: "Environmental Conditions", details: "Temperature, humidity, and ventilation during application and drying can affect color consistency and finish quality." },
];

const lightingImpact = [
  { title: "Natural Daylight", details: "Colors appear truest in natural daylight (north-facing light is most neutral). Morning vs. evening light changes color perception." },
  { title: "Warm Artificial Light", details: "Incandescent and warm LED bulbs add yellow/orange tones, making cool colors appear muted and warm colors more vibrant." },
  { title: "Cool Artificial Light", details: "Daylight or cool-white LEDs/CFLs add blue tones, making warm colors appear cooler and cool colors more vivid." },
  { title: "Mixed Lighting", details: "Combining natural and artificial light sources in one room creates varying color appearances throughout the day." },
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
  { title: "Batch Variation", details: "Slight color variations may occur between production batches. For large projects, purchase all paint from the same batch code." },
  { title: "Custom Tinting Accuracy", details: "Tinted colors are matched to formulas with high precision, but minor variations (Delta E < 1.0) may occur due to pigment dispersion." },
  { title: "Aging & Fading", details: "All paints may fade over time due to UV exposure, humidity, and environmental factors. Exterior paints are formulated for better UV resistance." },
  { title: "Touch-Up Considerations", details: "Touch-ups may appear slightly different due to paint aging, surface wear, and original application conditions. Keep leftover paint for touch-ups." },
];

export default function ColorDisclaimer() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionPad = "py-10 md:py-12";
  const sectionPadTight = "py-7 md:py-9";

  return (
    <div className="min-h-screen bg-white text-[#0F1221] font-poppins">
      <SEO
        title="Product & Color Disclaimer | CALYCO Paints"
        description="Understand digital vs. physical color variations, application factors affecting appearance, and best practices for accurate color selection."
        ogType="website"
      />

      <main>
        {/* Hero */}
        <section className="relative h-[75vh] sm:h-[65vh] md:h-[70vh] lg:h-[70vh] overflow-hidden bg-[#0F1221]">
          <div className="absolute inset-0">
            <img
              src="/Assets/InteriorInspiratoin/living-room.webp"
              alt="CALYCO color palette showcase"
              className="h-full w-full object-cover brightness-75"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center flex items-center justify-center h-full">
            <div>
            <h1 className="text-4xl font-semibold text-white leading-tight md:text-5xl">
              Understanding Color Accuracy & Variations
            </h1>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className={`${sectionPad} bg-white max-w-5xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold mb-3 text-[#0F1221]">Color Accuracy Disclaimer</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-[#23263a] mb-1">
            CALYCO is committed to providing accurate color representations across our digital platforms. However, we cannot guarantee that colors displayed on your device will exactly match the physical paint color.
          </p>
          <p className="text-base max-w-3xl mx-auto text-[#23263a] mb-1">
            Color perception is influenced by numerous factors including screen calibration, lighting conditions, surface texture, application technique, and individual vision differences.
          </p>
          <p className="text-base max-w-3xl mx-auto text-[#23263a]">
            We strongly recommend ordering physical color cards or sample pots and testing them in your space under actual lighting conditions before making final color decisions.
          </p>
        </section>

        {/* Digital vs Physical */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Digital Display Limitations</h2>
          <p className="text-lg text-[#23263a] mb-6">
            Digital color representations are subject to various technical limitations that affect accuracy.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {digitalFactors.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className={`${getTypographyClasses('h4')} text-[#0F1221]`}>{item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.details}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border-2 border-[#D4AF37]/30 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#0F1221] mb-2">💡 Recommendation</h3>
            <p className="text-sm text-[#23263a]">
              Never rely solely on digital color previews when making final color decisions. Always order and evaluate physical samples in your actual space before purchasing full quantities.
            </p>
          </div>
        </section>

        {/* Application Factors */}
        <section className={`${sectionPadTight} bg-white max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Factors Affecting Paint Appearance</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {applicationFactors.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
                <h3 className={`${getTypographyClasses('h4')} text-[#0F1221]`}>{item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lighting Impact */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Lighting Conditions & Color Perception</h2>
          <p className="text-lg text-[#23263a] mb-6">
            Lighting is one of the most significant factors affecting how paint colors appear in your space.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {lightingImpact.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className={`${getTypographyClasses('h4')} text-[#0F1221]`}>{item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.details}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm border border-[#0F1221]/10">
            <h3 className="text-lg font-semibold text-[#0F1221] mb-2">Testing Tip</h3>
            <p className="text-sm text-[#23263a]">
              Paint large sample swatches (at least 2ft x 2ft) on different walls and observe them throughout the day—morning sunlight, afternoon shade, evening artificial light, and nighttime lighting all reveal different aspects of the color.
            </p>
          </div>
        </section>

        {/* Best Practices */}
        <section className={`${sectionPadTight} bg-white max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Best Practices for Color Selection</h2>
          <p className="text-lg text-[#23263a] mb-5">
            Follow these recommendations to ensure you choose the perfect color for your space.
          </p>
          <div className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-8 shadow-sm">
            <ul className="space-y-3 text-base text-[#23263a]">
              {bestPractices.map((practice, index) => (
                <li key={practice} className="flex items-start">
                  <span className="text-[#D4AF37] mr-3 mt-1 font-bold">{index + 1}.</span>
                  <span>{practice}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Important Notes */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Additional Important Information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {importantNotes.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className={`${getTypographyClasses('h4')} text-[#0F1221]`}>{item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Color Sample Services */}
        <section className={`${sectionPadTight} bg-white max-w-5xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold mb-3 text-[#0F1221]">Color Sample Services</h2>
          <p className="text-lg text-[#23263a] mb-4">
            CALYCO offers multiple ways to help you confidently choose the right color for your project.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-[#FBF9F6] p-6 text-center">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="text-lg font-bold text-[#0F1221] mb-1">Physical Color Cards</h3>
              <p className="text-sm text-[#23263a] mb-3">
                Request free color fan decks and single shade cards delivered to your address.
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="text-sm font-semibold text-[#0F1221] hover:underline"
              >
                Request Color Cards →
              </button>
            </div>
            <div className="rounded-xl bg-[#FBF9F6] p-6 text-center">
              <div className="text-3xl mb-3">🖌️</div>
              <h3 className="text-lg font-bold text-[#0F1221] mb-1">Sample Pots (100ml)</h3>
              <p className="text-sm text-[#23263a] mb-3">
                Purchase small tester pots to paint actual swatches on your walls.
              </p>
              <button
                onClick={() => navigate("/products")}
                className="text-sm font-semibold text-[#0F1221] hover:underline"
              >
                Shop Sample Pots →
              </button>
            </div>
            <div className="rounded-xl bg-[#FBF9F6] p-6 text-center">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-lg font-bold text-[#0F1221] mb-1">Color Consultation</h3>
              <p className="text-sm text-[#23263a] mb-3">
                Book a free consultation with our color experts for personalized recommendations.
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="text-sm font-semibold text-[#0F1221] hover:underline"
              >
                Book Consultation →
              </button>
            </div>
          </div>
        </section>

        {/* Returns Policy Reference */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-5xl mx-auto px-6 md:px-10 lg:px-12`}>
          <div className="rounded-2xl border-2 border-[#0F1221]/20 bg-white p-8 shadow-sm text-center">
            <h2 className="text-2xl font-bold text-[#0F1221] mb-3">Returns & Color Dissatisfaction</h2>
            <p className="text-base text-[#23263a] mb-5">
              Custom-tinted paints are non-returnable due to color preference unless there is a manufacturing defect or tinting error. Please refer to our Returns & Refunds policy for full details.
            </p>
            <a
              href="/policies/returns"
              className="inline-block rounded-xl bg-[#0F1221] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#23263a]"
            >
              View Returns Policy
            </a>
          </div>
        </section>

        {/* Contact Section */}
        <section className={`${sectionPadTight} bg-white max-w-5xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Questions About Color Accuracy?</h2>
          <p className="text-lg text-[#23263a] mb-6">
            Our customer support team is here to help you make the right color choice for your project.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0F1221] mb-2">Email</h3>
              <a href="mailto:support@calycopaints.com" className="text-sm text-[#23263a] hover:text-[#D4AF37] underline">
                support@calycopaints.com
              </a>
            </div>
            <div className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0F1221] mb-2">Contact Customer Support</h3>
              <p className="text-sm text-[#23263a] mb-2">
                <a href="https://wa.me/918826733064" className="text-[#D4AF37] hover:text-[#0F1221] font-semibold underline" target="_blank" rel="noopener noreferrer">WhatsApp Message</a>
              </p>
              <p className="text-xs text-[#23263a]/80 leading-relaxed mb-1">
                Please contact us only via WhatsApp message for any grievance or urgent privacy concern. Phone calls are not accepted on this number.
              </p>
              <p className="text-xs text-[#23263a]/70 mt-2">(Mon–Sat, 10:00 AM – 6:00 PM IST)</p>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <section className="py-14 bg-[#FBF9F6] max-w-5xl mx-auto px-6 md:px-10 lg:px-12 text-center">
          <p className="text-sm text-[#23263a]/80 mb-1">
            CALYCO makes every effort to ensure color accuracy in digital representations. However, final color matching responsibility rests with the customer after proper sampling and testing.
          </p>
          <p className="text-xs text-[#23263a]/70">
            For technical queries about color formulations or tinting, contact our technical support team.
          </p>
          <p className="mt-3 text-sm text-[#0F1221] font-semibold">
            Effective date: 20 August 2025
          </p>
        </section>
      </main>
    </div>
  );
}
