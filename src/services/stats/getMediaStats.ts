"use server";
import axios from "axios";
import { cookies } from "next/headers";

export interface MediaStats {
  breakdown: {
    photos: number;
    videos: number;
  };
  activity: Array<{
    date: string;
    count: number;
  }>;
}

export interface GetMediaStatsResponse {
  message: string;
  data: MediaStats;
}

export const getMediaStats = async (): Promise<GetMediaStatsResponse> => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL;

  if (!baseURL) {
    throw new Error("Backend URL is not configured");
  }

  // Get access token from cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("telephotos_access_token")?.value;

  if (!accessToken) {
    throw new Error("Access token not found in cookies");
  }

  const response = await axios.get<GetMediaStatsResponse>(
    `${baseURL}/api/v1/stats/media`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
