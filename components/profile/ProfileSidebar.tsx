"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { PROFILE_LINKS } from "@/data/nav";
import Link from "next/link";
function ProfileSidebar() {
  const pathname = usePathname();
  return (
    <aside>
      {PROFILE_LINKS.map((profileLink) => {
        const isActivePage = pathname === profileLink.href;
        const variant = isActivePage ? "default" : "ghost";
        return (
          <Button
            asChild
            className="w-full mb-2 capitalize font-normal justify-start text-xl"
            variant={variant}
            key={profileLink.href}
          >
            <Link href={profileLink.href}>{profileLink.label}</Link>
          </Button>
        );
      })}
    </aside>
  );
}

export default ProfileSidebar;
