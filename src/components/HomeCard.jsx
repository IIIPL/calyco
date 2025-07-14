import { useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import {Link} from 'react-router-dom'

const paintData = {
  "Interior": {
    img: "/Assets/novaa.png",
    desc: "Bright white finish with durable indoor protection.",
    link: "product",
    bgCol: "[#b38312]"
  },
  "Stain & Sealer": {
    img: "/Assets/defence.png",
    desc: "Elegant blue tones perfect for modern interiors.",
    link: "product",
    bgCol: "[#493657]"
  },
  default: {
    img: "paintBucket.jpg",
    desc: "This paint provides rich color and premium quality for your interior walls.",
    bgCol: ""
  },
};

export const HomeCard = ({ index = 0, paintName = "paintname" }) => {
  const curtainRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const { img, desc, link, bgCol } = paintData[paintName] || paintData.default;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 300);
        }
      },
      { threshold: 0.4 }
    );

    if (curtainRef.current) observer.observe(curtainRef.current);
    return () => {
      if (curtainRef.current) observer.unobserve(curtainRef.current);
    };
  }, [index]);

  return (
    <div className="bg-white w-[22rem] min-h-[440px] rounded-xl flex flex-col items-center relative p-4 border border-black transition duration-300">
      {/* Image with fixed height */}
      <div
        className="relative w-full h-[200px] overflow-hidden rounded-xl border border-[#B5B5B5]"
        ref={curtainRef}
      >
        <img
          src={img}
          alt={paintName}
          className="w-full h-full object-contain hover:scale-125 transition duration-300"
        />
        <div
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out z-10 transform-gpu ${
            visible ? "translate-y-full" : "translate-y-0"
          } bg-${bgCol}`}
        ></div>
      </div>

      {/* Heading */}
      <div className="font-semibold w-full text-left ml-2 text-2xl mt-5">
        {paintName}
      </div>

      {/* Description */}
      <div className="text-left text-sm text-gray-700 w-full ml-2 mt-1">
        {desc}
      </div>

      <div className="w-full mt-auto flex justify-end pt-5">
        <div className="w-10 h-10 bg-[#493657] text-[#F0C85A] rounded flex items-center justify-center text-xl">
          <Link 
            to={`/${link}`}
            onClick={() => window.scrollTo({ top: 0, behavior : "smooth" })}  
          >
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};
