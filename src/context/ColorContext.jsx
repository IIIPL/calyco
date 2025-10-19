// src/context/ColorContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllColors } from '../data/calycoColors.js';

const flatColors = getAllColors();

const ColorContext = createContext();

export const useColors = () => useContext(ColorContext);

export const ColorProvider = ({ children }) => {
  const [colors, setColors] = useState([]);
  const [filteredColors, setFilteredColors] = useState([]);
  const [filters, setFilters] = useState({
    colorFamily: '',
    group: '',
    temperature: '',
    tonality: '',
    interiorExterior: '',
    search: ''
  });

  useEffect(() => {
    setColors(flatColors);
    setFilteredColors(flatColors);
  }, []);

  useEffect(() => {
    let result = [...colors];
    
    if (filters.colorFamily) {
      result = result.filter(color => color.color_family === filters.colorFamily);
    }
    
    if (filters.group) {
      result = result.filter(color => color.group === filters.group);
    }
    
    if (filters.temperature) {
      result = result.filter(color => color.color_temperature === filters.temperature);
    }
    
    if (filters.tonality) {
      result = result.filter(color => color.tonality === filters.tonality);
    }
    
    if (filters.interiorExterior) {
      result = result.filter(color => color.interior_or_exterior === filters.interiorExterior);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(color => 
        color.name.toLowerCase().includes(searchLower) ||
        color.description.toLowerCase().includes(searchLower) ||
        color.color_family.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredColors(result);
  }, [colors, filters]);

  const updateFilter = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      colorFamily: '',
      group: '',
      temperature: '',
      tonality: '',
      interiorExterior: '',
      search: ''
    });
  };

  const getColorByName = (name) => {
    return colors.find(color => color.name === name);
  };

  const getUniqueValues = (property) => {
    return [...new Set(colors.map(color => color[property]))].filter(Boolean);
  };

  return (
    <ColorContext.Provider value={{
      colors: filteredColors,
      allColors: colors,
      filters,
      updateFilter,
      resetFilters,
      getColorByName,
      getUniqueValues
    }}>
      {children}
    </ColorContext.Provider>
  );
};