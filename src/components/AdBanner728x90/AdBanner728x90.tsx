"use client";

import { useEffect, useRef } from "react";

/**
 * 728×90 Leaderboard Ad Unit (Desktop)
 * Uses an isolated iframe srcdoc so window.atOptions doesn't 
 * conflict with any other ad units on the same page.
 * 
 * IMPORTANT: You must replace 'YOUR_728x90_MONETAG_ZONE_KEY' 
 * with a valid key generated from your Monetag dashboard for this resolution.
 */
const AdBanner728x90 = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current || !iframeRef.current) return;
    injected.current = true;

    // Update the 'key' below to your actual 728x90 Monetag zone key.
    const YOUR_ZONE_KEY = "c8ad73f96ccd7b14545b3eea9b4359fb";

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
    'key': '${YOUR_ZONE_KEY}',
    'format': 'iframe',
    'height': 90,
    'width': 728,
    'params': {}
  };
<\/script>
<script src="https://www.highperformanceformat.com/${YOUR_ZONE_KEY}/invoke.js"><\/script>
</body>
</html>`;

    iframeRef.current.srcdoc = html;
  }, []);

  return (
    <div
      style={{
        width: 728,
        height: 90,
        borderRadius: 8,
        overflow: "hidden",
        flexShrink: 0,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <iframe
        ref={iframeRef}
        width={728}
        height={90}
        style={{ border: "none", display: "block" }}
        scrolling="no"
        title="Advertisement 728x90"
      />
    </div>
  );
};

export default AdBanner728x90;
