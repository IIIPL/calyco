import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import postsData from '../../../blog/data/posts.json';

const ProfessionalResources = () => {
    // Helper to strip HTML and truncate text
    const getExcerpt = (html, length = 120) => {
        if (!html) return "";
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        let text = tmp.textContent || tmp.innerText || "";
        // Remove code blocks
        text = text.replace(/```[\s\S]*?```/g, '');
        return text.length > length ? text.substring(0, length) + "..." : text;
    };

    // Select specific professional-focused posts or fallback to latest
    // We try to find these specific practical guides first
    const selectedSlugs = [
        'how-to-estimate-painting-cost-for-a-2bhk-3bhk-in-2026-save-20-on-labor',
        'smart-home-resolutions-2026-switch-from-toxic-paints-to-eco-safe-calyco-finishes',
        'kickstart-2026-with-healthier-low-voc-walls-calyco-s-easy-new-year-paint-upgrade'
    ];

    const professionalPosts = postsData.filter(post => selectedSlugs.includes(post.slug));
    const displayPosts = professionalPosts.length > 0 ? professionalPosts : postsData.slice(0, 3);

    const articles = displayPosts.map(post => ({
        category: post.category || "Professional Guide",
        title: post.title,
        excerpt: getExcerpt(post.content),
        image: post.heroImage,
        link: `/blog/${post.slug}`
    }));

    return (
        <section className="py-32 bg-[#FAFAFA] relative overflow-hidden font-poppins">
            <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-24 relative z-10">

                {/* Header - More Generous Spacing */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[#0F1221]/50 font-medium tracking-[0.15em] uppercase text-xs block mb-5"
                        >
                            PROFESSIONAL RESOURCES
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0F1221] leading-[1.15] tracking-[-0.01em]"
                        >
                            Practical Guides. <span className="text-[#0F1221]/40">Zero Filler.</span>
                        </motion.h2>
                    </div>
                </div>

                {/* Articles Grid - Larger Cards with More Spacing */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
                    {articles.map((article, index) => (
                        <Link
                            to={article.link}
                            key={index}
                            className="block h-full"
                        >
                            <motion.article
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 shadow-sm border border-[#0F1221]/5"
                            >
                                {/* Image Container - Larger Aspect Ratio */}
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                    />
                                </div>

                                <div className="p-10 flex flex-col flex-grow">
                                    <div className="mb-5">
                                        <span className="text-[#0F1221]/40 text-[10px] font-medium tracking-[0.15em] uppercase">
                                            {article.category}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-light text-[#0F1221] mb-5 leading-[1.3] transition-colors duration-300 line-clamp-2">
                                        {article.title}
                                    </h3>

                                    <p className="text-[#0F1221]/60 text-base leading-[1.7] mb-8 flex-grow transition-colors duration-300 line-clamp-3 font-light">
                                        {article.excerpt}
                                    </p>

                                    <div className="flex items-center gap-2 text-[#0F1221] group-hover:text-[#0F1221] font-medium text-sm transition-all duration-300 mt-auto group-hover:gap-3">
                                        Read Article
                                        <ArrowRight className="w-4 h-4 transition-transform" />
                                    </div>
                                </div>
                            </motion.article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProfessionalResources;
