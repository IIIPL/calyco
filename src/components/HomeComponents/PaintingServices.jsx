import React from 'react';
import { motion } from 'framer-motion';
import { FaCircleCheck, FaPaintRoller, FaCalendarDays, FaShieldHalved } from 'react-icons/fa6';

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

  const benefits = [
    {
      icon: FaPaintRoller,
      title: "Professional Execution",
      description: "Expert painters with years of experience"
    },
    {
      icon: FaCalendarDays,
      title: "Flexible Scheduling",
      description: "Work around your timeline"
    },
    {
      icon: FaShieldHalved,
      title: "Quality Assurance",
      description: "100% satisfaction guaranteed"
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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#4B007D] to-[#6b2da8] aspect-[4/3]">
              {/* Placeholder - Replace with actual image */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80">
                <FaPaintRoller className="w-24 h-24 mb-4 opacity-50" />
                <p className="text-lg font-semibold">Professional Painters at Work</p>
                <p className="text-sm opacity-70">[Replace with actual service image]</p>
              </div>

              {/* Customer Rating Badge */}
              <div className="absolute top-4 right-4 bg-white rounded-xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-3xl font-bold text-[#4B007D]">4.8</span>
                  <svg className="w-6 h-6 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-xs text-[#0F1221]/70 font-medium">Customer Rating</p>
              </div>

              {/* Projects Completed Badge */}
              <div className="absolute bottom-4 left-4 bg-white rounded-xl px-5 py-3 shadow-lg">
                <p className="text-3xl font-bold text-[#4B007D] mb-1">500+</p>
                <p className="text-xs text-[#0F1221]/70 font-medium">Projects Completed</p>
              </div>
            </div>

            {/* Benefits Cards */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-4 shadow-md text-center"
                >
                  <benefit.icon className="w-8 h-8 mx-auto mb-2 text-[#4B007D]" />
                  <h4 className="text-xs font-bold text-[#0F1221] mb-1">{benefit.title}</h4>
                  <p className="text-[10px] text-[#0F1221]/60 leading-tight">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PaintingServices;
