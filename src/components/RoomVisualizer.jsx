// src/components/RoomVisualizer.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useColors } from '../context/ColorContext.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUpload, FaTrash, FaDownload, FaTimes, FaArrowLeft, FaInfoCircle, FaStar, FaQuestionCircle } from 'react-icons/fa';
import { flatColors } from '../data/flatColors';
import { segmentImage } from '../utils/segmentation.js';

const RoomVisualizer = () => {
  const { allColors } = useColors();
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const segImageRef = useRef(null);
  
  // Get data from navigation state
  const { selectedRoom, uploadedImage } = location.state || {};
  
  // State management
  const [originalImage, setOriginalImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [appliedColors, setAppliedColors] = useState({
    walls: null,
    ceiling: null,
    floor: null
  });
  const [activeSurface, setActiveSurface] = useState('walls');
  const [colorSearch, setColorSearch] = useState('');
  const [colorFamily, setColorFamily] = useState('All');
  const [surfaceMasks, setSurfaceMasks] = useState({});
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [segmentationError, setSegmentationError] = useState(null);
  
  // Sample room images with masks
  const roomImages = {
    'Bedroom': {
      base: '/Assets/Rooms/Bedroom/base.jpg',
      masks: {
        walls: '/Assets/Rooms/Bedroom/mask-walls.jpg',
        ceiling: '/Assets/Rooms/Bedroom/mask-ceiling.jpg',
        floor: '/Assets/Rooms/Bedroom/mask-floor.jpg'
      }
    },
    'Living Room': {
      base: '/Assets/Rooms/LivingRoom/base.jpg',
      masks: {
        walls: '/Assets/Rooms/LivingRoom/mask-walls.jpg',
        ceiling: '/Assets/Rooms/LivingRoom/mask-ceiling.jpg',
        floor: '/Assets/Rooms/LivingRoom/mask-floor.jpg'
      }
    },
    'Dining Room': {
      base: '/Assets/Rooms/DiningRoom/base.jpg',
      masks: {
        walls: '/Assets/Rooms/DiningRoom/mask-walls.jpg',
        ceiling: '/Assets/Rooms/DiningRoom/mask-ceiling.jpg',
        // floor: '/Assets/Rooms/DiningRoom/mask-floor.jpg'
      }
    }
  };
  
  // Surface options
  const surfaces = [
    { id: 'walls', name: 'WALLS', color: '#E5E7EB' },
    { id: 'ceiling', name: 'CEILING', color: '#F3F4F6' },
    { id: 'floor', name: 'FLOOR', color: '#F9FAFB' }
  ];
  
  // Color families
  const colorFamilies = ['All', 'WHITES & OFF WHITES', 'GREYS', 'BROWNS', 'BLUES', 'GREENS', 'YELLOWS & GREENS'];
  
  // Helper function to determine text color based on background
  const getContrastColor = (hex) => {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  };
  
  // Helper function to convert hex to RGB
  const hexToRGB = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };
  
  // Filter colors based on search and family
  const filteredColors = flatColors.filter(color => {
    const searchTerm = colorSearch.toLowerCase().trim();
    const matchesSearch = searchTerm === '' || 
                         color.name.toLowerCase().includes(searchTerm) ||
                         color.hex.toLowerCase().includes(searchTerm) ||
                         color.color_family.toLowerCase().includes(searchTerm);
                         
    const matchesFamily = colorFamily === 'All' || color.color_family === colorFamily;
    return matchesSearch && matchesFamily;
  });
  
  // Handle color selection
  const handleColorSelect = (color) => {
    const currentSurfaceColor = appliedColors[activeSurface];
    
    if (currentSurfaceColor?.hex === color.hex) {
      setAppliedColors(prev => ({
        ...prev,
        [activeSurface]: null
      }));
      
      const isColorUsedElsewhere = Object.entries(appliedColors).some(
        ([key, surfaceColor]) => key !== activeSurface && surfaceColor?.hex === color.hex
      );
      
      if (!isColorUsedElsewhere) {
        setSelectedColors(prev => prev.filter(c => c.hex !== color.hex));
      }
    } else {
      setAppliedColors(prev => ({
        ...prev,
        [activeSurface]: color
      }));
      
      if (!selectedColors.some(c => c.hex === color.hex)) {
        setSelectedColors(prev => [...prev, color]);
      }
    }
  };
  
  // Handle remove color
  const handleRemoveColor = (colorOrSurface) => {
    if (typeof colorOrSurface === 'string') {
      const surface = colorOrSurface;
      const colorToRemove = appliedColors[surface];
      
      if (colorToRemove) {
        setAppliedColors(prev => ({
          ...prev,
          [surface]: null
        }));
        
        const isColorUsedElsewhere = Object.entries(appliedColors).some(
          ([key, color]) => key !== surface && color?.hex === colorToRemove.hex
        );
        
        if (!isColorUsedElsewhere) {
          setSelectedColors(prev => prev.filter(c => c.hex !== colorToRemove.hex));
        }
      }
    } else {
      const colorToRemove = colorOrSurface;
      const updatedAppliedColors = { ...appliedColors };
      let colorStillUsed = false;
      
      Object.keys(updatedAppliedColors).forEach(surface => {
        if (updatedAppliedColors[surface]?.hex === colorToRemove.hex) {
          updatedAppliedColors[surface] = null;
        } else if (updatedAppliedColors[surface]) {
          colorStillUsed = true;
        }
      });
      
      setAppliedColors(updatedAppliedColors);
      
      if (!colorStillUsed) {
        setSelectedColors(prev => prev.filter(c => c.hex !== colorToRemove.hex));
      }
    }
  };
  
  // Handle search input
  const handleSearchChange = (e) => {
    setColorSearch(e.target.value);
  };
  
  // Handle color family change
  const handleFamilyChange = (e) => {
    setColorFamily(e.target.value);
  };
  
  // Handle back navigation
  const handleBackToLanding = () => {
    navigate('/room-visualization');
  };
  
  // Function to create a mask from segmentation results
  const createMaskFromSegmentation = (labelMap, dimensions, targetLabel) => {
    const { width, height } = dimensions;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Create image data from labelMap
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const label = labelMap[y][x];
        
        if (label === targetLabel) {
          // White for target pixels
          data[idx] = 255;     // R
          data[idx + 1] = 255; // G
          data[idx + 2] = 255; // B
          data[idx + 3] = 255; // A
        } else {
          // Black for non-target pixels
          data[idx] = 0;       // R
          data[idx + 1] = 0;   // G
          data[idx + 2] = 0;   // B
          data[idx + 3] = 0;   // A
        }
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  };
  
  // Function to process segmentation results
  const processSegmentationResults = (labelMap, dimensions) => {
    const masks = {};
    
    // Create masks for each surface
    // walls = label 12, ceiling = label 3, floor = label 13 in Pascal VOC
    masks.walls = createMaskFromSegmentation(labelMap, dimensions, 12);
    masks.ceiling = createMaskFromSegmentation(labelMap, dimensions, 3);
    masks.floor = createMaskFromSegmentation(labelMap, dimensions, 13);
    
    // Convert canvas masks to image objects
    const maskImages = {};
    
    Object.entries(masks).forEach(([surface, maskCanvas]) => {
      const img = new Image();
      img.onload = () => {
        maskImages[surface] = img;
        
        // Check if we've loaded all masks
        if (Object.keys(maskImages).length === Object.keys(masks).length) {
          setSurfaceMasks(maskImages);
          
          // Check if any surfaces were detected
          const detectedSurfaces = Object.entries(maskImages).filter(([_, img]) => {
            // Simple check: if mask has any non-transparent pixels
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(img, 0, 0);
            
            const imageData = tempCtx.getImageData(0, 0, img.width, img.height);
            const data = imageData.data;
            
            // Check if any pixel is non-transparent
            for (let i = 3; i < data.length; i += 4) {
              if (data[i] > 0) return true;
            }
            return false;
          });
          
          if (detectedSurfaces.length === 0) {
            setSegmentationError("No paintable surfaces detected in this image. Please upload a clearer room photo.");
          } else {
            setSegmentationError(null);
          }
          
          setIsProcessingImage(false);
        }
      };
      img.src = maskCanvas.toDataURL();
    });
  };
  
  // Load room image and masks
  useEffect(() => {
    if (selectedRoom && roomImages[selectedRoom.name]) {
      const roomData = roomImages[selectedRoom.name];
      
      // Load base image
      const baseImg = new Image();
      baseImg.crossOrigin = 'Anonymous';
      baseImg.onload = () => {
        setOriginalImage(baseImg);
        setEditedImage(baseImg);
      };
      baseImg.src = roomData.base;
      
      // Load masks
      const masks = {};
      let loadedCount = 0;
      
      Object.entries(roomData.masks).forEach(([surface, maskPath]) => {
        const maskImg = new Image();
        maskImg.crossOrigin = 'Anonymous';
        maskImg.onload = () => {
          masks[surface] = maskImg;
          loadedCount++;
          
          if (loadedCount === Object.keys(roomData.masks).length) {
            setSurfaceMasks(masks);
          }
        };
        maskImg.src = maskPath;
      });
    } else if (uploadedImage) {
      setIsProcessingImage(true);
      setSegmentationError(null);
      
      // Create a hidden image element for segmentation
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      
      img.onload = () => {
        // Set the ref to the loaded image
        segImageRef.current = img;
        setOriginalImage(img);
        setEditedImage(img);
        
        // Delay segmentation to ensure the ref is populated
        setTimeout(async () => {
          try {
            // Get segmentation data
            const segmentation = await segmentImage(segImageRef.current);
            
            // Process segmentation results to create masks
            processSegmentationResults(segmentation.labelMap, segmentation.dimensions);
          } catch (error) {
            console.error('Error during image segmentation:', error);
            setSegmentationError("Error processing image. Please try a different photo.");
            setIsProcessingImage(false);
          }
        }, 500);
      };
      
      img.onerror = () => {
        console.error('Error loading image for segmentation');
        setSegmentationError("Error loading image. Please try again.");
        setIsProcessingImage(false);
      };
      
      // Set image source
      if (uploadedImage instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          img.src = e.target.result;
        };
        reader.readAsDataURL(uploadedImage);
      } else {
        img.src = uploadedImage;
      }
    }
  }, [selectedRoom, uploadedImage]);
  
  // Apply color to selected surface using masks
  const applyColorToSurface = () => {
    if (!originalImage || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(originalImage, 0, 0);
    
    // Apply colors for all surfaces
    Object.entries(appliedColors).forEach(([surface, color]) => {
      if (!color || !surfaceMasks[surface]) return;
      
      const mask = surfaceMasks[surface];
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = originalImage.width;
      tempCanvas.height = originalImage.height;
      const tempCtx = tempCanvas.getContext('2d');
      
      tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
      console.log(`Drawing mask for ${surface}`, mask.src);
      console.log("Mask size:", mask.width, mask.height);
      console.log("Image size:", originalImage.width, originalImage.height);

      tempCtx.drawImage(mask, 0, 0);
      
      const maskData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const maskPixels = maskData.data;
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      const targetRGB = hexToRGB(color.hex); // Store selected color once

for (let i = 0; i < maskPixels.length; i += 4) {
  const mr = maskPixels[i];       // mask red
  const mg = maskPixels[i + 1];   // mask green
  const mb = maskPixels[i + 2];   // mask blue
  const ma = maskPixels[i + 3];   // mask alpha

  const isMaskPixel = (mr === 255 && mg === 255 && mb === 255 && ma === 255);

  if (isMaskPixel) {
    pixels[i]     = pixels[i]     * (1 - 0.7) + targetRGB.r * 0.7;
    pixels[i + 1] = pixels[i + 1] * (1 - 0.7) + targetRGB.g * 0.7;
    pixels[i + 2] = pixels[i + 2] * (1 - 0.7) + targetRGB.b * 0.7;
  }
}

      ctx.putImageData(imageData, 0, 0);
    });
  };
  
  // Save project functionality
  const handleSaveProject = () => {
    if (!canvasRef.current) return;
    const image = originalImage || editedImage;
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = image.width;
    tempCanvas.height = image.height;
    
    // Draw the base image
    tempCtx.drawImage(image, 0, 0);
    
    // Draw the painted regions from the main canvas
    tempCtx.drawImage(canvasRef.current, 0, 0);
    
    // Export as JPEG
    tempCanvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const roomName = selectedRoom ? selectedRoom.name : 'room';
        link.download = `calyco-${roomName}-visualization-${timestamp}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        alert('Project saved successfully!');
      }
    }, 'image/jpeg', 0.9);
  };
  
  // Apply colors when appliedColors changes
  useEffect(() => {
    if (originalImage) {
      applyColorToSurface();
    }
  }, [appliedColors, surfaceMasks]);
  
  // Render canvas
  useEffect(() => {
    const image = originalImage || editedImage;
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  }, [originalImage, editedImage]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <div className="bg-gray-200 py-2 px-4 text-center">
        <p className="text-sm text-gray-700">
          Select a photo, experiment with hundreds of colors—and create the space you've always wanted.
        </p>
      </div>
      
      {/* Navigation/Step Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <button 
              onClick={handleBackToLanding}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <FaArrowLeft className="mr-2" />
              START OVER
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">1 CHOOSE A SAMPLE</span>
              <span className="bg-white border-2 border-gray-800 px-3 py-1 rounded font-medium">
                2 SELECT COLORS
              </span>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <FaStar className="mr-2 text-yellow-500" />
            MY SAVED PROJECTS (1)
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex justify-center items-start min-h-[80vh] px-8 py-8">
        {/* Center - Room Visualization */}
        <div className="flex-1 flex flex-col items-center bg-gray-100 p-6 mx-4 my-4 rounded-xl shadow-md max-w-3xl">
          <div className="flex justify-between items-center w-full mb-4">
            <div className="flex items-center space-x-2 relative group">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedRoom ? selectedRoom.name : 'Room Visualization'}
              </h2>
              <div className="relative inline-block group">
                <FaQuestionCircle className="text-gray-400 cursor-pointer group-hover:text-indigo-600" />
                {/* Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-white shadow-lg border border-gray-300 rounded-lg p-3 w-72 text-sm text-gray-700 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <strong className="block mb-1">How to use:</strong>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Upload a room photo</li>
                    <li>AI will automatically detect walls, ceiling, and floor</li>
                    <li>Select a surface and color to apply</li>
                    <li>Save your project when finished</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {selectedColors.length > 0 && (
                <button 
                  onClick={() => {
                    setAppliedColors({
                      walls: null,
                      ceiling: null,
                      floor: null
                    });
                    setSelectedColors([]);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-600 transition-colors"
                >
                  <FaTimes className="mr-2" />
                  Remove All Colors
                </button>
              )}
              <button 
                onClick={handleSaveProject}
                className="bg-[#493657] text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaStar className="mr-2" />
                Save Project
              </button>
            </div>
          </div>
          
          {/* Surface Selection Boxes */}
          <div className="flex justify-center space-x-4 mb-4 w-full">
            {surfaces.map((surface) => {
              const surfaceColor = appliedColors[surface.id]?.hex || surface.color;
              const textColor = getContrastColor(surfaceColor);
              
              return (
                <div
                  key={surface.id}
                  className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all ${
                    activeSurface === surface.id ? 'ring-2 ring-indigo-500' : 'hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveSurface(surface.id)}
                  style={{ 
                    backgroundColor: surfaceColor,
                    color: textColor
                  }}
                >
                  <span className="text-sm font-medium">{surface.name}</span>
                  {appliedColors[surface.id] && (
                    <span className="text-xs mt-1 opacity-90">{appliedColors[surface.id].name}</span>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* AI Processing Indicator */}
          {isProcessingImage && (
            <div className="mb-4 w-full bg-blue-50 rounded-lg p-3 flex items-center justify-center">
              <div className="flex items-center text-blue-700">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                <span>AI is detecting walls, ceiling, and floor in your image...</span>
              </div>
            </div>
          )}
          
          {/* Error Message */}
          {segmentationError && (
            <div className="mb-4 w-full bg-red-50 rounded-lg p-3 flex items-center justify-center">
              <div className="flex items-center text-red-700">
                <FaInfoCircle className="mr-2" />
                <span>{segmentationError}</span>
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex justify-center w-full relative" style={{maxWidth: '600px', maxHeight: '400px', minHeight: '300px', margin: '0 auto'}}>
            {editedImage || originalImage ? (
              <canvas
                ref={canvasRef}
                className="w-full h-auto object-contain max-h-[350px] max-w-[580px]"
              />
            ) : (
              <div className="h-72 flex items-center justify-center text-gray-500 w-full">
                No image loaded
              </div>
            )}
          </div>
        </div>
        
        {/* Right Sidebar - Select a Paint Color */}
        <div className="w-80 bg-white border-l border-gray-200 p-6 mx-4 my-4 rounded-xl shadow-md">
          <div className="flex items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Select a Paint Color</h2>
            <FaQuestionCircle className="ml-2 text-gray-400" />
          </div>
          
          {/* Search Bar */}
          <div className="mb-6">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button className="px-3 py-2 text-sm text-gray-600 bg-gray-100">Search Colors</button>
              <button className="px-3 py-2 text-sm text-gray-800 bg-white border-l">Color name/number</button>
            </div>
            <input
              type="text"
              placeholder="Color name/number"
              value={colorSearch}
              onChange={handleSearchChange}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          {/* Color Families Dropdown */}
          <div className="mb-6">
            <select 
              value={colorFamily}
              onChange={handleFamilyChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {colorFamilies.map(family => (
                <option key={family} value={family}>
                  {family}
                </option>
              ))}
            </select>
          </div>
          
          {/* Color Swatch Grid */}
          <div className="overflow-y-auto max-h-[500px]">
            <div className="grid grid-cols-3 gap-1">
              {filteredColors.slice(0, 60).map((color) => (
                <div
                  key={color.hex}
                  className={`cursor-pointer overflow-hidden shadow-sm transition-transform hover:scale-105 ${
                    appliedColors[activeSurface]?.hex === color.hex ? 'ring-2 ring-indigo-500' : ''
                  }`}
                  onClick={() => handleColorSelect(color)}
                >
                  <div
                    className="h-16 w-full"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                </div>
              ))}
            </div>
            {filteredColors.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No colors found matching your search.</p>
                <p className="text-sm">Try a different search term or color family.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomVisualizer;