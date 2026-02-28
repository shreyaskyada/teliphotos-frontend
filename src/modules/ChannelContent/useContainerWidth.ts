import { useEffect, useState } from "react";

export const useContainerWidth = () => {
  const [containerWidth, setContainerWidth] = useState(1200);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const updateWidth = () => {
      // documentElement.clientWidth correctly removes the OS vertical scrollbar width
      const screenWidth = document.documentElement.clientWidth;
      
      // If we are on large screen desktop (lg: >= 1024px), sidebar is 280px static.
      // If smaller, sidebar is hidden off-screen or overlays via mobile menu.
      const isDesktop = screenWidth >= 1024;
      const sidebarWidth = isDesktop ? 280 : 0;
      
      const newWidth = screenWidth - sidebarWidth;
      
      if (newWidth > 0 && newWidth !== containerWidth) {
         setContainerWidth(newWidth);
      }
    };

    // Fast immediate trigger on mount
    updateWidth();

    // Re-measure continuously on any window resize or layout shift
    const ob = new ResizeObserver(() => {
       window.clearTimeout(timeoutId);
       timeoutId = setTimeout(updateWidth, 50);
    });
    ob.observe(document.body);

    window.addEventListener("resize", updateWidth);

    return () => {
      ob.disconnect();
      window.removeEventListener("resize", updateWidth);
      window.clearTimeout(timeoutId);
    };
  }, [containerWidth]);

  // Return empty function for ref so ChannelContent doesn't crash expecting a ref
  return { containerRef: () => {}, containerWidth };
};
