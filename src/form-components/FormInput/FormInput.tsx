import React from "react";

import { FieldValues, get, useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Skeleton,
} from "@telephotos/ui";

import { FormInputProps } from "./types";

export const FormInput = <T extends FieldValues>({
  name,
  label,
  required = false,
  min,
  max,
  type,
  helperText,
  labelClassName = "",
  formClassName = "",
  inputClassName = "",
  isDataLoading = false,
  ...rest
}: FormInputProps<T> & { min?: number; max?: number } & {
  labelClassName?: string;
  formClassName?: string;
  inputClassName?: string;
  isDataLoading?: boolean;
}) => {
  const form = useFormContext();
  const inputId = `${name}-input`;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, formState: { errors } }) => {
        // Wrap the original onChange to enforce min/max for number inputs
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          let value: string | number = event.target.value;

          if (type === "number") {
            const numValue = Number(value);

            // Ensure value is within min/max bounds
            if (min !== undefined && numValue < min) {
              value = Number(min);
            } else if (max !== undefined && numValue > max) {
              value = Number(max);
            } else {
              value = numValue;
            }
          }

          field.onChange(value);
          if (rest.onChange) rest.onChange(event);
        };

        return (
          <FormItem className={formClassName}>
            {label && (
              <FormLabel htmlFor={inputId} className={labelClassName}>
                {label}
                {required && (
                  <>
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                    <span className="sr-only">(required)</span>
                  </>
                )}
              </FormLabel>
            )}

            <FormControl>
              {isDataLoading ? (
                <Skeleton className="min-h-8 w-full" />
              ) : (
                <Input
                  {...rest}
                  {...field}
                  id={inputId}
                  aria-required={required}
                  type={type}
                  min={min}
                  max={max}
                  onChange={handleChange}
                  variant={get(errors, name) ? "danger" : "default"}
                  helperText={helperText}
                  className={inputClassName}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
