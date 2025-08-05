// src/components/RoomVisualizer.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useColors } from '../context/ColorContext.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUpload, FaUndo, FaRedo, FaTrash, FaDownload, FaEye, FaPencilAlt, FaMagic, FaTimes, FaArrowLeft, FaArrowRight, FaInfoCircle, FaStar, FaQuestionCircle, FaPlus } from 'react-icons/fa';
import { flatColors } from '../data/flatColors';

const RoomVisualizer = () => {
  const { allColors } = useColors();
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const originalCanvasRef = useRef(null);
  const svgRef = useRef(null);
  
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
  
  // Polygon tool state - now per surface with multiple polygons
  const [showPolygons, setShowPolygons] = useState({
    walls: true,
    ceiling: false,
    floor: false
  });
  const [showPolygonBorders, setShowPolygonBorders] = useState(true);
  const [polygonState, setPolygonState] = useState({
    walls: [],
    ceiling: [],
    floor: []
  });
  const [activePolygonIndex, setActivePolygonIndex] = useState(null);
  const [activePointIndex, setActivePointIndex] = useState(null);
  const [isDraggingPolygon, setIsDraggingPolygon] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [startPoints, setStartPoints] = useState([]);
  
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
        floor: '/Assets/Rooms/DiningRoom/mask-floor.jpg'
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
  
  // Helper function to convert hex to rgba with opacity
  const hexToRgba = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
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
  
  // Add a new polygon
  // Add a new polygon
const handleAddPolygon = () => {
    const image = uploadedImage || originalImage || editedImage;
    if (!image || !image.width || !image.height || polygonState[activeSurface].length >= 5) return;
    
    const width = image.width * 0.5;
    const height = image.height * 0.4;
    const x = (image.width - width) / 2;
    const y = (image.height - height) / 2;
    const defaultPoints = [
      { x, y },
      { x: x + width, y },
      { x: x + width, y: y + height },
      { x, y: y + height },
    ];
    
    const newPolygon = {
      points: defaultPoints,
      history: [defaultPoints],
      id: `polygon-${Date.now()}`,
    };
    
    setPolygonState(prev => {
      const updatedPolygons = [...prev[activeSurface], newPolygon];
      const updatedState = {
        ...prev,
        [activeSurface]: updatedPolygons,
      };
      // ✅ Delay to ensure state update completes before setting index
      setTimeout(() => {
        setActivePolygonIndex(updatedPolygons.length - 1);
      }, 0);
      return updatedState;
    });
  };
  // Delete a polygon
  const handleDeletePolygon = (index) => {
    if (polygonState[activeSurface].length <= 1) return;
    
    setPolygonState(prev => ({
      ...prev,
      [activeSurface]: prev[activeSurface].filter((_, i) => i !== index)
    }));
    
    // Adjust active polygon index if needed
    if (activePolygonIndex === index) {
      // If we're deleting the active polygon, set to 0 or null if no polygons left
      setActivePolygonIndex(polygonState[activeSurface].length > 1 ? 0 : null);
    } else if (activePolygonIndex > index) {
      // If we're deleting a polygon before the active one, decrement the index
      setActivePolygonIndex(prev => prev - 1);
    }
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
        setOriginalImage(uploadedImage);
        setEditedImage(uploadedImage);
      }
    }
  }, [selectedRoom, uploadedImage]);
  
  // ✅ FIXED: Initialize polygons for all surfaces when any image loads (selectedRoom or uploadedImage)
  useEffect(() => {
    const image = originalImage || editedImage;
    if (!image || !image.width || !image.height) return;
    
    setPolygonState(prev => {
      const updated = { ...prev };
      const surfaces = ['walls', 'ceiling', 'floor'];
      
      for (const surface of surfaces) {
        if (!updated[surface] || updated[surface].length === 0) {
          const width = image.width * 0.6;
          const height = image.height * 0.5;
          const x = (image.width - width) / 2;
          const y = (image.height - height) / 2;
          const defaultPoints = [
            { x, y },
            { x: x + width, y },
            { x: x + width, y: y + height },
            { x, y: y + height },
          ];
          
          updated[surface] = [
            {
              points: defaultPoints,
              history: [defaultPoints],
              id: `polygon-${surface}-${Date.now()}`,
            },
          ];
        }
      }
      
      return updated;
    });
    
    setActivePolygonIndex(0);
  }, [originalImage, editedImage]);
  
  // ✅ FIXED: Ensure polygons exist for the active surface and set activePolygonIndex
  useEffect(() => {
    const image = originalImage || editedImage;
    if (!image) return;
    
    // If the active surface has no polygons, create a default one
    if (polygonState[activeSurface].length === 0) {
      const width = image.width * 0.6;
      const height = image.height * 0.5;
      const x = (image.width - width) / 2;
      const y = (image.height - height) / 2;
      const defaultPoints = [
        { x, y },
        { x: x + width, y },
        { x: x + width, y: y + height },
        { x, y: y + height },
      ];
      
      setPolygonState(prev => ({
        ...prev,
        [activeSurface]: [{
          points: defaultPoints,
          history: [defaultPoints],
          id: `polygon-${activeSurface}-${Date.now()}`
        }]
      }));
    }
    
    // Always set activePolygonIndex to 0 when switching surfaces
    setActivePolygonIndex(0);
  }, [activeSurface, originalImage, editedImage]);
  
  // Reset editing state when switching surfaces
  useEffect(() => {
    setActivePointIndex(null);
    setIsDraggingPolygon(false);
    setDragStart({ x: 0, y: 0 });
    setStartPoints([]);
  }, [activeSurface]);
  
  // Generate polygon mask
  const generatePolygonMask = (polygons, width, height) => {
    if (!width || !height || !polygons || polygons.length === 0) return null;
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Fill with black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    
    // Draw all polygons in white
    polygons.forEach(polygon => {
      if (!polygon.points || polygon.points.length === 0) return;
      
      ctx.beginPath();
      ctx.moveTo(polygon.points[0].x, polygon.points[0].y);
      for (let i = 1; i < polygon.points.length; i++) {
        ctx.lineTo(polygon.points[i].x, polygon.points[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = 'white';
      ctx.fill();
    });
    
    return canvas;
  };
  
  // Update mask when polygon changes for active surface
  useEffect(() => {
    const image = originalImage || editedImage;
    if (!image || !activeSurface || polygonState[activeSurface].length === 0) return;
    
    const polygons = polygonState[activeSurface];
    const maskCanvas = generatePolygonMask(polygons, image.width, image.height);
    
    if (maskCanvas) {
      const maskImg = new Image();
      maskImg.onload = () => {
        setSurfaceMasks(prev => ({
          ...prev,
          [activeSurface]: maskImg
        }));
      };
      maskImg.src = maskCanvas.toDataURL();
    }
  }, [polygonState, activeSurface, originalImage, editedImage]);
  
  // Check if point is inside polygon
  const isPointInPolygon = (point, polygon) => {
    if (!polygon || polygon.length === 0) return false;
    
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y;
      const xj = polygon[j].x, yj = polygon[j].y;
      
      const intersect = ((yi > point.y) !== (yj > point.y))
          && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };
  
  // Calculate distance to line segment
  const distanceToLineSegment = (point, lineStart, lineEnd) => {
    const A = point.x - lineStart.x;
    const B = point.y - lineStart.y;
    const C = lineEnd.x - lineStart.x;
    const D = lineEnd.y - lineStart.y;
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    if (lenSq !== 0) {
      param = dot / lenSq;
    }
    let xx, yy;
    if (param < 0) {
      xx = lineStart.x;
      yy = lineStart.y;
    } else if (param > 1) {
      xx = lineEnd.x;
      yy = lineEnd.y;
    } else {
      xx = lineStart.x + param * C;
      yy = lineStart.y + param * D;
    }
    const dx = point.x - xx;
    const dy = point.y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  // Handle SVG mouse down
  const handleSvgMouseDown = (e) => {
    if (!svgRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = svgRef.current.getBoundingClientRect();
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    const image = originalImage || editedImage;
    const scaleX = image.width / displayWidth;
    const scaleY = image.height / displayHeight;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    // FIXED: Check all surfaces for polygon clicks, not just active surface
    for (const [surfaceKey, surfacePolygons] of Object.entries(polygonState)) {
      if (!surfacePolygons || surfacePolygons.length === 0 || !showPolygons[surfaceKey]) continue;
      
      // Check each polygon in this surface
      for (let polygonIndex = 0; polygonIndex < surfacePolygons.length; polygonIndex++) {
        const polygon = surfacePolygons[polygonIndex];
        if (!polygon || !polygon.points || polygon.points.length === 0) continue;
        
        // Check if clicked on a vertex
        const vertexIndex = polygon.points.findIndex(p => 
          p && typeof p.x === 'number' && typeof p.y === 'number' &&
          Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2)) < 10
        );
        
        if (vertexIndex !== -1) {
          // Found a vertex, set this polygon as active
          setActiveSurface(surfaceKey);
          setActivePolygonIndex(polygonIndex);
          setActivePointIndex(vertexIndex);
          return;
        }
        
        // Check if clicked inside polygon
        if (isPointInPolygon({ x, y }, polygon.points)) {
          // Found a polygon, set it as active and start dragging
          setActiveSurface(surfaceKey);
          setActivePolygonIndex(polygonIndex);
          setIsDraggingPolygon(true);
          setDragStart({ x, y });
          setStartPoints([...polygon.points]);
          return;
        }
      }
    }
  };
  
  // Handle SVG mouse move
  const handleSvgMouseMove = (e) => {
  if (!svgRef.current || !canvasRef.current) return;

  const canvas = canvasRef.current;
  const rect = svgRef.current.getBoundingClientRect();
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;
  const image = originalImage || editedImage;
  const scaleX = image.width / displayWidth;
  const scaleY = image.height / displayHeight;

  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;

  let cursor = "default";

  // Check all visible polygons in all surfaces
  for (const [surfaceKey, surfacePolygons] of Object.entries(polygonState)) {
    if (!surfacePolygons || surfacePolygons.length === 0 || !showPolygons[surfaceKey]) continue;

    for (const polygon of surfacePolygons) {
      if (!polygon || !polygon.points || polygon.points.length === 0) continue;

      // 🔷 Check for corner (vertex)
      for (const point of polygon.points) {
        if (Math.hypot(point.x - x, point.y - y) < 10) {
          cursor = "ew-resize";
          break;
        }
      }
      if (cursor === "ew-resize") break;

      // 🔶 Check for edge (between points)
      for (let i = 0; i < polygon.points.length; i++) {
        const p1 = polygon.points[i];
        const p2 = polygon.points[(i + 1) % polygon.points.length];
        const distance = distanceToLineSegment({ x, y }, p1, p2);
        if (distance < 10) {
          cursor = "pointer";
          break;
        }
      }
      if (cursor === "pointer") break;

      // 🔘 Check if inside polygon
      if (isPointInPolygon({ x, y }, polygon.points)) {
        cursor = "move";
      }
    }

    if (cursor !== "default") break;
  }

  svgRef.current.style.cursor = cursor;

  // Early return if no active polygon
  if (activePolygonIndex === null) return;

  if (
    !polygonState[activeSurface] ||
    !polygonState[activeSurface][activePolygonIndex] ||
    !polygonState[activeSurface][activePolygonIndex].points
  ) return;

  const activePolygon = polygonState[activeSurface][activePolygonIndex];
  const points = [...activePolygon.points];

  if (activePointIndex !== null && points[activePointIndex]) {
    points[activePointIndex] = { x, y };

    setPolygonState(prev => {
      const newPolygons = [...prev[activeSurface]];
      newPolygons[activePolygonIndex] = {
        ...activePolygon,
        points,
        history: [...activePolygon.history, points]
      };
      return {
        ...prev,
        [activeSurface]: newPolygons
      };
    });
  } else if (isDraggingPolygon) {
    const dx = x - dragStart.x;
    const dy = y - dragStart.y;
    const newPoints = startPoints.map(p => ({ x: p.x + dx, y: p.y + dy }));

    setPolygonState(prev => {
      const newPolygons = [...prev[activeSurface]];
      newPolygons[activePolygonIndex] = {
        ...activePolygon,
        points: newPoints,
        history: [...activePolygon.history, newPoints]
      };
      return {
        ...prev,
        [activeSurface]: newPolygons
      };
    });
  }
};

  // Handle SVG mouse up
  const handleSvgMouseUp = () => {
    if (activePointIndex !== null || isDraggingPolygon) {
      setActivePointIndex(null);
      setIsDraggingPolygon(false);
      setDragStart({ x: 0, y: 0 });
      setStartPoints([]);
    }
  };
  
  // Handle SVG context menu (right-click)
  const handleSvgContextMenu = (e) => {
    e.preventDefault();
    if (!svgRef.current || !canvasRef.current || activePolygonIndex === null) return;
    
    // Check if the active polygon exists and has valid points
    if (!polygonState[activeSurface] || 
        !polygonState[activeSurface][activePolygonIndex] ||
        !polygonState[activeSurface][activePolygonIndex].points) return;
    
    const canvas = canvasRef.current;
    const rect = svgRef.current.getBoundingClientRect();
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    const image = originalImage || editedImage;
    const scaleX = image.width / displayWidth;
    const scaleY = image.height / displayHeight;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    // Get the active polygon
    const activePolygon = polygonState[activeSurface][activePolygonIndex];
    const points = [...activePolygon.points];
    
    // Check if right-clicked on a vertex
    const vertexIndex = points.findIndex(p => 
      p && typeof p.x === 'number' && typeof p.y === 'number' &&
      Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2)) < 10
    );
    
    if (vertexIndex !== -1) {
      // Remove vertex if polygon has more than 3 points
      if (points.length > 3) {
        const newPoints = [...points];
        newPoints.splice(vertexIndex, 1);
        
        setPolygonState(prev => {
          const newPolygons = [...prev[activeSurface]];
          newPolygons[activePolygonIndex] = {
            ...activePolygon,
            points: newPoints,
            history: [...activePolygon.history, newPoints]
          };
          
          return {
            ...prev,
            [activeSurface]: newPolygons
          };
        });
      }
      return;
    }
    
    // Check if right-clicked on an edge
    let closestEdgeIndex = -1;
    let minDistance = Infinity;
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % points.length];
      const distance = distanceToLineSegment({ x, y }, p1, p2);
      if (distance < 10 && distance < minDistance) {
        minDistance = distance;
        closestEdgeIndex = i;
      }
    }
    if (closestEdgeIndex !== -1) {
      // Add new vertex
      const newPoints = [...points];
      newPoints.splice(closestEdgeIndex + 1, 0, { x, y });
      
      setPolygonState(prev => {
        const newPolygons = [...prev[activeSurface]];
        newPolygons[activePolygonIndex] = {
          ...activePolygon,
          points: newPoints,
          history: [...activePolygon.history, newPoints]
        };
        
        return {
          ...prev,
          [activeSurface]: newPolygons
        };
      });
    }
  };
  
  // Handle polygon undo (single step)
  const handlePolygonUndo = () => {
    if (activePolygonIndex === null) return;
    
    // Check if the active polygon exists and has valid history
    if (!polygonState[activeSurface] || 
        !polygonState[activeSurface][activePolygonIndex] ||
        !polygonState[activeSurface][activePolygonIndex].history ||
        polygonState[activeSurface][activePolygonIndex].history.length <= 1) return;
    
    const activePolygon = polygonState[activeSurface][activePolygonIndex];
    const history = activePolygon.history;
    
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current state
      const prevState = newHistory[newHistory.length - 1];
      
      setPolygonState(prev => {
        const newPolygons = [...prev[activeSurface]];
        newPolygons[activePolygonIndex] = {
          ...activePolygon,
          points: prevState,
          history: newHistory
        };
        
        return {
          ...prev,
          [activeSurface]: newPolygons
        };
      });
    }
  };
  
  // Handle polygon reset (undo all changes)
  const handlePolygonReset = () => {
    if (activePolygonIndex === null) return;
    
    // Check if the active polygon exists and has valid history
    if (!polygonState[activeSurface] || 
        !polygonState[activeSurface][activePolygonIndex] ||
        !polygonState[activeSurface][activePolygonIndex].history ||
        polygonState[activeSurface][activePolygonIndex].history.length === 0) return;
    
    const activePolygon = polygonState[activeSurface][activePolygonIndex];
    const original = activePolygon.history[0];
    
    setPolygonState(prev => {
      const newPolygons = [...prev[activeSurface]];
      newPolygons[activePolygonIndex] = {
        ...activePolygon,
        points: original,
        history: [original]
      };
      
      return {
        ...prev,
        [activeSurface]: newPolygons
      };
    });
  };
  
  // Apply color to selected surface using masks
  const applyColorToSurface = () => {
    if (!originalImage || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(originalImage, 0, 0);
    
    // Only apply color for the active surface
    const color = appliedColors[activeSurface];
    const mask = surfaceMasks[activeSurface];
    
    if (color && mask) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = originalImage.width;
      tempCanvas.height = originalImage.height;
      const tempCtx = tempCanvas.getContext('2d');
      
      tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
      tempCtx.drawImage(mask, 0, 0);
      
      const maskData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const maskPixels = maskData.data;
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      const { r, g, b } = hexToRGB(color.hex);
      
      for (let i = 0; i < maskPixels.length; i += 4) {
        const alpha = maskPixels[i + 3];
        let isMaskPixel = false;
        let blendAmount = 0.7;
        
        if (alpha < 255) {
          isMaskPixel = alpha > 128;
          blendAmount = alpha / 255 * 0.7;
        } else {
          isMaskPixel = maskPixels[i] > 200 && 
                        maskPixels[i + 1] > 200 && 
                        maskPixels[i + 2] > 200;
        }
        
        if (isMaskPixel) {
          pixels[i] = pixels[i] * (1 - blendAmount) + r * blendAmount;
          pixels[i + 1] = pixels[i + 1] * (1 - blendAmount) + g * blendAmount;
          pixels[i + 2] = pixels[i + 2] * (1 - blendAmount) + b * blendAmount;
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
    }
  };
  
  // Save project functionality
  const handleSaveProject = () => {
    if (!canvasRef.current) return;
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    const image = originalImage || editedImage;
    tempCanvas.width = image.width;
    tempCanvas.height = image.height;
    
    tempCtx.drawImage(image, 0, 0);
    
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
  }, [appliedColors, activeSurface, surfaceMasks]);
  
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
  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Delete" && activeSurface && activePolygonIndex !== null) {
      setPolygonState((prev) => {
        const polygons = [...prev[activeSurface]];
        if (polygons.length <= 1) return prev; // Don't delete if it's the only polygon

        polygons.splice(activePolygonIndex, 1);

        return {
          ...prev,
          [activeSurface]: polygons,
        };
      });

      // Adjust selected polygon index
      setActivePolygonIndex((prevIndex) => {
        if (prevIndex === null) return null;
        return Math.max(0, prevIndex - 1);
      });
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [activePolygonIndex, activeSurface]);


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

              {/* Question Icon */}
                <div className="relative inline-block group">
                  <FaQuestionCircle className="text-gray-400 cursor-pointer group-hover:text-indigo-600" />

                  {/* Tooltip */}
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-white shadow-lg border border-gray-300 rounded-lg p-3 w-72 text-sm text-gray-700 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <strong className="block mb-1">How to use:</strong>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Click “Add Polygon” to draw a wall region</li>
                      <li>Adjust corners or move shape</li>
                      <li>Select a color and apply</li>
                      <li>Right-click to add/remove corners</li>
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
          
          {/* Polygon Tool Controls (only for uploaded images) */}
          {uploadedImage && activeSurface && (
            <div className="flex flex-wrap gap-2 mb-4 w-full justify-center">
              <button 
                onClick={() => setShowPolygons(prev => ({
                  ...prev,
                  [activeSurface]: !prev[activeSurface]
                }))}
                className="bg-gray-200 px-3 py-1 rounded flex items-center"
              >
                {showPolygons[activeSurface] ? 'Hide Polygon' : 'Show Polygon'}
              </button>
              
              {showPolygons[activeSurface] && (
                <button 
                  onClick={() => setShowPolygonBorders(!showPolygonBorders)}
                  className="bg-gray-200 px-3 py-1 rounded flex items-center"
                >
                  {showPolygonBorders ? 'Hide Borders' : 'Show Borders'}
                </button>
              )}
              
              {showPolygons[activeSurface] && (
                <button 
                  onClick={handleAddPolygon}
                  disabled={!uploadedImage || polygonState[activeSurface].length >= 5}
                  className={`px-3 py-1 rounded flex items-center ${!uploadedImage || polygonState[activeSurface].length >= 5 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200'}`}
                >
                  <FaPlus className="mr-1" /> Add Polygon
                </button>
              )}
              
              {showPolygons[activeSurface] && (
                <button 
                  onClick={handlePolygonUndo}
                  disabled={
                    activePolygonIndex === null || 
                    !polygonState[activeSurface][activePolygonIndex] ||
                    !polygonState[activeSurface][activePolygonIndex].history ||
                    polygonState[activeSurface][activePolygonIndex].history.length <= 1
                  }
                  className={`px-3 py-1 rounded flex items-center ${
                    activePolygonIndex === null || 
                    !polygonState[activeSurface][activePolygonIndex] ||
                    !polygonState[activeSurface][activePolygonIndex].history ||
                    polygonState[activeSurface][activePolygonIndex].history.length <= 1 
                      ? 'bg-gray-100 text-gray-400' : 'bg-gray-200'
                  }`}
                >
                  <FaUndo className="mr-1" /> Undo
                </button>
              )}
              
              {showPolygons[activeSurface] && (
                <button 
                  onClick={handlePolygonReset}
                  disabled={
                    activePolygonIndex === null || 
                    !polygonState[activeSurface][activePolygonIndex] ||
                    !polygonState[activeSurface][activePolygonIndex].history ||
                    polygonState[activeSurface][activePolygonIndex].history.length <= 1
                  }
                  className={`px-3 py-1 rounded flex items-center ${
                    activePolygonIndex === null || 
                    !polygonState[activeSurface][activePolygonIndex] ||
                    !polygonState[activeSurface][activePolygonIndex].history ||
                    polygonState[activeSurface][activePolygonIndex].history.length <= 1 
                      ? 'bg-gray-100 text-gray-400' : 'bg-gray-200'
                  }`}
                >
                  <FaRedo className="mr-1" /> Reset
                </button>
              )}
            </div>
          )}
          
          {/* Polygon List (only for uploaded images) */}
          {showPolygons[activeSurface] && uploadedImage && activeSurface && polygonState[activeSurface].length > 1 && (
            <div className="flex flex-wrap gap-2 mb-4 w-full justify-center">
              {polygonState[activeSurface].map((polygon, index) => (
                <div 
                  key={polygon.id}
                  className={`flex items-center px-3 py-1 rounded cursor-pointer ${
                    activePolygonIndex === index ? 'bg-indigo-500 text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => setActivePolygonIndex(index)}
                >
                  <span>Polygon {index + 1}</span>
                  {polygonState[activeSurface].length > 1 && (
                    <button 
                      className="ml-2 text-red-500 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePolygon(index);
                      }}
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex justify-center w-full relative" style={{maxWidth: '600px', maxHeight: '400px', minHeight: '300px', margin: '0 auto'}}>
            {editedImage || originalImage ? (
              <>
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto object-contain max-h-[350px] max-w-[580px]"
                />
                {uploadedImage && (
                  <svg 
                    ref={svgRef}
                    className="absolute top-0 left-0 w-full h-full pointer-events-auto"
                    viewBox={`0 0 ${(editedImage || originalImage).width} ${(editedImage || originalImage).height}`}
                    onMouseDown={handleSvgMouseDown}
                    onMouseMove={handleSvgMouseMove}
                    onMouseUp={handleSvgMouseUp}
                    onMouseLeave={handleSvgMouseUp}
                    onContextMenu={handleSvgContextMenu}
                  >
                    {/* FIXED: Render polygons only for visible surfaces with consistent opacity */}
                    {Object.entries(polygonState).map(([surfaceKey, surfacePolygons]) => {
                      // Skip if this surface has no polygons or if it's not visible
                      if (!surfacePolygons || surfacePolygons.length === 0 || !showPolygons[surfaceKey]) return null;
                      
                      const isSurfaceActive = surfaceKey === activeSurface;
                      // Fixed opacity for all visible polygons
                      const dimOpacity = 0.3;
                      
                      return surfacePolygons.map((polygon, polygonIndex) => {
                        // Skip rendering if polygon or points are invalid
                        if (!polygon || !polygon.points || polygon.points.length === 0) {
                          return null;
                        }
                        
                        // Check if all points have valid numeric coordinates
                        const validPoints = polygon.points.every(
                          p => p && typeof p.x === 'number' && typeof p.y === 'number' && 
                                !isNaN(p.x) && !isNaN(p.y)
                        );
                        
                        if (!validPoints) {
                          return null;
                        }
                        
                        const isPolygonActive = isSurfaceActive && polygonIndex === activePolygonIndex;
                        
                        return (
                          <g key={`${surfaceKey}-${polygon.id}`}>
                            {/* Polygon */}
                            <polygon 
                              points={polygon.points.map(p => `${p.x},${p.y}`).join(' ')}
                              fill={
                                appliedColors[surfaceKey]?.hex
                                  ? hexToRgba(appliedColors[surfaceKey].hex, dimOpacity)
                                  : surfaceKey === 'walls' 
                                    ? 'rgba(255,0,0,0.3)' 
                                    : surfaceKey === 'ceiling' 
                                      ? 'rgba(0,255,0,0.3)' 
                                      : 'rgba(0,0,255,0.3)'
                              }
                              stroke={showPolygonBorders && isPolygonActive ? 'red' : 'none'}
                              strokeWidth="2"
                            />
                            {/* Vertex handles - only for active polygon of active surface */}
                            {showPolygonBorders && isPolygonActive && polygon.points.map((point, index) => (
                              // Only render circle if point has valid coordinates
                              point && typeof point.x === 'number' && typeof point.y === 'number' && 
                              !isNaN(point.x) && !isNaN(point.y) && (
                                <circle 
                                  key={index}
                                  cx={point.x}
                                  cy={point.y}
                                  r="6"
                                  fill="white"
                                  stroke="red"
                                  strokeWidth="2"
                                  className="cursor-move"
                                />
                              )
                            ))}
                          </g>
                        );
                      });
                    })}
                  </svg>
                )}
              </>
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