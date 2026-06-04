import { motion } from 'framer-motion';

// Premium SVG icons — no emojis
const IconShieldCheck = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const IconFileText = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const IconCamera = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
);

const IconHome = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const IconBadgeCheck = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

const reasons = [
  {
    number: '01',
    title: 'Verified Painters',
    body: 'Every team is screened for experience, behaviour, and work quality before joining the Calyco network.',
    Icon: IconShieldCheck,
    bg: 'bg-[#0F1221]',
    iconColor: 'text-[#F0C85A]',
  },
  {
    number: '02',
    title: 'Transparent Pricing',
    body: 'You get a written quote with scope, area, material, labour, and exclusions — before the work begins.',
    Icon: IconFileText,
    bg: 'bg-[#493657]',
    iconColor: 'text-white',
  },
  {
    number: '03',
    title: 'Daily Progress Updates',
    body: 'Photos and progress notes are shared through the project so you always know what is happening.',
    Icon: IconCamera,
    bg: 'bg-[#25D366]',
    iconColor: 'text-white',
  },
  {
    number: '04',
    title: 'Clean Worksite',
    body: 'Floors, furniture, doors, windows, and switchboards are protected throughout the job.',
    Icon: IconHome,
    bg: 'bg-[#1a4a8a]',
    iconColor: 'text-white',
  },
  {
    number: '05',
    title: 'Final Quality Check',
    body: 'Touch-ups, cleanup, and final approval are completed before the team leaves your property.',
    Icon: IconBadgeCheck,
    bg: 'bg-[#998850]',
    iconColor: 'text-white',
  },
];

const WhyFiveStar = () => (
  <section className="bg-white py-14 sm:py-20">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="section-eyebrow mb-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F0C85A]">The Standard</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#0F1221] tracking-[-0.02em] leading-[1.08] max-w-xl mt-2">
          Why We Call It 5-Star.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {reasons.map((r, i) => {
          const { Icon } = r;
          return (
            <motion.div
              key={r.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group rounded-2xl border border-[#0F1221]/8 bg-[#F7F6F3] p-5 hover:border-[#493657]/20 hover:bg-white transition-all"
            >
              {/* Icon container */}
              <div className="flex items-start justify-between mb-5">
                <div className={`w-10 h-10 rounded-xl ${r.bg} flex items-center justify-center flex-shrink-0`}>
                  <span className={r.iconColor}>
                    <Icon />
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#0F1221]/20 tracking-[0.1em]">{r.number}</span>
              </div>

              <h3 className="text-sm sm:text-base font-semibold text-[#0F1221] mb-2 leading-snug">{r.title}</h3>
              <p className="text-xs sm:text-sm text-[#0F1221]/55 font-light leading-[1.7]">{r.body}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyFiveStar;
