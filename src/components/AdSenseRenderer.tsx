"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

export function AdSenseRenderer() {
  const pathname = usePathname();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // AdSense only runs on public pages. The dashboard shows users' private photos,
    // which isn't publisher content and can't be reviewed for AdSense policy compliance.
    if (pathname === "/login" || pathname.startsWith("/dashboard")) {
      setShouldLoad(false);
    } else {
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
