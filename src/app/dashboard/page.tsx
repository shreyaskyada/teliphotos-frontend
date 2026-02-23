"use client";

import { useGetPrivateChannels } from "@telephotos/services/channels";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  const { data: channelsData, isLoading, error } = useGetPrivateChannels();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !error && channelsData?.channels && channelsData.channels.length > 0) {
      router.replace(`/dashboard/${channelsData.channels[0].channelId}`);
    }
  }, [channelsData, isLoading, error, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-destructive p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Error loading channels</h2>
        <p>{error.message || "Something went wrong. Please try again later."}</p>
      </div>
    );
  }

  // If no channels exist, we show a message.
  if (!channelsData?.channels || channelsData.channels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-muted-foreground p-6 text-center">
        <h2 className="text-xl font-semibold mb-2 text-foreground">No channels found</h2>
        <p>Create a new channel from the sidebar to get started.</p>
      </div>
    );
  }

  return null;
};

export default DashboardPage;


