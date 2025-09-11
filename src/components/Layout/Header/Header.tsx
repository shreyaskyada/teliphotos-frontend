"use client";

import {
  Avatar,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@teliphotos/ui";
import { ImageIcon, LogOut, Menu, Search, Upload, X } from "lucide-react";

type HeaderProps = {
  onToggleMenu: () => void;
  isSidebarOpen: boolean;
};

const Header: React.FC<HeaderProps> = ({ onToggleMenu, isSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Logo + Menu */}
        <div className="flex items-center space-x-4">
          <button
            className="md:p-2 hover:bg-white/10 rounded-xl transition-colors duration-200 lg:hidden"
            onClick={() => onToggleMenu()}
          >
            {isSidebarOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Teliphotos</h1>
            </div>
          </div>
        </div>

        {/* Right side - Search, Upload, Profile */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search photos and videos..."
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 w-64"
            />
          </div>

          {/* Upload Button */}
          <Button className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-violet-500/25">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Upload</span>
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 focus:outline-none">
                <Avatar
                  name="John Doe"
                  src="https://i.pravatar.cc/100"
                  alt="John Doe"
                />
                <span className="hidden md:inline text-sm font-medium text-nowrap">
                  John Doe
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-slate-900 border border-white/10">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-400 hover:bg-white/10">
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
