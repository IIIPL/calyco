import React from 'react';
import { Link } from 'react-router-dom';
import postsData from '../../../blog/data/posts.json';

const LatestInsights = () => {
    // Defensive check for posts data
    const posts = Array.isArray(postsData) ? postsData : [];

    // Get top 3 posts
    const latestPosts = posts.slice(0, 3);

    if (latestPosts.length === 0) return null;

    const getExcerpt = (content) => {
        if (!content) return '';
        // Try to get intro-text
        const match = content.match(/<p class=['"]intro-text['"]>(.*?)<\/p>/);
        if (match && match[1]) {
            // Decode HTML entities if needed, but for now just strip tags
            return match[1].replace(/<[^>]+>/g, '');
        }
        // Fallback: strip all tags and take first 150 chars
        const text = content.replace(/<[^>]+>/g, ' ');
        return text.substring(0, 120).trim() + '...';
    };

    return (
        <section className="py-16 sm:py-20 bg-warm">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <span className="text-sm font-bold tracking-wider text-brand-gold uppercase mb-2 block">Our Blog</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple">Latest Insights</h2>
                    </div>
                    <Link to="/blog" className="hidden sm:block px-6 py-2 border border-brand-purple text-brand-purple rounded-full hover:bg-brand-purple hover:text-white transition-all font-medium">
                        View All Articles
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {latestPosts.map((post) => (
                        <Link key={post.slug} to={`/blog/${post.slug}`} className="group block">
                            <div className="relative overflow-hidden rounded-2xl mb-4 h-64 shadow-card group-hover:shadow-cardLg transition-all">
                                <img src={post.heroImage || 'https://via.placeholder.com/400x300'} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur text-brand-purple text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {post.tags?.[0] || 'Advice'}
                                </span>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-brand-purple transition-colors mb-2 leading-tight">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2">
                                {getExcerpt(post.content)}
                            </p>
                            <div className="mt-3 text-brand-gold font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                Read More <span>→</span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Link to="/blog" className="inline-block px-6 py-3 border border-brand-purple text-brand-purple rounded-full hover:bg-brand-purple hover:text-white transition-all font-medium">
                        View All Articles
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestInsights;
