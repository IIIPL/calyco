import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, Clock, Share2, Heart, Link2, Check, Star, Send, User, ChevronUp } from 'lucide-react';
// Assuming you implement the file renaming to 'blogData.js' as suggested previously
import blogPosts from '../../data/blogData'; // Adjust this import if you renamed the file

// Custom Component for Heading Animation
const AnimatedHeading = ({ children, id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  return (
    <motion.h2
      ref={ref}
      id={id}
      className="text-4xl font-extrabold mt-12 mb-6 text-gray-900 border-l-4 border-blue-600 pl-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.span
        initial={{ background: 'linear-gradient(90deg, #3b82f6, #3b82f6)', backgroundSize: '0% 100%' }}
        animate={isInView ? { backgroundSize: '100% 100%' } : { backgroundSize: '0% 100%' }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          backgroundRepeat: 'no-repeat',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {children}
      </motion.span>
    </motion.h2>
  );
};

// Custom Cursor Follower
const CursorFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed z-[999] pointer-events-none w-10 h-10 rounded-full bg-blue-500/10 backdrop-blur-sm opacity-0 md:opacity-100"
      animate={{
        x: mousePosition.x - 20,
        y: mousePosition.y - 20,
        scale: 1,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      style={{ mixBlendMode: 'multiply' }}
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
  const post = blogPosts.find(p => p.slug === slug);
  
  // Review System State
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  // Scroll Progress and Parallax Setup
  const { scrollYProgress } = useScroll();
  const { scrollY } = useScroll();
  const headerScale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const headerBlur = useTransform(scrollY, [0, 500], [0, 5]);

  // Load reviews from localStorage and auto-scroll
  useEffect(() => {
    if (post) {
      const storedReviews = localStorage.getItem(`blog-reviews-${post.slug}`);
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
    }
    window.scrollTo(0, 0);
  }, [post]);

  // Intersection Observer for Table of Contents
  useEffect(() => {
    if (!post || !contentRef.current) return;

    const headings = contentRef.current.querySelectorAll('h2');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-150px 0px -60% 0px' } // Highlights section when it's near the top
    );

    headings.forEach((heading, index) => {
      const id = `section-${index}`;
      heading.id = id;
      observer.observe(heading);
    });

    return () => observer.disconnect();
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Article Not Found</h1>
      </div>
    );
  }

  // Helper to extract TOC, mapping to AnimatedHeading component
  const getTOC = (contentHtml) => {
    const content = document.createElement('div');
    content.innerHTML = contentHtml;
    const headings = content.querySelectorAll('h2');
    return Array.from(headings).map((heading, index) => ({
      id: `section-${index}`,
      text: heading.textContent,
      safeHtml: heading.outerHTML.replace('h2', 'div'), // Placeholder
    }));
  };

  const tableOfContents = getTOC(post.content);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = post.title;

    const shareUrls = {
      // ... (share logic remains the same)
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
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

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
    setNewReview({ name: '', rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  // Function to inject AnimatedHeading component back into content
  const renderContentWithAnimations = () => {
    let contentHtml = post.content;
    tableOfContents.forEach((item, index) => {
      // Replace the standard <h2> tag with a custom placeholder
      contentHtml = contentHtml.replace(
        item.safeHtml.replace('div', 'h2'), 
        `<div data-animated-heading-id="${item.id}" data-text="${item.text}"></div>`
      );
    });
    return contentHtml;
  };
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-white relative"
      >
        <CursorFollower />

        {/* Reading Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Hero Header with Scroll Parallax */}
        <div className="relative h-[80vh] overflow-hidden">
          <motion.div
            style={{ scale: headerScale, filter: useTransform(headerBlur, b => `blur(${b}px)`) }}
            className="absolute inset-0"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
          </motion.div>

          <motion.div
            style={{ opacity: headerOpacity }}
            className="absolute inset-0 flex items-end"
          >
            <div className="max-w-6xl mx-auto px-6 pb-20 text-white w-full">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <Link
                  to="/blogs"
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 group transition-all"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Articles</span>
                </Link>

                <div className="mb-4">
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                <motion.h1 
                    className="text-6xl md:text-8xl font-black mb-8 leading-tight drop-shadow-lg"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 100 }}
                >
                    {post.title}
                </motion.h1>

                <div className="flex flex-wrap items-center gap-8 text-white/90 font-medium">
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-yellow-400" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </motion.div>
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-yellow-400" />
                      <span>{post.readTime}</span>
                    </div>
                  </motion.div>
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }}>
                    <span className="font-bold">By {post.author}</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex gap-16">
            
            {/* Sticky Sidebar: TOC and Social */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 space-y-10">
                {/* Table of Contents */}
                <div>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4 border-b pb-2">
                    In This Article
                  </h3>
                  <nav className="space-y-3">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-sm transition-all duration-300 transform ${
                          activeSection === item.id
                            ? 'text-blue-600 font-bold border-l-4 border-blue-600 pl-3 -ml-3'
                            : 'text-gray-600 hover:text-gray-900 border-l-4 border-transparent pl-3'
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Social Share (Sticky) */}
                <div className="p-4 bg-gray-50 rounded-xl shadow-inner">
                    <h4 className="text-sm font-black text-gray-700 uppercase mb-3">Share This</h4>
                    <div className="flex gap-3">
                        {['facebook', 'twitter', 'linkedin'].map(platform => (
                            <motion.button
                                key={platform}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleShare(platform)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md ${
                                    platform === 'facebook' ? 'bg-blue-700' : 
                                    platform === 'twitter' ? 'bg-sky-500' : 
                                    'bg-blue-800'
                                }`}
                            >
                                {/* Placeholder icons - replace with actual social icons if available */}
                                {platform.slice(0, 1).toUpperCase()}
                            </motion.button>
                        ))}
                         <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleShare('copy')}
                            className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 shadow-md flex items-center justify-center"
                          >
                            {copied ? <Check className="w-5 h-5 text-green-600" /> : <Link2 className="w-5 h-5" />}
                          </motion.button>
                    </div>
                </div>

              </div>
            </aside>

            {/* Article Content */}
            <article className="flex-1 max-w-4xl">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="prose prose-lg prose-gray max-w-none text-xl leading-relaxed"
                ref={contentRef}
              >
                {/* Dynamically render content */}
                {post.content.split('<h2>').map((segment, index) => {
                  if (index === 0) {
                    // This is the content before the first H2
                    return <div key={index} dangerouslySetInnerHTML={{ __html: segment }} />;
                  } else {
                    // Extract the H2 text and the remaining content
                    const parts = segment.split('</h2>');
                    const headingText = parts[0];
                    const remainingContent = parts.slice(1).join('</h2>');
                    const headingId = `section-${index - 1}`;
                    
                    return (
                      <React.Fragment key={index}>
                        <AnimatedHeading id={headingId}>{headingText}</AnimatedHeading>
                        <div dangerouslySetInnerHTML={{ __html: remainingContent }} />
                      </React.Fragment>
                    );
                  }
                })}
              </motion.div>

              {/* Author Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.2 }}
                className="mt-16 p-8 bg-blue-50 border-l-4 border-blue-600 rounded-2xl shadow-lg flex items-center gap-6"
              >
                <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-10 h-10 text-white" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-1 text-gray-900">{post.author}</h3>
                    <p className="text-blue-700 font-semibold mb-2">Calyco Expert in {post.category}</p>
                    <p className="text-gray-700">
                        Specializing in {post.category.toLowerCase()} solutions and advanced coating technologies, {post.author.split(' ')[0]} provides actionable, researched advice.
                    </p>
                </div>
              </motion.div>
              
              {/* Reviews Section (Keeping it animated and interactive) */}
              {/* ... (Reviews section remains similar to your original implementation, ensuring framer-motion is used) ... */}
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
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Write a Review
                    </motion.button>
                  </div>

                  {/* Review Form */}
                  <AnimatePresence>
                    {showReviewForm && (
                      <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmitReview}
                        className="mb-8 p-6 bg-gray-50 rounded-xl overflow-hidden"
                      >
                        <h4 className="text-xl font-bold mb-4">Share Your Thoughts</h4>
                        
                        <div className="space-y-4">
                          {/* Form fields here */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
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
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating *</label>
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
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Review *</label>
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
                            <motion.button
                              type="submit"
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                              <Send className="w-4 h-4" />
                              Submit Review
                            </motion.button>
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
                  </AnimatePresence>

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
                          transition={{ duration: 0.5 }}
                          className="p-6 bg-white border border-gray-200 rounded-xl shadow-md"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-bold text-lg">{review.name}</h4>
                              <div className="flex items-center gap-1 mt-1">
                                {/* Stars here */}
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


                {/* Related Articles (Keeping it animated) */}
                {relatedPosts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-20"
                  >
                    <h2 className="text-4xl font-extrabold mb-8 text-gray-900">More Insights</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {relatedPosts.map((relatedPost, index) => (
                        <motion.div
                          key={relatedPost.id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -8, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                          className="rounded-xl overflow-hidden shadow-lg transition-all duration-300"
                        >
                          <Link
                            to={`/blogs/${relatedPost.slug}`}
                            className="block group bg-white"
                          >
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={relatedPost.image}
                                alt={relatedPost.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {relatedPost.title}
                                </h3>
                                <p className="text-sm text-gray-600">{relatedPost.readTime} | {relatedPost.category}</p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
            </article>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed right-6 bottom-6 flex flex-col gap-3 z-40">
          {/* Scroll to Top */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-14 h-14 rounded-full bg-gray-800 text-white shadow-xl flex items-center justify-center transition-colors hover:bg-gray-700"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
          
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogPost;