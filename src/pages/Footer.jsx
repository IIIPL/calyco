import { FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const GoldenDots = ({ count = 8 }) => {
  const dots = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    animationDelay: Math.random() * 3,
    animationDuration: Math.random() * 4 + 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-gradient-to-r from-[#F0C85A] to-[#ffd700] animate-pulse"
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            animationDelay: `${dot.animationDelay}s`,
            animationDuration: `${dot.animationDuration}s`,
            boxShadow: `0 0 ${dot.size * 2}px rgba(240, 200, 90, 0.4)`,
          }}
        />
      ))}
    </div>
  );
};

export const Footer = () => {
    return (
        <footer className="relative bg-[#23182b] text-white pt-12 pb-6 border-t border-[#493657]/30 px-6 md:px-12 xl:px-32 overflow-hidden">
            <GoldenDots count={12} />
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-12 md:gap-8 lg:gap-16">
                {/* Left: Logo & Company Info */}
                <div className="flex-1 flex flex-col gap-4 min-w-[220px]">
                    <div className="flex items-center gap-3 mb-2">
                        <img src="/Logo.png" alt="Calyco Logo" className="w-12 h-12 object-contain" />
                        <span className="font-bold text-2xl tracking-wide">CALYCO</span>
                    </div>
                    <div className="text-[#F0C85A] font-semibold text-lg">Calyco Paints</div>
                    <div className="text-sm text-[#e5e0d8] opacity-90 max-w-xs">Premium paints for beautiful, lasting spaces. Trusted by professionals and homeowners for quality, color, and durability.</div>
                    <div className="mt-2 text-xs text-[#e5e0d8] opacity-60">© 2024 Calyco Paints. All rights reserved.</div>
                </div>
                {/* Center: Contact & Navigation */}
                <div className="flex-1 flex flex-col gap-8 min-w-[220px]">
                    <div>
                        <div className="font-semibold mb-2">Contact</div>
                        <div className="text-sm text-[#e5e0d8]">Phone: <a href="tel:+919958966881" className="hover:text-[#F0C85A]">+91-99589-66881</a>, <a href="tel:+918592938439" className="hover:text-[#F0C85A]">+91-85929-38439</a></div>
                        <div className="text-sm text-[#e5e0d8]">Email: <a href="mailto:enquiries@calycopaints.com" className="hover:text-[#F0C85A]">enquiries@calycopaints.com</a></div>
                        <div className="text-sm text-[#e5e0d8]">B37, Sector 1, Noida, NCR</div>
                    </div>
                    <div>
                        <div className="font-semibold mb-2">Quick Links</div>
                        <div className="flex flex-wrap gap-4 text-sm">
                            <Link to="/" className="hover:text-[#F0C85A] transition-colors" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Home</Link>
                            <Link to="/about" className="hover:text-[#F0C85A] transition-colors" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>About</Link>
                            <Link to="/product" className="hover:text-[#F0C85A] transition-colors" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Products</Link>
                            <Link to="/contact" className="hover:text-[#F0C85A] transition-colors" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Contact</Link>
                        </div>
                    </div>
                </div>
                {/* Right: Socials */}
                <div className="flex-1 flex flex-col gap-8 min-w-[220px] items-end justify-between">
                    <div className="flex gap-4 mb-4">
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F0C85A]">
                            <FaInstagram className="w-7 h-7" />
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F0C85A]">
                            <FaYoutube className="w-7 h-7" />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F0C85A]">
                            <FaLinkedin className="w-7 h-7" />
                        </a>
                        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F0C85A]">
                            <FaWhatsapp className="w-7 h-7" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};