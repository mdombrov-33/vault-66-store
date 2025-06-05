import { Separator } from "@/components/ui/separator";
import AdminSidebar from "./Sidebar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-4xl pl-4">Dashboard</h2>
      <Separator className="mt-2" />
      <section className="grid lg:grid-cols-12 gap-12 mt-12">
        <div className="lg:col-span-2">
          <AdminSidebar />
        </div>
        <div className="lg:col-span-10 px-4">{children}</div>
      </section>
    </>
  );
}

export default DashboardLayout;
