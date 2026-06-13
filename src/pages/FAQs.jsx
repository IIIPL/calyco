import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';
import { masterFAQs, FAQ_CATEGORIES } from '../data/faqData';
import { BRAND_NAME } from '../data/positioning';
import contactData from '../data/admin/contact.json';

// ─── Single accordion item ─────────────────────────────────────────────────────
const FAQItem = ({ faq, isOpen, onToggle, highlight }) => {
  const highlightText = (text, query) => {
    if (!query || query.length < 2) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <mark key={i} className="bg-[#F0C85A]/40 rounded px-0.5">{part}</mark>
        : part
    );
  };

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${isOpen ? 'border-[#493657]/25 shadow-sm' : 'border-[#0F1221]/8 hover:border-[#0F1221]/15'}`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className={`font-semibold text-sm sm:text-base leading-snug ${isOpen ? 'text-[#493657]' : 'text-[#0F1221]'}`}>
          {highlightText(faq.q, highlight)}
        </span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#493657]' : 'text-[#0F1221]/35'}`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-sm text-[#0F1221]/65 font-light leading-[1.8] border-t border-[#0F1221]/6 pt-4">
          {highlightText(faq.a, highlight)}
        </div>
      )}
    </div>
  );
};

// ─── Main FAQ page ─────────────────────────────────────────────────────────────
const FAQsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState(null);

  const filtered = useMemo(() => {
    let items = activeCategory === 'all'
      ? masterFAQs
      : masterFAQs.filter((f) => f.category === activeCategory);

    if (searchQuery.trim().length >= 2) {
      const q = searchQuery.toLowerCase();
      items = items.filter((f) =>
        f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeCategory, searchQuery]);

  const handleToggle = (id) => setOpenId(openId === id ? null : id);

  const waLink = `${contactData.contact.whatsapp.link}?text=${encodeURIComponent('Hi Calyco — I have a question about your painting service. Can you help?')}`;

  return (
    <main className="min-h-screen bg-[#FBF9F6]">
      <SEO
        title="FAQ — Painting Services, Pricing, Process | Calyco 5-Star Painting"
        description="Answers to all your questions about Calyco painting services — cost per sq ft, what's included, warranty, GST, payment, timeline, waterproofing and more."
        url="https://calycopaints.com/faq"
      />

      {/* Hero */}
      <section className="bg-[#0F1221] px-5 sm:px-8 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F0C85A]/70 mb-3">{BRAND_NAME}</p>
          <h1 className="text-3xl sm:text-4xl font-light text-white tracking-[-0.01em] mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-white/45 font-light max-w-xl mx-auto leading-[1.75]">
            Pricing, process, warranty and booking.
          </p>

          {/* Search bar */}
          <div className="relative mt-7 max-w-xl mx-auto">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setOpenId(null); }}
              placeholder="Search questions — try 'putty', 'warranty', 'cost'…"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#F0C85A] focus:bg-white/15 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-12">

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 mb-8">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => { setActiveCategory(cat.id); setOpenId(null); }}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#0F1221] text-white shadow-sm'
                  : 'border border-[#0F1221]/12 text-[#0F1221]/55 hover:border-[#0F1221]/25 hover:text-[#0F1221]'
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && filtered.length > 0 && (
                <span className="ml-1.5 text-[11px] opacity-60">({filtered.length})</span>
              )}
            </button>
          ))}
        </div>

        {/* Results count / search feedback */}
        {searchQuery.trim().length >= 2 && (
          <div className="mb-5 text-sm text-[#0F1221]/50 font-light">
            {filtered.length === 0
              ? `No results for "${searchQuery}" — try a different word or browse by category.`
              : `${filtered.length} result${filtered.length > 1 ? 's' : ''} for "${searchQuery}"`}
          </div>
        )}

        {/* FAQ list — grouped by category when showing all */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#0F1221]/15 bg-white p-10 text-center">
            <p className="text-[#0F1221]/40 text-sm font-light mb-4">No matching questions found.</p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-5 py-2.5 text-sm font-bold hover:bg-[#1fb355] transition-colors whitespace-nowrap"
            >
              Ask on WhatsApp →
            </a>
          </div>
        ) : activeCategory === 'all' && !searchQuery ? (
          // Grouped view
          FAQ_CATEGORIES.slice(1).map((cat) => {
            const catFAQs = masterFAQs.filter((f) => f.category === cat.id);
            if (catFAQs.length === 0) return null;
            return (
              <div key={cat.id} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-base font-bold text-[#0F1221]">{cat.label}</h2>
                  <div className="flex-1 h-px bg-[#0F1221]/8" />
                  <button
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className="text-xs font-medium text-[#493657] hover:text-[#F0C85A] transition-colors whitespace-nowrap"
                  >
                    See all {catFAQs.length} →
                  </button>
                </div>
                <div className="space-y-2">
                  {catFAQs.slice(0, 4).map((faq) => (
                    <FAQItem
                      key={faq.id}
                      faq={faq}
                      isOpen={openId === faq.id}
                      onToggle={() => handleToggle(faq.id)}
                      highlight=""
                    />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          // Flat list (category filter or search results)
          <div className="space-y-2">
            {filtered.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => handleToggle(faq.id)}
                highlight={searchQuery}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA strip */}
        <div className="mt-12 rounded-2xl bg-[#0F1221] px-6 sm:px-8 py-7 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="font-bold text-white text-base mb-1">Still have a question?</p>
            <p className="text-sm text-white/50 font-light">
              We respond within 2 hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 text-sm font-bold hover:bg-[#1fb355] transition-colors whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              Ask on WhatsApp
            </a>
            <Link
              to="/get-quote"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white px-6 py-3 text-sm font-bold hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              Book Free Site Visit →
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
};

export default FAQsPage;
