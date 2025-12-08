import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Calendar, Clock, Share2, Heart, Facebook, Twitter, Linkedin, Link2, Check, Star, Send, User } from 'lucide-react';
import blogPosts from '../../data/blogData'; // Corrected import path
import SEO from '../../components/SEO'; // Assuming SEO component handles script injection

// Helper component to generate Article Schema JSON-LD
const ArticleSchema = ({ post, reviews }) => {
    if (!post) return null;

    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length)
        : 0;

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.summary,
        "image": [
            post.image, // Use the post's main image
        ],
        "datePublished": post.date,
        "dateModified": new Date().toISOString().split('T')[0], // Use current date for modified
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Calyco Paints",
            "logo": {
                "@type": "ImageObject",
                "url": window.location.origin + "/Logo.png" // Use your main logo
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": window.location.href
        },
    };

    if (reviews.length > 0) {
        articleSchema.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": averageRating.toFixed(1),
            "reviewCount": reviews.length,
        };
    }

    // Return the JSON-LD script as JSX (SEO component should inject this)
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
    );
};


const BlogPost = () => {
  const { slug } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const contentRef = useRef(null);

  // Review System State
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  const post = blogPosts.find(p => p.slug === slug);

  // Scroll progress for top bar
  const { scrollYProgress } = useScroll();

  // Parallax effect for header image
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 500], [0, 150]);
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Load reviews from localStorage
  useEffect(() => {
    if (post) {
      const storedReviews = localStorage.getItem(`blog-reviews-${post.slug}`);
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
    }
  }, [post]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!post) return;

    // Extract headings for table of contents and set IDs for deep linking
    const content = document.createElement('div');
    content.innerHTML = post.content;
    const headings = content.querySelectorAll('h2');
    
    // Set IDs on the actual rendered H2s for smooth scrolling/TOC
    if (contentRef.current) {
        const renderedHeadings = contentRef.current.querySelectorAll('h2');
        renderedHeadings.forEach((heading, index) => {
            const id = `section-${index}`;
            heading.id = id;
        });
    }


    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    if (contentRef.current) {
      const allHeadings = contentRef.current.querySelectorAll('h2');
      allHeadings.forEach(heading => observer.observe(heading));
    }


    return () => observer.disconnect();
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blogs" className="text-blue-600 hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Extract table of contents
  const getTOC = useCallback(() => {
    const content = document.createElement('div');
    content.innerHTML = post.content;
    const headings = content.querySelectorAll('h2');
    return Array.from(headings).map((heading, index) => ({
      id: `section-${index}`,
      text: heading.textContent
    }));
  }, [post]);

  const tableOfContents = getTOC();

  const handleShare = (platform) => {
    // ... (share logic remains the same)
    const url = window.location.href;
    const text = post.title;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      return;
    }

    const review = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString()
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`blog-reviews-${post.slug}`, JSON.stringify(updatedReviews));

    // Reset form
    setNewReview({ name: '', rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <AnimatePresence mode="wait">
        {/* SEO Metadata and Structured Data */}
        <SEO
            title={`${post.title} | Calyco Paints`}
            description={post.summary}
            canonicalUrl={window.location.href}
            imageUrl={post.image}
        >
            <ArticleSchema post={post} reviews={reviews} />
        </SEO>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-white"
      >
        {/* Reading Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Page Turn Entrance Effect */}
        <motion.div
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d", transformOrigin: "left" }}
        >
          {/* Hero Header with Parallax */}
          <div className="relative h-[70vh] overflow-hidden">
            <motion.div
              style={{ y: headerY }}
              className="absolute inset-0"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </motion.div>

            <motion.div
              style={{ opacity: headerOpacity }}
              className="absolute inset-0 flex items-end"
            >
              <div className="max-w-4xl mx-auto px-6 pb-16 text-white">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <Link
                    to="/blogs"
                    className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 group"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Articles</span>
                  </Link>

                  <div className="mb-4">
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>

                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    {post.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 text-white/90">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{post.readTime}</span>
                    </div>
                    <div>
                      <span className="font-medium">By {post.author}</span>
                    </div>
                    {reviews.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span>{averageRating} ({reviews.length} reviews)</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="relative max-w-7xl mx-auto px-6 py-16">
            <div className="flex gap-12">
              {/* Table of Contents - Sticky Sidebar */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24 space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                      Table of Contents
                    </h3>
                    <nav className="space-y-3">
                      {tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block text-sm transition-colors ${
                            activeSection === item.id
                              ? 'text-blue-600 font-semibold'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </aside>

              {/* Article Content */}
              <article className="flex-1 max-w-3xl">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="prose prose-lg prose-gray max-w-none"
                  ref={contentRef}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  style={{
                    fontSize: '1.125rem',
                    lineHeight: '1.8',
                  }}
                />
              {/* ... (Rest of the component remains the same for the reviews/related posts/author section) */}
            
            
                {/* Author Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-16 p-8 bg-gray-50 rounded-2xl"
                >
                  <h3 className="text-xl font-bold mb-2">About the Author</h3>
                  <p className="text-gray-600">
                    <strong>{post.author}</strong> is a technical expert at Calyco Paints, specializing in {post.category.toLowerCase()} solutions and advanced coating technologies.
                  </p>
                </motion.div>

                {/* Reviews Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-16"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-3xl font-bold">Reader Reviews</h3>
                      {reviews.length > 0 && (
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-5 h-5 ${
                                  star <= Math.round(averageRating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-gray-600">
                            {averageRating} out of 5 ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Write a Review
                    </button>
                  </div>

                  {/* Review Form */}
                  {showReviewForm && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleSubmitReview}
                      className="mb-8 p-6 bg-gray-50 rounded-xl"
                    >
                      <h4 className="text-xl font-bold mb-4">Share Your Thoughts</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              value={newReview.name}
                              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              placeholder="Enter your name"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Rating *
                          </label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                className="focus:outline-none"
                              >
                                <Star
                                  className={`w-8 h-8 cursor-pointer transition-colors ${
                                    star <= newReview.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300 hover:text-yellow-300'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Review *
                          </label>
                          <textarea
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                            placeholder="Share your thoughts about this article..."
                            required
                          />
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                          >
                            <Send className="w-4 h-4" />
                            Submit Review
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowReviewForm(false)}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </motion.form>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {reviews.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <p className="text-gray-600">No reviews yet. Be the first to share your thoughts!</p>
                      </div>
                    ) : (
                      reviews.map((review) => (
                        <motion.div
                          key={review.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-6 bg-white border border-gray-200 rounded-xl"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-bold text-lg">{review.name}</h4>
                              <div className="flex items-center gap-1 mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        </motion.div>
                      ))
                    )}
                  </div>
                </motion.div>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-20"
                  >
                    <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {relatedPosts.map((relatedPost, index) => (
                        <motion.div
                          key={relatedPost.id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -5 }}
                        >
                          <Link
                            to={`/blogs/${relatedPost.slug}`}
                            className="block group"
                          >
                            <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                              <img
                                src={relatedPost.image}
                                alt={relatedPost.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h3>
                            <p className="text-sm text-gray-600">{relatedPost.readTime}</p>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </article>
            </div>
          </div>
        </motion.div>

        {/* Floating Action Buttons */}
        <div className="fixed right-6 bottom-6 flex flex-col gap-3 z-40">
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-700'
            }`}
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>

          {/* Share Button */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center"
            >
              <Share2 className="w-6 h-6" />
            </motion.button>

            {/* Share Menu */}
            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="absolute bottom-full right-0 mb-3 bg-white rounded-2xl shadow-2xl p-3 space-y-2"
                >
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-sky-500" />
                    <span className="text-sm font-medium">Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-blue-700" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="w-5 h-5 text-gray-700" />
                        <span className="text-sm font-medium">Copy Link</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <style jsx>{`
          .prose h2 {
            font-size: 2rem;
            font-weight: 700;
            margin-top: 3rem;
            margin-bottom: 1.5rem;
            color: #111827;
            scroll-margin-top: 6rem;
          }

          .prose p {
            margin-bottom: 1.5rem;
            color: #374151;
          }

          .prose strong {
            color: #111827;
            font-weight: 600;
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogPost;