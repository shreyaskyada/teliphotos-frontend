import { verifyOtp } from "@telephotos/services";
import {
    LOGIN_OTP_SESSION_ID_KEY,
    LOGIN_PHONE_NUMBER_KEY,
} from "@telephotos/utils/constants";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useOTPVerificationStep = () => {
  const [otpCode, setOtpCode] = useState(["", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const router = useRouter(); // ✅ app router navigation

  useEffect(() => {
    setPhoneNumber(sessionStorage.getItem(LOGIN_PHONE_NUMBER_KEY));
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otpCode];
      newOtp[index] = value;
      setOtpCode(newOtp);
      setError("");

      if (value && index < 4) {
        otpRefs.current[index + 1]?.focus();
      }

      if (value && newOtp.every((digit) => digit !== "")) {
        // setTimeout(() => handleOtpSubmit(), 300);

        handleOtpSubmit(newOtp.join(""));
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").trim().replace(/\D/g, "").slice(0, 5);

    if (pasteData) {
      const newOtp = [...otpCode];
      for (let i = 0; i < pasteData.length; i++) {
        newOtp[i] = pasteData[i];
      }
      setOtpCode(newOtp);
      setError("");

      const focusIndex = Math.min(pasteData.length, 4);
      otpRefs.current[focusIndex]?.focus();

      if (newOtp.every((digit) => digit !== "")) {
        handleOtpSubmit(newOtp.join(""));
      }
    }
  };

  const handleOtpSubmit = async (newOtp: string) => {
    const code = newOtp;

    if (code.length !== 5) {
      setError("Please enter the complete 5-digit code");
      return;
    }

    const phoneCodeHash = sessionStorage.getItem(LOGIN_OTP_SESSION_ID_KEY);

    try {
      setIsLoading(true);
      const response = await verifyOtp({
        otp: code,
        phoneCodeHash: phoneCodeHash!,
        phoneNumber: phoneNumber!,
      });

      // Clear existing cookies first, then set new ones
      document.cookie =
        "telephotos_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "telephotos_refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      // Set new tokens in cookies
      document.cookie = `telephotos_access_token=${
        response.data.accessToken
      }; path=/; max-age=${7 * 24 * 60 * 60}; samesite=lax`;
      document.cookie = `telephotos_refresh_token=${
        response.data.refreshToken
      }; path=/; max-age=${40 * 24 * 60 * 60}; samesite=lax`;

      router.push("dashboard");
    } catch {
      setError("Please enter valid OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    setCountdown(60);
    setOtpCode(["", "", "", "", ""]);
    setError("");
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  return {
    otpCode,
    isLoading,
    error,
    countdown,
    otpRefs,
    handleOtpChange,
    handleOtpKeyDown,
    handleOtpPaste,
    handleOtpSubmit,
    handleResendCode,
    phoneNumber,
  };
};
