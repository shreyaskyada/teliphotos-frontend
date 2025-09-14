"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { PrivateChannel } from "./type";

export interface GetPrivateChannelsResponse {
  message: string;
  data: {
    channels: PrivateChannel[];
  };
}

export const getPrivateChannels =
  async (): Promise<GetPrivateChannelsResponse> => {
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

    const response = await axios.get<GetPrivateChannelsResponse>(
      `${baseURL}/private-channels`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  };
