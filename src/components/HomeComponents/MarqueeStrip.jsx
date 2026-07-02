import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Tag } from 'lucide-react';

const MarqueeStrip = () => {
  const [visible, setVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!visible) return null;

  const copyCode = () => {
    navigator.clipboard.writeText('CALYCO20').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-[#493657] text-white relative">
      <div className="max-w-7xl mx-auto pr-8 pl-4 sm:px-8 lg:px-12 py-2 flex items-center justify-center gap-2 sm:gap-4">

        {/* Mobile: compact single row */}
        <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F0C85A] flex-shrink-0" />

        <span className="text-[11px] sm:text-sm font-medium whitespace-nowrap">
          <span className="hidden sm:inline">Use code </span>
          <span className="sm:hidden">20% off -- </span>
        </span>

        <button
          onClick={copyCode}
          className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-[#F0C85A] text-[#0F1221] px-2.5 sm:px-3 py-0.5 text-[10px] sm:text-xs font-bold hover:bg-white transition-colors flex-shrink-0"
        >
          CALYCO20
          <span className="text-[11px] sm:text-[10px] font-normal opacity-70">{copied ? '✓' : 'Copy'}</span>
        </button>

        <span className="text-[11px] sm:text-sm font-medium text-white/85 whitespace-nowrap">
          <span className="hidden sm:inline">for 20% off your first order</span>
          <span className="sm:hidden">first order</span>
        </span>

        <span className="hidden sm:inline text-white/30 flex-shrink-0">·</span>
        <div className="hidden sm:flex items-center gap-2 text-white/75 text-sm">
          <span>Painting across 25 cities in India</span>
          <Link to="/services" className="text-[#F0C85A] font-semibold hover:underline text-xs">View →</Link>
        </div>
      </div>

      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss banner"
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-1"
      >
        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
};

export default MarqueeStrip;
