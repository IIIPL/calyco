import { Link } from 'react-router-dom';
import { FiArrowRight, FiHome, FiShield } from 'react-icons/fi';

const productTypes = [
  {
    id: 1,
    name: "Interior Paint",
    description: "Premium interior paints designed for lasting beauty and durability. Perfect for walls, ceilings, and interior surfaces.",
    icon: <FiHome className="text-4xl" />,
    features: ["Low VOC Formula", "Easy Application", "Premium Finish", "Long-lasting Color"],
    link: "/products/interior",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-100",
    iconColor: "text-blue-600",
    buttonColor: "bg-blue-600 hover:bg-blue-700"
  },
  {
    id: 2,
    name: "Stain & Sealer",
    description: "Professional-grade stains and sealers that protect and enhance wood surfaces while maintaining natural beauty.",
    icon: <FiShield className="text-4xl" />,
    features: ["Weather Resistant", "UV Protection", "Deep Penetration", "Natural Enhancement"],
    link: "/products/stain-sealer",
    bgColor: "bg-gradient-to-br from-amber-50 to-orange-100",
    iconColor: "text-amber-600",
    buttonColor: "bg-amber-600 hover:bg-amber-700"
  }
];

export const Products = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 mt-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our premium paint collection designed for every project and surface
          </p>
        </div>

        {/* Product Type Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {productTypes.map((product) => (
            <div
              key={product.id}
              className={`${product.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-white/50`}
            >
              {/* Icon */}
              <div className={`${product.iconColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {product.icon}
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {product.name}
              </h2>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Link
                to={product.link}
                className={`${product.buttonColor} text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg`}
              >
                Explore Collection
                <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help Choosing?
            </h3>
            <p className="text-gray-600 mb-6">
              Our paint experts are here to help you find the perfect solution for your project
            </p>
            <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300">
              Contact Our Experts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};