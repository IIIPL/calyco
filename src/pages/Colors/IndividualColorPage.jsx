import { useNavigate } from "react-router-dom";
import { colorGroups } from "../../data/colorGroups"
import { motion } from "framer-motion";

const ColorPage = ({ colorName }) => {
  const flatColors = colorGroups.flatMap(group =>
    group.colors.map(color => ({ ...color, groupTitle: group.title }))
  );

  const currentColor = flatColors.find(
    c => c.name.toLowerCase().replace(/\s+/g, "") === colorName.toLowerCase().replace(/\s+/g, "")
  );

  if (!currentColor) {
    return <div className="p-20 text-center text-black">Color not found.</div>;
  }

  const similarColors = flatColors.filter(
    c => c.groupTitle === currentColor.groupTitle && c.name !== currentColor.name
  );
  const navigate = useNavigate();

  return (
    <div className="text-[#1a1a1a] min-h-screen mt-20">

        <div className="px-20 py-10"
            style={{ backgroundColor: currentColor.hex }}
        >
            {/* Breadcrumb */}
            <div className= "text-sm">
                <div className="flex items-center space-x-2">
                    <span
                    className="text-[#1a1a1a] underline cursor-pointer hover:text-black"
                    onClick={() => navigate("/colors")}
                    >
                    Paint Colors
                    </span>
                    <span>›</span>
                    <span
                    className="text-[#1a1a1a] underline cursor-pointer hover:text-black"
                    onClick={() => navigate(`/colors#${currentColor.groupTitle.replace(/\s+/g, "-").toLowerCase()}`)}
                    >
                    {currentColor.groupTitle}
                    </span>
                    <span>›</span>
                    <span className="text-[#1a1a1a] font-medium">{currentColor.name}</span>
                </div>
            </div>
        
            {/* HERO CONTENT */}
            <div className="flex flex-col md:flex-row w-full mt-10 text-[#1a1a1a]">
                {/* LEFT PANEL: color preview or styled background */}
                <div className="w-full md:w-2/5 mb-10 md:mb-0">
                    <div
                    className="w-full h-[500px] rounded-lg border"
                    style={{ backgroundColor: currentColor.hex }}
                    ></div>
                </div>

                {/* RIGHT PANEL: content */}
                <div className="w-full md:w-3/5 md:pl-16 flex flex-col justify-center">
                    {/* Title */}
                    <h1 className="text-5xl font-semibold mb-2">{currentColor.name}</h1>
                    
                    {/* Description (placeholder) */}
                    <p className="text-md text-black mb-10">
                    A premium shade from the Calyco Sacred Palette. Perfect for both residential and commercial applications.
                    </p>

                    {/* Section: Color Info */}
                    <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Color Information</h3>

                    <div className="mb-6">
                    <p className="font-medium text-sm text-black mb-1">LRV</p>
                    <p className="text-black">72.3</p> {/* placeholder */}
                    </div>

                    <div className="mb-6">
                    <p className="font-medium text-sm text-black mb-1">Also Known As</p>
                    <p className="text-blue-700 underline cursor-pointer hover:text-blue-900">–</p>
                    </div>

                    <div>
                    <p className="font-medium text-sm text-black mb-1">Collection</p>
                    <p className="text-blue-700 underline cursor-pointer hover:text-blue-900">{currentColor.groupTitle}</p>
                    </div>
                </div>
            </div>

        </div>

            {/* SIMILAR COLORS */}
            <div className="bg-[#eee9df] py-16">
                <div className="mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8">Similar Colors</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {similarColors.map((color, idx) => (
                    <motion.div
                        key={color.name}
                        className="rounded-lg overflow-hidden shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className="h-24" style={{ backgroundColor: color.hex }}></div>
                        <div className="p-3 bg-white">
                        <p className="text-sm font-medium text-black">{color.name}</p>
                        <p className="text-xs text-black">{color.hex.toUpperCase()}</p>
                        </div>
                    </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ColorPage;
