"use client"

import { sidebarLinks } from "@/constants";
import Link             from "next/link";
import Image            from "next/image";
import { usePathname }  from "next/navigation";
import { useTheme }     from "next-themes";

const Bottombar = () => {
  const pathname  = usePathname();
  const { theme } = useTheme();

  return (
    <section className="bottombar">
      {sidebarLinks.map((link) => {
        const isActive = (pathname === link.route);
        return (
          <Link key={link.route} href={link.route} className={`bottombar__link ${isActive && 'link-button-active'}`}>
            {link.image}
            <span className="max-sm:hidden text-white mt-1">{link.label}</span>
          </Link>
        )
      })}
    </section>
  )
};

export default Bottombar;