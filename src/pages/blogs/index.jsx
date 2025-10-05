import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS, CATEGORIES, getCategoryBySlug } from '../../data/blogData';

const GOLD_ACCENT = '#FFD700';

const BlogIndexPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get featured post (first post with full content)
  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find(post => post.content) || BLOG_POSTS[0];
  }, []);

  // Filter posts based on selected category
  const displayPosts = useMemo(() => {
    const posts = selectedCategory === 'all'
      ? BLOG_POSTS.filter(post => post.id !== featuredPost.id)
      : BLOG_POSTS.filter(post =>
          post.category_slug === selectedCategory && post.id !== featuredPost.id
        );
    return posts.slice(0, 12); // Show up to 12 posts
  }, [selectedCategory, featuredPost]);

  const featuredCategory = getCategoryBySlug(featuredPost.category_slug);

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center px-6 py-24 text-center overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-gray-50">
        <div className="relative max-w-4xl">
          <span className="uppercase tracking-[0.35em] text-xs text-gray-700">
            Calyco Paint Blog
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl font-bold leading-tight text-gray-900">
            Color Inspiration & Expert Advice
          </h1>
          <p className="mt-5 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover design trends, DIY tutorials, color psychology insights, and professional painting techniques from the Calyco team.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold tracking-wider uppercase text-yellow-700">
              Featured Article
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <Link
            to={featuredPost.slug ? `/blogs/${featuredPost.slug}` : '#'}
            className="group grid md:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-yellow-400 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative overflow-hidden aspect-[4/3]">
              <img
                src={featuredPost.image_path}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              {featuredCategory && (
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 w-fit"
                  style={{ backgroundColor: GOLD_ACCENT, color: '#1a1a1a' }}
                >
                  {featuredCategory.name}
                </span>
              )}

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-yellow-700 transition-colors">
                {featuredPost.title}
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6">
                {featuredPost.summary}
              </p>

              <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
                <span>{featuredPost.read_time}</span>
                {featuredPost.publish_date && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <time dateTime={featuredPost.publish_date}>
                      {new Date(featuredPost.publish_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </>
                )}
              </div>

              <div className="text-yellow-600 font-semibold text-sm uppercase tracking-wide group-hover:underline">
                Read Full Article →
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Category Filter */}
      <nav className="sticky top-[72px] z-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm transition-colors duration-200 ${
                selectedCategory === 'all'
                  ? 'shadow-sm text-gray-900'
                  : 'border-gray-200 text-gray-600 hover:text-gray-900'
              }`}
              style={
                selectedCategory === 'all'
                  ? { backgroundColor: GOLD_ACCENT, borderColor: GOLD_ACCENT }
                  : undefined
              }
            >
              All Articles
            </button>

            {CATEGORIES.map((category) => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm transition-colors duration-200 ${
                  selectedCategory === category.slug
                    ? 'shadow-sm text-gray-900'
                    : 'border-gray-200 text-gray-600 hover:text-gray-900'
                }`}
                style={
                  selectedCategory === category.slug
                    ? { backgroundColor: GOLD_ACCENT, borderColor: GOLD_ACCENT }
                    : undefined
                }
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post) => {
            const category = getCategoryBySlug(post.category_slug);

            return (
              <Link
                key={post.id}
                to={post.slug ? `/blogs/${post.slug}` : '#'}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-yellow-400 hover:shadow-lg transition-all duration-200"
              >
                <div className="relative overflow-hidden aspect-[3/2]">
                  <img
                    src={post.image_path}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs font-semibold tracking-wider uppercase text-yellow-600 mb-3">
                    <span>{category?.name}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{post.read_time}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 leading-snug group-hover:text-yellow-700 transition-colors mb-3">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {post.summary}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {displayPosts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              No articles found in this category
            </p>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Never Miss an Update
          </h2>
          <p className="text-gray-300 mb-8">
            Get expert color advice, DIY tips, and exclusive offers delivered to your inbox weekly
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              style={{ backgroundColor: GOLD_ACCENT, color: '#1a1a1a' }}
            >
              Subscribe
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-4">
            By subscribing, you agree to our{' '}
            <Link to="/policies/privacy" className="underline hover:text-white">
              Privacy Policy
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default BlogIndexPage;
