import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

const pillars = [
  { icon: '🔍', label: 'Free Inspection',      sub: 'Know what your walls need before spending a rupee.' },
  { icon: '📋', label: 'Fixed Written Quote',   sub: 'Clear scope, clear pricing, no surprise charges.' },
  { icon: '📡', label: 'Daily Updates',         sub: 'Progress photos even when you are not on site.' },
  { icon: '📏', label: 'Laser Measurement',     sub: 'Accurate area for fair pricing.' },
  { icon: '✅', label: 'Verified Teams',         sub: 'Screened and checked before every project.' },
  { icon: '🏙️', label: '25 Cities',             sub: 'Growing partner network across India.' },
];

const StaticHero = () => {
  const ref = useRef(null);

  /* ── Scroll parallax ── */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgScrollY   = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const orbScrollY  = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentScrollY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  /* ── Mouse parallax ── */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sp  = { stiffness: 45, damping: 22, mass: 0.9 };
  const sp2 = { stiffness: 35, damping: 20, mass: 1.0 };

  /* background — largest movement (feels far away) */
  const bgX = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), sp);
  const bgY = useSpring(useTransform(my, [-0.5, 0.5], [-12, 12]), sp);

  /* glow orbs — medium movement */
  const orb1x = useSpring(useTransform(mx, [-0.5, 0.5], [-28, 28]), sp);
  const orb1y = useSpring(useTransform(my, [-0.5, 0.5], [-20, 20]), sp);
  const orb2x = useSpring(useTransform(mx, [-0.5, 0.5], [ 22,-22]), sp);
  const orb2y = useSpring(useTransform(my, [-0.5, 0.5], [ 16,-16]), sp);
  const orb3x = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), sp2);
  const orb3y = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), sp2);

  /* content — smallest movement (feels close / in front) */
  const contentX = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), sp2);
  const contentY2 = useSpring(useTransform(my, [-0.5, 0.5], [-3, 3]), sp2);

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    my.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#FAFAFA]"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* ── Layer 1: Background texture (scroll + mouse, slowest) ── */}
      <motion.div
        className="absolute inset-[-8%] z-0"
        style={{ x: bgX, y: bgY }}
      >
        <motion.img
          src="/Assets/Textures/Urban%20Concrete%20(The%20Grey%20Cement%20Look).webp"
          alt="Architectural concrete texture"
          className="w-full h-full object-cover object-center brightness-[1.05] contrast-[0.95]"
          style={{ y: bgScrollY }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{ backgroundImage: 'url("/Assets/background-texture.webp")', backgroundSize: '200px' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/75" />
      </motion.div>

      {/* ── Layer 2: Floating ambient glow orbs (medium parallax) ── */}
      <motion.div
        className="absolute top-[-5%] right-[15%] w-[420px] h-[420px] rounded-full bg-[#F0C85A]/10 blur-[120px] pointer-events-none z-[1]"
        style={{ x: orb1x, y: orb1y, translateY: orbScrollY }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[8%] w-[320px] h-[320px] rounded-full bg-[#493657]/12 blur-[100px] pointer-events-none z-[1]"
        style={{ x: orb2x, y: orb2y, translateY: orbScrollY }}
      />
      <motion.div
        className="absolute top-[40%] left-[40%] w-[200px] h-[200px] rounded-full bg-[#F0C85A]/6 blur-[80px] pointer-events-none z-[1]"
        style={{ x: orb3x, y: orb3y }}
      />

      {/* ── Layer 3: Content (subtle mouse parallax, fast) ── */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24"
        style={{ x: contentX, y: contentY2, translateY: contentScrollY }}
      >

        {/* ── ZONE 1: Hero copy ── */}
        <div className="pt-8 sm:pt-12 md:pt-16 pb-10 sm:pb-14">

          {/* Label pill -- desktop only */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="mb-6 hidden sm:flex"
          >
            <span className="inline-flex items-center gap-2.5 whitespace-nowrap px-5 py-2.5 rounded-full border border-[#0F1221]/12 bg-white/80 backdrop-blur-md shadow-sm">
              <span className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#F0C85A] text-[10px] leading-none">★</span>
                ))}
              </span>
              <span className="w-px h-3 bg-[#0F1221]/15 flex-shrink-0" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black">
                Verified Painting Service
              </span>
              <span className="w-px h-3 bg-[#0F1221]/15 flex-shrink-0" />
              <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#0F1221]/60">
                25 Cities · Free Inspection
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease: 'easeOut' }}
            className="text-[#0F1221] text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-[1.08] mb-5 sm:mb-6 tracking-[-0.02em] font-light max-w-5xl"
          >
            You're Overpaying for Paint.<br />
            <span className="text-[#0F1221]/65">And Still Getting Poor Service.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.22, ease: 'easeOut' }}
            className="text-sm sm:text-lg md:text-xl text-[#0F1221]/75 max-w-2xl leading-[1.75] font-light mb-8 sm:mb-10"
          >
            Calyco gives you professional painting with fixed pricing, verified painters, daily progress updates, and final quality inspection. Everything your local painter should have offered.
          </motion.p>

          {/* Divider row: CTAs + Trust pills */}
          <div className="border-t border-[#0F1221]/8 pt-6 flex flex-col md:flex-row items-start gap-6 md:gap-12">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.38, ease: 'easeOut' }}
              className="flex flex-row flex-wrap gap-3 flex-shrink-0"
            >
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/calculators/service-cost-calculator"
                  className="inline-flex items-center gap-2 whitespace-nowrap px-6 py-3 sm:px-8 sm:py-3.5 bg-[#F0C85A] text-[#0F1221] rounded-full text-sm font-bold tracking-[0.03em] hover:bg-[#0F1221] hover:text-white transition-all duration-300 shadow-[0_4px_20px_rgba(240,200,90,0.4)]"
                >
                  Get My Fixed Quote
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center gap-2 whitespace-nowrap px-6 py-3 sm:px-8 sm:py-3.5 bg-white/70 border border-[#0F1221]/15 text-[#0F1221] rounded-full text-sm font-medium tracking-[0.03em] hover:bg-white hover:border-[#0F1221]/30 transition-all duration-300 backdrop-blur-sm"
                >
                  How It Works →
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.32, ease: 'easeOut' }}
              className="flex flex-wrap gap-2"
            >
              {['Free Inspection', 'Fixed Written Quote', 'Verified Painters', 'Daily Updates', 'Final Quality Check'].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-[#0F1221]/15 bg-white/75 backdrop-blur-sm px-3 py-1.5 text-[11px] font-medium text-[#0F1221]/75">
                  <span className="w-1 h-1 rounded-full bg-[#0F1221]/25 flex-shrink-0" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── ZONE 2: 5-Star Brand ── */}
        <div className="border-t border-[#0F1221]/10 pt-8 pb-10 sm:pb-14">

          {/* Stars + label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="text-[#F0C85A] text-lg sm:text-xl leading-none drop-shadow-sm"
                >★</motion.span>
              ))}
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
              Calyco 5-Star Painting Service
            </span>
          </motion.div>

          {/* Pillar cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {pillars.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(0,0,0,0.08)' }}
                className="rounded-2xl bg-white/75 backdrop-blur-md border border-[#0F1221]/12 px-4 py-4 hover:bg-white/90 hover:border-[#0F1221]/20 transition-all duration-200 shadow-sm cursor-default"
              >
                <span className="text-xl mb-3 block">{p.icon}</span>
                <p className="text-[#0F1221] text-xs sm:text-sm font-medium leading-snug mb-1">{p.label}</p>
                <p className="text-[#0F1221]/60 text-[10px] sm:text-xs font-light leading-snug">{p.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom stamp */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 pt-5 border-t border-[#0F1221]/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          >
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-black font-semibold">
              Calyco 5-Star Painting Service · Verified Teams · Fixed Quotes · Daily Updates · Final Inspection
            </p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <span key={i} className="text-[#F0C85A] text-xs drop-shadow-sm">★</span>)}
              <span className="text-black text-[10px] font-semibold ml-1.5">5.0</span>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

export default StaticHero;
