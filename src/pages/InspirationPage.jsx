import React from "react";
import { useNavigate } from "react-router-dom";

const ROOMS = [
  { title: "Exterior", category: "Exterior", designs: 88, thumbnail: "/Assets/Inspiration/IMG-20250718-WA0045.jpg" },
  { title: "Living", category: "Interior", designs: 118, thumbnail: "/Assets/Inspiration/living.jpg" },
  { title: "Bedroom", category: "Interior", designs: 111, thumbnail: "/Assets/Inspiration/bedroom.jpg" },
  { title: "Dining", category: "Dining", designs: 40, thumbnail: "/Assets/Inspiration/dining.jpg" },
  { title: "Kitchen", category: "Kitchen", designs: 22, thumbnail: "/Assets/Inspiration/IMG-20250718-WA0043.jpg" },
  { title: "Office", category: "Interior", designs: 48, thumbnail: "/Assets/Inspiration/IMG-20250718-WA0044.jpg" },
  { title: "Hallway", category: "Interior", designs: 28, thumbnail: "/Assets/Inspiration/IMG-20250718-WA0042.jpg" },
  { title: "Bathroom", category: "Bathroom", designs: 1, thumbnail: "/Assets/Inspiration/IMG-20250718-WA0041.jpg" },
];

const SECTION_ORDER = ["Interior", "Kitchen", "Dining", "Bathroom", "Exterior"];

export default function InspirationPage() {
  const navigate = useNavigate();

  return (
    <div className="font-poppins bg-gradient-to-br from-gray-50 to-white min-h-screen pt-32 pb-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 mt-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Design Inspiration
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover beautiful color combinations and design ideas for every room in your home
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#F0C85A] rounded-full"></div>
              Curated Collections
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#493657] rounded-full"></div>
              Expert Color Palettes
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#F0C85A] rounded-full"></div>
              Real Room Examples
            </span>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Loop through ordered sections */}
        {SECTION_ORDER.map((section) => {
          const sectionRooms = ROOMS.filter((room) => room.category === section);
          if (sectionRooms.length === 0) return null;

          return (
            <div key={section} className="mb-24">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{section}</h2>
                  <p className="text-gray-600 text-lg">
                    {section === "Interior" && "Transform your living spaces with stunning interior design"}
                    {section === "Kitchen" && "Create a kitchen that inspires cooking and gathering"}
                    {section === "Dining" && "Set the perfect mood for memorable meals"}
                    {section === "Bathroom" && "Refresh your bathroom with spa-like tranquility"}
                    {section === "Exterior" && "Make a lasting first impression with stunning exteriors"}
                  </p>
                </div>
                <button 
                  onClick={() => navigate(`/inspirations/${section.toLowerCase()}`)}
                  className="hidden md:flex items-center gap-2 px-6 py-3 bg-[#493657] text-white rounded-lg hover:bg-[#5a4067] transition-colors duration-200 font-medium"
                >
                  View All {section}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sectionRooms.map((room) => {
                  const slug = room.title.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <div
                      key={room.title}
                      onClick={() => navigate(`/inspirations/${slug}`)}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                    >
                      {/* Image Container */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={room.thumbnail}
                          alt={`${room.title} room design inspiration`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          draggable="false"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center justify-between text-white">
                              <span className="text-sm font-medium">{room.designs} designs</span>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                  
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#493657] transition-colors">
                          {room.title}
                        </h3>
                        
                        {/* Color Palette */}
                        <div className="flex gap-2 mb-4">
                          <div className="w-8 h-8 rounded-full bg-[#BA2B2B] border-2 border-white shadow-sm"></div>
                          <div className="w-8 h-8 rounded-full bg-[#D6CBB6] border-2 border-white shadow-sm"></div>
                          <div className="w-8 h-8 rounded-full bg-[#7E7266] border-2 border-white shadow-sm"></div>
                          <div className="w-8 h-8 rounded-full bg-[#F0C85A] border-2 border-white shadow-sm"></div>
                        </div>
                        
                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span className="font-medium">{room.designs} design variations</span>
                          <span className="text-[#493657] font-semibold">Explore →</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Mobile View All Button */}
              <div className="md:hidden mt-6">
                <button 
                  onClick={() => navigate(`/inspirations/${section.toLowerCase()}`)}
                  className="w-full py-3 bg-[#493657] text-white rounded-lg hover:bg-[#5a4067] transition-colors duration-200 font-medium"
                >
                  View All {section}
                </button>
              </div>
            </div>
          );
        })}
        
        {/* Call to Action Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-[#493657] to-[#5a4067] rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Space?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Explore our complete collection of colors and get expert advice on creating the perfect atmosphere for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/colors')}
                className="px-8 py-4 bg-white text-[#493657] rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Browse Color Collection
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#493657] transition-colors duration-200"
              >
                Get Expert Advice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
