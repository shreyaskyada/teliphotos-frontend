"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getChannelContent,
  GetChannelContentResponse,
} from "./getChannelsContent";

// ------------------
// API Caller Wrapper
// ------------------
const fetchChannelContent = async (
  channelId: string
): Promise<GetChannelContentResponse> => {
  return getChannelContent(channelId);
};

// ------------------
// React Query Hook
// ------------------
const useGetChannelContent = (
  channelId: string
): UseQueryResult<GetChannelContentResponse["data"], Error> => {
  return useQuery<
    GetChannelContentResponse,
    Error,
    GetChannelContentResponse["data"]
  >({
    queryKey: ["channelContent", channelId],
    queryFn: () => fetchChannelContent(channelId),
    select: (data) => data.data,
    enabled: !!channelId, // only run if channelId exists
  });
};

export default useGetChannelContent;
