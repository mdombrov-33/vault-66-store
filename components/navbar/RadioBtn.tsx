"use client";

import { Button } from "@/components/ui/button";
import { Radio } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { RADIO_STATIONS } from "@/data/nav";
import { useState } from "react";

function RadioBtn() {
  const [station, setStation] = useState<string | null>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Radio className="h-5 w-5" />
            <span className="sr-only">Radio Station</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {RADIO_STATIONS.map((station) => {
            return (
              <DropdownMenuItem
                onClick={() => setStation(station.url)}
                key={station.id}
              >
                {station.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {station && <iframe src={station} />}
    </>
  );
}

export default RadioBtn;
