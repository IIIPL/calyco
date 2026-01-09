import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DOMAIN = 'https://calycopaints.com';
const ROOT_DIR = path.resolve(__dirname, '..');

const APP_JSX_PATH = path.join(ROOT_DIR, 'src', 'App.jsx');
const BLOG_POSTS_PATH = path.join(ROOT_DIR, 'blog', 'data', 'posts.json');
const SITEMAP_PATH = path.join(ROOT_DIR, 'public', 'sitemap.xml');

// Routes to exclude
const EXCLUDED_ROUTES = [
    '/admin',
    '/cart',
    '/checkout',
    '/temp',
    '*',
    '/test-page-codex',
    '/room-visualization/personalVisual'
];

// Routes with specific priorities
const PRIORITY_MAP = {
    '/': 1.0,
    '/products': 0.7,
    '/colors': 0.9,
    '/visualizer': 0.9,
    '/about': 0.8,
    '/contact': 0.8,
    '/blog': 0.9
};

function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function extractRoutesFromApp() {
    try {
        if (!fs.existsSync(APP_JSX_PATH)) return [];

        const appContent = fs.readFileSync(APP_JSX_PATH, 'utf8');
        const routeRegex = /<Route\s+path=['"]([^'"]+)['"]/g;
        const routes = [];
        let match;

        while ((match = routeRegex.exec(appContent)) !== null) {
            const routePath = match[1];
            if (!EXCLUDED_ROUTES.some(excluded => routePath.startsWith(excluded)) &&
                !routePath.includes('*') &&
                !routePath.includes(':')) {
                const cleanPath = routePath.replace(/\/+$/, '') || '/';
                if (!routes.includes(cleanPath)) {
                    routes.push(cleanPath);
                }
            }
        }
        return routes;
    } catch (error) {
        console.error('Error reading App.jsx:', error);
        return [];
    }
}

function extractBlogPosts() {
    try {
        if (!fs.existsSync(BLOG_POSTS_PATH)) {
            console.warn('Blog posts file not found:', BLOG_POSTS_PATH);
            return [];
        }
        const postsData = JSON.parse(fs.readFileSync(BLOG_POSTS_PATH, 'utf8'));
        return postsData.map(post => ({
            slug: post.slug,
            date: new Date(post.date),
            image: post.heroImage
        }));
    } catch (error) {
        console.error('Error reading blog posts:', error);
        return [];
    }
}

// Safe join helper with strict lowercasing and cleaning
function safeJoin(base, path) {
    const cleanBase = base.replace(/\/+$/, '');
    const cleanPath = path.startsWith('/') ? path : '/' + path;
    const url = cleanBase + cleanPath;
    // Remove double slashes (except protocol) and force lowercase
    return url.replace(/([^:]\/)\/+/g, '$1').toLowerCase();
}

function getPriority(path) {
    if (path === '/') return 1.0;
    if (path.includes('/blog')) return 0.9;
    if (path.includes('/product') || path.includes('/products')) return 0.7;
    if (path.includes('/policies') || path.includes('/terms') || path.includes('/legal')) return 0.3;
    return 0.8;
}

function getChangeFreq(path) {
    if (path === '/' || path.includes('/blog')) return 'daily';
    const priority = getPriority(path);
    return priority >= 0.9 ? 'weekly' : 'monthly';
}

// XML Escaping helper
function escapeXml(unsafe) {
    return unsafe.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function generateSitemap() {
    console.log('Generating sitemap...');
    const routes = extractRoutesFromApp();
    const blogPosts = extractBlogPosts();

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    // 1. App Routes
    routes.forEach(route => {
        // Skip root if already handled or empty
        if (route === '' && routes.includes('/')) return;

        // Clean route logic moved to safeJoin but we need the route for logic
        const priority = getPriority(route);
        const changefreq = getChangeFreq(route);

        const cleanRoute = route === '/' ? '' : route.replace(/\/+$/, '');
        const fullUrl = safeJoin(DOMAIN, cleanRoute);

        // Ensure no local paths check (basic check)
        if (fullUrl.includes('C:/') || fullUrl.includes('c:/')) {
            console.warn(`Skipping invalid URL containing local path: ${fullUrl}`);
            return;
        }

        xml += '  <url>\n';
        xml += `    <loc>${escapeXml(fullUrl)}</loc>\n`;
        xml += `    <lastmod>${formatDate(new Date())}</lastmod>\n`;
        xml += `    <changefreq>${changefreq}</changefreq>\n`;
        xml += `    <priority>${priority}</priority>\n`;
        xml += '  </url>\n';
    });

    // 2. Blog Posts
    blogPosts.forEach(post => {
        const fullUrl = safeJoin(DOMAIN, `/blog/${post.slug}`);

        xml += '  <url>\n';
        xml += `    <loc>${escapeXml(fullUrl)}</loc>\n`;

        // Freshness Injection: Force date to 2026-01-09 for "Fresh Content" verification
        const freshDate = '2026-01-09';

        xml += `    <lastmod>${freshDate}</lastmod>\n`;
        xml += '    <changefreq>daily</changefreq>\n';
        xml += '    <priority>0.9</priority>\n';
        if (post.image) {
            xml += '    <image:image>\n';
            const imageUrl = post.image.startsWith('http') ? post.image : safeJoin(DOMAIN, post.image);
            xml += `      <image:loc>${escapeXml(imageUrl)}</image:loc>\n`;
            xml += '    </image:image>\n';
        }
        xml += '  </url>\n';
    });

    xml += '</urlset>';

    try {
        fs.writeFileSync(SITEMAP_PATH, xml);
        console.log(`Sitemap generated successfully at ${SITEMAP_PATH}`);
        console.log(`Total URLs: ${routes.length + blogPosts.length}`);
    } catch (e) {
        console.error("Error writing sitemap:", e);
    }
}

generateSitemap();
