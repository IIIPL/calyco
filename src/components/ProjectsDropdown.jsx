import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MobileChevron from "./MobileChevron";

const projectItems = [
    { key: "living", label: "Living Room" },
    { key: "bedroom", label: "Bedroom" },
    { key: "dining", label: "Dining Room" },
    { key: "bathroom", label: "Bathroom" },
    { key: "hallway", label: "Hallway" },
    { key: "kitchen", label: "Kitchen" },
];

const roomThumbnails = {
    living: "/Assets/u7336851251_the_design_of_a_modern_psychological_officesubdued__c333b72d-13cb-4c09-8ef5-00f2e7aff4c9.webp",
    bedroom: "/Assets/InteriorInspiratoin/header-inspiration-bedroom-b-mobile.webp",
    dining: "/Assets/u1147136281_imagine_realistic_photo_taken_of_an_empty_horizonta_129fd89e-9956-4324-bb58-f5814ef8737c.webp",
    bathroom: "/Assets/InteriorInspiratoin/header-inspiration-bathroom-c-mobile.webp",
    hallway: "/Assets/InteriorInspiratoin/living-room.webp",
    kitchen: "/Assets/yellowstone5477_editorial_style_photo_dark_blue_kitchen_cabinet_ac53ae07-8832-42d4-bc89-91de80d0c940.webp",
};

const ProjectsDropdown = ({ onSelect, isMobile = false }) => {
    const [hoveredRoom, setHoveredRoom] = useState(projectItems[0].key);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleRoomClick = (key) => {
        navigate(`/inspirations/${key}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (onSelect) onSelect();
    };

    const handleAllClick = () => {
        navigate("/inspirations");
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (onSelect) onSelect();
    };

    if (isMobile) {
        return (
            <div className="w-full flex flex-col items-start border-b border-[#e5e0d8]/50">
                <button
                    onClick={() => setOpen(!open)}
                    className="text-[#493657] hover:text-[#F0C85A] py-4 flex justify-between items-center w-full transition-colors duration-300"
                >
                    <span className="text-lg font-medium">Projects</span>
                    <MobileChevron open={open} />
                </button>
                <div
                    className={`transition-all duration-500 ease-[bezier(0.4,0,0.2,1)] overflow-hidden ${open ? "max-h-[1000px] opacity-100 mb-4" : "max-h-0 opacity-0"
                        } w-full`}
                >
                    <div className="pl-4 flex flex-col gap-3">
                        <button
                            onClick={handleAllClick}
                            className="text-[#493657] hover:text-[#F0C85A] font-bold text-left uppercase text-sm tracking-wider mb-2"
                        >
                            View All Projects
                        </button>
                        {projectItems.map((item) => (
                            <button
                                key={item.key}
                                onClick={() => handleRoomClick(item.key)}
                                className="text-left text-[#493657] hover:text-[#F0C85A] text-base"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed left-0 top-[6.5rem] w-full bg-white/95 backdrop-blur-md border-t border-b border-[#e5e0d8] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] z-50 font-poppins transition-all duration-300">
            <div className="max-w-screen-xl mx-auto px-10 lg:px-24 py-16 flex gap-12">
                {/* Left List */}
                <div className="w-64">
                    <div className="flex justify-between items-end mb-8">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.25em]">Rooms</h3>
                    </div>

                    <ul className="space-y-4">
                        {projectItems.map((item) => (
                            <li key={item.key}>
                                <button
                                    onMouseEnter={() => setHoveredRoom(item.key)}
                                    onClick={() => handleRoomClick(item.key)}
                                    className={`text-left text-xl w-full transition-all duration-300 flex items-center justify-between group ${hoveredRoom === item.key
                                            ? 'font-medium text-[#493657] translate-x-2'
                                            : 'font-light text-gray-500 hover:text-[#493657]'
                                        }`}
                                >
                                    <span>{item.label}</span>
                                    {hoveredRoom === item.key && (
                                        <span className="text-[#F0C85A] text-xl animate-fade-in pr-2">→</span>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Separator */}
                <div className="w-px bg-gray-200 mx-4"></div>

                {/* Preview Image */}
                <div className="flex-1 pl-8">
                    <div className="h-[400px] w-full rounded-sm overflow-hidden shadow-2xl relative bg-gray-100 group cursor-pointer" onClick={() => handleRoomClick(hoveredRoom)}>
                        <img
                            src={roomThumbnails[hoveredRoom]}
                            alt={hoveredRoom}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 transition-opacity duration-300"></div>

                        <div className="absolute bottom-0 left-0 w-full p-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <h4 className="text-white text-4xl font-light tracking-wide capitalize mb-2">{projectItems.find(i => i.key === hoveredRoom)?.label}</h4>
                            <div className="h-0.5 w-12 bg-[#F0C85A] mb-3 group-hover:w-24 transition-all duration-500"></div>
                            <p className="text-white/90 text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                Explore Collection
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleAllClick}
                            className="text-sm font-bold text-gray-400 hover:text-[#493657] uppercase tracking-[0.2em] flex items-center gap-2 transition-colors duration-300"
                        >
                            View All Projects <span className="text-[#F0C85A]">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsDropdown;
