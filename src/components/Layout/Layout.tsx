"use client";
import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { LayoutProps } from "./types";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      <Header
        onToggleMenu={handleToggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <section className="flex gap-1">
        <section className="h-auto">
          <Sidebar sidebarOpen={isSidebarOpen} />
        </section>
        <section>
          {children}

          <h1>HELLOOoooooooooo</h1>
        </section>
      </section>
    </div>
  );
};

export default Layout;
