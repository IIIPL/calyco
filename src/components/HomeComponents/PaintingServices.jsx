import { motion } from 'framer-motion';
import { FaCircleCheck } from 'react-icons/fa6';

const PaintingServices = () => {
  const features = [
    {
      icon: FaCircleCheck,
      text: "Trained & Certified Painters"
    },
    {
      icon: FaCircleCheck,
      text: "Site Visit & Free Quote"
    },
    {
      icon: FaCircleCheck,
      text: "Quality Materials Guaranteed"
    },
    {
      icon: FaCircleCheck,
      text: "On-Time Project Completion"
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#F6F3EE] to-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#4B007D]/10 text-[#4B007D] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Delhi NCR Exclusive</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1221] mb-6 leading-tight">
              Professional Painting Services at Your Doorstep
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-[#0F1221]/70 mb-8 leading-relaxed">
              Transform your space with Calyco's expert painting services. Our certified professionals deliver flawless finishes using premium materials, backed by our 10-year guarantee.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <feature.icon className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-[#0F1221] font-medium text-sm md:text-base">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="/Assets/Paint services/Calyco5.png"
                alt="Professional Painters at Work"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PaintingServices;
