"use server";
import serverAxiosInstance from "@telephotos/axios/serverAxiosInstance";
import { cookies } from "next/headers";
import { GET_PROFILE } from "../profileAPIRoutes";
import { UserProfile } from "./types.ts";

export interface GetProfileResponse {
  message: string;
  data: UserProfile;
}

export const getProfile = async (): Promise<GetProfileResponse> => {
  // Get access token from cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("telephotos_access_token")?.value;

  if (!accessToken) {
    throw new Error("Access token not found in cookies");
  }

  const response = await serverAxiosInstance.get<GetProfileResponse>(
    GET_PROFILE
  );

  return response.data;
};
