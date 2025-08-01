import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colorGroups } from "../data/colorGroups";

const groupThumbnails = colorGroups.reduce((acc, group) => {
    acc[group.title] = group.colors?.[0]?.hex || "#ccc"; // fallback
    return acc;
}, {});

const ColorsDropdown = ({ onSelect, isMobile = false }) => {
    const [hoveredGroup, setHoveredGroup] = useState(colorGroups[0].title);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleAllClick = () => {
        navigate("/colors");
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (onSelect) onSelect();
    };

    const handleGroupClick = (groupTitle) => {    
        navigate(`/paint-colors/group/${groupTitle.replace(/\s+/g, "-").toLowerCase()}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (onSelect) onSelect();
    };

    if (isMobile) {
        return (
        <div className="w-full flex flex-col items-start">
            <button
            onClick={() => setOpen(!open)}
            className="text-[#493657] hover:text-[#F0C85A] flex justify-between w-full"
            >
            <span>Colors</span>
            <span className={`transform transition-transform ${open ? 'rotate-90' : ''}`}>▶</span>
            </button>
            <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} w-full`}
            >
            <div className="pl-4 py-2 flex flex-col gap-2">
                <button
                onClick={handleAllClick}
                className="text-[#493657] hover:text-[#F0C85A] uppercase font-bold text-left"
                >SEE ALL COLORS</button>
                {colorGroups.map(({ title }) => (
                <button
                    key={title}
                    onClick={() => handleGroupClick(title)}
                    className="text-left text-[#493657] hover:text-[#F0C85A] text-base"
                >{title}</button>
                ))}
            </div>
            </div>
        </div>
        );
    }

    return (
        <div className="fixed left-0 top-[6.5rem] w-full bg-white border-t border-b border-[#e5e0d8] shadow-lg z-50 font-poppins">
        <div className="max-w-screen-xl mx-auto px-24 py-14 flex justify-between">
            {/* Left Column: All Colors */}
            <div className="flex flex-col min-w-[200px] max-w-[220px] border-r border-[#e5e0d8] pr-10">
            <button
                className="text-left text-lg font-bold uppercase py-2 px-0 mb-1 border-b-2 border-[#493657] text-[#493657] hover:text-[#F0C85A]"
                onClick={handleAllClick}
            >SEE ALL COLORS</button>
            </div>

            {/* Middle Column: Group List */}
            <div className="flex flex-col flex-1 px-12 max-h-[400px] overflow-y-auto">
            <ul className="space-y-2 text-[#493657]">
                {colorGroups.map(group => (
                <li
                    key={group.title}
                    className={`text-base cursor-pointer transition-colors py-1 px-0 ${hoveredGroup === group.title ? "font-bold" : "hover:text-[#F0C85A]"}`}
                    onMouseEnter={() => setHoveredGroup(group.title)}
                    onClick={() => handleGroupClick(group.title)}
                >{group.title}</li>
                ))}
            </ul>
            </div>

            {/* Right Column: Swatch Thumbnail */}
            <div className="min-w-[260px] max-w-[280px] flex items-center justify-center">
            <div
                className="w-full h-48 rounded-xl shadow-md border border-gray-100"
                style={{ backgroundColor: groupThumbnails[hoveredGroup] }}
            ></div>
            </div>
        </div>
        </div>
    );
};

export default ColorsDropdown;
