// context/ToastContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

// Create a context with default values
const ToastContext = createContext({
  success: (message: string) => {},
  error: (message: string) => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const success = (message: string) => {
    toast.success(message);
  };

  const error = (message: string) => {
    toast.error(message);
  };

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
    </ToastContext.Provider>
  );
};
