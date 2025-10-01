import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';

const PressCard = ({ publication, title, excerpt, href, date }) => {
  return (
    <motion.div
      className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="space-y-4">
        {/* Publication & Date */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#5E3A98] uppercase tracking-wide">
            {publication}
          </span>
          {date && (
            <div className="flex items-center gap-1 text-xs text-[#493657]/60">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[#493657] leading-tight group-hover:text-[#5E3A98] transition-colors duration-300">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-[#493657]/70 text-sm leading-relaxed line-clamp-3">
          {excerpt}
        </p>

        {/* Read Link */}
        <motion.a
          href={href}
          className="inline-flex items-center gap-2 text-[#F0C85A] font-medium text-sm group/link hover:text-[#e3b842] transition-colors duration-300"
          whileHover={{ x: 2 }}
        >
          <span className="border-b border-[#F0C85A] group-hover/link:border-[#e3b842] transition-colors duration-300">
            Read Article
          </span>
          <ExternalLink className="w-3 h-3" />
        </motion.a>
      </div>
    </motion.div>
  );
};

const PressMentions = ({ items = [] }) => {
  const defaultItems = [
    {
      publication: "Architecture Digest",
      title: "The Future of Sustainable Paint: How Calyco is Revolutionizing the Industry",
      excerpt: "A deep dive into how Calyco's EcoMax Technology is setting new standards for environmentally conscious paint solutions.",
      href: "#",
      date: "March 2024"
    },
    {
      publication: "Green Building Weekly",
      title: "Zero-VOC Paints: The New Standard for Healthy Living Spaces",
      excerpt: "Exploring the benefits of zero-VOC formulations and how Calyco is leading the charge in sustainable paint innovation.",
      href: "#",
      date: "February 2024"
    },
    {
      publication: "Interior Design Today",
      title: "Young Entrepreneur's Vision: Transforming Homes with Sustainable Paint",
      excerpt: "Meet the 15-year-old founder who's changing the paint industry with innovative, eco-friendly solutions.",
      href: "#",
      date: "January 2024"
    }
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-[#493657] mb-6 tracking-wide">
            Press & Mentions
          </h2>
          <p className="text-lg text-[#493657]/70 max-w-2xl mx-auto leading-relaxed">
            See what industry experts and leading publications are saying about Calyco's innovative approach to sustainable paint solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <PressCard {...item} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 text-[#493657] font-medium hover:text-[#5E3A98] transition-colors duration-300"
            whileHover={{ x: 2 }}
          >
            <span className="border-b border-[#493657] hover:border-[#5E3A98] transition-colors duration-300">
              View All Press Coverage
            </span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default PressMentions;
