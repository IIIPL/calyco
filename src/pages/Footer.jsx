import { FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export const Footer = () => {
    const location = useLocation();
    const path  = location.pathname;
    const routeMap = {
        "/": "HomePage",
        "/about": "About Us",
        "/explore": "Explore Paint",
        "/contact": "Contact Us",
        "/faq": "FAQs",
    }

    const currentPage = routeMap[location.pathname] || "Page";
    return (
            <div className="min-h-screen bg-[#F0C85A] px-6 sm:px-10 md:px-20 pt-20">
                <section className="flex flex-col gap-10">
                    {/* Logo */}
                    <div className="relative flex items-center justify-center h-32 mt-10">
                    <a href="/">
                        <img
                        src="/Logo.png"
                        className="w-28 h-28 sm:w-32 sm:h-32 object-contain rounded-full border-transparent hover:border-white hover:scale-105 border transition-all duration-300 ease-in-out"
                        alt="Logo"
                        />
                    </a>
                    </div>

                    {/* Tagline */}
                    <div className="text-center text-sm sm:text-base px-2 sm:px-0">
                        Transforming spaces with smart, sustainable colors — powered by innovation and built for lasting beauty.
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center gap-12 font-semibold text-lg sm:text-xl mt-10 text-center">
                        <Link
                            to="/"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className={`transform hover:scale-125 transition duration-200 ${
                            path === "/" ? "font-bold underline" : ""
                            }`}
                        >
                            Homepage
                        </Link>
                        <Link
                            to="/product"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className={`transform hover:scale-125 transition duration-200 ${
                            path === "/explore" ? "font-bold underline" : ""
                            }`}
                        >
                            Explore Paint
                        </Link>
                        <Link
                            to="/about"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className={`transform hover:scale-125 transition duration-200 ${
                            path === "/about" ? "font-bold underline" : ""
                            }`}
                        >
                            About Us
                        </Link>
                        <Link
                            to="/contact"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className={`transform hover:scale-125 transition duration-200 ${
                            path === "/contact" ? "font-bold underline" : ""
                            }`}
                        >
                            Contact Us
                        </Link>
                        <Link
                            to="/faq"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className={`transform hover:scale-125 transition duration-200 ${
                            path === "/faq" ? "font-bold underline" : ""
                            }`}
                        >
                            FAQs
                        </Link>
                        
                    </div>



                    {/* Social Icons */}
                    <div className="flex flex-wrap gap-6 sm:gap-10 justify-center items-center mt-6">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="w-6 h-6 sm:w-8 sm:h-8" />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <FaYoutube className="w-6 h-6 sm:w-8 sm:h-8" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="w-6 h-6 sm:w-8 sm:h-8" />
                    </a>
                    <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp className="w-6 h-6 sm:w-8 sm:h-8" />
                    </a>
                    </div>
                </section>
            </div>
      );
};
