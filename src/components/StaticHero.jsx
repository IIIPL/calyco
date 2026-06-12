import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import contactData from '../data/admin/contact.json';
import { BRAND_NAME, POSITIONING_TAGLINE, WA_SITE_VISIT } from '../data/positioning';
import { serviceCategories, cityMultipliers } from '../data/servicePricing';
import CustomSelect from './CustomSelect';

const PROPERTY_TYPES = ['Apartment', 'Independent House / Villa', 'Builder Floor', 'Office / Commercial', 'Society / Common Area', 'Other'];
const FORM_CITIES = Object.keys(cityMultipliers).sort();

// WhatsApp SVG used in multiple places
const WaIcon = ({ cls = 'w-4 h-4' }) => (
  <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const HeroLeadForm = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: 'Delhi',
    service: serviceCategories[0],
    propertyType: PROPERTY_TYPES[0],
  });
  const [sent, setSent] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.phone.trim().length < 10) return;
    const msg = [
      `${WA_SITE_VISIT}`,
      '',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `City: ${form.city}`,
      `Service: ${form.service}`,
      `Property: ${form.propertyType}`,
    ].join('\n');
    window.open(
      `${contactData.contact.whatsapp.link}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setSent(true);
  };

  const inputCls = 'w-full rounded-xl border border-[#0F1221]/12 bg-white px-4 py-3 text-sm text-[#0F1221] placeholder-[#0F1221]/35 focus:outline-none focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent';
  const selectCls = inputCls + ' appearance-none cursor-pointer';

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
        <div className="w-14 h-14 rounded-full bg-[#25D366]/15 flex items-center justify-center">
          <WaIcon cls="w-7 h-7 text-[#25D366]" />
        </div>
        <div>
          <p className="font-bold text-[#0F1221] text-lg">Opening WhatsApp…</p>
          <p className="text-sm text-[#0F1221]/55 mt-1 max-w-xs mx-auto">
            Our team responds within 2 hours (Mon–Sat, 10am–6pm).
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-xs text-[#0F1221]/40 underline underline-offset-2 hover:text-[#0F1221]/70 transition-colors"
        >
          Submit again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Name */}
      <input
        type="text"
        value={form.name}
        onChange={(e) => set('name', e.target.value)}
        placeholder="Your name"
        required
        className={inputCls}
        aria-label="Your name"
      />

      {/* Mobile */}
      <input
        type="tel"
        value={form.phone}
        onChange={(e) => set('phone', e.target.value)}
        placeholder="Mobile number"
        maxLength={10}
        required
        className={inputCls}
        aria-label="Mobile number"
      />

      {/* City */}
      <CustomSelect
        value={form.city}
        onChange={(v) => set('city', v)}
        options={FORM_CITIES}
        label="Select your city"
        variant="light"
      />

      {/* Service */}
      <CustomSelect
        value={form.service}
        onChange={(v) => set('service', v)}
        options={serviceCategories}
        label="Service needed"
        variant="light"
      />

      {/* Property type */}
      <CustomSelect
        value={form.propertyType}
        onChange={(v) => set('propertyType', v)}
        options={PROPERTY_TYPES}
        label="Property type"
        variant="light"
      />

      {/* Submit */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] text-white py-3.5 text-sm font-bold hover:bg-[#1fb355] active:scale-[0.98] transition-all shadow-[0_4px_18px_rgba(37,211,102,0.40)]"
      >
        <WaIcon />
        Get Estimate on WhatsApp
      </button>

      <p className="text-center text-[11px] text-[#0F1221]/40 leading-[1.6]">
        No spam. Our team will call or WhatsApp you to confirm the site visit.
      </p>
    </form>
  );
};

const TRUST_LINE = ['Free inspection', 'Fixed written quote', 'Daily WhatsApp updates', 'Final quality check'];

const StaticHero = () => {
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sp  = { stiffness: 45, damping: 22, mass: 0.9 };
  const sp2 = { stiffness: 35, damping: 20, mass: 1.0 };

  const orb1x = useSpring(useTransform(mx, [-0.5, 0.5], [-24, 24]), sp);
  const orb1y = useSpring(useTransform(my, [-0.5, 0.5], [-18, 18]), sp);
  const orb2x = useSpring(useTransform(mx, [-0.5, 0.5], [18, -18]), sp);
  const orb2y = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), sp);
  const contentX = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), sp2);
  const contentY2 = useSpring(useTransform(my, [-0.5, 0.5], [-2, 2]), sp2);

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    my.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  const waVisit = `${contactData.contact.whatsapp.link}?text=${encodeURIComponent(WA_SITE_VISIT)}`;

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#FAFAFA]"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Clean light background */}
      <div className="absolute inset-0 z-0 bg-[#FAFAF8]" />

      {/* Glow orbs */}
      <motion.div className="absolute top-[-5%] right-[10%] w-[460px] h-[460px] rounded-full bg-[#F0C85A]/10 blur-[130px] pointer-events-none z-[1]" style={{ x: orb1x, y: orb1y }} />
      <motion.div className="absolute bottom-[5%] left-[5%] w-[300px] h-[300px] rounded-full bg-[#493657]/10 blur-[100px] pointer-events-none z-[1]" style={{ x: orb2x, y: orb2y }} />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-8 sm:py-14 lg:py-20"
        style={{ x: contentX, y: contentY2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-16 items-start">

          {/* ── LEFT: copy + CTAs ── */}
          <div>
            {/* Hero headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mb-5"
            >
              {/* Main headline */}
              <h1 className="leading-[1.15] tracking-[-0.01em]">
                <span className="block text-[2.8rem] sm:text-[3.6rem] lg:text-[4.6rem] xl:text-[5.2rem] font-light text-[#0F1221]">
                  Calyco 5-Star
                </span>
                <span className="block text-[2.8rem] sm:text-[3.6rem] lg:text-[4.6rem] xl:text-[5.2rem] font-light text-[#493657]">
                  Painting Service.
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
              className="text-[#0F1221]/60 text-base sm:text-lg leading-[1.7] font-normal mb-6 sm:mb-8 max-w-lg"
            >
              Professional House Painters You Can Trust.<br />
              Verified Teams. Fixed Quote. Warranty-Backed Finish.
            </motion.p>

            {/* Primary + Secondary CTAs — stacked on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-3 mb-5"
            >
              <Link
                to="/calculators/service-cost-calculator"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-[#0F1221] text-white rounded-2xl text-sm font-medium tracking-[0.06em] uppercase hover:bg-[#493657] transition-all duration-300 shadow-[0_4px_24px_rgba(15,18,33,0.18)]"
              >
                Get My Painting Estimate
              </Link>
              <Link
                to="/get-quote"
                className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-white border border-[#0F1221]/12 text-[#0F1221] rounded-2xl text-sm font-medium tracking-[0.06em] uppercase hover:border-[#0F1221]/30 hover:shadow-md transition-all duration-300"
              >
                Book Free Site Visit →
              </Link>
            </motion.div>

          </div>

          {/* ── RIGHT: lead form card — hidden on mobile, shows on tablet+ ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: 'easeOut' }}
            className="hidden sm:block rounded-2xl bg-white/90 backdrop-blur-xl border border-[#0F1221]/8 shadow-[0_8px_40px_rgba(0,0,0,0.10)] p-6 sm:p-7"
          >
            <div className="mb-5">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#998850] mb-1">{BRAND_NAME}</p>
              <h2 className="text-lg font-semibold text-[#0F1221] tracking-[-0.01em]">Get Your Estimate on WhatsApp</h2>
              <p className="text-xs text-[#0F1221]/45 font-light mt-1">Takes 60 seconds. No commitment required.</p>
            </div>

            <HeroLeadForm />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default StaticHero;
