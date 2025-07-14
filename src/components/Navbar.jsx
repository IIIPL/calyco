import { Link } from "react-router-dom";
import { useState } from "react";
import { CartIcon } from "./CartIcon";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-[#f9f6f2] border-b border-[#e5e0d8] z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
                {/* Logo Section */}
                <Link 
                    to="/" 
                    className="flex items-center gap-2" 
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    <img
                        src="/Logo.png"
                        className="object-contain max-h-16"
                        alt="Calyco Logo"
                    />
                </Link>

                {/* Centered Navigation Menu (Desktop) */}
                <nav className="hidden md:flex gap-8 text-base font-medium items-center mx-auto">
                    <Link 
                        to="/product" 
                        className="text-[#493657] hover:text-[#F0C85A] transition-colors"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        Products
                    </Link>
                    <Link 
                        to="/about" 
                        className="text-[#493657] hover:text-[#F0C85A] transition-colors"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        About Us
                    </Link>
                    <Link 
                        to="/contact" 
                        className="text-[#493657] hover:text-[#F0C85A] transition-colors"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        Contact Us
                    </Link>
                </nav>

                {/* Right Side Action Buttons (Desktop) */}
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2 border border-[#493657] rounded-lg text-[#493657] bg-white hover:bg-[#f3e9d2] font-semibold transition-colors">
                        Color Guide
                    </button>
                    <button className="px-5 py-2 rounded-lg text-white bg-[#493657] hover:bg-[#F0C85A] hover:text-[#493657] font-semibold transition-colors">
                        Get Quote
                    </button>
                    <CartIcon />
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center gap-2 ml-2">
                    <button
                        className="text-[#493657] text-2xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <nav className="flex flex-col gap-4 p-4 md:hidden bg-[#f9f6f2] border-t border-[#e5e0d8] shadow-md">
                    <Link 
                        to="/product" 
                        onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                        className="text-[#493657] hover:text-[#F0C85A] transition-colors"
                    >
                        Products
                    </Link>
                    <Link 
                        to="/about" 
                        onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                        className="text-[#493657] hover:text-[#F0C85A] transition-colors"
                    >
                        About Us
                    </Link>
                    <Link 
                        to="/contact" 
                        onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
                        className="text-[#493657] hover:text-[#F0C85A] transition-colors"
                    >
                        Contact Us
                    </Link>
                    <button className="px-5 py-2 border border-[#493657] rounded-lg text-[#493657] bg-white hover:bg-[#f3e9d2] font-semibold transition-colors text-left">
                        Color Guide
                    </button>
                    <button className="px-5 py-2 rounded-lg text-white bg-[#493657] hover:bg-[#F0C85A] hover:text-[#493657] font-semibold transition-colors text-left">
                        Get Quote
                    </button>
                </nav>
            )}
        </header>
    );
};