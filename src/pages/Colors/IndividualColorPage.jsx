import { useNavigate, useParams } from "react-router-dom";
import { flatColors } from "../../data/flatColors"
import { reverseColorNameMapping } from "../../data/colorNameMapping"
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";

const ColorPage = () => {
  const { familyName, colorName } = useParams();
  
  // Decode the color name from URL
  const decodedColorName = decodeURIComponent(colorName);
  
  const currentColor = flatColors.find(
    c => c.name.toLowerCase().replace(/\s+/g, "-") === decodedColorName.toLowerCase().replace(/\s+/g, "-")
  );

  if (!currentColor) {
    return <div className="p-20 text-center text-black">Color not found.</div>;
  }

  // Get actual hex color from the mapping
  const getActualHexColor = (colorCode) => {
    return reverseColorNameMapping[colorCode] || "#CCCCCC"; // fallback to grey
  };

  const actualHexColor = getActualHexColor(currentColor.hex);

  const similarColors = flatColors.filter(
    c => c.color_family === currentColor.color_family && c.name !== currentColor.name
  );
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen mt-20" style={{ backgroundColor: actualHexColor }}>
      <div className="flex h-screen">
        {/* Left Panel - Color Swatch with Still Life */}
        <div className="w-1/3 relative">
          {/* Still Life Image at Bottom Left */}
          <div className="absolute bottom-8 left-8 w-32 h-32 bg-blue-200 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-blue-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 bg-green-400 rounded-full mx-auto mb-2"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full mx-auto"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Content */}
        <div className="w-2/3 p-12 text-black">
          {/* Breadcrumb */}
          <div className="text-sm mb-8">
            <div className="flex items-center space-x-2">
              <span
                className="underline cursor-pointer hover:text-gray-600"
                onClick={() => navigate("/colors")}
              >
                Paint Colors
              </span>
              <span>›</span>
              <span
                className="underline cursor-pointer hover:text-gray-600"
                onClick={() => navigate(`/colors/family/${familyName}`)}
              >
                {currentColor.color_family}
              </span>
              <span>›</span>
              <span className="font-medium">{currentColor.name}</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-2xl">
            {/* Title */}
            <h1 className="text-6xl font-bold mb-4">{currentColor.name}</h1>
            
            {/* Color Code */}
            <p className="text-xl mb-4">Color Code: {getActualHexColor(currentColor.hex).toUpperCase()}</p>
            
            {/* Description */}
            <p className="text-lg mb-8">{currentColor.description}</p>
            
            {/* Color Family */}
            <p className="text-lg mb-8">
              Color Family:{" "}
              <span 
                className="underline cursor-pointer hover:text-gray-600"
                onClick={() => navigate(`/colors/family/${familyName}`)}
              >
                {currentColor.color_family}
              </span>
            </p>

            {/* Separator */}
            <div className="w-full h-px bg-black mb-8"></div>

            {/* Action Items */}
            <div className="space-y-4">
              <p className="underline cursor-pointer hover:text-gray-600">
                Download digital dollop of {currentColor.name}
              </p>
              
              <button 
                onClick={() => {
                  alert('Buy Now clicked! Adding to cart...');
                  try {
                    console.log('Buy Now clicked for:', currentColor.name);
                    
                    // Create a product object for the cart
                    const productForCart = {
                      id: `color-${currentColor.name.toLowerCase().replace(/\s+/g, '-')}`,
                      name: currentColor.name,
                      display_name: currentColor.name,
                      price: 499, // Default price for colors
                      image: "/Assets/chair.png" // Use a simple image for now
                    };
                    
                    console.log('Product for cart:', productForCart);
                    
                    // Add to cart
                    addToCart(productForCart, 'Sample', 'Sample', 1, 499, {
                      name: currentColor.name,
                      hex: actualHexColor
                    });
                    
                    console.log('Added to cart, navigating to checkout...');
                    
                    // Navigate directly to checkout
                    navigate('/checkout');
                  } catch (error) {
                    console.error('Error in Buy Now:', error);
                    alert('There was an error adding the item to cart. Please try again.');
                  }
                }}
                className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPage;
