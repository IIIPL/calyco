import React from 'react';

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Enhanced Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-40 right-32 w-48 h-48 bg-emerald-300/20 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* Hero content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
                Sustainable Innovation Since 2023
              </span>
      </div>

            <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 leading-tight">
              About
              <span className="block bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                Calyco Paints
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-emerald-100 mb-8 font-light leading-relaxed">
              Next-generation sustainable paint solutions for a cleaner future
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-emerald-700 font-semibold rounded-full hover:bg-emerald-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Our Products
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-emerald-700 transform hover:scale-105 transition-all duration-300">
                Contact Us
              </button>
            </div>
            </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-16 max-w-6xl mx-auto">
        {/* Company Introduction */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Doing Things the Right Way</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-cyan-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <p className="text-xl leading-relaxed text-gray-700 mb-6">
              At <strong className="text-emerald-700">Calyco Paints</strong>, we believe in doing things the right way. That's why we set out to make our paint the best it can be—combining cutting-edge sustainability with uncompromising performance.
            </p>
            <p className="text-xl leading-relaxed text-gray-700">
              Founded in 2023, we've developed our exclusive <strong className="text-emerald-700">EcoMax™ Technology</strong> that delivers gorgeous, vibrant hues with unsurpassed durability while maintaining zero-VOC formulations. It's the science behind Calyco's commitment to healthier living and environmental responsibility.
            </p>
          </div>

          {/* Technology Innovation Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">EcoMax™: The Science of Sustainable Strength</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Most traditional paint colorants require harsh chemicals that can weaken paint performance and indoor air quality. We realized that by developing our own eco-friendly colorants, designed specifically for our sustainable formulations, we could eliminate unnecessary chemicals that compromise both durability and health.
                </p>
                <p>
                  What we created is a formula that's <strong className="text-emerald-700">better, stronger, and cleaner</strong>—delivering exceptional color vibrancy while maintaining our commitment to zero-VOC, low-odor performance.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">🧪</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">EcoMax™ Technology</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  "EcoMax makes our paint cleaner on the inside and truer on the outside, delivering sustainable performance that lasts for years."
                </p>
                <p className="text-emerald-600 text-xs mt-3 font-medium">— ARMAAN KOTHARY, FOUNDER</p>
              </div>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Meet Our Founder</h3>
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  At the heart of this initiative is <strong className="text-emerald-700">Armaan Kothary</strong>, a young environmental
                  entrepreneur who launched Calyco Paints at the age of 16 with a vision to build smarter
                  solutions for sustainable home living.
                </p>
                <p>
                  His goal was to create a brand that combines environmental responsibility with design excellence—while offering safer and more breathable paints and coatings to Indian households and builders.
                </p>
                <p>
                  From product development and sourcing to formulation, testing, and outreach, Armaan leads every step of Calyco's operations, pioneering a cleaner, smarter, and more responsible way to paint and protect the future.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-3xl p-8 shadow-lg">
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">AK</span>
                  </div>
                  <h4 className="text-xl font-bold text-center text-gray-800 mb-2">Armaan Kothary</h4>
                  <p className="text-center text-gray-600">Founder & Innovator</p>
                  <p className="text-center text-sm text-emerald-600 mt-2">Age 16 at founding</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Superior Performance, Sustainable Results</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-cyan-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-xl mb-6 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded opacity-80"></div>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Interior Water-Based Latex Paints</h4>
              <p className="text-gray-600 leading-relaxed mb-4">
                Zero-VOC, quick-drying, and completely odor-free paints for walls and ceilings. Our EcoMax™ Technology ensures vibrant colors that resist fading indoors while maintaining exceptional durability.
              </p>
              <div className="text-sm text-emerald-600 font-medium">
                ✓ Zero-VOC Formula  ✓ Fade Resistant  ✓ Superior Coverage
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-cyan-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-xl mb-6 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded opacity-80"></div>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Multi-Surface Stains & Sealers</h4>
              <p className="text-gray-600 leading-relaxed mb-4">
                Advanced waterborne coatings for wood, concrete, masonry, and metal. Engineered to withstand harsh weather conditions while providing long-term protection and flexibility.
              </p>
              <div className="text-sm text-cyan-600 font-medium">
                ✓ Weather Resistant  ✓ Multi-Surface  ✓ Long-Lasting Protection
              </div>
            </div>
          </div>

          {/* Quality Promise Section */}
          <div className="bg-gradient-to-br from-gray-50 to-emerald-50 rounded-3xl p-8 md:p-12">
            <div className="grid lg:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-emerald-600 text-2xl">🎨</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">True Color Consistency</h4>
                <p className="text-gray-600">
                  Our proprietary EcoMax™ colorants ensure the exact color you choose stays vibrant and true for years, maintaining consistency across our entire spectrum.
                </p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-cyan-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-cyan-600 text-2xl">🛡️</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Ultra Durable Protection</h4>
                <p className="text-gray-600">
                  Engineered to resist fading, peeling, and cracking, our paints stand up to daily wear and harsh conditions so you repaint when you want to, not out of necessity.
                </p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-emerald-600 text-2xl">🌱</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Environmentally Responsible</h4>
                <p className="text-gray-600">
                  Zero-VOC waterborne tinting system ensures our low-VOC paints remain environmentally safe even after tinting—an innovation others can't replicate.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-3xl p-12 text-center text-white mb-12">
            <h3 className="text-3xl font-bold mb-6">The Future of Sustainable Painting</h3>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto mb-8">
              Through Calyco, we're making sustainability a standard, not a specialty, in Indian homes and construction. Every product is developed with meticulous attention to finish quality, color consistency, environmental safety, and real-world application performance.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold mb-2">0</div>
                <div className="text-sm uppercase tracking-wide">VOC Emissions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm uppercase tracking-wide">Water-Based Formula</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold mb-2">10+</div>
                <div className="text-sm uppercase tracking-wide">Years Durability</div>
              </div>
            </div>
          </div>

          {/* Research & Innovation */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-xl mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">🔬</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Pioneering Innovation</h4>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our commitment to research and development has positioned us as leaders in sustainable paint technology. We continuously innovate to create products that are effective, safe, and minimize environmental impact.
              </p>
              <div className="text-emerald-600 text-sm font-medium">
                ✓ In-house R&D facility  ✓ Proprietary formulations  ✓ Continuous testing
              </div>
            </div>
            
            <div>
              <h4 className="text-2xl font-bold text-gray-800 mb-6">What We're All About</h4>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-md border border-emerald-100">
                  <h5 className="text-lg font-semibold text-emerald-700 mb-3">🎨 Color Excellence</h5>
                  <p className="text-gray-600">
                    A carefully curated range of pigment-rich paint colors engineered for superior coverage and lasting vibrancy in both interior and exterior applications.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md border border-cyan-100">
                  <h5 className="text-lg font-semibold text-cyan-700 mb-3">💪 Uncompromising Quality</h5>
                  <p className="text-gray-600">
                    Our high-performance, scrubbable formula delivers perfectly even coverage and a long-lasting flawless finish every time, backed by our EcoMax™ Technology.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md border border-emerald-100">
                  <h5 className="text-lg font-semibold text-emerald-700 mb-3">🌱 Planet-First Approach</h5>
                  <p className="text-gray-600">
                    We put people and planet at the heart of every decision we make, from our innovative production process to our commitment to zero-VOC formulations.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md border border-cyan-100">
                  <h5 className="text-lg font-semibold text-cyan-700 mb-3">🤝 Building Better Homes</h5>
                  <p className="text-gray-600">
                    We're here to help transform Indian homes with sustainable solutions, providing expert guidance and premium products for every painting project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Transform Your Space?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Whether you're a professional contractor, interior designer, or homeowner looking for sustainable paint solutions, we're here to help you achieve exceptional results.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-cyan-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-cyan-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-cyan-600 text-xl">✉️</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
              <a href="mailto:info@calycopaints.com" className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
                info@calycopaints.com
              </a>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-emerald-600 text-xl">📞</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Contact Us</h4>
              <a href="https://wa.me/918826733064" className="text-sm text-cyan-600 hover:text-cyan-700 transition-colors font-semibold underline block mb-2" target="_blank" rel="noopener noreferrer">
                WhatsApp Message
              </a>
              <p className="text-xs text-gray-600">Mon–Sat, 10:00 AM – 6:00 PM IST</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-cyan-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-cyan-600 text-xl">🌐</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Website</h4>
              <a href="https://www.calycopaints.com" className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
                www.calycopaints.com
              </a>
            </div>
          </div>
          
          {/* Call-to-Action for Contact Page */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl p-8 text-white mb-6">
              <h4 className="text-xl font-bold mb-3">Get Expert Consultation</h4>
              <p className="text-emerald-100 mb-6">
                Have a specific project in mind? Need technical specifications or bulk pricing? Our team is ready to provide personalized solutions for your painting needs.
              </p>
              <a 
                href="https://calycopaints.com/contact" 
                className="inline-flex items-center px-8 py-4 bg-white text-emerald-700 font-semibold rounded-full hover:bg-emerald-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Contact Our Experts
                <span className="ml-2">→</span>
              </a>
            </div>
          </div>
          
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Calyco Paints Private Limited</strong> • Pioneering Sustainable Paint Solutions Since 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
