"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getMediaStats, GetMediaStatsResponse } from "./getMediaStats";

const fetchMediaStats = async (): Promise<GetMediaStatsResponse> => {
  return getMediaStats();
};

export const useGetMediaStats = (): UseQueryResult<
  GetMediaStatsResponse["data"],
  Error
> => {
  return useQuery<
    GetMediaStatsResponse,
    Error,
    GetMediaStatsResponse["data"]
  >({
    queryKey: ["mediaStats"],
    queryFn: fetchMediaStats,
    select: (data) => data.data,
  });
};
