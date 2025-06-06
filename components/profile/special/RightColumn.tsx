"use client";

import { specialData } from "@/data/profile/special";
import { HoverSpecialProps } from "@/types/profile";
import Image from "next/image";

function RightColumn({ hoveredStat }: HoverSpecialProps) {
  const currentSpecial = specialData.find((stat) => stat.name === hoveredStat);

  return (
    <div className="p-4">
      {currentSpecial ? (
        <div className="flex flex-col items-center -mt-14">
          <Image
            src={currentSpecial.icon}
            className="mb-2"
            width={200}
            height={200}
            alt={`${currentSpecial.name} icon`}
            sizes="(min-width: 768px) 50vw"
          />
          <h2 className="text-7xl uppercase font-bold text-primary tracking-wider">
            {currentSpecial.name}
          </h2>
          <p className="text-muted-foreground text-2xl mt-2 font-[roboto]">
            {currentSpecial.description}
          </p>
        </div>
      ) : (
        <p className="text-muted-foreground text-2xl">
          Hover over a stat to see details.
        </p>
      )}
    </div>
  );
}

export default RightColumn;
