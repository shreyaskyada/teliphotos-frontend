"use client";
import {
  BookOpen,
  Check,
  Globe,
  Hash,
  Lock,
  Plus,
  Settings,
  Star,
  Tag,
  Users,
} from "lucide-react";
import React, { useState } from "react";

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

// Mock data - replace with your API calls
const channels: Channel[] = [
  {
    id: "personal",
    name: "Personal Photos",
    type: "private",
    memberCount: 1,
    mediaCount: 1247,
    lastActivity: "2 hours ago",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "family",
    name: "Family Memories",
    type: "private",
    memberCount: 8,
    mediaCount: 892,
    lastActivity: "1 day ago",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "travel",
    name: "Travel Adventures",
    type: "private",
    memberCount: 3,
    mediaCount: 456,
    lastActivity: "3 days ago",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "work",
    name: "Work Projects",
    type: "private",
    memberCount: 12,
    mediaCount: 234,
    lastActivity: "1 week ago",
    color: "from-orange-500 to-red-600",
  },
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  const [filterType, setFilterType] = useState<"all" | "photos" | "videos">(
    "all"
  );
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["all"]);
  const [, setShowAddChannelModal] = useState(false);

  const getTotalMediaCount = () => {
    if (selectedChannels.includes("all")) {
      return channels.reduce((sum, channel) => sum + channel.mediaCount, 0);
    }
    return channels
      .filter((channel) => selectedChannels.includes(channel.id))
      .reduce((sum, channel) => sum + channel.mediaCount, 0);
  };

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
        <div className="flex-1 overflow-y-auto p-6 min-h-0">
          <div className="space-y-2">
            {/* All Channels */}
            <button
              onClick={() => toggleChannel("all")}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                selectedChannels.includes("all")
                  ? "bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30"
                  : "hover:bg-white/5"
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-slate-300" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">All Channels</div>
                <div className="text-xs text-slate-400">
                  {getTotalMediaCount().toLocaleString()} items
                </div>
              </div>
              {selectedChannels.includes("all") && (
                <Check className="w-4 h-4 text-violet-400" />
              )}
            </button>

            {/* Channel list */}
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => toggleChannel(channel.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  selectedChannels.includes(channel.id)
                    ? "bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30"
                    : "hover:bg-white/5"
                }`}
              >
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${channel.color} rounded-xl flex items-center justify-center`}
                >
                  {channel.type === "private" ? (
                    <Lock className="w-5 h-5 text-white" />
                  ) : (
                    <Users className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{channel.name}</div>
                  <div className="text-xs text-slate-400">
                    {channel.mediaCount.toLocaleString()} items •{" "}
                    {channel.lastActivity}
                  </div>
                </div>
                {selectedChannels.includes(channel.id) && (
                  <Check className="w-4 h-4 text-violet-400" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddChannelModal(true)}
            className="w-full mt-4 flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-white/20 rounded-xl text-slate-400 hover:text-white hover:border-white/40 transition-all duration-200 group"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add Channel</span>
          </button>
        </div>

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
