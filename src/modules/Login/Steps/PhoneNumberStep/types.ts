import React from "react";
import { LoginStep } from "../../types";

export interface PhoneNumberStepProps {
  setLoginStep: React.Dispatch<React.SetStateAction<LoginStep>>;
}

/**
 * Custom hook for managing phone number step logic
 * Handles form state, validation, and OTP submission
 */

export interface FormData {
  formattedValue: string;
  countryCode: string;
  value: string;
}

export interface UsePhoneNumberStepProps extends PhoneNumberStepProps {}
