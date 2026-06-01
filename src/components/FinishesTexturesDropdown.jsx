import React from 'react';
import { Link } from 'react-router-dom';
import MobileChevron from './MobileChevron';

const finishes = [
    { name: 'Matte', description: 'Smooth, non-reflective finish', path: '/products?finish=matte' },
    { name: 'Satin', description: 'Silky, soft sheen', path: '/products?finish=satin' },
    { name: 'Gloss', description: 'Shiny and durable', path: '/products?finish=gloss' },
    { name: 'High Gloss', description: 'Mirror-like reflection', path: '/products?finish=high-gloss' },
    { name: 'Metallic', description: 'Shimmering metallic effect', path: '/products?finish=metallic' },
];

const textures = [
    { name: 'Calyco Texture Paint', path: '/product/calyco-texture-paint' },
    { name: 'View All Textures', path: '/textures', isHighlight: true },
];

const FinishesTexturesDropdown = ({ onSelect, isMobile = false }) => {
    const [open, setOpen] = React.useState(false);

    if (isMobile) {
        return (
            <div className="w-full flex flex-col items-start border-b border-[#e5e0d8]/50 last:border-0">
                <button
                    onClick={() => setOpen(!open)}
                    className="text-[#493657] hover:text-[#F0C85A] py-4 flex justify-between items-center w-full transition-colors duration-300"
                >
                    <span className="text-lg font-medium">Finishes & Textures</span>
                    <MobileChevron open={open} />
                </button>
                <div
                    className={`transition-all duration-500 ease-[bezier(0.4,0,0.2,1)] overflow-hidden ${open ? "max-h-[1000px] opacity-100 mb-4" : "max-h-0 opacity-0"
                        } w-full`}
                >
                    <div className="pl-4 flex flex-col gap-6">
                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Finishes</h4>
                            <div className="flex flex-col gap-3">
                                {finishes.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className="text-[#493657] hover:text-[#F0C85A] transition-colors text-base"
                                        onClick={onSelect}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Textures</h4>
                            <div className="flex flex-col gap-3">
                                {textures.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`text-[#493657] hover:text-[#F0C85A] transition-colors text-base ${item.isHighlight ? 'font-semibold' : ''}`}
                                        onClick={onSelect}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed left-0 top-[6.5rem] w-full bg-white/95 backdrop-blur-md border-t border-b border-[#e5e0d8] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] z-50 font-poppins transition-all duration-300">
            <div className="max-w-screen-xl mx-auto px-10 lg:px-24 py-16 flex gap-24">

                {/* Finishes Column */}
                <div className="flex-1 max-w-sm">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.25em] mb-8">
                        Finishes
                    </h3>
                    <ul className="space-y-6">
                        {finishes.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    onClick={onSelect}
                                    className="group block"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-[#493657] font-medium text-xl group-hover:text-[#F0C85A] transition-colors duration-300">
                                            {item.name}
                                        </span>
                                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#F0C85A]">
                                            →
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1 max-w-[250px] font-light leading-relaxed group-hover:text-gray-500 transition-colors">
                                        {item.description}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Textures Column */}
                <div className="flex-1 max-w-sm border-l border-gray-100 pl-16">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.25em] mb-8">
                        Textures
                    </h3>
                    <ul className="space-y-5">
                        {textures.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    onClick={onSelect}
                                    className={`group flex items-center gap-3 text-lg transition-colors duration-300 ${item.isHighlight ? 'text-[#493657] font-bold hover:text-[#F0C85A]' : 'text-[#493657] font-medium hover:text-[#F0C85A]'}`}
                                >
                                    <span>{item.name}</span>
                                    {item.isHighlight && (
                                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#F0C85A]">
                                            →
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FinishesTexturesDropdown;
