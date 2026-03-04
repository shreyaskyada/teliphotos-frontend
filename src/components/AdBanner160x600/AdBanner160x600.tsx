"use client";

import { useEffect, useRef } from "react";

/**
 * 160×600 Wide Skyscraper Ad Unit
 * Uses an isolated iframe srcdoc so window.atOptions doesn't
 * conflict with any other ad units on the same page.
 */
const AdBanner160x600 = () => {
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
    'key': '0ef08852f7327f12d9e0881d4508b99c',
    'format': 'iframe',
    'height': 600,
    'width': 160,
    'params': {}
  };
<\/script>
<script src="https://www.highperformanceformat.com/0ef08852f7327f12d9e0881d4508b99c/invoke.js"><\/script>
</body>
</html>`;

    iframeRef.current.srcdoc = html;
  }, []);

  return (
    <div
      style={{
        width: 160,
        height: 600,
        borderRadius: 8,
        overflow: "hidden",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <iframe
        ref={iframeRef}
        width={160}
        height={600}
        style={{ border: "none", display: "block" }}
        scrolling="no"
        title="Advertisement 160x600"
      />
    </div>
  );
};

export default AdBanner160x600;
