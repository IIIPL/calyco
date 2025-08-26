import React from 'react';

const NavigationArrows = ({ 
  onPrevious, 
  onNext, 
  showPrevious = true, 
  showNext = true,
  className = "",
  size = "md" // sm, md, lg
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {showPrevious && (
        <button
          onClick={onPrevious}
          className={`
            ${sizeClasses[size]} 
            rounded-full 
            bg-gray-800/80 
            backdrop-blur-sm 
            border 
            border-gray-700/50 
            flex 
            items-center 
            justify-center 
            text-white 
            hover:bg-gray-700/90 
            hover:border-gray-600/70 
            transition-all 
            duration-300 
            hover:scale-105 
            shadow-lg 
            hover:shadow-xl
            focus:outline-none 
            focus:ring-2 
            focus:ring-gray-600/50
          `}
          aria-label="Previous"
        >
          <svg 
            className={`${iconSizes[size]} transform -translate-x-0.5`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </button>
      )}
      
      {showNext && (
        <button
          onClick={onNext}
          className={`
            ${sizeClasses[size]} 
            rounded-full 
            bg-gray-800/80 
            backdrop-blur-sm 
            border 
            border-gray-700/50 
            flex 
            items-center 
            justify-center 
            text-white 
            hover:bg-gray-700/90 
            hover:border-gray-600/70 
            transition-all 
            duration-300 
            hover:scale-105 
            shadow-lg 
            hover:shadow-xl
            focus:outline-none 
            focus:ring-2 
            focus:ring-gray-600/50
          `}
          aria-label="Next"
        >
          <svg 
            className={`${iconSizes[size]} transform translate-x-0.5`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default NavigationArrows;
