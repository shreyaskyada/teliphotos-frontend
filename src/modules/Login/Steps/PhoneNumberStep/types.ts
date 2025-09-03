import React from "react";
import { LoginStep } from "../../types";

export interface PhoneNumberStepProps {
  setLoginStep: React.Dispatch<React.SetStateAction<LoginStep>>;
}
