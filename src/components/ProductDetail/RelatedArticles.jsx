import React from 'react';
import { Link } from 'react-router-dom';
import postsData from '../../../blog/data/posts.json';

const RelatedArticles = ({ productTags, currentProductSlug }) => {
    const posts = Array.isArray(postsData) ? postsData : [];

    // Simple matching logic: find posts where metaDescription or title contains product name
    // In a real app, this would use the 'tags' property
    const relevantPosts = posts.filter(post => {
        if (!currentProductSlug) return true;
        const term = currentProductSlug.replace(/-/g, ' ');
        return post.title.toLowerCase().includes(term) ||
            post.metaDescription.toLowerCase().includes(term) ||
            // Fallback: just show any post if no specific match
            true;
    }).slice(0, 3);

    if (relevantPosts.length === 0) return null;

    return (
        <section className="py-16 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <h3 className="text-2xl font-serif font-bold text-[#493657] mb-8">Related Articles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relevantPosts.map((post) => (
                        <Link key={post.slug} to={`/blog/${post.slug}`} className="group flex gap-4 items-start hover:bg-gray-50 p-4 rounded-xl transition-colors">
                            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                <img src={post.heroImage || 'https://via.placeholder.com/150'} alt={post.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-[#F0C85A] uppercase tracking-wide mb-1 block">
                                    {post.tags?.[0] || 'Guide'}
                                </span>
                                <h4 className="font-bold text-[#493657] leading-tight mb-2 group-hover:text-purple-700 transition-colors">
                                    {post.title}
                                </h4>
                                <p className="text-xs text-gray-500 line-clamp-2">
                                    {post.metaDescription}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedArticles;
