"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { PROFILE_LINKS } from "@/data/nav";
import Link from "next/link";
import { SpecialRecord } from "@/types/profile";
import { cn } from "@/utils/cn";

function ProfileSidebar({
  specialRecord,
}: {
  specialRecord?: SpecialRecord | null;
}) {
  const pathname = usePathname();
  {
  }

  return (
    <aside>
      {PROFILE_LINKS.map((profileLink) => {
        const isActivePage = pathname === profileLink.href;
        const variant = isActivePage ? "default" : "ghost";
        const isDisabledGoat =
          !specialRecord && profileLink.href === "/profile/goat";

        return (
          <Button
            asChild
            onClick={() => {}}
            className={cn(
              "w-full mb-2 capitalize font-normal justify-start text-xl",
              isDisabledGoat &&
                "cursor-not-allowed pointer-events-none bg-[var(--sidebar-disabled-muted)] text-[var(--sidebar-disabled-muted-foreground)]"
            )}
            variant={variant}
            key={profileLink.href}
            disabled={isDisabledGoat}
          >
            <Link
              onClick={(e) => {
                if (isDisabledGoat) {
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
