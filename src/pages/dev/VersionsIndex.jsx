import { Link } from 'react-router-dom';
import { useEffect } from 'react';

/* ── Hidden design-versions gallery ─────────────────────────────────────────
   Not linked anywhere on the site — reachable only via /dev/versions.
   Lists every historical homepage design for internal review. */

const GOLD   = '#F0C85A';
const PURPLE = '#493657';

const VERSIONS = [
  { label: 'Final (Live)', to: '/',                      desc: 'The current production homepage.', live: true },
  { label: 'Classic',      to: '/dev/versions/classic',  desc: 'Original static-hero homepage.' },
  { label: 'Original',     to: '/dev/versions/original', desc: 'First HomePage build.' },
  { label: 'V2',           to: '/dev/versions/v2',       desc: 'Lead-capture hero variant.' },
  { label: 'V3',           to: '/dev/versions/v3',       desc: 'Process-focused variant.' },
  { label: 'V4',           to: '/dev/versions/v4',       desc: '"The Art of Perfect Painting" editorial variant.' },
  { label: 'V5',           to: '/dev/versions/v5',       desc: 'Split-panel parallax variant.' },
];

export default function VersionsIndex() {
  // Keep this page out of search engines
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFAF8] py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="block w-10 h-px" style={{ background: GOLD }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: PURPLE }}>Internal — Design Archive</span>
        </div>
        <h1 className="text-[2rem] sm:text-[2.6rem] font-light text-[#0F1221] tracking-[-0.02em] leading-[1.12] mb-3">
          Homepage versions.
        </h1>
        <p className="text-[#0F1221]/45 text-[14px] font-light leading-relaxed max-w-md mb-10">
          Every homepage design we&apos;ve built, preserved for reference. This page is unlisted — only people with the link can see it.
        </p>

        <div className="space-y-3">
          {VERSIONS.map((v) => (
            <Link
              key={v.label}
              to={v.to}
              className="group flex items-center justify-between gap-4 bg-white rounded-2xl border border-[#0F1221]/8 px-5 py-4 hover:shadow-[0_8px_30px_rgba(15,18,33,0.10)] transition-all"
            >
              <div className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${v.live ? 'bg-[#25D366]' : ''}`} style={v.live ? {} : { background: GOLD }} />
                <div>
                  <p className="text-[15px] font-semibold text-[#0F1221] group-hover:text-[#493657] transition-colors">
                    {v.label}
                    {v.live && <span className="ml-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#25D366]">Live</span>}
                  </p>
                  <p className="text-[12px] text-[#0F1221]/40 font-light mt-0.5">{v.desc}</p>
                </div>
              </div>
              <span className="text-[#0F1221]/25 group-hover:text-[#F0C85A] group-hover:translate-x-1 transition-all">→</span>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-[11px] text-[#0F1221]/30 font-light">
          These pages are kept out of the navbar, sitemap and search engines.
        </p>
      </div>
    </main>
  );
}
