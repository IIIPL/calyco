import { motion } from 'framer-motion';

const WhyCalycoShowcase = () => {
  const features = [
    {
      title: "The Price.",
      description: "We manufacture and supply direct. No distributor margins, no retail overheads. The same class of acrylic copolymer formulation that national brands charge a premium for — we deliver at 15–20% less. On a 200-unit development, that’s not a saving. That’s a line item you can reallocate."
    },
    {
      title: "The Product.",
      description: "300,000+ m² applied across NTPC power stations, Bhilai Steel Plant, and infrastructure projects with L&T, Simplex, GE, and Mitsubishi as principal contractors. Lab-tested every batch. 25+ years of continuous production. "
    },
    {
      title: "The People.",
      description: "Every commercial account gets a dedicated contact. Someone who knows your project, tracks your timeline, and picks up when you call. We’re not trying to be the biggest coatings company. We’re trying to be the one you actually want to work with."
    }
  ];

  const badges = [
    "< 50 g/L VOC · Green Building Compliant · Zero Heavy Metals",
    "Interior · Exterior · Textured · Waterproofing · Primers & Sealers",
    "Direct-from-Manufacturer · 15–20% Below National Brands",
    "300,000+ m² Applied · Infrastructure-Grade Track Record"
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#0F1221] py-24">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#998850]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#432452]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#C4A962] font-medium tracking-[0.2em] uppercase text-sm block mb-4"
          >
            WHY PROFESSIONALS STAY WITH CALYCO
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-[1.15] max-w-5xl mx-auto tracking-[-0.01em]"
          >
            You Won’t Choose Us Because of Our Brand. <br className="hidden md:block" />
            <span className="text-white/50">You'll Choose Us Because of Our Price, Our Product, and Our People.</span>
          </motion.h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#C4A962]/30 transition-colors duration-300 group"
            >
              <h3 className="text-2xl font-medium text-[#C4A962] mb-4 group-hover:translate-x-1 transition-transform duration-300">
                {feature.title}
              </h3>
              <p className="text-white/65 leading-[1.7] font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Badges & Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
            {badges.map((badge, index) => (
              <span
                key={index}
                className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-white/50 tracking-wide hover:bg-white/10 hover:text-white/80 transition-all duration-300"
              >
                {badge}
              </span>
            ))}
          </div>

          <p className="text-xl md:text-2xl font-serif italic text-white/70 font-light">
            "We’re not new to this. We’re just new to you."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyCalycoShowcase;
