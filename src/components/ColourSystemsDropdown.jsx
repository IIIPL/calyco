import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllColors } from "../data/calycoColors.js";
import { reverseColorNameMapping } from "../data/colorNameMapping";
import MobileChevron from "./MobileChevron";

const ALL_COLORS = getAllColors();

const toSlug = (value) =>
    value
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const buildSearchHaystack = (color) => {
    const pieces = [
        color.name,
        color.calycoName,
        color.undertone,
        color.tonality,
        color.collection,
        color.colorCollection,
        color.description,
        Array.isArray(color.tags) ? color.tags.join(" ") : "",
    ];
    return pieces.join(" ").toLowerCase();
};

const isBlueGreen = (color) => {
    if (!["Greens", "Blues"].includes(color.colorFamily)) return false;
    return /(teal|turquoise|lagoon|aqua|cyan|sea|blue[\s-]?green)/i.test(buildSearchHaystack(color));
};

const isYellowGreen = (color) => {
    if (color.colorFamily !== "Greens") return false;
    return /(yellow|lime|chartreuse|olive|gold|citrus)/i.test(buildSearchHaystack(color));
};

const FAMILY_DEFINITIONS = [
    { key: "whites-off-whites", label: "Whites & Off-Whites", matcher: (c) => c.colorFamily === "Whites" },
    { key: "yellows-golds", label: "Yellows & Golds", matcher: (c) => c.colorFamily === "Yellows & Golds" },
    { key: "oranges", label: "Oranges", matcher: (c) => c.colorFamily === "Oranges" },
    { key: "reds-pinks", label: "Reds & Pinks", matcher: (c) => c.colorFamily === "Reds & Pinks" },
    { key: "purples-violets", label: "Purples & Violets", matcher: (c) => c.colorFamily === "Purples & Violets" },
    { key: "blues", label: "Blues", matcher: (c) => c.colorFamily === "Blues" },
    { key: "blue-greens", label: "Blue Greens", matcher: (c) => isBlueGreen(c) },
    { key: "greens", label: "Greens", matcher: (c) => c.colorFamily === "Greens" },
    { key: "yellow-greens", label: "Yellow Greens", matcher: (c) => isYellowGreen(c) },
    { key: "neutrals", label: "Neutrals - Browns, Greys", matcher: (c) => ["Grays", "Earth Tones", "Beiges & Tans"].includes(c.colorFamily) },
    { key: "metallics", label: "Specialty Metallics", matcher: (c) => c.colorFamily === "Specialty Metallics" },
    { key: "beiges-tans", label: "Beiges & Tans", matcher: (c) => c.colorFamily === "Beiges & Tans" },
];

const getActualHexColor = (value) => {
    if (value && value.startsWith("#")) return value;
    return reverseColorNameMapping[value] || "#CCCCCC";
};

const buildGradient = (colors) => {
    const stops = colors.slice(0, 3).map((color, index) => {
        const hex = getActualHexColor(color.hex);
        const position = index === 0 ? "0%" : index === 1 ? "55%" : "100%";
        return `${hex} ${position}`;
    });

    if (stops.length === 0) return "linear-gradient(135deg, #9ca3af, #6b7280)";
    if (stops.length === 1) stops.push(`${stops[0].split(" ")[0]} 100%`);

    return `linear-gradient(135deg, ${stops.join(", ")})`;
};

const ColourSystemsDropdown = ({ onSelect, isMobile = false }) => {
    const familyData = useMemo(() => {
        return FAMILY_DEFINITIONS.map((family) => {
            const colors = ALL_COLORS.filter(family.matcher);
            return {
                ...family,
                gradient: buildGradient(colors),
                colorFamilyName: colors.length > 0 ? colors[0].colorFamily : family.label, // For linking
                existingFamilyKey: family.families ? family.families[0] : null // Fallback
            };
        }).filter((item) => ALL_COLORS.filter(item.matcher).length > 0);
    }, []);

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleAllClick = () => {
        navigate("/colors");
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (onSelect) onSelect();
    };

    const handleFamilyClick = (family) => {
        // Logic to determine slug
        // We can use the logic from ColorsDropdown:
        // const targetFamily = family.families?.[0] || family.colors[0].colorFamily;
        // Since we simplified the object, we need to be careful.
        // Let's re-filter to get the family name properly or just use the label if it maps correctly.
        // Actually, creating a robust mapping is better.
        // For now, let's use the first matching color's family.
        const colors = ALL_COLORS.filter(family.matcher);
        if (colors.length > 0) {
            navigate(`/colors/family/${toSlug(colors[0].colorFamily)}`);
        } else {
            navigate('/colors');
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (onSelect) onSelect();
    };

    if (isMobile) {
        return (
            <div className="w-full flex flex-col items-start">
                <button
                    onClick={() => setOpen(!open)}
                    className="text-[#493657] hover:text-[#F0C85A] flex justify-between items-center w-full"
                >
                    <span>Colour Systems</span>
                    <MobileChevron open={open} />
                </button>
                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                        } w-full`}
                >
                    <div className="pl-4 py-2 flex flex-col gap-2">
                        <button onClick={handleAllClick} className="text-[#493657] hover:text-[#F0C85A] font-bold text-left uppercase">
                            See All Colors
                        </button>
                        <div className="flex flex-col gap-2 mt-2">
                            <span className="text-xs font-bold text-[#916e9f] uppercase tracking-wider">Colour Families</span>
                            {familyData.map((family) => (
                                <button
                                    key={family.key}
                                    onClick={() => handleFamilyClick(family)}
                                    className="text-left text-[#493657] hover:text-[#F0C85A] flex items-center gap-2"
                                >
                                    <span className="w-4 h-4 rounded-full inline-block shadow-sm" style={{ background: family.gradient }}></span>
                                    {family.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <span className="text-xs font-bold text-[#916e9f] uppercase tracking-wider">Tools</span>
                            <Link to="/room-visualization" onClick={onSelect} className="text-[#493657] hover:text-[#F0C85A]">
                                Room Visualizer
                            </Link>
                            <button onClick={handleAllClick} className="text-[#493657] hover:text-[#F0C85A] text-left">
                                View Colour Palette
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed left-0 top-[6.5rem] w-full bg-white border-t border-b border-[#e5e0d8] shadow-lg z-50 font-poppins">
            <div className="max-w-screen-xl mx-auto px-10 lg:px-24 py-12 flex gap-12">
                {/* Colours Section */}
                <div className="flex-1">
                    <div className="flex justify-between items-end border-b-2 border-[#493657] pb-2 mb-6">
                        <h3 className="text-lg font-bold text-[#493657] uppercase">Colour Families</h3>
                        <button onClick={handleAllClick} className="text-sm font-semibold text-[#493657] hover:text-[#F0C85A] uppercase">
                            See All Colors →
                        </button>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {familyData.map((family) => (
                            <button
                                key={family.key}
                                onClick={() => handleFamilyClick(family)}
                                className="flex items-center gap-3 group text-left p-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div
                                    className="w-10 h-10 rounded-full shadow-md group-hover:scale-110 transition-transform"
                                    style={{ background: family.gradient }}
                                />
                                <span className="text-[#493657] font-medium group-hover:text-[#F0C85A] transition-colors text-sm">
                                    {family.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tools Section */}
                <div className="w-64 border-l border-[#e5e0d8] pl-12">
                    <h3 className="text-lg font-bold text-[#493657] uppercase border-b-2 border-[#493657] pb-2 mb-6">
                        Tools
                    </h3>
                    <ul className="space-y-4">
                        <li>
                            <Link to="/room-visualization" onClick={onSelect} className="group block">
                                <span className="text-[#493657] font-medium group-hover:text-[#F0C85A] text-lg block mb-1">Room Visualizer</span>
                                <span className="text-sm text-gray-500">Visualize colors in your space</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/colors" onClick={onSelect} className="group block">
                                <span className="text-[#493657] font-medium group-hover:text-[#F0C85A] text-lg block mb-1">View Colour Palette</span>
                                <span className="text-sm text-gray-500">Explore all 2000+ shades</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ColourSystemsDropdown;
