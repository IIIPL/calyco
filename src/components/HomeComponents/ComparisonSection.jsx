import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';

const PAIRS = [
  { bad: 'Verbal pricing only',         good: 'Fixed written quote' },
  { bad: 'No written scope',            good: 'Clear scope of work' },
  { bad: 'No daily updates',            good: 'Daily photo updates' },
  { bad: 'No fixed timeline',           good: 'Defined project timeline' },
  { bad: 'No final inspection',         good: 'Final quality inspection' },
  { bad: 'No service support after job',good: 'Post-job touch-up support' },
];

const ComparisonSection = () => (
  <section className="bg-[#F4F2EE] py-14 sm:py-20 overflow-hidden">
    <div className="max-w-5xl mx-auto px-5 sm:px-8">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 sm:mb-14"
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="h-[2px] w-6 bg-[#493657]/40 rounded-full" />
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#493657]/60">The Difference</span>
        </div>
        <h2 className="text-[28px] sm:text-4xl lg:text-5xl font-bold text-[#0F1221] tracking-tight leading-[1.1] max-w-xl">
          Local Painter vs<br />
          <span className="text-[#493657]">Calyco 5-Star</span> Service.
        </h2>
      </motion.div>

      {/* ── Cards grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

        {/* Left — Local Painter (muted/weak) */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-6 sm:p-8"
        >
          {/* Card header */}
          <div className="flex items-center gap-3 mb-7">
            <div className="w-9 h-9 rounded-full bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
              <X className="w-4 h-4 text-red-400" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-400 mb-0.5">Typical</p>
              <h3 className="text-[15px] sm:text-base font-bold leading-none" style={{ color: '#374151' }}>Local Painter</h3>
            </div>
          </div>

          {/* Items */}
          <ul className="space-y-3.5">
            {PAIRS.map(({ bad }) => (
              <li key={bad} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <X className="w-2.5 h-2.5 text-red-400" strokeWidth={3} />
                </div>
                <span className="text-sm font-normal" style={{ color: '#9CA3AF', textDecoration: 'line-through', textDecorationColor: '#FCA5A5' }}>{bad}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right — Calyco (premium/dominant) */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-8"
          style={{ background: 'linear-gradient(145deg, #1E0A2E 0%, #3D2260 50%, #493657 100%)' }}
        >
          {/* Glow orbs */}
          <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full bg-[#F0C85A]/18 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#493657]/40 blur-3xl pointer-events-none" />

          {/* 5-Star badge */}
          <div className="absolute top-5 right-5">
            <div className="inline-flex items-center gap-1.5 bg-[#F0C85A] rounded-full px-3 py-1">
              <span className="text-[#0F1221] text-[11px] font-black uppercase tracking-[0.1em]">★ 5-Star</span>
            </div>
          </div>

          {/* Card header */}
          <div className="flex items-center gap-3 mb-7 relative z-10">
            <div className="w-9 h-9 rounded-full bg-[#F0C85A]/20 border border-[#F0C85A]/30 flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 text-[#F0C85A]" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#F0C85A] mb-0.5">Verified</p>
              <h3 className="text-[15px] sm:text-base font-bold text-white leading-none">Calyco 5-Star Service</h3>
            </div>
          </div>

          {/* Items */}
          <ul className="space-y-3.5 relative z-10">
            {PAIRS.map(({ good }, i) => (
              <motion.li
                key={good}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.07 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-[#F0C85A]/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#F0C85A]" strokeWidth={3} />
                </div>
                <span className="text-sm text-white/90 font-medium">{good}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* ── Bottom row ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
      >
        <p className="text-sm text-[#0F1221]/70 font-light leading-relaxed max-w-md">
          Calyco brings structure, accountability, and service discipline to a job that is usually handled casually.
        </p>
        <Link
          to="/calculators/service-cost-calculator"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#493657] text-white px-7 py-3.5 text-sm font-bold hover:bg-[#F0C85A] hover:text-[#0F1221] transition-all duration-200 shadow-[0_4px_20px_rgba(73,54,87,0.3)] hover:shadow-[0_6px_24px_rgba(240,200,90,0.35)] flex-shrink-0"
        >
          Get My Fixed Quote <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

    </div>
  </section>
);

export default ComparisonSection;
