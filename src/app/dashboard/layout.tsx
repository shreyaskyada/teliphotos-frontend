import { Layout } from "@telephotos/components";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Preconnect to Cloudflare R2 — eliminates TCP/TLS handshake latency for grid images (LCP) */}
      <link rel="preconnect" href="https://pub-1.r2.dev" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://pub-1.r2.dev" />
      <link rel="preconnect" href="https://r2.cloudflarestorage.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://r2.cloudflarestorage.com" />
      <Layout>{children}</Layout>
    </>
  );
}
