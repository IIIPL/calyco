import { motion } from "framer-motion";
import { HiOutlineShieldCheck, HiOutlineBanknotes, HiOutlineBuildingOffice2, HiOutlineUserGroup } from "react-icons/hi2";

const TrustBar = () => {
  const trustItems = [
    {
      icon: HiOutlineShieldCheck,
      title: "10-Year Guarantee",
      description: "Unmatched durability backed by our promise",
      accent: "bg-white/10"
    },
    {
      icon: HiOutlineBanknotes,
      title: "20% More Affordable",
      description: "Premium quality without the premium price",
      accent: "bg-white/10"
    },
    {
      icon: HiOutlineBuildingOffice2,
      title: "In-House Manufactured",
      description: "Local batches mixed and packed for tighter quality control",
      accent: "bg-white/10"
    },
    {
      icon: HiOutlineUserGroup,
      title: "Expert Services",
      description: "Professional painters across Delhi NCR",
      accent: "bg-white/10"
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-gradient-to-r from-[#1A0B21] to-[#432553] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-white/5 mix-blend-overlay"></div>

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
              <div className={`w-14 h-14 md:w-16 md:h-16 ${item.accent} border border-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-lg`}>
                <item.icon className="text-white text-2xl" />
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
