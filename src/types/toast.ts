export type ToastType = "success" | "error" | "warning" | "info" | "loading";

export interface ToastOptions {
  id?: string;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  dismissible?: boolean;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

export interface ToastContextType {
  toast: (message: string, options?: ToastOptions) => string | number;
  success: (
    message: string,
    options?: Omit<ToastOptions, "type">
  ) => string | number;
  error: (
    message: string,
    options?: Omit<ToastOptions, "type">
  ) => string | number;
  warning: (
    message: string,
    options?: Omit<ToastOptions, "type">
  ) => string | number;
  info: (
    message: string,
    options?: Omit<ToastOptions, "type">
  ) => string | number;
  loading: (
    message: string,
    options?: Omit<ToastOptions, "type">
  ) => string | number;
  dismiss: (id?: string | number) => void;
  dismissAll: () => void;
}

// Error handling types
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}

export interface NetworkError extends Error {
  name: "NetworkError";
  message: string;
  cause?: unknown;
}

// FIXED: Messages interface with proper error type alignment
export interface ToastActionMessages<T = unknown> {
  loading?: string;
  success?: string | ((data: T) => string);
  error?: string | ((error: unknown) => string); // ✅ Changed to unknown
}

export interface UploadProgressCallback {
  (progress: number): void;
}

export interface FileUploadFunction {
  (onProgress: UploadProgressCallback): Promise<unknown>;
}

// Utility type for error conversion
export type ErrorConverter = (error: unknown) => ApiError;
