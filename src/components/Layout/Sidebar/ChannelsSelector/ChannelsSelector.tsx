"use client";

import { Check, Lock, Plus } from "lucide-react";
import { CreateChannelDialog } from "./CreateChannelDialog";
import { useChannelSelector } from "./useChannelSelector";

interface ChannelsSelectorProps {
  selectedChannels: string[];
  toggleChannel: (channelId: string) => void;
}

const ChannelsSelector: React.FC<ChannelsSelectorProps> = ({
  toggleChannel,
  selectedChannels,
}) => {
  const {
    channels,
    isLoading,
    error,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
  } = useChannelSelector({
    selectedChannels,
    toggleChannel,
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 min-h-0">
      <div className="space-y-2">
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
          channels.map((channel) => {
            return (
              <button
                key={channel._id}
                onClick={() => toggleChannel(channel.channelId)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  selectedChannels.includes(channel._id)
                    ? "bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30"
                    : "hover:bg-white/5"
                }`}
              >
                <div
                  className={`w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center`}
                >
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{channel.title}</div>
                </div>
                {selectedChannels.includes(channel._id) && (
                  <Check className="w-4 h-4 text-violet-400" />
                )}
              </button>
            );
          })}
      </div>

      <button
        onClick={openCreateModal}
        className="w-full mt-4 flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-white/20 rounded-xl text-slate-400 hover:text-white hover:border-white/40 transition-all duration-200 group"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">Add Channel</span>
      </button>

      {/* Create Channel Dialog */}
      <CreateChannelDialog
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
      />
    </div>
  );
};

export default ChannelsSelector;
