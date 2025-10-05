import React, { useEffect, useMemo } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {
  CATEGORIES,
  getCategoryBySlug,
  getPostsByCategory
} from '../../../data/blogData';

const GOLD_ACCENT = '#FFD700';

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const activeCategory = useMemo(
    () => getCategoryBySlug(slug) ?? CATEGORIES[0],
    [slug]
  );

  useEffect(() => {
    if (!slug) {
      navigate(`/blogs/categories/${activeCategory.slug}`, { replace: true });
      return;
    }

    if (!getCategoryBySlug(slug)) {
      navigate(`/blogs/categories/${CATEGORIES[0].slug}`, { replace: true });
    }
  }, [slug, navigate, activeCategory.slug]);

  const posts = useMemo(
    () => getPostsByCategory(activeCategory.slug),
    [activeCategory.slug]
  );

  return (
    <div className="bg-white text-gray-900">
      <section className="relative flex items-center justify-center px-6 py-24 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-yellow-300 via-white to-gray-200" />
        <div className="relative max-w-3xl">
          <span className="uppercase tracking-[0.35em] text-xs text-gray-700">Calyco Blog</span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
            {activeCategory.name}
          </h1>
          <p className="mt-5 text-base md:text-lg text-gray-600">
            {activeCategory.description}
          </p>
        </div>
      </section>

      <nav className="sticky top-[72px] z-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 px-6 py-4 overflow-x-auto">
            {CATEGORIES.map((category) => (
              <NavLink
                key={category.slug}
                to={`/blogs/categories/${category.slug}`}
                end
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full border px-5 py-2.5 text-sm transition-colors duration-200 ${
                    isActive
                      ? 'shadow-sm text-gray-900'
                      : 'border-gray-200 text-gray-600 hover:text-gray-900'
                  }`
                }
                style={({ isActive }) =>
                  isActive
                    ? { backgroundColor: GOLD_ACCENT, borderColor: GOLD_ACCENT }
                    : undefined
                }
              >
                {category.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl px-6 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col overflow-hidden transition-transform duration-200 bg-white border border-gray-100 rounded-3xl hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative overflow-hidden aspect-[3/2]">
                <img
                  src={post.image_path}
                  alt={post.title}
                  className="object-cover w-full h-full transition-transform duration-300"
                />
              </div>

              <div className="flex flex-col flex-1 px-6 py-8">
                <div className="flex items-center gap-3 text-[0.65rem] font-semibold tracking-[0.35em] uppercase" style={{ color: GOLD_ACCENT }}>
                  <span>{activeCategory.name}</span>
                  <span className="block w-1 h-1 rounded-full bg-gray-300" />
                  <span>{post.read_time}</span>
                </div>

                <h2 className="mt-5 text-2xl font-semibold leading-snug">
                  {post.title}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  {post.summary}
                </p>

                <div className="mt-auto pt-8">
                  <NavLink
                    to={post.slug ? `/blogs/${post.slug}` : '#'}
                    className="text-sm font-semibold tracking-wide uppercase hover:underline"
                    style={{ color: GOLD_ACCENT }}
                  >
                    Read Article
                  </NavLink>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Fresh stories coming soon
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
