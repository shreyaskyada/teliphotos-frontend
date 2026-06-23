"use client";

import { useEffect, useRef } from "react";

interface NativeBannerProps {
  className?: string;
  zoneId?: string;
}

/**
 * NativeBanner Component
 * Renders a responsive native ad unit inside an isolated iframe srcdoc.
 * This prevents Monetag's scripts from clashing with React or other ad units.
 */
const NativeBanner = ({ className = "", zoneId = "YOUR_NATIVE_ZONE_ID" }: NativeBannerProps) => {
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
    body { background: transparent; overflow: hidden; font-family: sans-serif; }
    /* Hide scrollbars completely */
    ::-webkit-scrollbar { display: none; }
  </style>
</head>
<body>
  <div id="monetag-native-${zoneId}"></div>
  <script>
    (function(s,u,z,p){
      s.src=u;
      s.setAttribute('data-zone',z);
      p.appendChild(s);
    })(
      document.createElement('script'),
      'https://inklinkor.com/tag.min.js',
      '${zoneId}',
      document.body
    );
  </script>
</body>
</html>`;

    iframeRef.current.srcdoc = html;
  }, [zoneId]);

  return (
    <div
      className={`w-full overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-2 flex items-center justify-center ${className}`}
      style={{ minHeight: 250 }}
    >
      <iframe
        ref={iframeRef}
        className="w-full h-[600px]"
        style={{ border: "none", display: "block" }}
        scrolling="no"
        title="Recommended Content"
      />
    </div>
  );
};

export default NativeBanner;
