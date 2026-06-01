import React from 'react';
import { Link } from 'react-router-dom';
import MobileChevron from './MobileChevron';

const aboutItems = [
    { name: 'About Us', path: '/about' },
    { name: 'Manufacturing', path: '/about#manufacturing' },
    { name: 'Quality', path: '/policies/quality' },
    { name: 'Sustainability', path: '/sustainability' },
    { name: 'Blog', path: '/blog', isHighlight: true },
];

const AboutDropdown = ({ onSelect, isMobile = false }) => {
    const [open, setOpen] = React.useState(false);

    if (isMobile) {
        return (
            <div className="w-full flex flex-col items-start border-b border-[#e5e0d8]/50">
                <button
                    onClick={() => setOpen(!open)}
                    className="text-[#493657] hover:text-[#F0C85A] py-4 flex justify-between items-center w-full transition-colors duration-300"
                >
                    <span className="text-lg font-medium">About</span>
                    <MobileChevron open={open} />
                </button>
                <div
                    className={`transition-all duration-500 ease-[bezier(0.4,0,0.2,1)] overflow-hidden ${open ? "max-h-[1000px] opacity-100 mb-4" : "max-h-0 opacity-0"
                        } w-full`}
                >
                    <div className="pl-4 flex flex-col gap-3">
                        {aboutItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`text-[#493657] hover:text-[#F0C85A] transition-colors text-base ${item.isHighlight ? 'font-semibold' : 'font-medium'}`}
                                onClick={onSelect}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed left-0 top-[6.5rem] w-full bg-white/95 backdrop-blur-md border-t border-b border-[#e5e0d8] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] z-50 font-poppins transition-all duration-300">
            <div className="max-w-screen-xl mx-auto px-10 lg:px-24 py-16">
                <div className="flex gap-24">
                    <div className="w-72">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.25em] mb-8">
                            Company
                        </h3>
                        <ul className="space-y-5">
                            {aboutItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        onClick={onSelect}
                                        className={`group flex items-center gap-3 transition-colors duration-300 ${item.isHighlight ? 'text-[#493657] font-bold text-lg' : 'text-[#493657] font-medium text-lg hover:text-[#F0C85A]'}`}
                                    >
                                        <span>{item.name}</span>
                                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#F0C85A]">
                                            →
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Story/Image Snippet */}
                    <div className="flex-1 bg-[#F9F6FF] rounded-2xl p-10 flex flex-col justify-center items-start relative overflow-hidden group">
                        <div className="relative z-10">
                            <h4 className="text-3xl font-bold text-[#493657] mb-4">Our Story</h4>
                            <p className="text-[#493657]/80 mb-8 max-w-lg text-lg leading-relaxed font-light">
                                Discover how Calyco is redefining the paint industry with eco-premium products designed for the modern home.
                            </p>
                            <Link
                                to="/about"
                                onClick={onSelect}
                                className="inline-flex items-center gap-2 text-[#493657] font-bold uppercase tracking-wider text-sm border-b-2 border-[#F0C85A] pb-1 hover:text-[#F0C85A] transition-colors"
                            >
                                Read more <span className="text-lg">→</span>
                            </Link>
                        </div>
                        {/* Decorative circle */}
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#f3eaf7] z-0 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutDropdown;
