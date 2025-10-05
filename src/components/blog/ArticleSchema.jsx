import React from 'react';
import { Helmet } from 'react-helmet';

const ArticleSchema = ({ post, fullUrl, category }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.meta_title || post.title,
    description: post.meta_description || post.summary,
    image: post.featured_image?.src || post.image_path,
    datePublished: post.publish_date,
    dateModified: post.updated_date || post.publish_date,
    author: {
      '@type': 'Organization',
      name: post.author || 'Calyco Paints',
      url: 'https://calycopaints.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Calyco Paints',
      logo: {
        '@type': 'ImageObject',
        url: 'https://calycopaints.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl
    }
  };

  if (post.seo?.keywords) {
    schema.keywords = post.seo.keywords.join(', ');
  }

  if (category) {
    schema.articleSection = category.name;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default ArticleSchema;
