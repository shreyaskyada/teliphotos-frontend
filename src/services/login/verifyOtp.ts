import axios from "axios";

// types/auth.ts
export interface VerifyOtpPayload {
  phoneNumber: string;
  phoneCodeHash: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export const verifyOtp = async (
  payload: VerifyOtpPayload
): Promise<VerifyOtpResponse> => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL;

  if (!baseURL) {
    throw new Error("Backend URL is not configured");
  }

  const response = await axios.post<VerifyOtpResponse>(
    `${baseURL}/auth/verify-otp`,
    payload
  );

  return response.data;
};
