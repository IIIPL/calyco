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
        <footer className="relative bg-[#23182b] text-white pt-16 pb-8 border-t border-[#493657]/30 px-32 overflow-hidden">
            <GoldenDots count={12} />
            
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-12 md:gap-0">
                {/* Left: Logo & Company Info */}
                <div className="flex-1 flex flex-col gap-4 min-w-[220px]">
                    <div className="flex items-center gap-3 mb-2">
                        <img src="/Logo.png" alt="Calyco Logo" className="w-10 h-10 object-contain" />
                        <span className="font-bold text-2xl tracking-wide">CALYCO</span>
                    </div>
                    <div className="text-[#F0C85A] font-semibold text-lg">Calyco</div>
                    <div className="text-sm text-[#e5e0d8] opacity-80">Decorator to exundantur rocheet wort disquised cop prachiet ee toliadna freti entepasions and enod epntry tetine to sepiore.</div>
                    <div className="mt-2 text-xs text-[#e5e0d8] opacity-60">© 2024 Calyco Paints. All rights reserved.</div>
                </div>

                {/* Center: Contact & Navigation */}
                <div className="flex-1 flex flex-col gap-6 min-w-[220px]">
                    <div>
                        <div className="font-semibold mb-2">Contact</div>
                        <div className="text-sm text-[#e5e0d8]">Ph: +91-99589-66881, +91-85929-38439</div>
                        <div className="text-sm text-[#e5e0d8]">enquiries@calycopaints.com</div>
                        <div className="text-sm text-[#e5e0d8]">B37, Sector 1, Noida, NCR</div>
                    </div>
                    <div>
                        <div className="font-semibold mb-2">Quick Links</div>
                        <div className="flex flex-wrap gap-4 text-sm">
                            <Link to="/" className="hover:text-[#F0C85A] transition-colors">Home</Link>
                            <Link to="/about" className="hover:text-[#F0C85A] transition-colors">About</Link>
                            <Link to="/product" className="hover:text-[#F0C85A] transition-colors">Products</Link>
                            <Link to="/contact" className="hover:text-[#F0C85A] transition-colors">Contact</Link>
                        </div>
                    </div>
                </div>

                {/* Right: Socials & Color Swatches */}
                <div className="flex-1 flex flex-col gap-6 min-w-[220px] items-end justify-between">
                    <div className="flex gap-4 mb-4">
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F0C85A]">
                            <FaInstagram className="w-6 h-6" />
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F0C85A]">
                            <FaYoutube className="w-6 h-6" />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F0C85A]">
                            <FaLinkedin className="w-6 h-6" />
                        </a>
                        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F0C85A]">
                            <FaWhatsapp className="w-6 h-6" />
                        </a>
                    </div>
                    <div className="flex gap-3 items-center mt-4">
                        <span className="text-xs text-[#e5e0d8]">Essential Colours</span>
                        <span className="w-7 h-7 rounded-full bg-[#f0c85a] border-2 border-white"></span>
                        <span className="w-7 h-7 rounded-full bg-[#493657] border-2 border-white"></span>
                        <span className="w-7 h-7 rounded-full bg-[#e5e0d8] border-2 border-white"></span>
                    </div>
                </div>
            </div>
        </footer>
    );
};