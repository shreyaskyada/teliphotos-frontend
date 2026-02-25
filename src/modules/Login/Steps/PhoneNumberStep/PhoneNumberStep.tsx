import { PhoneInputField } from "@telephotos/ui";
import { ArrowRight, Loader2 } from "lucide-react";
import { PhoneNumberStepProps } from "./types";
import { usePhoneNumberStep } from "./usePhoneNumberStep";

const PhoneNumberStep: React.FC<PhoneNumberStepProps> = ({ setLoginStep }) => {
  const {
    formData,
    error,
    isLoading,
    handleFormDataChange,
    handlePhoneSubmit,
  } = usePhoneNumberStep({ setLoginStep });

  return (
    <>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent mb-3">Welcome back</h2>
        <p className="text-slate-400 text-[15px] leading-relaxed max-w-sm mx-auto">
          Enter your phone number to receive a secure code via Telegram
        </p>
      </div>

      <form onSubmit={handlePhoneSubmit} className="space-y-6">
        <div className="space-y-2">
          <PhoneInputField
            onChangeFormData={({ data, formattedValue, value }) =>
              handleFormDataChange({ data, formattedValue, value })
            }
            formData={formData}
            placeholder="Enter your phone number"
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <p className="text-red-400 text-sm flex items-center">
              <svg
                className="w-4 h-4 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </p>
          </div>
        )}

        <button
          className={`group relative flex items-center justify-center space-x-3 w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden ${
            isLoading || !formData.value
              ? "bg-white/5 text-slate-500 cursor-not-allowed border border-white/5"
              : "bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-[1.02] active:scale-[0.98]"
          }`}
          type="submit"
          disabled={isLoading || !formData.value}
        >
          {isLoading && !(!formData.value) ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending OTP...</span>
            </>
          ) : (
            <>
              <span className="relative z-10">Continue with Telegram</span>
              <ArrowRight className={`w-5 h-5 transition-transform duration-300 relative z-10 ${!(isLoading || !formData.value) ? "group-hover:translate-x-1" : ""}`} />
            </>
          )}
        </button>
      </form>
    </>
  );
};

export default PhoneNumberStep;
