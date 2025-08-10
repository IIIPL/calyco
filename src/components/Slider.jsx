import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Slider = () => {
  const [translateX, setTranslateX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isChevronClick, setIsChevronClick] = useState(false);
  const [autoScrollDirection, setAutoScrollDirection] = useState(-1); // -1 for left, 1 for right
  const sliderRef = useRef(null);
  const autoScrollRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const navigate = useNavigate();

  // Sample cards data
const cards = [
  { id: 1, title: "Wood Finishes", subtitle: "Warm & welcoming", color: "bg-gradient-to-br from-rose-700 to-amber-700" },
  { id: 2, title: "Primer", subtitle: "Focused & productive", color: "bg-gradient-to-br from-indigo-800 to-slate-700" },
  // { id: 3, title: "Distempers", subtitle: "Clean & calming", color: "bg-gradient-to-br from-emerald-700 to-teal-800" },
  { id: 4, title: "Metal Coating", subtitle: "Modern & elegant", color: "bg-gradient-to-br from-zinc-700 to-neutral-800" },
  { id: 5, title: "Concrete & Floor", subtitle: "Earthy & rustic", color: "bg-gradient-to-br from-amber-800 to-orange-900" },
  // { id: 6, title: "", subtitle: "Creative & bold", color: "bg-gradient-to-br from-fuchsia-800 to-purple-900" }
];

  const cardWidth = 400; // Width of each card in pixels
  const cardGap = 4; // Gap between cards
  const totalCardWidth = cardWidth + cardGap;

  // Create extended array for seamless infinite scroll
  const extendedCards = [...cards, ...cards, ...cards];

  // Initialize the slider position to start with the middle set of cards
  useEffect(() => {
    // Start with the middle set of cards (second copy) to allow seamless scrolling in both directions
    setTranslateX(-(totalCardWidth * cards.length));
  }, []);

  // Auto scroll function with requestAnimationFrame for better performance
  useEffect(() => {
    if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
    
    if (!isHovered && !isScrolling) {
      const animate = () => {
        setTranslateX(prev => prev + (autoScrollDirection * 0.5)); // Use stored direction
        autoScrollRef.current = requestAnimationFrame(animate);
      };
      autoScrollRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
    };
  }, [isHovered, isScrolling]);

  // Handle infinite scroll reset
  useEffect(() => {
    const maxScroll = -(totalCardWidth * cards.length * 2); // Two sets of cards
    const minScroll = 0; // First set of cards
    
    if (translateX <= maxScroll) {
      setTranslateX(-(totalCardWidth * cards.length)); // Reset to middle set
    } else if (translateX >= minScroll) {
      setTranslateX(-(totalCardWidth * cards.length)); // Reset to middle set
    }
  }, [translateX, totalCardWidth, cards.length]);

  // Enhanced wheel/trackpad scroll handling with better gesture prevention
  const handleWheel = (e) => {
    // Prevent all default behaviors including navigation gestures
    e.preventDefault();
    e.stopPropagation();
    
    // Set scrolling state
    setIsScrolling(true);
    
    // Clear previous timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Get scroll delta with intensity
    const deltaX = e.deltaX;
    const deltaY = e.deltaY;
    
    // Only handle horizontal scrolling, but with more lenient check
    if (Math.abs(deltaX) < Math.abs(deltaY) * 0.5) return; // More lenient horizontal scroll detection
    
    const delta = deltaX;
    
    // Apply scroll with full intensity (much more responsive)
    const intensity = Math.min(Math.abs(delta), 100); // Higher cap for more responsive feel
    const direction = delta > 0 ? -1 : 1;
    const scrollAmount = intensity * direction * 1.5; // Much higher sensitivity for manual scroll
    
    // Store the scroll direction for auto-scroll (but don't change auto-scroll speed)
    setAutoScrollDirection(direction);
    
    setTranslateX(prev => prev + scrollAmount);
    
    // Reset scrolling state after a delay
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 200); // Longer delay to allow for smooth transitions
  };

  // Touch handling for mobile with gesture prevention
  const [touchStart, setTouchStart] = useState(null);
  const [touchCurrent, setTouchCurrent] = useState(null);
  const [lastTouchX, setLastTouchX] = useState(0);

  const handleTouchStart = (e) => {
    const touch = e.targetTouches[0].clientX;
    setTouchStart(touch);
    setLastTouchX(touch);
    setIsScrolling(true);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    
    // Prevent default touch behaviors including navigation gestures
    e.preventDefault();
    e.stopPropagation();
    
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - lastTouchX;
    
    // Much more responsive touch movement
    if (Math.abs(diff) > 0.5) {
      setTranslateX(prev => prev + diff * 2.5); // Much higher sensitivity for manual touch
      setLastTouchX(currentTouch);
      
      // Store touch direction for auto-scroll (but don't change auto-scroll speed)
      const touchDirection = diff > 0 ? 1 : -1;
      setAutoScrollDirection(touchDirection);
    }
    setTouchCurrent(currentTouch);
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
    setTouchCurrent(null);
    
    // Reset scrolling state after a delay
    setTimeout(() => {
      setIsScrolling(false);
    }, 200); // Longer delay for smoother transition back to auto-scroll
  };

  // Enhanced pointer events for better gesture control
  const handlePointerDown = (e) => {
    if (e.pointerType === 'touch') {
      // Allow touch events to be handled by touch handlers
      return;
    }
    // Prevent default for mouse/trackpad events
    e.preventDefault();
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Force re-evaluate animation condition
        setIsHovered(false);
        setIsScrolling(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Additional effect to handle global gesture prevention
  useEffect(() => {
    const sliderElement = sliderRef.current;
    if (!sliderElement) return;

    // Add passive: false to ensure preventDefault works
    const wheelHandler = (e) => {
      // Only prevent if the event is within our slider
      if (sliderElement.contains(e.target)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const touchHandler = (e) => {
      // Only prevent if the event is within our slider and it's a horizontal gesture
      if (sliderElement.contains(e.target) && e.touches.length === 1) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Add event listeners with passive: false to allow preventDefault
    document.addEventListener('wheel', wheelHandler, { passive: false });
    document.addEventListener('touchmove', touchHandler, { passive: false });

    return () => {
      document.removeEventListener('wheel', wheelHandler);
      document.removeEventListener('touchmove', touchHandler);
    };
  }, []);

  // Handle chevron navigation with smooth swipe feel
  const handleChevronClick = (direction) => {
    setIsScrolling(true);
    setIsChevronClick(true); // Enable Tailwind transition
    
    // Clear previous timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Move by one full card width for natural swipe feel
    const scrollAmount = direction === 'left' ? totalCardWidth : -totalCardWidth;
    setTranslateX(prev => prev + scrollAmount);
    
    // Store the scroll direction for auto-scroll
    setAutoScrollDirection(direction === 'left' ? 1 : -1);
    
    // Reset states after animation completes
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      setIsChevronClick(false); // Disable transition for manual scrolling
    }, 500); // Match the duration-500 (500ms)
  };

  return (
    <div className="w-full overflow-hidden py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-black">
        Explore By Categories
      </h2>
      
      <div 
        className="relative w-full select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onPointerDown={handlePointerDown}
        ref={sliderRef}
        style={{ 
          touchAction: 'pan-y pinch-zoom', // Allow vertical scroll and zoom, prevent horizontal gestures
          overscrollBehavior: 'contain' // Prevent overscroll from triggering navigation
        }}
      >
        
        {/* Left Chevron */}
        <button 
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
          }`}
          onClick={() => handleChevronClick('left')}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Right Chevron */}
        <button 
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
          onClick={() => handleChevronClick('right')}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        <div 
          className={`flex ${isChevronClick ? 'transition-transform duration-500 ease-out' : ''}`}
          style={{ 
            transform: `translateX(${translateX}px)`,
            gap: `${cardGap}px`,
            willChange: 'transform'
          }}
        >
          {extendedCards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              onClick={() => navigate(`/product?search=${encodeURIComponent(card.title)}`)}
              className={`flex-shrink-0 ${card.color} text-white rounded-xl flex flex-col justify-between shadow-lg hover:shadow-xl transition-transform duration-500 cursor-pointer group transform hover:scale-95`}
              style={{ width: `${cardWidth}px`, height: '200px' }}
            >
              <div className="relative h-64 rounded-xl overflow-hidden">
                <h3 className="absolute bottom-4 left-4 text-5xl font-extrabold text-white leading-tight">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;