import { motion } from "framer-motion";
import { FaShieldHalved, FaIndianRupeeSign, FaIndustry, FaUserTie } from "react-icons/fa6";

const TrustBar = () => {
  const trustItems = [
    {
      icon: FaShieldHalved,
      title: "10-Year Guarantee",
      description: "Unmatched durability backed by our promise",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FaIndianRupeeSign,
      title: "20% More Affordable",
      description: "Premium quality without the premium price",
      color: "from-green-500 to-green-600"
    },
    {
      icon: FaIndustry,
      title: "Manufactured in India",
      description: "Direct from our factory to your home",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: FaUserTie,
      title: "Expert Services",
      description: "Professional painters across Delhi NCR",
      color: "from-amber-500 to-amber-600"
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-[#493657] to-[#5a4067] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon */}
              <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <item.icon className="text-white text-2xl md:text-3xl" />
              </div>

              {/* Content */}
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-white/80 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
