"use client";

import { useEffect, useState } from "react";

export function useCrtMode() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check dark mode by looking for 'dark' class on <html>
    function checkDarkMode() {
      return document.documentElement.classList.contains("dark");
    }

    // Initial set
    setIsDarkMode(checkDarkMode());

    // Observe dark mode class changes
    const observer = new MutationObserver(() => {
      const dark = checkDarkMode();
      setIsDarkMode(dark);

      // If dark mode is turned off, force CRT mode off and remove class
      if (!dark) {
        setIsEnabled(false);
        document.body.classList.remove("crt-mode");
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Side effect to add/remove crt-mode class when isEnabled or isDarkMode changes
  useEffect(() => {
    if (isEnabled && isDarkMode) {
      document.body.classList.add("crt-mode");
    } else {
      document.body.classList.remove("crt-mode");
    }
  }, [isEnabled, isDarkMode]);

  return { isEnabled, toggle: () => setIsEnabled((prev) => !prev), isDarkMode };
}
