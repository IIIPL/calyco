import { motion } from 'framer-motion';

const reasons = [
  {
    number: '01',
    title: 'Verified Painters',
    body: 'Every team is screened for experience, behaviour, and work quality before joining the Calyco network.',
    icon: '✅',
  },
  {
    number: '02',
    title: 'Transparent Pricing',
    body: 'You get a written quote with scope, area, material, labour, and exclusions -- before the work begins.',
    icon: '📋',
  },
  {
    number: '03',
    title: 'Daily Progress Updates',
    body: 'Photos and progress notes are shared through the project so you always know what is happening.',
    icon: '📸',
  },
  {
    number: '04',
    title: 'Clean Worksite',
    body: 'Floors, furniture, doors, windows, and switchboards are protected throughout the job.',
    icon: '🧹',
  },
  {
    number: '05',
    title: 'Final Quality Check',
    body: 'Touch-ups, cleanup, and final approval are completed before the team leaves your property.',
    icon: '🔍',
  },
];

const WhyFiveStar = () => (
  <section className="bg-white py-10 sm:py-14">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#0F1221]/45">The Standard</span>
        <div className="mt-2 mb-5 h-[1px] w-10 bg-[#0F1221]/10" />
        <h2 className="text-3xl sm:text-4xl font-light text-[#0F1221] tracking-[-0.01em] max-w-xl">
          Why We Call It 5-Star.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {reasons.map((r, i) => (
          <motion.div
            key={r.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="group rounded-2xl border border-[#0F1221]/8 bg-[#F7F6F3] p-5 hover:border-[#493657]/20 hover:bg-white transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{r.icon}</span>
              <span className="text-[10px] font-medium text-[#0F1221]/25 tracking-[0.1em]">{r.number}</span>
            </div>
            <h3 className="text-sm sm:text-base font-medium text-[#0F1221] mb-2">{r.title}</h3>
            <p className="text-xs sm:text-sm text-[#0F1221]/55 font-light leading-[1.7]">{r.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyFiveStar;
