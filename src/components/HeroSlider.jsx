import { useState } from 'react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    image: '/Assets/home-hero/full-page.webp',
    imageMobile: '/Assets/home-hero/full-page-mobile.webp',
    badge: 'TRUSTED NATIONWIDE',
    title: 'Colors That Transform Homes Into Havens',
    subtitle: "India's most trusted paint brand. Premium quality, affordable pricing, and a finish that lasts a decade.",
    button1: { text: 'Discover Your Perfect Shade', link: '/colors' },
    button2: { text: 'Products', link: '/products' }
  },
  {
    image: '/Assets/HERO/hero2.webp',
    imageMobile: '/Assets/HERO/hero2-mobile.webp',
    badge: 'GUARANTEED EXCELLENCE',
    title: 'A Decade of Beauty, Guaranteed',
    subtitle: "We stand behind every brush stroke with India's strongest 10-year warranty. Your walls deserve nothing less.",
    button1: { text: 'See Our Promise', link: '/about' },
    button2: { text: 'Products', link: '/products' }
  },
  {
    image: '/Assets/HERO/hero3_Modern_interior_wall_in_a_house_or_apartment_living_fc50ad6e-a99a-46d5-8608-8b3466c0eb0a.webp',
    imageMobile: '/Assets/HERO/hero3_Modern_interior_wall_in_a_house_or_apartment_living_fc50ad6e-a99a-46d5-8608-8b3466c0eb0a-mobile.webp',
    badge: '2,000+ SHADES',
    title: 'Every Mood. Every Room. Every Dream.',
    subtitle: 'From calming neutrals to bold statements—explore our curated collections designed for the way you live.',
    button1: { text: 'Explore Color Collections', link: '/colors' },
    button2: { text: 'Products', link: '/products' }
  },
  {
    image: '/Assets/HERO/hero5-Metallic_parapet_interrupted_by_small_columns_in_a__4ebb7ad1-fde5-4e3d-a238-3c3de0f940e7.webp',
    imageMobile: '/Assets/HERO/hero5-Metallic_parapet_interrupted_by_small_columns_in_a__4ebb7ad1-fde5-4e3d-a238-3c3de0f940e7-mobile.webp',
    badge: 'MADE IN INDIA',
    title: 'Factory-Direct Quality. Family-Friendly Prices.',
    subtitle: 'By cutting out middlemen, we deliver premium paint at 20% less than competitors—without compromising an ounce of quality.',
    button1: { text: 'See How We Do It', link: '/about' },
    button2: { text: 'Products', link: '/products' }
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative w-full h-[80vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] overflow-hidden">
      {/* Background Image - Quick transition */}
      <div className="absolute inset-0 transition-opacity duration-300">
        <picture key={currentSlide}>
          <source
            media="(max-width: 767px)"
            srcSet={slide.imageMobile}
            width="800"
            height="600"
          />
          <source
            media="(min-width: 768px)"
            srcSet={slide.image}
            width="1920"
            height="1080"
          />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-[65%_center] scale-110"
            loading={currentSlide === 0 ? "eager" : "lazy"}
            fetchpriority={currentSlide === 0 ? "high" : "auto"}
            width="1920"
            height="1080"
          />
        </picture>
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/35 to-black/20" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center pt-16 sm:pt-0">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-6 md:px-12 lg:px-16">
          <div className="text-white max-w-xl md:max-w-2xl lg:max-w-3xl">
            {/* Badge */}
            <div className="inline-block mb-2 sm:mb-3 md:mb-4">
              <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg">
                {slide.badge}
              </span>
            </div>

            {/* Main Title */}
            <h1
              className="text-3xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold mb-2 sm:mb-3 md:mb-4 leading-[1.25] text-white tracking-normal"
              style={{ letterSpacing: '0.01em' }}
            >
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 text-white/90 font-normal leading-[1.55] sm:leading-[1.55] md:leading-[1.6] max-w-2xl">
              {slide.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-16 sm:mb-0">
              <Link
                to={slide.button1.link}
                className="inline-flex items-center justify-center px-6 py-3.5 sm:px-6 sm:py-3 bg-white text-[#0F1221] rounded-lg font-semibold text-base sm:text-sm hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {slide.button1.text}
              </Link>
              <Link
                to={slide.button2.link}
                className="inline-flex items-center justify-center px-6 py-3.5 sm:px-6 sm:py-3 bg-transparent text-white border-2 border-white/50 rounded-lg font-semibold text-base sm:text-sm hover:bg-white/10 hover:border-white transition-all duration-300"
              >
                {slide.button2.text}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Navigation */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center gap-3 sm:gap-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-3 shadow-lg">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="text-[#0F1221] hover:text-[#4B007D] transition-colors duration-200"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-200 rounded-full ${
                  index === currentSlide
                    ? 'w-8 h-2 bg-[#0F1221]'
                    : 'w-2 h-2 bg-[#0F1221]/30 hover:bg-[#0F1221]/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="text-[#0F1221] hover:text-[#4B007D] transition-colors duration-200"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
