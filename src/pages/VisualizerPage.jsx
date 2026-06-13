import React, { useMemo, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getAllColors } from '../data/calycoColors.js';
import contactData from '../data/admin/contact.json';
import { BRAND_NAME } from '../data/positioning';

const flatColors = getAllColors();

// ─── Sample rooms ──────────────────────────────────────────────────────────────
const ROOMS = [
  { key: 'living',  label: 'Living Room', base: '/Assets/Rooms/LivingRoom/base.webp',  mask: '/Assets/Rooms/LivingRoom/mask-walls.webp',  package: 'Premium' },
  { key: 'dining',  label: 'Dining Room', base: '/Assets/Rooms/DiningRoom/base.webp',  mask: '/Assets/Rooms/DiningRoom/mask-walls.webp',  package: 'Standard' },
  { key: 'bedroom', label: 'Bedroom',     base: '/Assets/Rooms/Bedroom/base.webp',     mask: '/Assets/Rooms/Bedroom/mask-walls.webp',     package: 'Standard' },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '#ffffff');
  return res ? { r: parseInt(res[1], 16), g: parseInt(res[2], 16), b: parseInt(res[3], 16) } : { r: 255, g: 255, b: 255 };
}

function luminance({ r, g, b }) {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function recommendProduct(hex) {
  const rgb = hexToRgb(hex);
  const lum = luminance(rgb);
  if (lum > 0.75) return {
    name: 'Calyco Premium Interior Emulsion',
    reason: 'Light shades need superior spread and uniform coverage.',
    slug: '/product/Premium-Interior-Emulsion',
    tier: 'Premium',
  };
  if (lum > 0.35) return {
    name: 'Calyco Luxury Interior Emulsion',
    reason: 'Mid-tone shades benefit from deep base and washable finish.',
    slug: '/product/Luxury-Interior-Emulsion',
    tier: 'Luxury',
  };
  return {
    name: 'Calyco Luxury Interior Emulsion',
    reason: 'Deep or bold shades require high-opacity base for full coverage.',
    slug: '/product/Luxury-Interior-Emulsion',
    tier: 'Luxury',
  };
}

// ─── WhatsApp SVG ──────────────────────────────────────────────────────────────
const WaIcon = ({ cls = 'w-4 h-4' }) => (
  <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// ─── Color action panel ────────────────────────────────────────────────────────
const ColorActionPanel = ({ color, room, canvasRef, onAddToQuote }) => {
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);

  if (!color) return null;

  const product = recommendProduct(color.hex);
  const lum = luminance(hexToRgb(color.hex));
  const textOnSwatch = lum > 0.5 ? 'text-[#0F1221]' : 'text-white';

  const shareOnWhatsApp = () => {
    const msg = [
      `Hi Calyco — I used the Room Visualizer and love this colour.`,
      ``,
      `Colour: ${color.name || 'Selected colour'} (${color.hex})`,
      `Room: ${room.label}`,
      ``,
      `I would like to get a professional painting quote with this colour applied by verified painters.`,
      ``,
      `— ${BRAND_NAME}`,
    ].join('\n');
    window.open(`${contactData.contact.whatsapp.link}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    setShared(true);
  };

  const bookConsultation = () => {
    const msg = `Hi Calyco — I'd like to book a free colour consultation. I have selected ${color.name || color.hex} for my ${room.label} and want expert advice on finish and product.`;
    window.open(`${contactData.contact.whatsapp.link}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const handleSave = () => {
    onAddToQuote(color, room);
    setSaved(true);
  };

  const downloadPreview = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `calyco-preview-${(color.name || 'colour').replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-4">

      {/* ── Colour chip + name ── */}
      <div
        className="rounded-2xl p-5 flex items-center gap-4"
        style={{ backgroundColor: color.hex }}
      >
        <div className={`flex-1 ${textOnSwatch}`}>
          <p className="text-xs font-bold uppercase tracking-[0.14em] opacity-70 mb-0.5">Selected colour</p>
          <p className="text-lg font-semibold leading-tight">{color.name || 'Unnamed'}</p>
          <p className="text-sm font-mono opacity-60 mt-0.5">{color.hex?.toUpperCase()}</p>
        </div>
        <div className="w-12 h-12 rounded-xl border-2 border-white/30 flex-shrink-0" style={{ backgroundColor: color.hex }} />
      </div>

      {/* ── Like this colour? CTA ── */}
      <div className="rounded-2xl border border-[#F0C85A]/40 bg-[#FFFBEF] p-5">
        <p className="font-bold text-[#0F1221] text-base mb-1">Like this colour?</p>
        <p className="text-sm text-[#0F1221]/60 font-light leading-[1.7] mb-4">
          Get it painted professionally by {BRAND_NAME} — verified painters, proper wall preparation, and a warranty-backed finish.
        </p>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleSave}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${saved ? 'bg-[#25D366] text-white' : 'bg-[#0F1221] text-white hover:bg-[#493657]'}`}
          >
            {saved ? '✓ Colour saved to quote' : 'Add to Quote Request'}
          </button>

          <Link
            to={`/get-quote?color=${encodeURIComponent(color.name || color.hex)}&room=${encodeURIComponent(room.label)}`}
            className="block w-full text-center rounded-xl border border-[#0F1221]/15 text-[#0F1221]/70 py-3 text-sm font-semibold hover:border-[#0F1221]/30 hover:text-[#0F1221] transition-colors"
          >
            Book Painting Services →
          </Link>

          <button
            type="button"
            onClick={shareOnWhatsApp}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors ${shared ? 'bg-[#128C7E] text-white' : 'bg-[#25D366] text-white hover:bg-[#1fb355]'}`}
          >
            <WaIcon />
            {shared ? 'Sent to WhatsApp ✓' : 'Share Preview on WhatsApp'}
          </button>

          <button
            type="button"
            onClick={bookConsultation}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/30 text-[#1a8c48] py-3 text-sm font-bold hover:bg-[#25D366]/8 transition-colors"
          >
            <WaIcon cls="w-3.5 h-3.5" />
            Book Colour Consultation (Free)
          </button>

          <button
            type="button"
            onClick={downloadPreview}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#0F1221]/10 text-[#0F1221]/55 py-2.5 text-xs font-semibold hover:border-[#0F1221]/20 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Download Preview
          </button>
        </div>
      </div>

      {/* ── Recommended product ── */}
      <div className="rounded-2xl border border-[#0F1221]/8 bg-white p-4">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0F1221]/35 mb-3">Recommended product</p>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg flex-shrink-0 border border-[#0F1221]/8" style={{ backgroundColor: color.hex }} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#0F1221] leading-snug">{product.name}</p>
            <p className="text-[11px] text-[#0F1221]/45 font-light mt-0.5 leading-[1.5]">{product.reason}</p>
            <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-[0.1em] rounded-full bg-[#493657]/8 text-[#493657] px-2 py-0.5">{product.tier} tier</span>
          </div>
        </div>
        <Link
          to={product.slug}
          className="mt-3 block text-center rounded-lg border border-[#0F1221]/10 text-[#493657] text-xs font-bold py-2 hover:border-[#493657]/30 hover:bg-[#493657]/3 transition-colors"
        >
          View product →
        </Link>
      </div>

      {/* ── Recommended package ── */}
      <div className="rounded-2xl border border-[#0F1221]/8 bg-[#FAFAF8] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0F1221]/35 mb-2">Recommended service package</p>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">⭐</span>
            <p className="text-sm font-bold text-[#0F1221]">{room.package} Package</p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] rounded-full bg-[#F0C85A]/20 text-[#7a6020] px-2.5 py-1">for {room.label}</span>
        </div>
        <p className="text-xs text-[#0F1221]/50 font-light leading-[1.65] mb-3">
          {room.package === 'Premium'
            ? 'Surface repair, damp-resist primer, 2-coat washable emulsion, supervisor check. 2-year warranty.'
            : 'Surface prep, primer, 2-coat emulsion, masking, cleanup. Workmanship warranty included.'}
        </p>
        <Link
          to="/calculators/service-cost-calculator?service=interior-painting"
          className="block text-center rounded-lg bg-[#0F1221] text-white text-xs font-bold py-2 hover:bg-[#493657] transition-colors"
        >
          Calculate Package Cost
        </Link>
      </div>

    </div>
  );
};

// ─── Main page ─────────────────────────────────────────────────────────────────
const VisualizerPage = () => {
  const [room, setRoom]     = useState(ROOMS[0]);
  const [color, setColor]   = useState(flatColors?.[0] || null);
  const [upload, setUpload] = useState(null);
  const [search, setSearch] = useState('');
  const [savedColors, setSavedColors] = useState([]);
  const canvasRef = useRef(null);
  const baseImg   = useMemo(() => new Image(), []);
  const maskImg   = useMemo(() => new Image(), []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const baseSrc = upload || room.base;
    baseImg.crossOrigin = 'anonymous';
    baseImg.src = baseSrc;
    maskImg.crossOrigin = 'anonymous';
    maskImg.src = room.mask;
    baseImg.onload = () => {
      canvas.width = baseImg.width;
      canvas.height = baseImg.height;
      ctx.drawImage(baseImg, 0, 0);
      maskImg.onload = () => {
        ctx.drawImage(maskImg, 0, 0);
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = img.data;
        const { r, g, b } = hexToRgb(color?.hex || '#ffffff');
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] > 10) { data[i] = r; data[i + 1] = g; data[i + 2] = b; data[i + 3] = 180; }
        }
        ctx.putImageData(img, 0, 0);
      };
    };
  }, [room, color, upload]);

  React.useEffect(() => { draw(); }, [draw]);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUpload(URL.createObjectURL(file));
  };

  const handleAddToQuote = (col, rm) => {
    setSavedColors((prev) => {
      const exists = prev.find((c) => c.hex === col.hex);
      if (exists) return prev;
      return [...prev, { ...col, room: rm.label }];
    });
  };

  const visibleColors = search.trim()
    ? flatColors.filter((c) => c.name?.toLowerCase().includes(search.toLowerCase()) || c.hex?.toLowerCase().includes(search.toLowerCase()))
    : flatColors;

  const waLink = `${contactData.contact.whatsapp.link}?text=${encodeURIComponent(
    `Hi Calyco — I used the Room Visualizer and want a professional painting quote. Please arrange a free site visit.\n\n— ${BRAND_NAME}`
  )}`;

  return (
    <div className="min-h-screen bg-[#FBF9F6]">
      <SEO
        title="Room Colour Visualizer | Calyco 5-Star Painting Services"
        description="Try Calyco colours on sample rooms or your own photo. When you find your colour, book professional painting with verified painters."
        url="https://calycopaints.com/visualizer"
      />

      {/* Header */}
      <div className="bg-[#0F1221] px-5 sm:px-8 py-7 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F0C85A]/70 mb-2">{BRAND_NAME}</p>
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-[-0.01em] mb-1">Room Colour Visualizer</h1>
          <p className="text-sm text-white/45 font-light">Choose a room, pick a colour — then book it painted professionally.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* Room selector + controls */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {ROOMS.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => { setRoom(r); setUpload(null); }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${room.key === r.key ? 'bg-[#493657] text-white shadow-sm' : 'border border-[#0F1221]/12 text-[#0F1221]/60 hover:border-[#493657]/40'}`}
            >
              {r.label}
            </button>
          ))}
          <label className="px-4 py-2 rounded-full border border-[#0F1221]/12 text-[#0F1221]/55 text-sm font-semibold cursor-pointer hover:border-[#493657]/40 transition-colors">
            Upload Photo
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
          {upload && (
            <button
              type="button"
              onClick={() => setUpload(null)}
              className="px-4 py-2 rounded-full border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors"
            >
              Remove Upload
            </button>
          )}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px_280px] gap-5">

          {/* Canvas */}
          <div className="rounded-2xl border border-[#0F1221]/8 bg-white overflow-hidden shadow-sm">
            <canvas ref={canvasRef} className="w-full h-auto" aria-label="Room preview canvas" />
            {color && (
              <div className="border-t border-[#0F1221]/8 px-4 py-3 flex items-center justify-between gap-3 bg-[#FAFAF8]">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg border border-[#0F1221]/10 flex-shrink-0" style={{ backgroundColor: color.hex }} />
                  <span className="text-sm font-medium text-[#0F1221]/70">{color.name || color.hex}</span>
                </div>
                <span className="text-xs text-[#0F1221]/35 font-mono">{color.hex?.toUpperCase()}</span>
              </div>
            )}
          </div>

          {/* Colour picker */}
          <div className="rounded-2xl border border-[#0F1221]/8 bg-white overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-[#0F1221]/8">
              <h2 className="text-sm font-bold text-[#0F1221] mb-2">Pick a colour</h2>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search colour name or hex…"
                className="w-full rounded-xl border border-[#0F1221]/10 bg-[#FAFAF8] px-3 py-2 text-sm text-[#0F1221] placeholder-[#0F1221]/30 focus:outline-none focus:ring-2 focus:ring-[#493657]"
              />
            </div>
            <div className="grid grid-cols-5 gap-1.5 p-3 max-h-[55vh] overflow-y-auto overscroll-contain">
              {visibleColors.map((c) => (
                <button
                  key={c.slug || c.name || c.hex}
                  type="button"
                  onClick={() => setColor(c)}
                  title={c.name}
                  aria-label={`${c.name} ${c.hex}`}
                  className={`aspect-square rounded-lg border-2 transition-all ${color?.hex === c.hex ? 'border-[#493657] scale-110 shadow-md z-10 relative' : 'border-transparent hover:border-[#0F1221]/20 hover:scale-105'}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {visibleColors.length === 0 && (
                <div className="col-span-5 py-8 text-center text-sm text-[#0F1221]/40 font-light">No colours match your search.</div>
              )}
            </div>
            <div className="px-3 py-2 border-t border-[#0F1221]/8 text-xs text-[#0F1221]/35 font-light text-center">
              {visibleColors.length} colours · {flatColors.length} total
            </div>
          </div>

          {/* Colour action panel */}
          <div className="overflow-y-auto max-h-[80vh] pr-0.5">
            {color ? (
              <ColorActionPanel
                color={color}
                room={room}
                canvasRef={canvasRef}
                onAddToQuote={handleAddToQuote}
              />
            ) : (
              <div className="rounded-2xl border border-dashed border-[#0F1221]/15 bg-[#FAFAF8] flex flex-col items-center justify-center p-8 text-center min-h-[200px]">
                <div className="w-10 h-10 rounded-xl bg-[#0F1221]/8 mb-3" />
                <p className="text-sm font-semibold text-[#0F1221]/50">Pick a colour to see options</p>
                <p className="text-xs text-[#0F1221]/35 font-light mt-1">Booking, WhatsApp share and product recommendations appear here.</p>
              </div>
            )}
          </div>

        </div>

        {/* Saved colours strip */}
        {savedColors.length > 0 && (
          <div className="mt-5 rounded-2xl border border-[#0F1221]/8 bg-white p-4">
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="text-sm font-bold text-[#0F1221]">Saved colours ({savedColors.length})</p>
              <Link
                to={`/get-quote?colors=${encodeURIComponent(savedColors.map((c) => c.name || c.hex).join(', '))}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0F1221] text-white px-4 py-2 text-xs font-bold hover:bg-[#493657] transition-colors"
              >
                Add all to Quote →
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {savedColors.map((c) => (
                <div key={c.hex} className="flex items-center gap-2 rounded-full border border-[#0F1221]/10 bg-[#FAFAF8] px-3 py-1.5">
                  <div className="w-4 h-4 rounded-full flex-shrink-0 border border-[#0F1221]/10" style={{ backgroundColor: c.hex }} />
                  <span className="text-xs font-medium text-[#0F1221]/65">{c.name || c.hex}</span>
                  <span className="text-[10px] text-[#0F1221]/30">{c.room}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA strip */}
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#0F1221] via-[#1a0b21] to-[#432553] px-5 sm:px-8 py-6 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F0C85A]/60 mb-1">{BRAND_NAME}</p>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-1.5">
              {color ? `Like ${color.name || 'this colour'}? Get it painted professionally.` : 'Found your colour? Get it painted professionally.'}
            </h2>
            <p className="text-sm text-white/50 font-light max-w-md">
              Verified painters · Proper wall preparation · Fixed written quote · Daily WhatsApp updates · Warranty-backed finish.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 flex-shrink-0 w-full sm:w-auto">
            <Link
              to="/get-quote"
              className="flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-6 py-3 text-sm font-bold hover:bg-white transition-colors shadow-lg whitespace-nowrap"
            >
              Book Painting Services →
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 text-white px-6 py-3 text-sm font-bold hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              <WaIcon />
              Book Colour Consultation
            </a>
            <Link
              to="/calculators/service-cost-calculator"
              className="text-center text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Calculate paint + labour cost →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VisualizerPage;
