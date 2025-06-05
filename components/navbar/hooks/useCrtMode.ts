"use client";

import { useEffect, useState } from "react";

export function useCrtMode() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (isEnabled) {
      document.body.classList.add("crt-mode");
    } else {
      document.body.classList.remove("crt-mode");
    }
  }, [isEnabled]);

  return { isEnabled, toggle: () => setIsEnabled((prev) => !prev) };
}
