import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Calendar, Clock, Share2, Heart, Facebook, Twitter, Linkedin, Link2, Check, Star, Send, User, ChevronRight } from 'lucide-react';
import blogPosts from '../../data/blogData';
import SEO from '../../components/SEO';

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
      post.image,
    ],
    "datePublished": post.date,
    "dateModified": new Date().toISOString().split('T')[0],
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Calyco Paints",
      "logo": {
        "@type": "ImageObject",
        "url": window.location.origin + "/Logo.png"
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



  // Load reviews from localStorage or fall back to post.reviews
  useEffect(() => {
    if (post) {
      const storedReviews = localStorage.getItem(`blog-reviews-${post.slug}`);
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      } else {
        const initialReviews = post.reviews || [];
        setReviews(initialReviews);
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
      <div className="min-h-screen flex items-center justify-center bg-[#F6F3EE]">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4 text-[#0F1221]">Article Not Found</h1>
          <Link to="/blogs" className="text-[#D4AF37] hover:underline font-medium">
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
        className="min-h-screen bg-[#FAFAFA]"
      >
        {/* Reading Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#D4AF37] origin-left z-50"
          style={{ scaleX: scrollYProgress }}
        />

        {/* --- MAGAZINE HEADER LAYOUT --- */}
        <header className="pt-32 pb-12 px-6 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumbs */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6 font-medium">
              <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/blogs" className="hover:text-[#D4AF37] transition-colors">Journal</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#D4AF37]">{post.category}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#0F1221] mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Meta Data */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 font-sans text-sm md:text-base border-y border-gray-100 py-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                  {post.author.charAt(0)}
                </div>
                <span className="font-semibold text-[#0F1221]">{post.author}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* --- FEATURED IMAGE --- */}
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 -mt-8 md:-mt-12 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-2xl"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>


        {/* --- MAIN CONTENT & SIDEBAR --- */}
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-16">

            {/* ARTICLE AREA */}
            <article className="flex-1 max-w-3xl mx-auto lg:mx-0">
              <p className="text-xl md:text-2xl text-gray-600 font-serif leading-relaxed mb-12 border-l-4 border-[#D4AF37] pl-6 italic">
                {post.summary}
              </p>

              <div
                className="prose-calyco"
                ref={contentRef}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share & Like Footer */}
              <div className="mt-16 pt-8 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${isLiked ? 'bg-red-50 text-red-500 ring-2 ring-red-100' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="font-semibold">{isLiked ? 'Liked' : 'Like this post'}</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-500 mr-2">Share:</span>
                  <button onClick={() => handleShare('facebook')} className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"><Facebook className="w-5 h-5" /></button>
                  <button onClick={() => handleShare('twitter')} className="p-2 bg-sky-50 text-sky-500 rounded-full hover:bg-sky-100 transition-colors"><Twitter className="w-5 h-5" /></button>
                  <button onClick={() => handleShare('linkedin')} className="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"><Linkedin className="w-5 h-5" /></button>
                  <button onClick={() => handleShare('copy')} className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                    {copied ? <Check className="w-5 h-5 text-green-600" /> : <Link2 className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Author Box */}
              <div className="mt-16 bg-white border border-gray-100 rounded-xl p-8 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-2xl font-serif text-gray-500">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F1221] mb-2">About {post.author}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Expert technical writer and color consultant at Calyco Paints. Dedicated to helping homeowners create beautiful, durable spaces through science-backed advice.
                  </p>
                  <Link to="/blogs" className="text-[#D4AF37] font-semibold hover:underline">View all articles</Link>
                </div>
              </div>
            </article>


            {/* STICKY SIDEBAR */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-32">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">
                    Table of Contents
                  </h3>
                  <nav className="space-y-1 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-100" />
                    {tableOfContents.map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`relative block pl-6 py-2 text-sm transition-all duration-300 border-l-2 -ml-[1px] ${isActive
                            ? 'border-[#D4AF37] text-[#D4AF37] font-semibold translate-x-1'
                            : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                            }`}
                        >
                          {item.text}
                        </a>
                      );
                    })}
                  </nav>
                </div>

                {/* Related Posts Sidebar Widget */}
                <div className="bg-[#FBF9F6] rounded-xl p-6">
                  <h3 className="text-lg font-serif font-bold text-[#0F1221] mb-4">You might also like</h3>
                  <div className="space-y-6">
                    {relatedPosts.slice(0, 2).map(p => (
                      <Link key={p.id} to={`/blogs/${p.slug}`} className="block group">
                        <div className="h-24 rounded-lg overflow-hidden mb-3">
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm leading-tight group-hover:text-[#D4AF37] transition-colors">
                          {p.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* --- REVIEW SECTION --- */}
        <div className="bg-white py-24 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-[#0F1221] mb-4">Reader Discussions</h2>
              <p className="text-gray-500">Join the conversation and share your thoughts.</p>
            </div>

            <div className="bg-[#FBF9F6] rounded-2xl p-8 mb-12">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-[#0F1221]">{averageRating}</span>
                  <div>
                    <div className="flex text-yellow-500 mb-1">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`w-4 h-4 ${star <= Math.round(averageRating) ? 'fill-current' : 'text-gray-300'}`} />)}
                    </div>
                    <span className="text-sm text-gray-500">{reviews.length} Verified Reviews</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-8 py-3 bg-[#0F1221] text-white rounded-lg font-semibold hover:bg-black transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Write a Review
                </button>
              </div>

              <AnimatePresence>
                {showReviewForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleSubmitReview}
                    className="border-t border-gray-200 pt-8"
                  >
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                        <input type="text" required value={newReview.name} onChange={e => setNewReview({ ...newReview, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
                        <div className="flex gap-2 bg-white px-4 py-3 rounded-lg border border-gray-300">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button key={star} type="button" onClick={() => setNewReview({ ...newReview, rating: star })}>
                              <Star className={`w-6 h-6 transition-colors ${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-200'}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Your Review</label>
                      <textarea required rows="4" value={newReview.comment} onChange={e => setNewReview({ ...newReview, comment: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none" placeholder="What did you think of this article?"></textarea>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button type="button" onClick={() => setShowReviewForm(false)} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Cancel</button>
                      <button type="submit" className="px-6 py-2 bg-[#D4AF37] text-white rounded-lg font-bold hover:bg-[#c4a02e] transition-colors">Submit Review</button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-6">
              {reviews.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to share your opinion!</p>
              ) : (
                reviews.map(review => (
                  <div key={review.id} className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-[#0F1221]">{review.name}</h4>
                        <div className="flex text-yellow-400 text-sm mt-1">
                          {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
};

export default BlogPost;