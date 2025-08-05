// src/components/ColorComponents/ColorPalette.jsx
import React from 'react';
import ColorSwatch from './ColorSwatch';
import { getComplementaryColor, getAnalogousColors, getTriadicColors } from '../../utils/colorutils';

const ColorPalette = ({ baseColor, paletteType = 'complementary' }) => {
  if (!baseColor) return null;

  let paletteColors = [];

  switch (paletteType) {
    case 'complementary':
      paletteColors = [baseColor, { ...baseColor, hex: getComplementaryColor(baseColor.hex), name: `${baseColor.name} Complement` }];
      break;
    case 'analogous': {
      const analogous = getAnalogousColors(baseColor.hex);
      paletteColors = [
        baseColor,
        { ...baseColor, hex: analogous[0], name: `${baseColor.name} Analogous 1` },
        { ...baseColor, hex: analogous[1], name: `${baseColor.name} Analogous 2` }
      ];
      break;
    }
    case 'triadic': {
      const triadic = getTriadicColors(baseColor.hex);
      paletteColors = [
        baseColor,
        { ...baseColor, hex: triadic[0], name: `${baseColor.name} Triadic 1` },
        { ...baseColor, hex: triadic[1], name: `${baseColor.name} Triadic 2` }
      ];
      break;
    }
    default:
      paletteColors = [baseColor];
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 capitalize">{paletteType} Palette</h3>
      <div className="flex flex-wrap gap-4">
        {paletteColors.map((color, index) => (
          <ColorSwatch 
            key={index} 
            color={color} 
            size="medium" 
            showName={true} 
            showHex={true} 
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;