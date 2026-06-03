
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../src/components/SEO';
import { Heart, ChevronDown } from 'lucide-react';
import postsData from '../data/posts.json';
import '../styles/calyco-blog.css';

const BRAND = '#493657';
const BRAND_GOLD = '#998850';

const FilterOption = ({ label, count, checked, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        aria-pressed={checked}
        className="flex items-center gap-3 cursor-pointer group mb-4 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#493657] rounded"
    >
        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${checked ? 'border-[#493657]' : 'border-gray-300 group-hover:border-[#493657]'}`}>
            {checked && <div className="w-2.5 h-2.5 rounded-full bg-[#493657]" />}
        </div>
        <span className="text-sm flex items-center gap-1.5">
            <span className={checked ? 'text-[#493657] font-semibold' : 'text-[#0F1221]/60'}>{label}</span>
            <span className={`text-xs ${checked ? 'text-[#493657]' : 'text-[#0F1221]/35'}`}>({count})</span>
        </span>
    </button>
);

const FilterSection = ({ title, isOpen, onToggle, children }) => (
    <div className="border-b border-[#e5e0d8] last:border-0">
        <button
            onClick={onToggle}
            aria-expanded={isOpen}
            className="flex items-center justify-between w-full py-4 text-[11px] font-bold text-[#0F1221] uppercase tracking-[0.2em] hover:text-[#493657] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#493657] rounded"
        >
            <span>{title}</span>
            <ChevronDown className={`w-4 h-4 text-[#0F1221]/40 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
            {children}
        </div>
    </div>
);

const BlogIndex = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedWaterproofing, setSelectedWaterproofing] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedSurface, setSelectedSurface] = useState(null);
    const [sortOrder, setSortOrder] = useState('NEW');
    const [isSortOpen, setIsSortOpen] = useState(false);

    const [openSections, setOpenSections] = useState({
        category: true,
        waterproofing: false,
        areas: false,
        surface: false
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const posts = Array.isArray(postsData) ? postsData : [];

    const [favorites, setFavorites] = useState(new Set());

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('blog_favorites') || '[]');
            setFavorites(new Set(saved));
        } catch (e) { }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('blog_favorites', JSON.stringify(Array.from(favorites)));
        } catch (e) { }
    }, [favorites]);

    const toggleFavorite = (slug) => {
        setFavorites(prev => {
            const next = new Set(prev);
            if (next.has(slug)) next.delete(slug);
            else next.add(slug);
            return next;
        });
    };

    const getCounts = () => {
        const counts = { category: {}, waterproofing: {}, areas: {}, surfaces: {} };
        const waterproofingKeys = ['Dampness & Seepage', 'Roof Leakage', 'Cracks & Peeling', 'Fungal & Algae Growth', 'Efflorescence'];
        const areaKeys = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Exterior / Façade'];
        const surfaceKeys = ['Interior Walls', 'Exterior Masonry', 'Wood Surfaces', 'Metal Surfaces', 'Roof/Terrace'];

        waterproofingKeys.forEach(k => counts.waterproofing[k] = 0);
        areaKeys.forEach(k => counts.areas[k] = 0);
        surfaceKeys.forEach(k => counts.surfaces[k] = 0);

        posts.forEach(post => {
            if (post.category) counts.category[post.category] = (counts.category[post.category] || 0) + 1;
            if (post.waterproofingIssue && counts.waterproofing.hasOwnProperty(post.waterproofingIssue)) counts.waterproofing[post.waterproofingIssue]++;
            if (Array.isArray(post.areas)) post.areas.forEach(area => { counts.areas[area] = (counts.areas[area] || 0) + 1; });
            if (Array.isArray(post.surfaces)) post.surfaces.forEach(s => { counts.surfaces[s] = (counts.surfaces[s] || 0) + 1; });
        });
        return counts;
    };

    const counts = getCounts();
    const categories = Object.keys(counts.category).map(name => ({ name, count: counts.category[name] })).sort((a, b) => b.count - a.count);
    const waterproofingFilters = Object.keys(counts.waterproofing).map(name => ({ name, count: counts.waterproofing[name] }));
    const areaFilters = Object.keys(counts.areas).map(name => ({ name, count: counts.areas[name] }));
    const surfaceFilters = Object.keys(counts.surfaces).map(name => ({ name, count: counts.surfaces[name] }));

    const sortedPosts = [...posts].sort((a, b) => {
        if (sortOrder === 'NEW') return new Date(b.date) - new Date(a.date);
        if (sortOrder === 'OLD') return new Date(a.date) - new Date(b.date);
        return 0;
    });

    const FALLBACK_AUTHORS = ['Aditi Rao', 'Vikram Singh', 'Priya Desai', 'Rahul Kapoor', 'Anjali Mehta', 'Suresh Menon', 'Kavita Reddy', 'Arjun Malhotra'];

    const getAuthor = (post) => {
        if (post.author && post.author !== 'Calyco Expert') return post.author;
        return FALLBACK_AUTHORS[(post.id || post.slug.length) % FALLBACK_AUTHORS.length];
    };

    const filteredPosts = sortedPosts.filter(post => {
        const categoryMatch = selectedCategory === 'All' || post.category === selectedCategory;
        const waterproofingMatch = !selectedWaterproofing || post.waterproofingIssue === selectedWaterproofing;
        const areaMatch = !selectedArea || (Array.isArray(post.areas) && post.areas.includes(selectedArea));
        const surfaceMatch = !selectedSurface || (Array.isArray(post.surfaces) && post.surfaces.includes(selectedSurface));
        return categoryMatch && waterproofingMatch && areaMatch && surfaceMatch;
    });

    const clearAllFilters = () => {
        setSelectedCategory('All');
        setSelectedWaterproofing(null);
        setSelectedArea(null);
        setSelectedSurface(null);
    };

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        headline: 'Paint Tips, Colour Trends & Waterproofing Guides | Calyco',
        description: 'Expert tips on interior painting, waterproofing, wall design and colour selection from Calyco Paints.',
        blogPost: filteredPosts.map(post => ({
            '@type': 'BlogPosting',
            headline: post.title,
            image: post.heroImage ? (post.heroImage.startsWith('http') ? post.heroImage : `https://calycopaints.com${post.heroImage}`) : undefined,
            datePublished: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
            author: { '@type': 'Person', name: getAuthor(post) },
            mainEntityOfPage: { '@type': 'WebPage', '@id': `https://calycopaints.com/blog/${post.slug}` }
        }))
    };

    return (
        <div className="calyco-blog-system">
            <SEO
                title="Paint Tips, Colour Trends & Waterproofing Guides | Calyco"
                description="Expert tips on interior painting, waterproofing, wall design and colour selection from Calyco Paints."
                url="https://calycopaints.com/blog"
                schemaMarkup={schema}
            />

            {/* Hero */}
            <div className="bg-[#0F1221] pt-24 pb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#F0C85A]/6 blur-[120px] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#998850] font-semibold mb-4">Calyco Blog</p>
                    <h1 className="text-4xl sm:text-5xl font-bold text-white leading-[1.05] max-w-2xl">
                        Paint tips, colour trends and waterproofing guides.
                    </h1>
                    <p className="mt-4 text-white/55 text-lg max-w-xl leading-relaxed">
                        Expert guidance on interior painting, exterior finishes, wall design and surface care.
                    </p>
                </div>
            </div>

            {/* Main Blog Container */}
            <div className="blog-listing-container">

                {/* Left Sidebar */}
                <aside className="wallpaper-left-pane sticky top-28 self-start" aria-label="Blog Filters">
                    <div className="filter-header">
                        <h2>Filters</h2>
                        <button className="clear-btn" onClick={clearAllFilters}>Clear all</button>
                    </div>

                    <div>
                        <FilterSection title="Category" isOpen={openSections.category} onToggle={() => toggleSection('category')}>
                            <div className="flex flex-col">
                                <FilterOption label="All" count={posts.length} checked={selectedCategory === 'All'} onClick={() => setSelectedCategory('All')} />
                                {categories.map(cat => (
                                    <FilterOption key={cat.name} label={cat.name} count={cat.count} checked={selectedCategory === cat.name} onClick={() => setSelectedCategory(prev => prev === cat.name ? 'All' : cat.name)} />
                                ))}
                            </div>
                        </FilterSection>

                        <FilterSection title="Waterproofing Issues" isOpen={openSections.waterproofing} onToggle={() => toggleSection('waterproofing')}>
                            <div className="flex flex-col">
                                {waterproofingFilters.map(item => (
                                    <FilterOption key={item.name} label={item.name} count={item.count} checked={selectedWaterproofing === item.name} onClick={() => setSelectedWaterproofing(prev => prev === item.name ? null : item.name)} />
                                ))}
                            </div>
                        </FilterSection>

                        <FilterSection title="Areas" isOpen={openSections.areas} onToggle={() => toggleSection('areas')}>
                            <div className="flex flex-col">
                                {areaFilters.map(item => (
                                    <FilterOption key={item.name} label={item.name} count={item.count} checked={selectedArea === item.name} onClick={() => setSelectedArea(prev => prev === item.name ? null : item.name)} />
                                ))}
                            </div>
                        </FilterSection>

                        <FilterSection title="Surface" isOpen={openSections.surface} onToggle={() => toggleSection('surface')}>
                            <div className="flex flex-col">
                                {surfaceFilters.map(item => (
                                    <FilterOption key={item.name} label={item.name} count={item.count} checked={selectedSurface === item.name} onClick={() => setSelectedSurface(prev => prev === item.name ? null : item.name)} />
                                ))}
                            </div>
                        </FilterSection>
                    </div>
                </aside>

                {/* Right Content */}
                <main className="wallpaper-right-pane">
                    {/* Sort Bar */}
                    <div className="sort-bar-row">
                        <p className="text-sm text-[#0F1221]/50">
                            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                        </p>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-[#0F1221]/40 uppercase tracking-wider">Sort</span>
                            <div className="relative">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-2 text-sm font-semibold text-[#0F1221] border border-[#e5e0d8] px-4 py-2 bg-white rounded-xl hover:border-[#493657] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#493657]"
                                    aria-haspopup="listbox"
                                    aria-expanded={isSortOpen}
                                >
                                    {sortOrder === 'NEW' ? 'Newest first' : 'Oldest first'}
                                    <ChevronDown className={`w-4 h-4 text-[#0F1221]/40 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isSortOpen && (
                                    <div className="absolute top-full right-0 mt-1.5 border border-[#e5e0d8] bg-white shadow-xl rounded-xl z-30 py-1.5 min-w-[140px]" role="listbox">
                                        {[{ val: 'NEW', label: 'Newest first' }, { val: 'OLD', label: 'Oldest first' }].map(({ val, label }) => (
                                            <button
                                                key={val}
                                                className={`block w-full text-left px-4 py-2.5 text-sm transition-colors rounded ${sortOrder === val ? 'bg-[#493657]/8 text-[#493657] font-semibold' : 'text-[#0F1221] hover:bg-[#FBF9F6]'}`}
                                                onClick={() => { setSortOrder(val); setIsSortOpen(false); }}
                                                role="option"
                                                aria-selected={sortOrder === val}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Blog Cards */}
                    {filteredPosts.length === 0 ? (
                        <div role="status" aria-live="polite" className="w-full text-center py-16 bg-white rounded-2xl border border-[#e5e0d8]">
                            <p className="text-lg text-[#0F1221]/50 font-medium">No articles match your selected filters.</p>
                            <button onClick={clearAllFilters} className="mt-3 text-[#493657] hover:text-[#F0C85A] font-semibold text-sm transition-colors">
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="wallpaper-lists-grid">
                            {filteredPosts.map((post) => (
                                <article key={post.slug} className="blog-card group relative flex flex-col items-start text-left">
                                    <div className="blog-card-image-wrapper relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl">
                                        <Link to={`/blog/${post.slug}`} className="block w-full h-full" aria-hidden="true" tabIndex="-1">
                                            <img
                                                src={post.heroImage || '/Assets/home-hero/home-page-hero-updated.webp'}
                                                alt=""
                                                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.04]"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-[#0F1221]/0 group-hover:bg-[#0F1221]/5 transition-colors" />
                                        </Link>
                                        {post.category && (
                                            <span className="absolute top-3 left-3 z-10 rounded-full bg-[#493657] text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wide">
                                                {post.category}
                                            </span>
                                        )}
                                        <button
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(post.slug); }}
                                            className={`heart-icon-btn absolute top-3 right-3 z-20 ${favorites.has(post.slug) ? 'active' : ''}`}
                                            aria-label={favorites.has(post.slug) ? `Remove from favourites` : `Add to favourites`}
                                        >
                                            <Heart className={`w-4 h-4 ${favorites.has(post.slug) ? 'fill-red-500 text-red-500' : 'text-[#0F1221]/50'}`} />
                                        </button>
                                    </div>

                                    <div className="blog-card-content w-full">
                                        <h2 className="blog-title">
                                            <Link
                                                to={`/blog/${post.slug}`}
                                                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#493657] focus-visible:ring-offset-2 rounded no-underline hover:no-underline"
                                                aria-label={`Read: ${post.title}`}
                                            >
                                                {post.title}
                                            </Link>
                                        </h2>
                                        <div className="blog-meta flex items-center gap-2">
                                            <span>{getAuthor(post)}</span>
                                            <span className="text-[#0F1221]/20">·</span>
                                            <span>{post.date ? new Date(post.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '09 Oct 2025'}</span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default BlogIndex;
