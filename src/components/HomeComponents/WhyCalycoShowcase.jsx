import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  {
    title: "The Price.",
    description: "Clear estimates, fixed quotes, and no hidden charges after work starts. You know the full cost before a single wall is touched. On larger projects, the difference compounds."
  },
  {
    title: "The Product.",
    description: "Reliable paints and coatings chosen for durability, coverage, washability, and Indian conditions. Lab-tested every batch, manufactured to specification, direct from our facility."
  },
  {
    title: "The People.",
    description: "Verified teams, daily updates, polite site behaviour, and a final inspection before handover. We are not trying to be the biggest painting company. We are trying to be the one you actually trust."
  }
];

const badges = [
  "< 50 g/L VOC - Green Building Compliant - Zero Heavy Metals",
  "Interior - Exterior - Textured - Waterproofing - Primers & Sealers",
  "Direct-from-Manufacturer - 15-20% Below National Brands",
  "300,000+ m2 Applied - Infrastructure-Grade Track Record"
];

const trustPills = [
  "Fixed quote before work starts",
  "Daily photo updates",
  "Furniture and floor protection",
  "Final quality inspection",
  "Touch-up support"
];

const WhyCalycoShowcase = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0F1221] py-10">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#998850]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#432452]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">

        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#F0C85A]/60 block mb-3"
          >
            Why Calyco
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-[1.15] max-w-5xl mx-auto tracking-[-0.01em]"
          >
            You Won't Choose Us Because of Our Brand.
            <br className="hidden md:block" />
            <span className="text-white/50"> You'll Choose Us Because of Our Price, Our Product, and Our People.</span>
          </motion.h2>
          <p className="mt-4 text-sm text-white/35 font-light max-w-2xl mx-auto leading-[1.75]">
            We are not here to impress you with brand noise. We are here to make painting simpler, cleaner, and more transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#998850]/30 transition-colors duration-300 group"
            >
              <h3 className="text-2xl font-medium text-[#998850] mb-4 group-hover:translate-x-1 transition-transform duration-300">
                {feature.title}
              </h3>
              <p className="text-white/65 leading-[1.7] font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

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

          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {trustPills.map((pill) => (
              <span key={pill} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/45">
                <span className="w-1 h-1 rounded-full bg-[#F0C85A]/50" />
                {pill}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link
              to="/calculators/service-cost-calculator"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-7 py-3.5 font-medium text-sm hover:bg-white transition-colors shadow-lg"
            >
              Get My Fixed Quote
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white px-7 py-3.5 font-medium text-sm hover:bg-white/10 transition-colors"
            >
              See How It Works
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyCalycoShowcase;
