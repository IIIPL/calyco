const WhyCalycoShowcase = () => {
  const benefits = [
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ),
      text: "Low-VOC & Eco-Friendly",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ),
      text: "Versatile Application",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ),
      text: "Best Painting Services",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ),
      text: "20% Cheaper than Other Brands",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative min-h-[85vh] sm:min-h-[80vh] md:min-h-[85vh] lg:min-h-[90vh]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/Assets/Texture Images/why-calyco.png"
            alt="Modern living room with premium wall finish"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Why <span className="text-[#998850]">Calyco Paints?</span>
              </h2>

              <p className="text-base md:text-lg text-white/90 mb-10 leading-relaxed max-w-xl">
                Discover why thousands choose CALYCO for premium paints that transform spaces with lasting beauty. Our eco-premium formulations deliver designer finishes without compromise.
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 px-5 py-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#998850] flex items-center justify-center text-white">
                      {benefit.icon}
                    </div>
                    <span className="text-sm md:text-base font-semibold text-white">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCalycoShowcase;
