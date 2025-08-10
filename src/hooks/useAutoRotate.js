// src/hooks/useAutoRotate.js
import { useEffect, useRef } from "react";

export default function useAutoRotate({ activeIndex, setActiveIndex, count, delay=5000, paused }) {
  const saved = useRef({ activeIndex, paused });
  saved.current = { activeIndex, paused };
  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % count);
    }, delay);
    return () => clearInterval(id);
  }, [count, delay, paused, setActiveIndex]);
}
