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
        <section className="py-20 bg-gradient-to-br from-[#4a3f35] via-[#8b6914] to-[#d4a574] text-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">


                {/* Painter Visual with Text */}
                <div className="flex justify-center mb-20">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/15 max-w-4xl">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 lowercase tracking-tight leading-tight text-white">
                                access a range of<br />
                                eco-premium paints<br />
                                & coatings
                            </h2>
                            <p className="text-xl font-light opacity-90 max-w-2xl mx-auto mb-8 lowercase text-white">
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

                {/* Two Sections - Vertically Divided */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Upper Section - Dynamic Image */}
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/15 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 backdrop-blur-xl overflow-hidden h-[700px]">
                        <div className="h-full flex items-center justify-center">
                            <img
                                key={hoveredCategory}
                                src={categoryImages[hoveredCategory]}
                                alt={`${hoveredCategory} painting and construction`}
                                className="w-full h-full object-cover rounded-xl transition-all duration-500 ease-in-out opacity-100"
                                style={{
                                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Lower Section - Strong Surfaces */}
                    <div className="bg-white/10 rounded-2xl p-12 border border-white/15 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 backdrop-blur-xl h-[700px]">
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 lowercase tracking-tight leading-tight">
                            strong, lasting<br />
                            surfaces
                        </h3>
                        <p className="text-lg opacity-90 mb-8 lowercase leading-relaxed max-w-none">
                            from interiors to industrial steel, calyco paints protect and enhance for decades.
                        </p>
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            <div
                                className="h-20 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-base font-medium lowercase border border-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg"
                                onClick={() => handleCategoryClick('interior')}
                                onMouseEnter={() => setHoveredCategory('interior')}
                                onMouseLeave={() => setHoveredCategory('default')}
                            >
                                interior
                            </div>
                            <div
                                className="h-20 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-base font-medium lowercase border border-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg"
                                onClick={() => handleCategoryClick('exterior')}
                                onMouseEnter={() => setHoveredCategory('exterior')}
                                onMouseLeave={() => setHoveredCategory('default')}
                            >
                                exterior
                            </div>
                            <div
                                className="h-20 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-base font-medium lowercase border border-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg"
                                onClick={() => handleCategoryClick('stain & sealer')}
                                onMouseEnter={() => setHoveredCategory('stain & sealer')}
                                onMouseLeave={() => setHoveredCategory('default')}
                            >
                                stain & sealer
                            </div>
                            <div
                                className="h-20 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-base font-medium lowercase border border-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg"
                                onClick={() => handleCategoryClick('industrial')}
                                onMouseEnter={() => setHoveredCategory('industrial')}
                                onMouseLeave={() => setHoveredCategory('default')}
                            >
                                industrial
                            </div>
                            <div
                                className="h-20 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-base font-medium lowercase border border-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg"
                                onClick={() => handleCategoryClick('enamel')}
                                onMouseEnter={() => setHoveredCategory('enamel')}
                                onMouseLeave={() => setHoveredCategory('default')}
                            >
                                enamel
                            </div>
                            <div
                                className="h-20 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-base font-medium lowercase border border-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg"
                                onClick={() => handleCategoryClick('show all products')}
                                onMouseEnter={() => setHoveredCategory('show all products')}
                                onMouseLeave={() => setHoveredCategory('default')}
                                onMouseLeave={() => setHoveredCategory('default')}
                            >
                                show all products
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </section>
    );
};

export default HowItWorks;
