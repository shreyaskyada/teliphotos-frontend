"use client";

import { InfiniteData, QueryClient } from "@tanstack/react-query";
import {
    getChannelContent,
    GetChannelContentResponse,
} from "./getChannelsContent";

// ------------------
// Refetch only the newest page and merge it into the cached pages.
// invalidateQueries would refetch every loaded page, which is far too heavy
// to repeat while a large batch of uploads keeps completing.
// ------------------
export const refreshChannelFirstPage = async (
  queryClient: QueryClient,
  channelId: string
) => {
  const queryKey = ["channelContent", channelId];
  const cached =
    queryClient.getQueryData<InfiniteData<GetChannelContentResponse, number>>(queryKey);

  if (!cached?.pages?.length) {
    await queryClient.invalidateQueries({ queryKey });
    return;
  }

  const fresh = await getChannelContent(channelId, 0);

  queryClient.setQueryData<InfiniteData<GetChannelContentResponse, number>>(
    queryKey,
    (old) => {
      if (!old?.pages?.length) return old;

      // New uploads push older items past the first page. Keep the previous
      // first-page items so nothing disappears; later pages may now overlap,
      // which is fine because items are de-duplicated by id when rendered.
      const freshIds = new Set(fresh.data.media.map((m) => String(m.id)));
      const [first, ...rest] = old.pages;
      const carriedOver = first.data.media.filter((m) => !freshIds.has(String(m.id)));

      return {
        ...old,
        pages: [
          { ...fresh, data: { ...fresh.data, media: [...fresh.data.media, ...carriedOver] } },
          ...rest,
        ],
      };
    }
  );
};
