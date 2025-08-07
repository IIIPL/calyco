import { Button } from "../Button";

export const HeroProducts = ({ productName, productImage }) => {
  const features = [
    {
      label: "Superior Coverage",
      icon: "https://res.cloudinary.com/dr98axi2n/image/upload/w_400/v1754548735/ChatGPT_Image_Aug_7_2025_11_59_38_AM_diym9b.png",
    },
    {
      label: "Weather Resistant",
      icon: "https://res.cloudinary.com/dr98axi2n/image/upload/w_400/v1754548733/ChatGPT_Image_Aug_7_2025_12_00_00_PM_zdkill.png",
    },
    {
      label: "Quick Drying",
      icon: "https://res.cloudinary.com/dr98axi2n/image/upload/w_400/v1754548730/ChatGPT_Image_Aug_7_2025_11_59_40_AM_h6mrtp.png",
    },
    {
      label: "Premium Finish",
      icon: "https://res.cloudinary.com/dr98axi2n/image/upload/w_400/v1754548727/ChatGPT_Image_Aug_7_2025_12_01_31_PM_hsdcpl.png",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-between max-h-[240px] bg-white px-10 py-6 rounded-xl shadow-sm w-full">
  {/* Left: Product Image */}
  <div className="flex-shrink-0 ml-10 max-w-[200px] max-h-[240px]">
    <img
      src={productImage}
      alt={productName}
      className="object-contain w-full h-full max-h-[220px]"
    />
  </div>

  {/* Middle: Product Name + Description + Button */}
  <div className="flex flex-col px-6 w-[280px]">
    <h2 className="text-4xl font-semibold text-[#342347] mb-5">{productName}</h2>
    <Button size="sm" className="w-max">
      Explore
    </Button>
  </div>

  {/* Right: Feature Icons */}
  <div className="grid grid-cols-2 gap-6 mr-32">
    {features.map(({ icon, label }, i) => (
      <div
        key={i}
        className="flex flex-col items-center text-center w-[120px]"
      >
        <img
          src={icon}
          alt={label}
          className="w-24 h-24 object-contain"
        />
      </div>
    ))}
  </div>
</div>

  );
};
