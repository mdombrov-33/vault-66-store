"use client";

import { adminLinks } from "@/data/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside>
      {adminLinks.map((adminLink) => {
        const isActivePage = pathname === adminLink.href;
        const variant = isActivePage ? "default" : "ghost";
        return (
          <Button
            asChild
            className="w-full mb-2 capitalize font-normal justify-start"
            variant={variant}
            key={adminLink.href}
          >
            <Link href={adminLink.href}>{adminLink.label}</Link>
          </Button>
        );
      })}
    </aside>
  );
}

export default Sidebar;
