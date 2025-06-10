"use client";

import React from "react";

export default function NukaColaSpinner() {
  return (
    <div aria-label="Loading" role="status" style={{ perspective: "100px" }}>
      <svg
        className="animate-spin-slow w-24 h-24"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Red circular cap */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="#C62828"
          stroke="#7B0000"
          strokeWidth="5"
        />

        {/* White teeth edges (like bottle cap ridges) */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 50 + Math.cos(angle) * 45;
          const y1 = 50 + Math.sin(angle) * 45;
          const x2 = 50 + Math.cos(angle) * 40;
          const y2 = 50 + Math.sin(angle) * 40;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}

        <text
          x="50"
          y="60"
          textAnchor="middle"
          fontFamily="'Arial Black', Gadget, sans-serif"
          fontSize="18"
          fill="white"
          fontWeight="bold"
          style={{ userSelect: "none" }}
        >
          NUKA
        </text>
      </svg>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
