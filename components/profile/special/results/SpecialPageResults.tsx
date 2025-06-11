import SpecialResultStats from "@/components/profile/special/results/SpecialResultStats";
import SpecialResultText from "@/components/profile/special/results/SpecialResultsText";
import { SpecialPageResultsProps } from "@/types/profile";

function SpecialPageResults({ specialRecord }: SpecialPageResultsProps) {
  return (
    <section className="max-w-5xl mx-auto px-2 grid grid-cols-1 md:grid-cols-2 gap-8 -mt-6 pb-26 sm:pb-16">
      {/* Left Column: SPECIAL Results */}
      <div className="bg-primary/10 rounded-lg shadow-md flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-bold uppercase mb-4 tracking-wider py-6 px-4">
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
