export const CATEGORY_ORDER = [
  "Interior",
  "Stain & sealer",          // ← 2nd
  "Floor coatings",
  "Exterior",
  "Wood coatings",
  "Primer",
  "Enamel",
  "Industrial coatings"
];

export const categoryMapping = {
  // Interior
  "interior": "Interior", "interiors": "Interior",

  // Exterior
  "exterior": "Exterior", "exteriors": "Exterior",

  // Wood
  "wood": "Wood coatings", "wood coatings": "Wood coatings", "woodguard": "Wood coatings",

  // Floor
  "floor": "Floor coatings", "flooring": "Floor coatings", "floor coatings": "Floor coatings",

  // Stain & Sealer (all variants)
  "stain & sealer": "Stain & sealer",
  "stain and sealer": "Stain & sealer",
  "stain + sealer": "Stain & sealer",
  "stain/sealer": "Stain & sealer",
  "stain & seal": "Stain & sealer",
  "stain+seal": "Stain & sealer",
  "stain/seal": "Stain & sealer",
  "stain": "Stain & sealer",
  "sealer": "Stain & sealer",
  "all-surface stain & sealer": "Stain & sealer",

  // Primer / Enamel / Industrial
  "primer": "Primer", "primers": "Primer",
  "enamel": "Enamel",
  "industrial": "Industrial coatings", "industrial coatings": "Industrial coatings"
};

export function mapToStandardCategories(categories = []) {
  const out = categories.map(c => {
    const key = String(c || "").trim().toLowerCase();
    return categoryMapping[key] || c; // keep original if no mapping
  });
  return Array.from(new Set(out)); // unique, keep first occurrence
}

export function sortCategoriesWithOrder(uniqueCats = []) {
  const set = new Set(uniqueCats);
  const ordered = [];
  CATEGORY_ORDER.forEach(name => { if (set.has(name)) { ordered.push(name); set.delete(name); }});
  // any leftovers appended alphabetically
  return [...ordered, ...Array.from(set).sort()];
}

export const substrateMapping = {
    plaster:"Plaster & POP", pop:"Plaster & POP",
    drywall:"Drywall & Cement Board","cement board":"Drywall & Cement Board","cement sheet":"Drywall & Cement Board",
    masonry:"Concrete & Masonry", concrete:"Concrete & Masonry", brick:"Concrete & Masonry", aac:"Concrete & Masonry",
    wood:"Wood & Ply", ply:"Wood & Ply",
    metal:"Metal & Steel", steel:"Metal & Steel",
    tile:"Tile & Ceramic", ceramic:"Tile & Ceramic",
    junction:"Multi-surface / Junctions","multi-surface":"Multi-surface / Junctions",
};
export const orderedSubstrateGroups = [
    "Plaster & POP","Drywall & Cement Board","Concrete & Masonry",
    "Wood & Ply","Metal & Steel","Tile & Ceramic","Multi-surface / Junctions"
];


// OLD APPLICATION AREA MAPPING: 
// export const applicationAreaMapping = {
//     bathroom:"Bathroom", utility:"Bathroom",
//     kitchen:"Kitchen",
//     children:"Children's Room", child:"Children's Room", kids:"Children's Room", "children's":"Children's Room",
//     bedroom:"Bedroom",
//     living:"Living", dining:"Living", lounge:"Living", personal:"Living", formal:"Living", hallway:"Living", hallways:"Living",
//     office:"Office", commercial:"Office", offices:"Office",
//     exterior:"Exterior", villa:"Exterior", architectural:"Exterior", "high-exposure":"Exterior",
//     roof:"Roof/Deck", deck:"Roof/Deck",
//     staircase:"Stairs/Lobby", staircases:"Stairs/Lobby", lobby:"Stairs/Lobby", lobbies:"Stairs/Lobby",
//     "multi-purpose":"Special", multi:"Special", "baked clay":"Special", bricks:"Special", tile:"Special", meditation:"Special",
// };
// export const APPLICATION_GROUPS_ORDER = [
//     "Bathroom","Kitchen","Bedroom","Living","Children's Room",
//     "Exterior","Roof/Deck","Office","Stairs/Lobby","Special","Other"
// ];




// NEW: 
// ✅ Updated APPLICATION groups (India context)
export const APPLICATION_GROUPS_ORDER = [
  "Interiors",
  "Exterior Facades & Boundary Walls",
  "Woodwork & Joinery",
  "Floors & Hardscape",
  "Roofs & Terraces",
  "Balconies, Verandahs & Patios",
  "Metal & Steel",
  "Multi-Surface & Junctions"
];

// ✅ Map every keyword/phrase to one of the above (kept different from Substrate)
export const applicationAreaMapping = {
  // Interiors
  "interior wall painting": "Interiors",
  "interior wall decoration": "Interiors",
  "living rooms": "Interiors",
  "hallways": "Interiors",
  "offices": "Interiors",
  "formal spaces": "Interiors",
  "staircases": "Interiors",
  "lobbies": "Interiors",
  "bedrooms": "Interiors",
  "lounges": "Interiors",
  "personal spaces": "Interiors",
  "children's rooms": "Interiors",
  "dining walls": "Interiors",
  "drywall": "Interiors",
  "gypsum board": "Interiors",
  "mdf": "Woodwork & Joinery", // interiors but joinery item
  "previously painted": "Interiors",
  "repaint": "Interiors",

  // Exterior Facades & Boundary Walls
  "architectural & villa exteriors": "Exterior Facades & Boundary Walls",
  "exterior facades": "Exterior Facades & Boundary Walls",
  "exterior walls": "Exterior Facades & Boundary Walls",
  "boundary walls": "Exterior Facades & Boundary Walls",
  "compound walls": "Exterior Facades & Boundary Walls",
  "high-exposure exterior surfaces": "Exterior Facades & Boundary Walls",
  "plaster": "Exterior Facades & Boundary Walls",
  "cement plaster": "Exterior Facades & Boundary Walls",
  "gypsum plaster": "Exterior Facades & Boundary Walls",
  "aac": "Exterior Facades & Boundary Walls",
  "brick": "Exterior Facades & Boundary Walls",
  "stone": "Exterior Facades & Boundary Walls",
  "cement": "Exterior Facades & Boundary Walls",
  "fibre-cement": "Exterior Facades & Boundary Walls",
  "cement fibre": "Exterior Facades & Boundary Walls",
  "cement board": "Exterior Facades & Boundary Walls",
  "siding": "Exterior Facades & Boundary Walls",
  "cladding": "Exterior Facades & Boundary Walls",

  // Woodwork & Joinery
  "wood": "Woodwork & Joinery",
  "hardwood": "Woodwork & Joinery",
  "softwood": "Woodwork & Joinery",
  "ply": "Woodwork & Joinery",
  "timber": "Woodwork & Joinery",
  "exterior wooden surfaces": "Woodwork & Joinery",
  "deck restoration": "Floors & Hardscape", // functionally a floor/hardscape
  "decks": "Floors & Hardscape",
  "trim": "Woodwork & Joinery",
  "doors": "Woodwork & Joinery",
  "cabinets": "Woodwork & Joinery",
  "windows": "Woodwork & Joinery",
  "interior furniture": "Woodwork & Joinery",
  "exterior furniture": "Woodwork & Joinery",
  "joinery": "Woodwork & Joinery",
  "woodwork": "Woodwork & Joinery",

  // Floors & Hardscape
  "interior floors": "Floors & Hardscape",
  "retail and warehouse flooring": "Floors & Hardscape",
  "hardscape sealing": "Floors & Hardscape",
  "masonry sealing": "Floors & Hardscape",
  "concrete protection": "Floors & Hardscape",
  "concrete": "Floors & Hardscape",
  "paver": "Floors & Hardscape",
  "pavers": "Floors & Hardscape",
  "driveways": "Floors & Hardscape",
  "walkways": "Floors & Hardscape",
  "patios": "Balconies, Verandahs & Patios",

  // Roofs & Terraces
  "roofs": "Roofs & Terraces",
  "rcc": "Roofs & Terraces",
  "terraces": "Roofs & Terraces",
  "chajjas": "Roofs & Terraces",
  "parapets": "Roofs & Terraces",
  "metal sheds": "Roofs & Terraces",
  "roof tiles": "Roofs & Terraces",
  "baked clay": "Roofs & Terraces",
  "heat-prone outdoor surfaces": "Roofs & Terraces",

  // Balconies, Verandahs & Patios
  "balconies": "Balconies, Verandahs & Patios",
  "verandahs": "Balconies, Verandahs & Patios",
  "porches": "Balconies, Verandahs & Patios",

  // Metal & Steel
  "metal": "Metal & Steel",
  "steel": "Metal & Steel",
  "iron": "Metal & Steel",
  "ms": "Metal & Steel",
  "gi": "Metal & Steel",
  "steel protection": "Metal & Steel",
  "mild steel structures": "Metal & Steel",
  "pipelines": "Metal & Steel",
  "tanks": "Metal & Steel",
  "beams": "Metal & Steel",
  "railings": "Metal & Steel",
  "ducts": "Metal & Steel",
  "infrastructure": "Metal & Steel",
  "equipment": "Metal & Steel",
  "industrial surfaces": "Metal & Steel",
  "transport equipment": "Metal & Steel",
  "automotive panels": "Metal & Steel",      // mapped per your request (no auto category)
  "fenders": "Metal & Steel",
  "defense vehicles": "Metal & Steel",

  // Multi-Surface & Junctions
  "multi-surface areas": "Multi-Surface & Junctions",
  "joint & multi-surface areas": "Multi-Surface & Junctions",
  "general topcoat/multi-surface": "Multi-Surface & Junctions",
  "substrate priming & sealing": "Multi-Surface & Junctions",
  "primer": "Multi-Surface & Junctions",
  "priming": "Multi-Surface & Junctions",
  "sealer": "Multi-Surface & Junctions",
  "tile waterproofing": "Multi-Surface & Junctions",
  "waterproofing": "Multi-Surface & Junctions",
  "masonry waterproofing": "Multi-Surface & Junctions",
  "bathroom": "Multi-Surface & Junctions",
  "kitchen": "Multi-Surface & Junctions",
  "utility area": "Multi-Surface & Junctions",
  "tile": "Multi-Surface & Junctions",
  "ceramic": "Multi-Surface & Junctions",
  "vitrified": "Multi-Surface & Junctions",
  "glazed": "Multi-Surface & Junctions",
  "interface": "Multi-Surface & Junctions",
  "multi-surface": "Multi-Surface & Junctions",
  "junction": "Multi-Surface & Junctions"
};
// ToolTip: 
// Add this export
export const APPLICATION_TOOLTIPS = {
  "Interiors":
    "Living rooms, bedrooms, halls, home offices\nStaircases and lobbies",

  "Exterior Facades & Boundary Walls":
    "Home/building exteriors: plaster, brick, stone\nBoundary/compound walls\nHigh-sun areas",

  "Woodwork & Joinery":
    "Doors, windows, cabinets, furniture\nPergolas and exterior wood",

  "Floors & Hardscape":
    "Interior floors\nDriveways, pavers and pathways\nPatios and walkways\nDecks",

  "Roofs & Terraces":
    "RCC terraces, parapets and chajjas\nMetal sheds\nRoof tiles\nHeat-prone areas",

  "Balconies, Verandahs & Patios":
    "Balconies\nVerandahs\nPorches and sit-outs",

  "Metal & Steel":
    "Gates, grills and railings\nPipelines, tanks, beams and ducts\nSite equipment (mild steel/steel)",

  "Multi-Surface & Junctions":
    "Joints and interfaces\nBathrooms and kitchens\nPrimers and sealers\nAll-in-one topcoat for mixed surfaces"
};

export function mapToStandardSubstrates(substrates=[]) {
    const out = new Set();
    substrates.forEach(s => {
        const sub = String(s||'').toLowerCase();
        for (const [k,g] of Object.entries(substrateMapping)) if (sub.includes(k)) out.add(g);
    });
    return [...out];
}
export function mapToStandardApplicationAreas(applications=[]) {
    const out = new Set();
    applications.forEach(a => {
        const app = String(a||'').toLowerCase();
        let found = false;
        for (const [k,g] of Object.entries(applicationAreaMapping)) if (app.includes(k)) { out.add(g); found = true; }
        if (!found) out.add("Other");
    });
    return [...out];
}
