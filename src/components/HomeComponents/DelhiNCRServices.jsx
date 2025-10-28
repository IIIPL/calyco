import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCircleCheck, FaPaintRoller, FaPhone, FaCalendarDays } from "react-icons/fa6";

const DelhiNCRServices = () => {
  const features = [
    "Trained & Certified Painters",
    "Site Visit & Free Quote",
    "Quality Materials Guaranteed",
    "On-Time Project Completion"
  ];

  const serviceHighlights = [
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
      icon: FaCircleCheck,
      title: "Quality Assurance",
      description: "100% satisfaction guaranteed"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#493657]/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#493657]/10 text-[#493657] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaPaintRoller />
              <span>Delhi NCR Exclusive</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#493657] mb-6 leading-tight">
              Professional Painting Services at Your Doorstep
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Transform your space with Calyco's expert painting services. Our certified professionals deliver flawless finishes using premium materials, backed by our 10-year guarantee.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <FaCircleCheck className="text-green-500 text-xl flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#493657] to-[#5a4067] text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <FaPhone />
                Book Free Consultation
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#493657] text-[#493657] rounded-xl font-bold text-lg hover:bg-[#493657] hover:text-white transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>

          {/* Image/Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Image Placeholder - Replace with actual image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-[#493657] to-[#5a4067] flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <FaPaintRoller className="text-6xl mx-auto mb-4 opacity-50" />
                  <p className="text-lg opacity-75">Professional Painters at Work</p>
                  <p className="text-sm opacity-60 mt-2">[Replace with actual service image]</p>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border-2 border-[#D4AF37]">
                <div className="text-3xl font-bold text-[#493657]">500+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-6 border-2 border-[#D4AF37]">
                <div className="text-3xl font-bold text-[#493657]">4.8★</div>
                <div className="text-sm text-gray-600">Customer Rating</div>
              </div>
            </div>

            {/* Service Highlights */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {serviceHighlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <item.icon className="text-2xl text-[#493657] mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-700">{item.title}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DelhiNCRServices;
