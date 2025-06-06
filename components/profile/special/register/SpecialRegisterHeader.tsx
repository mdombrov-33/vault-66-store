import { SpecialRegisterHeaderProps } from "@/types/profile";
import { TypeAnimation } from "react-type-animation";

function SpecialRegisterHeader({
  remainingPoints,
}: SpecialRegisterHeaderProps) {
  return (
    <div
      className="flex flex-col items-center text-center gap-2 px-4"
      role="region"
      aria-labelledby="remaining-points-label points-available-label"
    >
      <TypeAnimation
        sequence={["welcome to your S.P.E.C.I.A.L. profile", 2000]}
        wrapper="h1"
        speed={75}
        repeat={0}
        className="md:text-5xl text-3xl -mt-6 capitalize"
        cursor={false}
      />

      <p className="text-8xl" id="remaining-points-label">
        {remainingPoints}
      </p>

      <p
        className="text-2xl uppercase text-muted-foreground"
        id="points-available-label"
      >
        points available
      </p>
    </div>
  );
}

export default SpecialRegisterHeader;
