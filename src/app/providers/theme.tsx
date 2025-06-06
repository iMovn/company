"use client";

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="dark" // Luôn mặc định dark mode
      enableSystem={false} // Tắt system preference
      storageKey="theme" // Key cho localStorage
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
