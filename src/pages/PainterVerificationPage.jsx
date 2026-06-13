import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import SEO from '../components/SEO';
import PainterVerificationSection from '../components/PainterVerificationSection';
import { BRAND_NAME, WA_SITE_VISIT } from '../data/positioning';
import contactData from '../data/admin/contact.json';

const screeningProcess = [
  {
    phase: 'Application',
    steps: [
      'Painter submits work history, photos of past projects, and references.',
      'Calyco reviews the application and shortlists candidates based on experience and geography.',
    ],
  },
  {
    phase: 'In-Person Assessment',
    steps: [
      'A Calyco supervisor meets the painter and reviews their tools, equipment and work samples.',
      'Surface preparation knowledge — priming, putty, crack filling — is tested on-site.',
      'Masking, protection and cleanup processes are reviewed.',
    ],
  },
  {
    phase: 'Background Verification',
    steps: [
      'Government-issued ID (Aadhaar or PAN) verified.',
      'Address proof cross-checked.',
      'Reference calls made to at least 2 previous clients.',
    ],
  },
  {
    phase: 'Onboarding & Training',
    steps: [
      'Calyco 27-point quality checklist introduced and explained.',
      'Daily photo reporting and WhatsApp update protocol trained.',
      'Painter signs the Calyco Service Agreement covering workmanship standards.',
    ],
  },
  {
    phase: 'Continuous Evaluation',
    steps: [
      'Customer ratings collected after every project.',
      'Painters re-evaluated every 6 months.',
      'Teams with consistent low ratings removed from the network.',
    ],
  },
];

const promises = [
  { icon: '🛡️', text: 'You will never meet an unverified painter on a Calyco project.' },
  { icon: '📋', text: 'Every painter works with a supervisor assigned to your project.' },
  { icon: '📸', text: 'Daily progress photos come from the team — not from the customer.' },
  { icon: '✅', text: 'Work is not signed off until the supervisor approves the 27-point checklist.' },
  { icon: '💸', text: 'Painter payment is released only after your approval of the final handover.' },
];

const PainterVerificationPage = () => {
  const waLink = `${contactData.contact.whatsapp.link}?text=${encodeURIComponent(WA_SITE_VISIT)}`;

  return (
    <main className="min-h-screen bg-[#FBF9F6]">
      <SEO
        title="Verified Painters | Calyco 5-Star Painting Services"
        description="Calyco assigns background-checked, trained and supervised painters to every project. Learn how we verify every painter before they enter your home."
        url="https://calycopaints.com/verified-painters"
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0F1221] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F0C85A]/15 border border-[#F0C85A]/25 px-4 py-1.5 mb-6">
              <span className="text-[#F0C85A] text-sm">★★★★★</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F0C85A]/80">{BRAND_NAME}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-[-0.02em] leading-[1.08] mb-5">
              Verified Painters,<br />
              <span className="text-[#F0C85A]">Managed by Calyco.</span>
            </h1>
            <p className="text-base sm:text-lg text-white/55 font-light leading-[1.8] mb-8 max-w-2xl">
              Every painter you meet has passed 8 verification checks before being assigned to your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/get-quote"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-5 py-3 sm:px-7 sm:py-3.5 font-bold hover:bg-white transition-colors shadow-lg whitespace-nowrap"
              >
                Book a Verified Painter →
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white px-5 py-3 sm:px-7 sm:py-3.5 font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8-point verification section ──────────────────────────────────── */}
      <PainterVerificationSection compact={false} />

      {/* ── Screening process ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="mb-8">
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#0F1221]/40">How we screen</span>
          <div className="mt-2 mb-4 h-[1px] w-10 bg-[#0F1221]/10" />
          <h2 className="text-2xl sm:text-3xl font-light text-[#0F1221] tracking-[-0.01em]">
            The Screening Process.
          </h2>
        </div>

        <div className="space-y-4">
          {screeningProcess.map((phase, i) => (
            <div key={phase.phase} className="rounded-2xl border border-[#0F1221]/8 bg-white overflow-hidden">
              <div className="flex items-center gap-4 px-5 py-4 border-b border-[#0F1221]/6">
                <span className="w-7 h-7 rounded-full bg-[#0F1221] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <h3 className="font-semibold text-[#0F1221] text-sm sm:text-base">{phase.phase}</h3>
              </div>
              <div className="px-5 py-4 space-y-2.5">
                {phase.steps.map((step, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#25D366] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#0F1221]/65 font-light leading-[1.7]">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Calyco promises ───────────────────────────────────────────────── */}
      <section className="bg-[#F7F6F3] py-10 sm:py-12 border-y border-[#0F1221]/6">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-2xl font-light text-[#0F1221] tracking-[-0.01em] mb-6">
            What We Promise on Every Project.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {promises.map((p) => (
              <div key={p.text} className="flex gap-3.5 rounded-2xl border border-[#0F1221]/8 bg-white px-4 py-4">
                <span className="text-xl flex-shrink-0 leading-none mt-0.5">{p.icon}</span>
                <p className="text-sm text-[#0F1221]/70 font-light leading-[1.7]">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14">
        <div className="rounded-2xl bg-gradient-to-r from-[#0F1221] via-[#1a0b21] to-[#432553] px-6 sm:px-10 py-8 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F0C85A]/60 mb-2">{BRAND_NAME}</p>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-[-0.01em] mb-2">
              Ready to meet your verified painter?
            </h2>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <Link
              to="/get-quote"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-5 py-3 sm:px-7 sm:py-3.5 font-bold hover:bg-white transition-colors shadow-lg whitespace-nowrap"
            >
              Book Free Inspection →
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white px-5 py-2.5 sm:px-7 sm:py-3 font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              Browse services →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PainterVerificationPage;
