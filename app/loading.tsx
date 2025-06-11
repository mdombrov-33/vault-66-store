"use client";

import NukaColaSpinner from "@/components/global/NukaSpinner";

function loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <NukaColaSpinner />
    </div>
  );
}

export default loading;
