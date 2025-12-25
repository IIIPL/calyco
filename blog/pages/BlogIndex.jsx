
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Heart, ChevronDown } from 'lucide-react';
import postsData from '../data/posts.json';
import '../styles/asian-paints-blog.css';

const FilterOption = ({ label, count, checked, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        aria-pressed={checked}
        className="flex items-center gap-3 cursor-pointer group mb-5 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B007D] rounded"
    >
        <div className={`w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center transition-colors ${checked ? 'border-[#4B007D]' : 'group-hover:border-[#4B007D]'}`}>
            {checked && <div className="w-3 h-3 rounded-full bg-[#4B007D]" />}
        </div>
        <span className="text-[13px] flex items-center gap-2">
            <span className={`${checked ? 'text-[#4B007D] font-semibold' : 'text-gray-600'}`}>{label}</span>
            <span className={`${checked ? 'text-[#4B007D]' : 'text-gray-600'} text-sm`}>({count})</span>
        </span>
    </button>
);


const FilterSection = ({ title, isOpen, onToggle, children }) => (
    <div className={`border-b border-gray-100 last:border-0 ${isOpen ? 'p-3 rounded-md border border-gray-300 bg-white' : ''}`}>
        <button
            onClick={onToggle}
            aria-expanded={isOpen}
            className={`flex items-center justify-between w-full ${isOpen ? 'py-2' : 'py-4'} text-[14px] font-bold text-gray-900 uppercase tracking-wider hover:text-brand-purple transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B007D] rounded`}
        >
            <h3>{title}</h3>
            <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
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

    // Sidebar State
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

    // Favorites (persisted in localStorage)
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

    // --- Dynamic Counting Logic ---
    const getCounts = () => {
        const counts = {
            category: {},
            waterproofing: {},
            areas: {},
            surfaces: {}
        };

        // Known filter keys (ensure these appear even if zero)
        const waterproofingKeys = ['Dampness & Seepage', 'Roof Leakage', 'Cracks & Peeling', 'Fungal & Algae Growth', 'Efflorescence'];
        const areaKeys = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Exterior / Façade'];
        const surfaceKeys = ['Interior Walls', 'Exterior Masonry', 'Wood Surfaces', 'Metal Surfaces', 'Roof/Terrace'];

        waterproofingKeys.forEach(k => counts.waterproofing[k] = 0);
        areaKeys.forEach(k => counts.areas[k] = 0);
        surfaceKeys.forEach(k => counts.surfaces[k] = 0);

        // Build category counts dynamically (include any category found in posts)
        posts.forEach(post => {
            if (post.category) counts.category[post.category] = (counts.category[post.category] || 0) + 1;

            if (post.waterproofingIssue && counts.waterproofing.hasOwnProperty(post.waterproofingIssue)) counts.waterproofing[post.waterproofingIssue]++;

            if (Array.isArray(post.areas)) {
                post.areas.forEach(area => {
                    if (counts.areas.hasOwnProperty(area)) counts.areas[area]++;
                    else counts.areas[area] = (counts.areas[area] || 0) + 1;
                });
            }
            if (Array.isArray(post.surfaces)) {
                post.surfaces.forEach(surface => {
                    if (counts.surfaces.hasOwnProperty(surface)) counts.surfaces[surface]++;
                    else counts.surfaces[surface] = (counts.surfaces[surface] || 0) + 1;
                });
            }
        });

        return counts;
    };

    const counts = getCounts();

    const categories = Object.keys(counts.category).map(name => ({ name, count: counts.category[name] })).sort((a, b) => b.count - a.count);

    // Placeholder data for other sections
    const waterproofingFilters = Object.keys(counts.waterproofing).map(name => ({ name, count: counts.waterproofing[name] }));
    const areaFilters = Object.keys(counts.areas).map(name => ({ name, count: counts.areas[name] }));
    const surfaceFilters = Object.keys(counts.surfaces).map(name => ({ name, count: counts.surfaces[name] }));

    // Sort logic placeholder
    const sortedPosts = [...posts].sort((a, b) => {
        if (sortOrder === 'NEW') return new Date(b.date) - new Date(a.date);
        if (sortOrder === 'OLD') return new Date(a.date) - new Date(b.date);
        return 0;
    });

    const FALLBACK_AUTHORS = [
        "Aditi Rao", "Vikram Singh", "Priya Desai", "Rahul Kapoor",
        "Anjali Mehta", "Suresh Menon", "Kavita Reddy", "Arjun Malhotra"
    ];

    const getAuthor = (post) => {
        if (post.author && post.author !== "Calyco Expert") return post.author;
        // Deterministic fallback based on ID or slug length
        const index = (post.id || post.slug.length) % FALLBACK_AUTHORS.length;
        return FALLBACK_AUTHORS[index];
    };


    // Apply category filter
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

    // SEO Structured Data
    const schema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "headline": "Expert Home Decor & Waterproofing Blogs | Calyco Paints",
        "description": "Read expert tips on home decor, waterproofing solutions, and colour trends from Calyco Paints.",
        "blogPost": filteredPosts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.heroImage ? (post.heroImage.startsWith('http') ? post.heroImage : `https://calycopaints.com${post.heroImage}`) : undefined,
            "datePublished": post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
            "author": {
                "@type": "Person",
                "name": getAuthor(post)
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://calycopaints.com/blog/${post.slug}`
            }
        }))
    };

    return (
        <div className="calyco-blog-system">
            <Helmet>
                <html lang="en-IN" />
                <title>Expert Home Decor & Waterproofing Blogs | Calyco Paints</title>
                <meta name="description" content="Read expert tips on home decor, waterproofing solutions, and colour trends from Calyco Paints." />
                <link rel="canonical" href="https://calycopaints.com/blog" />
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            </Helmet>

            {/* Compact Hero Section */}
            <div className="bg-white pt-24 pb-8">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="text-center">
                        <h1 className="text-6xl font-serif font-bold text-[#111111] mb-6">Blogs</h1>
                        <p className="text-[#666666] text-base max-w-[800px] mx-auto font-light leading-relaxed">
                            Discover the art of beautiful living. Explore the latest interior trends, expert home decor tips, and colour inspiration.
                        </p>
                    </header>
                </div>
            </div>

            {/* Main Blog Container */}
            <div className="blog-listing-container">

                {/* Left Sidebar: Filters */}
                <aside className="wallpaper-left-pane sticky top-28 self-start" aria-label="Blog Filters">
                    <div className="filter-header">
                        <h2>FILTERS</h2>
                        <button className="clear-btn" onClick={clearAllFilters}>CLEAR</button>
                    </div>

                    <div>
                        {/* CATEGORY */}
                        <FilterSection
                            title="CATEGORY"
                            isOpen={openSections.category}
                            onToggle={() => toggleSection('category')}
                        >
                            <div className="flex flex-col pt-2">
                                <FilterOption
                                    label="All"
                                    count={posts.length}
                                    checked={selectedCategory === 'All'}
                                    onClick={() => setSelectedCategory('All')}
                                />
                                {categories.map(cat => (
                                    <FilterOption
                                        key={cat.name}
                                        label={cat.name}
                                        count={cat.count}
                                        checked={selectedCategory === cat.name}
                                        onClick={() => setSelectedCategory(prev => prev === cat.name ? 'All' : cat.name)}
                                    />
                                ))}
                            </div>
                        </FilterSection>

                        {/* WATERPROOFING ISSUES */}
                        <FilterSection
                            title="WATERPROOFING ISSUES"
                            isOpen={openSections.waterproofing}
                            onToggle={() => toggleSection('waterproofing')}
                        >
                            <div className="flex flex-col pt-2">
                                {waterproofingFilters.map(item => (
                                    <FilterOption
                                        key={item.name}
                                        label={item.name}
                                        count={item.count}
                                        checked={selectedWaterproofing === item.name}
                                        onClick={() => setSelectedWaterproofing(prev => prev === item.name ? null : item.name)}
                                    />
                                ))}
                            </div>
                        </FilterSection>

                        {/* AREAS */}
                        <FilterSection
                            title="AREAS"
                            isOpen={openSections.areas}
                            onToggle={() => toggleSection('areas')}
                        >
                            <div className="flex flex-col pt-2">
                                {areaFilters.map(item => (
                                    <FilterOption
                                        key={item.name}
                                        label={item.name}
                                        count={item.count}
                                        checked={selectedArea === item.name}
                                        onClick={() => setSelectedArea(prev => prev === item.name ? null : item.name)}
                                    />
                                ))}
                            </div>
                        </FilterSection>

                        {/* SURFACE */}
                        <FilterSection
                            title="SURFACE"
                            isOpen={openSections.surface}
                            onToggle={() => toggleSection('surface')}
                        >
                            <div className="flex flex-col pt-2">
                                {surfaceFilters.map(item => (
                                    <FilterOption
                                        key={item.name}
                                        label={item.name}
                                        count={item.count}
                                        checked={selectedSurface === item.name}
                                        onClick={() => setSelectedSurface(prev => prev === item.name ? null : item.name)}
                                    />
                                ))}
                            </div>
                        </FilterSection>
                    </div>
                </aside>

                {/* Mobile Filters Toggle */}
                <div className="lg:hidden mb-6">
                    <button className="w-full py-3 border border-gray-300 rounded text-center font-bold text-gray-700">
                        Show Filters
                    </button>
                </div>

                {/* Right Content Area */}
                <main className="wallpaper-right-pane">
                    {/* Sort Bar Header */}
                    <div className="sort-bar-row">
                        <div className="flex items-center gap-4 ml-auto">
                            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">SORT BY</span>
                            <div className="relative">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center justify-between min-w-[120px] gap-2 text-sm font-bold text-[#1a1a1a] border border-gray-300 px-4 py-2 bg-white hover:border-gray-400 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4B007D] rounded"
                                    aria-haspopup="listbox"
                                    aria-expanded={isSortOpen}
                                >
                                    {sortOrder}
                                    <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Sort Dropdown */}
                                {isSortOpen && (
                                    <div className="absolute top-full right-0 w-full mt-1 border border-gray-200 bg-white shadow-xl z-30 py-1" role="listbox">
                                        {['NEW', 'OLD'].map((option) => (
                                            <button
                                                key={option}
                                                className={`block w-full text-left px-4 py-2.5 text-sm font-bold transition-colors ${sortOrder === option ? 'bg-blue-50 text-brand-purple' : 'text-[#1a1a1a] hover:bg-gray-50'}`}
                                                onClick={() => {
                                                    setSortOrder(option);
                                                    setIsSortOpen(false);
                                                }}
                                                role="option"
                                                aria-selected={sortOrder === option}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Blog Cards Grid */}
                    {filteredPosts.length === 0 ? (
                        <div role="status" aria-live="polite" className="w-full text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <p className="text-lg text-gray-600 font-medium">No articles match your selected filters.</p>
                            <button onClick={clearAllFilters} className="mt-2 text-[#4B007D] hover:underline font-bold text-sm">Clear all filters</button>
                        </div>
                    ) : (
                        <div className="wallpaper-lists-grid">
                            {filteredPosts.map((post) => (
                                <article key={post.slug} className="blog-card group relative flex flex-col items-start text-left">
                                    {/* Image Wrapper */}
                                    <div className="blog-card-image-wrapper relative w-full aspect-[4/3] overflow-hidden rounded-lg">
                                        <Link to={`/blog/${post.slug}`} className="block w-full h-full" aria-hidden="true" tabIndex="-1">
                                            <img
                                                src={post.heroImage || 'https://via.placeholder.com/600x400'}
                                                alt=""
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>

                                        <button
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(post.slug); }}
                                            className={`heart-icon-btn absolute top-3 right-3 z-20 p-2 rounded-full bg-white shadow-md transition-transform hover:scale-110 ${favorites.has(post.slug) ? 'active' : ''}`}
                                            aria-label={favorites.has(post.slug) ? `Remove ${post.title} from favorites` : `Add ${post.title} to favorites`}
                                        >
                                            <Heart className={`w-4 h-4 ${favorites.has(post.slug) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                                        </button>
                                    </div>

                                    {/* Card Content */}
                                    <div className="blog-card-content mt-4 w-full">
                                        <h2 className="blog-title text-lg font-bold text-[#111] mb-2 line-clamp-2 group-hover:text-[#4B007D] transition-colors">
                                            <Link
                                                to={`/blog/${post.slug}`}
                                                className="focus:outline-none focus:ring-2 focus:ring-[#4B007D] focus:ring-offset-2 rounded no-underline hover:no-underline"
                                                aria-label={`Read article: ${post.title} by ${getAuthor(post)}`}
                                            >
                                                {post.title}
                                            </Link>
                                        </h2>
                                        <div className="blog-meta flex items-center text-xs font-medium text-gray-600 uppercase tracking-wide">
                                            <span aria-hidden="true" className="flex items-center">
                                                <span>{getAuthor(post)}</span>
                                                <span className="mx-2 text-gray-400">|</span>
                                                <span>{post.date ? new Date(post.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() : '09 OCT 2025'}</span>
                                            </span>
                                            <span className="sr-only">
                                                Article by {getAuthor(post)}, published on {post.date ? new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '9 October 2025'}
                                            </span>
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
