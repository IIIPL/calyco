import Link from 'next/link';
import type { GetStaticProps } from 'next';
import { getAllContentEntries, type ContentEntry } from '../lib/content';

interface HomeProps {
  pillars: ContentEntry[];
  regions: ContentEntry[];
}

export default function Home({ pillars, regions }: HomeProps) {
  return (
    <main>
      <header>
        <h1>Welcome to Calyco Paints India</h1>
        <p>
          Discover eco-conscious, weather-ready paint solutions crafted for Indian homes. Explore our national
          pillars and regional guidance built for diverse climates and lifestyles across India.
        </p>
      </header>

      <section>
        <h2>Signature Pillars</h2>
        <div className="grid grid-3">
          {pillars.map((pillar) => (
            <div className="card" key={pillar.route}>
              <h3>
                <Link href={pillar.route}>{pillar.data.title}</Link>
              </h3>
              <p>{pillar.data.description}</p>
              <Link className="btn-primary" href={pillar.route}>
                Explore pillar
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Regional Paint Guides</h2>
        <p>
          Weather across India shifts from Himalayan rains to coastal humidity. Use our regional guides to choose
          the right Calyco system for your state.
        </p>
        <ul>
          {regions.map((region) => (
            <li key={region.route}>
              <Link href={region.route}>{region.data.title}</Link> — {region.data.description}
            </li>
          ))}
        </ul>
        <p>
          Want the complete list? Visit our dedicated <Link href="/regions">Regions hub</Link>.
        </p>
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const entries = getAllContentEntries();
  const pillars = entries.filter((entry) => entry.type === 'pillar');
  const regions = entries.filter((entry) => entry.type === 'region');

  return {
    props: {
      pillars,
      regions,
    },
  };
};
