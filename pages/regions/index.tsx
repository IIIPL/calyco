import Link from 'next/link';
import type { GetStaticProps } from 'next';
import { getAllContentEntries, type ContentEntry } from '../../lib/content';

interface RegionsProps {
  regions: ContentEntry[];
}

export default function RegionsIndex({ regions }: RegionsProps) {
  return (
    <main>
      <header>
        <h1>Regional Paint Guidance for Indian States</h1>
        <p>
          Every Indian state has a unique climate signature. Browse our curated Calyco region guides to match the
          right eco-friendly system with your local rainfall, humidity, and UV exposure.
        </p>
      </header>
      <section>
        <ul>
          {regions.map((region) => (
            <li key={region.route} style={{ marginBottom: '1.25rem' }}>
              <h2 style={{ marginBottom: '0.5rem' }}>
                <Link href={region.route}>{region.data.title}</Link>
              </h2>
              <p style={{ marginBottom: '0.5rem' }}>{region.data.description}</p>
              <Link className="btn-primary" href={region.route}>
                View guide
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps<RegionsProps> = async () => {
  const entries = getAllContentEntries();
  const regions = entries.filter((entry) => entry.type === 'region');

  return {
    props: {
      regions,
    },
  };
};
