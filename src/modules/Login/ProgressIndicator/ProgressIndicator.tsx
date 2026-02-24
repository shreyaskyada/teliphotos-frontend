import React from "react";
import { ProgressIndicatorProps } from "./types";

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ loginStep }) => {
  return (
    <div className="px-8 pt-6 pb-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-3">
          <div
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              loginStep === "phone"
                ? "bg-violet-500 scale-125"
                : "bg-violet-500"
            }`}
          ></div>
          <div
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              loginStep === "otp" ? "bg-violet-500 scale-125" : "bg-white/20"
            }`}
          ></div>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          {loginStep === "phone"
            ? "Step 1 of 2"
            : loginStep === "otp"
            ? "Step 2 of 2"
            : "Complete"}
        </span>
      </div>
    </div>
  );
};

export default ProgressIndicator;
