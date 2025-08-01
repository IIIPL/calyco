import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { flatColors } from '../data/flatColors';

// Helper function to create URL-friendly slugs
const slugify = (text) => {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

const ColorDetailPage = () => {
  const { familyName, colorName } = useParams();
  const navigate = useNavigate();

  const decodedColorName = decodeURIComponent(colorName);
  const currentColor = flatColors.find(c => c.name.toLowerCase() === decodedColorName.toLowerCase());

  if (!currentColor) {
    return <div className="p-20 text-center text-black">Color not found.</div>;
  }

  // Get similar colors - try multiple approaches to ensure we have colors to show
  let similarColors = flatColors.filter(
    c => c.color_family === currentColor.color_family && c.name !== currentColor.name
  );
  
  // If no colors from same family, get colors from same group or base
  if (similarColors.length === 0) {
    similarColors = flatColors.filter(
      c => (c.group === currentColor.group || c.base === currentColor.base) && c.name !== currentColor.name
    );
  }
  
  // If still no colors, just get any other colors
  if (similarColors.length === 0) {
    similarColors = flatColors.filter(c => c.name !== currentColor.name).slice(0, 8);
  }

  const goBack = () => navigate(`/colors/family/${familyName}`);

  return (
    <div className="min-h-screen" style={{ backgroundColor: currentColor.hex }}>


      {/* Main Content Container */}
      <div className="flex min-h-screen">
        {/* Left Side - Color Display with Room Scene */}
        <div className="w-1/2 relative overflow-hidden">
          {/* Room scene background - you can replace this with an actual room image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(135deg, ${currentColor.hex} 0%, ${currentColor.hex}dd 100%)`,
            }}
          >
            {/* Optional: Add a subtle pattern or texture overlay */}
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white to-transparent"></div>
          </div>
          
          {/* Decorative elements to simulate room items */}
          <div className="absolute bottom-20 left-10">
            <div className="w-16 h-24 bg-black bg-opacity-20 rounded-sm"></div>
            <div className="w-12 h-16 bg-black bg-opacity-15 rounded-sm mt-2 ml-2"></div>
          </div>
        </div>

        {/* Right Side - Color Information */}
        <div className="w-1/2 bg-white p-12 overflow-y-auto">
          {/* Breadcrumb Navigation */}
          <nav className="text-sm mb-8 text-gray-600">
            <span 
              onClick={() => navigate('/colors')} 
              className="cursor-pointer hover:text-blue-600 underline"
            >
              Paint Colors
            </span>
            <span className="mx-2">›</span>
            <span 
              onClick={() => navigate(`/colors/family/${slugify(currentColor.color_family)}`)} 
              className="cursor-pointer hover:text-blue-600 underline"
            >
              {currentColor.color_family}
            </span>
            <span className="mx-2">›</span>
            <span className="text-gray-800">{currentColor.name}</span>
          </nav>

          {/* Color Title and Code */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-2">
              {currentColor.name}
            </h1>
            <p className="text-xl text-gray-600 font-light">
              {currentColor.hex}
            </p>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              {currentColor.description}
            </p>
          </div>

          {/* Color Information Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-800">Color Information</h2>
              <button className="p-1">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">LRV</span>
                <div className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xs text-gray-600">i</span>
                </div>
                <span className="text-gray-800 font-medium">
                  {currentColor.lrv || '76.5'}
                </span>
              </div>
            </div>
          </div>

          {/* Collection Section */}
          <div className="mb-12">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Collection</h3>
            <a href="#" className="text-blue-600 underline hover:text-blue-800">
              {currentColor.collection || 'Color Preview®'}
            </a>
          </div>

          {/* Project Section */}
          <div className="mb-8">
            <h2 className="text-xl font-medium text-gray-800 mb-6">
              Why Choose Benjamin Moore for Your Project?
            </h2>
            
            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="bg-gray-800 text-white px-6 py-3 rounded flex items-center gap-2 hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Get Sample
              </button>
              
              <button className="border border-gray-800 text-gray-800 px-6 py-3 rounded flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Specifications
              </button>
            </div>
          </div>

          {/* Additional Color Details */}
          <div className="space-y-4 text-sm">
            <div>
              <span className="font-medium text-gray-800">Recommended Use: </span>
              <span className="text-gray-600">{currentColor.recommended_use}</span>
            </div>
            
            <div>
              <span className="font-medium text-gray-800">Tone: </span>
              <span className="text-gray-600">{currentColor.tonality} – {currentColor.tone}</span>
            </div>
            
            {currentColor.styling && (
              <div>
                <span className="font-medium text-gray-800">Styling: </span>
                <span className="text-gray-600">{currentColor.styling}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* More Colors Section - Full Width Bottom */}
      {similarColors.length > 4 && (
        <div className="bg-white py-16 px-12">
          <h2 className="text-2xl font-light text-gray-800 mb-8">
            More from {currentColor.color_family}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {similarColors.slice(4, 10).map((color) => (
              <div
                key={color.name}
                className="cursor-pointer group"
                onClick={() => navigate(`/colors/family/${familyName}/${encodeURIComponent(color.name)}`)}
              >
                <div
                  className="h-24 rounded-t-lg shadow-sm group-hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="bg-white border border-t-0 rounded-b-lg p-3 shadow-sm group-hover:shadow-lg transition-shadow">
                  <div className="text-sm font-medium text-gray-800 mb-1">{color.name}</div>
                  <div className="text-xs text-gray-500">{color.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorDetailPage;