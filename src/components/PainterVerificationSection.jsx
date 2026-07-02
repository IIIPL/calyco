import { Link } from 'react-router-dom';
import { IconIDCard, IconSkillCheck, IconQualityCheck, IconWallLayers, IconFurnitureMask, IconSupervisor, IconDailyPhoto, Icon27Point } from './CalycoIcons';

const verificationPoints = [
  { n: '01', Icon: IconIDCard,       bg: 'bg-[#0F1221]', title: 'Identity Checked',                  desc: 'Government-issued ID verified before onboarding. Address proof confirmed.' },
  { n: '02', Icon: IconSkillCheck,   bg: 'bg-[#493657]', title: 'Experience Reviewed',                desc: 'Minimum 3 years of relevant painting or surface care experience required.' },
  { n: '03', Icon: IconQualityCheck, bg: 'bg-[#1a4a8a]', title: 'Work Quality Screened',              desc: 'Previous project samples reviewed. Finish quality, edge work and preparation checked.' },
  { n: '04', Icon: IconWallLayers,   bg: 'bg-[#4a2800]', title: 'Trained on Surface Preparation',    desc: 'Crack filling, sanding, priming, damp treatment and putty application — all covered.' },
  { n: '05', Icon: IconFurnitureMask,bg: 'bg-[#1a4a2a]', title: 'Trained on Masking & Cleanup',      desc: 'Floor protection, furniture cover, tape masking and post-job cleanup process trained.' },
  { n: '06', Icon: IconSupervisor,   bg: 'bg-[#493657]', title: 'Supervisor Assigned',               desc: 'A Calyco supervisor is assigned to every project for coordination and quality control.' },
  { n: '07', Icon: IconDailyPhoto,   bg: 'bg-[#0a2240]', title: 'Daily WhatsApp Reporting',          desc: 'Teams submit daily site photos to Calyco before they are forwarded to the customer.' },
  { n: '08', Icon: Icon27Point,      bg: 'bg-[#998850]', title: 'Final Quality Check Before Payment', desc: 'Project reviewed against 27-point checklist. Payment closed only after approval.' },
];

// Placeholder painter "profile" cards — replace src with real photos when available
const painterProfiles = [
  { name: 'Rajesh K.', city: 'Delhi', rating: '4.9', jobs: '240+', initials: 'RK', color: 'bg-[#1a0b21]' },
  { name: 'Suresh M.', city: 'Mumbai', rating: '4.8', jobs: '185+', initials: 'SM', color: 'bg-[#0a2240]' },
  { name: 'Anand P.', city: 'Bengaluru', rating: '5.0', jobs: '312+', initials: 'AP', color: 'bg-[#1a1200]' },
  { name: 'Vikram S.', city: 'Hyderabad', rating: '4.9', jobs: '198+', initials: 'VS', color: 'bg-[#0a0a1a]' },
];

const PainterVerificationSection = ({ compact = false }) => (
  <section className={`bg-white ${compact ? 'py-10' : 'py-12 sm:py-16'} border-y border-[#0F1221]/6`}>
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 items-start mb-10">
        <div>
          <span className="text-[13px] font-medium uppercase tracking-[0.15em] text-[#0F1221]/40">Calyco Verified</span>
          <div className="mt-2 mb-4 h-[1px] w-10 bg-[#0F1221]/10" />
          <h2 className="text-2xl sm:text-3xl font-light text-[#0F1221] tracking-[-0.01em] leading-[1.15]">
            Verified Painters,<br />Managed by Calyco.
          </h2>
          <p className="mt-4 text-sm text-[#0F1221]/70 font-light leading-[1.85] max-w-sm">
            We do not simply send a local painter. Calyco assigns trained painting teams who follow our service checklist, safety process and daily reporting system.
          </p>

          {/* Calyco Verified badge */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#F0C85A]/35 bg-[#FFFBEF] px-4 py-3.5">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#F0C85A] text-[#0F1221] flex-shrink-0 font-bold text-sm">✓</span>
            <div>
              <p className="text-sm font-bold text-[#0F1221]">Calyco Verified Badge</p>
              <p className="text-[11px] text-[#0F1221]/70 font-light mt-0.5">Every assigned painter team carries this status</p>
            </div>
          </div>

          {!compact && (
            <div className="mt-6">
              <Link
                to="/get-quote"
                className="inline-flex items-center gap-2 rounded-full bg-[#0F1221] text-white px-6 py-3 text-sm font-bold hover:bg-[#493657] transition-colors"
              >
                Book a Verified Painter →
              </Link>
            </div>
          )}
        </div>

        {/* Painter profile placeholders */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0F1221]/70 mb-4">
            Sample verified team members · Real photos being added
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {painterProfiles.map((p) => (
              <div key={p.name} className="rounded-2xl border border-[#0F1221]/8 bg-[#FAFAF8] p-4 text-center">
                {/* Avatar placeholder */}
                <div className={`w-14 h-14 rounded-full ${p.color} flex items-center justify-center text-white font-bold text-lg mx-auto mb-3`}>
                  {p.initials}
                </div>
                <p className="text-sm font-semibold text-[#0F1221]">{p.name}</p>
                <p className="text-[11px] text-[#0F1221]/70 font-light mt-0.5">{p.city}</p>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-[11px] font-bold text-[#998850]">★ {p.rating}</span>
                  <span className="text-[#0F1221]/20">·</span>
                  <span className="text-[11px] text-[#0F1221]/40">{p.jobs} jobs</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#25D366]/12 px-2 py-0.5">
                  <span className="text-[10px] font-bold text-[#1a8c48]">✓ Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 8 verification points ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {verificationPoints.map((pt) => {
          const { Icon } = pt;
          return (
            <div
              key={pt.n}
              className="flex gap-3.5 rounded-2xl border border-[#0F1221]/7 bg-[#FAFAF8] px-4 py-4 hover:border-[#0F1221]/15 hover:bg-white transition-all"
            >
              <div className="flex-shrink-0">
                <div className={`w-9 h-9 rounded-xl ${pt.bg} flex items-center justify-center`}>
                  <Icon className="w-4.5 h-4.5 text-white" />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F1221]/70 mb-0.5">{pt.n}</p>
                <p className="text-sm font-semibold text-[#0F1221] leading-snug">{pt.title}</p>
                <p className="text-xs text-[#0F1221]/70 font-light mt-1 leading-[1.65]">{pt.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA strip */}
      {!compact && (
        <div className="mt-8 rounded-2xl bg-[#0F1221] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-white text-sm">Every painter you meet has passed all 8 checks.</p>
            <p className="text-xs text-white/45 font-light mt-1">Teams are re-evaluated every 6 months. Low-rated teams are removed from the network.</p>
          </div>
          <Link
            to="/get-quote"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-6 py-2.5 text-sm font-bold hover:bg-white transition-colors whitespace-nowrap"
          >
            Book Verified Painter →
          </Link>
        </div>
      )}

    </div>
  </section>
);

export default PainterVerificationSection;
