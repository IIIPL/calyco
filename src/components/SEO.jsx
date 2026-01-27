import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'Calyco Paints - Premium Eco-Friendly Paints | Ultra-Low VOC Interior & Exterior Emulsions',
  description = 'Eco-premium paints with low VOC and water-based formulations.',
  keywords = 'calyco paints, premium paints india, eco-friendly paints, ultra-low voc paints, interior emulsion, exterior emulsion, waterproofing sealer, luxury paints delhi ncr, premium textures, paint visualizer, room color visualizer',
  image = 'https://calycopaints.com/Assets/Product%20Images/Premium%20Interior%20Emulsion/1.webp',
  url = 'https://calycopaints.com',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  noindex = false,
  nofollow = false,
  schemaMarkup
}) => {
  const robots = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`;
  const canonical = canonicalUrl || url;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Calyco Paints" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO Tags */}
      <meta name="author" content="Calyco Paints" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN-DL" />
      <meta name="geo.placename" content="Delhi NCR" />
      <meta name="geo.position" content="28.6139;77.2090" />
      <meta name="ICBM" content="28.6139, 77.2090" />

      {/* Schema Markup */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;


