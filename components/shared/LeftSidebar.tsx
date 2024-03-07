"use client"

import Link             from "next/link";
import Image            from "next/image";
import { sidebarLinks } from "@/constants";
import { usePathname }  from "next/navigation";
import { LogoIcon }     from "@/icons/icons/LogoIcon/LogoIcon";

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="leftsidebar">
      <div className="flex items-center ml-14 mb-14">
        <LogoIcon className="icon-color"/>
        <span className="leftsidebar__text">Recipe book</span>
      </div>
      {sidebarLinks.map((link) => {
        const isActive = (pathname === link.route);
        return (
          <Link key={link.route} href={link.route} className={`link-button ${isActive && 'link-button-active'}`}>
            {link.image}
            <span className="leftsidebar__text ml-2">{link.label}</span>
          </Link>
        )
      })}
    </aside>
  )
};

export default LeftSidebar;