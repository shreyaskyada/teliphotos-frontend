"use client";

import { Button } from "@telephotos/ui";
import { Menu, Search, Upload, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useUpload } from "../GlobalDropzone/UploadContext";
import { AvatarProfile } from "./UserProfile";

type HeaderProps = {
  onToggleMenu: () => void;
  isSidebarOpen: boolean;
};

const Header: React.FC<HeaderProps> = ({ onToggleMenu, isSidebarOpen }) => {
  const { openFilePicker } = useUpload();

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left side - Logo + Menu */}
        <div className="flex items-center space-x-4">
          <button
            className="md:p-2 hover:bg-muted rounded-full transition-colors duration-200 lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => onToggleMenu()}
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center">
              <Image src="/logo.png" alt="Telephotos" width={36} height={36} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Telephotos</h1>
            </div>
          </Link>
        </div>

        {/* Right side - Search, Upload, Profile */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-muted/50 border border-transparent rounded-full text-sm text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary/20 focus:bg-background focus:border-primary/20 transition-all duration-200 w-64 md:w-80 outline-none"
            />
          </div>

          {/* Upload Button */}
          <Button
            onClick={openFilePicker}
            className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5 h-10 shadow-sm"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">Upload</span>
          </Button>

          {/* Profile Dropdown */}
          <AvatarProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;

