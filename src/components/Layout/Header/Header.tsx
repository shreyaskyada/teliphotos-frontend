"use client";

import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AvatarProfile } from "./UserProfile";

type HeaderProps = {
  onToggleMenu: () => void;
  isSidebarOpen: boolean;
};

const Header: React.FC<HeaderProps> = ({ onToggleMenu, isSidebarOpen }) => {

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left side - Logo + Menu */}
        <div className="flex items-center space-x-4">
          <button
            type="button"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={isSidebarOpen}
            aria-controls="app-sidebar"
            className="md:p-2 hover:bg-muted rounded-full transition-colors duration-200 lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => onToggleMenu()}
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>

          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity" aria-label="Telephotos — Go to home">
            <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center">
              <Image src="/logo.png" alt="" width={36} height={36} className="w-full h-full object-cover" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Telephotos</span>
          </Link>
        </div>

        {/* Right side - Search, Upload, Profile */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <label htmlFor="dashboard-search" className="sr-only">Search photos</label>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <input
              id="dashboard-search"
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-muted/50 border border-transparent rounded-full text-sm text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary/20 focus:bg-background focus:border-primary/20 transition-all duration-200 w-64 md:w-80 outline-none"
            />
          </div>



          {/* Profile Dropdown */}
          <AvatarProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;


