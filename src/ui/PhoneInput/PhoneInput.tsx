"use client";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@telephotos/ui";
import allCountriesModuleImport from "country-telephone-data";
import { ChevronDown } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Types for country-telephone-data
interface Country {
  name: string;
  dialCode: string;
  dial?: string;
  code: string;
  iso2?: string;
  priority?: number;
  areaCodes?: string[];
}

// Define your props interface
interface PhoneInputFieldProps {
  onChangeFormData: (data: {
    value: string;
    data?: CountryData | {};
    event?: React.ChangeEvent<HTMLInputElement>;
    formattedValue: string;
  }) => void;
  formData?: {
    phone?: string;
    countryCode?: string;
  };
  placeholder?: string;
  id?: string;
  error?: string;
}

// Safe import with fallback
let countries: Country[] = [];
try {
  const allCountriesModule: any = allCountriesModuleImport;
  const allCountriesData =
    allCountriesModule.allCountries ||
    allCountriesModule.default?.allCountries ||
    [];

  // Normalize the data structure
  countries = allCountriesData.map((country: Record<string, unknown>) => ({
    name: country.name || "",
    dialCode: country.dialCode || country.dial || "",
    dial: country.dial || country.dialCode || "",
    code: String(country.iso2 || country.code || "").toLowerCase(),
    iso2: country.iso2 || country.code || "",
    priority: country.priority || 0,
    areaCodes: country.areaCodes || [],
  }));
} catch (error) {
  console.warn("Failed to load country data:", error);
  // Fallback countries
  countries = [
    {
      name: "United States",
      dialCode: "+1",
      dial: "+1",
      code: "us",
      iso2: "us",
    },
    {
      name: "United Kingdom",
      dialCode: "+44",
      dial: "+44",
      code: "gb",
      iso2: "gb",
    },
    { name: "India", dialCode: "+91", dial: "+91", code: "in", iso2: "in" },
    { name: "Canada", dialCode: "+1", dial: "+1", code: "ca", iso2: "ca" },
    { name: "Australia", dialCode: "+61", dial: "+61", code: "au", iso2: "au" },
  ];
}

// Helper function to get country flag emoji
const getCountryFlag = (countryCode: string): string => {
  if (!countryCode || countryCode.length !== 2) return "🏳️";

  try {
    return countryCode
      .toUpperCase()
      .split("")
      .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
      .join("");
  } catch {
    return "🏳️";
  }
};

const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  onChangeFormData,
  formData,
  placeholder,
  id = "phone-input",
  error,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    name: "India (भारत)",
    dialCode: "91",
    dial: "91",
    code: "in",
    iso2: "in",
    priority: 0,
    areaCodes: [],
  });

  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Initialize with a default country or from formData
  useEffect(() => {
    if (formData?.countryCode) {
      const country = countries.find(
        (c) =>
          c.code === formData?.countryCode?.toLowerCase() ||
          c.iso2 === formData?.countryCode?.toLowerCase()
      );
      if (country) {
        setSelectedCountry(country);
      }
    } else {
      // Default to US or first available country
      const defaultCountry = countries.find((c) => c.code === "in");
      if (defaultCountry) {
        setSelectedCountry(defaultCountry);
      }
    }
  }, [formData?.countryCode]);

  const handleCountrySelect = useCallback(
    (country: Country) => {
      setSelectedCountry(country);
      onChangeFormData({
        value: "",
        formattedValue: "",
      });
      setOpen(false);
    },
    [onChangeFormData]
  );

  const handlePhoneChange = useCallback(
    (
      value: string,
      data: CountryData | {},
      event: React.ChangeEvent<HTMLInputElement>,
      formattedValue: string
    ) => {
      onChangeFormData({
        value,
        data,
        event,
        formattedValue,
      });
    },
    [onChangeFormData]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <div className="space-y-1.5 w-full">
      <label htmlFor={id} className="block text-sm font-medium text-slate-200">
        Phone Number
      </label>

      {/* Single merged container */}
      <div
        className={`relative flex items-center w-full rounded-lg border transition-all duration-200 bg-white/5 group
          ${
            error
              ? "border-red-400/50 focus-within:border-red-500/50 focus-within:ring-2 focus-within:ring-red-500/50"
              : "border-slate-700 focus-within:border-violet-500/50 focus-within:ring-2 focus-within:ring-violet-500/50"
          }
          ${isFocused ? "ring-2" : ""}
        `}
      >
        {/* Country Selector - Seamlessly integrated */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={`flex items-center gap-1.5 px-3 py-3 border-r border-slate-600/50 hover:bg-white/5 transition-all duration-200 flex-shrink-0 rounded-l-lg
                ${open ? "bg-white/10" : ""}
              `}
              aria-label={`Selected country: ${selectedCountry.name}`}
            >
              {/* Country Flag */}
              <span
                className="text-lg flex-shrink-0"
                role="img"
                aria-label={`${selectedCountry.name} flag`}
              >
                {getCountryFlag(selectedCountry.code)}
              </span>

              <ChevronDown
                className={`h-4 w-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-72 p-0 bg-slate-900/95 backdrop-blur-sm text-white border border-slate-700 rounded-lg shadow-xl z-50">
            <Command className="bg-transparent">
              <CommandInput
                placeholder="Search country..."
                // className="bg-slate-800/50 text-white border-b border-slate-700/50 rounded-none h-12"
              />
              <CommandList className="max-h-64 overflow-y-auto">
                <CommandEmpty className="py-6 text-center text-slate-400">
                  No country found.
                </CommandEmpty>
                <CommandGroup>
                  {countries.map((country, index) => (
                    <CommandItem
                      key={`${country.code}-${index}`}
                      value={`${country.name} ${
                        country.dial || country.dialCode
                      }`}
                      onSelect={() => handleCountrySelect(country)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          {/* Country Flag */}
                          <span
                            className="text-lg flex-shrink-0"
                            role="img"
                            aria-label={`${country.name} flag`}
                          >
                            {getCountryFlag(country.code)}
                          </span>
                          <span className="text-white font-medium">
                            {country.name}
                          </span>
                        </div>
                        <span className="text-slate-300 text-sm font-mono bg-slate-800 px-2 py-1 rounded">
                          {country.dial || country.dialCode}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Phone Input - Seamlessly merged */}
        <div className="flex-1 relative">
          <PhoneInput
            country={selectedCountry.code}
            value={formData?.phone || ""}
            onChange={handlePhoneChange}
            placeholder={placeholder || "Enter your number"}
            disableDropdown={true}
            countryCodeEditable={false}
            inputProps={{
              id: id,
              "aria-invalid": !!error,
              "aria-describedby": error ? `${id}-error` : undefined,
              onFocus: handleFocus,
              onBlur: handleBlur,
            }}
            containerClass="!w-full"
            inputClass={`!w-full !pl-3 !pr-3 !py-3.5 !bg-transparent !text-white !placeholder-slate-400
              !text-[16px] !border-none !outline-none !rounded-none !m-0
              focus:!ring-0 focus:!border-none focus:!outline-none
            `}
            buttonClass="!hidden"
            dropdownClass="!hidden"
          />
        </div>
      </div>

      {error && (
        <p
          id={`${id}-error`}
          className="text-sm text-red-400 flex items-center mt-2 animate-in slide-in-from-left-2 duration-300"
          role="alert"
        >
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
      )}
    </div>
  );
};

export default PhoneInputField;
