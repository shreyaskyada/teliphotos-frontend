"use server";
import axiosInstance from "@teliphotos/axios/axiosInstance";
import { cookies } from "next/headers";
import { GET_PROFILE } from "../profileAPIRoutes";
import { UserProfile } from "./types.ts";

export interface GetProfileResponse {
  message: string;
  data: UserProfile;
}

export const getProfile = async (): Promise<GetProfileResponse> => {
  console.log("getProfile API call");

  // Get access token from cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Access token not found in cookies");
  }

  const response = await axiosInstance.get<GetProfileResponse>(GET_PROFILE);

  return response.data;
};
