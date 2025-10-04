#!/usr/bin/env python3
"""
Calyco 442 Color Database Generator

Reads Excel file and generates JavaScript color database organized by Color Family.
Supports multiple file path formats (Windows, Linux, WSL).
"""

import pandas as pd
import json
from pathlib import Path
from datetime import datetime

# Try multiple possible locations for the Excel/CSV file
POSSIBLE_PATHS = [
    '/mnt/user-data/outputs/Calyco_Combined_Color_Palette_Updated.xlsx',
    'C:/user-data/outputs/Calyco_Combined_Color_Palette_Updated.xlsx',
    'C:/calyco-github/Calyco_Combined_Color_Palette_Updated.xlsx',
    './Calyco_Combined_Color_Palette_Updated.xlsx',
    '../Calyco_Combined_Color_Palette_Updated.xlsx',
    # Also check for CSV files
    'C:/calyco-github/Calyco_Combined_Color_Palette_Updated.csv',
    './Calyco_Combined_Color_Palette_Updated.csv',
    '../Calyco_Combined_Color_Palette_Updated.csv',
]

def find_excel_file():
    """Try to locate the Excel file in various possible locations"""
    for path_str in POSSIBLE_PATHS:
        path = Path(path_str)
        if path.exists():
            print(f"[OK] Found Excel file at: {path}")
            return path

    print("[ERROR] Excel file not found in any of these locations:")
    for path in POSSIBLE_PATHS:
        print(f"   - {path}")
    print("\n[INFO] Please place the file in one of these locations or update POSSIBLE_PATHS")
    return None

def read_color_data(file_path):
    """Read color data from Excel or CSV file"""
    file_ext = file_path.suffix.lower()
    print(f"[INFO] Reading {file_ext} file...")

    if file_ext == '.csv':
        df = pd.read_csv(file_path)
    else:
        df = pd.read_excel(file_path)

    print(f"[OK] Loaded {len(df)} rows")
    print(f"[INFO] Columns: {', '.join(df.columns)}\n")

    # Verify required columns
    required_columns = ['Color Family', 'Name', 'Hex', 'Code']
    missing = [col for col in required_columns if col not in df.columns]
    if missing:
        print(f"[ERROR] Missing required columns: {', '.join(missing)}")
        print(f"Available columns: {', '.join(df.columns)}")
        return None

    return df

def generate_color_database(df):
    """Generate color database organized by Color Family"""

    # Group by Color Family
    color_families = {}

    for _, row in df.iterrows():
        family = str(row['Color Family']).strip()

        if family not in color_families:
            color_families[family] = []

        color_obj = {
            'code': str(row.get('Code', '')).strip(),
            'name': str(row.get('Name', '')).strip(),
            'hex': str(row.get('Hex', '')).strip(),
            'colorFamily': family,
            'group': str(row.get('Group', '')).strip(),
            'interiorExterior': str(row.get('Interior/Exterior', '')).strip(),
            'colorCollection': str(row.get('Color Collection', '')).strip(),
            'description': str(row.get('Description', '')).strip() if 'Description' in row else '',
            'rooms': str(row.get('Rooms', '')).strip() if 'Rooms' in row else '',
            'colorTemperature': str(row.get('Color Temperature', '')).strip() if 'Color Temperature' in row else '',
            'tonality': str(row.get('Tonality', '')).strip() if 'Tonality' in row else '',
        }

        color_families[family].append(color_obj)

    # Sort families by color count (descending)
    sorted_families = []
    for family, colors in sorted(color_families.items(), key=lambda x: len(x[1]), reverse=True):
        family_code = family.lower().replace(' & ', '-').replace(' ', '-').replace('&', '-')
        sorted_families.append({
            'family': family,
            'familyCode': family_code,
            'colorCount': len(colors),
            'colors': colors
        })

    return sorted_families

def generate_javascript_file(color_data, output_path):
    """Generate JavaScript file with color database"""

    total_colors = sum(f['colorCount'] for f in color_data)

    # Create family distribution summary
    family_summary = '\n'.join([
        f" * - {f['family']}: {f['colorCount']} colors"
        for f in color_data
    ])

    js_content = f"""/**
 * Calyco Complete Color Palette - {total_colors} Colors
 * Organized by Color Family (NOT Group)
 *
 * Generated from: Calyco_Combined_Color_Palette_Updated.xlsx
 * Date: {datetime.now().strftime('%Y-%m-%d')}
 *
 * Color Family Distribution:
{family_summary}
 *
 * Total: {total_colors} colors
 */

export const calycoColors442 = {json.dumps(color_data, indent=2)};

// Export convenience functions
export const getColorFamilies = () => {{
  return calycoColors442.map(family => ({{
    name: family.family,
    code: family.familyCode,
    count: family.colorCount
  }}));
}};

export const getColorsByFamily = (familyCode) => {{
  const family = calycoColors442.find(f => f.familyCode === familyCode);
  return family ? family.colors : [];
}};

export const getAllColors = () => {{
  return calycoColors442.flatMap(family => family.colors);
}};

export const getColorByCode = (code) => {{
  return getAllColors().find(color => color.code === code);
}};

export const getColorByName = (name) => {{
  return getAllColors().find(color =>
    color.name.toLowerCase() === name.toLowerCase()
  );
}};

export const searchColors = (searchTerm) => {{
  const term = searchTerm.toLowerCase();
  return getAllColors().filter(color =>
    color.name.toLowerCase().includes(term) ||
    color.code.toLowerCase().includes(term) ||
    color.colorFamily.toLowerCase().includes(term)
  );
}};

// Get colors suitable for specific rooms
export const getColorsForRoom = (room) => {{
  const roomLower = room.toLowerCase();
  return getAllColors().filter(color =>
    color.rooms && color.rooms.toLowerCase().includes(roomLower)
  );
}};

// Filter by temperature
export const getColorsByTemperature = (temperature) => {{
  const tempLower = temperature.toLowerCase();
  return getAllColors().filter(color =>
    color.colorTemperature && color.colorTemperature.toLowerCase() === tempLower
  );
}};
"""

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)

    return total_colors, len(color_data)

def print_summary(color_data):
    """Print summary of color database"""
    total_colors = sum(f['colorCount'] for f in color_data)

    print("\n" + "="*60)
    print("[SUMMARY] COLOR DATABASE")
    print("="*60)
    print(f"\n   Total Colors: {total_colors}")
    print(f"   Total Families: {len(color_data)}\n")
    print("Color Families:")
    print("-"*60)

    for family in color_data:
        percentage = (family['colorCount'] / total_colors) * 100
        bar = "=" * int(family['colorCount'] / 5)
        print(f"   {family['family']:<20} {family['colorCount']:>3} colors ({percentage:>5.1f}%) {bar}")

    print("="*60 + "\n")

def main():
    print("=" * 60)
    print("  Calyco 442 Color Database Generator")
    print("=" * 60 + "\n")

    # Find Excel file
    excel_path = find_excel_file()
    if not excel_path:
        return

    # Read color data
    df = read_color_data(excel_path)
    if df is None:
        return

    # Generate database structure
    print("[INFO] Organizing colors by Color Family...")
    color_data = generate_color_database(df)

    # Generate JavaScript file
    output_path = Path(__file__).parent.parent / 'src' / 'data' / 'calycoColors442.js'
    print(f"[INFO] Writing JavaScript file to: {output_path}")

    total_colors, total_families = generate_javascript_file(color_data, output_path)

    print(f"[OK] Successfully generated color database!")
    print(f"[INFO] Output: {output_path}")

    # Print summary
    print_summary(color_data)

    print("[OK] DONE! Next steps:")
    print("   1. Review the generated file: src/data/calycoColors442.js")
    print("   2. Update DynamicProductPage.jsx to import calycoColors442")
    print("   3. Test the color family filters on the product page\n")

if __name__ == '__main__':
    main()
