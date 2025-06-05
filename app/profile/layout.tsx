import SectionTitle from "@/components/global/SectionTitle";
import React from "react";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SectionTitle text="your profile" />
      <section className="grid lg:grid-cols-12 gap-12 mt-12">
        <div className="lg:col-span-2">
          <ProfileSidebar />
        </div>
        <div className="lg:col-span-10 px-4">{children}</div>
      </section>
    </>
  );
}

export default ProfileLayout;
