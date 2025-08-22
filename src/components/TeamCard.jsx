import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const TeamCard = ({ name, role, image, description, socials }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
    >
      {/* Image */}
      <div className="aspect-square bg-gradient-to-br from-[#F0C85A]/20 to-[#5E3A98]/20 relative overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-[#5E3A98] to-[#F0C85A] rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>
        
        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-[#493657]/80 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center text-white">
            <h4 className="text-lg font-semibold mb-2">{name}</h4>
            <p className="text-sm opacity-90">{role}</p>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-[#493657] mb-2 group-hover:text-[#5E3A98] transition-colors duration-300">
          {name}
        </h3>
        <p className="text-[#5E3A98] font-medium text-sm mb-3">{role}</p>
        <p className="text-[#493657]/70 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Social Links */}
        {socials && (
          <div className="flex items-center gap-3">
            {socials.linkedin && (
              <motion.a
                href={socials.linkedin}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[#493657] hover:bg-[#5E3A98] hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Connect with ${name} on LinkedIn`}
              >
                <Linkedin className="w-3 h-3" />
              </motion.a>
            )}
            {socials.twitter && (
              <motion.a
                href={socials.twitter}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[#493657] hover:bg-[#5E3A98] hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Follow ${name} on Twitter`}
              >
                <Twitter className="w-3 h-3" />
              </motion.a>
            )}
            {socials.email && (
              <motion.a
                href={`mailto:${socials.email}`}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[#493657] hover:bg-[#5E3A98] hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Email ${name}`}
              >
                <Mail className="w-3 h-3" />
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TeamCard;
