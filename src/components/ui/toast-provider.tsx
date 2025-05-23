"use client";

import React, { createContext, useContext, useState } from "react";
import { Toast } from "./toast";

type ToastType = "default" | "success" | "error" | "warning" | "info";

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<
    Array<{
      id: number;
      message: string;
      type: ToastType;
      duration: number;
    }>
  >([]);

  const showToast = (
    message: string,
    type: ToastType = "default",
    duration = 3000,
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          variant={toast.type}
          duration={toast.duration}
        />
      ))}
    </ToastContext.Provider>
  );
}
