import SpecialResultStats from "@/components/profile/special/results/SpecialResultStats";
import SpecialResultText from "@/components/profile/special/results/SpecialResultsText";
import { SpecialPageResultsProps } from "@/types/profile";

function SpecialPageResults({ specialRecord }: SpecialPageResultsProps) {
  return (
    <section className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Column: SPECIAL Results */}
      <div className="bg-primary/10 rounded-lg p-4 shadow-md flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold uppercase mb-4 tracking-wider">
          S.P.E.C.I.A.L. Results
        </h1>
        <SpecialResultStats specialRecord={specialRecord} />
      </div>

      {/* Right Column: Flavor Text */}
      <SpecialResultText specialRecord={specialRecord} />
    </section>
  );
}

export default SpecialPageResults;
