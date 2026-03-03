"use client";

import { useEffect, useRef } from "react";

/**
 * Monetag 300×250 Medium Rectangle Ad Unit
 * Rendered inline — safe to mount multiple times on the page.
 */
const AdBanner300x250 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current || !containerRef.current) return;
    injected.current = true;

    // Set atOptions on window then load invoke.js into this container
    const win = window as any;
    win.atOptions = {
      key: "b73978964bd99e20414c74af283322f2",
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    };

    const script = document.createElement("script");
    script.src =
      "https://www.highperformanceformat.com/b73978964bd99e20414c74af283322f2/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div
      style={{
        width: 300,
        height: 250,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 8,
        overflow: "hidden",
        flexShrink: 0,
      }}
      ref={containerRef}
    />
  );
};

export default AdBanner300x250;
