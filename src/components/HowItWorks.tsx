import React from 'react';
import { useNavigate } from 'react-router-dom';

const HowItWorks: React.FC = () => {
    const navigate = useNavigate();

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
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-light mb-6 lowercase tracking-tight leading-tight">
                        access a range of<br />
                        eco-premium paints<br />
                        & coatings
                    </h2>
                    <p className="text-xl font-light opacity-90 max-w-2xl mx-auto mb-8 lowercase">
                        from interiors to infrastructure, calyco delivers<br />
                        safe, durable, low-voc finishes.
                    </p>
                </div>

                {/* Painter Visual */}
                <div className="flex justify-center mb-20">
                    <img
                        src="/Assets/about-us.png"
                        alt="Professional painter at work"
                        className="rounded-2xl shadow-2xl"
                    />
                </div>

                {/* Bottom Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Professional Image Card */}
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/15 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 backdrop-blur-xl overflow-hidden">
                        <div className="h-full flex items-center justify-center">
                            <img
                                src="/Assets/trust-image.png"
                                alt="Professional contractors and builders trust Calyco"
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                    </div>

                    {/* Strong Surfaces Card */}
                    <div className="bg-white/10 rounded-2xl p-12 border border-white/15 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 backdrop-blur-xl">
                        <h3 className="text-3xl font-light mb-5 lowercase tracking-tight leading-tight">
                            strong, lasting<br />
                            surfaces
                        </h3>
                        <p className="text-lg opacity-90 mb-8 lowercase leading-relaxed">
                            from interiors to industrial steel,<br />
                            calyco paints protect and<br />
                            enhance for decades.
                        </p>
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            <div
                                className="h-20 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-sm font-medium lowercase border border-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg"
                                onClick={() => handleCategoryClick('interior')}
                            >
                                interior
                            </div>
                            <div
                                className="h-20 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-sm font-medium lowercase border border-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg"
                                onClick={() => handleCategoryClick('exterior')}
                            >
                                exterior
                            </div>
                            <div
                                className="h-20 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-sm font-medium lowercase border border-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg"
                                onClick={() => handleCategoryClick('stain & sealer')}
                            >
                                stain & sealer
                            </div>
                            <div
                                className="h-20 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-sm font-medium lowercase border border-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg"
                                onClick={() => handleCategoryClick('industrial')}
                            >
                                industrial
                            </div>
                            <div
                                className="h-20 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-sm font-medium lowercase border border-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg"
                                onClick={() => handleCategoryClick('enamel')}
                            >
                                enamel
                            </div>
                            <div
                                className="h-20 bg-white/10 rounded-lg flex items-center justify-center text-white/80 text-sm font-medium lowercase border border-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg"
                                onClick={() => handleCategoryClick('show all products')}
                            >
                                show all products
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/colors')}
                            className="px-6 py-3 bg-white/15 text-white border border-white/20 rounded-lg font-medium hover:bg-white/25 transition-all duration-200 hover:-translate-y-1 backdrop-blur-sm"
                        >
                            learn more
                        </button>
                    </div>
                </div>

                {/* Promise Section */}
                <div className="mt-8 text-center bg-black/20 rounded-2xl p-16">
                    <h3 className="text-4xl font-light mb-8 lowercase tracking-tight leading-tight">
                        it's more than a paint,<br />
                        it's a promise
                    </h3>
                    <div className="w-20 h-20 bg-gradient-to-br from-[#f59e0b] to-[#f97316] rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">

                    </div>
                    <p className="text-lg opacity-90 italic lowercase">
                        a revolution in paint performance, innovation
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
