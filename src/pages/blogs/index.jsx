import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import blogPosts from '../../data/blogData';
import SEO from '../../components/SEO'; // Assuming you have this component

const BlogCard = ({ post }) => {
  return (
    <Link
      to={`/blogs/${post.slug}`}
      className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">
          {post.category}
        </span>
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2 mb-3">
          {post.title}
        </h3>

        <p className="text-gray-600 line-clamp-3 leading-relaxed text-sm mb-4 flex-grow">
          {post.summary}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5" aria-label="Date Published">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1.5" aria-label="Reading Time">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('New');
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  // Extract categories dynamically and memoize the result
  const categories = useMemo(() => {
    return ['All', ...new Set(blogPosts.map(post => post.category))].sort();
  }, []);

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'New') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    // Add logic for 'Popular' if needed

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  }


  return (
    <>
      <SEO
        title="Calyco Expert Guides & Blog | Interior & Exterior Coating Solutions"
        description="Get inspiring ideas for interior home design, explore latest home decor ideas & trends, waterproofing solutions, and technical coating advice from Calyco experts."
        canonicalUrl={window.location.origin + "/blogs"}
      />
      
      <div className="min-h-screen bg-white">
        {/* Simple Header/Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-24 pb-12 px-6 border-b border-gray-100"
        >
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-2">
              Calyco Blogs
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Get inspiring ideas for interior home design, explore latest home decor ideas & trends and more.
            </p>
          </div>
        </motion.section>

        {/* Main Content: Filters + Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12 flex gap-12">
          
          {/* Left Sidebar Filters */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider mb-4 border-b pb-2">
                Filters
              </h3>

              {/* Search Bar */}
              <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none transition-all"
                  aria-label="Search blog articles"
                />
              </div>

              {/* Category Filter Group */}
              <motion.div
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                initial={false}
                animate={{ height: isCategoryOpen ? 'auto' : '52px' }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex justify-between items-center w-full text-lg font-semibold text-gray-800 pb-2 focus:outline-none"
                  aria-expanded={isCategoryOpen}
                  aria-controls="category-list"
                >
                  Category
                  {isCategoryOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {/* Category Options */}
                <div id="category-list" className="space-y-2 pt-3">
                  {categories.map((category) => (
                    <label 
                        key={category} 
                        className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                        aria-label={`Filter by ${category}`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryClick(category)}
                        className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            </div>
          </aside>

          {/* Main Grid Content */}
          <div className="flex-1 min-w-0">
            
            {/* Top Bar: Sort By */}
            <div className="flex justify-end items-center mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="uppercase font-medium tracking-wider">Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-1.5 border border-gray-300 rounded-lg cursor-pointer appearance-none bg-white"
                  aria-label="Sort articles by"
                >
                  <option value="New">New</option>
                  <option value="Popular">Popular</option>
                </select>
              </div>
            </div>

            {/* Blog Grid */}
            {filteredAndSortedPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-gray-50 rounded-xl"
              >
                <p className="text-xl text-gray-500">No articles found matching your criteria.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                  className="mt-4 text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsPage;