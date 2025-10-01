import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/ApColorTool.module.css';

interface CsvData {
  headers: string[];
  rows: Record<string, string>[];
}

interface ResultRow {
  Code: string;
  Name: string;
  Hex: string;
  'Color Family': string;
  'Color Temperature': string;
  Tonality: string;
  Mood: string;
  Rooms: string;
  Style: string;
  Description: string;
  Group: string;
  Collection: string;
  'Recommended Use': string;
  'Interior/Exterior': string;
  Opacity: string;
}

const DEFAULT_OUTPUT_HEADERS: (keyof ResultRow)[] = [
  'Code',
  'Name',
  'Hex',
  'Color Family',
  'Color Temperature',
  'Tonality',
  'Mood',
  'Rooms',
  'Style',
  'Description',
  'Group',
  'Collection',
  'Recommended Use',
  'Interior/Exterior',
  'Opacity',
];

const DEFAULT_THRESHOLD = 15;

function fixHex(value: string | null | undefined): string | null {
  if (value == null) {
    return null;
  }
  const trimmed = value.toString().trim();
  if (!trimmed) {
    return null;
  }
  const hex = trimmed.toUpperCase().replace(/^#/, '');
  if (!/^[0-9A-F]{6}$/.test(hex)) {
    return null;
  }
  return `#${hex}`;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

function colorDistance(a: [number, number, number], b: [number, number, number]): number {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

function classifyFamily(r: number, g: number, b: number): string {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max - min < 18) {
    return 'Gray';
  }
  if (max === r) {
    if (g > b && r - g < 50) {
      return 'Orange';
    }
    return 'Red';
  }
  if (max === g) {
    return 'Green';
  }
  if (max === b) {
    return b - r > 40 ? 'Blue' : 'Purple';
  }
  return 'Gray';
}

function classifyTemperature(r: number, g: number, b: number): string {
  if (r >= b && r >= g) {
    return 'Warm';
  }
  if (b >= r && b >= g) {
    return 'Cool';
  }
  return 'Neutral';
}

function classifyTonality(r: number, g: number, b: number): string {
  const lightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 2 / 255;
  if (lightness > 0.75) {
    return 'Light';
  }
  if (lightness > 0.4) {
    return 'Medium';
  }
  return 'Dark';
}

function moodMap(family: string, tonality: string): string {
  if (family === 'Blue') {
    return tonality === 'Dark' ? 'Calm / Sophisticated' : 'Fresh / Airy';
  }
  if (family === 'Green') {
    return 'Natural / Restful';
  }
  if (family === 'Red') {
    return 'Energetic / Bold';
  }
  if (family === 'Orange') {
    return 'Warm / Inviting';
  }
  if (family === 'Purple') {
    return 'Creative / Regal';
  }
  if (family === 'Gray') {
    return 'Neutral / Balanced';
  }
  return 'Versatile';
}

function roomsMap(family: string): string {
  const map: Record<string, string> = {
    Blue: 'Bathroom, Bedroom',
    Green: 'Living Room, Study',
    Red: 'Accent Walls, Dining',
    Orange: 'Living Room, Kids Room',
    Purple: 'Bedroom, Lounge',
    Gray: 'All Rooms',
    Brown: 'Living Room, Study',
    Beige: 'Living Room, Bedroom',
    White: 'Ceiling, All Rooms',
  };
  return map[family] ?? 'All Rooms';
}

function styleMap(family: string): string {
  const map: Record<string, string> = {
    Blue: 'Modern',
    Green: 'Contemporary',
    Red: 'Traditional',
    Purple: 'Minimalist',
  };
  return map[family] ?? 'Contemporary';
}

function describeShade(family: string, tonality: string): string {
  return `A ${tonality.toLowerCase()} ${family.toLowerCase()} shade with a ${moodMap(family, tonality).toLowerCase()} feel.`;
}

function parseCsv(text: string): CsvData {
  const rows: string[][] = [];
  let current = '';
  let insideQuotes = false;
  const currentRow: string[] = [];

  const pushValue = () => {
    currentRow.push(current);
    current = '';
  };

  const pushRow = () => {
    rows.push([...currentRow]);
    currentRow.length = 0;
  };

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (insideQuotes) {
      if (char === '"') {
        const nextChar = text[i + 1];
        if (nextChar === '"') {
          current += '"';
          i += 1;
        } else {
          insideQuotes = false;
        }
      } else {
        current += char;
      }
      continue;
    }

    if (char === '"') {
      insideQuotes = true;
      continue;
    }

    if (char === ',') {
      pushValue();
      continue;
    }

    if (char === '\r') {
      continue;
    }

    if (char === '\n') {
      pushValue();
      pushRow();
      continue;
    }

    current += char;
  }

  pushValue();
  if (currentRow.length > 0) {
    pushRow();
  }

  while (rows.length && rows[rows.length - 1].every((cell) => cell.trim() === '')) {
    rows.pop();
  }

  if (!rows.length) {
    return { headers: [], rows: [] };
  }

  const headers = rows[0].map((header) => header.trim());
  const dataRows = rows.slice(1).map((cells) => {
    const record: Record<string, string> = {};
    headers.forEach((header, index) => {
      record[header] = (cells[index] ?? '').trim();
    });
    return record;
  });

  return { headers, rows: dataRows };
}

function normaliseHeader(header: string): string {
  return header.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function findDefaultColumn(headers: string[], target: string): string {
  const targetNormalised = normaliseHeader(target);
  return (
    headers.find((header) => normaliseHeader(header) === targetNormalised) ??
    headers.find((header) => normaliseHeader(header).includes(targetNormalised)) ??
    ''
  );
}

function createCsvContent(rows: ResultRow[]): string {
  const headerRow = DEFAULT_OUTPUT_HEADERS.join(',');
  const lines = rows.map((row) =>
    DEFAULT_OUTPUT_HEADERS.map((header) => {
      const value = row[header];
      const needsQuotes = value.includes(',') || value.includes('"') || value.includes('\n');
      if (!needsQuotes) {
        return value;
      }
      return `"${value.replace(/"/g, '""')}"`;
    }).join(','),
  );
  return [headerRow, ...lines].join('\n');
}

export default function ApColorImporter() {
  const [calycoData, setCalycoData] = useState<CsvData | null>(null);
  const [apData, setApData] = useState<CsvData | null>(null);
  const [calycoHexColumn, setCalycoHexColumn] = useState('');
  const [apHexColumn, setApHexColumn] = useState('');
  const [apNameColumn, setApNameColumn] = useState('');
  const [threshold, setThreshold] = useState<number>(DEFAULT_THRESHOLD);
  const [results, setResults] = useState<ResultRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = useCallback((event: ChangeEvent<HTMLInputElement>, onLoad: (data: CsvData) => void) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      try {
        const text = String(loadEvent.target?.result ?? '');
        const parsed = parseCsv(text);
        onLoad(parsed);
      } catch (parseError) {
        console.error(parseError);
        setError('We could not read that CSV. Please check the file format and try again.');
      }
    };
    reader.onerror = () => {
      setError('There was a problem reading the file.');
    };
    reader.readAsText(file);
  }, []);

  const handleCalycoUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      handleFile(event, (data) => {
        setCalycoData(data);
        const defaultHex = findDefaultColumn(data.headers, 'hex');
        setCalycoHexColumn(defaultHex);
      }),
    [handleFile],
  );

  const handleApUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      handleFile(event, (data) => {
        setApData(data);
        const defaultHex = findDefaultColumn(data.headers, 'hex');
        const defaultName = findDefaultColumn(data.headers, 'name');
        setApHexColumn(defaultHex);
        setApNameColumn(defaultName);
      }),
    [handleFile],
  );

  const calycoHexOptions = useMemo(() => calycoData?.headers ?? [], [calycoData]);
  const apHeaderOptions = useMemo(() => apData?.headers ?? [], [apData]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);

      if (!calycoData || !apData) {
        setError('Please upload both the Calyco palette and Asian Paints CSV files.');
        return;
      }

      if (!calycoHexColumn || !apHexColumn) {
        setError('Select the correct Hex column for both files.');
        return;
      }

      const parsedThreshold = Number.isFinite(threshold) ? threshold : DEFAULT_THRESHOLD;
      setIsProcessing(true);

      try {
        const calycoHexValues = Array.from(
          new Set(
            calycoData.rows
              .map((row) => fixHex(row[calycoHexColumn]))
              .filter((value): value is string => Boolean(value)),
          ),
        ).map((hex) => hexToRgb(hex));

        const rowsToExport: ResultRow[] = [];
        let codeCounter = 1;

        apData.rows.forEach((row) => {
          const rawHex = row[apHexColumn];
          const formattedHex = fixHex(rawHex);
          if (!formattedHex) {
            return;
          }

          const rgb = hexToRgb(formattedHex);
          const isDuplicate = calycoHexValues.some((existing) => colorDistance(existing, rgb) <= parsedThreshold);
          if (isDuplicate) {
            return;
          }

          const family = classifyFamily(...rgb) || 'Gray';
          const temperature = classifyTemperature(...rgb);
          const tonality = classifyTonality(...rgb);

          const nameValue = (row[apNameColumn] ?? '').trim();

          rowsToExport.push({
            Code: `CLY-AP-${codeCounter.toString().padStart(3, '0')}`,
            Name: nameValue || 'AP Shade',
            Hex: formattedHex,
            'Color Family': family,
            'Color Temperature': temperature,
            Tonality: tonality,
            Mood: moodMap(family, tonality),
            Rooms: roomsMap(family),
            Style: styleMap(family),
            Description: describeShade(family, tonality),
            Group: 'Asian Paints Collection',
            Collection: 'AP Inspired',
            'Recommended Use': 'Interior/Exterior Walls',
            'Interior/Exterior': 'Both',
            Opacity: 'Opaque',
          });
          codeCounter += 1;
        });

        setResults(rowsToExport);
      } catch (processingError) {
        console.error(processingError);
        setError('Something went wrong while generating the palette. Please review your inputs and try again.');
      } finally {
        setIsProcessing(false);
      }
    },
    [apData, apHexColumn, apNameColumn, calycoData, calycoHexColumn, threshold],
  );

  const downloadCsv = useCallback(() => {
    if (!results.length) {
      return;
    }
    const csvContent = createCsvContent(results);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'AP_NewColors.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [results]);

  return (
    <>
      <Head>
        <title>Asian Paints Palette Importer | Calyco Tools</title>
        <meta
          name="description"
          content="Upload Asian Paints CSV files and instantly generate Calyco-ready colour entries with mood, room, and style suggestions."
        />
      </Head>
      <main className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/tools">Tools</Link>
            </li>
            <li aria-current="page">Asian Paints Palette Importer</li>
          </ol>
        </nav>

        <header className={styles.header}>
          <h1>Asian Paints Palette Importer</h1>
          <p>
            Transform Asian Paints colour schedules into Calyco-ready records. Upload your existing Calyco palette and the
            new Asian Paints CSV to generate clean, deduplicated shades complete with families, mood tags, and usage
            guidance.
          </p>
        </header>

        <section className={styles.section}>
          <h2>1. Upload your palette files</h2>
          <p>We only process data in your browser. No colour information leaves your device.</p>
          <div className={styles.uploadGrid}>
            <label className={styles.uploadCard}>
              <span className={styles.uploadTitle}>Calyco Master Palette</span>
              <input type="file" accept=".csv" onChange={handleCalycoUpload} />
              {calycoData && (
                <span className={styles.uploadMeta}>
                  Loaded {calycoData.rows.length.toLocaleString()} shades · Columns: {calycoData.headers.join(', ')}
                </span>
              )}
            </label>
            <label className={styles.uploadCard}>
              <span className={styles.uploadTitle}>Asian Paints Source Palette</span>
              <input type="file" accept=".csv" onChange={handleApUpload} />
              {apData && (
                <span className={styles.uploadMeta}>
                  Loaded {apData.rows.length.toLocaleString()} shades · Columns: {apData.headers.join(', ')}
                </span>
              )}
            </label>
          </div>
        </section>

        {(calycoData || apData) && (
          <section className={styles.section}>
            <h2>2. Confirm column mappings</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>
                  Calyco Hex Column
                  <select
                    className={styles.inputControl}
                    value={calycoHexColumn}
                    onChange={(event) => setCalycoHexColumn(event.target.value)}
                  >
                    <option value="">Select column</option>
                    {calycoHexOptions.map((header) => (
                      <option value={header} key={`calyco-${header}`}>
                        {header}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={styles.fieldLabel}>
                  Asian Paints Hex Column
                  <select
                    className={styles.inputControl}
                    value={apHexColumn}
                    onChange={(event) => setApHexColumn(event.target.value)}
                  >
                    <option value="">Select column</option>
                    {apHeaderOptions.map((header) => (
                      <option value={header} key={`ap-hex-${header}`}>
                        {header}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={styles.fieldLabel}>
                  Asian Paints Name Column (optional)
                  <select
                    className={styles.inputControl}
                    value={apNameColumn}
                    onChange={(event) => setApNameColumn(event.target.value)}
                  >
                    <option value="">Select column</option>
                    {apHeaderOptions.map((header) => (
                      <option value={header} key={`ap-name-${header}`}>
                        {header}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>
                  Duplicate Threshold (ΔRGB)
                  <input
                    className={styles.inputControl}
                    type="number"
                    min={0}
                    max={100}
                    value={threshold}
                    onChange={(event) => setThreshold(Number(event.target.value))}
                  />
                  <span className={styles.fieldHint}>
                    Shades within this RGB distance of your existing palette will be ignored. Default: {DEFAULT_THRESHOLD}.
                  </span>
                </label>
              </div>

              <button type="submit" className={styles.primaryButton} disabled={isProcessing}>
                {isProcessing ? 'Processing…' : 'Generate Calyco Records'}
              </button>
            </form>
          </section>
        )}

        {error && <div className={styles.error}>{error}</div>}

        {results.length > 0 && (
          <section className={styles.section}>
            <h2>3. Review &amp; export</h2>
            <div className={styles.summaryCard}>
              <p>
                <strong>{results.length.toLocaleString()}</strong> new colours generated. These shades clear your duplicate
                threshold and are ready to add to the Calyco catalogue.
              </p>
              <button type="button" onClick={downloadCsv} className={styles.secondaryButton}>
                Download CSV
              </button>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {DEFAULT_OUTPUT_HEADERS.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.slice(0, 20).map((row) => (
                    <tr key={row.Code}>
                      {DEFAULT_OUTPUT_HEADERS.map((header) => (
                        <td key={`${row.Code}-${header}`}>{row[header]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {results.length > 20 && <p className={styles.tableNote}>Showing the first 20 results.</p>}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
