import React from 'react';
import CardHow, { CardHowProps } from './CardHow';

const items: CardHowProps[] = [
    {
        title: 'Faster Projects',
        body: 'One-coat, quick-dry paints that save time.',
        ctaLabel: 'Get Started',
        href: '#',
        imgSrc: '/Assets/Inspiration/bedroom.jpg',
        imgAlt: 'Painter with roller in bright Calyco green room',
    },
    {
        title: 'Trusted by Builders',
        body: 'Chosen for major residential & commercial projects.',
        ctaLabel: 'Request Quote',
        href: '#',
        imgSrc: '/Assets/Inspiration/living.jpg',
        imgAlt: 'Large residential lobby painted in beige/grey Calyco tone',
    },
    {
        title: 'Built to Last',
        body: 'Durable, scrub-resistant, guaranteed 10+ years.',
        ctaLabel: 'Explore Finishes',
        href: '#',
        imgSrc: '/Assets/Inspiration/dining.jpg',
        imgAlt: 'Family sitting happily in a newly painted living room',
    },
    {
        title: 'Eco-Safe Formulas',
        body: 'Low-VOC, water-based paints for healthier homes.',
        ctaLabel: 'Learn More',
        href: '#',
        imgSrc: '/Assets/Inspiration/IMG-20250718-WA0041.jpg',
        imgAlt: 'Minimal room corner with plants and natural light',
    },
];



const HowItWorks: React.FC = () => {
    return (
        <section aria-labelledby="how-heading" className="py-10 bg-white">


            {/* 4-Card Grid Layout */}
            <div className="relative w-full py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#532E8A] mb-6">
                            How it works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Premium paint solutions designed for professionals and homeowners who demand excellence
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {items.map((item, i) => (
                            <div key={i} className="w-full h-[400px]">
                                <CardHow {...item} stepNumber={i + 1} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </section>
    );
};

export default HowItWorks;
