"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import AdBanner160x600 from "../AdBanner160x600";
import { GlobalDropzone } from "./GlobalDropzone";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { LayoutProps } from "./types";

const queryClient = new QueryClient();

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalDropzone>
        <div className="h-screen flex flex-col">
          <Header
            onToggleMenu={handleToggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
          <section className="flex flex-1 overflow-hidden">
            {/* Left: Channel Sidebar */}
            <section className="h-full">
              <Sidebar sidebarOpen={isSidebarOpen} />
            </section>

            {/* Centre: Main content (photo grid) */}
            <section className="flex-1 overflow-auto min-h-0">{children}</section>

            {/* Right: Ad sidebar — hidden on mobile, visible on large screens */}
            <aside
              aria-label="Advertisement sidebar"
              className="hidden xl:flex flex-col items-center py-6 px-2 gap-4 border-l border-border/40 bg-background/50 shrink-0"
              style={{ width: 184 }}
            >
              <span
                style={{
                  fontSize: 9,
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  userSelect: "none",
                }}
              >
                Advertisement
              </span>
              <div className="sticky top-6">
                <AdBanner160x600 />
              </div>
            </aside>
          </section>
        </div>
      </GlobalDropzone>
    </QueryClientProvider>
  );
};

export default Layout;

