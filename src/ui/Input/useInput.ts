import React from "react";

const useInput = ({
  error,
  variant,
  ariaDescribedBy,
  helperText,
  type,
  min,
  max,
}: {
  error?: boolean;
  variant?: "default" | "outline" | "danger";
  ariaDescribedBy?: string;
  helperText?: string;
  type?: string;
  min?: string | number | undefined;
  max?: string | number | undefined;
}) => {
  // Determine if input is in error state
  const isError = error || variant === "danger";
  // Build aria-describedby string
  const describedBy =
    [ariaDescribedBy, helperText ? helperText : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number" && ["e", "E", "-", "+"].includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (type === "number") {
      const numValue = Number(value);
      if (min !== undefined && numValue < Number(min)) {
        event.target.value = String(min);
      } else if (max !== undefined && numValue > Number(max)) {
        event.target.value = String(max);
      }
    }
  };

  return {
    describedBy,
    handleKeyDown,
    handleChange,
    isError,
  };
};

export default useInput;
