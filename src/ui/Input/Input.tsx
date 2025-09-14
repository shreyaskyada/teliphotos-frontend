import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@teliphotos/utils/utils";

import useInput from "./useInput";

const inputVariants = cva(
  // Base system styles
  "flex h-12 w-full rounded-lg px-4 text-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default: cn(
          // Base colors
          "bg-white/5 text-white placeholder:text-slate-400",
          // Border + shadow
          "border border-slate-700 shadow-sm",
          // Focus styles
          "focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50",
          // Disabled
          "disabled:cursor-not-allowed disabled:opacity-50"
        ),
        outline: cn(
          "border-b border-slate-700 bg-transparent text-white rounded-none",
          "placeholder:text-slate-400 focus:ring-0 focus:border-violet-500"
        ),
        danger: cn(
          "border border-red-500 text-red-100 placeholder:text-red-400",
          "focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50",
          "disabled:bg-red-500/10 disabled:text-red-300"
        ),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const helperTextVariants = cva("mt-1.5 flex items-center text-sm", {
  variants: {
    variant: {
      default: "text-slate-400",
      outline: "text-slate-400",
      danger: "text-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix">,
    VariantProps<typeof inputVariants> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  helperText?: string;
  helperIcon?: React.ReactNode;
  variant?: "default" | "outline" | "danger";
  isPhoneNumber?: boolean;
  // 508 compliance additions
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
  error?: boolean;
  helperTextId?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      startAdornment,
      endAdornment,
      helperIcon,
      helperText,
      min,
      variant,
      max,
      error,
      helperTextId,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref
  ) => {
    const { describedBy, handleKeyDown, handleChange, isError } = useInput({
      error,
      variant,
      ariaDescribedBy,
      helperText,
      type,
      min,
      max,
    });

    return (
      <div className="flex w-full flex-col">
        <div className="relative flex items-center">
          {startAdornment && (
            <div
              className="absolute left-2.5 flex items-center text-gray-500"
              aria-hidden="true"
            >
              {startAdornment}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant }),
              startAdornment && "pl-7",
              endAdornment && "pr-10",
              className
            )}
            ref={ref}
            min={min}
            max={max}
            onKeyDown={(event) => {
              handleKeyDown(event);
              props?.onKeyDown?.(event);
            }}
            onChange={handleChange}
            aria-describedby={describedBy}
            aria-invalid={ariaInvalid !== undefined ? ariaInvalid : isError}
            {...props}
          />
          {endAdornment && (
            <div
              className="absolute right-3 flex items-center text-gray-500"
              aria-hidden="true"
            >
              {endAdornment}
            </div>
          )}
        </div>
        {(helperText || helperIcon) && (
          <div
            className={cn(helperTextVariants({ variant }))}
            id={helperTextId}
            role={isError ? "alert" : "status"}
            aria-live={isError ? "assertive" : "polite"}
          >
            {helperIcon && (
              <span className="mr-1" aria-hidden="true">
                {helperIcon}
              </span>
            )}
            {helperText && <span>{helperText}</span>}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
