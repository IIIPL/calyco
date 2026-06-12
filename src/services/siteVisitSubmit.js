/* ── Site Visit booking — Sheets + Email integration ───────────────────────
   Same service-account pipeline as BudgetCalculator, but appends to the
   'Site Visits' tab of the shared spreadsheet. The tab (and its header row)
   is created automatically on the first submission. */

const WEB3FORMS_KEY = '52da37be-e058-4a07-92c1-a07f95c25f6b';

const SA_EMAIL  = 'painting-website-bot@painting-website-499005.iam.gserviceaccount.com';
const SA_KEY    = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5Sy7tJOFW1Sji\nCFUYYgGOZzhCAFNKuHCB2BkYudknozuqVhxhRA7vrY8rFQzrnIP1RaPVkYn/rkc8\nx2qb+jaazbFTqTzyrRWDbv44896tup2QNR1AtiTofh8+3ctUpuyLYGCWTLM53aAB\n5BOpA/QLDv98G1ruzsbi9paKjDPOSESt2xSiid/JZGKy0SQ3JQhL+WySeHMyP/0Q\nl7FcEHNTOCjUQG9jAWf2mxP4tabjEOUq+2wC7NQ0iKJ3GNR89FD4WtxyHoYxMFc5\nHwIpM+WUaSTCplYQAVRiGDf4ZQ8hFOwG55sr07BqwnAnVojN/6zWgCAJ6PlPicxH\nHBWHtYKtAgMBAAECggEABx+YUL6buSJdvX7Tgqn15FscgxEPIq6/iIZdxKEUc50n\nZI+F7MlYh6dU+zOGeSJdwlaoi0Pamc1B6NjDxPZUFhR1TkGR2cSEsLZaKKdbdrNX\nbl1UYBIAjj2XBuww7nKyYlNUs0KEm2NlTN1PUi6YObqcYNGOZ+LkK4KOXAoyzanR\ntQOWw7TqD2or7zZJrpckBdDfBBB+YWsh1IO1OWKBJUxzAkvizoYHmQJsh8Jfs3M6\nM4/2qB/m0tcGw0quBZnroMtH0Hck2UC6MVJWjRE9X/OZpIy7XkV1Xtn6rf3zcjYn\nHOn0V0AUp8vTgAWXkS4zI+CO3tl01zmOYuEP0GZAwwKBgQD3C35SOFpH6zWAJhi5\nOTNv8N4rHp8rQXTDkXNiyQBD4vHzgfo11yeuoqK5lWR/FXAbLxY3XIL6EyWQCl5w\naW7jIWdHzhxQYEgwAk/8G7Z9+0GEQNPVx+bmxrZIYdqEhJKOW8ozw+WqBok9KySf\nudK/Yl6ZHL28lF363aUgqVOPmwKBgQDAAqf4saYKWJi5dhcTeDINt4d8FiprkBzx\nSiZQmOHmZx6z2Tg+R71C84rd83T55QFM+jO52TYWnPT4R36qKCdENaivVqOH7ORZ\nMzLQquatBwu55Mz4yaucXZ7YrbHEqdxOa6d2bE6PxvzdcnTpWx8Givj15CS3DFCw\ns3CwIprvVwKBgDONZnLp540SfDudt5MPaLh3XyVIYpa4NhGJjLaUk0WXWj4iZYBO\nwa0jqylnD22ln5tMnCo5V+uviysfvs1ecxFaqx7E2Au9y9KY6PAHKHHpuKZMkOgP\nqxOFbAx2vw7gS2UBqpRa0NZGPuVQ13etY1kkwfDZmo57t5DeJ9NFAnb5AoGAVYYZ\nWT2PjpYt2JXP630jFlcEAvJAjM6RBayYalfebujJlSQQ2DTOCS8/UGMrXE9zh9z+\nAy7L18CroJb/xTzDWK9p5kd56YZLo6uZW7Zzrugvgep2ne3+AVT19t9PCiD6nvd2\njNnrGEFyyhQ8HODYbeqiv6uR6vKSUlJqxBl111sCgYEA1AFgT2YgQK5LrKKYXarn\ncISJZJ6u3CFU9PVfQnK2vn4SCciIMXs8HtDYniSffu/IhY7mHjI3YBpJUwFgS/vK\nnfslmsvpsfzvKe/LwQGiXH0YrJDp598FOgLmiUDEbW0xxTtBc4W0SIimpVi1/9D0\nAzYKTrJWNNMZX8e+ubn9xS8=\n-----END PRIVATE KEY-----\n';
const SHEET_ID = '13OGMg0NnPYOUxB0anPbPG2WHqu-D79kJfHj2C96xUcg';

const TAB        = 'Site Visits';
const GSHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}`;

const HEADERS = [
  'Timestamp', 'Name', 'Phone', 'City',
  'House No', 'Apartment / Street', 'Area', 'Pincode',
  'Property Type', 'Visit Date',
];

/* ── Google auth (service account JWT, signed in-browser) ─────────────────── */
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

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${sigInput}.${sigB64}`,
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(JSON.stringify(data));
  return data.access_token;
}

/* ── Sheets — 'Site Visits' tab ───────────────────────────────────────────── */
const tabRange = (range) => encodeURIComponent(`'${TAB}'!${range}`);

async function sheetsAppend(token, row) {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${tabRange('A1')}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
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

async function ensureTab(token) {
  try {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${tabRange('A1:J1')}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.ok) {
      const data = await res.json();
      if (!data.values?.length) await sheetsAppend(token, HEADERS);
      return;
    }
    // Tab doesn't exist yet — create it, then write headers
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ requests: [{ addSheet: { properties: { title: TAB } } }] }),
      }
    );
    await sheetsAppend(token, HEADERS);
  } catch {
    // non-critical — proceed to data append anyway
  }
}

/* ── Public API ───────────────────────────────────────────────────────────── */
/**
 * Submit a site-visit booking: emails the team and appends a row to the
 * 'Site Visits' tab of the shared spreadsheet.
 * Never throws — the email is fired independently so the lead is never lost.
 */
export async function submitSiteVisit(d) {
  const ts = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // 1. Email first — independent of Google auth, most reliable channel
  const emailPromise = fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      to:         'calycopaints@gmail.com',
      subject:    `New Site Visit Booking — ${d.name || 'Customer'} (${d.city})`,
      from_name:  'Calyco Site Visit',
      message: [
        `Name: ${d.name || '—'}`,
        `Phone: +91 ${d.phone}`,
        ``,
        `─── Visit Address ───`,
        `House No: ${d.houseNo || '—'}`,
        `Apartment / Street: ${d.street || '—'}`,
        `Area: ${d.areaName || '—'}`,
        `City: ${d.city || '—'}`,
        `Pincode: ${d.pincode || '—'}`,
        ``,
        `Property Type: ${d.property || '—'}`,
        `Visit Date: ${d.visitDate || '—'}`,
        ``,
        `Google Sheet: ${GSHEET_URL}`,
      ].join('\n'),
    }),
  }).catch(() => {});

  // 2. Sheets — best-effort
  try {
    const token = await getGoogleToken();
    await ensureTab(token);
    await sheetsAppend(token, [
      ts,
      d.name      || '',
      '+91 ' + (d.phone || ''),
      d.city      || '',
      d.houseNo   || '',
      d.street    || '',
      d.areaName  || '',
      d.pincode   || '',
      d.property  || '',
      d.visitDate || '',
    ]);
  } catch (err) {
    console.error('[SiteVisit] Sheets error:', err?.message || err);
  }

  await emailPromise;
}
