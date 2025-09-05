import { Button, PhoneInputField } from "@teliphotos/ui";
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
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-3">Welcome back</h2>
        <p className="text-slate-300 ">
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

        <Button
          variant="gradient"
          className="space-x-3 py-4 px-6 w-full"
          type="submit"
          disabled={isLoading || !formData.value}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending OTP...</span>
            </>
          ) : (
            <>
              <span>Continue with Telegram</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </>
          )}
        </Button>
      </form>
    </>
  );
};

export default PhoneNumberStep;
