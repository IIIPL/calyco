import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

export default function CalycoApp({ Component, pageProps }: AppProps) {
  const { frontMatter } = pageProps as { frontMatter?: Record<string, unknown> };
  const title = typeof frontMatter?.title === 'string' ? frontMatter.title : 'Calyco Paints India';
  const description = typeof frontMatter?.description === 'string' ? frontMatter.description : 'Eco-friendly interior and exterior paints crafted for Indian homes.';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
