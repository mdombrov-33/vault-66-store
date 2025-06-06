"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useCrtMode() {
  const { theme, resolvedTheme } = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);

  //* Determine if current theme is dark (taking system fallback into account)
  const isDarkMode = (theme === "system" ? resolvedTheme : theme) === "dark";

  //* Sync crt-mode class with state
  useEffect(() => {
    if (isEnabled && isDarkMode) {
      document.body.classList.add("crt-mode");
    } else {
      document.body.classList.remove("crt-mode");
    }
  }, [isEnabled, isDarkMode]);

  //* If dark mode turns off, disable CRT mode automatically
  useEffect(() => {
    if (!isDarkMode) {
      setIsEnabled(false);
    }
  }, [isDarkMode]);

  return {
    isEnabled,
    toggle: () => setIsEnabled((prev) => !prev),
    isDarkMode,
    resolvedTheme,
  };
}
