"use client";

import { MessageSquare, RefreshCw } from "lucide-react";
import React from "react";
import { useOTPVerificationStep } from "./useOTPVerificationStep";

const OtpVerificationStep: React.FC = () => {
  const {
    otpCode,
    isLoading,
    error,
    countdown,
    otpRefs,
    handleOtpChange,
    handleOtpKeyDown,
    handleResendCode,
    phoneNumber,
  } = useOTPVerificationStep();

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <MessageSquare className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-3xl font-extrabold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent mb-3">
          Check your Telegram
        </h2>
        <p className="text-[15px] text-slate-300 mb-2">
          We've sent a 5-digit code to your Telegram account
        </p>
        <p className="text-sm font-mono text-slate-400 bg-black/20 inline-block px-3 py-1.5 rounded-full border border-white/5 mt-1">
          Code sent to <span className="text-slate-300">{phoneNumber}</span>
        </p>
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
                className={`w-14 h-14 text-center bg-slate-900/40 border rounded-2xl focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500/50 text-2xl font-bold text-white shadow-inner transition-all duration-300 ${
                  digit
                    ? "border-violet-500/50 bg-violet-500/10"
                    : "border-white/10 hover:border-white/20"
                } ${error ? "border-red-400/50 bg-red-500/5" : ""}`}
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

          <div className="pt-2">
            <button
              className="text-sm font-medium transition-colors text-slate-400 hover:text-white"
            >
              Use a different phone number
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationStep;
