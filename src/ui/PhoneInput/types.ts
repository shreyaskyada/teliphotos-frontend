import { PhoneInputProps } from "react-phone-input-2";

export interface PhoneInputFieldProps extends PhoneInputProps {
  onChangeFormData: (data: { phone: string; countryCode?: string }) => void;
  formData?: {
    phone: string;
  };
  hideCountrySelect?: boolean;
  // 508 compliance props
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
  id?: string;
  error?: string;
}
