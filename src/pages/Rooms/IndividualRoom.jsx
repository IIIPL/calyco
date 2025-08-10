// src/pages/IndividualRoomPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { roomData } from "../../data/roomData";
import { flatColors } from "../../data/flatColors";
const findColor = (name) => {
    return flatColors.find((c) => c.name === name);
};

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/[^\w\-&]+/g, '')   // Remove all non-word chars EXCEPT hyphens and '&'
    .replace(/\-\-+/g, '-');     // Collapse multiple hyphens

export default function IndividualRoomPage() {
    const [comboOpen, setComboOpen] = useState(false);
    const { roomName } = useParams();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [room, setRoom] = useState(null);
    const [shotIndex, setShotIndex] = useState(0);
    const currentShot = room?.shots?.[shotIndex] || null;
    
    useEffect(() => {
        const foundRoom = roomData.find(
            (r) => r.name.toLowerCase().replace(/\s+/g, '-') === roomName
        );
        setRoom(foundRoom);
        setShotIndex(0);
        setImageLoaded(false);
    }, [roomName]);
    
    useEffect(() => {
        setImageLoaded(false);
    }, [shotIndex]);
    
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };
    
    const zoomIn = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1, 
            transition: { 
                duration: 0.5 
            } 
        }
    };
    
    if (!room) {
        return (
            <motion.div 
                className="font-poppins bg-white min-h-screen flex items-center justify-center"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="text-center px-4 max-w-2xl">
                    <div className="text-8xl mb-4">🛋️</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#393939] mb-4">Room Not Found</h1>
                    <p className="text-lg md:text-xl text-[#666] mb-8">
                        We couldn't find the room you're looking for. Please check the URL or return to our gallery.
                    </p>
                    <Link 
                        to="/rooms" 
                        className="inline-block px-8 py-3 bg-[#393939] text-white rounded-lg hover:bg-[#222] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#393939]"
                    >
                        Browse All Rooms
                    </Link>
                </div>
            </motion.div>
        );
    }
    
    return (
        <div className="font-poppins bg-white min-h-screen pt-20">
            {/* Hero Section */}
            <motion.div 
                className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-8"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold text-[#393939]  tracking-tight text-center">
                    {room.name}
                </h1>
            </motion.div>

            {room.shots?.length > 0 && (
                <motion.div
                    className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mb-8"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <h2 className="text-2xl font-bold text-[#393939] mb-3">Color Combinations</h2>

                    <div className="relative inline-block">
                    <button
                        type="button"
                        onClick={() => setComboOpen(o => !o)}
                        className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-white shadow-sm hover:shadow transition border-gray-200"
                        aria-haspopup="listbox"
                        aria-expanded={comboOpen}
                    >
                        <div className="flex -space-x-1">
                        {(currentShot?.colors || []).slice(0, 5).map((c, idx) => {
                            const obj = findColor(c);
                            return (
                            <span
                                key={idx}
                                className="w-5 h-5 rounded-sm border border-gray-300"
                                style={{ backgroundColor: obj?.hex || '#ddd' }}
                                title={c}
                            />
                            );
                        })}
                        </div>
                        <svg width="16" height="16" viewBox="0 0 20 20" className="text-gray-600">
                        <path fill="currentColor" d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z"/>
                        </svg>
                    </button>

                    {comboOpen && (
                        <div
                        role="listbox"
                        className="absolute z-20 mt-2 w-64 max-h-64 overflow-auto rounded-lg border bg-white shadow-lg p-2"
                        >
                        {room.shots.map((s, i) => (
                            <button
                            key={i}
                            type="button"
                            onClick={() => {
                                setShotIndex(i);
                                setComboOpen(false);
                                // document.getElementById('room-hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            className={`w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-50 focus:bg-gray-50 transition ${
                                i === shotIndex ? 'ring-2 ring-[#393939]/30' : ''
                            }`}
                            aria-selected={i === shotIndex}
                            >
                            <div className="flex gap-1">
                                {(s.colors || []).slice(0, 5).map((c, idx) => {
                                const obj = findColor(c);
                                return (
                                    <span
                                    key={idx}
                                    className="w-5 h-5 rounded-sm border border-gray-300"
                                    style={{ backgroundColor: obj?.hex || '#ddd' }}
                                    title={c}
                                    />
                                );
                                })}
                            </div>
                            </button>
                        ))}
                        </div>
                    )}
                    </div>
                </motion.div>
                )}


            
            {/* Room Overview Section */}
            <motion.div 
                id="room-hero"
                className="w-full flex justify-center items-center mb-12"
                initial="hidden"
                animate="visible"
                variants={zoomIn}
            >
                {!imageLoaded && (
                    <div className="absolute w-full h-[28rem] bg-gray-200 animate-pulse pointer-events-none" />
                )}
                {currentShot ? (
                    <motion.img
                        src={currentShot.image}
                        alt={`${room.name} - Color combination ${shotIndex + 1}`}
                        className={`w-auto max-h-[28rem] ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: imageLoaded ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        onLoad={() => setImageLoaded(true)}
                    />
                ) : (
                    <div className="w-full max-h-[28rem] flex items-center justify-center bg-gray-100 rounded-lg">
                        <p className="text-gray-500 text-lg">No image available</p>
                    </div>
                )}
            </motion.div>

            {/* Paint Colors Section */}
            {currentShot && (
                <motion.div 
                    className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mb-12"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <h2 className="text-3xl font-bold text-[#393939] mb-6">Colors Used:</h2>
                    
                    <div className="flex overflow-x-auto pb-4 space-x-6 md:space-x-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {(currentShot.colors || []).map((color, i) => {
                            const colorObj = findColor(color);
                            const colorFamily = colorObj ? colorObj.color_family.toLowerCase().replace(/\s+/g, '-') : "";
                            const colorName = colorObj ? colorObj.name.toLowerCase().replace(/\s+/g, '-') : "";
                            
                            return colorObj ? (
                                <motion.div 
                                    key={i} 
                                    variants={fadeIn}
                                    className="flex-shrink-0 w-48 md:w-auto"
                                >
                                    <Link 
                                        to={`/colors/family/${slugify(colorFamily)}/${colorName}`}
                                        className="block group focus:outline-none"
                                        aria-label={`View ${colorObj.name} color details`}
                                    >
                                        <div className="relative">
                                            <div 
                                                className="w-16 h-16 md:w-20 md:h-20 rounded-lg mx-auto mb-3 ring-2 ring-transparent group-hover:ring-gray-300 group-focus:ring-gray-300 transition-all duration-300 shadow-md"
                                                style={{ backgroundColor: colorObj.hex }}
                                            ></div>
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                                <span className="text-xs font-medium text-white bg-black bg-opacity-70 px-2 py-1 rounded">
                                                    {colorObj.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-medium text-[#393939] group-hover:text-[#666] transition-colors duration-300">
                                                {colorObj.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {colorObj.hex}
                                            </p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key={i} 
                                    variants={fadeIn}
                                    className="flex-shrink-0 w-48 md:w-auto"
                                >
                                    <div className="block group">
                                        <div 
                                            className="w-16 h-16 md:w-20 md:h-20 rounded-lg mx-auto mb-3 bg-gray-200 flex items-center justify-center ring-2 ring-transparent group-hover:ring-gray-300 transition-all duration-300 shadow-md"
                                            title="Color not found"
                                        >
                                            <span className="text-gray-500 text-xl">?</span>
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-medium text-[#393939]">
                                                {color}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Not available
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            )}
            
            <p className="text-base sm:text-lg md:text-xl text-[#393939] text-center leading-relaxed max-w-3xl mx-auto">
                {room.description}
            </p>
            {/* Call to Action Section */}
            <motion.div 
                className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mb-16"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="bg-gray-50 rounded-2xl p-8 shadow-md mt-20">
                    <h2 className="text-2xl font-bold text-[#393939] mb-4 text-center">Try This Room Yourself</h2>
                    <p className="text-center text-[#666] mb-6 max-w-2xl mx-auto">
                        Visualize these colors in your own space with our interactive room visualizer tool.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link 
                            to={`/room-visualization`}
                            className="px-6 py-3 bg-[#393939] text-white rounded-lg hover:bg-[#222] transition-colors duration-300 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#393939]"
                        >
                            Try in Room Visualizer
                        </Link>
                        <button 
                            className="px-6 py-3 bg-white text-[#393939] border border-[#393939] rounded-lg hover:bg-gray-50 transition-colors duration-300 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#393939]"
                            onClick={() => {
                                alert('Download/share functionality would be implemented here');
                            }}
                        >
                            Save & Share
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}