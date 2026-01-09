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
    '/products': 0.9,
    '/colors': 0.9,
    '/visualizer': 0.9,
    '/about': 0.8,
    '/contact': 0.8,
    '/blog': 0.8
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

function generateSitemap() {
    console.log('Generating sitemap...');
    const routes = extractRoutesFromApp();
    const blogPosts = extractBlogPosts();

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    // 1. App Routes
    routes.forEach(route => {
        const priority = PRIORITY_MAP[route] || 0.8;
        const changefreq = priority >= 0.9 ? 'weekly' : 'monthly';

        if (route === '' && routes.includes('/')) return;

        xml += '  <url>\n';
        xml += `    <loc>${DOMAIN}${route === '/' ? '' : route}</loc>\n`;
        xml += `    <lastmod>${formatDate(new Date())}</lastmod>\n`;
        xml += `    <changefreq>${changefreq}</changefreq>\n`;
        xml += `    <priority>${priority}</priority>\n`;
        xml += '  </url>\n';
    });

    // 2. Blog Posts
    blogPosts.forEach(post => {
        xml += '  <url>\n';
        xml += `    <loc>${DOMAIN}/blog/${post.slug}</loc>\n`;

        const postDate = !isNaN(post.date) ? post.date : new Date();

        xml += `    <lastmod>${formatDate(postDate)}</lastmod>\n`;
        xml += '    <changefreq>daily</changefreq>\n';
        xml += '    <priority>0.8</priority>\n';
        if (post.image) {
            xml += '    <image:image>\n';
            xml += `      <image:loc>${DOMAIN}${post.image}</image:loc>\n`;
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
