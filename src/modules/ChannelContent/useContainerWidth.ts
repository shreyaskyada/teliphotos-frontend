import { useCallback, useEffect, useState } from "react";

export const useContainerWidth = () => {
  const [containerWidth, setContainerWidth] = useState(1200);
  const [element, setElement] = useState<HTMLElement | null>(null);

  const containerRef = useCallback((node: HTMLElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    // Fast initial reading
    const computedStyle = getComputedStyle(element);
    const initialWidth = element.clientWidth - parseFloat(computedStyle.paddingLeft || "0") - parseFloat(computedStyle.paddingRight || "0");
    if (initialWidth > 0) {
      setContainerWidth((prev) => (prev !== initialWidth ? initialWidth : prev));
    }

    let timeoutId: NodeJS.Timeout;
    const ob = new ResizeObserver((entries) => {
      window.clearTimeout(timeoutId);
      const entry = entries[0];
      timeoutId = setTimeout(() => {
        const width = entry.contentRect.width;
        if (width > 0) {
          setContainerWidth((prev) => (prev !== width ? width : prev));
        }
      }, 30);
    });

    ob.observe(element);

    return () => {
      ob.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, [element]);

  return { containerRef, containerWidth };
};
