import { sendOTPToPhoneNumber, verifyOtp } from "@telephotos/services";
import {
    LOGIN_OTP_SESSION_ID_KEY,
    LOGIN_PHONE_NUMBER_KEY,
} from "@telephotos/utils/constants";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const RESEND_COUNTDOWN_SECONDS = 60;

export const useOTPVerificationStep = (isActive: boolean) => {
  const [otpCode, setOtpCode] = useState(["", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(RESEND_COUNTDOWN_SECONDS);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const router = useRouter(); // ✅ app router navigation

  // This step is mounted (hidden) from the start, so read the phone number and
  // restart the countdown only once the user actually reaches it.
  useEffect(() => {
    if (!isActive) return;
    setPhoneNumber(sessionStorage.getItem(LOGIN_PHONE_NUMBER_KEY));
    setCountdown(RESEND_COUNTDOWN_SECONDS);
  }, [isActive]);

  useEffect(() => {
    if (!isActive || countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [isActive, countdown]);

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

    const phoneCodeHash = typeof window !== 'undefined' ? sessionStorage.getItem(LOGIN_OTP_SESSION_ID_KEY) : null;
    const syncPhoneNumber = typeof window !== 'undefined' ? sessionStorage.getItem(LOGIN_PHONE_NUMBER_KEY) : null;
    const finalPhoneNumber = syncPhoneNumber || phoneNumber;

    if (!finalPhoneNumber) {
      setError("Session expired or missing phone number. Please refresh and try again.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await verifyOtp({
        otp: code,
        phoneCodeHash: phoneCodeHash!,
        phoneNumber: finalPhoneNumber,
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

      router.push("/dashboard");
    } catch {
      setError("Please enter valid OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    const finalPhoneNumber =
      sessionStorage.getItem(LOGIN_PHONE_NUMBER_KEY) || phoneNumber;

    if (!finalPhoneNumber) {
      setError("Session expired or missing phone number. Please refresh and try again.");
      return;
    }

    setOtpCode(["", "", "", "", ""]);
    setError("");

    try {
      setIsResending(true);
      const { data } = await sendOTPToPhoneNumber(finalPhoneNumber);
      // The previous phoneCodeHash is invalidated by a new code
      sessionStorage.setItem(
        LOGIN_OTP_SESSION_ID_KEY,
        data.phoneCodeHash.phoneCodeHash
      );
      setCountdown(RESEND_COUNTDOWN_SECONDS);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to resend code. Please try again."
      );
    } finally {
      setIsResending(false);
    }
  };

  return {
    otpCode,
    isLoading,
    isResending,
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
