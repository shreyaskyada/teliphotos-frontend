"use client";

import { Button } from "@teliphotos/ui";
import { MessageSquare, RefreshCw } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { OTPVerificationStepProps } from "./types";

const OtpVerificationStep: React.FC<OTPVerificationStepProps> = ({
  phoneNumber,
}) => {
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otpCode];
      newOtp[index] = value;
      setOtpCode(newOtp);
      setError("");

      if (value && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }

      if (value && index === 5 && newOtp.every((digit) => digit !== "")) {
        setTimeout(() => handleOtpSubmit(), 300);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async () => {
    const code = otpCode.join("");
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      setIsLoading(false);
      if (code === "123456") {
        alert("✅ OTP Verified!");
      } else {
        setError("Invalid code. Please try again.");
      }
    }, 1500);
  };

  const handleResendCode = () => {
    setCountdown(60);
    setOtpCode(["", "", "", "", "", ""]);
    setError("");
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  return (
    <div>
      <div className="text-center mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
          <MessageSquare className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Check your Telegram
        </h2>
        <p className="text-sm text-slate-300 mb-1">
          We've sent a 6-digit code to your Telegram account
        </p>
        <p className="text-sm text-slate-400">Code sent to {phoneNumber}</p>
      </div>

      <div className="space-y-4">
        {/* OTP Inputs */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200 text-center">
            Verification Code
          </label>
          <div className="flex justify-center space-x-3">
            {otpCode.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  otpRefs.current[index] = el;
                }}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className={`w-12 h-12 text-center bg-white/5 border rounded-2xl focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 text-xl font-bold text-white transition-all duration-300 ${
                  digit
                    ? "border-violet-500/50 bg-violet-500/10"
                    : "border-white/10"
                } ${error ? "border-red-400/50" : ""}`}
                maxLength={1}
                inputMode="numeric"
              />
            ))}
          </div>
          {error && (
            <p className="text-sm text-red-400 text-center mt-2">{error}</p>
          )}
        </div>

        {/* Auto-submit indicator */}
        {otpCode.every((digit) => digit !== "") && !isLoading && (
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-violet-400">
              <div className="w-4 h-4 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin"></div>
              <span>Verifying automatically...</span>
            </div>
          </div>
        )}

        {/* Resend Code & Back Button */}
        <div className="text-center space-y-3">
          <p className="text-sm text-slate-400">Didn't receive the code?</p>
          {countdown > 0 ? (
            <p className="text-sm text-slate-500">
              Resend available in {countdown}s
            </p>
          ) : (
            <button
              onClick={handleResendCode}
              className="text-sm text-violet-400 hover:text-violet-300 font-medium flex items-center space-x-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Resend verification code</span>
            </button>
          )}

          <div className="pt-1">
            <Button
              variant="link"
              className="text-sm transition-colors text-slate-400 hover:text-white"
            >
              Use a different phone number
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationStep;
