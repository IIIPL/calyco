import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HomeCard } from "../components/HomeCard";
import { WhyChooseCard } from "../components/WhyChooseCard";
import { FaArrowRight } from "react-icons/fa6";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { HeroSection } from "../components/HomeComponents/HeroSection";
// import { HeroProducts } from "../components/HomeComponents/HeroProducts";
import { flatColors } from "../data/flatColors";
import { ColorTrends } from "../components/ColorComponents/ColorTrends";
import {HeroSlider} from "../components/HomeComponents/HeroSlider";
import Carousel from "../components/HomeComponents/Carousel";
import HeroColorShowcase from "../components/HeroColorShowcase";
import CategoryNav from "../components/CategoryNav";
import MiniVisualizer from "../components/MiniVisualizer";
import MiniInspirationGallery from "../components/HomeComponents/MiniInspirationGallyer";


const galleryImages = [
  {
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754906014/webaliser-_TPTXZd9mOo-unsplash_hb5na0.jpg",
    alt: "Modern exterior home at dusk",
  },
  {
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/hallwayhero_m6w6b5.png",
    alt: "Bright hallway with artwork",
  },
  {
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/bedroomHero_blfz2c.jpg",
    alt: "Cozy bedroom in neutral tones",
  },{
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754906014/webaliser-_TPTXZd9mOo-unsplash_hb5na0.jpg",
    alt: "Modern exterior home at dusk",
  },
  {
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/hallwayhero_m6w6b5.png",
    alt: "Bright hallway with artwork",
  },
  {
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/bedroomHero_blfz2c.jpg",
    alt: "Cozy bedroom in neutral tones",
  },{
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754906014/webaliser-_TPTXZd9mOo-unsplash_hb5na0.jpg",
    alt: "Modern exterior home at dusk",
  },
  {
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/hallwayhero_m6w6b5.png",
    alt: "Bright hallway with artwork",
  },
  {
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/bedroomHero_blfz2c.jpg",
    alt: "Cozy bedroom in neutral tones",
  },{
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754906014/webaliser-_TPTXZd9mOo-unsplash_hb5na0.jpg",
    alt: "Modern exterior home at dusk",
  },
  {
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/hallwayhero_m6w6b5.png",
    alt: "Bright hallway with artwork",
  },
  {
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/bedroomHero_blfz2c.jpg",
    alt: "Cozy bedroom in neutral tones",
  },{
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754906014/webaliser-_TPTXZd9mOo-unsplash_hb5na0.jpg",
    alt: "Modern exterior home at dusk",
  },
  {
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/hallwayhero_m6w6b5.png",
    alt: "Bright hallway with artwork",
  },
  {
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/bedroomHero_blfz2c.jpg",
    alt: "Cozy bedroom in neutral tones",
  },{
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754906014/webaliser-_TPTXZd9mOo-unsplash_hb5na0.jpg",
    alt: "Modern exterior home at dusk",
  },
  {
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/hallwayhero_m6w6b5.png",
    alt: "Bright hallway with artwork",
  },
  {
    src: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754598790/bedroomHero_blfz2c.jpg",
    alt: "Cozy bedroom in neutral tones",
  },
];
export const HomePage = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { threshold: 0.3 });
    
    useEffect(() => {
        document.title = "Calyco Paints - Premium Paint Solutions";
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                duration: 0.8
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    
    
    return (
        <div className="pt-20">
           {/* Section 1 */}
           <HeroSection/>

           {/* Section 2 */}
           {/* <div className="px-10">
            <Carousel/>
           </div> */}

           {/* Section 3 */}
           <div>
            <Slider/>
            <MiniVisualizer/>
            <MiniInspirationGallery height={180} cardWidth={260} />
           </div>
            {/* Enhanced Who We Serve Section */}
            
            {/* Enhanced Why Choose Section */}
            <section className="min-h-screen bg-gradient-to-br from-[#493657]/5 to-white flex flex-col px-6 md:px-32 pt-20 relative overflow-hidden">
                {/* Enhanced Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-[#F0C85A]/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-[#493657]/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#F0C85A]/10 to-[#493657]/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '3s'}}></div>

                <motion.div 
                    className="text-center mb-16 z-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.h2 
                        className="font-bold text-[#493657] text-4xl md:text-5xl mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Why Choose Calyco?
                    </motion.h2>
                    <motion.p 
                        className="text-xl text-[#493657]/70 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Discover what makes us the preferred choice for premium paint solutions
                    </motion.p>
                    <motion.div 
                        className="w-20 h-1 bg-gradient-to-r from-[#F0C85A] to-[#493657] rounded-full mx-auto mt-6"
                        initial={{ width: 0 }}
                        whileInView={{ width: "5rem" }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                    ></motion.div>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ 

                                scale: 1.05, 
                                boxShadow: "0 20px 40px rgba(0,0,0,0.1)" 
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <WhyChooseCard index={index} />
                        </motion.div>
                    ))}
                </motion.div>

                
                
            </section>

            
            <section>
                <ColorTrends/>
            </section>
        </div>
    );
};