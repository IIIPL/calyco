import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { CartIcon } from "./CartIcon";
import InspirationsDropdown from './InspirationsDropdown';
import ColorsDropdown from "./ColorsDropdown";
import VisualizeDropdown from "./VisualizeDropdown"; // Import the new dropdown

export const Navbar = ({ bannerVisible = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  // Auto-close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  
  useEffect(() => {
    const handleResize = () => {
      const nowMobile = window.innerWidth < 768;
      if (nowMobile !== isMobileView) {
        setDropdownOpen(null);
        setMenuOpen(false);
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
    <header ref={navRef} className="fixed top-0 left-0 w-full bg-[#f9f6f2] border-b border-[#e5e0d8] z-50 shadow-sm transition-all duration-300" style={{ top: bannerVisible ? '32px' : '0px' }}>
      {/* Logo Row */}
      <div className="w-full flex justify-center items-center h-20 md:h-14">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src="/Logo.png" className="object-contain h-16 md:h-20 pt-2 mx-auto" alt="Calyco Logo" />
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex w-full justify-center items-center h-12 relative">
        <nav className="flex gap-8 text-base font-medium items-center">
          <Link
            to="/product/Nova"
            className="text-[#493657] hover:text-[#F0C85A] transition-colors"
            onClick={() => setDropdownOpen(null)}
          >Interior</Link>
          
          <Link
            to="/product/Stain%20&%20Sealer"
            className="text-[#493657] hover:text-[#F0C85A] transition-colors"
            onClick={() => setDropdownOpen(null)}
          >Stain & Sealer</Link>
          
          <button
            className="text-[#493657] hover:text-[#F0C85A] transition-colors"
            onClick={() => setDropdownOpen(dropdownOpen === 'inspirations' ? null : 'inspirations')}
          >Inspirations</button>

          <button
            className="text-[#493657] hover:text-[#F0C85A] transition-colors"
            onClick={() => setDropdownOpen(dropdownOpen === 'colors' ? null : 'colors')}
          >Colors</button>
          
          {/* // In your Navbar component, add this button to the navigation menu */}
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
        
        <div className="absolute right-8">
          <CartIcon />
        </div>
      </div>
      
      {/* Dropdowns (desktop only) */}
      {dropdownOpen === 'inspirations' && <InspirationsDropdown onSelect={() => setDropdownOpen(null)} isMobile={false} />}
      {dropdownOpen === 'colors' && <ColorsDropdown onSelect={() => setDropdownOpen(null)} isMobile={false} />}
      {dropdownOpen === 'visualization' && <VisualizeDropdown onSelect={() => setDropdownOpen(null)} isMobile={false} />}

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
          <Link
            to="/product/Nova"
            className="text-[#493657] hover:text-[#F0C85A] w-full text-left"
          >
            Interior
          </Link>
          
          <Link
            to="/product/Stain%20&%20Sealer"
            className="text-[#493657] hover:text-[#F0C85A] w-full text-left"
          >
            Stain & Sealer
          </Link>
          
          <InspirationsDropdown isMobile={true} />
          <ColorsDropdown isMobile={true} />
          
          {/* New Visualize Dropdown for mobile */}
          <VisualizeDropdown isMobile={true} />
          

          
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
      </div>
    </header>
  );
};