import { FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const GoldenDots = ({ count = 10 }) => {
  const dots = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    dur: Math.random() * 4 + 3,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map(d => (
        <div
          key={d.id}
          className="absolute rounded-full bg-gradient-to-r from-[#F0C85A] to-[#ffd700] animate-pulse"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.x}%`,
            top: `${d.y}%`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
            boxShadow: `0 0 ${d.size * 2}px rgba(240,200,90,.35)`,
          }}
        />
      ))}
    </div>
  );
};

const Col = ({ title, children }) => (
  <div>
    <h4 className="text-xs md:text-sm font-semibold tracking-[.12em] uppercase text-white/90 mb-3 md:mb-4">
      {title}
    </h4>
    <ul className="space-y-2.5 text-sm md:text-[15px]">{children}</ul>
  </div>
);

const Item = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="group inline-flex items-center gap-2 text-[#e5e0d8]/90 hover:text-[#F0C85A] transition-colors"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F0C85A] opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#F0C85A] group-hover:after:w-full after:transition-all">
        {children}
      </span>
    </Link>
  </li>
);

export const Footer = () => (
  <footer className="relative bg-[#1A1C24] text-white border-t border-[#493657]/30 overflow-hidden">
    <GoldenDots />

    {/* TOP GRID */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 xl:px-24 pt-12 pb-10">
      <div className="grid gap-10 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/Logo.png" alt="CALYCO" className="w-12 h-12 object-contain" />
            <span className="font-bold text-2xl tracking-wide">CALYCO</span>
          </div>
          <p className="text-sm text-[#e5e0d8]/90 max-w-xs">
            Premium paints for beautiful, lasting spaces. Low-VOC, high-performance finishes.
          </p>
          <div className="flex gap-4 mt-5">
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#F0C85A]">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#F0C85A]">
              <FaYoutube className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#F0C85A]">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="hover:text-[#F0C85A]">
              <FaWhatsapp className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Calyco */}
        <Col title="Calyco">
          <Item to="/about">About Us</Item>
          <Item to="/contact">Contact Us</Item>
          <Item to="/colors">Sacred Palette</Item>
          <Item to="/product">Shop Paints</Item>
          <Item to="/room-visualization">Room Visualizer</Item>
        </Col>

        {/* Customer Service */}
        <Col title="Customer Service">
          <Item to="/contact">Support &amp; Queries</Item>
          <Item to="/policies/shipping">Shipping &amp; Delivery</Item>
          <Item to="/policies/returns">Returns &amp; Refunds</Item>
          <Item to="/policies/warranty">Warranty</Item>
          <Item to="/faq">FAQ</Item>
        </Col>

        {/* Policies */}
        <Col title="Policies">
          <Item to="/policies/privacy">Privacy Policy (DPDP)</Item>
          <Item to="/policies/terms">Terms &amp; Conditions</Item>
          <Item to="/policies/payments-gst">Payment, Pricing &amp; GST/Invoices</Item>
          <Item to="/policies/quality">Quality Policy</Item>
          <Item to="/policies/environment">Environmental &amp; Sustainability</Item>
          <Item to="/policies/disclaimer">Product/Color Disclaimer</Item>
        </Col>
      </div>
    </div>

    {/* BOTTOM BAR
    <div className="relative z-10 border-t border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 xl:px-24 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#e5e0d8]/70">
        <p>© {new Date().getFullYear()} CALYCO Paints. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link to="/policies/privacy" className="hover:text-[#F0C85A]">Privacy</Link>
          <Link to="/policies/terms" className="hover:text-[#F0C85A]">Terms</Link>
          <Link to="/accessibility" className="hover:text-[#F0C85A]">Accessibility</Link>
          <Link to="/policies" className="hover:text-[#F0C85A]">All Policies</Link>
        </div>
      </div>
    </div> */}
  </footer>
);

export default Footer;
