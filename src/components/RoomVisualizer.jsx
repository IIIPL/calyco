// src/components/RoomVisualizer.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useColors } from '../context/ColorContext.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUpload, FaUndo, FaRedo, FaTrash, FaDownload, FaEye, FaPencilAlt, FaMagic, FaTimes, FaArrowLeft, FaArrowRight, FaInfoCircle, FaStar, FaQuestionCircle } from 'react-icons/fa';
import { flatColors } from '../data/flatColors';

const RoomVisualizer = () => {
  const { allColors } = useColors();
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const originalCanvasRef = useRef(null);
  
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
  const [currentStep, setCurrentStep] = useState(2);
  const [surfaceMasks, setSurfaceMasks] = useState({});
  
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
        walls: '/Assets/Rooms/DiningRoom/mask-walls.png',
        ceiling: '/Assets/Rooms/DiningRoom/mask-ceiling.png',
        floor: '/Assets/Rooms/DiningRoom/mask-floor.png'
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
  const colorFamilies = ['All', 'WHITES & OFF WHITES', 'GREYS', 'BROWNS', 'BLUES', 'GREENS', 'YELLOWS & GREENS', 'Corals and Terracottas'];
  
  // Helper function to determine text color based on background
  const getContrastColor = (hex) => {
    // Simple luminance check (perceived brightness)
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
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
    
    // If clicking the same color, deselect only from active surface
    if (currentSurfaceColor?.hex === color.hex) {
      setAppliedColors(prev => ({
        ...prev,
        [activeSurface]: null
      }));
      
      // Check if color is used on any other surface before removing from selectedColors
      const isColorUsedElsewhere = Object.entries(appliedColors).some(
        ([key, surfaceColor]) => key !== activeSurface && surfaceColor?.hex === color.hex
      );
      
      if (!isColorUsedElsewhere) {
        setSelectedColors(prev => prev.filter(c => c.hex !== color.hex));
      }
    } else {
      // Apply color to active surface
      setAppliedColors(prev => ({
        ...prev,
        [activeSurface]: color
      }));
      
      // Add to selected colors array if not already present
      if (!selectedColors.some(c => c.hex === color.hex)) {
        setSelectedColors(prev => [...prev, color]);
      }
    }
  };
  
  // Handle remove color
  const handleRemoveColor = (colorOrSurface) => {
    if (typeof colorOrSurface === 'string') {
      // It's a surface ID
      const surface = colorOrSurface;
      const colorToRemove = appliedColors[surface];
      
      if (colorToRemove) {
        setAppliedColors(prev => ({
          ...prev,
          [surface]: null
        }));
        
        // Check if color is used on any other surface
        const isColorUsedElsewhere = Object.entries(appliedColors).some(
          ([key, color]) => key !== surface && color?.hex === colorToRemove.hex
        );
        
        if (!isColorUsedElsewhere) {
          setSelectedColors(prev => prev.filter(c => c.hex !== colorToRemove.hex));
        }
      }
    } else {
      // It's a color object
      const colorToRemove = colorOrSurface;
      
      // Find all surfaces using this color and remove it
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
      
      // Remove from selectedColors only if not used anywhere
      if (!colorStillUsed) {
        setSelectedColors(prev => prev.filter(c => c.hex !== colorToRemove.hex));
      }
    }
  };
  
  // Handle search input
  const handleSearchChange = (e) => {
    setColorSearch(e.target.value);
    console.log('Search term:', e.target.value);
  };
  
  // Handle color family change
  const handleFamilyChange = (e) => {
    setColorFamily(e.target.value);
    console.log('Color family:', e.target.value);
  };
  
  // Handle back navigation
  const handleBackToLanding = () => {
    navigate('/room-visualization');
  };
  
  // Debug: Log current state
  useEffect(() => {
    console.log('Current state:', {
      colorSearch,
      colorFamily,
      selectedColors,
      activeSurface,
      appliedColors,
      filteredColorsCount: filteredColors.length
    });
  }, [colorSearch, colorFamily, selectedColors, activeSurface, appliedColors, filteredColors.length]);
  
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
          
          // When all masks are loaded, update state
          if (loadedCount === Object.keys(roomData.masks).length) {
            setSurfaceMasks(masks);
          }
        };
        maskImg.src = maskPath;
      });
    } else if (uploadedImage) {
      // Handle uploaded file - convert File to Image
      if (uploadedImage instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            setOriginalImage(img);
            setEditedImage(img);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(uploadedImage);
      } else {
        // If it's already an Image object
        setOriginalImage(uploadedImage);
        setEditedImage(uploadedImage);
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
    
    // Always start with the original image
    ctx.drawImage(originalImage, 0, 0);
    
    // If we have masks, use them for precise application
    if (Object.keys(surfaceMasks).length > 0) {
      // Create a temporary canvas for each mask
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = originalImage.width;
      tempCanvas.height = originalImage.height;
      const tempCtx = tempCanvas.getContext('2d');
      
      // Apply colors using masks
      Object.entries(appliedColors).forEach(([surface, color]) => {
        if (color && surfaceMasks[surface]) {
          // Draw the mask on the temporary canvas
          tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
          tempCtx.drawImage(surfaceMasks[surface], 0, 0);
          
          // Get mask pixel data
          const maskData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
          const maskPixels = maskData.data;
          
          // Get the current canvas image data
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const pixels = imageData.data;
          
          // Get the RGB values for the selected color
          const colorRGB = hexToRGB(color.hex);
          
          // Apply color to pixels where mask is white/visible
          for (let i = 0; i < maskPixels.length; i += 4) {
            // Check if mask pixel is visible (alpha > 128 or RGB close to white)
            if (maskPixels[i + 3] > 128 || 
                (maskPixels[i] > 200 && maskPixels[i + 1] > 200 && maskPixels[i + 2] > 200)) {
              // Apply color using multiply blending
              pixels[i] = pixels[i] * colorRGB.r / 255;     // Red
              pixels[i + 1] = pixels[i + 1] * colorRGB.g / 255; // Green
              pixels[i + 2] = pixels[i + 2] * colorRGB.b / 255; // Blue
              // Alpha remains unchanged
            }
          }
          
          // Put the modified image data back to canvas
          ctx.putImageData(imageData, 0, 0);
        }
      });
    } else {
      // Fallback to rectangular regions if no masks are available
      Object.entries(appliedColors).forEach(([surface, color]) => {
        if (color) {
          // Use the old rectangular method for surfaces without masks
          let area;
          switch (surface) {
            case 'walls':
              area = { x: 0, y: 0, width: canvas.width, height: canvas.height * 0.7 };
              break;
            case 'ceiling':
              area = { x: 0, y: 0, width: canvas.width, height: canvas.height * 0.1 };
              break;
            case 'floor':
              area = { x: 0, y: canvas.height * 0.7, width: canvas.width, height: canvas.height * 0.3 };
              break;
            default:
              area = { x: 0, y: 0, width: canvas.width, height: canvas.height };
          }
          
          ctx.globalCompositeOperation = 'multiply';
          ctx.fillStyle = color.hex;
          ctx.fillRect(area.x, area.y, area.width, area.height);
          ctx.globalCompositeOperation = 'source-over';
        }
      });
    }
    
    // Update the edited image
    const newImage = new Image();
    newImage.onload = () => {
      setEditedImage(newImage);
    };
    newImage.src = canvas.toDataURL();
  };
  
  // Save project functionality
  const handleSaveProject = () => {
    if (!canvasRef.current) return;
    // Create a temporary canvas to draw the final image with all overlays
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    // Set canvas size
    tempCanvas.width = editedImage.width;
    tempCanvas.height = editedImage.height;
    
    // Draw the edited image (which includes all color overlays)
    tempCtx.drawImage(editedImage, 0, 0);
    
    // Convert to blob and download
    tempCanvas.toBlob((blob) => {
      if (blob) {
        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Generate filename with timestamp
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const roomName = selectedRoom ? selectedRoom.name : 'room';
        link.download = `calyco-${roomName}-visualization-${timestamp}.jpg`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // Show success message (optional)
        alert('Project saved successfully!');
      }
    }, 'image/jpeg', 0.9); // 0.9 quality for good file size
  };
  
  // Apply colors when appliedColors changes
  useEffect(() => {
    if (originalImage) {
      applyColorToSurface();
    }
  }, [appliedColors, activeSurface, surfaceMasks]);
  
  // Render canvas
  useEffect(() => {
    if (!editedImage || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = editedImage.width;
    canvas.height = editedImage.height;
    ctx.drawImage(editedImage, 0, 0);
  }, [editedImage]);
  
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
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedRoom ? selectedRoom.name : 'Room Visualization'}
            </h2>
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
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex justify-center w-full" style={{maxWidth: '600px', maxHeight: '400px', minHeight: '300px', margin: '0 auto'}}>
            {editedImage ? (
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