// src/context/ColorVisualizationContext.js
import React, { createContext, useContext, useState } from 'react';

const ColorVisualizationContext = createContext();

export const useColorVisualization = () => useContext(ColorVisualizationContext);

export const ColorVisualizationProvider = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [comparisonColors, setComparisonColors] = useState([]);
  const [roomScene, setRoomScene] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [matchedColors, setMatchedColors] = useState([]);
  const [harmonyType, setHarmonyType] = useState('complementary');

  const selectColor = (color) => {
    setSelectedColor(color);
  };

  const changeHarmonyType = (type) => {
    setHarmonyType(type);
  };

  const addToComparison = (color) => {
    if (!color || typeof color !== 'object') return;
    const colorName = String(color.name || color.calycoName || '');
    if (!comparisonColors.some(c => String(c.name || c.calycoName || '') === colorName)) {
      setComparisonColors([...comparisonColors, color]);
    }
  };

  const removeFromComparison = (colorName) => {
    setComparisonColors(comparisonColors.filter(c => c.name !== colorName));
  };

  const clearComparison = () => {
    setComparisonColors([]);
  };

  const selectRoomScene = (scene) => {
    setRoomScene(scene);
  };

  const handleImageUpload = (image) => {
    setUploadedImage(image);
    // Reset matched colors when new image is uploaded
    setMatchedColors([]);
  };

  const setMatchedColorsFromImage = (colors) => {
    setMatchedColors(colors);
  };

  return (
    <ColorVisualizationContext.Provider value={{
      selectedColor,
      harmonyType,
      comparisonColors,
      roomScene,
      uploadedImage,
      matchedColors,
      selectColor,
      changeHarmonyType,
      addToComparison,
      removeFromComparison,
      clearComparison,
      selectRoomScene,
      handleImageUpload,
      setMatchedColorsFromImage
    }}>
      {children}
    </ColorVisualizationContext.Provider>
  );
};