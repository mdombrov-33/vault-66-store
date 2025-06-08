"use client";

import { ADMIN_LINKS } from "@/data/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSoundPlayer } from "@/hooks/useSoundPlayer";

function AdminSidebar() {
  const pathname = usePathname();
  const { playClick } = useSoundPlayer();

  return (
    <aside>
      {ADMIN_LINKS.map((adminLink) => {
        const isActivePage = pathname === adminLink.href;
        const variant = isActivePage ? "default" : "ghost";
        return (
          <Button
            asChild
            className="w-full mb-2 capitalize font-normal justify-start text-xl"
            variant={variant}
            key={adminLink.href}
            onClick={() => playClick()}
          >
            <Link href={adminLink.href}>{adminLink.label}</Link>
          </Button>
        );
      })}
    </aside>
  );
}

export default AdminSidebar;
