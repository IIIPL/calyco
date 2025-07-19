import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { CartIcon } from "./CartIcon";
import { ProductsDropdown } from "./ProductsDropdown";
import InspirationsDropdown from './InspirationsDropdown';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const drawerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    const handlePopState = () => {
      setMenuOpen(false);
      setDropdownOpen(null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  
  return (
    <header className="fixed top-0 left-0 w-full bg-[#f9f6f2] border-b border-[#e5e0d8] z-50 shadow-sm">
      {/* Logo Row */}
      <div className="w-full flex justify-center items-center h-20 md:h-14">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src="/Logo.png" className="object-contain h-16 md:h-20 pt-2 mx-auto" alt="Calyco Logo" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex w-full justify-center items-center h-12 relative">
        <nav className="flex gap-8 text-base font-medium items-center">
          <button
            className="text-[#493657] hover:text-[#F0C85A] transition-colors"
            onClick={() => setDropdownOpen(dropdownOpen === 'products' ? null : 'products')}
          >Products</button>

          <button
            className="text-[#493657] hover:text-[#F0C85A] transition-colors"
            onClick={() => setDropdownOpen(dropdownOpen === 'inspirations' ? null : 'inspirations')}
          >Inspirations</button>

          <Link
            to="/about"
            className="text-[#493657] hover:text-[#F0C85A] transition-colors"
            onClick={() => setDropdownOpen(null)}
          >About</Link>
        </nav>
        <div className="absolute right-8">
          <CartIcon />
        </div>
      </div>

      {/* Dropdowns (desktop only) */}
      {dropdownOpen === 'products' && <ProductsDropdown onSelect={() => setDropdownOpen(null)} isMobile={false} />}
      {dropdownOpen === 'inspirations' && <InspirationsDropdown onSelect={() => setDropdownOpen(null)} isMobile={false} />}

      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center gap-2 ml-2 absolute top-0 right-0 h-20">
        <CartIcon />
        <button
          className="text-[#493657] text-2xl mr-3"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
        >☰</button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#f9f6f2] z-50 transform transition-transform duration-300 ease-in-out shadow-lg flex flex-col overflow-y-auto ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          className="absolute top-6 right-6 text-3xl text-[#493657]"
          onClick={() => setMenuOpen(false)}
        >&times;</button>

        <div className="flex justify-center items-center mt-8 mb-8">
          <Link to="/">
            <img src="/Logo.png" className="object-contain max-h-16 mx-auto" alt="Calyco Logo" />
          </Link>
        </div>

        <div className="flex flex-col gap-6 text-xl font-medium items-center flex-1 w-full px-4">
          <ProductsDropdown isMobile={true} />
          <InspirationsDropdown isMobile={true} />

          <Link
            to="/samples"
            className="text-[#493657] hover:text-[#F0C85A] w-full text-left"
          >
            Samples
          </Link>
          <Link
            to="/about"
            className="text-[#493657] hover:text-[#F0C85A] w-full text-left"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-[#493657] hover:text-[#F0C85A] w-full text-left"
          >
            Contact Us
          </Link>
        </div>

        {/* <div className="flex justify-center items-center mb-8 mt-auto">
          <CartIcon />
        </div> */}
      </div>
    </header>
  );
};
