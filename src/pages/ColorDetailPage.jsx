import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { flatColors } from '../data/flatColors';
import { groupedShades } from '../data/groupedShades'; // top of file
import ColorCombination from '../components/ColorComponents/ColorCombination';
import SimilarColors from '../components/ColorComponents/SimilarColors';
import { BuyNowDrawer } from '../components/BuyNowDrawer';
import ShadeSelectorDrawer from '../components/ColorComponents/ShadeSelectorDrawer';
import NotFound from './NotFound'; 


// Helper function to create URL-friendly slugs

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/[^\w\-&]+/g, '')   // Remove all non-word chars EXCEPT hyphens and '&'
    .replace(/\-\-+/g, '-');     // Collapse multiple hyphens

// Function to determine text color based on background brightness
const getTextColor = (hexColor) => {
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? 'text-black' : 'text-white';
};
const ColorDetailPage = () => {
  const { familyName, colorName } = useParams();
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);
  
  // State for current color
  const [currentColor, setCurrentColor] = useState(null);
  
  // Initialize current color from URL params
  useEffect(() => {
    const decodedColorName = decodeURIComponent(colorName);
    const group = groupedShades.find(g => slugify(g.family) === familyName);
    const foundColor = group?.colors.find(c => slugify(c.name) === decodedColorName);

    if (foundColor) {
      setCurrentColor({
        ...foundColor,
        color_family: group.family, // inject full family name for shade drawer
      });
    }
  }, [familyName, colorName]);
  // If the color is not found, show a "not found" message
  if (!currentColor) {
    return (
      <NotFound/>
    )
  }
  
  // Get similar colors and combinations
  let similarColors = flatColors.filter(
    c => c.color_family === currentColor.color_family && c.name !== currentColor.name
  );
  
  if (similarColors.length === 0) {
    similarColors = flatColors.filter(
      c => (c.group === currentColor.group || c.base === currentColor.base) && c.name !== currentColor.name
    );
  }
  
  if (similarColors.length === 0) {
    similarColors = flatColors.filter(c => c.name !== currentColor.name).slice(0, 8);
  }
  
  // Get coordinating colors for combinations
  const coordinatingColors = flatColors.filter(
    c => c.color_family !== currentColor.color_family && c.name !== currentColor.name
  ).slice(0, 6);
  
  // Get other families
  const otherFamilies = [...new Set(flatColors.map(c => c.color_family))].filter(
    family => family !== currentColor.color_family
  ).slice(0, 6);
  
  const textColorClass = getTextColor(currentColor.hex);
  
  // Handle color selection from the shade drawer
  const handleColorSelect = (color) => {
    if (!color || !color.name || !color.color_family) return;
    setCurrentColor(color);
    navigate(`/colors/family/${slugify(color.color_family)}/${slugify(color.name)}`, { replace: true });
  };

  
  return (
    <div className={`min-h-screen bg-white mt-20 ${textColorClass}`}>
      {/* Section 1: Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row relative" style={{ backgroundColor: currentColor.hex }}>
        
        {/* Breadcrumb Navigation */}
        <nav className={`absolute top-12 left-12 text-sm ${textColorClass}`}>
          <span 
            onClick={() => navigate('/colors')} 
            className="cursor-pointer underline"
          >
            Paint Colors
          </span>
          <span className="mx-2">›</span>
          <span 
            onClick={() => navigate(`/colors/family/${slugify(currentColor.color_family)}`)} 
            className="cursor-pointer underline"
          >
            {currentColor.color_family}
          </span>
          <span className="mx-2">›</span>
          <span>{currentColor.name}</span>
        </nav>
        
        {/* Left Side - Image Panel */}
        <div className='px-10 pt-20 flex-1'>
          <img 
            src={currentColor.image || "https://assets.benjaminmoore.com/transform/dd0c8228-f6be-400a-bcc2-7d8a2c124de6/Violet-Paint-Living-Room-Accent-Wall-800x1000"} 
            alt="Contained" 
            className='w-full h-auto max-h-[90vh] object-contain md:mb-10'

          />
        </div>
        
        {/* Right Side - Details Panel */}
        <div className={`w-full md:w-1/2 pl-6 pr-10 pt-20 flex flex-col justify-start mb-10`}>

          {/* Color Name and Code */}
          <div className="mb-8 md:pt-16">
            <h1 className="text-3xl md:text-5xl lg:text-7xl mb-2 font-semibold">
              {currentColor.name}
            </h1>
            <p className="text-xl ">
              <span>Color Code :</span>
              {currentColor.hex}
            </p>
          </div>
          
          {/* Description */}
          <p className="mb-8 text-lg md:text-xl lg:text-2xl leading-relaxed">
            {currentColor.description || "A beautiful color from our curated collection."}
          </p>
          
          {/* Color Family */}
          <div className="mb-8 text-lg md:text-xl lg:text-2xl leading-relaxed">
            <h2 className="">Color Family</h2>
            <span 
              onClick={() => navigate(`/colors/family/${slugify(currentColor.color_family)}`)}
              className="cursor-pointer underline transition-colors"
            >
              {currentColor.color_family}
            </span>
          </div>
          {/* Extra Info Section (Collection + Download link) */}
          <div className="mt-4 mb-4 space-y-4 text-base md:text-lg">
            <hr className="border-gray-300" />
            <a 
              href="#" // Replace with actual download link
              download 
              className="underline font-medium flex items-center gap-1"
            >
              Download digital dollop of {currentColor.name}
              
            </a>
          </div>

          {/* Buy Now Button and Drawer */}
          <button
            onClick={() => setShowDrawer(true)}
            className="bg-black text-white font-semibold px-6 py-2 rounded-md mt-8 self-start"
          >
            Buy Now
          </button>
          <BuyNowDrawer
            isOpen={showDrawer}
            onClose={() => setShowDrawer(false)}
            currentColor={currentColor}
          />
        </div>
      </section>
      
      {/* Shade Selector Drawer */}
      <ShadeSelectorDrawer
        shades={familyName} 
        selectedColor={currentColor}
        onColorSelect={handleColorSelect}
      />
      
      {/* Section 2: Color Combination */}
      {similarColors.length > 0 && (
        <div className="bg-white py-16 px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl lg:text-5xl mb-8 text-black">Color Combination</h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <ColorCombination currentColor={currentColor} similarColors={similarColors} />
            </div>
            <div className="flex-1">
              <ColorCombination currentColor={currentColor} similarColors={similarColors.slice(2, 4)} />
            </div>
          </div>
        </div>
      )}
      
      {/* Section 3: Similar Colors */}
      {similarColors.length > 0 && (
        <div className="py-16 px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl lg:text-5xl mb-8 text-black">Similar Colors</h2>
          <SimilarColors currentColor={currentColor} similarColors={similarColors} />
        </div>
      )}
      
      {/* Section 4: See Other Families */}
      {/* Other families section code here */}
    </div>
  );
};
export default ColorDetailPage;