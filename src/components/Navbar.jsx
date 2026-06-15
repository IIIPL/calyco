import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { CartIcon } from "./CartIcon";
import contactData from '../data/admin/contact.json';
import { WA_SITE_VISIT } from '../data/positioning';
import { ProductsDropdown } from "./ProductsDropdown";

/* ── Inline SVGs ─────────────────────────────────────────────────────────── */
const WaIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const ChevronDown = ({ open }) => (
  <svg className={`w-3 h-3 ml-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

/* ── Service & resource data ──────────────────────────────────────────────── */
const SERVICE_LINKS = [
  { label: 'Interior Repaint',          to: '/services/interior-repaint',            sub: 'from ₹18/sq ft' },
  { label: 'Interior Fresh Painting',   to: '/services/interior-fresh-painting',     sub: 'from ₹23/sq ft' },
  { label: 'Exterior Repaint',          to: '/services/exterior-repaint',            sub: 'from ₹24/sq ft' },
  { label: 'Exterior Fresh Painting',   to: '/services/exterior-fresh-painting',     sub: 'from ₹28/sq ft' },
  { label: 'Ceiling Painting',          to: '/services/ceiling-painting',            sub: 'from ₹20/sq ft' },
  { label: 'Wall Putty Add-on',         to: '/services/wall-putty-addon',            sub: 'from ₹12/sq ft' },
  { label: 'Primer Add-on',             to: '/services/primer-addon',               sub: 'from ₹6/sq ft' },
  { label: 'Dampness / Leakage Repair', to: '/services/dampness-leakage-repair',    sub: 'from ₹65/sq ft' },
  { label: 'Texture / Decorative',      to: '/services/texture-decorative-painting',sub: 'from ₹55/sq ft' },
  { label: 'Waterproofing',             to: '/services/waterproofing',              sub: 'from ₹45/sq ft' },
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

/* ── Dropdown panels — full-width mega style (matches ProductsDropdown) ──── */
const PanelShell = ({ id, eyebrow, children, footerLeft, footerRight }) => (
  <div id={id} className="absolute left-0 top-full w-full bg-white border-b border-[#0F1221]/8 shadow-[0_16px_56px_rgba(0,0,0,0.12)] z-[200]">
    <div className="max-w-screen-xl mx-auto px-10 lg:px-24 py-10">
      <div className="flex items-center gap-2.5 mb-6">
        <span className="w-5 h-px bg-[#F0C85A]" />
        <span className="text-[9px] font-black uppercase tracking-[0.26em] text-[#0F1221]/35">{eyebrow}</span>
      </div>
      {children}
    </div>
    <div className="border-t border-[#0F1221]/6 bg-[#FAFAF8]">
      <div className="max-w-screen-xl mx-auto px-10 lg:px-24 py-3 flex items-center justify-between">
        {footerLeft}
        {footerRight}
      </div>
    </div>
  </div>
);

const PanelLink = ({ to, label, sub, onSelect }) => (
  <Link to={to} onClick={onSelect}
    className="flex items-start gap-2.5 rounded-xl px-3 py-2.5 hover:bg-[#FAFAF8] transition-colors group">
    <span className="w-1 h-1 rounded-full bg-[#F0C85A] flex-shrink-0 mt-2" />
    <div>
      <span className="block text-[14px] font-medium text-[#0F1221] group-hover:text-[#493657] transition-colors leading-snug">{label}</span>
      {sub && <span className="block text-[11px] text-[#0F1221]/35 font-light mt-0.5">{sub}</span>}
    </div>
  </Link>
);

const ServicesPanel = ({ onSelect }) => (
  <PanelShell
    id="nav-panel-services"
    eyebrow="All Services"
    footerLeft={
      <Link to="/services" onClick={onSelect}
        className="text-[13px] font-bold text-[#493657] hover:text-[#F0C85A] transition-colors">
        All 10 services →
      </Link>
    }
    footerRight={
      <Link to="/calculators/service-cost-calculator" onClick={onSelect}
        className="inline-flex items-center gap-1.5 rounded-full bg-[#0F1221] text-white px-4 py-1.5 text-[11px] font-bold hover:bg-[#493657] transition-colors">
        Calculate Cost
      </Link>
    }
  >
    <div className="grid grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-0.5">
      {SERVICE_LINKS.map((s) => (
        <PanelLink key={s.to} to={s.to} label={s.label} sub={s.sub} onSelect={onSelect} />
      ))}
    </div>
  </PanelShell>
);

const ResourcesPanel = ({ onSelect }) => (
  <PanelShell
    id="nav-panel-resources"
    eyebrow="Resources"
    footerLeft={
      <Link to="/faqs" onClick={onSelect}
        className="text-[13px] font-bold text-[#493657] hover:text-[#F0C85A] transition-colors">
        Common questions →
      </Link>
    }
    footerRight={
      <Link to="/get-quote" onClick={onSelect}
        className="inline-flex items-center gap-1.5 rounded-full bg-[#0F1221] text-white px-4 py-1.5 text-[11px] font-bold hover:bg-[#493657] transition-colors">
        Book Free Site Visit
      </Link>
    }
  >
    <div className="grid grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-0.5">
      {RESOURCE_LINKS.map((r) => (
        <PanelLink key={r.to} to={r.to} label={r.label} sub={r.sub} onSelect={onSelect} />
      ))}
    </div>
  </PanelShell>
);

/* ── Nav button ──────────────────────────────────────────────────────────── */
const NavBtn = ({ label, isOpen, onClick, controls }) => (
  <button type="button" onClick={onClick}
    aria-expanded={isOpen}
    aria-haspopup="true"
    aria-controls={controls}
    className={`inline-flex items-center gap-0.5 text-[13px] font-medium transition-colors whitespace-nowrap rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#493657] focus-visible:outline-offset-2 ${
      isOpen ? 'text-[#493657]' : 'text-[#0F1221]/60 hover:text-[#0F1221]'
    }`}>
    {label}
    <ChevronDown open={isOpen} />
  </button>
);

/* ── Mobile accordion ────────────────────────────────────────────────────── */
const MobileAccordion = ({ label, links, onSelect }) => {
  const [open, setOpen] = useState(false);
  const panelId = `mobile-acc-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="border-b border-[#0F1221]/8">
      <button type="button" onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between py-4 text-[14px] font-semibold text-[#0F1221]">
        {label}
        <ChevronDown open={open} />
      </button>
      {open && (
        <div id={panelId} className="pb-3 space-y-0.5 pl-3">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={onSelect}
              className="flex items-center gap-2.5 py-2 text-[13px] text-[#0F1221]/55 hover:text-[#0F1221] transition-colors">
              <span className="w-1 h-1 rounded-full bg-[#F0C85A] flex-shrink-0" />
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Main Navbar ─────────────────────────────────────────────────────────── */
export const Navbar = ({ bannerVisible = true, onMenuToggle }) => {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);
  const [scrolled,     setScrolled]     = useState(false);
  const location  = useLocation();
  const navRef    = useRef(null);
  const drawerRef = useRef(null);
  const waLink = `${contactData.contact.whatsapp.link}?text=${encodeURIComponent(WA_SITE_VISIT)}`;

  const handleMenuToggle = (next) => { setMenuOpen(next); if (onMenuToggle) onMenuToggle(next); };
  const close = () => setDropdownOpen(null);

  useEffect(() => { handleMenuToggle(false); setDropdownOpen(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }, [location]);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 1024;
      if (mobile !== isMobileView) { setDropdownOpen(null); handleMenuToggle(false); setIsMobileView(mobile); }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMobileView]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const h = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setDropdownOpen(null); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [dropdownOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setDropdownOpen(null); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const h = (e) => { if (drawerRef.current && !drawerRef.current.contains(e.target)) handleMenuToggle(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [menuOpen]);

  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 8);
      setDropdownOpen(null);
      if (menuOpen) handleMenuToggle(false);
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, [menuOpen]);

  return (
    <header
      ref={navRef}
      className={`sticky top-0 left-0 w-full bg-white z-50 transition-all duration-300 ${
        scrolled ? 'shadow-[0_2px_24px_rgba(0,0,0,0.08)] border-b border-[#0F1221]/6' : 'border-b border-[#0F1221]/8'
      }`}
      style={{ top: bannerVisible && !menuOpen ? (isMobileView ? '48px' : '40px') : '0px' }}
    >

      {/* ── Desktop ──────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex items-center justify-between px-8 xl:px-14 gap-6" style={{ height: '68px' }}>

        {/* Logo */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/Logo.webp" className="h-12 xl:h-14 object-contain" alt="Calyco" width="137" height="84" />
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-5 xl:gap-7">

          <div>
            <NavBtn label="Services" isOpen={dropdownOpen === 'services'}
              controls="nav-panel-services"
              onClick={() => setDropdownOpen(dropdownOpen === 'services' ? null : 'services')} />
          </div>

          <Link to="/calculators/service-cost-calculator" onClick={close}
            className="text-[13px] font-medium text-[#0F1221]/60 hover:text-[#0F1221] transition-colors whitespace-nowrap">
            Calculator
          </Link>

          <Link to="/gallery" onClick={close}
            className="text-[13px] font-medium text-[#0F1221]/60 hover:text-[#0F1221] transition-colors">
            Projects
          </Link>

          <div>
            <NavBtn label="Products" isOpen={dropdownOpen === 'products'}
              controls="nav-panel-products"
              onClick={() => setDropdownOpen(dropdownOpen === 'products' ? null : 'products')} />
          </div>

          <Link to="/colors" onClick={close}
            className="text-[13px] font-medium text-[#0F1221]/60 hover:text-[#0F1221] transition-colors">
            Colours
          </Link>

          <div>
            <NavBtn label="Resources" isOpen={dropdownOpen === 'resources'}
              controls="nav-panel-resources"
              onClick={() => setDropdownOpen(dropdownOpen === 'resources' ? null : 'resources')} />
          </div>

          <Link to="/about" onClick={close}
            className="text-[13px] font-medium text-[#0F1221]/60 hover:text-[#0F1221] transition-colors">
            About
          </Link>

        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <CartIcon />

          <a href={`tel:${contactData.contact.phone.rawNumber}`} onClick={close}
            aria-label="Call Calyco"
            className="w-9 h-9 rounded-full border border-[#0F1221]/12 flex items-center justify-center text-[#0F1221]/45 hover:border-[#493657] hover:text-[#493657] transition-colors">
            <PhoneIcon />
          </a>

          <Link to="/get-quote" onClick={close}
            className="inline-flex items-center gap-1.5 bg-[#0F1221] text-white px-5 py-2.5 rounded-full text-[12px] font-bold hover:bg-[#493657] transition-colors whitespace-nowrap">
            Free Quote →
          </Link>
        </div>
      </div>

      {/* Mega panels — anchored to the header bottom (desktop only) */}
      {!isMobileView && (
        <div className="hidden lg:block">
          {dropdownOpen === 'services'  && <ServicesPanel onSelect={close} />}
          {dropdownOpen === 'products'  && <div id="nav-panel-products"><ProductsDropdown onSelect={close} isMobile={false} /></div>}
          {dropdownOpen === 'resources' && <ResourcesPanel onSelect={close} />}
        </div>
      )}

      {/* ── Mobile top bar ───────────────────────────────────────────────── */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/Logo.webp" className="h-10 object-contain" alt="Calyco" width="137" height="84" />
        </Link>
        <div className="flex items-center gap-2">
          <CartIcon />
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white">
            <WaIcon />
          </a>
          <button
            className="w-9 h-9 rounded-full border border-[#0F1221]/10 flex items-center justify-center text-[#0F1221]"
            onClick={() => handleMenuToggle(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile backdrop ──────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60] transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => handleMenuToggle(false)}
      />

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 h-full w-full max-w-[320px] bg-white z-[70] flex flex-col transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[−24px_0_80px_rgba(0,0,0,0.18)] ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#0F1221]/8">
          <Link to="/" onClick={() => handleMenuToggle(false)}>
            <img src="/Logo.webp" className="h-9 object-contain" alt="Calyco" width="137" height="84" />
          </Link>
          <button
            className="w-8 h-8 rounded-full border border-[#0F1221]/10 flex items-center justify-center text-[#0F1221]/50 hover:text-[#0F1221] transition-colors"
            onClick={() => handleMenuToggle(false)} aria-label="Close">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">

          <MobileAccordion
            label="Services"
            links={[...SERVICE_LINKS, { label: 'All Services', to: '/services' }]}
            onSelect={() => handleMenuToggle(false)}
          />

          {[
            { label: 'Calculator',         to: '/calculators/service-cost-calculator' },
            { label: 'Projects',           to: '/gallery' },
            { label: 'Products',           to: '/products' },
            { label: 'Colours',            to: '/colors' },
          ].map((l) => (
            <div key={l.to} className="border-b border-[#0F1221]/8">
              <Link to={l.to} onClick={() => handleMenuToggle(false)}
                className="block py-4 text-[14px] font-semibold text-[#0F1221] hover:text-[#493657] transition-colors">
                {l.label}
              </Link>
            </div>
          ))}

          <MobileAccordion label="Resources" links={RESOURCE_LINKS} onSelect={() => handleMenuToggle(false)} />

          {[
            { label: 'About Calyco', to: '/about' },
            { label: 'Contact',      to: '/contact' },
          ].map((l) => (
            <div key={l.to} className="border-b border-[#0F1221]/8">
              <Link to={l.to} onClick={() => handleMenuToggle(false)}
                className="block py-4 text-[14px] font-semibold text-[#0F1221] hover:text-[#493657] transition-colors">
                {l.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="flex-shrink-0 px-5 py-5 border-t border-[#0F1221]/8 space-y-2.5 bg-[#FAFAF8]">
          <Link to="/get-quote" onClick={() => handleMenuToggle(false)}
            className="flex items-center justify-center gap-2 w-full bg-[#0F1221] text-white py-3.5 rounded-full text-[13px] font-bold hover:bg-[#493657] transition-colors">
            Get Free Quote →
          </Link>
          <a href={waLink} target="_blank" rel="noopener noreferrer" onClick={() => handleMenuToggle(false)}
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 rounded-full text-[13px] font-bold hover:bg-[#1fb355] transition-colors">
            <WaIcon /> WhatsApp Us
          </a>
          <a href={`tel:${contactData.contact.phone.rawNumber}`} onClick={() => handleMenuToggle(false)}
            className="flex items-center justify-center gap-2 w-full border border-[#0F1221]/12 text-[#0F1221]/60 py-3.5 rounded-full text-[13px] font-medium hover:border-[#0F1221]/25 hover:text-[#0F1221] transition-colors">
            <PhoneIcon /> {contactData.contact.phone.number}
          </a>
        </div>
      </div>
    </header>
  );
};
