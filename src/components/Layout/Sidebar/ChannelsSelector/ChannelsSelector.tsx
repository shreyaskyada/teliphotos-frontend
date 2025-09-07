"use client";

import {
  getPrivateChannels,
  PrivateChannel,
} from "@teliphotos/services/channels";
import { Check, Globe, Lock, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface ChannelsSelectorProps {
  selectedChannels: string[];
  setSelectedChannels: React.SetStateAction<React.Dispatch<string[]>>;
  toggleChannel: (channelId: string) => void;
}

const ChannelsSelector: React.FC<ChannelsSelectorProps> = ({
  toggleChannel,
  selectedChannels,
}) => {
  const [channels, setChannels] = useState<PrivateChannel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const channelData = await getPrivateChannels();
        setChannels(channelData.data.channels);
      } catch (err) {
        setError("Failed to load channels.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
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
            <div className="text-xs text-slate-400">items</div>
          </div>
          {selectedChannels.includes("all") && (
            <Check className="w-4 h-4 text-violet-400" />
          )}
        </button>

        {/* Error State */}
        {error && <div className="text-red-400 text-sm p-3">{error}</div>}

        {/* Loading State (Skeletons) */}
        {isLoading &&
          Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="w-full flex items-center space-x-3 p-3 rounded-xl animate-pulse"
            >
              <div className="w-10 h-10 bg-slate-700 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 bg-slate-700 rounded" />
                <div className="h-2 w-16 bg-slate-800 rounded" />
              </div>
            </div>
          ))}

        {/* Channel list */}
        {!isLoading &&
          !error &&
          channels.map((fullChat) => {
            const channel = fullChat.chats[0];
            return (
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
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{channel.title}</div>
                  {/* <div className="text-xs text-slate-400">
                    {channel.mediaCount.toLocaleString()} items •{" "}
                    {channel.lastActivity}
                  </div> */}
                </div>
                {selectedChannels.includes(channel.id) && (
                  <Check className="w-4 h-4 text-violet-400" />
                )}
              </button>
            );
          })}
      </div>

      <button className="w-full mt-4 flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-white/20 rounded-xl text-slate-400 hover:text-white hover:border-white/40 transition-all duration-200 group">
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">Add Channel</span>
      </button>
    </div>
  );
};

export default ChannelsSelector;
