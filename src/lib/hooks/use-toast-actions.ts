"use client";

import { useToast, useToastPatterns } from "app/providers/toast";
import { ApiError } from "./use-toast-actions";
import { ToastActionMessages } from "./use-toast-actions";
import { NetworkError } from "./use-toast-actions";
import { FileUploadFunction } from "./use-toast-actions";

export function useToastActions() {
  const toast = useToast();
  const { promiseToast, confirmToast } = useToastPatterns();

  // Helper function to handle errors properly
  const handleError = (error: unknown): ApiError => {
    if (error instanceof Error) {
      return {
        message: error.message,
        code: "UNKNOWN_ERROR",
        details: { originalError: error.name },
      };
    }

    if (typeof error === "object" && error !== null && "message" in error) {
      return error as ApiError;
    }

    return {
      message: "An unexpected error occurred",
      code: "UNKNOWN_ERROR",
      details: { originalError: String(error) },
    };
  };

  // API action toasts with proper typing
  const apiActionToast = async <TData = unknown>(
    action: () => Promise<TData>,
    messages: ToastActionMessages<TData> = {}
  ): Promise<TData> => {
    return promiseToast(action(), {
      loading: messages.loading || "Processing...",
      success: messages.success || "Action completed successfully",
      error: messages.error || "Action failed. Please try again.",
    });
  };

  // Form submission toast
  const formSubmitToast = async <TData = Record<string, unknown>>(
    submitFn: () => Promise<TData>,
    formName: string = "form"
  ): Promise<TData> => {
    return apiActionToast(submitFn, {
      loading: `Submitting ${formName}...`,
      success: `${formName} submitted successfully!`,
      error: `Failed to submit ${formName}. Please try again.`,
    });
  };

  // Copy to clipboard toast
  const copyToClipboardToast = async (
    text: string,
    label: string = "Text"
  ): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch (error: unknown) {
      const errorInfo = handleError(error);
      toast.error(
        `Failed to copy ${label.toLowerCase()}: ${errorInfo.message}`
      );
      throw errorInfo;
    }
  };

  // Delete confirmation toast
  const deleteConfirmToast = (
    itemName: string,
    onDelete: () => void | Promise<void>
  ): string | number => {
    return confirmToast(
      `Delete ${itemName}?`,
      async () => {
        try {
          await onDelete();
          toast.success(`${itemName} deleted successfully`);
        } catch (error: unknown) {
          const errorInfo = handleError(error);
          toast.error(`Failed to delete ${itemName}: ${errorInfo.message}`);
          throw errorInfo;
        }
      },
      {
        confirmLabel: "Delete",
        description: "This action cannot be undone.",
      }
    );
  };

  // Network error toast with retry option
  const networkErrorToast = (
    error: NetworkError | ApiError | Error | unknown,
    retryFn?: () => void | Promise<void>
  ): string | number => {
    const errorInfo = handleError(error);
    const message = errorInfo.message || "Network error occurred";

    return toast.error(message, {
      description: "Please check your internet connection and try again.",
      duration: 6000,
      action: retryFn
        ? {
            label: "Retry",
            onClick: async () => {
              try {
                await retryFn();
              } catch (retryError: unknown) {
                const retryErrorInfo = handleError(retryError);
                console.error("Retry failed:", retryErrorInfo);
                toast.error(`Retry failed: ${retryErrorInfo.message}`);
              }
            },
          }
        : undefined,
    });
  };

  // Session expired toast
  const sessionExpiredToast = (): string | number => {
    return toast.warning("Session expired", {
      description: "Please log in again to continue.",
      action: {
        label: "Login",
        onClick: () => {
          window.location.href = "/login";
        },
      },
      duration: Infinity,
    });
  };

  // File upload progress toast with proper typing
  const fileUploadToast = async <TResult = Record<string, unknown>>(
    uploadFn: FileUploadFunction,
    fileName: string = "file"
  ): Promise<TResult> => {
    let progressToastId: string | number | null = null;

    try {
      // Start with loading toast
      progressToastId = toast.loading(`Uploading ${fileName}...`);

      const result = await uploadFn((progress: number) => {
        if (progressToastId) {
          toast.dismiss(progressToastId);
        }
        progressToastId = toast.loading(
          `Uploading ${fileName}... ${Math.round(progress)}%`
        );
      });

      // Success
      if (progressToastId) {
        toast.dismiss(progressToastId);
      }
      toast.success(`${fileName} uploaded successfully!`);

      return result as TResult;
    } catch (error: unknown) {
      // Error
      if (progressToastId) {
        toast.dismiss(progressToastId);
      }

      const errorInfo = handleError(error);
      toast.error(`Failed to upload ${fileName}: ${errorInfo.message}`);
      throw errorInfo;
    }
  };

  // Batch operation toast
  const batchOperationToast = async <TItem, TResult>(
    items: TItem[],
    operationFn: (item: TItem) => Promise<TResult>,
    operationName: string = "operation"
  ): Promise<TResult[]> => {
    const results: TResult[] = [];
    const total = items.length;
    let progressToastId: string | number | null = null;

    try {
      progressToastId = toast.loading(
        `Processing ${operationName}... 0/${total}`
      );

      for (let i = 0; i < items.length; i++) {
        const result = await operationFn(items[i]);
        results.push(result);

        // Update progress
        if (progressToastId) {
          toast.dismiss(progressToastId);
        }
        progressToastId = toast.loading(
          `Processing ${operationName}... ${i + 1}/${total}`
        );
      }

      // Success
      if (progressToastId) {
        toast.dismiss(progressToastId);
      }
      toast.success(
        `${operationName} completed successfully! (${total} items)`
      );

      return results;
    } catch (error: unknown) {
      if (progressToastId) {
        toast.dismiss(progressToastId);
      }

      const errorInfo = handleError(error);
      toast.error(`${operationName} failed: ${errorInfo.message}`);
      throw errorInfo;
    }
  };

  // Auto-retry toast for failed operations
  const autoRetryToast = async <TData>(
    operation: () => Promise<TData>,
    {
      maxRetries = 3,
      retryDelay = 1000,
      operationName = "operation",
    }: {
      maxRetries?: number;
      retryDelay?: number;
      operationName?: string;
    } = {}
  ): Promise<TData> => {
    let lastError: ApiError | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 1) {
          toast.info(`Retrying ${operationName}... (${attempt}/${maxRetries})`);
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }

        return await operation();
      } catch (error: unknown) {
        lastError = handleError(error);

        if (attempt === maxRetries) {
          toast.error(
            `${operationName} failed after ${maxRetries} attempts: ${lastError.message}`
          );
          throw lastError;
        }
      }
    }

    // This should never be reached, but TypeScript needs it
    throw lastError || new Error(`${operationName} failed`);
  };

  return {
    apiActionToast,
    formSubmitToast,
    copyToClipboardToast,
    deleteConfirmToast,
    networkErrorToast,
    sessionExpiredToast,
    fileUploadToast,
    batchOperationToast,
    autoRetryToast,
  };
}

// Export types for external use
export type {
  ApiError,
  NetworkError,
  ToastActionMessages,
  FileUploadFunction,
  UploadProgressCallback,
} from "../../types/toast";
