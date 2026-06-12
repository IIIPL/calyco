import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import contactData from '../data/admin/contact.json';
import { BRAND_NAME, POSITIONING_TAGLINE, WA_SITE_VISIT } from '../data/positioning';
import { cities } from '../data/cities';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

/* ── Inline SVG icons ────────────────────────────────────────────────────── */
const MailIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#F0C85A]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PinIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#F0C85A]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#F0C85A]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const WaIconSm = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

/* ── Column header (eyebrow pattern) ─────────────────────────────────────── */
const ColHeader = ({ children }) => (
  <div className="flex items-center gap-2 mb-5">
    <span className="w-5 h-px bg-[#F0C85A]" />
    <h4 className="text-[10px] font-black tracking-[0.24em] uppercase text-[#F0C85A]">{children}</h4>
  </div>
);

/* ── Link components ─────────────────────────────────────────────────────── */
const FooterLink = ({ to, children, external }) =>
  external ? (
    <li>
      <a href={to} target="_blank" rel="noreferrer"
        className="text-[13px] font-light text-white/45 hover:text-white transition-colors duration-200 leading-relaxed">
        {children}
      </a>
    </li>
  ) : (
    <li>
      <Link to={to} onClick={scrollTop}
        className="text-[13px] font-light text-white/45 hover:text-white transition-colors duration-200 leading-relaxed">
        {children}
      </Link>
    </li>
  );

/* ── Main footer ─────────────────────────────────────────────────────────── */
export const Footer = () => {
  const { email, whatsapp } = contactData.contact;
  const year = new Date().getFullYear();
  const waLink = `${whatsapp.link}?text=${encodeURIComponent(WA_SITE_VISIT)}`;

  return (
    <footer className="bg-[#0F1221] text-white font-poppins">

      {/* ── Pre-footer CTA ───────────────────────────────────────────────── */}
      <div className="border-b border-white/6">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-7 h-px bg-[#F0C85A]" />
                <span className="text-[10px] font-black uppercase tracking-[0.26em] text-[#F0C85A]/60">Start Your Project</span>
              </div>
              <h2 className="text-[22px] sm:text-[28px] font-light text-white leading-tight">
                Ready to transform<br className="hidden sm:block" /> your home?
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/get-quote" onClick={scrollTop}
                className="inline-flex items-center gap-2 bg-[#F0C85A] text-[#0F1221] px-6 py-3 rounded-full text-[13px] font-bold hover:bg-white transition-colors whitespace-nowrap">
                Get Free Quote →
              </Link>
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366]/15 border border-[#25D366]/25 text-[#4ce87a] px-6 py-3 rounded-full text-[13px] font-bold hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors whitespace-nowrap">
                <WaIconSm /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main grid ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-12 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link to="/" onClick={scrollTop}>
              <img src="/Logo.webp" alt="Calyco" className="h-11 object-contain"
                style={{ filter: 'brightness(0) invert(1)' }} />
            </Link>
            <p className="text-[9.5px] font-black uppercase tracking-[0.18em] text-[#F0C85A] mt-4 mb-1.5">{BRAND_NAME}</p>
            <p className="text-[13px] font-light text-white/40 leading-relaxed max-w-[200px]">
              {POSITIONING_TAGLINE}
            </p>
            <div className="flex gap-2.5 mt-5">
              <a href={whatsapp.link} target="_blank" rel="noreferrer" aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-[#25D366]/12 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all">
                <FaWhatsapp className="w-3.5 h-3.5" />
              </a>
              <a href="https://www.instagram.com/calycopaints" target="_blank" rel="noreferrer" aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:bg-[#F0C85A] hover:text-[#0F1221] hover:border-[#F0C85A] transition-all">
                <FaInstagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <ColHeader>Services</ColHeader>
            <ul className="space-y-2.5">
              <FooterLink to="/services/interior-repaint">Interior Repaint</FooterLink>
              <FooterLink to="/services/interior-fresh-painting">Interior Fresh</FooterLink>
              <FooterLink to="/services/exterior-repaint">Exterior Repaint</FooterLink>
              <FooterLink to="/services/exterior-fresh-painting">Exterior Fresh</FooterLink>
              <FooterLink to="/services/ceiling-painting">Ceiling Painting</FooterLink>
              <FooterLink to="/services/dampness-leakage-repair">Dampness Repair</FooterLink>
              <FooterLink to="/services/texture-decorative-painting">Texture / Decorative</FooterLink>
              <FooterLink to="/services/waterproofing">Waterproofing</FooterLink>
              <li>
                <Link to="/services" onClick={scrollTop}
                  className="text-[12px] font-semibold text-[#F0C85A] hover:text-white transition-colors">
                  All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Cities */}
          <div className="lg:col-span-2">
            <ColHeader>Cities We Serve</ColHeader>
            <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link to={`/${city.slug}`} onClick={scrollTop}
                    className="text-[13px] font-light text-white/45 hover:text-white transition-colors duration-200">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/calculators/service-cost-calculator" onClick={scrollTop}
              className="inline-flex items-center gap-1.5 mt-5 text-[12px] font-bold text-[#F0C85A] hover:text-white transition-colors">
              Calculate Cost →
            </Link>
          </div>

          {/* Resources */}
          <div>
            <ColHeader>Resources</ColHeader>
            <ul className="space-y-2.5">
              <FooterLink to="/how-it-works">How It Works</FooterLink>
              <FooterLink to="/transparent-pricing">Transparent Pricing</FooterLink>
              <FooterLink to="/gallery">Project Gallery</FooterLink>
              <FooterLink to="/get-quote">Get Free Quote</FooterLink>
              <FooterLink to="/budget-calculator">Budget Calculator</FooterLink>
              <FooterLink to="/blog">Paint Blog</FooterLink>
              <FooterLink to="/downloads">Technical Sheets</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <ColHeader>Contact</ColHeader>
            <div className="space-y-4 text-[13px]">

              <a href={`mailto:${email.support}`}
                className="flex items-start gap-2.5 text-white/45 hover:text-white transition-colors">
                <MailIcon />
                <span className="font-light">{email.support}</span>
              </a>

              <div className="flex items-start gap-2.5 text-white/45">
                <PinIcon />
                <div className="font-light">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/35 mb-0.5">Delhi NCR</p>
                  <p>B-37, Sector-1, Noida, UP</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/35 mt-2.5 mb-0.5">Udaipur</p>
                  <p>Pratap Nagar, Udaipur, Raj.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-white/45">
                <ClockIcon />
                <div className="font-light">
                  <p className="text-white/60 font-medium">Mon – Sat</p>
                  <p className="text-[12px] mt-0.5">10:00 AM – 6:00 PM IST</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Policy strip ─────────────────────────────────────────────────── */}
      <div className="border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-light text-white/25">
            © {year} Calyco Products Private Limited · {BRAND_NAME} · All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {[
              ['Privacy Policy', '/policies/privacy'],
              ['Terms',          '/policies/terms'],
              ['Quality Policy', '/policies/quality'],
              ['Shipping',       '/policies/shipping'],
              ['Returns',        '/policies/returns'],
            ].map(([label, path]) => (
              <Link key={path} to={path} onClick={scrollTop}
                className="text-[11px] font-light text-white/25 hover:text-white/60 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
