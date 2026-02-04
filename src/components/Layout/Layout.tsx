"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { GlobalDropzone } from "./GlobalDropzone";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { LayoutProps } from "./types";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalDropzone>
        <div className="h-screen flex flex-col">
          <Header
            onToggleMenu={handleToggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
          <section className="flex flex-1 overflow-hidden">
            <section className="h-full">
              <Sidebar sidebarOpen={isSidebarOpen} />
            </section>
            <section className="flex-1 overflow-auto min-h-0">{children}</section>
          </section>
        </div>
      </GlobalDropzone>
    </QueryClientProvider>
  );
};

export default Layout;
