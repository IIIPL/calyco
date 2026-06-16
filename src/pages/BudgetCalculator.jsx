import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, animate, useMotionValue, useInView } from 'framer-motion';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import { calculateServiceEstimate, cityMultipliers, servicePricing } from '../data/servicePricing';
import contactData from '../data/admin/contact.json';
import LocationPicker from '../components/LocationPicker';
import DatePicker from '../components/DatePicker';
import RazorpayPayment from '../components/RazorpayPayment';

/* ── Brand tokens (match HomeFinal / ServicesPage exactly) ───────────────── */
const DARK   = '#0F1221';
const GOLD   = '#F0C85A';
const PURPLE = '#493657';

const WA_BASE   = contactData?.contact?.whatsapp?.link ?? 'https://wa.me/918796777399';
const PHONE_RAW = contactData?.contact?.phone?.rawNumber ?? '+918796777399';
const CITIES    = Object.keys(cityMultipliers);

/* ── Integration ─────────────────────────────────────────────────────────── */
const WEB3FORMS_KEY   = '52da37be-e058-4a07-92c1-a07f95c25f6b';
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbymvT57AjE5zrrHSKycG7cT6sxMXHfi2kzKKHARMgFMmpiqJPU1KFPJaksACK2v5VD0/exec';
const MAX_FILE_MB     = 8;
const MAX_FILES       = 5;

/* Google service account — direct API from browser */
const SA_EMAIL  = 'painting-website-bot@painting-website-499005.iam.gserviceaccount.com';
const SA_KEY    = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5Sy7tJOFW1Sji\nCFUYYgGOZzhCAFNKuHCB2BkYudknozuqVhxhRA7vrY8rFQzrnIP1RaPVkYn/rkc8\nx2qb+jaazbFTqTzyrRWDbv44896tup2QNR1AtiTofh8+3ctUpuyLYGCWTLM53aAB\n5BOpA/QLDv98G1ruzsbi9paKjDPOSESt2xSiid/JZGKy0SQ3JQhL+WySeHMyP/0Q\nl7FcEHNTOCjUQG9jAWf2mxP4tabjEOUq+2wC7NQ0iKJ3GNR89FD4WtxyHoYxMFc5\nHwIpM+WUaSTCplYQAVRiGDf4ZQ8hFOwG55sr07BqwnAnVojN/6zWgCAJ6PlPicxH\nHBWHtYKtAgMBAAECggEABx+YUL6buSJdvX7Tgqn15FscgxEPIq6/iIZdxKEUc50n\nZI+F7MlYh6dU+zOGeSJdwlaoi0Pamc1B6NjDxPZUFhR1TkGR2cSEsLZaKKdbdrNX\nbl1UYBIAjj2XBuww7nKyYlNUs0KEm2NlTN1PUi6YObqcYNGOZ+LkK4KOXAoyzanR\ntQOWw7TqD2or7zZJrpckBdDfBBB+YWsh1IO1OWKBJUxzAkvizoYHmQJsh8Jfs3M6\nM4/2qB/m0tcGw0quBZnroMtH0Hck2UC6MVJWjRE9X/OZpIy7XkV1Xtn6rf3zcjYn\nHOn0V0AUp8vTgAWXkS4zI+CO3tl01zmOYuEP0GZAwwKBgQD3C35SOFpH6zWAJhi5\nOTNv8N4rHp8rQXTDkXNiyQBD4vHzgfo11yeuoqK5lWR/FXAbLxY3XIL6EyWQCl5w\naW7jIWdHzhxQYEgwAk/8G7Z9+0GEQNPVx+bmxrZIYdqEhJKOW8ozw+WqBok9KySf\nudK/Yl6ZHL28lF363aUgqVOPmwKBgQDAAqf4saYKWJi5dhcTeDINt4d8FiprkBzx\nSiZQmOHmZx6z2Tg+R71C84rd83T55QFM+jO52TYWnPT4R36qKCdENaivVqOH7ORZ\nMzLQquatBwu55Mz4yaucXZ7YrbHEqdxOa6d2bE6PxvzdcnTpWx8Givj15CS3DFCw\ns3CwIprvVwKBgDONZnLp540SfDudt5MPaLh3XyVIYpa4NhGJjLaUk0WXWj4iZYBO\nwa0jqylnD22ln5tMnCo5V+uviysfvs1ecxFaqx7E2Au9y9KY6PAHKHHpuKZMkOgP\nqxOFbAx2vw7gS2UBqpRa0NZGPuVQ13etY1kkwfDZmo57t5DeJ9NFAnb5AoGAVYYZ\nWT2PjpYt2JXP630jFlcEAvJAjM6RBayYalfebujJlSQQ2DTOCS8/UGMrXE9zh9z+\nAy7L18CroJb/xTzDWK9p5kd56YZLo6uZW7Zzrugvgep2ne3+AVT19t9PCiD6nvd2\njNnrGEFyyhQ8HODYbeqiv6uR6vKSUlJqxBl111sCgYEA1AFgT2YgQK5LrKKYXarn\ncISJZJ6u3CFU9PVfQnK2vn4SCciIMXs8HtDYniSffu/IhY7mHjI3YBpJUwFgS/vK\nnfslmsvpsfzvKe/LwQGiXH0YrJDp598FOgLmiUDEbW0xxTtBc4W0SIimpVi1/9D0\nAzYKTrJWNNMZX8e+ubn9xS8=\n-----END PRIVATE KEY-----\n';
const SHEET_ID  = '13OGMg0NnPYOUxB0anPbPG2WHqu-D79kJfHj2C96xUcg';
const DRIVE_ROOT= '1MsjsWU9LhKvVoGxg-FwmsKrSU5HkEKqo';

const SHEET_HEADERS = [
  'Timestamp', 'Name', 'Phone', 'City',
  'Service', 'Paint Type', 'Carpet Area (sq ft)', 'Paintable Area (sq ft)',
  'Preference', 'Estimate', 'Files', 'Drive Folder',
  'House No', 'Street', 'Area', 'Pincode', 'Visit Date', 'Location Link',
  'Payment Status'
];

async function getGoogleToken() {
  const b64url = obj =>
    btoa(JSON.stringify(obj)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const now = Math.floor(Date.now() / 1000);
  const sigInput = `${b64url({ alg: 'RS256', typ: 'JWT' })}.${b64url({
    iss:   SA_EMAIL,
    scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive',
    aud:   'https://oauth2.googleapis.com/token',
    iat:   now,
    exp:   now + 3600,
  })}`;

  const pemBody  = SA_KEY.replace(/-----[^-]+-----/g, '').replace(/\s/g, '');
  const keyBytes = Uint8Array.from(atob(pemBody), c => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8', keyBytes.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false, ['sign']
  );
  const sig = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5', cryptoKey, new TextEncoder().encode(sigInput)
  );
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const jwt = `${sigInput}.${sigB64}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(JSON.stringify(data));
  return data.access_token;
}

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Hidden form + iframe upload — bypasses CORS entirely (forms are always cross-origin safe)
function uploadViaForm(url, data) {
  return new Promise((resolve) => {
    const uid    = 'cif_' + Date.now();
    const iframe = document.createElement('iframe');
    iframe.name  = uid;
    iframe.style.cssText = 'display:none;position:absolute;width:0;height:0';
    document.body.appendChild(iframe);

    const form   = document.createElement('form');
    form.method  = 'POST';
    form.action  = url;
    form.target  = uid;
    form.style.display = 'none';

    const input  = document.createElement('input');
    input.type   = 'hidden';
    input.name   = 'payload';
    input.value  = JSON.stringify(data);
    form.appendChild(input);
    document.body.appendChild(form);

    const cleanup = () => {
      try { document.body.removeChild(iframe); } catch {}
      try { document.body.removeChild(form);   } catch {}
      resolve();
    };
    iframe.addEventListener('load', cleanup, { once: true });
    setTimeout(cleanup, 20000); // 20 s safety fallback
    form.submit();
  });
}

async function sheetsEnsureHeaders(token) {
  try {
    const res  = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:L1`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) return; // sheet call failed — skip header check, proceed to append
    const data = await res.json();
    if (!data.values?.length) {
      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:append?valueInputOption=RAW`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ values: [SHEET_HEADERS] }),
        }
      );
    }
  } catch {
    // non-critical — sheet headers check failed, proceed to data append anyway
  }
}

async function sheetsAppend(token, row, sheetName = 'Sheet1') {
  const range = encodeURIComponent(`${sheetName}!A1`);
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [row] }),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sheets append ${res.status}: ${text}`);
  }
}

async function driveCreateFolder(token, name) {
  const res = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [DRIVE_ROOT],
    }),
  });
  const data = await res.json();
  return data.id;
}

async function driveUploadFile(token, folderId, file) {
  const boundary = 'calyco_' + Date.now().toString(36);
  const meta     = JSON.stringify({
    name:     file.name,
    mimeType: file.type || 'application/octet-stream',
    parents:  [folderId],
  });
  const mime = file.type || 'application/octet-stream';

  // multipart/related — metadata part then file part, single CRLF before each boundary
  const body = new Blob([
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}`,
    `\r\n--${boundary}\r\nContent-Type: ${mime}\r\n\r\n`,
    file,
    `\r\n--${boundary}--`,
  ]);

  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name',
    {
      method:  'POST',
      headers: {
        Authorization:  `Bearer ${token}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body,
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Drive upload ${res.status}: ${text}`);
  }
  const data = await res.json();
  console.log('[Drive] uploaded:', data.name, data.id);
  return data;
}

const PAINTABLE_MULT = 3.3;
const toPaintable = (carpet) => Math.round(parseFloat(carpet) * PAINTABLE_MULT);
const fmt  = (v) => `₹${Math.round(Number(v)).toLocaleString('en-IN')}`;

/* ── Service categories (3 — matching services page) ─────────────────────── */
const CALC_SERVICES = [
  {
    key: 'interior',
    label: 'Interior Painting',
    desc: 'Walls & ceilings inside your home',
    image: '/service/Interior Painting.webp',
    fromPrice: '₹18/sq ft',
    showPaintType: true,
    slugs: { fresh: 'interior-fresh-painting', repainting: 'interior-repaint' },
    tierKey: 'default',
  },
  {
    key: 'exterior',
    label: 'Exterior Painting',
    desc: 'Outside walls & facade',
    image: '/service/Exterior Painting.webp',
    fromPrice: '₹24/sq ft',
    showPaintType: true,
    slugs: { fresh: 'exterior-fresh-painting', repainting: 'exterior-repaint' },
    tierKey: 'default',
  },
  {
    key: 'texture',
    label: 'Texture & Decorative',
    desc: 'Feature walls & designer finishes',
    image: '/service/Texture Painting.webp',
    fromPrice: '₹55/sq ft',
    showPaintType: false,
    slugs: { fresh: 'texture-decorative-painting', repainting: 'texture-decorative-painting' },
    tierKey: 'texture',
  },
];

const BHK_SIZES = [
  { key: '1bhk', label: '1 BHK',  carpet: 600,  hint: '500–650 sq ft'     },
  { key: '2bhk', label: '2 BHK',  carpet: 850,  hint: '700–1,000 sq ft'   },
  { key: '3bhk', label: '3 BHK',  carpet: 1200, hint: '1,100–1,500 sq ft' },
  { key: '4bhk', label: '4 BHK+', carpet: 1800, hint: '1,600+ sq ft'      },
];

const PAINT_TYPES = [
  { key: 'fresh',      label: 'Fresh Painting', desc: 'New construction or bare / unpainted walls' },
  { key: 'repainting', label: 'Re-Painting',    desc: 'Change colours or refresh existing walls'   },
];

const PREFERENCES = [
  {
    key: 'economy',
    label: 'Economy',
    tag: 'Budget-friendly',
    gradient: 'linear-gradient(145deg, #3a8060 0%, #2D6A4F 55%, #1f5240 100%)',
    glowColor: 'rgba(45,106,79,0.38)',
    tagline: "Solid finish that doesn't compromise on quality.",
    features: ['Matt Finish', 'Non-Washable', 'Durability up to 2 years'],
  },
  {
    key: 'premium',
    label: 'Premium',
    tag: 'Most Popular',
    gradient: 'linear-gradient(145deg, #2286E0 0%, #1565C0 55%, #0D47A1 100%)',
    glowColor: 'rgba(21,101,192,0.38)',
    tagline: 'Classy, elegant finish with lasting colour.',
    features: ['Matt & Sheen Finish', 'Semi-Washable', 'Durability up to 5 years'],
    popular: true,
  },
  {
    key: 'luxury',
    label: 'Luxury',
    tag: 'Finest finish',
    gradient: 'linear-gradient(145deg, #C4601E 0%, #92400E 55%, #6B2D0A 100%)',
    glowColor: 'rgba(146,64,14,0.38)',
    tagline: 'Exquisite, royal walls with the best materials.',
    features: ['Matt & Sheen Finish', 'Fully-Washable', 'Durability up to 7 years'],
  },
];

/* economy/premium/luxury → service tier name, by service key */
const TIER_MAPS = {
  default: { economy: 'Economy',  premium: 'Premium',  luxury: 'Luxury'   },
  texture: { economy: 'Basic',    premium: 'Designer', luxury: 'Premium'  },
};

const PRODUCTS = {
  economy: [
    { name: 'Apcolite Advance',  brand: 'AP', color: '#1565C0' },
    { name: 'Beauty Gold',       brand: 'NL', color: '#7B1FA2' },
    { name: 'SuperCover',        brand: 'DX', color: '#C0392B' },
    { name: 'Haisha Select',     brand: 'HS', color: '#37474F' },
  ],
  premium: [
    { name: 'Royale Aspira',     brand: 'AP', color: '#1565C0' },
    { name: 'Silk Glamour',      brand: 'BG', color: '#276749' },
    { name: 'Dulux Promise',     brand: 'DX', color: '#C0392B' },
    { name: 'Impressions HD',    brand: 'NL', color: '#7B1FA2' },
  ],
  luxury: [
    { name: 'Royale Health Shield', brand: 'AP', color: '#1565C0' },
    { name: 'Silk Luxury Emulsion', brand: 'BG', color: '#276749' },
    { name: 'Velvet Touch',         brand: 'DX', color: '#C0392B' },
    { name: 'Excel Mica Marble',    brand: 'NL', color: '#7B1FA2' },
  ],
};

/* ── Estimate computation ─────────────────────────────────────────────────── */
function computeRange({ serviceKey, paintType, carpetArea, city, preference }) {
  const svc    = CALC_SERVICES.find(s => s.key === serviceKey);
  const carpet = parseFloat(carpetArea);
  if (!svc || !carpet || carpet <= 0) return null;

  const slug    = svc.slugs[paintType] || svc.slugs.repainting;
  const service = servicePricing.find(s => s.slug === slug);
  if (!service) return null;

  const tierMap    = TIER_MAPS[svc.tierKey] ?? TIER_MAPS.default;
  const wantedTier = tierMap[preference];
  const availTiers = Object.keys(service.tiers || {});
  const tier       = availTiers.includes(wantedTier) ? wantedTier : availTiers[0];

  const paintable = toPaintable(carpet);
  const r         = calculateServiceEstimate({ service, city, quantity: paintable, tier });

  const avg = Math.round((r.subtotalMin + r.subtotalMax) / 2);

  return {
    svcLabel:  svc.label,
    svcImage:  svc.image,
    paintType: PAINT_TYPES.find(p => p.key === paintType)?.label ?? paintType,
    tier, city,
    paintable,
    carpetArea: carpet,
    min: r.subtotalMin,
    max: r.subtotalMax,
    avg,
  };
}

/* ── Primitives ──────────────────────────────────────────────────────────── */
const Eyebrow = ({ text }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="w-6 h-px flex-shrink-0" style={{ background: GOLD }} />
    <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: PURPLE }}>{text}</span>
  </div>
);

function WaIcon({ size = 4 }) {
  return (
    <svg className={`w-${size} h-${size} fill-current flex-shrink-0`} viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/* ── City dropdown — Calyco style ────────────────────────────────────────── */
function CitySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-3 bg-[#FAFAF8] border border-[#0F1221]/10 rounded-2xl px-5 py-3.5 text-[14px] text-[#0F1221] font-medium hover:border-[#F0C85A]/50 focus:border-[#F0C85A] focus:outline-none transition-colors">
        <span className="flex items-center gap-2.5 min-w-0">
          <svg className="w-4 h-4 text-[#493657] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <span className="truncate">{value}</span>
        </span>
        <motion.span className="flex-shrink-0" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }}>
          <svg className="w-4 h-4 text-[#0F1221]/25" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -6, scaleY: 0.96 }} animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.96 }} transition={{ duration: 0.14 }}
            style={{ transformOrigin: 'top' }}
            className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-[0_16px_48px_rgba(15,18,33,0.12)] border border-[#0F1221]/6 z-30 max-h-52 overflow-y-auto">
            {CITIES.map(c => (
              <button key={c} type="button" onClick={() => { onChange(c); setOpen(false); }}
                className={`w-full text-left px-5 py-2.5 text-[13px] transition-colors ${
                  c === value
                    ? 'bg-[#F0C85A]/12 text-[#0F1221] font-bold'
                    : 'text-[#0F1221]/60 hover:bg-[#FAFAF8] font-medium'
                }`}>
                {c}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Step 1 — Service + Carpet area + Paint type ────────────────────────── */
function Step1({ city, setCity, serviceKey, setServiceKey, carpetArea, setCarpetArea, paintType, setPaintType, onNext, areaError }) {
  const currentSvc    = CALC_SERVICES.find(s => s.key === serviceKey);
  const showPaintType = currentSvc?.showPaintType ?? false;
  const paintable     = carpetArea && parseFloat(carpetArea) > 0
    ? toPaintable(parseFloat(carpetArea)).toLocaleString()
    : null;

  return (
    <div className="p-6 sm:p-8 space-y-7">

      {/* City */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0F1221]/30 mb-2">Your city</p>
        <CitySelect value={city} onChange={setCity} />
      </div>

      {/* Service category cards */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0F1221]/30 mb-3">What do you want to paint?</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {CALC_SERVICES.map(svc => {
            const active = serviceKey === svc.key;
            return (
              <button key={svc.key} onClick={() => setServiceKey(svc.key)}
                className={`group flex flex-row sm:flex-col overflow-hidden rounded-2xl transition-all duration-200 text-left focus:outline-none ${
                  active
                    ? 'ring-[3px] ring-[#F0C85A] shadow-[0_8px_28px_rgba(240,200,90,0.3)]'
                    : 'ring-1 ring-[#0F1221]/8 hover:ring-[#0F1221]/20 hover:shadow-sm'
                }`}>
                <div className="relative overflow-hidden flex-shrink-0 w-28 self-stretch sm:w-auto sm:self-auto sm:aspect-[4/3]">
                  <img src={svc.image} alt={svc.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute inset-0 transition-all duration-200 ${active ? 'bg-[#F0C85A]/10' : 'bg-gradient-to-t from-[#0F1221]/55 to-transparent'}`} />
                  {active
                    ? <div className="absolute inset-0 bg-gradient-to-t from-[#0F1221]/55 to-transparent" />
                    : null}
                  {/* Checkmark */}
                  <AnimatePresence>
                    {active && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                        className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center shadow-md"
                        style={{ background: GOLD }}>
                        <svg className="w-3 h-3 text-[#0F1221]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="absolute bottom-2 left-2.5 text-[9px] font-bold text-white/80 drop-shadow">
                    From {svc.fromPrice}
                  </span>
                </div>
                {/* Text row */}
                <div className={`flex-1 flex flex-col justify-center px-3.5 py-3 sm:px-3 sm:pt-2.5 sm:pb-3 transition-colors duration-200 ${active ? 'bg-[#FFF8DC]' : 'bg-white'}`}>
                  <p className="text-[13px] sm:text-[12px] font-bold leading-tight text-[#0F1221]">{svc.label}</p>
                  <p className="text-[11px] sm:text-[10px] font-light text-[#0F1221]/45 mt-0.5 leading-snug">{svc.desc}</p>
                </div>
                {/* Gold bottom accent bar */}
                <div className={`hidden sm:block h-[3px] transition-all duration-200 ${active ? 'opacity-100' : 'opacity-0'}`} style={{ background: GOLD }} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Carpet area input */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0F1221]/30 mb-3">Carpet area of your house</p>
        <div className="relative mb-2">
          <input
            type="number" min="1" value={carpetArea}
            onChange={e => setCarpetArea(e.target.value)}
            placeholder="e.g. 850"
            aria-label="Carpet area of your house in square feet"
            className={`w-full bg-[#FAFAF8] border-2 rounded-2xl px-5 py-4 text-[1.6rem] font-light text-[#0F1221] pr-24 focus:outline-none transition-colors placeholder:text-[#0F1221]/18 leading-none ${areaError ? 'border-red-400 focus:border-red-400' : 'border-[#0F1221]/10 focus:border-[#F0C85A]'}`}
          aria-invalid={!!areaError}
          aria-describedby={areaError ? 'area-error' : undefined}
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#0F1221]/30 uppercase tracking-wider">sq ft</span>
        </div>
        {/* Inline validation error */}
        <AnimatePresence>
          {areaError && (
            <motion.p id="area-error" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-[12px] text-red-500 font-medium mt-1.5">
              {areaError}
            </motion.p>
          )}
        </AnimatePresence>
        {/* Live paintable preview */}
        <AnimatePresence>
          {paintable && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-[12px] text-[#0F1221]/40 font-light mb-3">
              Paintable wall area for estimate:&nbsp;
              <span className="font-semibold text-[#0F1221]/65">~{paintable} sq ft</span>
              <span className="text-[#0F1221]/25"> (carpet × 3.3)</span>
            </motion.p>
          )}
        </AnimatePresence>
        {/* Quick-fill shortcuts */}
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F1221]/25 mb-2">Quick fill</p>
        <div className="flex gap-2 flex-wrap">
          {BHK_SIZES.map(b => (
            <button key={b.key} type="button" onClick={() => setCarpetArea(String(b.carpet))}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all duration-150 ${
                carpetArea === String(b.carpet)
                  ? 'border-[#F0C85A] bg-[#F0C85A]/10 text-[#0F1221]'
                  : 'border-[#0F1221]/8 bg-[#F7F6F4] text-[#0F1221]/50 hover:border-[#0F1221]/18'
              }`}>
              {b.label} <span className="font-light opacity-60">~{b.carpet}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Paint type — only for services that have this distinction */}
      <AnimatePresence>
        {showPaintType && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0F1221]/30 mb-3">Type of painting</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PAINT_TYPES.map(pt => {
                const active = paintType === pt.key;
                return (
                  <button key={pt.key} onClick={() => setPaintType(pt.key)}
                    className={`relative flex items-start gap-3 px-4 py-4 rounded-2xl border-2 text-left transition-all duration-200 overflow-hidden ${
                      active
                        ? 'border-[#F0C85A] bg-[#0F1221] shadow-[0_4px_18px_rgba(240,200,90,0.22)]'
                        : 'border-[#0F1221]/8 bg-white hover:border-[#0F1221]/20 hover:shadow-sm'
                    }`}>
                    {/* Left accent stripe */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all ${active ? 'opacity-100' : 'opacity-0'}`}
                      style={{ background: GOLD }} />
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${active ? '' : 'bg-[#0F1221]/6'}`}
                      style={active ? { background: 'rgba(240,200,90,0.15)' } : {}}>
                      <div className={`w-2.5 h-2.5 rounded-full transition-all ${active ? '' : 'bg-[#0F1221]/20'}`}
                        style={active ? { background: GOLD } : {}} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-[13px] font-semibold leading-tight ${active ? 'text-white' : 'text-[#0F1221]'}`}>{pt.label}</p>
                      <p className={`text-[11px] font-light mt-0.5 leading-snug ${active ? 'text-white/50' : 'text-[#0F1221]/40'}`}>{pt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next */}
      <div className="flex justify-end pt-1">
        <button onClick={onNext}
          className="flex items-center gap-2 px-7 py-3 rounded-full text-[13px] font-bold text-white transition-all hover:opacity-90 shadow-lg"
          style={{ background: DARK }}>
          Continue
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Step 2 — Preference ─────────────────────────────────────────────────── */
function Step2({ preference, setPreference, onNext, onBack }) {
  return (
    <div className="p-6 sm:p-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0F1221]/30 mb-1.5">Finish quality</p>
      <p className="text-[22px] font-light text-[#0F1221] tracking-tight mb-6">How would you describe your preference?</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {PREFERENCES.map(pref => {
          const active = preference === pref.key;
          return (
            <button key={pref.key} onClick={() => setPreference(pref.key)}
              className={`text-left rounded-2xl border-2 transition-all duration-300 focus:outline-none flex flex-col ${
                active
                  ? 'border-[#F0C85A]'
                  : 'border-[#0F1221]/8 hover:border-[#0F1221]/20'
              }`}
              style={active ? { boxShadow: `0 8px 32px ${pref.glowColor}, 0 2px 8px rgba(240,200,90,0.18)` } : {}}>

              {/* Gradient header — own overflow-hidden prevents sub-pixel gap */}
              <div className="relative px-5 pt-5 pb-8 rounded-t-[14px] overflow-hidden flex-shrink-0"
                style={{ background: pref.gradient }}>

                {/* Diagonal shine overlay */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 45%, transparent 100%)' }} />

                {/* Top-right radial glow */}
                <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full pointer-events-none opacity-30"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)' }} />

                {/* Wave at bottom */}
                <svg className="absolute bottom-0 left-0 w-full pointer-events-none" viewBox="0 0 300 22"
                  preserveAspectRatio="none" style={{ height: 22 }}>
                  <path d="M0,11 C80,22 220,0 300,11 L300,22 L0,22 Z" fill="white" />
                </svg>

                <div className="flex items-start justify-between gap-2 relative z-10 mb-1.5">
                  <p className="text-white text-[17px] font-semibold tracking-tight drop-shadow-sm">{pref.label}</p>
                  {pref.popular
                    ? <span className="text-[7px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 shadow-sm"
                        style={{ background: GOLD, color: DARK }}>Popular</span>
                    : <span className="text-[9px] font-light text-white/50">{pref.tag}</span>
                  }
                </div>
                <p className="text-white/65 text-[11px] leading-snug relative z-10">{pref.tagline}</p>
              </div>

              {/* Feature list */}
              <div className="bg-white px-4 py-4 space-y-2.5 rounded-b-[14px] flex-1">
                {pref.features.map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: DARK }}>
                      <svg className="w-3 h-3" fill="none" stroke={GOLD} strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[12px] text-[#0F1221]/70 font-light">{f}</span>
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-[#0F1221]/6 pt-5">
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] font-light text-[#0F1221]/35 hover:text-[#0F1221]/65 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>
        <button onClick={onNext}
          className="flex items-center gap-2 px-7 py-3 rounded-full text-[13px] font-bold text-white transition-all hover:opacity-90 shadow-lg"
          style={{ background: DARK }}>
          Continue
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Step 3 — Contact + Address + Upload ───────────────────────────────────────────── */
function Step3({ 
  name, setName, phone, setPhone, city, setCity, 
  houseNo, setHouseNo, street, setStreet, areaName, setAreaName, pincode, setPincode,
  setLocationLink,
  files, setFiles, onSubmit, onBack, submitting 
}) {
  const fileRef  = useRef(null);
  const [nameTouched, setNameTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const nameValid  = name.trim().length > 0;
  const phoneValid = phone.replace(/\D/g, '').length === 10;
  const valid      = nameValid && phoneValid;
  const [sizeErr, setSizeErr] = useState('');

  const handleFiles = (incoming) => {
    setSizeErr('');
    const arr   = Array.from(incoming);
    const tooBig = arr.filter(f => f.size > MAX_FILE_MB * 1024 * 1024);
    if (tooBig.length) setSizeErr(`${tooBig.map(f => f.name).join(', ')} exceed ${MAX_FILE_MB} MB and were skipped.`);
    const ok = arr.filter(f => f.size <= MAX_FILE_MB * 1024 * 1024);
    setFiles(prev => [...prev, ...ok].slice(0, MAX_FILES));
  };

  const removeFile = (i) => setFiles(prev => prev.filter((_, idx) => idx !== i));

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="p-6 sm:p-8">
      <button onClick={onBack}
        className="flex items-center gap-1.5 text-[13px] font-light text-[#0F1221]/35 hover:text-[#0F1221]/65 transition-colors mb-8">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back
      </button>

      <div className="max-w-sm mx-auto">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 text-[#25D366]"
            style={{ background: 'rgba(37,211,102,0.1)' }}>
            <WaIcon size={7} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2" style={{ color: PURPLE }}>Almost there</p>
          <h2 className="text-[22px] font-light text-[#0F1221] tracking-tight mb-1">Get your estimate<br />on WhatsApp</h2>
          <p className="text-[13px] text-[#0F1221]/40 font-light">We'll send you a detailed quote instantly.</p>
        </div>

        <div className="space-y-3 mb-5">
          <div>
            <input type="text" placeholder="Your name *" value={name}
              aria-label="Your name (required)"
              aria-invalid={nameTouched && !nameValid}
              aria-describedby={nameTouched && !nameValid ? 'name-error' : undefined}
              autoComplete="name"
              onChange={e => setName(e.target.value)}
              onBlur={() => setNameTouched(true)}
              className={`w-full bg-[#FAFAF8] border rounded-2xl px-5 py-3.5 text-[14px] text-[#0F1221] placeholder:text-[#0F1221]/25 focus:outline-none transition-colors ${nameTouched && !nameValid ? 'border-red-400 focus:border-red-400' : 'border-[#0F1221]/10 focus:border-[#F0C85A]'}`} />
            {nameTouched && !nameValid && (
              <p id="name-error" role="alert" className="text-[11px] text-red-500 mt-1 ml-1">Please enter your name.</p>
            )}
          </div>

          <div>
            <div className={`flex bg-[#FAFAF8] border rounded-2xl overflow-hidden transition-colors ${phoneTouched && !phoneValid ? 'border-red-400 focus-within:border-red-400' : 'border-[#0F1221]/10 focus-within:border-[#F0C85A]'}`}>
              <div className="flex items-center gap-1 px-4 bg-[#0F1221]/4 border-r border-[#0F1221]/8 text-[13px] font-semibold text-[#0F1221]/60 flex-shrink-0">
                +91
                <svg className="w-3 h-3 text-[#0F1221]/25" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <input type="tel" placeholder="Phone number *" value={phone}
                aria-label="Mobile number (required)"
                aria-invalid={phoneTouched && !phoneValid}
                aria-describedby={phoneTouched && !phoneValid ? 'phone-error' : undefined}
                autoComplete="tel"
                onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                onBlur={() => setPhoneTouched(true)}
                className="flex-1 bg-transparent px-4 py-3.5 text-[14px] text-[#0F1221] placeholder:text-[#0F1221]/25 focus:outline-none" />
            </div>
            {phoneTouched && !phoneValid && (
              <p id="phone-error" role="alert" className="text-[11px] text-red-500 mt-1 ml-1">Please enter a valid 10-digit mobile number.</p>
            )}
          </div>

          <div className="mb-4">
            <p className="text-[11px] font-semibold text-[#0F1221]/50 uppercase tracking-[0.18em] mb-2">
              Visit Location
            </p>
            <LocationPicker onLocationSelect={(details) => {
              if (details.street) setStreet(details.street);
              if (details.areaName) setAreaName(details.areaName);
              if (details.city) setCity(details.city);
              if (details.pincode) setPincode(details.pincode);
              if (details.locationLink) setLocationLink(details.locationLink);
            }} />
          </div>

          <input type="text" name="address-line1" autoComplete="address-line1" placeholder="House / Flat No." value={houseNo}
            aria-label="House or flat number"
            onChange={e => setHouseNo(e.target.value)}
            className="w-full bg-[#FAFAF8] border border-[#0F1221]/10 rounded-2xl px-5 py-3.5 text-[14px] text-[#0F1221] placeholder:text-[#0F1221]/25 focus:outline-none focus:border-[#F0C85A] transition-colors" />

          <div className="flex gap-3">
            <input type="text" name="address-line2" autoComplete="address-line2" placeholder="Street" value={street}
              aria-label="Street name"
              onChange={e => setStreet(e.target.value)}
              className="w-1/2 bg-[#FAFAF8] border border-[#0F1221]/10 rounded-2xl px-5 py-3.5 text-[14px] text-[#0F1221] placeholder:text-[#0F1221]/25 focus:outline-none focus:border-[#F0C85A] transition-colors" />
            <input type="text" name="address-level3" autoComplete="address-level3" placeholder="Area" value={areaName}
              aria-label="Area or locality"
              onChange={e => setAreaName(e.target.value)}
              className="w-1/2 bg-[#FAFAF8] border border-[#0F1221]/10 rounded-2xl px-5 py-3.5 text-[14px] text-[#0F1221] placeholder:text-[#0F1221]/25 focus:outline-none focus:border-[#F0C85A] transition-colors" />
          </div>

          <div className="flex gap-3 mb-2">
            <div className="w-1/2">
              <CitySelect value={city} onChange={setCity} />
            </div>
            <input type="text" name="postal-code" autoComplete="postal-code" placeholder="Pincode" value={pincode}
              aria-label="Pincode"
              onChange={e => setPincode(e.target.value)}
              className="w-1/2 bg-[#FAFAF8] border border-[#0F1221]/10 rounded-2xl px-5 py-3.5 text-[14px] text-[#0F1221] placeholder:text-[#0F1221]/25 focus:outline-none focus:border-[#F0C85A] transition-colors" />
          </div>
        </div>

        {/* ── File / Video Upload ─────────────────────────────────────────── */}
        <div className="mb-6">
          <p className="text-[11px] font-semibold text-[#0F1221]/50 uppercase tracking-[0.18em] mb-2">
            Photos / Videos <span className="normal-case font-normal tracking-normal text-[#0F1221]/30">(optional, up to {MAX_FILES} files · {MAX_FILE_MB} MB each)</span>
          </p>

          {/* Drop zone */}
          <div
            onDrop={onDrop}
            onDragOver={e => e.preventDefault()}
            onClick={() => fileRef.current.click()}
            className="relative border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all hover:border-[#F0C85A]/60 hover:bg-[#FFF9EC]/60 group"
            style={{ borderColor: 'rgba(15,18,33,0.12)', background: '#FAFAF8' }}>
            <input
              ref={fileRef}
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={e => handleFiles(e.target.files)}
            />
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center transition-colors group-hover:bg-[#F0C85A]/15"
              style={{ background: 'rgba(15,18,33,0.05)' }}>
              <svg className="w-5 h-5 text-[#0F1221]/35 group-hover:text-[#0F1221]/60 transition-colors"
                fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="text-[13px] font-medium text-[#0F1221]/55">
              Click to upload <span className="text-[#0F1221]/30 font-normal">or drag & drop</span>
            </p>
            <p className="text-[11px] text-[#0F1221]/30 mt-0.5">Photos or videos of your home</p>
          </div>

          {/* Size error */}
          {sizeErr && (
            <p className="text-[11px] text-red-500 mt-1.5">{sizeErr}</p>
          )}

          {/* File previews */}
          {files.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-3">
              {files.map((f, i) => {
                const isImg = f.type.startsWith('image/');
                const objUrl = isImg ? URL.createObjectURL(f) : null;
                return (
                  <div key={i} className="relative rounded-xl overflow-hidden border border-[#0F1221]/8 bg-[#FAFAF8] aspect-square flex items-center justify-center group">
                    {isImg ? (
                      <img src={objUrl} alt={f.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-1 p-2">
                        <svg className="w-7 h-7 text-[#0F1221]/30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        <p className="text-[9px] text-[#0F1221]/40 text-center leading-tight line-clamp-2">{f.name}</p>
                      </div>
                    )}
                    {/* Remove */}
                    <button
                      onClick={e => { e.stopPropagation(); removeFile(i); }}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity leading-none">
                      ×
                    </button>
                    {/* Size badge */}
                    <span className="absolute bottom-1 left-1 text-[9px] bg-black/50 text-white rounded px-1 leading-4">
                      {(f.size / (1024 * 1024)).toFixed(1)}MB
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button onClick={() => { setNameTouched(true); setPhoneTouched(true); if (valid) onSubmit(); }} disabled={submitting}
          className={`w-full py-4 rounded-full text-[14px] font-bold transition-all flex items-center justify-center gap-2 ${
            !submitting
              ? 'text-[#0F1221] shadow-lg shadow-[#F0C85A]/25 hover:opacity-90'
              : 'bg-[#0F1221]/8 text-[#0F1221]/20 cursor-not-allowed'
          }`}
          style={!submitting ? { background: GOLD } : {}}>
          {submitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Processing…
            </>
          ) : 'See My Estimate →'}
        </button>

        <p className="text-center text-[11px] text-[#0F1221]/20 mt-4 font-light">
          No spam, ever. We respect your privacy.
        </p>
      </div>
    </div>
  );
}

/* ── Animated price counter ──────────────────────────────────────────────── */
function CountPrice({ target }) {
  const ref    = useRef(null);
  const mv     = useMotionValue(0);
  const [disp, setDisp] = useState('₹0');
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, target, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: v => setDisp(fmt(v)),
    });
    return controls.stop;
  }, [inView, target, mv]);

  return <span ref={ref}>{disp}</span>;
}

/* ── Results ─────────────────────────────────────────────────────────────── */
function Results({ result, preference, onRestart, uploadState, filesCount, folderUrl, visitDate, setVisitDate, onBook, customerDetails }) {
  const prods = PRODUCTS[preference] ?? PRODUCTS.premium;
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle, processing, done

  const handlePayOnline = () => {
    if (!visitDate) return alert("Please select a visit date first.");
    setShowRazorpay(true);
  };
  
  const handlePayCash = async () => {
    if (!visitDate) return alert("Please select a visit date first.");
    setBookingStatus('processing');
    const success = await onBook('Cash on Visit', null);
    if (success) setBookingStatus('done');
    else setBookingStatus('idle');
  };

  const handleRazorpaySuccess = async (res) => {
    setShowRazorpay(false);
    setBookingStatus('processing');
    const success = await onBook('Razorpay (Paid Online)', res.razorpay_payment_id);
    if (success) setBookingStatus('done');
    else setBookingStatus('idle');
  };

  if (!result || !result.avg) {
    return (
      <div className="p-8 text-center">
        <p className="text-[14px] text-[#0F1221]/50 font-light mb-5">
          Couldn't compute an estimate. Try different selections.
        </p>
        <button onClick={onRestart}
          className="px-6 py-3 rounded-full text-[13px] font-bold text-[#0F1221]" style={{ background: GOLD }}>
          Try Again
        </button>
      </div>
    );
  }

  const stagger = (i) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] } });

  const renderCTAContent = () => (
    <div className="relative z-10 flex flex-col items-center gap-5 w-full text-center">
      {bookingStatus === 'done' ? (
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="text-[19px] font-semibold text-[#0F1221]">Inspection Booked!</h3>
          <p className="text-[13px] text-[#0F1221]/60 font-light leading-relaxed">
            Our expert will visit on <span className="font-semibold text-[#0F1221]">{visitDate}</span>. We've sent the confirmation details.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-px" style={{ background: GOLD }} />
            <span className="text-[9px] font-black uppercase tracking-[0.26em]" style={{ color: PURPLE }}>Next Step</span>
            <span className="w-5 h-px" style={{ background: GOLD }} />
          </div>

          <div>
            <h3 className="text-[19px] font-semibold text-[#0F1221] leading-snug tracking-tight mb-2">
              Get Your Complete<br />Painting Quotation
            </h3>
            <p className="text-[12px] text-[#0F1221]/45 font-light leading-relaxed">
              Schedule a free site inspection for a thorough, fixed quote.
            </p>
          </div>

          <div className="w-full text-left">
            <DatePicker value={visitDate} onChange={setVisitDate} />
          </div>

          <div className="w-full flex flex-col gap-3 mt-2">
            {bookingStatus === 'processing' ? (
              <div className="flex items-center justify-center gap-2 py-4 text-[#0F1221]/50 text-[13px] font-semibold">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Confirming Booking...
              </div>
            ) : (
              <>
                <motion.button onClick={handlePayOnline} className="w-full relative" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#FF3B30] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full z-20 shadow-sm whitespace-nowrap">
                    Special Offer: Just ₹99
                  </div>
                  <div className="w-full py-3.5 rounded-xl text-[13px] font-bold text-[#0F1221] text-center transition-all relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, #F5C842 0%, ${GOLD} 50%, #E8BA30 100%)`, boxShadow: '0 6px 20px rgba(240,200,90,0.3)' }}>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                      Pay ₹99 Securely Online
                    </span>
                  </div>
                </motion.button>
                
                <div className="pt-3 text-center">
                  <p className="text-[11px] text-[#0F1221]/50 font-medium">
                    You can also pay ₹99 in cash for future payment on site.
                  </p>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {result.waUrl && (
        <motion.a href={result.waUrl} target="_blank" rel="noreferrer" whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 text-[#25D366] text-[13px] font-semibold hover:underline">
          <WaIcon size={4} /> Chat on WhatsApp
        </motion.a>
      )}

      <a href={`tel:${PHONE_RAW}`}
        className="text-[11px] font-light transition-colors"
        style={{ color: 'rgba(15,18,33,0.3)' }}
        onMouseOver={e => e.target.style.color = 'rgba(15,18,33,0.6)'}
        onMouseOut={e  => e.target.style.color = 'rgba(15,18,33,0.3)'}>
        or call us directly
      </a>
    </div>
  );

  return (
    <>
    <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-[#0F1221]/6">

      {/* ── Left ──────────────────────────────────────────────────────────── */}
      <div className="flex-1 p-6 sm:p-8">

        {/* Price hero */}
        <motion.div {...stagger(0)}
          className="relative rounded-2xl overflow-hidden mb-5 p-6"
          style={{ background: 'linear-gradient(145deg, #FFFBF0 0%, #FFF9E8 40%, #FAFAF8 100%)' }}>

          {/* Gold top bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
            style={{ background: `linear-gradient(90deg, ${GOLD} 0%, rgba(240,200,90,0.3) 70%, transparent 100%)` }} />

          {/* Decorative radial glow — bottom right */}
          <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, rgba(240,200,90,0.18) 0%, transparent 70%)` }} />

          {/* Sparkle dots */}
          {[
            { top: '12%', right: '18%', size: 4, delay: 0.6 },
            { top: '60%', right: '8%',  size: 3, delay: 0.9 },
            { top: '30%', right: '32%', size: 2, delay: 1.1 },
          ].map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1], scale: 1 }}
              transition={{ delay: s.delay, duration: 0.5, repeat: Infinity, repeatDelay: 2.5 }}
              className="absolute rounded-full pointer-events-none"
              style={{ top: s.top, right: s.right, width: s.size, height: s.size, background: GOLD }} />
          ))}

          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#0F1221]/35 mb-3 relative z-10">
            Your Estimated Cost
          </p>

          <div className="flex items-end gap-2.5 mb-2 relative z-10">
            <h2 className="text-[2.6rem] sm:text-[3rem] font-bold text-[#0F1221] leading-none tracking-tight">
              <CountPrice target={result.avg} />
            </h2>
            <div className="w-5 h-5 rounded-full border border-[#0F1221]/20 flex items-center justify-center mb-1.5 flex-shrink-0 cursor-help"
              title="Calculated from your carpet area, service type and finish. Final price confirmed after free on-site inspection.">
              <span className="text-[10px] text-[#0F1221]/40 font-medium select-none">i</span>
            </div>
          </div>

          <p className="text-[12px] text-[#0F1221]/35 font-light relative z-10">
            Final price locked after free on-site inspection
          </p>
        </motion.div>

        {/* Tags */}
        <motion.div {...stagger(1)} className="flex flex-wrap gap-2 mb-4">
          {[
            { label: result.svcLabel,                              bg: `${PURPLE}12`, color: PURPLE       },
            { label: result.tier,                                  bg: `${GOLD}22`,   color: '#7A5C10'    },
            { label: `${result.carpetArea?.toLocaleString()} sq ft`, bg: '#0F122108', color: '#0F1221'    },
            { label: result.city,                                  bg: '#0F122106',   color: '#0F1221'    },
          ].map((t, i) => (
            <motion.span key={t.label}
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.07, type: 'spring', stiffness: 300 }}
              className="inline-flex items-center text-[11px] font-semibold px-3 py-1.5 rounded-full"
              style={{ background: t.bg, color: t.color }}>
              {t.label}
            </motion.span>
          ))}
        </motion.div>

        {/* Recalculate */}
        <motion.button {...stagger(2)} onClick={onRestart}
          className="flex items-center gap-1.5 text-[12px] font-semibold mb-6 transition-colors group"
          style={{ color: PURPLE }}
          whileHover={{ scale: 1.02 }}>
          <svg className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500"
            fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          Recalculate with different inputs
        </motion.button>

        {/* ── Mobile Next Step CTA ─────────────────────────────────────────── */}
        <motion.div {...stagger(2.5)} className="block lg:hidden mb-8 p-6 sm:p-8 rounded-2xl relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #FFF9EC 0%, #FFFDF6 45%, #FAFAF8 100%)', border: '1px solid rgba(240,200,90,0.3)' }}>
          <div className="absolute inset-0 pointer-events-none opacity-40"
            style={{ backgroundImage: `radial-gradient(${GOLD}30 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
          {renderCTAContent()}
        </motion.div>

        {/* Breakdown */}
        <motion.div {...stagger(3)}
          className="relative rounded-2xl p-5 mb-6 overflow-hidden"
          style={{ background: '#FAFAF8', border: '1px solid rgba(15,18,33,0.07)' }}>
          {/* Gold left accent */}
          <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full" style={{ background: GOLD }} />

          <p className="text-[13px] font-semibold text-[#0F1221] mb-2 pl-3">How we arrived at this estimate</p>
          <p className="text-[12px] text-[#0F1221]/40 font-light mb-3 leading-relaxed pl-3">
            Calyco's cost estimator considered your
          </p>
          <ul className="space-y-2.5 pl-3">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: GOLD }} />
              <div className="text-[12px]">
                <span className="font-semibold text-[#0F1221]">{result.paintType}</span>
                <span className="text-[#0F1221]/45 font-light"> — includes primer, undercoat &amp; finishing coat.</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: GOLD }} />
              <span className="text-[12px] text-[#0F1221]/45 font-light">
                {result.carpetArea?.toLocaleString()} sq ft carpet → ~{result.paintable?.toLocaleString()} sq ft paintable area, excluding ceiling.
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Recommended products */}
        <motion.div {...stagger(4)}>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0F1221]/30 mb-3">Recommended Products</p>
          <div className="flex gap-3 flex-wrap">
            {prods.map((p, i) => (
              <motion.div key={p.name}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.08, duration: 0.4 }}
                className="flex flex-col items-center gap-1.5" style={{ width: 68 }}>
                <div className="rounded-2xl border border-[#0F1221]/6 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.07)] overflow-hidden relative"
                  style={{ width: 56, height: 64 }}>
                  {/* Gradient fill */}
                  <div className="absolute inset-0 flex items-center justify-center text-white text-[13px] font-black"
                    style={{ background: `linear-gradient(145deg, ${p.color}ee, ${p.color}cc)` }}>
                    {/* Shine */}
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 55%)' }} />
                    <span className="relative z-10 drop-shadow-sm">{p.brand}</span>
                  </div>
                </div>
                <p className="text-[10px] text-center text-[#0F1221]/45 leading-tight line-clamp-2">{p.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Drive folder link ──────────────────────────────────────────── */}
        <AnimatePresence>
          {(folderUrl || uploadState === 'uploading') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mt-5 rounded-2xl overflow-hidden border"
              style={{ borderColor: 'rgba(15,18,33,0.08)', background: '#FAFAF8' }}>

              {/* Header bar */}
              <div className="flex items-center gap-2.5 px-4 py-3 border-b" style={{ borderColor: 'rgba(15,18,33,0.06)', background: '#F5F3EE' }}>
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
                <p className="text-[12px] font-semibold text-[#0F1221]">Your uploaded files</p>
                {uploadState === 'uploading' && (
                  <svg className="w-3.5 h-3.5 animate-spin ml-auto text-[#0F1221]/30" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                )}
                {uploadState === 'done' && folderUrl && (
                  <svg className="w-3.5 h-3.5 ml-auto flex-shrink-0" style={{ color: '#15803D' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>

              <div className="px-4 py-3.5">
                {uploadState === 'uploading' && (
                  <p className="text-[12px] text-[#0F1221]/40 font-light">Uploading to Google Drive…</p>
                )}
                {folderUrl && (
                  <>
                    <p className="text-[11px] text-[#0F1221]/40 font-light mb-2.5">
                      {filesCount} file{filesCount > 1 ? 's' : ''} saved to Drive. Calyco will review them before your inspection.
                    </p>
                    {folderUrl !== 'saved' ? (
                      <a
                        href={folderUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[12px] font-semibold rounded-xl px-4 py-2.5 transition-all hover:opacity-90"
                        style={{ background: `${GOLD}22`, color: '#7A5C10' }}>
                        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.71 3.5L1.15 15l3.43 5.5h13.84L21.85 15 15.29 3.5H7.71zm1.44 1.5h5.7l2.85 5H6.3l2.85-5zm-4.27 6h13.24l-2.85 4.5H4.93L4.88 11zM5.71 16h12.58l-1.72 3H7.43L5.71 16z" />
                        </svg>
                        View your photos in Drive →
                      </a>
                    ) : (
                      <p className="text-[12px] font-semibold" style={{ color: '#15803D' }}>
                        ✓ Photos received — our team will be in touch.
                      </p>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Desktop Right CTA ──────────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
        className="hidden lg:flex w-72 flex-col items-center justify-center text-center gap-5 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #FFF9EC 0%, #FFFDF6 45%, #FAFAF8 100%)', padding: '32px' }}>

        {/* Subtle dot grid decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-40"
          style={{ backgroundImage: `radial-gradient(${GOLD}30 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />

        {/* Radial glow center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(240,200,90,0.12) 0%, transparent 70%)` }} />

        {renderCTAContent()}
      </motion.div>
    </div>
    
    {/* Global Razorpay Overlay */}
    {showRazorpay && (
      <RazorpayPayment 
        amount={99} 
        orderId={null}
        customerDetails={customerDetails}
        onSuccess={handleRazorpaySuccess} 
        onError={(err) => { console.error(err); setShowRazorpay(false); }} 
        onClose={() => setShowRazorpay(false)} 
      />
    )}
    </>
  );
}

/* ── Progress steps ──────────────────────────────────────────────────────── */
function StepProgress({ step }) {
  const labels = ['Service', 'Finish', 'Estimate'];
  return (
    <div className="flex items-center justify-center gap-0 mb-8 select-none">
      {labels.map((label, i) => {
        const s       = i + 1;
        const done    = step > s;
        const current = step === s;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black transition-all duration-300 ${
                done    ? 'text-[#0F1221]' :
                current ? 'text-[#0F1221] shadow-[0_4px_14px_rgba(240,200,90,0.4)]' :
                          'bg-[#0F1221]/6 text-[#0F1221]/20'
              }`}
              style={done || current ? { background: GOLD } : {}}>
                {done
                  ? <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  : s}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-[0.18em] hidden sm:block transition-all ${
                current ? 'text-[#0F1221]' : done ? 'text-[#0F1221]/50' : 'text-[#0F1221]/20'
              }`}>
                {label}
              </span>
            </div>
            {s < labels.length && (
              <div className="w-12 sm:w-20 h-[2px] mx-2 mb-5 rounded-full bg-[#0F1221]/8 overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: GOLD }}
                  animate={{ width: step > s ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function BudgetCalculator() {
  const [step,       setStep]       = useState(1);
  const [dir,        setDir]        = useState(1);
  const [result,     setResult]     = useState(null);
  const showResult = step === 4;

  const [city,        setCity]        = useState('Bengaluru');
  const [serviceKey,  setServiceKey]  = useState('interior');
  const [carpetArea,  setCarpetArea]  = useState('850');
  const [paintType,   setPaintType]   = useState('repainting');
  const [preference, setPreference] = useState('premium');
  const location     = useLocation();
  const [name,       setName]       = useState(location.state?.name || '');
  const [phone,      setPhone]      = useState(location.state?.phone || '');
  
  // New site visit fields
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [areaName, setAreaName] = useState('');
  const [pincode, setPincode] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [locationLink, setLocationLink] = useState('');

  const [files,      setFiles]      = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploadState,setUploadState]= useState('idle'); // idle | uploading | done | error
  const [folderUrl,  setFolderUrl]  = useState('');

  const topRef         = useRef(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const c = searchParams.get('city');
    if (c && CITIES.includes(c)) setCity(c);
    const s = searchParams.get('service');
    if (s && CALC_SERVICES.find(sv => sv.key === s)) setServiceKey(s);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [step1AreaError, setStep1AreaError] = useState('');

  const scroll  = () => setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  const goNext  = () => {
    if (step === 1) {
      const area = parseFloat(carpetArea);
      if (!area || area <= 0) {
        setStep1AreaError('Please enter your carpet area to continue.');
        return;
      }
      setStep1AreaError('');
    }
    setDir(1); setStep(s => s + 1); scroll();
  };
  const goBack  = () => { setDir(-1); setStep(s => s - 1); scroll(); };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    const svc  = CALC_SERVICES.find(s => s.key === serviceKey);
    const pt   = PAINT_TYPES.find(p => p.key === paintType);
    const pref = PREFERENCES.find(p => p.key === preference);
    const r    = computeRange({ serviceKey, paintType, carpetArea, city, preference });

    const waMsg = [
      `Hi Calyco! I used your painting cost calculator.`,
      ``,
      `Name: ${name || 'Not provided'}`,
      `Phone: +91 ${phone}`,
      `City: ${city}`,
      `Service: ${svc?.label}`,
      `Carpet area: ${carpetArea} sq ft`,
      `Type: ${pt?.label}`,
      `Finish: ${pref?.label}`,
      r ? `Estimate: ${fmt(r.avg)}` : '',
      ``,
      `Location: ${locationLink || houseNo + ' ' + street + ' ' + city}`,
      `Date requested: ${visitDate}`,
      ``,
      `Please schedule a free site inspection.`,
    ].filter(Boolean).join('\n');

    const waUrl = `${WA_BASE}?text=${encodeURIComponent(waMsg)}`;
    setResult(r ? { ...r, waUrl } : { waUrl });
    setDir(1);
    setStep(4);
    scroll();
    setSubmitting(false);

    const GSHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`;

    // ── Google Drive + Sheets + Email (all in background) ────────────────
    setUploadState('uploading');
    try {
      const token = await getGoogleToken();

      // Service account creates the folder (metadata only — no quota issue)
      // then Apps Script uploads files into it (runs as your account)
      let driveFolderUrl = '';
      if (files.length > 0 && APPS_SCRIPT_URL) {
        try {
          const folderTs   = new Date().toLocaleString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: false,
            timeZone: 'Asia/Kolkata',
          });
          const folderName = `${name || 'Customer'} — ${folderTs}`;
          const folderId   = await driveCreateFolder(token, folderName);
          driveFolderUrl   = `https://drive.google.com/drive/folders/${folderId}`;
          setFolderUrl(driveFolderUrl);

          // folderId goes in the URL so it arrives as a clean query param — never lost in JSON
          const scriptUrl = APPS_SCRIPT_URL + '?fid=' + encodeURIComponent(folderId);
          Promise.all(files.map(async f => ({
            name:     f.name,
            mimeType: f.type || 'application/octet-stream',
            base64:   await fileToBase64(f),
          }))).then(b64Files =>
            uploadViaForm(scriptUrl, { files: b64Files })
          ).catch(err => console.error('[Drive] file upload error:', err));
        } catch (driveErr) {
          console.error('[Drive] folder creation error:', driveErr);
        }
      }

      // Append row to Sheet (always runs)
      await sheetsEnsureHeaders(token);
      const ts = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      await sheetsAppend(token, [
        ts,
        name        || '',
        '+91 ' + phone,
        city,
        svc?.label  || '',
        pt?.label   || '',
        String(carpetArea),
        String(toPaintable(carpetArea)),
        pref?.label || '',
        r ? fmt(r.avg) : '',
        files.length ? `${files.length} file(s)` : 'None',
        driveFolderUrl,
        houseNo     || '',
        street      || '',
        areaName    || '',
        pincode     || '',
        visitDate   || '',
        locationLink|| '',
        'Pending'
      ]);

      // Email via Web3Forms — sent after Drive so folder link is ready
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          to:         'calycopaints@gmail.com',
          subject:    `New Estimate — ${name || 'Customer'} (${city})`,
          from_name:  'Calyco Calculator',
          message: [
            `Name: ${name || '—'}`,
            `Phone: +91 ${phone}`,
            `City: ${city}`,
            `Service: ${svc?.label || '—'}`,
            `Paint Type: ${pt?.label || '—'}`,
            `Carpet Area: ${carpetArea} sq ft`,
            `Preference: ${pref?.label || '—'}`,
            r ? `Estimate: ${fmt(r.avg)}` : '',
            ``,
            `─── Site Visit Details ───`,
            `House No: ${houseNo}`,
            `Street: ${street}`,
            `Area: ${areaName}`,
            `Pincode: ${pincode}`,
            `Visit Date: ${visitDate}`,
            `Location Link: ${locationLink}`,
            ``,
            `─── Links ───`,
            `Google Sheet: ${GSHEET_URL}`,
            driveFolderUrl ? `Customer Drive Folder: ${driveFolderUrl}` : '',
          ].filter(Boolean).join('\n'),
        }),
      }).catch(() => {});

      setUploadState('done');
    } catch (err) {
      console.error('[Calyco] Integration error:', err?.message || err);
      setUploadState('error');
    }
  };

  const handleBooking = async (paymentMethod, txnId) => {
    try {
      const token = await getGoogleToken();
      const ts = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      await sheetsAppend(token, [
        ts,
        `${name || 'Customer'} (Booking Update)`,
        '+91 ' + phone,
        city,
        CALC_SERVICES.find(s => s.key === serviceKey)?.label || '',
        PAINT_TYPES.find(p => p.key === paintType)?.label || '',
        String(carpetArea),
        String(toPaintable(carpetArea)),
        PREFERENCES.find(p => p.key === preference)?.label || '',
        result ? fmt(result.avg) : '',
        files.length ? `${files.length} file(s)` : 'None',
        folderUrl,
        houseNo     || '',
        street      || '',
        areaName    || '',
        pincode     || '',
        visitDate   || '',
        locationLink|| '',
        paymentMethod + (txnId ? ` (Txn: ${txnId})` : '')
      ]);

      // Also append to the Site Visits tracker tab!
      try {
        await sheetsAppend(token, [
          ts,
          name || 'Customer',
          '+91 ' + phone,
          city,
          houseNo || '',
          street || '',
          areaName || '',
          pincode || '',
          CALC_SERVICES.find(s => s.key === serviceKey)?.label || '',
          visitDate || '',
          locationLink || ''
        ], 'Site Visits');
      } catch (e) {
        console.error('[Calyco] Site Visit tab append error:', e);
      }

      return true;
    } catch (err) {
      console.error('[Calyco] Booking error:', err);
      return false;
    }
  };

  const handleRestart = () => {
    setResult(null);
    setCarpetArea('850');
    setPaintType('repainting');
    setPreference('premium');
    setName('');
    setPhone('');
    setHouseNo('');
    setStreet('');
    setAreaName('');
    setPincode('');
    setVisitDate('');
    setLocationLink('');
    setFiles([]);
    setUploadState('idle');
    setFolderUrl('');
    setDir(-1);
    setStep(1);
    scroll();
  };

  const slide = {
    enter:  d => ({ x: d > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   d => ({ x: d > 0 ? -48 : 48, opacity: 0 }),
  };
  const trans = { duration: 0.24, ease: [0.32, 0.72, 0, 1] };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <SEO
        title="Painting Cost Calculator — Calyco"
        description="Instant painting estimate in 3 steps — pick your service, house size and finish. No hidden charges."
        url="https://calycopaints.com/calculators/service-cost-calculator"
      />

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#0F1221]/6">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-10 sm:py-12">
          <div className="flex items-center gap-2 text-[11px] text-[#0F1221]/30 font-light mb-5">
            <Link to="/" className="hover:text-[#493657] transition-colors">Home</Link>
            <span>/</span>
            <span>Cost Calculator</span>
          </div>
          <Eyebrow text="Painting Cost Calculator" />
          <h1 className="text-[2rem] sm:text-[2.8rem] font-light text-[#0F1221] tracking-[-0.02em] leading-[1.12] mb-3">
            Know your painting cost<br />
            <span style={{ color: PURPLE }}>before you commit.</span>
          </h1>
          <p className="text-[#0F1221]/45 text-[14px] font-light leading-relaxed max-w-md mb-5">
            Enter your house size, pick a service and finish — get a real cost breakdown in under a minute.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Free estimate', '25+ cities', 'Zero hidden charges', '4.8 ★ rating'].map(b => (
              <span key={b} className="inline-flex items-center gap-1.5 text-[11px] font-light text-[#0F1221]/55 bg-[#FAFAF8] border border-[#0F1221]/8 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wizard ────────────────────────────────────────────────────────── */}
      <section ref={topRef} className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-10 sm:py-12">

        {!showResult && <StepProgress step={step} />}

        {/* Card */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgba(15,18,33,0.08)] border border-[#0F1221]/5 overflow-hidden">
          <div className="overflow-hidden">
            <AnimatePresence mode="popLayout" custom={dir} initial={false}>

              {step === 1 && (
                <motion.div key="s1" custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={trans}>
                  <Step1
                    city={city} setCity={setCity}
                    serviceKey={serviceKey} setServiceKey={setServiceKey}
                    carpetArea={carpetArea} setCarpetArea={setCarpetArea}
                    paintType={paintType} setPaintType={setPaintType}
                    onNext={goNext}
                    areaError={step1AreaError}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={trans}>
                  <Step2
                    preference={preference} setPreference={setPreference}
                    onNext={goNext} onBack={goBack}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={trans}>
                  <Step3
                    name={name} setName={setName}
                    phone={phone} setPhone={setPhone}
                    city={city} setCity={setCity}
                    houseNo={houseNo} setHouseNo={setHouseNo}
                    street={street} setStreet={setStreet}
                    areaName={areaName} setAreaName={setAreaName}
                    pincode={pincode} setPincode={setPincode}
                    visitDate={visitDate} setVisitDate={setVisitDate}
                    locationLink={locationLink} setLocationLink={setLocationLink}
                    files={files} setFiles={setFiles}
                    onSubmit={handleSubmit} onBack={goBack}
                    submitting={submitting}
                  />
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="s4" custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={trans}>
                  <Results 
                    result={result} preference={preference} 
                    onRestart={handleRestart} uploadState={uploadState} 
                    filesCount={files.length} folderUrl={folderUrl} 
                    visitDate={visitDate} setVisitDate={setVisitDate} 
                    onBook={handleBooking} 
                    customerDetails={{
                      firstName: name || 'Customer',
                      lastName: '',
                      email: 'guest@calycopaints.com',
                      phone: phone,
                      address: `${houseNo} ${street}`,
                      city: city,
                      postcode: pincode
                    }}
                  />
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-[11px] text-[#0F1221]/20 mt-5 font-light">
          Estimates are indicative. Final price locked after free on-site inspection.
        </p>
      </section>

      {/* ── Why section ───────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-[#0F1221]/5">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-14 sm:py-18">
          <Eyebrow text="Transparent Pricing" />
          <h2 className="text-[1.7rem] sm:text-[2.3rem] font-light text-[#0F1221] tracking-tight leading-snug mb-10">
            Why our estimates<br />
            <span style={{ color: PURPLE }}>are different.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { n: '01', label: 'Real city rates',    desc: 'Rates for 25+ Indian cities using actual market data, not generic figures.' },
              { n: '02', label: 'Tier-based pricing', desc: 'Economy, Premium and Luxury tiers so you know exactly what you pay for.'    },
              { n: '03', label: 'GST shown clearly',  desc: 'Every estimate shows pre-GST and GST-inclusive costs side by side.'         },
              { n: '04', label: 'Fixed after visit',  desc: 'Our team locks in the final written quote on a free site visit — no surprises.' },
            ].map(p => (
              <div key={p.label} className="flex gap-4 p-5 rounded-2xl bg-[#FAFAF8] border border-[#0F1221]/5 hover:border-[#0F1221]/10 transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-[11px] font-black leading-none"
                  style={{ background: DARK, color: GOLD }}>
                  {p.n}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#0F1221] mb-1">{p.label}</p>
                  <p className="text-[12px] font-light text-[#0F1221]/45 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Next step — estimate → fixed quote ─────────────────────────────── */}
      <section className="bg-white border-t border-[#0F1221]/6">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-14 sm:py-16">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-px" style={{ background: GOLD }} />
            <span className="text-[9px] font-black uppercase tracking-[0.26em]" style={{ color: PURPLE }}>Next Step</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-9">
            <h2 className="text-[1.6rem] sm:text-[2rem] font-light text-[#0F1221] leading-snug tracking-tight">
              From estimate to<br />
              <span style={{ color: PURPLE }}>fixed written quote.</span>
            </h2>
            <Link to="/get-quote"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[13px] font-bold text-white bg-[#0F1221] hover:bg-[#493657] transition-colors whitespace-nowrap shadow-lg flex-shrink-0">
              Book Free Site Visit →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { n: '01', t: 'Free site visit', d: 'A Calyco supervisor inspects your walls and confirms the exact area with laser measurement.' },
              { n: '02', t: 'Price locked in writing', d: 'You get a fixed written quote — scope, material, timeline and price. It does not change.' },
              { n: '03', t: 'Work begins', d: 'A verified painting team is assigned, with daily photo updates on WhatsApp until handover.' },
            ].map((step) => (
              <div key={step.n} className="rounded-2xl bg-[#FAFAF8] border border-[#0F1221]/6 p-5">
                <span className="text-[10px] font-bold tracking-[0.12em] block mb-3" style={{ color: GOLD }}>{step.n}</span>
                <h3 className="text-sm font-semibold text-[#0F1221] mb-1.5">{step.t}</h3>
                <p className="text-xs text-[#0F1221]/45 font-light leading-[1.7]">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
