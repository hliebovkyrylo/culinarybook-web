"use client"

import { sidebarLinks } from "@/constants";
import Link             from "next/link";
import { usePathname }  from "next/navigation";

export const Bottombar = () => {
  const pathname  = usePathname();

  const userId = "3489hg33934hujgg"

  return (
    <footer className="bottombar">
      {sidebarLinks.map((link) => {
        const isActive = pathname.startsWith(link.route) && link.route.length > 1 || pathname === link.route;

        if (link.route === '/profile') link.route = `${link.route}/${userId}`
        return (
          <Link key={link.route} href={link.route === '/search' ? '/search/recipes' : link.route} className={`bottombar__link ${isActive && 'link-button-active'}`}>
            {link.image}
            <span className="max-sm:hidden text-white mt-1">{link.label}</span>
          </Link>
        )
      })}
    </footer>
  )
};