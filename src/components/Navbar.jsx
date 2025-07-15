import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { CartIcon } from "./CartIcon";
import { ProductsDropdown } from "./ProductsDropdown";

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

    // Handlers for dropdowns (desktop)
    const handleDropdownEnter = (key) => {
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
        setDropdownOpen(key);
    };
    const handleDropdownLeave = () => {
        dropdownTimeout.current = setTimeout(() => setDropdownOpen(null), 400);
    };

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
                    <div
                        className="relative group"
                        onMouseEnter={() => handleDropdownEnter('products')}
                        onMouseLeave={handleDropdownLeave}
                    >
                        <button className="text-[#493657] hover:text-[#F0C85A] transition-colors focus:outline-none">Products</button>
                        <div
                            onMouseEnter={() => handleDropdownEnter('products')}
                            onMouseLeave={handleDropdownLeave}
                            className={`pointer-events-none opacity-0 ${dropdownOpen === 'products' ? 'opacity-100 pointer-events-auto transition-opacity duration-150' : 'transition-opacity duration-500'}`}
                        >
                            {dropdowns.products}
                        </div>
                    </div>
                    {/* Samples */}
                    <div
                        className="relative group"
                        onMouseEnter={() => handleDropdownEnter('samples')}
                        onMouseLeave={handleDropdownLeave}
                    >
                        <button className="text-[#493657] hover:text-[#F0C85A] transition-colors focus:outline-none">Samples</button>
                        <div
                            onMouseEnter={() => handleDropdownEnter('samples')}
                            onMouseLeave={handleDropdownLeave}
                            className={`pointer-events-none opacity-0 ${dropdownOpen === 'samples' ? 'opacity-100 pointer-events-auto transition-opacity duration-150' : 'transition-opacity duration-500'}`}
                        >
                            {dropdowns.samples}
                        </div>
                    </div>
                    {/* Tools */}
                    <div
                        className="relative group"
                        onMouseEnter={() => handleDropdownEnter('tools')}
                        onMouseLeave={handleDropdownLeave}
                    >
                        <button className="text-[#493657] hover:text-[#F0C85A] transition-colors focus:outline-none">Tools</button>
                        <div
                            onMouseEnter={() => handleDropdownEnter('tools')}
                            onMouseLeave={handleDropdownLeave}
                            className={`pointer-events-none opacity-0 ${dropdownOpen === 'tools' ? 'opacity-100 pointer-events-auto transition-opacity duration-150' : 'transition-opacity duration-500'}`}
                        >
                            {dropdowns.tools}
                        </div>
                    </div>
                    {/* Consultations */}
                    <div
                        className="relative group"
                        onMouseEnter={() => handleDropdownEnter('consultations')}
                        onMouseLeave={handleDropdownLeave}
                    >
                        <button className="text-[#493657] hover:text-[#F0C85A] transition-colors focus:outline-none">Consultations</button>
                        <div
                            onMouseEnter={() => handleDropdownEnter('consultations')}
                            onMouseLeave={handleDropdownLeave}
                            className={`pointer-events-none opacity-0 ${dropdownOpen === 'consultations' ? 'opacity-100 pointer-events-auto transition-opacity duration-150' : 'transition-opacity duration-500'}`}
                        >
                            {dropdowns.consultations}
                        </div>
                    </div>
                    {/* About */}
                    <div
                        className="relative group"
                        onMouseEnter={() => handleDropdownEnter('about')}
                        onMouseLeave={handleDropdownLeave}
                    >
                        <button className="text-[#493657] hover:text-[#F0C85A] transition-colors focus:outline-none">About</button>
                        <div
                            onMouseEnter={() => handleDropdownEnter('about')}
                            onMouseLeave={handleDropdownLeave}
                            className={`pointer-events-none opacity-0 ${dropdownOpen === 'about' ? 'opacity-100 pointer-events-auto transition-opacity duration-150' : 'transition-opacity duration-500'}`}
                        >
                            {dropdowns.about}
                        </div>
                    </div>
                    {/* Trade */}
                    <div
                        className="relative group"
                        onMouseEnter={() => handleDropdownEnter('trade')}
                        onMouseLeave={handleDropdownLeave}
                    >
                        <button className="text-[#493657] hover:text-[#F0C85A] transition-colors focus:outline-none">Trade</button>
                        <div
                            onMouseEnter={() => handleDropdownEnter('trade')}
                            onMouseLeave={handleDropdownLeave}
                            className={`pointer-events-none opacity-0 ${dropdownOpen === 'trade' ? 'opacity-100 pointer-events-auto transition-opacity duration-150' : 'transition-opacity duration-500'}`}
                        >
                            {dropdowns.trade}
                        </div>
                    </div>
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
                <div className="fixed inset-0 bg-[#f9f6f2] z-50 flex flex-col">
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
                    <nav className="flex flex-col gap-6 text-xl font-medium items-center flex-1">
                        <div className="w-full flex flex-col items-center">
                            <button
                                className="text-[#493657] hover:text-[#F0C85A] transition-colors flex items-center gap-2"
                                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                            >
                                Products
                                <span className={`transform transition-transform ${mobileProductsOpen ? 'rotate-90' : ''}`}>▶</span>
                            </button>
                            {mobileProductsOpen && (
                                <div className="w-full flex flex-col gap-2 mt-2 pl-4">
                                    <span className="text-[#493657]">By design</span>
                                    <span className="text-[#493657]">By colour</span>
                                    <span className="text-[#493657]">By room</span>
                                    <span className="text-[#493657]">By type</span>
                                </div>
                            )}
                        </div>
                        <Link to="#" className="text-[#493657] hover:text-[#F0C85A] transition-colors" onClick={() => setMenuOpen(false)}>Samples</Link>
                        <Link to="#" className="text-[#493657] hover:text-[#F0C85A] transition-colors" onClick={() => setMenuOpen(false)}>Tools</Link>
                        <Link to="#" className="text-[#493657] hover:text-[#F0C85A] transition-colors" onClick={() => setMenuOpen(false)}>Consultations</Link>
                        <Link to="#" className="text-[#493657] hover:text-[#F0C85A] transition-colors" onClick={() => setMenuOpen(false)}>About</Link>
                        <Link to="#" className="text-[#493657] hover:text-[#F0C85A] transition-colors" onClick={() => setMenuOpen(false)}>Trade</Link>
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