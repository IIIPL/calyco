import { Link } from 'react-router-dom'

const ProductCard = ({ id, name, shortDescription, image, sizes, sheens, tier, price }) => {
  const getTierColor = (tier) => {
    switch (tier) {
      case "Ultra-Premium": return "text-purple-600 bg-purple-100";
      case "Premium": return "text-blue-600 bg-blue-100";
      case "Standard": return "text-green-600 bg-green-100";
      case "Value": return "text-orange-600 bg-orange-100";
      case "Specialty": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 w-64 text-left hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link to={`/product/${id}`}>
        <img src={image} alt={name} className="scale-75 hover:scale-100 transition duration-300" />
      </Link>
      
      <div className="flex items-center gap-2 mb-2">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTierColor(tier)}`}>
          {tier}
        </span>
      </div>
      
      <div className="text-xl font-semibold text-black text-center mb-1">{name}</div>
      <div className="text-sm text-gray-600 text-center mb-2">{shortDescription}</div>
      
      <div className="text-lg font-bold text-[#F0C85A] text-center mb-3">₹{price}</div>
      
      <div className="text-xs text-gray-700 mb-3">
        <div><strong>Sizes:</strong> {sizes.join(", ")}</div>
        <div><strong>Finishes:</strong> {sheens.slice(0, 2).join(", ")}{sheens.length > 2 ? "..." : ""}</div>
      </div>

      <div className="flex justify-center">
        <Link 
          to={`/product/${id}`}
          className="mt-2 px-4 py-2 bg-[#493657] text-white text-sm rounded hover:bg-[#5a4067] transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
