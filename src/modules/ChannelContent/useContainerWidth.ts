import { useEffect, useRef, useState } from "react";

export const useContainerWidth = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth - 300 : 1200
  ); // Default width accounting for sidebar

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    // Initial measurement
    updateWidth();

    // Set up resize observer for more accurate measurements
    const resizeObserver = new ResizeObserver(updateWidth);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Fallback to window resize listener
    window.addEventListener("resize", updateWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return { containerRef, containerWidth };
};
