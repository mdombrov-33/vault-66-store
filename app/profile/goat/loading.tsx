import NukaColaSpinner from "@/components/global/NukaSpinner";

function loading() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ transform: "translateX(100px)" }}
    >
      <NukaColaSpinner />
    </div>
  );
}

export default loading;
