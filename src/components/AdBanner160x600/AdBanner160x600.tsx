"use client";

import { useEffect, useRef } from "react";

/**
 * 160×600 Wide Skyscraper Ad Unit
 * Designed to sit in a fixed right sidebar column.
 */
const AdBanner160x600 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current || !containerRef.current) return;
    injected.current = true;

    const win = window as any;
    win.atOptions = {
      key: "0ef08852f7327f12d9e0881d4508b99c",
      format: "iframe",
      height: 600,
      width: 160,
      params: {},
    };

    const script = document.createElement("script");
    script.src =
      "https://www.highperformanceformat.com/0ef08852f7327f12d9e0881d4508b99c/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: 160,
        minHeight: 600,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 8,
        overflow: "hidden",
      }}
    />
  );
};

export default AdBanner160x600;
