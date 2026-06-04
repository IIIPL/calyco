import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Star, ArrowRight, LayoutGrid, List,
  ChevronLeft, ChevronRight, Calculator, MessageCircle,
  SlidersHorizontal,
} from 'lucide-react';
import { CategoryIcon } from '../components/CalycoIcons';
import SEO from '../components/SEO';
import { servicePricing } from '../data/servicePricing';
import { SERVICE_CATEGORIES, SCENE_IMAGES, RATINGS } from '../data/serviceCategories';

const PER_PAGE = 12;

const SORT_OPTIONS = [
  { value: 'popular',    label: 'Most Popular' },
  { value: 'price-asc',  label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name-az',    label: 'Name: A → Z' },
  { value: 'rating',     label: 'Top Rated' },
];

const getCat = (slug) => SERVICE_CATEGORIES.find((c) => c.slugs.includes(slug));

/* ════════════════════════════════════════════
   GRID CARD — mobile-first card sizes
════════════════════════════════════════════ */
const GridCard = ({ service }) => {
  const cat  = getCat(service.slug);
  const img  = SCENE_IMAGES[service.slug];
  const r    = RATINGS[service.slug] || { r: 4.8, n: '1k+' };
  const free = service.baseMin === 0;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.18, ease: 'easeOut' }}>
      <Link
        to={`/services/${service.slug}`}
        className="group block bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">

        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '3/2' }}>
          {img
            ? <img src={img} alt={service.name}
                className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
                loading="eager" />
            : <div className="w-full h-full flex items-center justify-center text-3xl sm:text-5xl"
                style={{ background: cat?.gradient }}>
                <CategoryIcon categoryId={cat?.id} className="w-4 h-4 text-white" />
              </div>
          }
          {/* Category emoji badge */}
          <div
            className="absolute top-2 left-2 sm:top-3 sm:left-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm sm:text-base shadow-md"
            style={{ background: cat?.gradient, border: '2px solid rgba(255,255,255,0.3)' }}>
            <CategoryIcon categoryId={cat?.id} className="w-4 h-4 text-white" />
          </div>
          {free && (
            <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#16a34a] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full shadow">
              Free
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block" />
        </div>

        {/* Text */}
        <div className="p-2.5 sm:p-4">
          <h3 className="font-bold text-[#0F1221] text-[12px] sm:text-sm leading-snug mb-1 line-clamp-2 sm:line-clamp-1">
            {service.name}
          </h3>
          {/* Description — hidden on mobile to save space */}
          <p className="hidden sm:block text-[12px] text-gray-400 line-clamp-2 leading-snug mb-3">
            {service.description}
          </p>
          <div className="flex items-center justify-between mt-1.5 sm:mt-0">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#F0C85A] fill-[#F0C85A]" />
              <span className="text-[10px] sm:text-xs font-semibold text-gray-600">{r.r}</span>
              <span className="hidden sm:inline text-[10px] sm:text-[11px] text-gray-400">({r.n})</span>
            </div>
            <span className="font-black text-[11px] sm:text-[13px]" style={{ color: cat?.accent || '#493657' }}>
              {free ? 'Free' : `₹${service.baseMin}/${service.unit}`}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ════════════════════════════════════════════
   LIST ROW — mobile-first
════════════════════════════════════════════ */
const ListRow = ({ service }) => {
  const cat  = getCat(service.slug);
  const r    = RATINGS[service.slug] || { r: 4.8, n: '1k+' };
  const free = service.baseMin === 0;

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-5 bg-white rounded-xl border border-gray-100 hover:border-[#493657]/25 hover:shadow-md transition-all duration-200">
      <div
        className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-2xl flex-shrink-0 shadow-sm"
        style={{ background: cat?.gradient }}>
        <CategoryIcon categoryId={cat?.id} className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[#0F1221] text-[13px] sm:text-[15px] leading-tight">{service.name}</p>
        <p className="text-[11px] sm:text-[13px] text-gray-400 line-clamp-1 mt-0.5 hidden sm:block">{service.description}</p>
        <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
          <Star className="w-2.5 h-2.5 text-[#F0C85A] fill-[#F0C85A]" />
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500">{r.r}</span>
          <span className="text-[9px] sm:text-[11px] text-gray-400">({r.n})</span>
          <span className="hidden sm:inline text-gray-300 mx-1">·</span>
          <span className="hidden sm:inline text-[11px] text-gray-400">{cat?.label}</span>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-wider hidden sm:block">Starting</p>
        <p className="font-black text-[12px] sm:text-[15px]" style={{ color: cat?.accent || '#493657' }}>
          {free ? 'Free' : `₹${service.baseMin}/${service.unit}`}
        </p>
      </div>
      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300 group-hover:text-[#493657] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
    </Link>
  );
};

/* ════════════════════════════════════════════
   PAGINATION — larger touch targets on mobile
════════════════════════════════════════════ */
const Pagination = ({ page, total, perPage, onChange }) => {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;

  /* On mobile show fewer page numbers */
  const getPages = (isMobile = false) => {
    if (isMobile) {
      if (pages <= 5) return Array.from({ length: pages }, (_, i) => i + 1);
      if (page <= 3)  return [1, 2, 3, '…', pages];
      if (page >= pages - 2) return [1, '…', pages - 2, pages - 1, pages];
      return [1, '…', page, '…', pages];
    }
    if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
    if (page <= 4)  return [1, 2, 3, 4, 5, '…', pages];
    if (page >= pages - 3) return [1, '…', pages-4, pages-3, pages-2, pages-1, pages];
    return [1, '…', page-1, page, page+1, '…', pages];
  };

  const BtnRow = ({ mobileMode }) => (
    <div className="flex items-center gap-1 sm:gap-1.5">
      <button onClick={() => onChange(page - 1)} disabled={page === 1}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border border-gray-200 text-gray-400 hover:border-[#493657] hover:text-[#493657] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
        <ChevronLeft className="w-4 h-4" />
      </button>
      {getPages(mobileMode).map((p, i) =>
        p === '…' ? (
          <span key={`e${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">…</span>
        ) : (
          <button key={p} onClick={() => onChange(p)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-[13px] sm:text-sm font-semibold transition-all"
            style={p === page
              ? { background: 'linear-gradient(145deg,#2E1A3E,#5c3e79)', color: '#fff', boxShadow: '0 4px 12px rgba(46,26,62,0.35)' }
              : { border: '1px solid #e5e7eb', color: '#6b7280' }}>
            {p}
          </button>
        )
      )}
      <button onClick={() => onChange(page + 1)} disabled={page === pages}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border border-gray-200 text-gray-400 hover:border-[#493657] hover:text-[#493657] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="pt-6 border-t border-gray-100 mt-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] sm:text-[13px] text-gray-500">
          <span className="font-bold text-[#0F1221]">{Math.min((page-1)*perPage+1, total)}–{Math.min(page*perPage, total)}</span>
          <span className="hidden sm:inline"> of {total} services</span>
        </p>
        {/* Mobile: compact */}
        <div className="sm:hidden"><BtnRow mobileMode /></div>
        {/* Desktop: full */}
        <div className="hidden sm:flex"><BtnRow /></div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════
   SIDEBAR CATEGORY BUTTON
════════════════════════════════════════════ */
const SidebarBtn = ({ cat, active, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 hover:bg-[#F3EEF8]"
    style={active ? { background: cat.gradient, color: '#fff' } : { color: '#374151' }}>
    <div className="flex items-center gap-2.5">
      <span className="text-lg leading-none"><CategoryIcon categoryId={cat.id} className="w-4 h-4 text-white" /></span>
      <span className="text-[13px] font-semibold leading-tight">{cat.label}</span>
    </div>
    <span
      className="text-[11px] font-black px-2 py-0.5 rounded-full flex-shrink-0"
      style={active
        ? { background: `${cat.accent}35`, color: cat.accent }
        : { background: '#F3EEF8', color: '#493657' }}>
      {cat.slugs.length}
    </span>
  </button>
);

/* ════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════ */
export default function AllServicesPage() {
  const [activeCat,    setActiveCat]    = useState('all');
  const [search,       setSearch]       = useState('');
  const [sort,         setSort]         = useState('popular');
  const [view,         setView]         = useState('grid');
  const [page,         setPage]         = useState(1);
  const [mobileSort,   setMobileSort]   = useState(false);

  const filtered = useMemo(() => {
    let list = [...servicePricing];
    if (activeCat !== 'all') {
      const cat = SERVICE_CATEGORIES.find((c) => c.id === activeCat);
      if (cat) list = list.filter((s) => cat.slugs.includes(s.slug));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q) || (s.description || '').toLowerCase().includes(q));
    }
    switch (sort) {
      case 'price-asc':  list.sort((a, b) => a.baseMin - b.baseMin); break;
      case 'price-desc': list.sort((a, b) => b.baseMin - a.baseMin); break;
      case 'name-az':    list.sort((a, b) => a.name.localeCompare(b.name)); break;
      default:           list.sort((a, b) => (RATINGS[b.slug]?.r || 0) - (RATINGS[a.slug]?.r || 0)); break;
    }
    return list;
  }, [activeCat, search, sort]);

  const paginated    = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const activeCatObj = SERVICE_CATEGORIES.find((c) => c.id === activeCat);

  const go       = (id) => { setActiveCat(id); setPage(1); };
  const onSearch = (v)  => { setSearch(v);     setPage(1); };
  const onSort   = (v)  => { setSort(v);       setPage(1); setMobileSort(false); };

  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <SEO
        title="All Painting & Home Services — Calyco"
        description="Browse all professional painting, waterproofing, wood finishing and home care services by Calyco. Filter by category, search & compare prices."
        url="https://calycopaints.com/services/all"
      />

      {/* ══════════════ PAGE HEADER ══════════════ */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-5 sm:py-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[11px] sm:text-[13px] text-gray-400 mb-4 font-medium">
            <Link to="/" className="hover:text-[#493657] transition-colors">Home</Link>
            <span className="text-gray-300">›</span>
            <Link to="/services" className="hover:text-[#493657] transition-colors">Services</Link>
            <span className="text-gray-300">›</span>
            <span className="font-semibold text-[#493657]">All Services</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
            {/* Left — title */}
            <div>
              {/* 5-Star badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#F0C85A]/40 bg-[#F0C85A]/10 px-3 py-1.5 mb-3 sm:mb-4">
                <div className="flex gap-0.5">
                  {[0,1,2,3,4].map((i) => (
                    <span key={i} className="text-[#F0C85A] text-[11px] sm:text-[13px] leading-none">★</span>
                  ))}
                </div>
                <span className="text-[#493657] text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase">Calyco 5-Star Painting</span>
              </div>

              <h1 className="text-[22px] sm:text-[28px] lg:text-4xl font-bold text-[#0F1221] leading-tight tracking-tight">
                All Painting Services
              </h1>
              <p className="text-[12px] sm:text-sm sm:text-base text-gray-500 mt-2 max-w-lg leading-relaxed font-light">
                Verified painters, fixed pricing, 1-year warranty.
              </p>
              <div className="w-10 sm:w-14 h-1 rounded-full bg-[#F0C85A] mt-3" />
            </div>

            {/* Right — stats + CTA */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              {[
                { emoji: '🎨', value: '60+',   label: 'Services' },
                { emoji: '🏠', value: '5000+', label: 'Projects' },
                { emoji: '✅', value: '100%',  label: 'Quality' },
              ].map(({ emoji, value, label }) => (
                <div key={label} className="flex items-center gap-2 bg-[#F3EEF8] rounded-xl px-3 py-2 sm:px-4 sm:py-2.5">
                  <span className="text-base sm:text-xl">{emoji}</span>
                  <div>
                    <p className="text-[13px] sm:text-[15px] font-black text-[#493657] leading-none">{value}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
              <Link
                to="/calculators/service-cost-calculator"
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#493657] text-white px-5 py-3 text-sm font-bold hover:bg-[#F0C85A] hover:text-[#0F1221] transition-all shadow-md">
                <Calculator className="w-4 h-4" /> Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════ BODY ══════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-5 sm:py-8">
        <div className="flex gap-5 lg:gap-8">

          {/* ── Sidebar (desktop only) ── */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
              <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between">
                <p className="text-[13px] font-black uppercase tracking-[0.16em] text-gray-500">Categories</p>
                <span className="text-xs font-bold text-[#493657] bg-[#F3EEF8] px-2 py-0.5 rounded-full">12</span>
              </div>
              <div className="p-2">
                <button onClick={() => go('all')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200"
                  style={activeCat === 'all'
                    ? { background: 'linear-gradient(135deg,#2E1A3E,#5c3e79)', color: '#fff' }
                    : { color: '#0F1221' }}>
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🏡</span>
                    <span className="text-[13px] font-semibold">All Services</span>
                  </div>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full"
                    style={activeCat === 'all'
                      ? { background: 'rgba(255,255,255,0.22)', color: '#fff' }
                      : { background: '#F3EEF8', color: '#493657' }}>
                    {servicePricing.length}
                  </span>
                </button>
                {SERVICE_CATEGORIES.map((cat) => (
                  <SidebarBtn key={cat.id} cat={cat} active={activeCat === cat.id} onClick={() => go(cat.id)} />
                ))}
              </div>
              <div className="mx-3 mb-3 mt-1 rounded-xl overflow-hidden border border-[#493657]/10">
                <div className="bg-[#F3EEF8] px-3.5 py-3">
                  <div className="flex gap-2.5 mb-3">
                    <span className="text-2xl">🎨</span>
                    <div>
                      <p className="text-[13px] font-bold text-[#0F1221] leading-snug">Can't find what<br />you're looking for?</p>
                      <p className="text-xs text-gray-500 mt-1">Contact us for custom solutions.</p>
                    </div>
                  </div>
                  <a href="https://wa.me/918796777399?text=Hi%20Calyco%2C%20I%20have%20a%20custom%20painting%20requirement."
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#493657] text-white py-2.5 text-xs font-bold hover:bg-[#F0C85A] hover:text-[#0F1221] transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" /> Talk to Expert
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Main ── */}
          <div className="flex-1 min-w-0">

            {/* Mobile horizontal category chips */}
            <div className="lg:hidden -mx-4 px-4 flex gap-2 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: 'none' }}>
              <button onClick={() => go('all')}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all"
                style={activeCat === 'all'
                  ? { background: 'linear-gradient(135deg,#2E1A3E,#5c3e79)', color: '#fff' }
                  : { background: '#fff', color: '#493657', border: '1px solid #e5e7eb' }}>
                🏡 All
              </button>
              {SERVICE_CATEGORIES.map((cat) => (
                <button key={cat.id} onClick={() => go(cat.id)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all whitespace-nowrap"
                  style={activeCat === cat.id
                    ? { background: cat.gradient, color: '#fff' }
                    : { background: '#fff', color: '#374151', border: '1px solid #e5e7eb' }}>
                  <CategoryIcon categoryId={cat.id} className="w-4 h-4 text-white" /> {cat.label}
                </button>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={search}
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl text-[13px] sm:text-sm text-[#0F1221] placeholder-gray-400 focus:outline-none focus:border-[#493657]/50 focus:ring-2 focus:ring-[#493657]/10 transition-all"
                />
              </div>

              {/* Sort — desktop */}
              <select value={sort} onChange={(e) => onSort(e.target.value)}
                className="hidden sm:block bg-white border border-gray-200 rounded-xl px-3.5 py-3 text-[13px] text-gray-600 font-medium focus:outline-none focus:border-[#493657]/50 cursor-pointer flex-shrink-0">
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>

              {/* Sort icon — mobile */}
              <button onClick={() => setMobileSort(!mobileSort)}
                className="sm:hidden w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl flex-shrink-0 transition-colors"
                style={mobileSort ? { background: '#493657', color: '#fff', borderColor: '#493657' } : { color: '#9ca3af' }}>
                <SlidersHorizontal className="w-4 h-4" />
              </button>

              {/* Grid / List toggle */}
              <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                {[{ id: 'grid', Icon: LayoutGrid }, { id: 'list', Icon: List }].map(({ id, Icon }) => (
                  <button key={id} onClick={() => setView(id)}
                    className="p-2.5 sm:p-3 transition-colors"
                    style={view === id ? { background: '#493657', color: '#fff' } : { color: '#9ca3af' }}>
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile sort dropdown */}
            {mobileSort && (
              <motion.div
                className="sm:hidden mb-4 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}>
                {SORT_OPTIONS.map((o) => (
                  <button key={o.value} onClick={() => onSort(o.value)}
                    className="w-full flex items-center justify-between px-4 py-3 text-[13px] font-medium transition-colors hover:bg-[#F3EEF8] border-b border-gray-50 last:border-0"
                    style={sort === o.value ? { color: '#493657', fontWeight: 700 } : { color: '#374151' }}>
                    {o.label}
                    {sort === o.value && <span className="w-2 h-2 rounded-full bg-[#493657]" />}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Active filter pills */}
            {(activeCat !== 'all' || search) && (
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {activeCat !== 'all' && activeCatObj && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-white"
                    style={{ background: activeCatObj.gradient }}>
                    {activeCatObj.emoji} {activeCatObj.label}
                    <button onClick={() => go('all')} className="ml-1 opacity-70 hover:opacity-100 text-[11px]">✕</button>
                  </span>
                )}
                {search && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-gray-200 text-gray-700">
                    "{search}"
                    <button onClick={() => onSearch('')} className="ml-1 opacity-70 hover:opacity-100 text-[11px]">✕</button>
                  </span>
                )}
              </div>
            )}

            {/* Result count */}
            <p className="text-[11px] sm:text-[13px] text-gray-500 font-medium mb-4">
              {filtered.length === 0
                ? 'No services found.'
                : <><span className="font-bold text-[#0F1221]">{filtered.length}</span> service{filtered.length !== 1 ? 's' : ''}</>
              }
            </p>

            {/* Cards */}
            {filtered.length === 0 ? (
              <div className="text-center py-16 sm:py-24 bg-white rounded-2xl border border-gray-100">
                <p className="text-4xl sm:text-5xl mb-4">🔍</p>
                <p className="text-[#0F1221] font-semibold text-sm sm:text-base mb-1">No services match your search.</p>
                <p className="text-xs sm:text-sm text-gray-400 mb-4">Try a different keyword or category.</p>
                <button onClick={() => { onSearch(''); go('all'); }}
                  className="text-[#493657] text-sm font-bold underline underline-offset-2">
                  Clear filters
                </button>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
                {paginated.map((service, i) => (
                  <motion.div key={service.slug}
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}>
                    <GridCard service={service} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2 sm:gap-3">
                {paginated.map((service, i) => (
                  <motion.div key={service.slug}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.025 }}>
                    <ListRow service={service} />
                  </motion.div>
                ))}
              </div>
            )}

            <Pagination
              page={page} total={filtered.length} perPage={PER_PAGE}
              onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
          </div>
        </div>
      </div>

      {/* ══════════════ BOTTOM CTA ══════════════ */}
      <div className="bg-[#2E1A3E] mt-8 sm:mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
            <div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#F0C85A]/60 mb-2">Ready to start?</p>
              <p className="text-white text-base sm:text-2xl font-light max-w-sm leading-snug">
                Free inspection · Fixed price · 1-year warranty.
              </p>
            </div>
            <div className="flex gap-2.5 sm:gap-3 flex-wrap w-full sm:w-auto">
              <Link to="/calculators/service-cost-calculator"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-bold hover:bg-white transition-colors shadow-lg">
                <Calculator className="w-4 h-4" /> Get Free Estimate
              </Link>
              <a href="https://wa.me/918796777399?text=Hi%20Calyco%2C%20I%20want%20a%20free%20site%20visit."
                target="_blank" rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold hover:bg-white/10 transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
