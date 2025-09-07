"use client";
import { BookOpen, Hash, Settings, Star, Tag } from "lucide-react";
import React, { useState } from "react";
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
  const [filterType, setFilterType] = useState<"all" | "photos" | "videos">(
    "all"
  );
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["all"]);

  const toggleChannel = (channelId: string) => {
    if (channelId === "all") {
      setSelectedChannels(["all"]);
    } else {
      const newSelection = selectedChannels.includes("all")
        ? [channelId]
        : selectedChannels.includes(channelId)
        ? selectedChannels.filter((id) => id !== channelId)
        : [...selectedChannels.filter((id) => id !== "all"), channelId];

      setSelectedChannels(newSelection.length === 0 ? ["all"] : newSelection);
    }
  };

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-30 w-80 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 h-[calc(100vh-75px)] ${
        sidebarOpen
          ? "translate-x-0 top-[75px]"
          : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex space-x-1 bg-white/5 rounded-xl p-1">
            <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-violet-500 text-white rounded-lg text-sm font-medium transition-all duration-200">
              <Hash className="w-4 h-4" />
              <span>Channels</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-slate-400 hover:text-white rounded-lg text-sm font-medium transition-all duration-200">
              <BookOpen className="w-4 h-4" />
              <span>Albums</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-white/10 shrink-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300">
                Quick Filters
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {["all", "photos", "videos"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type as SidebarFilterType)}
                  className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    filterType === (type as SidebarFilterType)
                      ? "bg-violet-500 text-white"
                      : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {type === "all"
                    ? "All"
                    : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Channels - scrollable */}
        <ChannelsSelector
          selectedChannels={selectedChannels}
          setSelectedChannels={setSelectedChannels}
          toggleChannel={toggleChannel}
        />

        {/* Footer */}
        <div className="p-6 border-t border-white/10 shrink-0">
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200">
              <Star className="w-4 h-4" />
              <span className="text-sm">Favorites</span>
              <span className="ml-auto text-xs bg-white/10 px-2 py-1 rounded-full">
                Soon
              </span>
            </button>
            <button className="w-full flex items-center space-x-3 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200">
              <Tag className="w-4 h-4" />
              <span className="text-sm">Tags</span>
              <span className="ml-auto text-xs bg-white/10 px-2 py-1 rounded-full">
                Soon
              </span>
            </button>
            <button className="w-full flex items-center space-x-3 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
