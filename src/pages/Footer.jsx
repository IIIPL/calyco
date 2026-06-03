import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import contactData from '../data/admin/contact.json';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const FooterCol = ({ title, children }) => (
  <div>
    <h4 className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#F0C85A] mb-5">{title}</h4>
    <ul className="space-y-3">{children}</ul>
  </div>
);

const FooterLink = ({ to, children, external }) =>
  external ? (
    <li>
      <a
        href={to}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-white/55 hover:text-white transition-colors duration-200"
      >
        {children}
      </a>
    </li>
  ) : (
    <li>
      <Link
        to={to}
        onClick={scrollTop}
        className="text-sm text-white/55 hover:text-white transition-colors duration-200"
      >
        {children}
      </Link>
    </li>
  );

export const Footer = () => {
  const { email, whatsapp } = contactData.contact;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F1221] text-white font-poppins">

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link to="/" onClick={scrollTop}>
              <img src="/Logo.webp" alt="Calyco" className="h-12 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mt-4 max-w-xs">
              Calyco provides professional painting, waterproofing, and surface protection services for homes, rentals, villas, societies, and commercial spaces across selected Indian cities.
            </p>
            <div className="flex gap-3 mt-5">
              {/* WhatsApp -- always valid */}
              <a
                href={whatsapp.link}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
              {/* Instagram -- placeholder until real account is set */}
              <a
                href="https://www.instagram.com/calycopaints"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-white/60 hover:bg-[#F0C85A] hover:text-[#0F1221] transition-all"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <FooterCol title="Services">
            <FooterLink to="/services/interior-painting">Interior Painting</FooterLink>
            <FooterLink to="/services/exterior-painting">Exterior Painting</FooterLink>
            <FooterLink to="/services/terrace-waterproofing">Waterproofing</FooterLink>
            <FooterLink to="/services/texture-painting">Texture & Stencil</FooterLink>
            <FooterLink to="/services/wood-polish">Wood Polish</FooterLink>
            <FooterLink to="/services/tile-grouting">Tile Grouting</FooterLink>
            <FooterLink to="/services">All Services →</FooterLink>
          </FooterCol>

          {/* Cities */}
          <FooterCol title="Cities We Serve">
            <FooterLink to="/painters-in-gurgaon">Gurgaon</FooterLink>
            <FooterLink to="/painters-in-delhi">Delhi</FooterLink>
            <FooterLink to="/painters-in-noida">Noida</FooterLink>
            <FooterLink to="/painters-in-mumbai">Mumbai</FooterLink>
            <FooterLink to="/painters-in-bengaluru">Bengaluru</FooterLink>
            <FooterLink to="/painters-in-hyderabad">Hyderabad</FooterLink>
            <FooterLink to="/painters-in-pune">Pune</FooterLink>
            <FooterLink to="/painters-in-chennai">Chennai</FooterLink>
            <FooterLink to="/painters-in-udaipur">Udaipur</FooterLink>
            <FooterLink to="/painters-in-jaipur">Jaipur</FooterLink>
            <FooterLink to="/painters-in-kolkata">Kolkata</FooterLink>
            <FooterLink to="/painters-in-chandigarh">Chandigarh</FooterLink>
            <FooterLink to="/painters-in-goa">Goa</FooterLink>
            <FooterLink to="/calculators/service-cost-calculator">Calculate Cost →</FooterLink>
          </FooterCol>

          {/* Products & Tools */}
          <FooterCol title="Resources">
            <FooterLink to="/how-it-works">How It Works</FooterLink>
            <FooterLink to="/transparent-pricing">Transparent Pricing</FooterLink>
            <FooterLink to="/gallery">Project Gallery</FooterLink>
            <FooterLink to="/get-quote">Get Free Quote</FooterLink>
            <FooterLink to="/budget-calculator">Budget Calculator</FooterLink>
            <FooterLink to="/blog">Paint Blog</FooterLink>
            <FooterLink to="/downloads">Technical Sheets</FooterLink>
          </FooterCol>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#F0C85A] mb-5">Contact</h4>
            <div className="space-y-4 text-sm">
              <a
                href={`mailto:${email.support}`}
                className="flex items-start gap-2.5 text-white/55 hover:text-white transition-colors"
              >
                <span className="text-[#F0C85A] mt-0.5">✉</span>
                <span>{email.support}</span>
              </a>
              <div className="flex items-start gap-2.5 text-white/55">
                <span className="text-[#F0C85A] mt-0.5">📍</span>
                <div>
                  <p className="font-medium text-white/70 text-xs uppercase tracking-wide mb-0.5">Delhi NCR</p>
                  <p>B-37, Sector-1, Noida, UP</p>
                  <p className="font-medium text-white/70 text-xs uppercase tracking-wide mt-2 mb-0.5">Udaipur</p>
                  <p>Pratap Nagar, Udaipur, Rajasthan</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-white/55">
                <span className="text-[#F0C85A] mt-0.5">🕒</span>
                <div>
                  <p className="text-white/70 font-medium">Mon - Sat</p>
                  <p className="text-xs mt-0.5">10:00 AM - 6:00 PM IST</p>
                </div>
              </div>
              <a
                href={`${whatsapp.link}?text=Hi%20Calyco%2C%20I%20want%20a%20free%20site%20visit.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-1 rounded-full bg-[#25D366] text-white px-4 py-2 text-xs font-bold hover:bg-[#1fb355] transition-colors"
              >
                <FaWhatsapp className="w-3.5 h-3.5" />
                WhatsApp Us
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Policy strip */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35">© {year} Calyco Products Private Limited. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {[
              ['Privacy Policy', '/policies/privacy'],
              ['Terms', '/policies/terms'],
              ['Quality Policy', '/policies/quality'],
              ['Shipping', '/policies/shipping'],
              ['Returns', '/policies/returns'],
            ].map(([label, path]) => (
              <Link
                key={path}
                to={path}
                onClick={scrollTop}
                className="text-xs text-white/35 hover:text-white/70 transition-colors"
              >
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
