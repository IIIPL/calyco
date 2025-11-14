import { useNavigate } from "react-router-dom";
import { flatColors } from "../../data/flatColors";
import { reverseColorNameMapping } from "../../data/colorNameMapping";

export const InspirationCard = ({ colorName }) => {
  const navigate = useNavigate();
  const color = flatColors.find(c => c.name === colorName);
  const colorCode = color?.hex || "#d9d3de";
  const familyName = color?.color_family?.toLowerCase() || "unknown";
  const colorImage = color?.image || "/Assets/chair.webp";
  
  // Convert color code to actual hex color
  const getActualHexColor = (colorValue) => {
    // If it's already a hex color, return as is
    if (colorValue && colorValue.startsWith('#')) {
      return colorValue;
    }
    // Otherwise, look up the color name in our mapping
    return reverseColorNameMapping[colorValue] || '#CCCCCC';
  };
  
  const hex = getActualHexColor(colorCode);
  
  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')        // Replace spaces with hyphens
      .replace(/[^\w\-&]+/g, '')   // Remove all non-word chars EXCEPT hyphens and '&'
      .replace(/\-\-+/g, '-');     // Collapse multiple hyphens
  
  

  const handleClick = () => {
    navigate(`/colors/family/${slugify(familyName)}/${slugify(colorName)}`);
  };

  // Calculate text color based on background brightness
  const getTextColor = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? "text-black" : "text-white";
  };

  const textColor = getTextColor(hex);

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-lg shrink-0 h-[500px] overflow-hidden flex flex-col shadow-md bg-white max-w-xs"
    >
      {/* Image */}
      <div className="h-4/5 w-full bg-gray-200 relative overflow-hidden" style={{ backgroundColor: hex }}>
        {color?.image ? (
          <img
            src={colorImage}
            alt={colorName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={colorImage}
              alt="Chair with color background"
              className="w-full h-full object-contain opacity-80"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="h-1/5 px-4 py-3" style={{ backgroundColor: hex }}>
        <h3 className={`text-sm font-medium ${textColor}`}>{colorName}</h3>
        <p className={`text-xs ${textColor}`}>{color?.hex || "--"}</p>
      </div>
    </div>
  );
};
