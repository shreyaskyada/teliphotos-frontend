"use client";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import React, { useState } from "react";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneInputProps {
  label?: string;
  required?: boolean;
  onChange?: (phone: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  required,
  onChange,
}) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const validatePhoneNumber = (phone: string) => {
    const parsedPhone = parsePhoneNumberFromString(`+${phone}`);
    return parsedPhone?.isValid() || false;
  };

  const handleChange = (value: string) => {
    setPhone(value);

    if (!validatePhoneNumber(value)) {
      setError("Invalid phone number");
    } else {
      setError("");
    }

    onChange?.(value);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <PhoneInput2
        country={"in"}
        value={phone}
        onChange={handleChange}
        inputClass="w-full h-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        containerClass="w-full"
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PhoneInput;
