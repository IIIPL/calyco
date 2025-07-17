import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { CartIcon } from "./CartIcon";
import { ProductsDropdown } from "./ProductsDropdown";
import React from "react"; // Added for useEffect
import { products as allProducts } from "../data/products";

const NavDropdown = ({ children }) => (
  <div className="fixed left-0 top-[6.5rem] w-full bg-white border-t border-b border-[#e5e0d8] shadow-lg z-50">
    <div className="max-w-screen-xl mx-auto px-24 py-14 flex items-start">
      {children}
    </div>
  </div>
);

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(null); // null or menu key
    const dropdownTimeout = useRef(null);

    // Add for mobile collapsible categories
    const [mobileCategoryOpen, setMobileCategoryOpen] = useState({});

    // Group products by category
    const categories = [
      { key: "Interior", label: "Interior Paints" },
      { key: "Exterior", label: "Exterior Paints" },
      { key: "Industrial", label: "Industrial" },
      { key: "Enamel", label: "Enamel" },
    ];
    const grouped = {
      Interior: allProducts.filter(p => p.category && p.category.toLowerCase() === "interior"),
      Exterior: allProducts.filter(p => p.category && p.category.toLowerCase() === "exterior"),
      Industrial: allProducts.filter(p => p.category && p.category.toLowerCase().includes("industrial")),
      Enamel: allProducts.filter(p => p.category && p.category.toLowerCase().includes("enamel")),
    };

    // Dropdown open/close handlers (click only)
    const handleDropdownClick = (key) => {
        setDropdownOpen(prev => (prev === key ? null : key));
    };
    // Close dropdown on outside click
    React.useEffect(() => {
        const handleClick = (e) => {
            if (!e.target.closest('.navbar-dropdown-trigger') && !e.target.closest('.navbar-dropdown-content')) {
                setDropdownOpen(null);
            }
        };
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClick);
        } else {
            document.removeEventListener('mousedown', handleClick);
        }
        return () => document.removeEventListener('mousedown', handleClick);
    }, [dropdownOpen]);

    // Dropdown content for each menu
    const dropdowns = {
        products: <ProductsDropdown onSelect={() => setDropdownOpen(null)} />, 
        samples: (
          <NavDropdown>
            <div className="text-[#493657] text-lg font-semibold">Samples Dropdown Content</div>
          </NavDropdown>
        ),
        tools: (
          <NavDropdown>
            <div className="text-[#493657] text-lg font-semibold">Tools Dropdown Content</div>
          </NavDropdown>
        ),
        consultations: (
          <NavDropdown>
            <div className="text-[#493657] text-lg font-semibold">Consultations Dropdown Content</div>
          </NavDropdown>
        ),
        about: (
          <NavDropdown>
            <div className="text-[#493657] text-lg font-semibold">About Dropdown Content</div>
          </NavDropdown>
        ),
        trade: (
          <NavDropdown>
            <div className="text-[#493657] text-lg font-semibold">Trade Dropdown Content</div>
          </NavDropdown>
        ),
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-[#f9f6f2] border-b border-[#e5e0d8] z-50 shadow-sm">
            {/* Logo Row (always visible, centered) */}
            <div className="w-full flex justify-center items-center h-20 md:h-14">
                <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <img src="/Logo.png" className="object-contain h-16 md:h-20 pt-2 mx-auto" alt="Calyco Logo" />
                </Link>
            </div>
            {/* Menu Row (desktop only) */}
            <div className="hidden md:flex w-full justify-center items-center h-12 relative">
                <nav className="flex gap-8 text-base font-medium items-center">
                    {/* Products */}
                    <div className="relative navbar-dropdown-trigger">
                        <button
                            className="text-[#493657] hover:text-[#F0C85A] transition-colors focus:outline-none"
                            onClick={() => handleDropdownClick('products')}
                        >Products</button>
                        <div
                            className={`navbar-dropdown-content pointer-events-none opacity-0 ${dropdownOpen === 'products' ? 'opacity-100 pointer-events-auto transition-opacity duration-150' : 'transition-opacity duration-500'}`}
                        >
                            {dropdowns.products}
                        </div>
                    </div>
                    {/* Samples */}
                    <div className="relative navbar-dropdown-trigger">
                        <button
                            className="text-[#493657] hover:text-[#F0C85A] transition-colors focus:outline-none"
                            onClick={() => handleDropdownClick('samples')}
                        >Samples</button>
                        <div
                            className={`navbar-dropdown-content pointer-events-none opacity-0 ${dropdownOpen === 'samples' ? 'opacity-100 pointer-events-auto transition-opacity duration-150' : 'transition-opacity duration-500'}`}
                        >
                            {dropdowns.samples}
                        </div>
                    </div>
                    {/* About (as a simple link) */}
                    <Link
                        to="/about"
                        className="text-[#493657] hover:text-[#F0C85A] transition-colors focus:outline-none"
                        onClick={() => setDropdownOpen(null)}
                    >
                        About
                    </Link>
                </nav>
                <div className="absolute right-8">
                    <CartIcon />
                </div>
            </div>
            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-2 ml-2 absolute top-0 right-0 h-20">
                <button
                    className="text-[#493657] text-2xl mr-3"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    ☰
                </button>
            </div>
            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="fixed inset-0 bg-[#f9f6f2] z-50 flex flex-col overflow-y-auto">
                    {/* Close button */}
                    <button
                        className="absolute top-6 right-6 text-3xl text-[#493657]"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close mobile menu"
                    >
                        &times;
                    </button>
                    {/* Centered Logo */}
                    <div className="flex justify-center items-center mt-8 mb-8">
                        <Link to="/" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                            <img src="/Logo.png" className="object-contain max-h-16 mx-auto" alt="Calyco Logo" />
                        </Link>
                    </div>
                    {/* Menu Items */}
                    <nav className="flex flex-col gap-6 text-xl font-medium items-center flex-1 w-full px-4">
                        {/* Products collapsible */}
                        <div className="w-full flex flex-col items-start">
                            <button
                                className="text-[#493657] hover:text-[#F0C85A] transition-colors flex items-center gap-2 w-full justify-between"
                                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                            >
                                <span>Products</span>
                                <span className={`transform transition-transform ${mobileProductsOpen ? 'rotate-90' : ''}`}>▶</span>
                            </button>
                            {mobileProductsOpen && (
                                <div className="w-full flex flex-col gap-2 mt-2 pl-4">
                                    <Link
                                        to="/product"
                                        className="text-[#493657] hover:text-[#F0C85A] py-1"
                                        onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    >
                                        Explore All Products
                                    </Link>
                                    {categories.map(cat => (
                                        <div key={cat.key} className="w-full">
                                            <button
                                                className="flex items-center gap-2 text-[#493657] hover:text-[#F0C85A] w-full py-1"
                                                onClick={() => setMobileCategoryOpen(prev => ({ ...prev, [cat.key]: !prev[cat.key] }))}
                                            >
                                                <span>{cat.label}</span>
                                                <span className={`transform transition-transform ${mobileCategoryOpen[cat.key] ? 'rotate-90' : ''}`}>▶</span>
                                            </button>
                                            {mobileCategoryOpen[cat.key] && (
                                                <div className="pl-4 flex flex-col gap-1">
                                                    {grouped[cat.key].length === 0 && (
                                                        <span className="text-[#493657]/60 italic text-base">No products</span>
                                                    )}
                                                    {grouped[cat.key].map(product => (
                                                        <Link
                                                            key={product.name}
                                                            to={`/product/${product.name}`}
                                                            className="text-[#493657] hover:text-[#F0C85A] text-base py-1"
                                                            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                                        >
                                                            {product.display_name || product.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* Samples */}
                        <Link to="#" className="text-[#493657] hover:text-[#F0C85A] transition-colors w-full text-left" onClick={() => setMenuOpen(false)}>Samples</Link>
                        {/* About Us */}
                        <Link to="/about" className="text-[#493657] hover:text-[#F0C85A] transition-colors w-full text-left" onClick={() => setMenuOpen(false)}>About Us</Link>
                    </nav>
                    {/* Cart Icon at the bottom */}
                    <div className="flex justify-center items-center mb-8 mt-auto">
                        <CartIcon />
                    </div>
                </div>
            )}
        </header>
    );
}