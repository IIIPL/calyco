import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaHouse, FaTrophy, FaUsers, FaPaintRoller } from "react-icons/fa6";

const AnimatedNumber = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const SocialProof = () => {
  const stats = [
    {
      icon: FaHouse,
      number: 10000,
      suffix: "+",
      label: "Homes Transformed",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FaTrophy,
      number: 15,
      suffix: "+",
      label: "Years of Excellence",
      color: "from-amber-500 to-amber-600"
    },
    {
      icon: FaUsers,
      number: 5000,
      suffix: "+",
      label: "Happy Customers",
      color: "from-green-500 to-green-600"
    },
    {
      icon: FaPaintRoller,
      number: 2,
      suffix: "",
      label: "Rank in Indian Paint Industry",
      color: "from-purple-500 to-purple-600",
      highlight: true
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-[#493657] to-[#5a4067] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Trusted by Thousands Across India
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Our commitment to quality and customer satisfaction has made us a leading choice in the paint industry.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group ${stat.highlight ? 'lg:col-span-1' : ''}`}
            >
              <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 ${stat.highlight ? 'ring-2 ring-[#D4AF37]' : ''}`}>
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto`}>
                  <stat.icon className="text-white text-2xl" />
                </div>

                {/* Number */}
                <div className={`text-4xl md:text-5xl font-bold mb-3 text-center ${stat.highlight ? 'text-[#D4AF37]' : 'text-white'}`}>
                  <AnimatedNumber end={stat.number} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="text-white/90 text-center font-medium text-base md:text-lg">
                  {stat.label}
                </p>

                {/* Highlight Badge */}
                {stat.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#D4AF37] text-[#0F1221] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                      Industry Leader
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/80 text-lg mb-4">
            Join thousands of satisfied customers who chose quality and affordability
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[#D4AF37] text-2xl">★</span>
            ))}
            <span className="text-white ml-2 font-semibold">4.8/5 Average Rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
