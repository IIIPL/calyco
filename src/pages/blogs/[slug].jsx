import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { BLOG_POSTS, getCategoryBySlug } from '../../data/blogData';
import ProductHighlight from '../../components/blog/ProductHighlight';
import RelatedPosts from '../../components/blog/RelatedPosts';
import ShareButtons from '../../components/blog/ShareButtons';
import TableOfContents from '../../components/blog/TableOfContents';
import NewsletterSignup from '../../components/blog/NewsletterSignup';
import ArticleSchema from '../../components/blog/ArticleSchema';
import ShopTheLook from '../../components/blog/ShopTheLook';

const GOLD_ACCENT = '#FFD700';

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = useMemo(() => {
    return BLOG_POSTS.find((p) => p.slug === slug);
  }, [slug]);

  const category = useMemo(() => {
    return post ? getCategoryBySlug(post.category_slug) : null;
  }, [post]);

  useEffect(() => {
    if (!post) {
      navigate('/blogs/categories/design-trends', { replace: true });
    }
  }, [post, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post || !post.content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const fullUrl = `https://calycopaints.com/blogs/${post.slug}`;
  const hasTOC = post.content.sections && post.content.sections.length > 0;

  // Generate breadcrumbs
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Blog', url: '/blogs/categories/design-trends' },
    { label: category?.name || 'Article', url: `/blogs/categories/${post.category_slug}` },
    { label: post.title, url: null }
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{post.meta_title || post.title}</title>
        <meta name="description" content={post.meta_description || post.summary} />
        {post.seo?.keywords && (
          <meta name="keywords" content={post.seo.keywords.join(', ')} />
        )}
        <link rel="canonical" href={fullUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_description || post.summary} />
        <meta property="og:image" content={post.featured_image?.src || post.image_path} />
        <meta property="og:url" content={fullUrl} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.meta_title || post.title} />
        <meta name="twitter:description" content={post.meta_description || post.summary} />
        <meta name="twitter:image" content={post.featured_image?.src || post.image_path} />
      </Helmet>

      {/* JSON-LD Schema */}
      <ArticleSchema post={post} fullUrl={fullUrl} category={category} />

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {crumb.url ? (
                  <Link to={crumb.url} className="hover:text-yellow-600 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-medium">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="text-gray-400">/</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="pt-12 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Category Badge */}
          {category && (
            <Link
              to={`/blogs/categories/${post.category_slug}`}
              className="inline-block px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase mb-6"
              style={{ backgroundColor: GOLD_ACCENT, color: '#1a1a1a' }}
            >
              {category.name}
            </Link>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
            <span>{post.author || 'Calyco Editorial Team'}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <time dateTime={post.publish_date}>
              {new Date(post.publish_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{post.read_time}</span>
          </div>

          {/* Share Buttons */}
          <ShareButtons url={fullUrl} title={post.title} description={post.summary} />
        </div>

        {/* Hero Image */}
        <div className="max-w-6xl mx-auto px-6 my-12">
          <img
            src={post.featured_image?.src || post.image_path}
            alt={post.featured_image?.alt || post.title}
            className="w-full rounded-2xl shadow-lg"
          />
        </div>

        {/* Article Body with Sidebar */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Introduction */}
              {post.content.introduction && (
                <div className="text-lg leading-relaxed text-gray-700 mb-12">
                  <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-gray-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                    {post.content.introduction}
                  </p>
                </div>
              )}

              {/* Content Sections */}
              {post.content.sections && post.content.sections.map((section, index) => (
                <section key={index} id={section.id} className="mb-12 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {section.heading}
                  </h2>

                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />

                  {/* Section Images */}
                  {section.images && section.images.map((image, imgIndex) => (
                    <figure key={imgIndex} className="my-8">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full rounded-xl shadow-md"
                        loading="lazy"
                      />
                      {image.caption && (
                        <figcaption className="mt-3 text-sm text-gray-600 italic text-center">
                          {image.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}

                  {/* Inline Product Highlights */}
                  {section.products && section.products.length > 0 && (
                    <ProductHighlight
                      productName="Calyco Multi-Surface Stain & Sealer"
                      colorHex="#E8E4D9"
                      productUrl="/products/stain-sealer"
                      price="₹899"
                      size="1L"
                      context="Perfect primer for the techniques discussed in this section"
                    />
                  )}
                </section>
              ))}

              {/* Conclusion */}
              {post.content.conclusion && (
                <div className="mt-12 p-8 bg-gray-50 rounded-2xl border-l-4 border-yellow-400">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Conclusion</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {post.content.conclusion}
                  </p>
                </div>
              )}

              {/* Newsletter Signup */}
              <NewsletterSignup variant="inline" />

              {/* Tags */}
              {post.seo?.keywords && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Related Topics:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.seo.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            {hasTOC && (
              <aside className="lg:col-span-4">
                <div className="sticky top-24">
                  <TableOfContents
                    sections={post.content.sections.map((s) => ({
                      id: s.id,
                      title: s.heading
                    }))}
                  />
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>

      {/* Shop the Look */}
      {post.featured_products && post.featured_products.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <ShopTheLook productIds={post.featured_products} />
        </div>
      )}

      {/* Related Posts */}
      <RelatedPosts
        currentPostId={post.id}
        currentCategorySlug={post.category_slug}
        limit={3}
      />

      {/* Newsletter Footer */}
      <NewsletterSignup variant="default" />
    </div>
  );
};

export default BlogPostPage;
