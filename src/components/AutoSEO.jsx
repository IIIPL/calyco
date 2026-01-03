import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from './SEO';

const DEFAULT_IMAGE = 'https://calycopaints.com/Assets/Product%20Images/Premium%20Interior%20Emulsion/1.webp';

const titleCase = (text = '') =>
  text
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const AutoSEO = () => {
  const { pathname } = useLocation();

  const meta = useMemo(() => {
    const canonical = `https://calycopaints.com${pathname}`;

    // Product detail pages
    if (pathname.startsWith('/product/')) {
      const slug = decodeURIComponent(pathname.replace('/product/', '') || 'Product');
      const name = titleCase(slug.replace(/\//g, ' ').trim());
      return {
        title: `${name} | Calyco Paints`,
        description: `Discover ${name} by Calyco Paints. Low-VOC, high-performance coatings with premium finishes for Indian homes and projects.`,
        canonicalUrl: canonical,
        image: DEFAULT_IMAGE,
      };
    }

    // Texture listing
    if (pathname === '/textures') {
      return {
        title: 'Premium Wall Textures | Calyco Paints',
        description: 'Browse Calyco’s exclusive range of designer wall textures with rich finishes for interiors and exteriors.',
        canonicalUrl: canonical,
        image: DEFAULT_IMAGE,
      };
    }

    // Texture detail pages
    if (pathname.startsWith('/textures/')) {
      const slug = decodeURIComponent(pathname.replace('/textures/', '') || 'Texture');
      const name = titleCase(slug);
      return {
        title: `${name} Texture Finish | Calyco Paints`,
        description: `See specs, application details, and inspiration for the ${name} texture finish from Calyco.`,
        canonicalUrl: canonical,
        image: DEFAULT_IMAGE,
      };
    }

    // Colors
    if (pathname.startsWith('/colors')) {
      return {
        title: 'Paint Colors & Palettes | Calyco Paints',
        description: 'Explore curated color families, palettes, and visualizer tools to find the perfect Calyco shade for your space.',
        canonicalUrl: canonical,
        image: DEFAULT_IMAGE,
      };
    }

    // Inspirations
    if (pathname.startsWith('/inspirations')) {
      return {
        title: 'Room Inspiration Gallery | Calyco Paints',
        description: 'Get design ideas by room and style with Calyco inspiration galleries and paint combinations.',
        canonicalUrl: canonical,
        image: DEFAULT_IMAGE,
      };
    }

    // Blog
    if (pathname.startsWith('/blog')) {
      return {
        title: 'Calyco Paints Blog | Tips, Trends & How-Tos',
        description: 'Read expert advice, design trends, and product guidance from the Calyco Paints blog.',
        canonicalUrl: canonical,
        image: DEFAULT_IMAGE,
      };
    }

    // City landing
    if (/^\/[a-z0-9-]+$/i.test(pathname) && pathname !== '/') {
      const city = titleCase(pathname.replace('/', ''));
      return {
        title: `${city} Paints & Services | Calyco`,
        description: `Calyco premium paints and services in ${city}. Connect for color consultation, textures, primers, and emulsions.`,
        canonicalUrl: canonical,
        image: DEFAULT_IMAGE,
      };
    }

    // Default pages (home, misc)
    return {
      title: 'Calyco Paints | Premium, Low-VOC Paints & Textures',
      description:
        'Shop Calyco’s premium interior/exterior paints, primers, sealers, and designer textures. Low-VOC, durable finishes built for Indian weather.',
      canonicalUrl: canonical,
      image: DEFAULT_IMAGE,
    };
  }, [pathname]);

  return <SEO {...meta} />;
};

export default AutoSEO;
