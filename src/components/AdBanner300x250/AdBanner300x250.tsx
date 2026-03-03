"use client";

import { useEffect, useRef } from "react";

/**
 * 300×250 Medium Rectangle Ad Unit
 * Uses an isolated iframe srcdoc so window.atOptions doesn't 
 * conflict with any other ad units on the same page.
 */
const AdBanner300x250 = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current || !iframeRef.current) return;
    injected.current = true;

    const html = `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: transparent; overflow: hidden; }
</style>
</head>
<body>
<script>
  atOptions = {
    'key': 'b73978964bd99e20414c74af283322f2',
    'format': 'iframe',
    'height': 250,
    'width': 300,
    'params': {}
  };
<\/script>
<script src="https://www.highperformanceformat.com/b73978964bd99e20414c74af283322f2/invoke.js"><\/script>
</body>
</html>`;

    iframeRef.current.srcdoc = html;
  }, []);

  return (
    <div
      style={{
        width: 300,
        height: 250,
        borderRadius: 8,
        overflow: "hidden",
        flexShrink: 0,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <iframe
        ref={iframeRef}
        width={300}
        height={250}
        style={{ border: "none", display: "block" }}
        scrolling="no"
        title="Advertisement 300x250"
      />
    </div>
  );
};

export default AdBanner300x250;
