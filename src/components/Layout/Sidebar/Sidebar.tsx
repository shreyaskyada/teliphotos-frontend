"use client";
import { Settings, Star, Tag } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ChannelsSelector } from "./ChannelsSelector";

export type Channel = {
  id: string;
  name: string;
  type: "private" | "public";
  memberCount: number;
  mediaCount: number;
  lastActivity: string;
  color: string;
};

export type SidebarFilterType = "all" | "photos";

export interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  const router = useRouter();
  const { channelId } = useParams();
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["all"]);

  useEffect(() => {
    if (channelId && typeof channelId === "string") {
      setSelectedChannels([channelId]);
    }
  }, [channelId]);

  const toggleChannel = (channelId: string) => {
    setSelectedChannels([channelId]);

    router.push(`/dashboard/${channelId}`);
  };

  return (
    <aside
      id="app-sidebar"
      aria-label="Main navigation"
      className={`fixed lg:static inset-y-0 left-0 z-30 w-[280px] bg-background border-r border-border/50 transform transition-transform duration-300 h-full ${
        sidebarOpen
          ? "translate-x-0 top-[64px]"
          : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex flex-col h-full py-4">

        {/* Channels - scrollable */}
        <ChannelsSelector
          selectedChannels={selectedChannels}
          toggleChannel={toggleChannel}
        />

        {/* Footer */}
        <div className="px-3 pb-3 mt-auto shrink-0 space-y-0.5 border-t border-border/30 pt-3">
          <button type="button" aria-label="Favorites" className="w-full group flex items-center justify-between px-4 py-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <Star className="w-4 h-4 transition-all duration-200 group-hover:text-foreground/80" aria-hidden="true" />
              <span className="text-sm font-medium">Favorites</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Soon</span>
          </button>
          <button type="button" aria-label="Tags" className="w-full group flex items-center justify-between px-4 py-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <Tag className="w-4 h-4 transition-all duration-200 group-hover:text-foreground/80" aria-hidden="true" />
              <span className="text-sm font-medium">Tags</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Soon</span>
          </button>
          <button type="button" aria-label="Settings" className="w-full group flex items-center justify-between px-4 py-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <Settings className="w-4 h-4 transition-all duration-200 group-hover:rotate-45" aria-hidden="true" />
              <span className="text-sm font-medium">Settings</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Soon</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
