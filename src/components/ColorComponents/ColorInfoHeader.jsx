import React from 'react';

const ColorInfoHeader = ({ name, ralCode, colorFamily, mood, hexColor }) => {
  // Function to generate and download paint dollop PNG
  const downloadDollop = () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set canvas size with transparent background
      canvas.width = 400;
      canvas.height = 400;

      // Clear canvas (transparent)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = 200;
      const centerY = 200;
      const radius = 160;

      // Draw main paint dollop circle
      ctx.fillStyle = hexColor || '#CCCCCC';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Add subtle shadow for depth
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.fill();

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Add highlight for glossy paint effect
      const gradient = ctx.createRadialGradient(
        centerX - 50, centerY - 50, 20,
        centerX, centerY, radius
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.15)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Failed to create blob');
          alert('Failed to generate dollop image');
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${name.toLowerCase().replace(/\s+/g, '-')}-dollop.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (error) {
      console.error('Error generating dollop:', error);
      alert('Failed to download dollop image');
    }
  };

  return (
    <div className="p-6 md:p-8 bg-white border border-gray-200 rounded-3xl shadow-sm space-y-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">{name}</h1>
      </div>

      {mood && (
        <p className="text-lg text-gray-700 leading-relaxed">{mood}</p>
      )}

      {colorFamily && (
        <div>
          <h2 className="text-sm uppercase tracking-wide text-gray-500">Color Family</h2>
          <p className="text-base font-medium text-gray-900 mt-1">{colorFamily}</p>
        </div>
      )}

      {hexColor && (
        <button
          onClick={downloadDollop}
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 hover:border-gray-400 transition cursor-pointer"
        >
          Download digital dollop of {name}
        </button>
      )}
    </div>
  );
};

export default ColorInfoHeader;
