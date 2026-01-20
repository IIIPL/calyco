// src/components/RoomVisualizer.jsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUpload, FaTrash, FaDownload, FaTimes, FaArrowLeft, FaInfoCircle, FaStar, FaQuestionCircle } from 'react-icons/fa';
import { calycoColors, getAllColors } from '../data/calycoColors.js';

const flatColors = getAllColors();
import { reverseColorNameMapping } from '../data/colorNameMapping';
import { segmentImage } from '../utils/segmentation.js';

const RoomVisualizer = () => {
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
      base: '/Assets/Rooms/Bedroom/base.webp',
      masks: {
        walls: '/Assets/Rooms/Bedroom/mask-walls.webp',
        // ceiling: '/Assets/Rooms/Bedroom/mask-ceiling.webp',
        // floor: '/Assets/Rooms/Bedroom/mask-floor.webp'
      }
    },
    'Living Room': {
      base: '/Assets/Rooms/LivingRoom/base.webp',
      masks: {
        walls: '/Assets/Rooms/LivingRoom/mask-walls.webp',
        ceiling: '/Assets/Rooms/LivingRoom/mask-ceiling.webp',
        // floor: '/Assets/Rooms/LivingRoom/mask-floor.webp'
      }
    },
    'Dining Room': {
      base: '/Assets/Rooms/DiningRoom/base.webp',
      masks: {
        walls: '/Assets/Rooms/DiningRoom/mask-walls.webp',
        ceiling: '/Assets/Rooms/DiningRoom/mask-ceiling.webp',
        // floor: '/Assets/Rooms/DiningRoom/mask-wainscoting.webp'
      }
    }
  };
  
  // Surface options
  const surfaces = [
    { id: 'walls', name: 'WALLS', color: '#E5E7EB' },
    { id: 'ceiling', name: 'CEILING', color: '#F3F4F6' },
    { id: 'floor', name: 'FLOOR', color: '#F9FAFB' }
  ];
  
  // Color family groupings displayed in the dropdown
  const colorFamilyOptions = [
    { label: 'All', families: null },
    { label: 'Whites & Off-Whites', families: ['Whites'] },
    { label: 'Yellows & Golds', families: ['Yellows & Golds'] },
    { label: 'Oranges', families: ['Oranges'] },
    { label: 'Reds & Pinks', families: ['Reds & Pinks'] },
    { label: 'Purples & Violets', families: ['Purples & Violets'] },
    { label: 'Blues', families: ['Blues'] },
    { label: 'Blue Greens', families: ['Blues', 'Greens'] },
    { label: 'Greens', families: ['Greens'] },
    { label: 'Yellow Greens', families: ['Greens', 'Yellows & Golds'] },
    { label: 'Neutrals - Browns, Greys', families: ['Earth Tones', 'Grays', 'Blacks & Deep Tones'] },
    { label: 'Specialty Metallics', families: ['Specialty Metallics'] },
    { label: 'Beiges & Tans', families: ['Beiges & Tans'] },
  ];
  
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

  // Some colors in data store use codes (e.g., "SI9366"). Convert to real hex.
  const getActualHexColor = (value) => {
    if (!value) return '#CCCCCC';
    return value.startsWith('#') ? value : (reverseColorNameMapping[value] || '#CCCCCC');
  };

  // Format a color name for display
  const formatColorName = (name = '') => {
    const title = name.toString().toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    // Common corrections (display-only)
    return title
      .replace(/Chasik Creem/gi, 'Classic Cream')
      .replace(/Charck Beige/gi, 'Chalk Beige');
  };
  
  // Build lookup by color family preserving curated ordering in calycoColors data
  const colorsByFamily = useMemo(() => {
    const map = {};
    calycoColors.forEach((familyEntry) => {
      const familyName = familyEntry.family;
      map[familyName] = (familyEntry.colors || []).map((color) => ({
        ...color,
        colorFamily: color.colorFamily || familyName,
        color_family: color.colorFamily || familyName,
        hex: color.hex || color.hexCode || '#CCCCCC',
        actualHex: color.actualHex || color.hex || color.hexCode,
      }));
    });
    return map;
  }, []);

  // Determine the base list of colors based on the selected family
  const familyColors = useMemo(() => {
    const selectedOption = colorFamilyOptions.find((option) => option.label === colorFamily);
    if (!selectedOption || !selectedOption.families) {
      return flatColors;
    }

    const uniqueColors = new Map();
    selectedOption.families.forEach((familyName) => {
      const familyList = colorsByFamily[familyName] || [];
      familyList.forEach((color) => {
        const key = color.code || color.ralCode || color.slug || color.name || color.hex;
        if (!uniqueColors.has(key)) {
          uniqueColors.set(key, color);
        }
      });
    });

    return Array.from(uniqueColors.values());
  }, [colorFamily, colorFamilyOptions, colorsByFamily]);

  // Filter colors based on search term (family already applied)
  const filteredColors = useMemo(() => {
    const searchTerm = colorSearch.toLowerCase().trim();
    if (!searchTerm) {
      return familyColors;
    }

    return familyColors.filter((color) => {
      const family = color.colorFamily || color.color_family || '';
      return (
        color.name?.toLowerCase().includes(searchTerm) ||
        color.hex?.toLowerCase().includes(searchTerm) ||
        family.toLowerCase().includes(searchTerm)
      );
    });
  }, [familyColors, colorSearch]);

  // Handle color selection
  const handleColorSelect = (color) => {
    const normalizedColor = { ...color, actualHex: getActualHexColor(color.hex) };
    const currentSurfaceColor = appliedColors[activeSurface];
    
    if ((currentSurfaceColor?.actualHex || currentSurfaceColor?.hex) === normalizedColor.actualHex) {
      setAppliedColors(prev => ({
        ...prev,
        [activeSurface]: null
      }));
      
      const isColorUsedElsewhere = Object.entries(appliedColors).some(
        ([key, surfaceColor]) => key !== activeSurface && (surfaceColor?.actualHex || surfaceColor?.hex) === normalizedColor.actualHex
      );
      
      if (!isColorUsedElsewhere) {
        setSelectedColors(prev => prev.filter(c => (c.actualHex || c.hex) !== normalizedColor.actualHex));
      }
    } else {
      setAppliedColors(prev => ({
        ...prev,
        [activeSurface]: normalizedColor
      }));
      
      if (!selectedColors.some(c => (c.actualHex || c.hex) === normalizedColor.actualHex)) {
        setSelectedColors(prev => [...prev, normalizedColor]);
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
          ([key, color]) => key !== surface && (color?.actualHex || color?.hex) === (colorToRemove.actualHex || colorToRemove.hex)
        );
        
        if (!isColorUsedElsewhere) {
          setSelectedColors(prev => prev.filter(c => (c.actualHex || c.hex) !== (colorToRemove.actualHex || colorToRemove.hex)));
        }
      }
    } else {
      const colorToRemove = colorOrSurface;
      const updatedAppliedColors = { ...appliedColors };
      let colorStillUsed = false;
      
      Object.keys(updatedAppliedColors).forEach(surface => {
        if ((updatedAppliedColors[surface]?.actualHex || updatedAppliedColors[surface]?.hex) === (colorToRemove.actualHex || colorToRemove.hex)) {
          updatedAppliedColors[surface] = null;
        } else if (updatedAppliedColors[surface]) {
          colorStillUsed = true;
        }
      });
      
      setAppliedColors(updatedAppliedColors);
      
      if (!colorStillUsed) {
        setSelectedColors(prev => prev.filter(c => (c.actualHex || c.hex) !== (colorToRemove.actualHex || colorToRemove.hex)));
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
  
  
  
  // Function to create a mask from segmentation results
  // Accepts either a 2D label map [h][w] or a flat array [h*w]
  // targetLabels can be a single number or an array of label ids to merge
  const createMaskFromSegmentation = (labelMap, dimensions, targetLabels) => {
    const { width, height } = dimensions;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Create image data from labelMap
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    const is2D = Array.isArray(labelMap[0]);
    const targets = Array.isArray(targetLabels) ? new Set(targetLabels) : new Set([targetLabels]);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const label = is2D ? labelMap[y][x] : labelMap[y * width + x];
        
        if (targets.has(label)) {
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
    // ADE20K: wall=12, ceiling=3, floor=9. Some models map floor to 13 → support both.
    masks.walls = createMaskFromSegmentation(labelMap, dimensions, [12]);
    masks.ceiling = createMaskFromSegmentation(labelMap, dimensions, [3]);
    masks.floor = createMaskFromSegmentation(labelMap, dimensions, [9, 13]);
    
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
      
      const targetRGB = hexToRGB(color.actualHex || color.hex); // Use normalized hex

    for (let i = 0; i < maskPixels.length; i += 4) {
      const mr = maskPixels[i];       // mask red
      const mg = maskPixels[i + 1];   // mask green
      const mb = maskPixels[i + 2];   // mask blue
      const ma = maskPixels[i + 3];   // mask alpha

      const isMaskPixel = (mr === 255 && mg === 255 && mb === 255 && ma === 255);

      if (isMaskPixel) {
        const strength = 0.90; // Increase this up to 0.95 if you want even deeper color

        pixels[i]     = pixels[i]     * (1 - strength) + targetRGB.r * strength;
        pixels[i + 1] = pixels[i + 1] * (1 - strength) + targetRGB.g * strength;
        pixels[i + 2] = pixels[i + 2] * (1 - strength) + targetRGB.b * strength;

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
    <div className="min-h-screen bg-gray-100 pt-20 sm:pt-24 lg:pt-24">
      {/* Top Header */}
      
      
      
      {/* Main Content */}
      <div className="container mx-auto flex flex-col lg:flex-row items-start gap-4 sm:gap-6 lg:gap-8 min-h-[80vh] px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">
        {/* Center - Room Visualization */}
        <div className="flex-1 w-full bg-gray-100 p-4 sm:p-6 mx-0 lg:mx-4 my-4 rounded-xl shadow-md max-w-full lg:max-w-4xl xl:max-w-[920px]">
          <div className="flex flex-wrap justify-between items-center w-full mb-4 gap-3">
            <div className="flex items-center space-x-2 relative group focus:ring-2 focus:ring-indigo-500 focus:outline-none">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                {selectedRoom ? selectedRoom.name : 'Room Visualization'}
              </h2>
              <div className="relative inline-block group">
                <FaQuestionCircle className="text-gray-400 cursor-pointer group-hover:text-indigo-600" />
                {/* Tooltip */}
                <div className="absolute sm:left-full sm:ml-3 left-1/2 -translate-x-1/2 sm:translate-x-0 bottom-full sm:bottom-auto mb-2 sm:mb-0 bg-white shadow-lg border border-gray-300 rounded-lg p-3 w-72 text-sm text-gray-700 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
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
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-600 transition-colors min-w-[140px] text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <FaTimes className="mr-2" />
                  Remove All Colors
                </button>
              )}
              <button 
                onClick={handleSaveProject}
                className="bg-[#493657] text-white px-4 py-2 rounded-lg flex items-center min-w-[140px] text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <FaStar className="mr-2" />
                Save Project
              </button>
            </div>
          </div>
          {/* Surface Selection Boxes */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 w-full">
            {surfaces.map((surface) => {
              const hasMask = surfaceMasks[surface.id];
              if (!hasMask) return null; // 🚫 Skip button if no mask
              const surfaceColor = (appliedColors[surface.id]?.actualHex || appliedColors[surface.id]?.hex || surface.color);
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
                    color: textColor,
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Select ${surface.name}`}
                  onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') setActiveSurface(surface.id); }}
                >
                  <span className="text-[11px] sm:text-xs md:text-sm font-semibold drop-shadow-sm">{surface.name}</span>
                  {appliedColors[surface.id] && (
                    <span
                      className="mt-1 text-[10px] sm:text-xs px-2 py-0.5 rounded-md shadow-sm border border-black/5"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.92)',
                        color: '#111827'
                      }}
                    >
                      {formatColorName(appliedColors[surface.id].name)}
                    </span>
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
          <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-full mx-auto relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]">
            {editedImage || originalImage ? (
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="h-72 flex items-center justify-center text-gray-500 w-full">
                No image loaded
              </div>
            )}
          </div>
        </div>
        {/* Right Sidebar - Select a Paint Color */}
        <div className="w-full lg:w-80 bg-white border border-gray-200 p-4 sm:p-6 mx-0 lg:mx-4 my-4 rounded-xl shadow-md lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Select a Paint Color</h2>
          </div>
          {/* Color Families Dropdown */}
          <div className="mb-6">
            <select 
              value={colorFamily}
              onChange={handleFamilyChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {colorFamilyOptions.map(option => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/* Color Swatch Grid */}
          <div className="overflow-y-auto max-h-[50vh] sm:max-h-[60vh] lg:max-h-[calc(100vh-14rem)]">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-3 gap-1 sm:gap-1.5">
              {filteredColors.slice(0, 60).map((color) => (
                <div
                  key={`${color.code || color.ralCode || color.slug || color.name || ''}-${getActualHexColor(color.hex)}`}
                  className={`cursor-pointer overflow-hidden shadow-sm transition-transform hover:scale-105 ${
                    (appliedColors[activeSurface]?.actualHex || appliedColors[activeSurface]?.hex) === getActualHexColor(color.hex) ? 'ring-2 ring-indigo-500' : ''
                  }`}
                  onClick={() => handleColorSelect(color)}
                >
                  <div
                    className="h-14 sm:h-16 md:h-16 lg:h-16 w-full"
                    style={{ backgroundColor: getActualHexColor(color.hex) }}
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
