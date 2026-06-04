import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { CartIcon } from "./CartIcon";
import contactData from '../data/admin/contact.json';
import { WA_SITE_VISIT } from '../data/positioning';
import { ProductsDropdown } from "./ProductsDropdown";

// ─── Inline SVGs ──────────────────────────────────────────────────────────────
const WaIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const QuoteIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ChevronDown = ({ open }) => (
  <svg className={`w-3.5 h-3.5 ml-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// ─── Services data ────────────────────────────────────────────────────────────
const SERVICE_LINKS = [
  { label: 'Interior Painting',   to: '/services/interior-painting',     sub: 'from ₹18/sq ft' },
  { label: 'Exterior Painting',   to: '/services/exterior-painting',     sub: 'from ₹24/sq ft' },
  { label: 'Full House Painting', to: '/services/full-house-painting',   sub: 'from ₹18/sq ft' },
  { label: 'Repainting',          to: '/services/repainting',            sub: 'from ₹18/sq ft' },
  { label: 'Fresh Painting',      to: '/services/fresh-painting',        sub: 'New surface' },
  { label: 'Rental Painting',     to: '/services/rental-painting',       sub: 'from ₹14/sq ft' },
  { label: 'Waterproofing',       to: '/services/terrace-waterproofing', sub: 'from ₹45/sq ft' },
  { label: 'Texture Painting',    to: '/services/texture-painting',      sub: 'from ₹35/sq ft' },
  { label: 'Wood Polish',         to: '/services/wood-polish',           sub: 'from ₹60/sq ft' },
  { label: 'Commercial Painting', to: '/services/commercial-painting',   sub: 'from ₹20/sq ft' },
  { label: 'High-Rise Painting',  to: '/services/high-rise-painting',   sub: 'Access included' },
  { label: 'Villa / Bungalow',    to: '/services/villa-bungalow-painting', sub: 'Full scope' },
];

const RESOURCE_LINKS = [
  { label: 'Painting Cost Calculator', to: '/calculators/service-cost-calculator', sub: 'Transparent rate logic' },
  { label: 'Transparent Pricing',      to: '/transparent-pricing',                 sub: 'How we price' },
  { label: 'How It Works',             to: '/how-it-works',                        sub: '6-step process' },
  { label: 'Project Gallery',          to: '/gallery',                             sub: 'Before & after' },
  { label: 'FAQs',                     to: '/faq',                                 sub: 'Common questions' },
  { label: 'Paint Blog',               to: '/blog',                                sub: 'Tips & guides' },
  { label: 'Verified Painters',        to: '/verified-painters',                   sub: 'Our screening process' },
  { label: 'Sustainability',           to: '/sustainability',                      sub: 'Eco standards' },
];

// ─── Dropdown panel ───────────────────────────────────────────────────────────
const ServicesPanel = ({ onSelect }) => (
  <div className="absolute top-full left-0 mt-1 z-[200] w-[560px] rounded-2xl bg-white border border-[#0F1221]/8 shadow-[0_12px_48px_rgba(0,0,0,0.14)] overflow-hidden">
    <div className="p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F1221]/35 mb-4">All Services</p>
      <div className="grid grid-cols-2 gap-1">
        {SERVICE_LINKS.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            onClick={onSelect}
            className="flex items-start gap-2.5 rounded-xl px-3 py-2.5 hover:bg-[#F7F6F3] transition-colors group"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#F0C85A] flex-shrink-0 mt-1.5" />
            <div>
              <span className="block text-sm font-semibold text-[#0F1221] group-hover:text-[#493657] transition-colors leading-snug">{s.label}</span>
              <span className="block text-[11px] text-[#0F1221]/40 font-light mt-0.5">{s.sub}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
    <div className="border-t border-[#0F1221]/8 px-5 py-3 flex items-center justify-between bg-[#FAFAF8]">
      <Link to="/services" onClick={onSelect} className="text-sm font-bold text-[#493657] hover:text-[#F0C85A] transition-colors">
        Browse all 60+ services →
      </Link>
      <Link to="/calculators/service-cost-calculator" onClick={onSelect} className="inline-flex items-center gap-1.5 rounded-full bg-[#0F1221] text-white px-4 py-1.5 text-xs font-bold hover:bg-[#493657] transition-colors">
        Calculate Cost
      </Link>
    </div>
  </div>
);

const ResourcesPanel = ({ onSelect }) => (
  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-[200] w-[420px] rounded-2xl bg-white border border-[#0F1221]/8 shadow-[0_12px_48px_rgba(0,0,0,0.14)] overflow-hidden">
    <div className="p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F1221]/35 mb-4">Resources</p>
      <div className="grid grid-cols-1 gap-1">
        {RESOURCE_LINKS.map((r) => (
          <Link
            key={r.to}
            to={r.to}
            onClick={onSelect}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 hover:bg-[#F7F6F3] transition-colors group"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#493657]/40 flex-shrink-0" />
            <div className="flex items-center justify-between w-full">
              <span className="text-sm font-semibold text-[#0F1221] group-hover:text-[#493657] transition-colors">{r.label}</span>
              <span className="text-[11px] text-[#0F1221]/35 font-light">{r.sub}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
    <div className="border-t border-[#0F1221]/8 px-5 py-3 bg-[#FAFAF8]">
      <Link to="/get-quote" onClick={onSelect} className="block text-center rounded-full bg-[#F0C85A] text-[#0F1221] py-2 text-sm font-bold hover:bg-[#0F1221] hover:text-white transition-colors">
        Book Free Site Visit →
      </Link>
    </div>
  </div>
);

// ─── Nav button helper ────────────────────────────────────────────────────────
const NavBtn = ({ label, isOpen, onClick, hasArrow = true }) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center gap-0.5 text-sm font-medium transition-colors whitespace-nowrap ${isOpen ? 'text-[#F0C85A]' : 'text-[#493657] hover:text-[#F0C85A]'}`}
  >
    {label}
    {hasArrow && <ChevronDown open={isOpen} />}
  </button>
);

// ─── Mobile accordion item ────────────────────────────────────────────────────
const MobileAccordion = ({ label, links, onSelect }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e5e0d8]/60">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3.5 text-sm font-semibold text-[#0F1221]"
      >
        {label}
        <ChevronDown open={open} />
      </button>
      {open && (
        <div className="pb-3 space-y-1 pl-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={onSelect}
              className="flex items-center gap-2 py-2 text-sm text-[#0F1221]/70 hover:text-[#493657] transition-colors"
            >
              <span className="w-1 h-1 rounded-full bg-[#F0C85A] flex-shrink-0" />
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Version Switcher (demo only — remove when boss approves) ─────────────────
const VERSIONS = [
  { label: 'V1 — Current',      to: '/' },
  { label: 'V2 — Dark Premium', to: '/home-v2' },
  { label: 'V3 — Light Clean',  to: '/home-v3' },
  { label: 'V4 — Dulux Style',  to: '/home-v4' },
  { label: 'V5 — Asian Paints', to: '/home-v5' },
];

const VersionSwitcher = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const ref = useRef(null);

  const current = VERSIONS.find(v => v.to === location.pathname) || VERSIONS[0];

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-1.5 bg-[#493657] text-white text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-[#F0C85A] hover:text-[#0F1221] transition-colors"
      >
        {current.label.split('—')[0].trim()}
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1.5 z-[300] w-44 rounded-xl bg-white border border-[#0F1221]/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0F1221]/35 px-3 pt-3 pb-1">Demo Variants</p>
          {VERSIONS.map((v) => (
            <Link
              key={v.to}
              to={v.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 text-xs font-semibold transition-colors ${location.pathname === v.to ? 'bg-[#493657]/8 text-[#493657]' : 'text-[#0F1221]/70 hover:bg-[#F7F6F3] hover:text-[#0F1221]'}`}
            >
              {location.pathname === v.to && <span className="w-1.5 h-1.5 rounded-full bg-[#493657] flex-shrink-0" />}
              {v.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export const Navbar = ({ bannerVisible = true, onMenuToggle }) => {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // 'services' | 'resources' | 'products'
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);
  const location = useLocation();
  const navRef   = useRef(null);
  const drawerRef = useRef(null);
  const waLink = `${contactData.contact.whatsapp.link}?text=${encodeURIComponent(WA_SITE_VISIT)}`;

  const handleMenuToggle = (next) => {
    setMenuOpen(next);
    if (onMenuToggle) onMenuToggle(next);
  };

  const close = () => setDropdownOpen(null);

  // Close everything on route change
  useEffect(() => {
    handleMenuToggle(false);
    setDropdownOpen(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  // Resize
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 1024;
      if (mobile !== isMobileView) { setDropdownOpen(null); handleMenuToggle(false); setIsMobileView(mobile); }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMobileView]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setDropdownOpen(null); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  // Close mobile drawer on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => { if (drawerRef.current && !drawerRef.current.contains(e.target)) handleMenuToggle(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  // Close on scroll
  useEffect(() => {
    const handler = () => { setDropdownOpen(null); if (menuOpen) handleMenuToggle(false); };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [menuOpen]);

  return (
    <header
      ref={navRef}
      className="sticky top-0 left-0 w-full bg-[#f9f6f2] border-b border-[#e5e0d8] z-50 shadow-sm transition-all duration-300"
      style={{ top: bannerVisible && !menuOpen ? (isMobileView ? '48px' : '40px') : '0px' }}
    >

      {/* ── Desktop ─────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex items-center justify-between px-8 xl:px-12 h-18 gap-4" style={{ height: '72px' }}>

        {/* Logo + Version Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/Logo.webp" className="object-contain h-14 xl:h-16" alt="Calyco" width="137" height="84" />
          </Link>
          <VersionSwitcher />
        </div>

        {/* Nav items */}
        <nav className="flex items-center gap-4 xl:gap-6">

          {/* Services — dropdown */}
          <div className="relative">
            <NavBtn label="Services" isOpen={dropdownOpen === 'services'} onClick={() => setDropdownOpen(dropdownOpen === 'services' ? null : 'services')} />
            {dropdownOpen === 'services' && <ServicesPanel onSelect={close} />}
          </div>

          {/* Cost Calculator — direct */}
          <Link to="/calculators/service-cost-calculator" onClick={close} className="text-sm font-medium text-[#493657] hover:text-[#F0C85A] transition-colors whitespace-nowrap">
            Cost Calculator
          </Link>

          {/* Projects — direct */}
          <Link to="/gallery" onClick={close} className="text-sm font-medium text-[#493657] hover:text-[#F0C85A] transition-colors">
            Projects
          </Link>

          {/* Products — dropdown (existing component) */}
          <div className="relative">
            <NavBtn label="Products" isOpen={dropdownOpen === 'products'} onClick={() => setDropdownOpen(dropdownOpen === 'products' ? null : 'products')} />
            {dropdownOpen === 'products' && <ProductsDropdown onSelect={close} isMobile={false} />}
          </div>

          {/* Colours — direct */}
          <Link to="/colors" onClick={close} className="text-sm font-medium text-[#493657] hover:text-[#F0C85A] transition-colors">
            Colours
          </Link>

          {/* Resources — dropdown */}
          <div className="relative">
            <NavBtn label="Resources" isOpen={dropdownOpen === 'resources'} onClick={() => setDropdownOpen(dropdownOpen === 'resources' ? null : 'resources')} />
            {dropdownOpen === 'resources' && <ResourcesPanel onSelect={close} />}
          </div>

          {/* About — direct */}
          <Link to="/about" onClick={close} className="text-sm font-medium text-[#493657] hover:text-[#F0C85A] transition-colors">
            About
          </Link>

          {/* Contact — direct */}
          <Link to="/contact" onClick={close} className="text-sm font-medium text-[#493657] hover:text-[#F0C85A] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-2 shrink-0">
          {/* WhatsApp */}
          <a href={waLink} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
            className="inline-flex items-center gap-1.5 bg-[#25D366] text-white px-3.5 py-2 rounded-full text-xs font-bold hover:bg-[#1fb355] transition-colors shadow-sm whitespace-nowrap"
            onClick={close}>
            <WaIcon />WhatsApp
          </a>
          {/* Call */}
          <a href={`tel:${contactData.contact.phone.rawNumber}`} aria-label="Call Calyco"
            className="inline-flex items-center gap-1.5 border border-[#0F1221]/15 text-[#0F1221]/70 bg-white px-3.5 py-2 rounded-full text-xs font-semibold hover:border-[#493657]/40 hover:text-[#493657] transition-colors whitespace-nowrap"
            onClick={close}>
            <PhoneIcon />Call Now
          </a>
          {/* Request Quote */}
          <Link to="/get-quote" onClick={close}
            className="inline-flex items-center gap-1.5 bg-[#0F1221] text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-[#493657] transition-colors shadow-sm whitespace-nowrap">
            <QuoteIcon />Request Quote
          </Link>
        </div>
      </div>

      {/* ── Mobile top bar ──────────────────────────────────────────────── */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center">
          <img src="/Logo.webp" className="h-11 object-contain" alt="Calyco" width="137" height="84" />
        </Link>
        <div className="flex items-center gap-3">
          <a href={waLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
            className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center">
            <WaIcon />
          </a>
          <button
            className="w-9 h-9 rounded-full border border-[#0F1221]/12 flex items-center justify-center text-[#0F1221]"
            onClick={() => handleMenuToggle(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile backdrop ─────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => handleMenuToggle(false)}
      />

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#f9f6f2] z-[70] transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e0d8]">
          <Link to="/" onClick={() => handleMenuToggle(false)}>
            <img src="/Logo.webp" className="h-10 object-contain" alt="Calyco" width="137" height="84" />
          </Link>
          <button
            className="w-9 h-9 rounded-full border border-[#0F1221]/12 flex items-center justify-center text-[#0F1221]"
            onClick={() => handleMenuToggle(false)}
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">

          {/* Services accordion */}
          <MobileAccordion label="Services" links={[...SERVICE_LINKS, { label: 'All Services', to: '/services' }]} onSelect={() => handleMenuToggle(false)} />

          {/* Direct links */}
          {[
            { label: 'Cost Calculator',    to: '/calculators/service-cost-calculator' },
            { label: 'Projects / Gallery', to: '/gallery' },
            { label: 'Products',           to: '/products' },
            { label: 'Colours',            to: '/colors' },
          ].map((l) => (
            <div key={l.to} className="border-b border-[#e5e0d8]/60">
              <Link to={l.to} onClick={() => handleMenuToggle(false)} className="block py-3.5 text-sm font-semibold text-[#0F1221] hover:text-[#493657] transition-colors">
                {l.label}
              </Link>
            </div>
          ))}

          {/* Resources accordion */}
          <MobileAccordion label="Resources" links={RESOURCE_LINKS} onSelect={() => handleMenuToggle(false)} />

          {/* About / Contact */}
          {[
            { label: 'About Calyco', to: '/about' },
            { label: 'Contact',      to: '/contact' },
          ].map((l) => (
            <div key={l.to} className="border-b border-[#e5e0d8]/60">
              <Link to={l.to} onClick={() => handleMenuToggle(false)} className="block py-3.5 text-sm font-semibold text-[#0F1221] hover:text-[#493657] transition-colors">
                {l.label}
              </Link>
            </div>
          ))}

          {/* CTA buttons */}
          <div className="pt-5 space-y-2.5">
            <Link to="/get-quote" onClick={() => handleMenuToggle(false)}
              className="flex items-center justify-center gap-2 w-full bg-[#0F1221] text-white py-3.5 rounded-full font-bold hover:bg-[#493657] transition-colors text-sm">
              <QuoteIcon />Request Quote
            </Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 rounded-full font-bold hover:bg-[#1fb355] transition-colors text-sm"
              onClick={() => handleMenuToggle(false)}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              WhatsApp Us
            </a>
            <a href={`tel:${contactData.contact.phone.rawNumber}`}
              className="flex items-center justify-center gap-2 w-full border border-[#0F1221]/15 text-[#0F1221]/70 py-3.5 rounded-full font-semibold hover:border-[#493657]/40 hover:text-[#493657] transition-colors text-sm"
              onClick={() => handleMenuToggle(false)}>
              <PhoneIcon />{contactData.contact.phone.number}
            </a>
          </div>
        </div>
      </div>

    </header>
  );
};
