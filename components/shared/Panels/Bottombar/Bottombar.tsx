"use client"

import { sidebarLinks } from "@/constants";
import Link             from "next/link";
import { usePathname }  from "next/navigation";

export const Bottombar = () => {
  const pathname  = usePathname();

  return (
    <footer className="bottombar">
      {sidebarLinks.map((link) => {
        const isActive = (pathname === link.route);
        return (
          <Link key={link.route} href={link.route} className={`bottombar__link ${isActive && 'link-button-active'}`}>
            {link.image}
            <span className="max-sm:hidden text-white mt-1">{link.label}</span>
          </Link>
        )
      })}
    </footer>
  )
};