"use client";

import React, { createContext, useContext } from "react";
import { Toaster, toast as sonnerToast } from "sonner";
import { useTheme } from "next-themes";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react";
import { ToastContextType, ToastOptions } from "types/toast";

// Create context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Custom icons for different toast types
const toastIcons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
  loading: <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />,
};

interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastOptions["position"];
  duration?: number;
  closeButton?: boolean;
  richColors?: boolean;
}

export function ToastProvider({
  children,
  position = "bottom-right",
  duration = 4000,
  closeButton = true,
  richColors = true,
}: ToastProviderProps) {
  const { theme } = useTheme();

  // Helper function to generate unique ID
  const generateId = (): string => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Toast methods with proper return types
  const showToast = (
    message: string,
    options: ToastOptions = {}
  ): string | number => {
    const id = options.id || generateId();

    return sonnerToast(message, {
      duration: options.duration || duration,
      description: options.description,
      action: options.action,
      id,
      dismissible: options.dismissible ?? true,
    });
  };

  const success = (
    message: string,
    options: Omit<ToastOptions, "type"> = {}
  ): string | number => {
    const id = options.id || generateId();

    return sonnerToast.success(message, {
      duration: options.duration || duration,
      description: options.description,
      action: options.action,
      id,
      icon: toastIcons.success,
    });
  };

  const error = (
    message: string,
    options: Omit<ToastOptions, "type"> = {}
  ): string | number => {
    const id = options.id || generateId();

    return sonnerToast.error(message, {
      duration: options.duration || duration,
      description: options.description,
      action: options.action,
      id,
      icon: toastIcons.error,
    });
  };

  const warning = (
    message: string,
    options: Omit<ToastOptions, "type"> = {}
  ): string | number => {
    const id = options.id || generateId();

    return sonnerToast.warning(message, {
      duration: options.duration || duration,
      description: options.description,
      action: options.action,
      id,
      icon: toastIcons.warning,
    });
  };

  const info = (
    message: string,
    options: Omit<ToastOptions, "type"> = {}
  ): string | number => {
    const id = options.id || generateId();

    return sonnerToast.info(message, {
      duration: options.duration || duration,
      description: options.description,
      action: options.action,
      id,
      icon: toastIcons.info,
    });
  };

  const loading = (
    message: string,
    options: Omit<ToastOptions, "type"> = {}
  ): string | number => {
    const id = options.id || generateId();

    return sonnerToast.loading(message, {
      duration: options.duration || Infinity, // Loading toasts should persist
      description: options.description,
      id,
      icon: toastIcons.loading,
    });
  };

  const dismiss = (id?: string | number): void => {
    if (id) {
      sonnerToast.dismiss(id);
    } else {
      sonnerToast.dismiss();
    }
  };

  const dismissAll = (): void => {
    sonnerToast.dismiss();
  };

  const contextValue: ToastContextType = {
    toast: showToast,
    success,
    error,
    warning,
    info,
    loading,
    dismiss,
    dismissAll,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toaster
        theme={theme as "light" | "dark" | "system"}
        position={position}
        closeButton={closeButton}
        richColors={richColors}
        expand={true}
        visibleToasts={5}
        toastOptions={{
          duration,
          style: {
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
          },
          className: "toast-custom",
          actionButtonStyle: {
            background: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          },
          cancelButtonStyle: {
            background: "hsl(var(--muted))",
            color: "hsl(var(--muted-foreground))",
          },
        }}
      />
    </ToastContext.Provider>
  );
}

// Custom hook to use toast
export function useToast(): ToastContextType {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}

// Utility hook for common toast patterns (Fixed)
export function useToastPatterns() {
  const toast = useToast();

  const promiseToast = async <T,>(
    promise: Promise<T>,
    {
      loading: loadingMessage = "Loading...",
      success: successMessage = "Success!",
      error: errorMessage = "Something went wrong",
    }: {
      loading?: string;
      success?: string | ((data: T) => string);
      error?: string | ((error: unknown) => string);
    } = {}
  ): Promise<T> => {
    // Generate unique ID and start loading toast
    const toastId = toast.loading(loadingMessage);

    try {
      const result = await promise;

      // Dismiss loading toast and show success
      toast.dismiss(toastId);
      toast.success(
        typeof successMessage === "function"
          ? successMessage(result)
          : successMessage
      );

      return result;
    } catch (error) {
      // Dismiss loading toast and show error
      toast.dismiss(toastId);
      toast.error(
        typeof errorMessage === "function" ? errorMessage(error) : errorMessage
      );

      throw error;
    }
  };

  const confirmToast = (
    message: string,
    onConfirm: () => void | Promise<void>,
    {
      confirmLabel = "Confirm",
      // cancelLabel = "Cancel",
      description,
    }: {
      confirmLabel?: string;
      cancelLabel?: string;
      description?: string;
    } = {}
  ): string | number => {
    return toast.warning(message, {
      description,
      duration: Infinity,
      action: {
        label: confirmLabel,
        onClick: async () => {
          try {
            await onConfirm();
          } catch (error) {
            console.error("Confirm action failed:", error);
          }
        },
      },
    });
  };

  const sequentialToast = async <T,>(
    promises: Array<{
      promise: Promise<T>;
      loadingMessage?: string;
      successMessage?: string | ((data: T) => string);
      errorMessage?: string | ((error: unknown) => string);
    }>
  ): Promise<T[]> => {
    const results: T[] = [];

    for (let i = 0; i < promises.length; i++) {
      const { promise, loadingMessage, successMessage, errorMessage } =
        promises[i];

      try {
        const result = await promiseToast(promise, {
          loading: loadingMessage || `Step ${i + 1} of ${promises.length}...`,
          success: successMessage || `Step ${i + 1} completed`,
          error: errorMessage || `Step ${i + 1} failed`,
        });

        results.push(result);
      } catch (error) {
        throw new Error(`Failed at step ${i + 1}: ${error}`);
      }
    }

    return results;
  };

  return {
    promiseToast,
    confirmToast,
    sequentialToast,
  };
}
