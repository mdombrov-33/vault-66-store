import SectionTitle from "@/components/global/SectionTitle";
import React from "react";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SectionTitle text="your profile" />
      <section className="grid grid-cols-4 gap-8 p-8">
        {/* PROFILE SECTIONS */}
        <div>
          <ProfileSidebar />
        </div>
        {/* PROFILE CONTENT */}
        <div className="col-span-3">{children}</div>
      </section>
    </>
  );
}

export default ProfileLayout;
