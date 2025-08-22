import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Eye, Download, Share2, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { flatColors } from '../data/flatColors';

const ColorVisualizer = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploadMode, setIsUploadMode] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sample rooms data
  const sampleRooms = [
    { id: 1, name: 'Living Room', image: '/Assets/Rooms/LivingRoom/base.jpg', type: 'interior' },
    { id: 2, name: 'Bedroom', image: '/Assets/Rooms/Bedroom/base.jpg', type: 'interior' },
    { id: 3, name: 'Exterior', image: '/Assets/Rooms/DiningRoom/base.jpg', type: 'exterior' },
    { id: 4, name: 'Kitchen', image: '/Assets/InteriorInspiratoin/kitchen.png', type: 'interior' }
  ];

  // Get a subset of colors for the visualizer
  const visualizerColors = flatColors.slice(0, 24); // Show 24 colors in 6x4 grid

  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setShowPalette(true);
    applyColorToRoom(color);
  };

  // Handle room selection
  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setIsUploadMode(false);
    setUploadedImage(null);
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setIsUploadMode(true);
        setSelectedRoom(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Apply color to room using Canvas
  const applyColorToRoom = (color) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw original image
      ctx.drawImage(img, 0, 0);
      
      // Apply color overlay to walls (simplified - you can enhance this with proper masking)
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = color.hex;
      ctx.globalAlpha = 0.3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    };

    const imageSource = uploadedImage || selectedRoom?.image;
    if (imageSource) {
      img.src = imageSource;
    }
  };

  // Get complementary colors
  const getComplementaryColors = (baseColor) => {
    const colors = visualizerColors.filter(c => c.hex !== baseColor.hex);
    return colors.slice(0, 3);
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setIsUploadMode(true);
        setSelectedRoom(null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-1">Visualize Your Walls</h3>
        <p className="text-white/80 text-sm">Try any Calyco shade instantly in real rooms.</p>
      </div>

      {/* Color Swatches Grid */}
      <div className="mb-4">
        <div className="grid grid-cols-6 gap-2 mb-3">
          {visualizerColors.map((color, index) => (
            <motion.div
              key={color.hex}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`w-8 h-8 rounded-lg border-2 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-lg ${
                selectedColor?.hex === color.hex ? 'border-white scale-110' : 'border-white/30'
              }`}
              style={{ backgroundColor: color.hex }}
              onClick={() => handleColorSelect(color)}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-white/30 text-white text-sm rounded-lg font-medium hover:bg-white/10 transition-all duration-200"
        >
          <Upload size={14} />
          Upload Room
        </button>
        <button
          onClick={() => setSelectedRoom(sampleRooms[0])}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-white/20 text-white text-sm rounded-lg font-medium hover:bg-white/30 transition-all duration-200"
        >
          <Eye size={14} />
          Sample Rooms
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Room Visualization Area */}
      <div className="relative bg-white/10 rounded-lg p-3 mb-3">
        {selectedRoom || uploadedImage ? (
          <div className="relative">
            {/* Canvas for color overlay */}
            <canvas
              ref={canvasRef}
              className="w-full h-32 object-cover rounded-lg shadow-sm"
            />
            
            {/* Compare Mode Toggle */}
            <div className="absolute top-1 right-1">
              <button
                onClick={() => setIsCompareMode(!isCompareMode)}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  isCompareMode 
                    ? 'bg-white text-gray-900' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Compare
              </button>
            </div>

            {/* Save/Share Buttons */}
            <div className="absolute bottom-1 right-1 flex gap-1">
              <button className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-200">
                <Download size={12} className="text-white" />
              </button>
              <button className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-200">
                <Share2 size={12} className="text-white" />
              </button>
            </div>
          </div>
        ) : (
          /* Upload Zone */
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="w-full h-32 border border-dashed border-white/30 rounded-lg flex flex-col items-center justify-center text-white/70 hover:border-white/50 hover:bg-white/5 transition-all duration-200"
          >
            <Upload size={20} className="mb-1" />
            <p className="text-xs">Drag & drop your room photo</p>
          </div>
        )}
      </div>

      {/* Sample Rooms Gallery */}
      <div className="mb-3">
        <h4 className="text-xs font-medium text-white/80 mb-2">Sample Rooms</h4>
        <div className="grid grid-cols-4 gap-1">
          {sampleRooms.map((room) => (
            <motion.div
              key={room.id}
              whileHover={{ scale: 1.05 }}
              className={`relative cursor-pointer rounded-lg overflow-hidden ${
                selectedRoom?.id === room.id ? 'ring-2 ring-white' : ''
              }`}
              onClick={() => handleRoomSelect(room)}
            >
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-10 object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="text-white text-xs font-medium">{room.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Palette Suggestions */}
      <AnimatePresence>
        {showPalette && selectedColor && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-white/10 rounded-lg p-3 border border-white/20"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-medium text-white">
                Palette for {selectedColor.name}
              </h4>
              <button
                onClick={() => setShowPalette(false)}
                className="text-white/60 hover:text-white"
              >
                <X size={12} />
              </button>
            </div>
            <div className="flex gap-1">
              {getComplementaryColors(selectedColor).map((color) => (
                <motion.div
                  key={color.hex}
                  whileHover={{ scale: 1.1 }}
                  className="w-6 h-6 rounded-full border border-white/30 cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorVisualizer;
