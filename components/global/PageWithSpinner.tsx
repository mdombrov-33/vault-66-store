"use client";
import React, { useEffect, useState } from "react";
import NukaColaSpinner from "@/components/global/NukaSpinner";

export default function PageWithSpinner({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(false), 500); // 0.5 sec delay
    return () => clearTimeout(timer);
  }, []);

  if (showSpinner) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <NukaColaSpinner />
      </div>
    );
  }

  return <>{children}</>;
}
