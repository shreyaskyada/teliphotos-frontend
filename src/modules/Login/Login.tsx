"use client";
import { Camera } from "lucide-react";
import { useState } from "react";
import { ProgressIndicator } from "./ProgressIndicator";
import { PhoneNumberStep } from "./Steps";
import { OTPVerificationStep } from "./Steps/OTPVerificationStep";
import { LoginStep } from "./types";

const Login = () => {
  const [loginStep, setLoginStep] = useState<LoginStep>("phone");

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className={`absolute transition-all duration-1000 ${
            loginStep === "phone"
              ? "top-0 left-1/4"
              : loginStep === "otp"
              ? "top-1/4 right-1/4"
              : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          } w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse`}
        ></div>
        <div
          className={`absolute transition-all duration-1000 ${
            loginStep === "phone"
              ? "bottom-0 right-1/4"
              : loginStep === "otp"
              ? "bottom-1/4 left-1/4"
              : "bottom-1/4 right-1/4"
          } w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000`}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {/* Logo Section */}
          <div className="text-center mb-12">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-3xl mb-6 shadow-2xl shadow-violet-500/25 transition-all duration-700 ${"hover:scale-105"}`}
            >
              <Camera className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent mb-3">
              Teliphotos
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md mx-auto">
              Your private telegram gallery
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
            {/* Progress Indicator */}
            <ProgressIndicator loginStep={loginStep} />

            {/* Content Area */}
            <div className="px-8 pb-8">
              <div
                className={`transition-all duration-700 ${
                  loginStep === "phone"
                    ? "opacity-100 transform translate-x-0"
                    : "opacity-0 transform -translate-x-4 absolute pointer-events-none"
                }`}
              >
                {/* Phone Number Step */}
                <PhoneNumberStep setLoginStep={setLoginStep} />
              </div>

              <div
                className={`transition-all duration-700 ${
                  loginStep === "otp"
                    ? "opacity-100 transform translate-x-0"
                    : "opacity-0 transform translate-x-4 absolute pointer-events-none"
                }`}
              >
                <OTPVerificationStep phoneNumber="9510598946" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
