import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FAQ from '../components/FAQ';
import FAQAccordion from '../components/FAQAccordion';
import '../styles/blog-custom.css';
import '../styles/asian-paints-detail.css';
import '../styles/faq-accordion.css';
import '../styles/related-articles.css';
import '../styles/responsive-fixes.css';
import '../styles/social-share.css';

const BlogDetail = ({ post, allPosts = [] }) => {
    const [tocOpen, setTocOpen] = useState(true);
    const [likeStatus, setLikeStatus] = useState(null); // null, 'like', or 'dislike'
    const [formVisible, setFormVisible] = useState(true); // Control form visibility
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        pincode: ''
    });

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Create mailto link with form data
        const subject = encodeURIComponent(`Blog Enquiry: ${post.title}`);
        const body = encodeURIComponent(
            `New enquiry from blog post:\n\n` +
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Mobile: ${formData.mobile}\n` +
            `Pincode: ${formData.pincode}\n\n` +
            `Blog Post: ${post.title}`
        );

        // Open mailto link
        window.location.href = `mailto:support@calycopaints.com?subject=${subject}&body=${body}`;

        // Reset form
        setFormData({
            name: '',
            email: '',
            mobile: '',
            pincode: ''
        });
    };

    if (!post) return <div className="min-h-screen flex items-center justify-center">Loading article...</div>;

    const {
        title = 'Untitled Post',
        content = '',
        heroImage,
        date,
        tags = [],
        category = '',
        faqs: faqItems = []
    } = post;

    // Clean content - remove code fences and parse HTML
    const cleanContent = (rawContent) => {
        if (!rawContent) return '';

        // Remove markdown code fences
        let cleaned = rawContent
            .replace(/```html\n/g, '')
            .replace(/```\n/g, '')
            .replace(/```/g, '')
            .trim();

        return cleaned;
    };

    const processedContent = cleanContent(content);

    // Dynamic Author Logic (Matches BlogIndex)
    const FALLBACK_AUTHORS = [
        "Aditi Rao", "Vikram Singh", "Priya Desai", "Rahul Kapoor",
        "Anjali Mehta", "Suresh Menon", "Kavita Reddy", "Arjun Malhotra"
    ];

    const getAuthor = () => {
        if (post.author && post.author !== "Calyco Expert") return post.author;
        const seed = post.id || (post.slug ? post.slug.length : title.length);
        const index = seed % FALLBACK_AUTHORS.length;
        return FALLBACK_AUTHORS[index];
    };

    // Extract FAQ from content
    const extractFAQ = () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(processedContent, 'text/html');

        // Try to find FAQ section by ID first
        let faqSection = doc.querySelector('#faq, section#faq');

        // If not found by ID, look for H2 with "FAQ" or "FAQs"
        let faqH2 = null;
        if (!faqSection) {
            const h2s = doc.querySelectorAll('h2');
            for (const h2 of h2s) {
                if (h2.textContent.trim().toUpperCase().includes('FAQ') ||
                    h2.textContent.trim().toUpperCase().includes('FREQUENTLY ASKED QUESTIONS')) {
                    faqH2 = h2;
                    break;
                }
            }
        }

        const faqs = [];

        if (faqSection) {
            // Existing logic: Extract from container
            const h3Elements = faqSection.querySelectorAll('h3');
            h3Elements.forEach((h3) => {
                const question = h3.textContent;
                let answer = '';
                let nextElement = h3.nextElementSibling;

                while (nextElement && nextElement.tagName !== 'H3') {
                    answer += nextElement.outerHTML;
                    nextElement = nextElement.nextElementSibling;
                }

                faqs.push({ question, answer });
            });
            faqSection.remove();
        } else if (faqH2) {
            // New logic: Extract from H2 onwards
            let currentElement = faqH2.nextElementSibling;
            let currentQuestion = null;
            let currentAnswer = '';
            const nodesToRemove = [faqH2];

            while (currentElement) {
                // Stop if we hit another major section (H2)
                if (currentElement.tagName === 'H2') {
                    break;
                }

                if (currentElement.tagName === 'H3') {
                    // Save previous question if exists
                    if (currentQuestion) {
                        faqs.push({ question: currentQuestion, answer: currentAnswer });
                    }
                    // Start new question
                    currentQuestion = currentElement.textContent;
                    currentAnswer = '';
                } else {
                    // Accumulate answer content
                    if (currentQuestion) {
                        currentAnswer += currentElement.outerHTML;
                    }
                }

                const next = currentElement.nextElementSibling;
                nodesToRemove.push(currentElement);
                currentElement = next;
            }

            // Push the last extracted question
            if (currentQuestion) {
                faqs.push({ question: currentQuestion, answer: currentAnswer });
            }

            // Remove extracted nodes from content
            nodesToRemove.forEach(node => node.remove());
        }

        return { faqs, contentWithoutFAQ: doc.body.innerHTML };
    };

    const { faqs, contentWithoutFAQ } = extractFAQ();

    // Generate TOC and inject IDs into content
    const processContentForTOC = () => {
        if (!contentWithoutFAQ) return { items: [], processedHtml: '' };

        const parser = new DOMParser();
        const doc = parser.parseFromString(contentWithoutFAQ, 'text/html');
        // Select h2 and h3 to increase number of links in TOC
        const headings = doc.querySelectorAll('h2, h3');

        const items = Array.from(headings).map((h, index) => {
            const id = `section-${index + 1}`;
            h.id = id; // Inject ID into the element
            // Strip leading numbers from the text (e.g. "1. Designing" -> "Designing")
            const cleanText = h.textContent.replace(/^\s*\d+\.\s*/, '').trim();
            return {
                id,
                text: cleanText
            };
        });

        // Add FAQ section to TOC if it exists
        if (faqs && faqs.length > 0) {
            items.push({
                id: 'faq-section',
                text: 'Frequently Asked Questions'
            });
        }

        return {
            items,
            processedHtml: doc.body.innerHTML
        };
    };

    const { items: tocItems, processedHtml: articleBody } = processContentForTOC();

    // SEO Schema
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "datePublished": date ? new Date(date).toISOString() : new Date().toISOString(),
        "dateModified": date ? new Date(date).toISOString() : new Date().toISOString(),
        "image": heroImage ? (heroImage.startsWith('http') ? heroImage : `https://calycopaints.com${heroImage}`) : undefined,
        "author": {
            "@type": "Person",
            "name": getAuthor()
        },
        "publisher": {
            "@type": "Organization",
            "name": "Calyco Paints",
            "logo": {
                "@type": "ImageObject",
                "url": "https://calycopaints.com/Logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://calycopaints.com/blog/${post.slug}`
        }
    };

    return (
        <>
            <Helmet>
                <html lang="en-IN" />
                <title>{title} | Calyco Blogs</title>
                <meta name="description" content={title} />
                <link rel="canonical" href={`https://calycopaints.com/blog/${post.slug}`} />
                <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
            </Helmet>

            <div className="calyco-blog-detail-scope">
                {/* Full Width Hero Image */}
                {heroImage && (
                    <div className="w-full relative bg-gray-50 py-8">
                        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                            <img
                                src={heroImage}
                                alt={title}
                                className="w-full h-auto max-h-[60vh] object-cover rounded-xl shadow-sm"
                            />
                        </div>
                    </div>
                )}

                {/* Main Article Container */}
                <div className="blog-article-container">

                    {/* Left Column: Article Content (66%) */}
                    <article className="blog-left-content">

                        {/* Blog Profile Info */}
                        <div className="blog-profile-info">
                            {/* Trending Section */}
                            <div className="trending-section">
                                <span className="trend-label">TRENDING</span>
                                <div className="trend-tabs">
                                    {tags && tags.slice(0, 3).map((tag, i) => (
                                        <span key={i} className="trend-tag">{tag}</span>
                                    ))}
                                    {category && <span className="trend-tag">{category}</span>}
                                </div>
                            </div>

                            <h1>{title}</h1>
                            <p className="intro-text">
                                Discover expert insights and practical solutions for your home improvement needs.
                            </p>
                        </div>

                        {/* Social Share (Top) */}
                        <div className="blog-social-share compact-share">
                            <div className="share-buttons">
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="share-btn facebook"
                                    aria-label="Share on Facebook"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a
                                    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(heroImage)}&description=${encodeURIComponent(title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="share-btn pinterest"
                                    aria-label="Share on Pinterest"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                                    </svg>
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="share-btn twitter"
                                    aria-label="Share on X"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a
                                    href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('Check out this article: ' + window.location.href)}`}
                                    className="share-btn email"
                                    aria-label="Share via Email"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Table of Contents */}
                        {tocItems.length > 0 && (
                            <div className="toc-container">
                                <div className="toc-header">
                                    <span className="toc-title">IN THIS ARTICLE</span>
                                    <button
                                        className="toc-toggle-btn"
                                        onClick={() => setTocOpen(!tocOpen)}
                                    >
                                        {tocOpen ? 'HIDE' : 'SHOW'}
                                    </button>
                                </div>
                                {tocOpen && (
                                    <div className="toc-list">
                                        {tocItems.map((item, index) => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className={index === tocItems.length - 1 ? 'toc-last-item' : ''}
                                                style={{ display: 'flex', alignItems: 'baseline' }}
                                            >
                                                <span style={{ marginRight: '10px', fontSize: '1.2em', lineHeight: '1' }}>•</span>
                                                <span>{item.text}</span>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Article Body */}
                        <div className="article-body-text" dangerouslySetInnerHTML={{ __html: articleBody }} />

                        {/* Like/Dislike Section */}
                        <div className="blog-like-dislike">
                            <div className="desc">
                                <h4>LIKE THIS ARTICLE?</h4>
                                <p>Give us a thumbs up!</p>
                            </div>
                            <div className="icons-wrap">
                                <button
                                    className={`thumb-btn ${likeStatus === 'like' ? 'active' : ''}`}
                                    onClick={() => setLikeStatus(likeStatus === 'like' ? null : 'like')}
                                    aria-label="Like this article"
                                >
                                    <span className="icon-up" aria-hidden="true">👍</span>
                                </button>
                                <button
                                    className={`thumb-btn ${likeStatus === 'dislike' ? 'active' : ''}`}
                                    onClick={() => setLikeStatus(likeStatus === 'dislike' ? null : 'dislike')}
                                    aria-label="Dislike this article"
                                >
                                    <span className="icon-down" aria-hidden="true">👎</span>
                                </button>
                            </div>
                        </div>

                        {/* Social Share Buttons */}
                        <div className="blog-social-share">
                            <h4>SHARE THIS ARTICLE</h4>
                            <div className="share-buttons">
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="share-btn facebook"
                                    aria-label="Share on Facebook"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    <span>Facebook</span>
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="share-btn twitter"
                                    aria-label="Share on X"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                    <span>X</span>
                                </a>
                                <a
                                    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(heroImage)}&description=${encodeURIComponent(title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="share-btn pinterest"
                                    aria-label="Share on Pinterest"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                                    </svg>
                                    <span>Pinterest</span>
                                </a>
                                <a
                                    href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('Check out this article: ' + window.location.href)}`}
                                    className="share-btn email"
                                    aria-label="Share via Email"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                    </svg>
                                    <span>Mail</span>
                                </a>
                                <a
                                    href={`sms:?&body=${encodeURIComponent(title + ' - ' + window.location.href)}`}
                                    className="share-btn sms"
                                    aria-label="Share via SMS"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
                                    </svg>
                                    <span>SMS</span>
                                </a>
                            </div>
                        </div>

                        {/* Related Articles Section */}
                        {allPosts && allPosts.length > 1 && (() => {
                            // Get related posts based on same category or tags
                            const relatedPosts = allPosts
                                .filter(p => p.slug !== post.slug) // Exclude current post
                                .filter(p =>
                                    p.category === category ||
                                    (tags && p.tags && p.tags.some(tag => tags.includes(tag)))
                                )
                                .slice(0, 2); // Get max 2 related posts

                            if (relatedPosts.length === 0) {
                                // If no related by category/tags, just get latest 3
                                return allPosts
                                    .filter(p => p.slug !== post.slug)
                                    .slice(0, 2);
                            }
                            return relatedPosts;
                        })().length > 0 && (
                                <section className="related-articles">
                                    <h2>Related Articles</h2>
                                    <div className="related-grid">
                                        {(() => {
                                            const relatedPosts = allPosts
                                                .filter(p => p.slug !== post.slug)
                                                .filter(p =>
                                                    p.category === category ||
                                                    (tags && p.tags && p.tags.some(tag => tags.includes(tag)))
                                                )
                                                .slice(0, 2);

                                            const finalPosts = relatedPosts.length > 0
                                                ? relatedPosts
                                                : allPosts.filter(p => p.slug !== post.slug).slice(0, 2);

                                            return finalPosts.map((relatedPost, index) => (
                                                <a
                                                    key={index}
                                                    href={`/blog/${relatedPost.slug}`}
                                                    className="related-card"
                                                >
                                                    <div className="related-image">
                                                        <img
                                                            src={relatedPost.heroImage || 'https://via.placeholder.com/400x250'}
                                                            alt={relatedPost.title}
                                                        />
                                                    </div>
                                                    <div className="related-content">
                                                        <span className="related-category">{relatedPost.category}</span>
                                                        <h3>{relatedPost.title}</h3>
                                                        <p className="related-date">{relatedPost.date}</p>
                                                    </div>
                                                </a>
                                            ));
                                        })()}
                                    </div>
                                </section>
                            )}

                        {/* FAQ Accordion */}
                        {faqs && faqs.length > 0 && (
                            <div id="faq-section">
                                <FAQAccordion faqs={faqs} />
                            </div>
                        )}
                    </article>

                    {/* Right Sidebar (34%) */}
                    <aside className="blog-right-sidebar">

                        {/* Enquire Form */}
                        {formVisible && (
                            <div className="enquire-form-container">
                                <button
                                    className="form-close-btn"
                                    onClick={() => setFormVisible(false)}
                                    aria-label="Close form"
                                >
                                    ✕
                                </button>
                                <h2>Need help with your painting needs?</h2>
                                <p className="form-desc">Fill the form below to book an appointment with an expert.</p>
                                <form className="asian-paints-form" onSubmit={handleFormSubmit}>
                                    <div className="input-group">
                                        <label htmlFor="name" className="sr-only">Name</label>
                                        <input type="text" id="name" name="name" placeholder="Name*" value={formData.name} onChange={handleFormChange} required aria-required="true" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input type="email" id="email" name="email" placeholder="Email*" value={formData.email} onChange={handleFormChange} required aria-required="true" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="mobile" className="sr-only">Mobile Number</label>
                                        <input type="tel" id="mobile" name="mobile" placeholder="Mobile Number*" value={formData.mobile} onChange={handleFormChange} required aria-required="true" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="pincode" className="sr-only">Pincode</label>
                                        <input type="text" id="pincode" name="pincode" placeholder="Pincode*" value={formData.pincode} onChange={handleFormChange} required aria-required="true" />
                                    </div>
                                    <button type="submit" className="submit-btn">ENQUIRE NOW</button>
                                </form>
                            </div>
                        )}

                        {/* Popular This Week Widget */}
                        <div className="popular-section">
                            <h4>POPULAR THIS WEEK</h4>
                            <div className="popular-card">
                                <img src="https://via.placeholder.com/90" alt="Thumbnail" />
                                <div className="pop-text">
                                    <span className="tag">Decor</span>
                                    <p>Wall Crack Repair Guide</p>
                                </div>
                            </div>
                            <div className="popular-card">
                                <img src="https://via.placeholder.com/90" alt="Thumbnail" />
                                <div className="pop-text">
                                    <span className="tag">Waterproofing</span>
                                    <p>Roof Leakage Solutions</p>
                                </div>
                            </div>
                        </div>

                    </aside>

                </div>
            </div>
        </>
    );
};

export default BlogDetail;
