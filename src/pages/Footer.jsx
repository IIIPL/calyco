import { FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import contactData from "../data/admin/contact.json";

// Decorative Subtle Dots Background
const SubtleDots = ({ count = 8 }) => {
  const dots = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    dur: Math.random() * 5 + 4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map(d => (
        <div
          key={d.id}
          className="absolute rounded-full bg-gradient-to-r from-[#0F1221]/5 to-[#0F1221]/3 animate-pulse"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.x}%`,
            top: `${d.y}%`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
          }}
        />
      ))}
    </div>
  );
};

// Column Helper Component
const Col = ({ title, children }) => (
  <div>
    {title && (
      <h4 className="text-xs md:text-sm font-medium tracking-[.15em] uppercase text-[#C4A962] mb-5 md:mb-6">
        {title}
      </h4>
    )}
    <ul className="space-y-3.5 text-sm md:text-[15px]">{children}</ul>
  </div>
);

// Link Item Helper Component
const Item = ({ to, children, isExternal = false }) => {
  const content = (
    <>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C4A962] opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-[#C4A962] group-hover:after:w-full after:transition-all">
        {children}
      </span>
    </>
  );

  return (
    <li>
      {isExternal ? (
        <a
          href={to}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 text-[#0F1221]/60 hover:text-[#0F1221] transition-colors duration-300"
        >
          {content}
        </a>
      ) : (
        <Link
          to={to}
          className="group inline-flex items-center gap-2 text-[#0F1221]/60 hover:text-[#0F1221] transition-colors duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {content}
        </Link>
      )}
    </li>
  );
};

export const Footer = () => {
  const { address, phone, email, workingHours, whatsapp } = contactData.contact;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-[#F5F1E8] via-[#EDE8DC] to-[#E8E3D5] text-[#0F1221] border-t border-[#C4A962]/20 overflow-hidden font-poppins">
      <SubtleDots />

      {/* Main Content Info - More Generous Spacing */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 lg:px-16 xl:px-24 pt-24 pb-16">
        <div className="grid gap-16 sm:gap-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

          {/* Column 1: Company Description */}
          <div className="space-y-7">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <img src="/Logo.png" alt="CALYCO" className="w-16 h-auto object-contain" />
            </Link>
            <p className="text-sm text-[#3D3020]/70 leading-[1.7] max-w-xs font-light">
              Calyco manufactures and supplies specification-grade interior, exterior, textured, and waterproofing coatings direct to professionals worldwide. Low-VOC, water-based acrylic formulations. Dedicated account support on every project.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="text-[#C4A962] hover:text-[#3D3020] transition-colors duration-300">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="text-[#C4A962] hover:text-[#3D3020] transition-colors duration-300">
                <FaYoutube className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="text-[#C4A962] hover:text-[#3D3020] transition-colors duration-300">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href={whatsapp.link} target="_blank" rel="noreferrer" className="text-[#C4A962] hover:text-[#3D3020] transition-colors duration-300">
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <Col title="Quick Links">
            <Item to="/products">Product Range</Item>
            <Item to="/downloads">Technical Data Sheets</Item>
            <Item to="/contact">Request Quote</Item>
            <Item to="/about">About Calyco</Item>
          </Col>

          {/* Column 3: Resources */}
          <Col title="Resources">
            <Item to="/downloads">Specification Guides</Item>
            <Item to="/colors">Colour Systems</Item>
            <Item to="/budget-calculator">Coverage Calculator</Item>
            <Item to="/faq">FAQs</Item>
            <Item to="/policies/privacy">Privacy Policy</Item>
            <Item to="/policies/terms">Terms & Conditions</Item>
          </Col>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-xs md:text-sm font-medium tracking-[.15em] uppercase text-[#C4A962] mb-5 md:mb-6">
              Contact
            </h4>
            <div className="space-y-5 text-sm text-[#3D3020]/65">
              {/* Email */}
              <div className="flex items-start gap-3 group">
                <span className="text-[#C4A962] mt-0.5">✉</span>
                <a href={`mailto:${email.support}`} className="hover:text-[#3D3020] transition-colors duration-300 font-light">{email.support}</a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 group">
                <span className="text-[#C4A962] mt-0.5">📍</span>
                <p className="leading-[1.7] font-light">
                  B-37, Sector-1, Noida NCR, India
                </p>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 group">
                <span className="text-[#C4A962] mt-0.5">🕒</span>
                <div>
                  <p className="font-medium text-[#3D3020]">Mon–Sat</p>
                  <p className="text-[#3D3020]/60 text-xs font-light">10:00 AM – 6:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright */}
      <div className="relative z-10 border-t border-[#C4A962]/20">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 xl:px-24 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#3D3020]/50">
          <p className="font-light">© {currentYear} Calyco Products Private Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
