import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const reasons = [
  {
    number: '01',
    title: 'Verified Painters',
    body: 'Every team is screened for experience, behaviour, and work quality before joining the Calyco network.',
  },
  {
    number: '02',
    title: 'Transparent Pricing',
    body: 'Written quote with scope, area, material, and labour — before work begins. Price does not change.',
  },
  {
    number: '03',
    title: 'Daily Progress Updates',
    body: 'Photos and progress notes shared on WhatsApp so you always know what is happening on site.',
  },
  {
    number: '04',
    title: 'Clean Worksite',
    body: 'Floors, furniture, doors, windows, and switchboards protected throughout the job.',
  },
  {
    number: '05',
    title: 'Final Quality Check',
    body: 'Touch-ups, cleanup, and your approval completed before the team leaves.',
  },
];

const WhyFiveStar = () => (
  <section className="bg-[#0F1221] py-16 sm:py-20 lg:py-24">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Gold stars */}
          <div className="flex items-center gap-1 mb-5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-[#F0C85A]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-[-0.02em] leading-[1.08]">
            The Calyco<br className="hidden sm:block" /> 5-Star Standard.
          </h2>
          <p className="mt-4 text-base text-white/45 font-light max-w-lg leading-[1.8]">
            Five non-negotiables on every project — regardless of size, location, or budget.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/get-quote"
            className="inline-flex items-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-6 py-3.5 text-sm font-bold hover:bg-white transition-colors whitespace-nowrap"
          >
            Book Free Inspection
          </Link>
        </motion.div>
      </div>

      {/* 5 reason cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {reasons.map((r, i) => (
          <motion.div
            key={r.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/8 hover:border-white/20 transition-all"
          >
            <span className="text-[10px] font-bold text-[#F0C85A] tracking-[0.12em] block mb-4">{r.number}</span>
            <h3 className="text-sm sm:text-base font-semibold text-white/90 mb-2 leading-snug">{r.title}</h3>
            <p className="text-xs sm:text-sm text-white/45 font-light leading-[1.7]">{r.body}</p>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

export default WhyFiveStar;
