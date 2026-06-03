export const BRAND_NAME = 'Calyco 5-Star Painting Service';

export const POSITIONING_TAGLINE =
  'Verified painters. Transparent pricing. Proper wall preparation. Clean execution. Final quality check. Warranty-backed finish.';

// Six individual pillars that make up the tagline — use as chips/pills
export const POSITIONING_PILLS = [
  'Verified painters',
  'Transparent pricing',
  'Proper wall preparation',
  'Clean execution',
  'Final quality check',
  'Warranty-backed finish',
];

// Pre-built WhatsApp message strings
export const WA_GENERAL =
  'Hi Calyco — I am interested in the Calyco 5-Star Painting Service. Please share details for a free site visit.';

export const WA_SITE_VISIT =
  'Hi Calyco, I want to book a free site visit for the Calyco 5-Star Painting Service.';

export const waForCity = (cityName) =>
  `Hi Calyco, I want to book a free site visit in ${cityName} for the Calyco 5-Star Painting Service.`;

export const waForService = (serviceName) =>
  `Hi Calyco, I want a free site visit for ${serviceName} — Calyco 5-Star Painting Service.`;

export const waForQuote = ({ city, category, area, propertyType, condition, name, phone }) => {
  const lines = [
    'Hi Calyco — I would like a quote from the Calyco 5-Star Painting Service.',
    '',
    `City: ${city}`,
    `Service: ${category}`,
    area ? `Area: ${area} sq ft` : null,
    `Property: ${propertyType}`,
    `Condition: ${condition}`,
    name ? `Name: ${name}` : null,
    phone ? `Phone: ${phone}` : null,
  ].filter(Boolean);
  return lines.join('\n');
};

// Full 6-step quote form → WhatsApp message
export const waForFullQuote = ({ service, city, property, workType, photoCount, name, phone, preferWhatsApp, preferredDate }) => {
  const lines = [
    'Hi Calyco — I am requesting a free site visit.',
    '',
    `🔧 Service: ${service}`,
    `📍 City: ${city}`,
    `🏠 Property: ${property}`,
    `🎨 Work type: ${workType}`,
    photoCount > 0 ? `📸 Photos: I have ${photoCount} wall photo${photoCount > 1 ? 's' : ''} ready to share` : null,
    preferredDate ? `📅 Preferred date/time: ${preferredDate}` : null,
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    preferWhatsApp ? 'WhatsApp: Yes — please contact on this number' : null,
    '',
    'Please assign a Calyco supervisor for the site visit.',
    `— ${BRAND_NAME}`,
  ].filter(Boolean);
  return lines.join('\n');
};
