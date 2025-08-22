import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, Award, Star, Zap } from 'lucide-react';

const FounderCard = ({ name, role, image, description, age, achievements, socials }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-[#efe7ff] rounded-3xl p-8 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#F0C85A] to-[#5E3A98] p-1">
            <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-[#5E3A98] to-[#F0C85A] rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">AK</span>
                </div>
                <h3 className="text-2xl font-bold text-[#493657] mb-2">{name}</h3>
                <p className="text-[#5E3A98] font-medium">{role}</p>
                <p className="text-sm text-[#493657]/60 mt-1">{age}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-2xl font-semibold text-[#493657] mb-4">{name}</h3>
            <p className="text-[#493657]/70 leading-relaxed mb-6">
              {description}
            </p>
          </div>

          {/* Achievements */}
          {achievements && achievements.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-[#493657] mb-3">Key Achievements</h4>
              <div className="space-y-2">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-[#F0C85A] rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[#493657]/80 text-sm">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {socials && (
            <div className="flex items-center gap-4 pt-4">
              {socials.linkedin && (
                <motion.a
                  href={socials.linkedin}
                  className="w-10 h-10 bg-[#493657] rounded-full flex items-center justify-center text-white hover:bg-[#5E3A98] transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-4 h-4" />
                </motion.a>
              )}
              {socials.twitter && (
                <motion.a
                  href={socials.twitter}
                  className="w-10 h-10 bg-[#493657] rounded-full flex items-center justify-center text-white hover:bg-[#5E3A98] transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter className="w-4 h-4" />
                </motion.a>
              )}
              {socials.email && (
                <motion.a
                  href={`mailto:${socials.email}`}
                  className="w-10 h-10 bg-[#493657] rounded-full flex items-center justify-center text-white hover:bg-[#5E3A98] transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FounderCard;
