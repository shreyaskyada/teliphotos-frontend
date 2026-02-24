"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getPrivateChannels,
  GetPrivateChannelsResponse,
} from "./getPrivateChannels";

// ------------------
// API Caller
// ------------------
const fetchPrivateChannels = async (): Promise<GetPrivateChannelsResponse> => {
  return getPrivateChannels();
};

// ------------------
// React Query Hook
// ------------------
const useGetPrivateChannels = (): UseQueryResult<
  GetPrivateChannelsResponse["data"],
  Error
> => {
  return useQuery<
    GetPrivateChannelsResponse,
    Error,
    GetPrivateChannelsResponse["data"]
  >({
    queryKey: ["privateChannels"],
    queryFn: fetchPrivateChannels,
    select: (data) => data.data,
  });
};

export default useGetPrivateChannels;
