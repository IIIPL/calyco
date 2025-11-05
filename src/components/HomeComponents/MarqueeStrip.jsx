const MarqueeStrip = () => {
  return (
    <div className="bg-[#998850] py-3 overflow-hidden relative">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Repeat the content multiple times for seamless loop */}
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center">
            <span className="text-white text-sm font-normal">
              use code <span className="font-bold">CALYCO20</span> for 20% off
            </span>
            <span className="mx-6 text-white">•</span>
            <span className="text-white text-sm font-normal">
              Expert Painting Services in <span className="text-[#432452] font-bold">Delhi NCR</span>
            </span>
            <span className="mx-6 text-white">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
