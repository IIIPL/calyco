import { motion } from 'framer-motion';

const benefits = [
  {
    label: 'Better Products',
    headline: 'Professional-grade paint built for Indian homes.',
    description: "Professional-grade paints and coatings built for Indian homes, weather, and usage. Low-VOC, water-based, durable, and available in 150+ colours. No retail markup. Direct from manufacturer.",
  },
  {
    label: 'Better Process',
    headline: 'Inspection to handover -- managed by Calyco.',
    description: 'Inspection, measurement, surface preparation, protection, painting, cleanup, and final quality check. Every step is defined, tracked, and delivered with a 27-point checklist.',
  },
  {
    label: 'Better People',
    headline: 'Verified teams who respect your home.',
    description: 'Verified painting teams who show up on time, protect your furniture and floors, share daily progress, and complete a final inspection before leaving your property.',
  },
];

const BenefitsSection = () => (
  <section className="py-10 md:py-14 bg-[#F7F6F3] relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#0F1221]/45">Our Difference</span>
        <div className="mt-2 mb-5 h-[1px] w-10 bg-[#0F1221]/10" />
        <h2 className="text-3xl sm:text-4xl font-light text-[#0F1221] tracking-[-0.01em]">
          Why Homeowners Choose Calyco.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
        {benefits.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            className="relative flex flex-col items-start text-left"
          >
            <div className="mb-4">
              <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#0F1221]/45">{item.label}</span>
              <div className="mt-2 h-[1px] w-full bg-[#0F1221]/10" />
            </div>
            <h3 className="text-xl md:text-2xl font-light text-[#0F1221] leading-[1.2] mb-4 tracking-[-0.01em]">
              {item.headline}
            </h3>
            <p className="text-sm md:text-base leading-[1.75] text-[#0F1221]/60 font-light">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
