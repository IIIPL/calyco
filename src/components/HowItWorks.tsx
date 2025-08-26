import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HowItWorks: React.FC = () => {
    const navigate = useNavigate();
    const [hoveredCategory, setHoveredCategory] = useState('default');

    // Image mapping for each category
    const categoryImages = {
        'interior': '/Assets/InteriorInspiratoin/living-room.png',
        'exterior': '/Assets/CalmXterior/inuse.png',
        'stain & sealer': '/Assets/Defense/NoBg.png',
        'industrial': '/Assets/ThermaCool/NoBg.png',
        'enamel': '/Assets/FastDryingEnamel/ontable.png',
        'show all products': '/Assets/color-banner.png',
        'default': '/Assets/InteriorInspiratoin/living-room.png'
    };

    const handleCategoryClick = (category: string) => {
        switch (category) {
            case 'interior':
                navigate('/product/Nova');
                break;
            case 'exterior':
                navigate('/product/CalmXterior');
                break;
            case 'stain & sealer':
                navigate('/product/Defense');
                break;
            case 'industrial':
                navigate('/product/ThermaCool');
                break;
            case 'enamel':
                navigate('/product/Fast%20Drying%20Enamel');
                break;
            case 'show all products':
                navigate('/products');
                break;
            default:
                break;
        }
    };

    return (
        <section className="py-20 bg-[#B0732B] text-white relative min-h-[160vh] z-10">
            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-20">
                {/* Painter Visual with Text */}
                <div className="flex justify-center mb-20">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/15 max-w-4xl w-full">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight text-white">
                                access a range of<br />
                                eco-premium paints<br />
                                & coatings
                            </h2>
                            <p className="text-xl font-light opacity-90 max-w-2xl mx-auto mb-8 text-white">
                                from interiors to infrastructure, calyco delivers<br />
                                safe, durable, low-voc finishes.
                            </p>
                            <button
                                onClick={() => navigate('/products')}
                                className="px-8 py-4 bg-[#1a1a2e] text-white border border-[#16213e] rounded-lg font-semibold hover:bg-[#16213e] hover:border-[#0f3460] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl backdrop-blur-sm mb-6 transform hover:scale-105"
                            >
                                Explore Products
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <img
                                src="/Assets/painter.webp"
                                alt="Professional painter at work"
                                className="rounded-2xl shadow-2xl w-4/5 md:w-3/4 lg:w-2/3"
                            />
                        </div>
                    </div>
                </div>

                {/* Lower Section - Content Cards */}
                <div className="rounded-3xl p-8 pt-0 min-h-[900px] max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center">
                        {/* Left Card */}
                        <div className="rounded-2xl p-6 h-[900px] flex flex-col items-center justify-center gap-6 backdrop-blur-xl" style={{ backgroundColor: 'rgba(0, 0, 0, 0.12)' }}>
                            <div className="text-center">
                                <h3 className="text-4xl md:text-6xl font-bold text-white mb-2">
                                    Moving in the
                                </h3>
                                <p className="text-[#D6A847] text-2xl md:text-4xl font-semibold">right direction</p>
                            </div>

                            {/* Hero-style Image Wrapper */}
                            <div className="w-full flex justify-center">
                                <div className="w-full max-w-2xl h-[320px] md:h-[360px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/20 bg-white/10">
                                    <img
                                        key={hoveredCategory}
                                        src={categoryImages[hoveredCategory]}
                                        alt={`${hoveredCategory} painting and construction`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="text-center max-w-md w-full">
                                <p className="text-white/90 mb-4 leading-relaxed">
                                    Discover the right Calyco system for every project — engineered to protect, beautify, and last.
                                </p>

                            </div>
                        </div>

                        {/* Right Card */}
                        <div className="rounded-2xl p-6 h-[900px] flex flex-col backdrop-blur-xl" style={{ backgroundColor: 'rgba(0, 0, 0, 0.12)' }}>
                            {/* Top-only header */}
                            <div className="text-center max-w-md w-full self-center pt-4 mb-2">
                                <h3 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight leading-[0.95]">Paint smarter,</h3>
                                <p className="text-[#D6A847] text-2xl md:text-3xl lg:text-4xl font-semibold leading-[0.95]">last longer.</p>
                            </div>

                            {/* Centered remainder */}
                            <div className="flex-1 flex flex-col items-center justify-center gap-4 pt-0">
                                {/* Image between headline and paragraph */}
                                <div className="w-full flex justify-center">
                                    <img
                                        src="/Assets/alialshekh717_ultra-realistic_3D_render_of_an_8-meter_circular__31ec9a6f-1a6e-4555-907e-ddc6795b4aaf.png"
                                        alt="Calyco premium paints visual"
                                        className="w-full max-w-xs rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/20 bg-white/10"
                                    />
                                </div>
                                <div className="text-center max-w-md w-full">
                                    <p className="text-white/90 mb-4 leading-relaxed">
                                        Find premium, durable paints in the Calyco range, to help you protect and enhance your surfaces.
                                    </p>
                                    <button
                                        onClick={() => navigate('/products')}
                                        className="bg-[#B88A2E] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#D6A847] transition-colors mb-4 w-full"
                                    >
                                        Get started
                                    </button>
                                </div>

                                {/* Category Grid */}
                                <div className="grid grid-cols-3 gap-2 max-w-md w-full">
                                    <div
                                        className="h-12 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-white/20"
                                        onClick={() => handleCategoryClick('interior')}
                                        onMouseEnter={() => setHoveredCategory('interior')}
                                        onMouseLeave={() => setHoveredCategory('default')}
                                    >
                                        interior
                                    </div>
                                    <div
                                        className="h-12 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-white/20"
                                        onClick={() => handleCategoryClick('exterior')}
                                        onMouseEnter={() => setHoveredCategory('exterior')}
                                        onMouseLeave={() => setHoveredCategory('default')}
                                    >
                                        exterior
                                    </div>
                                    <div
                                        className="h-12 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-white/20"
                                        onClick={() => handleCategoryClick('stain & sealer')}
                                        onMouseEnter={() => setHoveredCategory('stain & sealer')}
                                        onMouseLeave={() => setHoveredCategory('default')}
                                    >
                                        stain & sealer
                                    </div>
                                    <div
                                        className="h-12 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-white/20"
                                        onClick={() => handleCategoryClick('industrial')}
                                        onMouseEnter={() => setHoveredCategory('industrial')}
                                        onMouseLeave={() => setHoveredCategory('default')}
                                    >
                                        industrial
                                    </div>
                                    <div
                                        className="h-12 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-white/20"
                                        onClick={() => handleCategoryClick('enamel')}
                                        onMouseEnter={() => setHoveredCategory('enamel')}
                                        onMouseLeave={() => setHoveredCategory('default')}
                                    >
                                        enamel
                                    </div>
                                    <div
                                        className="h-12 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-white/20"
                                        onClick={() => handleCategoryClick('show all products')}
                                        onMouseEnter={() => setHoveredCategory('show all products')}
                                        onMouseLeave={() => setHoveredCategory('default')}
                                    >
                                        show all
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
