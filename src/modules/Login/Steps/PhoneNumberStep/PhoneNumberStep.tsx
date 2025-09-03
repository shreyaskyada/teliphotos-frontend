import { Button, PhoneInputField } from "@teliphotos/ui";
import { ArrowRight } from "lucide-react";
import { PhoneNumberStepProps } from "./types";

const PhoneNumberStep: React.FC<PhoneNumberStepProps> = ({ setLoginStep }) => {
  // const [error, setError] = useState("");

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!phoneNumber || phoneNumber.replace(/\D/g, "").length < 10) {
    //   setError("Please enter a valid phone number");
    //   return;
    // }

    // setIsLoading(true);
    // setError("");

    setLoginStep("otp");
    // // // Simulate API call
    // setTimeout(() => {
    //   // setIsLoading(false);
    //   // setCountdown(60);
    //   // Auto-focus first OTP input
    //   // setTimeout(() => otpRefs.current[0]?.focus(), 100);
    // }, 2000);
  };

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
          <PhoneInputField onChangeFormData={() => {}} />
          {/* <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-200"
          >
            Phone Number
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-violet-400 transition-colors duration-300" />
            </div>
            <input
              id="phone"
              type="tel"
              // value={phoneNumber}
              // onChange={handlePhoneChange}
              placeholder="(555) 123-4567"
              className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 ${
                error
                  ? "border-red-400/50 focus:ring-red-500/50 focus:border-red-500/50"
                  : "border-white/10"
              }`}
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-400 flex items-center mt-2 animate-in slide-in-from-left-2 duration-300">
              {error}
            </p>
          )} */}
        </div>

        <Button
          variant="gradient"
          className="space-x-3 py-4 px-6 "
          type="submit"
        >
          <span>Continue with Telegram</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </form>
    </>
  );
};

export default PhoneNumberStep;
