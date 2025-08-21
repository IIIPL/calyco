import React from 'react';

export interface CardHowProps {
    title: string;
    body: string;
    ctaLabel: string;
    href: string;
    imgSrc: string;
    imgAlt: string;
    overlay?: boolean;
    productBadgeSrc?: string;
    stepNumber?: number;
}

const CardHow: React.FC<CardHowProps> = ({
    title,
    body,
    ctaLabel,
    href,
    imgSrc,
    imgAlt,
    overlay = false,
    productBadgeSrc,
    stepNumber,
}) => {
    return (
        <article className="group h-full flex flex-col rounded-xl shadow-lg overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#532E8A] transition-shadow duration-200 hover:shadow-xl transform-gpu transition-transform ease-out hover:scale-[1.02] hover:-translate-y-1 focus-visible:scale-[1.02] relative">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={imgSrc}
                    alt={imgAlt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" aria-hidden="true" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6">
                {/* Title + subline */}
                <div>
                    <h3 className="text-xl font-bold text-white line-clamp-2 leading-tight font-heading mb-2">
                        {title}
                    </h3>
                    <p className="text-sm text-white/90 line-clamp-1">{body}</p>
                </div>

                {/* CTA */}
                <div className="mt-auto">
                    <a
                        href={href}
                        className="inline-flex items-center justify-center rounded-full px-8 py-3 bg-black text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#532E8A] text-sm font-medium transition-all duration-300 w-full"
                    >
                        {ctaLabel}
                    </a>
                </div>
            </div>
        </article>
    );
};

export default CardHow;
