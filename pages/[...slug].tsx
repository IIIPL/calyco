import fs from 'fs';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import { getAllContentEntries, getEntryByRouteSegments } from '../lib/content';

interface ContentPageProps {
  source: MDXRemoteSerializeResult;
  frontMatter: Record<string, any>;
}

export default function ContentPage({ source, frontMatter }: ContentPageProps) {
  const {
    title,
    description,
    tags,
    heroImage,
    canonical,
    type,
    lastUpdated,
  } = frontMatter;

  const canonicalUrl = typeof canonical === 'string' ? canonical : undefined;
  const heroSrc = typeof heroImage === 'string' ? heroImage : undefined;
  const tagList = Array.isArray(tags) ? (tags as string[]) : [];

  return (
    <>
      <Head>
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        {lastUpdated && <meta name="last-modified" content={lastUpdated} />}
      </Head>
      <main>
        <header>
          {type && (
            <p style={{ textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b' }}>
              {type}
            </p>
          )}
          <h1>{title}</h1>
          {description && <p>{description}</p>}
          {heroSrc && (
            <div style={{ position: 'relative', width: '100%', height: '320px', margin: '2rem 0', borderRadius: '16px', overflow: 'hidden' }}>
              <Image src={heroSrc} alt={title ?? 'Calyco hero image'} fill priority sizes="(max-width: 960px) 100vw, 960px" style={{ objectFit: 'cover' }} />
            </div>
          )}
          {tagList.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', margin: '1rem 0' }}>
              {tagList.map((tag) => (
                <span key={tag} style={{ background: '#e2e8f0', borderRadius: '999px', padding: '0.4rem 0.9rem', fontSize: '0.85rem', fontWeight: 600 }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <article>
          <MDXRemote
            {...source}
            components={{
              a: ({ href = '#', children, ...rest }) => (
                <Link href={href} {...rest}>
                  {children}
                </Link>
              ),
            }}
          />
        </article>
        <footer style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#475569' }}>
          <p>Last updated on {lastUpdated} • Crafted for Indian homes by Calyco Paints.</p>
          <p>
            Explore our key collections:
            {' '}
            <Link href="/interior-paint">Interior Paints</Link>
            {' | '}
            <Link href="/exterior-paint">Exterior Paints</Link>
            {' | '}
            <Link href="/eco-friendly-paint">Eco-Friendly Paints</Link>
            {' | '}
            <Link href="/regions">Regional Guides</Link>
          </p>
        </footer>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = getAllContentEntries();
  const paths = entries.map((entry) => ({ params: { slug: entry.routeSegments } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ContentPageProps> = async ({ params }) => {
  const slugParam = params?.slug;
  const slugSegments = Array.isArray(slugParam)
    ? slugParam
    : typeof slugParam === 'string'
      ? [slugParam]
      : [];

  const entry = getEntryByRouteSegments(slugSegments);

  if (!entry) {
    return {
      notFound: true,
    };
  }

  const raw = fs.readFileSync(entry.filePath, 'utf-8');
  const { content, data } = matter(raw);
  const normalizedFrontMatter = { ...data } as Record<string, unknown>;
  if (normalizedFrontMatter.lastUpdated instanceof Date) {
    normalizedFrontMatter.lastUpdated = normalizedFrontMatter.lastUpdated.toISOString().split('T')[0];
  }
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: normalizedFrontMatter,
    },
  };
};
