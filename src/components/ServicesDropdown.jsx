import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MobileChevron from './MobileChevron';

const services = [
  { name: 'Interior Painting', path: '/services/interior-painting', price: '₹18+', icon: '🏠' },
  { name: 'Exterior Painting', path: '/services/exterior-painting', price: '₹24+', icon: '🏗️' },
  { name: 'Full Home Painting', path: '/services/full-house-painting', price: '₹18+', icon: '🏡' },
  { name: 'Waterproofing', path: '/services/terrace-waterproofing', price: '₹45+', icon: '💧' },
  { name: 'Texture & Stencil', path: '/services/texture-painting', price: '₹55+', icon: '✦' },
  { name: 'Wallpaper', path: '/services/wallpaper-installation', price: '₹35+', icon: '🖼️' },
  { name: 'Wood Polish', path: '/services/wood-polish', price: '₹70+', icon: '🪵' },
  { name: 'Metal Painting', path: '/services/gate-painting', price: '₹35+', icon: '⚙️' },
  { name: 'Tile Grouting', path: '/services/tile-grouting', price: '₹25+', icon: '🔲' },
  { name: 'Calculate Cost', path: '/calculators/service-cost-calculator', price: null, icon: '🧮' },
];

const ServicesDropdown = ({ onSelect, isMobile = false }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (isMobile) {
    return (
      <div className="w-full flex flex-col items-start border-b border-[#e5e0d8]/50">
        <button
          onClick={() => setOpen(!open)}
          className="text-[#493657] hover:text-[#F0C85A] py-4 flex justify-between items-center w-full transition-colors duration-300"
        >
          <span className="text-lg font-medium">Services</span>
          <MobileChevron open={open} />
        </button>
        <div className={`transition-all duration-500 ease-[bezier(0.4,0,0.2,1)] overflow-hidden ${open ? 'max-h-[900px] opacity-100 mb-4' : 'max-h-0 opacity-0'} w-full`}>
          <div className="pl-4 flex flex-col gap-1">
            {services.map((service) => (
              <Link
                key={service.path}
                to={service.path}
                onClick={() => {
                  setOpen(false);
                  if (onSelect) onSelect();
                }}
                className="flex items-center justify-between py-2 pr-2 text-sm text-gray-600 hover:text-[#493657] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{service.icon}</span>
                  {service.name}
                </span>
                {service.price && (
                  <span className="text-[11px] font-semibold text-[#998850]">{service.price}/sq ft</span>
                )}
              </Link>
            ))}
            <Link
              to="/services"
              onClick={() => { setOpen(false); if (onSelect) onSelect(); }}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-[#493657] text-white py-2.5 text-sm font-semibold hover:bg-[#F0C85A] hover:text-[#0F1221] transition-colors"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-[6.5rem] w-full bg-white border-t border-b border-[#e5e0d8] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] z-50 font-poppins">
      <div className="max-w-screen-xl mx-auto px-10 lg:px-24 py-10 grid grid-cols-[260px_1fr] gap-10">
        {/* Left panel */}
        <div className="border-r border-[#e5e0d8]/70 pr-8 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-3">Services</p>
            <h3 className="text-2xl font-bold text-[#0F1221] leading-tight">Professional site services with transparent pricing.</h3>
            <p className="text-sm text-gray-500 mt-3 leading-relaxed">60+ services across 25 cities in India.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              navigate('/services');
              if (onSelect) onSelect();
            }}
            className="mt-6 rounded-full bg-[#493657] text-white px-5 py-3 text-sm font-semibold hover:bg-[#F0C85A] hover:text-[#0F1221] transition-colors self-start"
          >
            View All Services
          </button>
        </div>

        {/* Right grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
          {services.map((service) => (
            <Link
              key={service.path}
              to={service.path}
              onClick={() => {
                window.scrollTo({ top: 0 });
                if (onSelect) onSelect();
              }}
              className="group rounded-xl border border-transparent p-3.5 text-[#493657] hover:border-[#e5e0d8] hover:bg-[#FBF9F6] transition-all"
            >
              <span className="block text-2xl mb-2">{service.icon}</span>
              <span className="block font-semibold text-sm text-gray-900 group-hover:text-[#493657]">{service.name}</span>
              {service.price ? (
                <span className="block text-xs text-[#998850] mt-1 font-semibold">{service.price}/sq ft</span>
              ) : (
                <span className="block text-xs text-[#493657] mt-1">Universal calculator</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesDropdown;
