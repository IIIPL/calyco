import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { useState } from "react";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
                {/* Logo */}
                <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <img
                        src="/Logo.png"
                        className="object-contain max-h-12 sm:max-h-14 md:max-h-16"
                        alt="Logo"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-4 text-sm md:text-base">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black inline-flex items-center gap-1">
                        Catalogue <FiExternalLink className="text-xs" />
                    </a>
                    <Link to="/contact" className="text-gray-700 hover:text-black" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Contact Us</Link>
                    <Link to="/about" className="text-gray-700 hover:text-black" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>About Us</Link>
                    <Link to="/product" className="text-gray-700 hover:text-black" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Products</Link>
                    
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <nav className="flex flex-col gap-4 p-4 md:hidden bg-white shadow-md">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black inline-flex items-center gap-1">
                        Catalogue <FiExternalLink className="text-xs" />
                    </a>
                    <Link to="/contact" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Contact Us</Link>
                    <Link to="/about" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>About Us</Link>
                    <Link to="/product" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Products</Link>
                </nav>
            )}
        </header>
    );
};
