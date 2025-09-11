"use server";

import axios from "axios";
import { cookies } from "next/headers";

export interface ChannelMessage {
  id: number;
  date: number;
  message: string;
  views: number;
  forwards: number;
  media?: {
    id: string;
    mimeType: string;
    size: number;
    fileName?: string;
    duration?: number;
    width?: number;
    height?: number;
    thumbs?: {
      type: string;
      w?: number;
      h?: number;
      size?: number;
    }[];
  };
}

export interface ChannelInfo {
  id: string;
  accessHash: string;
  title: string;
  username?: string | null;
}

export interface GetChannelContentResponse {
  message: string;
  data: {
    channel: ChannelInfo;
    messages: ChannelMessage[];
  };
}

export const getChannelsContent = async (
  channelId: string
): Promise<GetChannelContentResponse> => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL;

  if (!baseURL) {
    throw new Error("Backend URL is not configured");
  }

  // Get access token from cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Access token not found in cookies");
  }

  const response = await axios.get<GetChannelContentResponse>(
    `${baseURL}/channels/${channelId}/content`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
