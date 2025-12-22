import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronDown } from 'lucide-react';
import postsData from '../data/posts.json';
import '../styles/asian-paints-blog.css';

const FilterOption = ({ label, count, checked, onChange }) => (
    <label className="flex items-center gap-3 cursor-pointer group mb-5">
        <div className={`w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center transition-colors ${checked ? 'border-brand-purple' : 'group-hover:border-brand-purple'}`}>
            {checked && <div className="w-3 h-3 rounded-full bg-brand-purple" />}
        </div>
        <span className="text-[13px] flex items-center gap-2">
            <span className={`${checked ? 'text-brand-purple font-semibold' : 'text-gray-600'}`}>{label}</span>
            <span className={`${checked ? 'text-brand-purple' : 'text-gray-400'} text-sm`}>({count})</span>
        </span>
        <input type="radio" className="hidden" checked={checked} onChange={onChange} />
    </label>
);


const FilterSection = ({ title, isOpen, onToggle, children }) => (
    <div className={`border-b border-gray-100 last:border-0 ${isOpen ? 'p-3 rounded-md border border-gray-300 bg-white' : ''}`}>
        <button
            onClick={onToggle}
            className={`flex items-center justify-between w-full ${isOpen ? 'py-2' : 'py-4'} text-[14px] font-bold text-gray-900 uppercase tracking-wider hover:text-brand-purple transition-colors`}
        >
            {title}
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
            {children}
        </div>
    </div>
);

const BlogIndex = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
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

    // Apply category filter
    const filteredPosts = sortedPosts.filter(post => selectedCategory === 'All' || post.category === selectedCategory);

    return (
        <div className="calyco-blog-system">
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
                <aside className="wallpaper-left-pane sticky top-28 self-start">
                    <div className="filter-header">
                        <h3>FILTERS</h3>
                        <button className="clear-btn" onClick={() => setSelectedCategory('All')}>CLEAR</button>
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
                                    onChange={() => setSelectedCategory('All')}
                                />
                                {categories.map(cat => (
                                    <FilterOption
                                        key={cat.name}
                                        label={cat.name}
                                        count={cat.count}
                                        checked={selectedCategory === cat.name}
                                        onChange={() => setSelectedCategory(cat.name)}
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
                                    <label key={item.name} className="flex items-center gap-3 cursor-pointer group mb-5">
                                        <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-brand-purple transition-colors"></div>
                                        <span className="text-[13px] text-gray-600 group-hover:text-brand-purple">{item.name} ({item.count})</span>
                                    </label>
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
                                    <label key={item.name} className="flex items-center gap-3 cursor-pointer group mb-5">
                                        <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-brand-purple transition-colors"></div>
                                        <span className="text-[13px] text-gray-600 group-hover:text-brand-purple">{item.name} ({item.count})</span>
                                    </label>
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
                                    <label key={item.name} className="flex items-center gap-3 cursor-pointer group mb-5">
                                        <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-brand-purple transition-colors"></div>
                                        <span className="text-[13px] text-gray-600 group-hover:text-brand-purple">{item.name} ({item.count})</span>
                                    </label>
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
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">SORT BY</span>
                            <div className="relative">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center justify-between min-w-[120px] gap-2 text-sm font-bold text-[#1a1a1a] border border-gray-300 px-4 py-2 bg-white hover:border-gray-400 transition-colors shadow-sm"
                                >
                                    {sortOrder}
                                    <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Sort Dropdown */}
                                {isSortOpen && (
                                    <div className="absolute top-full right-0 w-full mt-1 border border-gray-200 bg-white shadow-xl z-30 py-1">
                                        {['NEW', 'OLD'].map((option) => (
                                            <button
                                                key={option}
                                                className={`block w-full text-left px-4 py-2.5 text-sm font-bold transition-colors ${sortOrder === option ? 'bg-blue-50 text-brand-purple' : 'text-[#1a1a1a] hover:bg-gray-50'}`}
                                                onClick={() => {
                                                    setSortOrder(option);
                                                    setIsSortOpen(false);
                                                }}
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
                    <div className="wallpaper-lists-grid">
                        {filteredPosts.map((post) => (
                            <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
                                {/* Image Wrapper */}
                                <div className="blog-card-image-wrapper">
                                    <img
                                        src={post.heroImage || 'https://via.placeholder.com/600x400'}
                                        alt={post.title}
                                    />
                                    <button
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(post.slug); }}
                                        className={`heart-icon-btn ${favorites.has(post.slug) ? 'active' : ''}`}
                                        aria-label={favorites.has(post.slug) ? 'Remove favorite' : 'Add to favorites'}
                                    >
                                        <Heart className="w-[16px] h-[16px]" fill={favorites.has(post.slug) ? 'currentColor' : 'none'} strokeWidth={2} />
                                    </button>
                                </div>

                                {/* Card Content */}
                                <div className="blog-card-content">
                                    <h2 className="blog-title">
                                        {post.title}
                                    </h2>
                                    <div className="blog-meta">
                                        <span>Bhavya Bhat</span>
                                        <span className="text-gray-300"> | </span>
                                        <span>{post.date ? new Date(post.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() : '09 OCT 2025'}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BlogIndex;
