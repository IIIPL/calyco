import { Link } from 'react-router-dom';

// Placeholder SVG icons for features
const CoatsIcon = () => (
  <svg className="w-5 h-5 text-[#493657] inline-block mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
);
const CoverageIcon = () => (
  <svg className="w-5 h-5 text-[#493657] inline-block mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 9h16M9 4v16" /></svg>
);
const PriceIcon = () => (
  <svg className="w-5 h-5 text-[#493657] inline-block mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" /></svg>
);

const ProductCard = ({
  id,
  name,
  image,
  coats,
  coverage,
  price,
  sizes,
  areaCoverage,
  finishTypeSheen,
  packaging,
}) => {
  // Find the smallest size and its price (assuming price is for 1L if available)
  let displaySize = sizes && sizes.length > 0 ? sizes[0] : null;
  let displayPrice = price;
  const target = id ? `/product/${encodeURIComponent(id)}` : '/product';

  return (
    <div className="p-0 w-full max-w-xs mx-auto flex flex-col items-start bg-transparent border-none shadow-none">
      <Link to={target} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="w-full flex mb-2 h-64">
        <img src={image} alt={name} className="w-full h-full object-contain drop-shadow-lg mix-blend-multiply" />
      </Link>
      <div className="mt-2 mb-1 text-[#493657] font-bold text-lg leading-tight uppercase text-left w-full" style={{wordBreak: 'break-word'}}>{name}</div>
      {/* Price prominently displayed */}
      {displayPrice && (
        <div className="text-[#493657] text-xl font-bold mb-1 w-full">₹{displayPrice} <span className="text-xs text-[#493657] font-medium">/ {displaySize || '1L'}</span></div>
      )}
      {/* Features */}
      <div className="flex flex-col gap-1 mb-2 w-full">
        {/* Area Coverage */}
        {areaCoverage && (
          <div className="flex items-center text-[#493657] text-base font-medium"><CoverageIcon />{areaCoverage}</div>
        )}
        {/* Finish Type & Sheen */}
        {finishTypeSheen && Array.isArray(finishTypeSheen) && finishTypeSheen.length > 0 && (
          <div className="flex items-center text-[#493657] text-sm font-medium">
            <span className="text-[#493657] mr-2">Finish:</span>
            {finishTypeSheen.slice(0, 2).join(', ')}
            {finishTypeSheen.length > 2 && '...'}
          </div>
        )}
        {/* Packaging */}
        {packaging && Array.isArray(packaging) && packaging.length > 0 && (
          <div className="flex items-center text-[#493657] text-sm font-medium">
            <span className="text-[#493657] mr-2">Sizes:</span>
            {packaging.slice(0, 3).join(', ')}
            {packaging.length > 3 && '...'}
          </div>
        )}
      </div>
      <div className="border-b border-[#e5e0d8] w-full my-2" />
      <div className="w-full flex justify-start">
        <Link 
          to={target}
          className="mt-1 px-4 py-2 bg-[#493657] text-white text-sm rounded hover:bg-[#5a4067] transition duration-300 font-semibold"
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
