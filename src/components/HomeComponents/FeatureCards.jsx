import { useNavigate, Link } from 'react-router-dom';
import { getButtonClasses } from '../../data/admin/typography';
import { getAllColors } from '../../data/calycoColors';

const FeatureCards = () => {
  const navigate = useNavigate();
  const allColors = getAllColors();

  // Get 5 popular colors for the showcase - vibrant and diverse selection
  const showcaseColors = [
    allColors.find(c => c.name === "Peacock Blue"),    // Beautiful teal blue
    allColors.find(c => c.name === "Terracotta"),      // Warm earthy orange
    allColors.find(c => c.name === "Lavender"),        // Soft purple
    allColors.find(c => c.name === "Sage Green"),      // Trendy green
    allColors.find(c => c.name === "Marigold")         // Vibrant yellow
  ].filter(Boolean);

  return (
    <section className="py-12 md:py-16 bg-[#F8F4EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Row - Full Width Card */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">

            {/* Left Side - Image */}
            <div className="relative h-64 md:h-80 lg:h-full rounded-2xl overflow-hidden">
              <img
                src="/Assets/Texture Images/quality2.png"
                alt="Eco-Premium Paints"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Side - Content */}
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-[#0F1221]">Access a Range of</span><br />
                <span className="text-[#B8935F]">Eco-Premium Paints</span><br />
                <span className="text-[#0F1221]">& Coatings</span>
              </h3>
              <p className="text-[#5A5A5A] mb-6 leading-relaxed text-lg">
                Low-VOC, high performance chemistry engineered for Indian climates. Choose palettes curated by designers and tested by professionals.
              </p>

              {/* Color Squares */}
              <div className="flex gap-4 mb-8">
                {showcaseColors.map((color, index) => (
                  <Link
                    key={index}
                    to={`/colors/family/${color.colorFamily.toLowerCase().replace(/\s+/g, '-')}/${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="w-16 h-16 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
                    style={{ backgroundColor: color.hex.startsWith('#') ? color.hex : `#${color.hex}` }}
                    title={color.name}
                  />
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/products')}
                  className={getButtonClasses('accent')}
                >
                  Explore Products →
                </button>
                <button
                  onClick={() => navigate('/room-visualization')}
                  className={getButtonClasses('outline')}
                >
                  Visualise 👁
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row - 2 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Card 1: Moving in the Right Direction */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-64 md:h-72">
              <img
                src="/Assets/InteriorInspiratoin/living-room.png"
                alt="Living room"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                <span className="text-[#432452]">Moving in the</span><br />
                <span className="text-[#B8935F]">Right Direction</span>
              </h3>
              <p className="text-[#5A5A5A] mb-6 leading-relaxed">
                Personalised plans that keep your project moving with confidence.
              </p>
              <button
                onClick={() => navigate('/products')}
                className={getButtonClasses('accent')}
              >
                Explore Products
              </button>
            </div>
          </div>

          {/* Card 2: Paint Smarter, Last Longer */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-64 md:h-72">
              <img
                src="/Assets/Texture Images/GPT_Image_1_Sophisticated_living_room_corner_with_textured_acc_0.png"
                alt="Bedroom"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                <span className="text-[#432452]">Paint Smarter,</span><br />
                <span className="text-[#B8935F]">Last Longer</span>
              </h3>
              <p className="text-[#5A5A5A] mb-6 leading-relaxed">
                Premium, durable paints engineered to protect every surface.
              </p>
              <button
                onClick={() => navigate('/colors')}
                className={getButtonClasses('accent')}
              >
                Explore Colors
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
