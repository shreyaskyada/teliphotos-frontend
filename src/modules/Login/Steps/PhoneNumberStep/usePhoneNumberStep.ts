import { sendOTPToPhoneNumber } from "@telephotos/services";
import {
  LOGIN_OTP_SESSION_ID_KEY,
  LOGIN_PHONE_NUMBER_KEY,
} from "@telephotos/utils/constants";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useState } from "react";
import { CountryData } from "react-phone-input-2";
import { FormData, UsePhoneNumberStepProps } from "./types";

export const usePhoneNumberStep = ({
  setLoginStep,
}: UsePhoneNumberStepProps) => {
  const [formData, setFormData] = useState<FormData>({
    formattedValue: "",
    countryCode: "in",
    value: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormDataChange = (data: {
    data?: CountryData | unknown;
    formattedValue: string;
    value: string;
  }) => {
    setFormData({
      formattedValue: data.formattedValue,
      countryCode: (data?.data as CountryData)?.countryCode || "",
      value: data.value,
    });

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const isValid = isValidPhoneNumber(formData.formattedValue);

    if (!isValid) {
      setError("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);

    try {
      // Use the API-formatted international number
      const phoneNumberToSend = formData.value;

      // Send OTP to phone number
      const { data } = await sendOTPToPhoneNumber(phoneNumberToSend);

      sessionStorage.setItem(
        LOGIN_OTP_SESSION_ID_KEY,
        data.phoneCodeHash.phoneCodeHash
      );
      sessionStorage.setItem(LOGIN_PHONE_NUMBER_KEY, phoneNumberToSend);
      // If successful, move to OTP step
      setLoginStep("otp");
    } catch (err: any) {
      // Handle API errors
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to send OTP. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    error,
    isLoading,
    handleFormDataChange,
    handlePhoneSubmit,
  };
};
