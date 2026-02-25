"use client";
import Image from "next/image";
import { useState } from "react";
import { ProgressIndicator } from "./ProgressIndicator";
import { PhoneNumberStep } from "./Steps";
import { OTPVerificationStep } from "./Steps/OTPVerificationStep";
import { LoginStep } from "./types";

const Login = () => {
  const [loginStep, setLoginStep] = useState<LoginStep>("phone");

  return (
    <div className="min-h-[100dvh] relative overflow-x-hidden overflow-y-auto bg-[#020617] text-slate-200">
      <div className="fixed inset-0 pointer-events-none z-0">
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

      <div className="relative z-10 min-h-[100dvh] flex flex-col p-4 sm:p-8">
        <div className="flex-1 w-full min-h-[2rem]"></div>
        <div className="w-full max-w-[26rem] mx-auto flex-shrink-0">
          {/* Logo Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="mx-auto w-20 h-20 rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/25 mb-6 ring-1 ring-white/10 hover:ring-violet-500/50 transition-all hover:scale-105">
              <Image src="/logo.png" alt="Telephotos Logo" width={80} height={80} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent mb-3">
              Telephotos
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md mx-auto">
              Your private telegram gallery
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
            {/* Progress Indicator */}
            <ProgressIndicator loginStep={loginStep} />

            {/* Content Area */}
            <div className="px-6 pb-8 sm:px-10 sm:pb-10 pt-0 grid relative overflow-hidden">
              <div
                className={`col-start-1 row-start-1 transition-all duration-500 ease-in-out ${
                  loginStep === "phone"
                    ? "opacity-100 translate-x-0 z-10 pointer-events-auto"
                    : "opacity-0 -translate-x-8 z-0 pointer-events-none"
                }`}
              >
                {/* Phone Number Step */}
                <PhoneNumberStep setLoginStep={setLoginStep} />
              </div>

              <div
                className={`col-start-1 row-start-1 transition-all duration-500 ease-in-out ${
                  loginStep === "otp"
                    ? "opacity-100 translate-x-0 z-10 pointer-events-auto"
                    : "opacity-0 translate-x-8 z-0 pointer-events-none"
                }`}
              >
                <OTPVerificationStep />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full min-h-[2rem]"></div>
      </div>
    </div>
  );
};

export default Login;
