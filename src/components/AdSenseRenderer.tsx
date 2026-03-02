"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

export function AdSenseRenderer() {
  const pathname = usePathname();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Determine if we should load ads globally based on pathname
    if (pathname === "/login") {
      setShouldLoad(false);
    } else if (pathname === "/dashboard") {
      // Empty dashboard default screen -> no meaningful content
      setShouldLoad(false);
    } else {
      // For all public pages and specific dashboard sub-channels (if they have content)
      setShouldLoad(true);
    }
  }, [pathname]);

  if (!shouldLoad) return null;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1375243567926496"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
