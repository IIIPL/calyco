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
export const applicationAreaMapping = {
    bathroom:"Bathroom", utility:"Bathroom",
    kitchen:"Kitchen",
    children:"Children's Room", child:"Children's Room", kids:"Children's Room", "children's":"Children's Room",
    bedroom:"Bedroom",
    living:"Living", dining:"Living", lounge:"Living", personal:"Living", formal:"Living", hallway:"Living", hallways:"Living",
    office:"Office", commercial:"Office", offices:"Office",
    exterior:"Exterior", villa:"Exterior", architectural:"Exterior", "high-exposure":"Exterior",
    roof:"Roof/Deck", deck:"Roof/Deck",
    staircase:"Stairs/Lobby", staircases:"Stairs/Lobby", lobby:"Stairs/Lobby", lobbies:"Stairs/Lobby",
    "multi-purpose":"Special", multi:"Special", "baked clay":"Special", bricks:"Special", tile:"Special", meditation:"Special",
};
export const APPLICATION_GROUPS_ORDER = [
    "Bathroom","Kitchen","Bedroom","Living","Children's Room",
    "Exterior","Roof/Deck","Office","Stairs/Lobby","Special","Other"
];
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
