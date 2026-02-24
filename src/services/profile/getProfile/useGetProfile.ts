"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getProfile, GetProfileResponse } from "./getProfile";

// ------------------
// API Caller
// ------------------
const fetchProfile = async (): Promise<GetProfileResponse> => {
  return getProfile();
};

// ------------------
// React Query Hook
// ------------------
const useGetProfile = (): UseQueryResult<GetProfileResponse["data"], Error> => {
  return useQuery<GetProfileResponse, Error, GetProfileResponse["data"]>({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    select: (data) => data.data,
  });
};

export default useGetProfile;
