"use client";

import { Check, Lock, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { CreateChannelDialog } from "./CreateChannelDialog";
import { DeleteChannelDialog } from "./DeleteChannelDialog";
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

  const [deleteChannelData, setDeleteChannelData] = useState<{
    isOpen: boolean;
    channelId: string;
    channelName: string;
  }>({
    isOpen: false,
    channelId: "",
    channelName: "",
  });

  const openDeleteModal = (channelId: string, channelName: string) => {
    setDeleteChannelData({
      isOpen: true,
      channelId,
      channelName,
    });
  };

  const closeDeleteModal = () => {
    setDeleteChannelData({
      isOpen: false,
      channelId: "",
      channelName: "",
    });
  };

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
              <div
                key={channel._id}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                  selectedChannels.includes(channel.channelId)
                    ? "bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30"
                    : "hover:bg-white/5"
                }`}
              >
                <button
                  onClick={() => toggleChannel(channel.channelId)}
                  className="flex items-center space-x-3 flex-1"
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

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteModal(channel.channelId, channel.title);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 hover:bg-red-500/20 rounded-lg hover:scale-110 active:scale-95 transform"
                  title="Delete Channel"
                >
                  <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300 transition-colors duration-200" />
                </button>
              </div>
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

      {/* Delete Channel Dialog */}
      <DeleteChannelDialog
        isOpen={deleteChannelData.isOpen}
        onClose={closeDeleteModal}
        channelId={deleteChannelData.channelId}
        channelName={deleteChannelData.channelName}
      />
    </div>
  );
};

export default ChannelsSelector;
