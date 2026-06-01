import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const TargetMarketSection = () => {
  const [activeId, setActiveId] = useState(2); // Default open card (Architects or Homeowners)

  const markets = [
    {
      id: 1,
      title: "Contractors",
      subtitle: "Trade Program",
      description: "Exclusive volume pricing, priority supply, and dedicated technical support for large-scale projects.",
      image: "/Assets/painter.webp",
      link: "/trade"
    },
    {
      id: 2,
      title: "Architects",
      subtitle: "Design Partners",
      description: "Custom color matching, finish sampling, and detailed specification assistance for your vision.",
      image: "/Assets/asiiiasia0631_realistic_modern_interior_bright_minimalist_room__aedc26f1-f314-4909-b18e-756e99406eb9.webp",
      link: "/designers"
    },
    {
      id: 3,
      title: "Homeowners",
      subtitle: "Residential",
      description: "Premium low-VOC paints and expert color advice to transform your personal sanctuary.",
      image: "/Assets/InteriorInspiratoin/living-room.webp",
      link: "/products"
    },
    {
      id: 4,
      title: "Property Mgrs", // Abbreviated for better fit on constrained widths if needed, or keeping full if space allows
      subtitle: "Commercial",
      description: "Cost-effective maintenance solutions and rapid customized delivery for managed properties.",
      image: "/Assets/canal.health.hacks_Realistic_photo_of_a_modern_house_in_dark_gr_9200c95a-bf7d-42e8-b335-37b3695167c4.webp",
      link: "/commercial"
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12">

        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#998850] font-bold tracking-[0.2em] uppercase text-sm"
            >
              Who We Serve
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F1221] leading-tight"
            >
              Built for <br className="hidden md:block" />
              <span className="text-[#0F1221]/40">Every Scale.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[#0F1221]/60 max-w-sm text-lg leading-relaxed"
          >
            From bespoke residential upgrades to large-scale commercial developments.
          </motion.p>
        </div>

        {/* Expanding Cards Container */}
        <div className="h-[500px] md:h-[600px] flex flex-col md:flex-row gap-4">
          {markets.map((market) => (
            <motion.div
              key={market.id}
              layout
              onClick={() => setActiveId(market.id)}
              className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-xl ${activeId === market.id
                ? 'flex-[3] md:flex-[3]'
                : 'flex-[1] md:flex-[0.8] grayscale hover:grayscale-0'
                }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={market.image}
                  alt={market.title}
                  className="w-full h-full object-cover transform transition-transform duration-1000 scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90 transition-opacity duration-500 ${activeId === market.id ? 'opacity-80' : 'opacity-60 hover:opacity-40'
                  }`} />
              </div>

              {/* Content */}
              <div className={`absolute inset-0 p-6 md:p-8 flex ${activeId === market.id ? 'flex-col justify-end' : 'flex-col md:flex-row md:items-center md:justify-center justify-end'}`}>
                <div className="relative z-10 w-full overflow-hidden block">

                  {/* Collapsed State Title */}
                  <motion.div layout="position" className={`flex items-center justify-between ${activeId !== market.id ? 'md:hidden' : ''}`}>
                    <div>
                      <motion.p
                        layout="position"
                        className={`text-[#998850] text-xs font-bold tracking-widest uppercase mb-2 ${activeId === market.id ? 'block' : 'hidden'}`}
                      >
                        {market.subtitle}
                      </motion.p>
                      <motion.h3
                        layout="position"
                        className={`font-bold text-white leading-none drop-shadow-md text-3xl md:text-5xl mb-4`}
                      >
                        {market.title}
                      </motion.h3>
                    </div>

                    {/* Circle Arrow Icon */}
                    <motion.div
                      layout
                      className={`rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-md transition-all duration-300 ${activeId === market.id ? 'w-12 h-12 rotate-45 bg-[#998850] border-[#998850] text-white' : 'w-10 h-10 -rotate-0 text-white/70'}`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.div>
                  </motion.div>

                  {/* Vertical Text for Collapsed Desktop State */}
                  {activeId !== market.id && (
                    <div className="hidden md:flex flex-col items-center justify-center h-full absolute inset-0">
                      <h3 className="text-2xl font-bold text-white tracking-wider whitespace-nowrap -rotate-90 origin-center drop-shadow-md">
                        {market.title}
                      </h3>
                    </div>
                  )}

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {activeId === market.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-xl pb-2 drop-shadow-sm">
                          {market.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TargetMarketSection;
