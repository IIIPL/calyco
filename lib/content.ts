import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type ContentKind = 'pillar' | 'region' | 'comparison' | 'blog';

export interface ContentEntry {
  type: ContentKind;
  filePath: string;
  route: string;
  routeSegments: string[];
  data: Record<string, any>;
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

function walkDir(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walkDir(fullPath);
    }

    if (entry.isFile() && fullPath.endsWith('.mdx')) {
      return [fullPath];
    }

    return [];
  });
}

function determineRoute(filePath: string, slug: string): { type: ContentKind; route: string; routeSegments: string[] } {
  const relativePath = path.relative(CONTENT_DIR, filePath);
  const segments = relativePath.split(path.sep);

  if (segments[0] === 'pillars') {
    return { type: 'pillar', route: `/${slug}`, routeSegments: [slug] };
  }

  if (segments[0] === 'regions') {
    return { type: 'region', route: `/regions/${slug}`, routeSegments: ['regions', slug] };
  }

  if (segments[0] === 'comparisons') {
    return { type: 'comparison', route: `/comparisons/${slug}`, routeSegments: ['comparisons', slug] };
  }

  if (segments[0] === 'blog') {
    const folder = segments[1];
    return { type: 'blog', route: `/blog/${folder}/${slug}`, routeSegments: ['blog', folder, slug] };
  }

  throw new Error(`Unsupported content path: ${filePath}`);
}

export function getAllContentEntries(): ContentEntry[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = walkDir(CONTENT_DIR);
  return files.map((filePath) => {
    const source = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(source);
    const normalizedData = { ...data } as Record<string, unknown>;
    if (normalizedData.lastUpdated instanceof Date) {
      normalizedData.lastUpdated = normalizedData.lastUpdated.toISOString().split('T')[0];
    }
    const slug = typeof data.slug === 'string' ? data.slug : path.parse(filePath).name;
    const { type, route, routeSegments } = determineRoute(filePath, slug);

    return {
      type,
      filePath,
      route,
      routeSegments,
      data: normalizedData,
    };
  });
}

export function getEntryByRouteSegments(segments: string[]): ContentEntry | undefined {
  const joined = segments.join('/');
  return getAllContentEntries().find((entry) => entry.routeSegments.join('/') === joined);
}
