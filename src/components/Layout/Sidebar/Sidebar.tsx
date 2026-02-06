"use client";
import { BookOpen, Hash, Settings, Star, Tag } from "lucide-react";
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

export type SidebarFilterType = "all" | "photos" | "videos";

export interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  const router = useRouter();
  const { channelId } = useParams();

  const [filterType, setFilterType] = useState<"all" | "photos" | "videos">(
    "all"
  );
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
      className={`fixed lg:static inset-y-0 left-0 z-30 w-[280px] bg-background border-r border-border/50 transform transition-transform duration-300 h-full ${
        sidebarOpen
          ? "translate-x-0 top-[64px]"
          : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex flex-col h-full py-4">
        {/* Header Toggle */}
        <div className="px-4 pb-4 shrink-0">
          <div className="flex p-1.5 bg-muted/40 rounded-full border border-white/5">
            <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-zinc-800 text-white shadow-md rounded-full text-sm font-medium transition-all duration-200 border border-white/5">
              <Hash className="w-4 h-4" />
              <span>Channels</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-muted-foreground hover:text-foreground rounded-full text-sm font-medium transition-all duration-200">
              <BookOpen className="w-4 h-4" />
              <span>Albums</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 pb-2 shrink-0">
            <div className="flex flex-wrap gap-2">
              {["all", "photos", "videos"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type as SidebarFilterType)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                    filterType === (type as SidebarFilterType)
                      ? "bg-secondary text-foreground border-transparent"
                      : "bg-transparent text-muted-foreground border-border/40 hover:border-muted-foreground"
                  }`}
                >
                  {type === "all"
                    ? "All"
                    : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
        </div>

        {/* Channels - scrollable */}
        <ChannelsSelector
          selectedChannels={selectedChannels}
          toggleChannel={toggleChannel}
        />

        {/* Footer */}
        <div className="p-4 mt-auto shrink-0 space-y-1">
          <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all duration-200">
            <Star className="w-5 h-5" />
            <span className="text-sm font-medium">Favorites</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all duration-200">
            <Tag className="w-5 h-5" />
            <span className="text-sm font-medium">Tags</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all duration-200">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
