import Link from 'next/link';

export default function ToolsHub() {
  return (
    <main>
      <header>
        <h1>Calyco Tools Workspace</h1>
        <p>
          Plan eco-friendly painting projects with calculators, visualisers, and contractor coordination tailored for Indian
          climates.
        </p>
      </header>
      <section>
        <h2>Key Modules</h2>
        <ul>
          <li>Coverage calculator that converts room dimensions into litres and ₹ budgets.</li>
          <li>Façade and interior visualisers calibrated for Delhi NCR, Kerala, Assam, Tamil Nadu, and Goa lighting.</li>
          <li>Contractor scheduler with verified Calyco applicators across major Indian cities.</li>
          <li>
            <Link href="/tools/ap-color-importer">Asian Paints palette importer for rapid Calyco onboarding.</Link>
          </li>
          <li>Digital vault for VOC certificates, warranties, and maintenance logs.</li>
        </ul>
      </section>
      <section>
        <h2>Explore Our Guides</h2>
        <p>
          Pair the tools with deep dives from our content pillars and regional hubs:
        </p>
        <ul>
          <li>
            <Link href="/interior-paint">Interior Paints for Modern Indian Homes</Link>
          </li>
          <li>
            <Link href="/exterior-paint">Exterior Paints Built for Indian Weather</Link>
          </li>
          <li>
            <Link href="/eco-friendly-paint">Eco-Friendly &amp; Low-VOC Paints</Link>
          </li>
          <li>
            <Link href="/regions">Regional Paint Guidance</Link>
          </li>
          <li>
            <Link href="/comparisons/eco-vs-traditional">Eco-Friendly vs Conventional Comparison</Link>
          </li>
        </ul>
      </section>
      <section>
        <h2>Need Inspiration?</h2>
        <p>
          Browse our latest blogs for palette ideas and maintenance strategies:
        </p>
        <ul>
          <li>
            <Link href="/blog/delhi/eco-colours-delhi-apartments">Eco Colour Palettes for Delhi Apartments</Link>
          </li>
          <li>
            <Link href="/blog/kerala/top-colours-kerala-2025">Top Eco Colour Trends for Kerala Homes</Link>
          </li>
          <li>
            <Link href="/blog/goa/beach-villa-palettes-eco">Eco-Friendly Palettes for Goa Beach Villas</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
