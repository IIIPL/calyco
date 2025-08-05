import { Button } from "../Button";

export const HeroProducts = ({ productName, productImage }) => {
  return (
    <div className="flex flex-row items-center justify-between bg-white px-10 py-6 rounded-xl shadow-sm w-full">
      {/* Left: Product Image */}
      <div className="flex-shrink-0 max-w-[200px]">
        <img src={productImage} alt={productName} className="w-full h-auto object-contain" />
      </div>

      {/* Middle: Product Name + Description + Button */}
      <div className="flex flex-col px-10 w-[280px]">
        <h2 className="text-2xl font-semibold text-[#342347]">{productName}</h2>
        <p className="text-gray-700 text-sm mb-4">One-Coat Interior Paint</p>
        <Button children={"Learn More"} to={`/product/${productName}`} />
      </div>

      {/* Middle: Product Name + Description + Button */}
      <div className="flex flex-col px-10 w-[280px]">
        <h2 className="text-2xl font-semibold text-[#342347]">{productName}</h2>
        <p className="text-gray-700 text-sm mb-4">One-Coat Interior Paint</p>
        <button className="bg-yellow-600 text-white text-sm font-medium px-4 py-2 rounded-md w-max hover:bg-yellow-700">
          Learn More
        </button>
      </div>

      {/* Right: Icons Grid */}
      {/* <div className="grid grid-cols-2 gap-4">
        {productIcons.map((icon, index) => (
          <div key={index} className="flex flex-col items-start">
            <div className="w-10 h-10 mb-1">
              <img src={icon.icon} alt={icon.title} className="w-full h-full object-contain" />
            </div>
            <p className="text-sm font-medium text-[#342347] leading-tight">{icon.title}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};
