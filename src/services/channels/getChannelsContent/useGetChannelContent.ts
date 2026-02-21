"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getChannelContent,
  GetChannelContentResponse,
} from "./getChannelsContent";

// ------------------
// React Query Hook (Infinite)
// ------------------
const useGetChannelContent = (
  channelId: string
) => {
  return useInfiniteQuery<
    GetChannelContentResponse,
    Error,
    GetChannelContentResponse["data"]
  >({
    queryKey: ["channelContent", channelId],
    queryFn: ({ pageParam = 0 }) => getChannelContent(channelId, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { offset, limit, total } = lastPage.data.pagination;
      const nextOffset = Number(offset) + Number(limit);
      return nextOffset < Number(total) ? nextOffset : undefined;
    },
    select: (data) => ({
      ...data.pages[0].data,
      media: data.pages.flatMap((page) => page.data.media),
    }),
    enabled: !!channelId,
    refetchOnWindowFocus: false,
  });
};

export default useGetChannelContent;
