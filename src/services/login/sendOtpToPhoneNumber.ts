import axios from "axios";

export interface PhoneCodeHashType {
  flags: number;
  type: { length: number; className: string };
  phoneCodeHash: string;
  nextType: string | null;
  timeout: number | null;
  className: string;
}
export interface SendOTPResponse {
  message: string;
  data: { phoneCodeHash: PhoneCodeHashType };
}

export const sendOTPToPhoneNumber = async (
  phoneNumber: string
): Promise<SendOTPResponse> => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL;
  if (!baseURL) {
    throw new Error("Backend URL is not configured");
  }
  const response = await axios.post<SendOTPResponse>(
    `${baseURL}/auth/send-otp`,
    { phoneNumber }
  );
  return response.data;
};
