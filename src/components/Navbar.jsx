import { FiExternalLink } from "react-icons/fi";

export const Navbar = () => {
  return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-20">
            <div className="max-w-7xl mx-auto h-full px-4 flex flex-wrap items-center justify-between">
                
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <a href="/">
                        <img
                            src="/Logo.png"
                            className="object-contain max-h-12 sm:max-h-14 md:max-h-16"
                            alt="Logo"
                        />
                    </a>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-wrap gap-4 text-sm sm:text-base mt-2 sm:mt-0">
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-black inline-flex items-center gap-1"
                    >
                        Catalogue
                        <FiExternalLink className="text-xs" />
                    </a>

                    <a href="/contact" className="text-gray-700 hover:text-black">
                        Contact Us
                    </a>

                    <a href="/about" className="text-gray-700 hover:text-black">
                        About Us
                    </a>

                    <a href="/product" className="text-gray-700 hover:text-black">
                        Products
                    </a>        
                    <a href="/product/nova" className="text-gray-700 hover:text-black">
                        Nova
                    </a>
                    <a href="/product/defense" className="text-gray-700 hover:text-black">
                        Defense
                    </a>        
                    
                </nav>
            </div>
        </header>
  );
};
