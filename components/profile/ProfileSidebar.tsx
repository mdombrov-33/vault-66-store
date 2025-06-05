"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { PROFILE_LINKS } from "@/data/nav";
import Link from "next/link";
import { SpecialRecord } from "@/types/profile";
import { cn } from "@/lib/utils";

function ProfileSidebar({
  specialRecord,
}: {
  specialRecord?: SpecialRecord | null;
}) {
  const pathname = usePathname();

  return (
    <aside>
      {PROFILE_LINKS.map((profileLink) => {
        const isActivePage = pathname === profileLink.href;
        const variant = isActivePage ? "default" : "ghost";
        const isDisabledSidebar =
          !specialRecord && profileLink.href === "/profile/goat";

        return (
          <Button
            asChild
            className={cn(
              "w-full mb-2 capitalize font-normal justify-start text-xl",
              isDisabledSidebar &&
                "opacity-50 cursor-not-allowed bg-muted-foreground text-card pointer-events-none"
            )}
            variant={variant}
            key={profileLink.href}
            disabled={isDisabledSidebar}
          >
            <Link
              onClick={(e) => {
                if (isDisabledSidebar) {
                  e.preventDefault();
                }
              }}
              href={profileLink.href}
            >
              {profileLink.label}
            </Link>
          </Button>
        );
      })}
    </aside>
  );
}

export default ProfileSidebar;
