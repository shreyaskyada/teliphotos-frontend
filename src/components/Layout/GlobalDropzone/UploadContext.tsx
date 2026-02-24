"use client";

import React, { createContext, useCallback, useContext, useRef } from "react";

interface UploadContextValue {
  openFilePicker: () => void;
  registerInputRef: (ref: HTMLInputElement | null) => void;
}

const UploadContext = createContext<UploadContextValue>({
  openFilePicker: () => {},
  registerInputRef: () => {},
});

export const useUpload = () => useContext(UploadContext);

export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const registerInputRef = useCallback((ref: HTMLInputElement | null) => {
    inputRef.current = ref;
  }, []);

  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <UploadContext.Provider value={{ openFilePicker, registerInputRef }}>
      {children}
    </UploadContext.Provider>
  );
};
