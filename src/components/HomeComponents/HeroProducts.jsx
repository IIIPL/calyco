import { Button } from "../Button";

export const HeroProducts = ({ productName, productImage }) => {
  return (
    <div className="flex flex-row items-center justify-between bg-white px-10 py-6 rounded-xl shadow-sm w-full">
      {/* Left: Product Image (max height added here) */}
      <div className="flex-shrink-0 max-w-[200px] max-h-[240px]">
        <img
          src={productImage}
          alt={productName}
          className="object-contain w-full h-full max-h-[220px]"
        />
      </div>

      {/* Middle: Product Name + Description + Button */}
      <div className="flex flex-col px-10 w-[280px]">
        <h2 className="text-2xl font-semibold text-[#342347]">{productName}</h2>
        <p className="text-gray-700 text-sm mb-4">One-Coat Interior Paint</p>
        <button className="bg-yellow-600 text-white text-sm font-medium px-4 py-2 rounded-md w-max hover:bg-yellow-700">
          Learn More
        </button>
      </div>
    </div>
  );
};
