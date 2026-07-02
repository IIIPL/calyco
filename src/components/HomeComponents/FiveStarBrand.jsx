import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const pillars = [
  {
    label: 'Free Inspection',
    sub: 'Know exactly what your walls need before spending a rupee.',
  },
  {
    label: 'Fixed Written Quote',
    sub: 'Clear scope, clear pricing, and no surprise charges midway.',
  },
  {
    label: 'Daily Updates',
    sub: 'Get progress photos and updates even when you are not on site.',
  },
  {
    label: 'Laser Measurement',
    sub: 'Accurate area calculation for fair pricing and better material planning.',
  },
  {
    label: 'Verified Teams',
    sub: 'Painters are interviewed, screened, and checked before joining Calyco.',
  },
  {
    label: '25 Cities',
    sub: 'A growing network of local painting partners across India.',
  },
];

const FiveStarBrand = () => (
  <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2D1B38 0%, #1A0B21 60%, #0F1221 100%)' }}>
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#F0C85A]/5 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#493657]/30 rounded-full blur-[100px] pointer-events-none" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12 sm:py-16">

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10"
      >
        <div className="max-w-2xl">
          {/* Stars */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-[#F0C85A] text-xl sm:text-2xl leading-none"
              >★</motion.span>
            ))}
          </div>

          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#F0C85A]/60">Our Service Standard</span>
          <div className="mt-2 mb-4 h-[1px] w-10 bg-white/15" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-[1.08] tracking-[-0.02em] mb-4">
            Calyco 5-Star<br />
            <span className="text-[#F0C85A]">Painting Services.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/45 font-light leading-[1.75] mb-3">
            Because painting is not just about paint. It is about trust, communication, clean execution, and a finish you are proud to live with.
          </p>
          <p className="text-xs sm:text-sm text-white/35 font-light leading-[1.7] border-l-2 border-[#F0C85A]/30 pl-4">
            Every Calyco project follows a 27-point quality checklist covering inspection, measurement, surface preparation, protection, painting, cleanup, and final approval.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:flex-shrink-0">
          <Link
            to="/calculators/service-cost-calculator"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#F0C85A] text-[#0F1221] px-6 py-3 text-sm font-medium tracking-[0.03em] hover:bg-white transition-all shadow-[0_4px_20px_rgba(240,200,90,0.25)]"
          >
            Book a 5-Star Service
          </Link>
          <Link
            to="/how-it-works"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/15 text-white/70 px-6 py-3 text-sm font-medium hover:border-white/35 hover:text-white transition-all"
          >
            How It Works →
          </Link>
        </div>
      </motion.div>

      {/* Pillars grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {pillars.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="rounded-xl bg-white/5 border border-white/8 px-4 py-4 hover:bg-white/8 hover:border-white/15 transition-all"
          >
            <span className="block h-[3px] w-8 rounded-full bg-[#F0C85A] mb-3" />
            <p className="text-white/85 text-xs sm:text-sm font-medium leading-snug mb-1">{p.label}</p>
            <p className="text-white/35 text-[10px] font-light leading-snug">{p.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom stamp */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-medium">
          Calyco 5-Star Painting Services · Verified Teams · Fixed Quotes · Daily Updates · Final Inspection
        </p>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => <span key={i} className="text-[#F0C85A]/40 text-xs">★</span>)}
          <span className="text-white/25 text-[10px] font-medium ml-1">5.0</span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FiveStarBrand;
