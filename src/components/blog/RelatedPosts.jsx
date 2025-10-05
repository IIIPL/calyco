import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS, getCategoryBySlug } from '../../data/blogData';

const RelatedPosts = ({ currentPostId, currentCategorySlug, limit = 3 }) => {
  const getRelatedPosts = () => {
    // Filter out current post
    let posts = BLOG_POSTS.filter(post => post.id !== currentPostId);

    // Priority 1: Same category
    const sameCategoryPosts = posts.filter(p => p.category_slug === currentCategorySlug);
    if (sameCategoryPosts.length >= limit) {
      return sameCategoryPosts.slice(0, limit);
    }

    // Priority 2: Mix of same category + recent posts
    const remaining = limit - sameCategoryPosts.length;
    const otherPosts = posts
      .filter(p => p.category_slug !== currentCategorySlug)
      .slice(0, remaining);

    return [...sameCategoryPosts, ...otherPosts].slice(0, limit);
  };

  const relatedPosts = getRelatedPosts();

  if (relatedPosts.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          You Might Also Like
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {relatedPosts.map((post) => {
            const category = getCategoryBySlug(post.category_slug);

            return (
              <Link
                key={post.id}
                to={`/blogs/${post.slug}`}
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

                  <h3 className="text-lg font-semibold text-gray-900 leading-snug group-hover:text-yellow-700 transition-colors">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                    {post.summary}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
