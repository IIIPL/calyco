import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import TeamCard from './TeamCard';
import FounderCard from './FounderCard';

const TeamSection = ({ members = [], founder = null }) => {
  const defaultMembers = [
    {
      name: "Armaan Kothary",
      role: "Founder & CEO",
      image: "/Assets/color-banner.webp",
      description: "A young environmental entrepreneur who launched Calyco Paints at the age of 15 with a vision to build smarter solutions for sustainable home living.",
      socials: {
        linkedin: "#",
        twitter: "#",
        email: "armaan@calyco.com"
      }
    },
    {
      name: "Sarah Chen",
      role: "Head of R&D",
      image: "/Assets/color-banner.webp",
      description: "Leading our research and development efforts to create innovative, sustainable paint formulations.",
      socials: {
        linkedin: "#",
        email: "sarah@calyco.com"
      }
    },
    {
      name: "Rajesh Kumar",
      role: "Operations Director",
      image: "/Assets/color-banner.webp",
      description: "Overseeing our manufacturing processes and ensuring quality control across all products.",
      socials: {
        linkedin: "#",
        email: "rajesh@calyco.com"
      }
    }
  ];

  const defaultFounder = {
    name: "Armaan Kothary",
    role: "Founder & Innovator",
    image: "/Assets/color-banner.webp",
    description: "A young environmental entrepreneur who launched Calyco Paints at the age of 15 with a vision to build smarter solutions for sustainable home living. His goal was to create a brand that combines environmental responsibility with design excellence—while offering safer and more breathable paints and coatings to Indian households and builders.",
    age: "15 at founding",
    achievements: [
      "Youngest paint industry entrepreneur",
      "EcoMax Technology inventor",
      "Sustainability advocate"
    ],
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "armaan@calyco.com"
    }
  };

  const displayMembers = members.length > 0 ? members : defaultMembers;
  const displayFounder = founder || defaultFounder;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-[#493657] mb-6 tracking-wide">
            Meet Our Team
          </h2>
          <p className="text-lg text-[#493657]/70 max-w-2xl mx-auto leading-relaxed">
            The passionate individuals behind Calyco's mission to revolutionize sustainable paint solutions.
          </p>
        </motion.div>

        {/* Founder Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <FounderCard {...displayFounder} />
        </motion.div>

        {/* Team Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <TeamCard {...member} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
