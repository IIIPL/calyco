import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { CartIcon } from "./CartIcon";
import InspirationsDropdown from './InspirationsDropdown';
import ColorsDropdown from "./ColorsDropdown";
import VisualizeDropdown from "./VisualizeDropdown";
import { ProductsDropdown } from "./ProductsDropdown";

export const Navbar = ({ bannerVisible = true, onMenuToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Notify parent when menu opens/closes
  const handleMenuToggle = (newState) => {
    setMenuOpen(newState);
    if (onMenuToggle) {
      onMenuToggle(newState);
    }
  };
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  // Auto-close mobile menu when route changes
  useEffect(() => {
    handleMenuToggle(false);
    setDropdownOpen(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  
  useEffect(() => {
    const handleResize = () => {
      const nowMobile = window.innerWidth < 768;
      if (nowMobile !== isMobileView) {
        setDropdownOpen(null);
        handleMenuToggle(false);
        setIsMobileView(nowMobile);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileView]);



  const drawerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
        handleMenuToggle(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);
  
  useEffect(() => {
    const handlePopState = () => {
      handleMenuToggle(false);
      setDropdownOpen(null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  const  navRef = useRef(null);
  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (
        dropdownOpen &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setDropdownOpen(null);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [dropdownOpen]);
  
  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 w-full bg-[#f9f6f2] border-b border-[#e5e0d8] z-50 shadow-sm transition-all duration-300"
      style={{ top: bannerVisible && !menuOpen ? '44px' : '0px' }}
    >
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between px-10 lg:px-16 h-20">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3"
        >
          <img src="/Logo.png" className="object-contain h-16" alt="Calyco Logo" />
        </Link>

        <nav className="flex gap-8 text-base font-medium items-center">
          <button
            className="text-[#493657] hover:text-[#F0C85A] transition-colors"
            onClick={() => setDropdownOpen(dropdownOpen === 'products' ? null : 'products')}
          >Products</button>

          <button
            className="text-[#493657] hover:text-[#F0C85A] transition-colors"
            onClick={() => setDropdownOpen(dropdownOpen === 'inspirations' ? null : 'inspirations')}
          >Inspirations</button>

          <button
            className="text-[#493657] hover:text-[#F0C85A] transition-colors"
            onClick={() => setDropdownOpen(dropdownOpen === 'colors' ? null : 'colors')}
          >Colors</button>

          <Link
            to="/textures"
            className="text-[#493657] hover:text-[#F0C85A] transition-colors"
            onClick={() => setDropdownOpen(null)}
          >Textures</Link>

          <button
            className="text-[#493657] hover:text-[#F0C85A] transition-colors"
            onClick={() => setDropdownOpen(dropdownOpen === 'visualization' ? null : 'visualization')}
          >Visualize</button>
          <Link
            to="/about"
            className="text-[#493657] hover:text-[#F0C85A] transition-colors"
            onClick={() => setDropdownOpen(null)}
          >About</Link>
          
          <Link
            to="/contact"
            className="text-[#493657] hover:text-[#F0C85A] transition-colors"
            onClick={() => setDropdownOpen(null)}
          >Contact</Link>
        </nav>

        <div className="flex items-center">
          <CartIcon />
        </div>
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2"
        >
          <img src="/Logo.png" className="h-12 object-contain" alt="Calyco Logo" />
        </Link>

        <div className="flex items-center gap-2">
          <CartIcon />
          <button
            className="text-[#493657] text-2xl"
            onClick={() => handleMenuToggle(!menuOpen)}
            aria-label="Toggle mobile menu"
          >☰</button>
        </div>
      </div>
      
      {/* Dropdowns (desktop only) */}
      {dropdownOpen === 'products' && <ProductsDropdown onSelect={() => setDropdownOpen(null)} isMobile={false} />}
      {dropdownOpen === 'inspirations' && <InspirationsDropdown onSelect={() => setDropdownOpen(null)} isMobile={false} />}
      {dropdownOpen === 'colors' && <ColorsDropdown onSelect={() => setDropdownOpen(null)} isMobile={false} />}
      {dropdownOpen === 'visualization' && <VisualizeDropdown onSelect={() => setDropdownOpen(null)} isMobile={false} />}

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => handleMenuToggle(false)}
      />

      {/* Mobile Menu */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#f9f6f2] z-[70] transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e0d8]/80">
          <Link to="/" onClick={() => handleMenuToggle(false)} className="flex items-center">
            <img src="/Logo.png" className="h-10 object-contain" alt="Calyco Logo" />
          </Link>
          <button
            className="text-[#493657] text-2xl font-light"
            onClick={() => handleMenuToggle(false)}
            aria-label="Close mobile menu"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <nav className="flex flex-col gap-5 text-lg font-medium text-[#493657]">
            <div className="border-b border-[#e5e0d8] pb-5">
              <p className="text-xs tracking-[0.3em] uppercase text-[#8c7b96] mb-4">
                Browse
              </p>
              <div className="flex flex-col gap-4">
                <ProductsDropdown isMobile={true} onSelect={() => handleMenuToggle(false)} />
                <InspirationsDropdown isMobile={true} />
                <ColorsDropdown isMobile={true} />
              </div>
            </div>

            <div className="border-b border-[#e5e0d8] pb-5">
              <div className="flex flex-col gap-4">
                <Link
                  to="/textures"
                  className="hover:text-[#F0C85A] transition-colors"
                  onClick={() => handleMenuToggle(false)}
                >
                  Textures
                </Link>
                <VisualizeDropdown isMobile={true} />
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-4 text-base uppercase tracking-wide text-[#916e9f]">
              <Link
                to="/about"
                className="text-[#493657] hover:text-[#F0C85A] capitalize tracking-normal"
                onClick={() => handleMenuToggle(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-[#493657] hover:text-[#F0C85A] capitalize tracking-normal"
                onClick={() => handleMenuToggle(false)}
              >
                Contact Us
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
