import SectionTitle from '@/components/global/SectionTitle'
import React from 'react'
import ProfileSidebarWrapper from '@/app/profile/ProfileSidebarWrapper'

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-96 -mt-10">
      <SectionTitle text="PROFILE" />
      <div className="grid lg:grid-cols-12 gap-12 mt-12">
        <div className="lg:col-span-2">
          <ProfileSidebarWrapper />
        </div>
        <div className="lg:col-span-10 px-4">{children}</div>
      </div>
    </section>
  )
}

export default ProfileLayout
