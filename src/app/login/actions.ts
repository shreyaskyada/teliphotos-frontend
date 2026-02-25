"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function verifyOTP(
  phoneNumber: string | undefined,
  otp: string,
  phoneCodeHash: string
) {
  if (!phoneNumber || !otp) return { success: false, error: "Invalid input" };

  try {
    const response = await axios.post("http://localhost:5001/verify-otp", {
      phoneNumber,
      otp,
      phoneCodeHash,
    });

    const { accessToken, refreshToken } = response.data.data;

    // Store tokens securely in cookies
    (await cookies()).set("telephotos_access_token", accessToken, {
      httpOnly: true,
      secure: true,
    });
    (await cookies()).set("telephotos_refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return { success: true };
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return { success: false, error: "Invalid OTP" };
  }
}
