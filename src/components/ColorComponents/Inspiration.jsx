import { useNavigate } from "react-router-dom";
import { flatColors } from "../../data/flatColors";

export const InspirationCard = ({ colorName }) => {
  const navigate = useNavigate();
  const color = flatColors.find(c => c.name === colorName);
  const hex = color?.hex || "#d9d3de";
  const group = color?.group?.toLowerCase() || "unknown";
  const colorImage = color?.image || "https://assets.benjaminmoore.com/transform/dd0c8228-f6be-400a-bcc2-7d8a2c124de6/Violet-Paint-Living-Room-Accent-Wall-800x1000"

  const handleClick = () => {
    navigate(`/colors/family/${group}/${encodeURIComponent(colorName)}`);
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
      <div className="h-4/5 w-full bg-gray-200">
        <img
          src={colorImage}
          alt={colorName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="h-1/5 px-4 py-3" style={{ backgroundColor: hex }}>
        <h3 className={`text-sm font-medium ${textColor}`}>{colorName}</h3>
        <p className={`text-xs ${textColor}`}>{color?.hex || "--"}</p>
      </div>
    </div>
  );
};
