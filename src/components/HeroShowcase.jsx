import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroShowcase = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] overflow-hidden bg-gradient-to-br from-[#2b1f36] via-[#493657] to-[#2b1f36] text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#F0C85A]/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 flex flex-col lg:flex-row items-center gap-12">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="flex-1">
          <p className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6">
            <span aria-hidden>🌿</span>
            <span className="sr-only">Eco badges</span>
            Eco-premium paints
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">Safe Surfaces, Safe Spaces.</h1>
          <p className="text-lg md:text-xl text-white/80 mt-4 max-w-xl">Eco-premium paints for homes and projects.</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button onClick={() => navigate('/colors')} className="px-6 py-3 rounded-xl bg-[#F0C85A] text-[#2b1f36] font-semibold hover:bg-[#e5ba4f] transition">Explore Colors</button>
            <button onClick={() => navigate('/room-visualization')} className="px-6 py-3 rounded-xl border border-white/40 hover:bg-white hover:text-[#2b1f36] transition">Try Visualizer</button>
            <button onClick={() => navigate('/product')} className="px-6 py-3 rounded-xl border border-white/40 hover:bg-white hover:text-[#2b1f36] transition">Shop Products</button>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0, x:40}} animate={{opacity:1, x:0}} transition={{duration:0.6, delay:0.15}} className="flex-1 w-full">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <video className="w-full h-full object-cover" autoPlay muted loop playsInline preload="metadata" aria-label="Premium paint lifestyle visuals">
              <source src="/hero.mp4" type="video/mp4" />
            </video>
            <img src="/Assets/home.webp" loading="lazy" alt="Calyco premium interior" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroShowcase;


