/**
 * CalycoIcons — premium custom stroke SVG icon set
 * All icons: 24×24 viewBox, stroke-based, no fill, strokeWidth 1.6
 * Pass className for size + color: className="w-5 h-5 text-white"
 */

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };

// ── Identity & Verification ───────────────────────────────────────────────────

export const IconIDCard = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <circle cx="8" cy="11" r="2.5" />
    <path d="M4.5 18.5c0-2 1.567-3.5 3.5-3.5s3.5 1.5 3.5 3.5" />
    <line x1="14" y1="9" x2="20" y2="9" />
    <line x1="14" y1="12.5" x2="18" y2="12.5" />
    <line x1="14" y1="16" x2="17" y2="16" />
  </svg>
);

export const IconShieldVerified = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M12 2.5L3.5 6v6c0 5 3.8 9.3 8.5 10.5C16.7 21.3 20.5 17 20.5 12V6L12 2.5z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </svg>
);

export const IconCertBadge = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 14l-4.8 2.6.9-5.3L4.3 7.6l5.3-.8L12 2z" />
    <circle cx="12" cy="19" r="3" />
    <line x1="12" y1="16" x2="12" y2="22" />
  </svg>
);

export const IconSkillCheck = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M9 11l3 3 6-6" />
    <path d="M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3c1.6 0 3.1.42 4.4 1.15" />
    <path d="M19 5l1.5 1.5L22 5" />
  </svg>
);

// ── Quality & Standards ───────────────────────────────────────────────────────

export const IconQualityCheck = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <path d="M9 14l2 2 4-4" />
  </svg>
);

export const Icon27Point = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="15" x2="13" y2="15" />
    <line x1="9" y1="18" x2="11" y2="18" />
    <path d="M15 15.5l1.2 1.2 2.3-2.5" />
  </svg>
);

export const IconSparkle = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// ── Painting & Surface ────────────────────────────────────────────────────────

export const IconPaintBrush = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M16 4l4 4-9 9-4-4 9-9z" />
    <path d="M7 13l-3.5 3.5a2 2 0 002.8 2.8L10 15.8" />
    <path d="M3.5 19.5c-.5.5-.5 1.5 0 2" />
  </svg>
);

export const IconWallLayers = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <rect x="3" y="4" width="18" height="4" rx="1" />
    <rect x="3" y="10" width="18" height="4" rx="1" />
    <rect x="3" y="16" width="18" height="4" rx="1" />
    <path d="M7 6h2M7 12h2M7 18h2" />
  </svg>
);

export const IconCrackFill = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <path d="M10 5l-2 5 4 2-2 7" strokeDasharray="0" />
    <path d="M8 10.5h8M8 13.5h8" opacity="0.4" />
  </svg>
);

export const IconSanding = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <rect x="4" y="14" width="16" height="6" rx="1.5" />
    <line x1="4" y1="14" x2="8" y2="8" />
    <line x1="20" y1="14" x2="16" y2="8" />
    <line x1="8" y1="8" x2="16" y2="8" />
    <line x1="7" y1="17" x2="17" y2="17" strokeDasharray="2 2" />
  </svg>
);

// ── Protection & Site ─────────────────────────────────────────────────────────

export const IconFloorProtect = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M3 12l9-9 9 9" />
    <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" />
    <path d="M9 21v-6h6v6" />
    <path d="M3 20h18" strokeWidth="2.2" />
  </svg>
);

export const IconFurnitureMask = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <rect x="3" y="10" width="18" height="8" rx="1.5" />
    <path d="M6 10V7a1 1 0 011-1h10a1 1 0 011 1v3" />
    <path d="M3 14h18" />
    <path d="M6 18v2M18 18v2" />
    <path d="M2 12h2M20 12h2" />
  </svg>
);

export const IconSiteClean = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M4 20h16" />
    <path d="M6 20V8l3-3h6l3 3v12" />
    <path d="M9 20v-5h6v5" />
    <path d="M9 8v4h6V8" />
    <path d="M12 5V3" />
  </svg>
);

// ── Communication & Reporting ─────────────────────────────────────────────────

export const IconDailyPhoto = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <rect x="2" y="6" width="20" height="14" rx="2" />
    <circle cx="12" cy="13" r="3.5" />
    <path d="M8.5 6l1.5-2h4l1.5 2" />
    <circle cx="17.5" cy="10" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconWhatsAppReport = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M21 11.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0z" />
    <path d="M8.5 10a3 3 0 015 1c0 1.5-1.5 2.5-2.5 3.5" />
    <circle cx="11.5" cy="16" r=".75" fill="currentColor" stroke="none" />
    <path d="M9.5 20.5L4 22l1.5-5.5" />
  </svg>
);

export const IconSupervisor = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M2 10h20M6 10V7h12v3" />
    <path d="M4 10v10h16V10" />
    <path d="M10 15l2 2 4-3" />
    <path d="M12 3a2 2 0 100 4 2 2 0 000-4z" />
  </svg>
);

// ── Measurement & Pricing ─────────────────────────────────────────────────────

export const IconLaserRuler = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <rect x="2" y="9" width="20" height="6" rx="1" />
    <line x1="6" y1="9" x2="6" y2="12" />
    <line x1="9" y1="9" x2="9" y2="11" />
    <line x1="12" y1="9" x2="12" y2="12" />
    <line x1="15" y1="9" x2="15" y2="11" />
    <line x1="18" y1="9" x2="18" y2="12" />
    <path d="M3 5l18 0M12 5v4" strokeDasharray="2 2" />
  </svg>
);

export const IconPriceLock = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 018 0v4" />
    <circle cx="12" cy="16" r="1.5" />
    <line x1="12" y1="17.5" x2="12" y2="19" />
  </svg>
);

export const IconGSTReceipt = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M4 3h16v14l-2 2-2-2-2 2-2-2-2 2-2-2V3z" />
    <line x1="8" y1="8" x2="16" y2="8" />
    <line x1="8" y1="11.5" x2="16" y2="11.5" />
    <line x1="8" y1="15" x2="12" y2="15" />
  </svg>
);

export const IconTransparent = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18M3 12h18" opacity="0.4" />
    <path d="M12 3c2.5 2.5 4 5.6 4 9s-1.5 6.5-4 9" />
    <path d="M12 3c-2.5 2.5-4 5.6-4 9s1.5 6.5 4 9" />
  </svg>
);

// ── Service Categories ────────────────────────────────────────────────────────

export const IconInteriorPaint = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M3 21h18" />
    <path d="M5 21V7l7-4 7 4v14" />
    <rect x="9" y="14" width="6" height="7" />
    <path d="M14 8a2 2 0 11-4 0" />
    <path d="M16 10h2v4" />
    <circle cx="18" cy="15" r="1.5" />
  </svg>
);

export const IconWaterproof = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M12 3c0 0-7 6.5-7 12a7 7 0 0014 0C19 9.5 12 3 12 3z" />
    <path d="M9 16a3 3 0 006 0" opacity="0.5" />
    <path d="M12 8v5" />
  </svg>
);

export const IconWarrantyShield = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M12 2.5L4 6v6c0 4.8 3.5 9 8 10.5C16.5 21 20 16.8 20 12V6L12 2.5z" />
    <path d="M8.5 12.5l2 2.5 5-5" />
    <path d="M12 6v2.5" opacity="0.5" />
  </svg>
);

export const IconWorker = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <circle cx="12" cy="7" r="3.5" />
    <path d="M5.5 21a7 7 0 0113 0" />
    <path d="M8 9.5s-.5 4 4 4 4-4 4-4" />
    <path d="M3 14h3M18 14h3" />
  </svg>
);

export const IconRating = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 14l-4.8 2.6.9-5.3L4.3 7.6l5.3-.8L12 2z" />
  </svg>
);

// ── Category icon lookup ──────────────────────────────────────────────────────

export const IconGear = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

export const IconBrush = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 114.03 4.03l-8.06 8.08" />
    <path d="M7.07 14.94C5.79 16.22 2 17 2 17s.78-3.79 2.06-5.07a2.85 2.85 0 014.01 4.01z" />
  </svg>
);

export const IconTile = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

export const IconChat = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    <line x1="9" y1="10" x2="15" y2="10" />
    <line x1="9" y1="13" x2="13" y2="13" />
  </svg>
);

export const IconPicture = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" {...S}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

// Map category ID → icon component
const CATEGORY_ICON_MAP = {
  'interior-painting':     IconInteriorPaint,
  'exterior-painting':     IconFloorProtect,
  'ceiling-painting':      IconInteriorPaint,
  'addons':                IconCrackFill,
  'dampness-repair':       IconWaterproof,
  'texture-decorative':    IconWallLayers,
  'waterproofing':         IconWaterproof,
  // legacy IDs kept for backwards compatibility
  'exterior-full-home':    IconFloorProtect,
  'texture-painting':      IconWallLayers,
  'feature-walls':         IconSparkle,
  'wallpaper':             IconPicture,
  'wood-finishing':        IconSanding,
  'metal-painting':        IconGear,
  'grouting':              IconTile,
  'surface-preparation':   IconCrackFill,
  'cleaning-protection':   IconSiteClean,
  'consultation':          IconChat,
};

export const CategoryIcon = ({ categoryId, className = 'w-5 h-5' }) => {
  const Icon = CATEGORY_ICON_MAP[categoryId] || IconBrush;
  return <Icon className={className} />;
};
