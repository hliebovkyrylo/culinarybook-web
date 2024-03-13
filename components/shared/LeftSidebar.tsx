"use client"

import Link             from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname }  from "next/navigation";
import { LogoIcon }     from "@/icons/icons/LogoIcon/LogoIcon";

const LeftSidebar = () => {
  const pathname = usePathname();

  const userId = "3489hg33934hujgg"

  return (
    <aside className="leftsidebar">
      <div className="flex items-center ml-14 mb-10">
        <LogoIcon className="icon-color"/>
        <span className="leftsidebar__text">Recipebook</span>
      </div>
      {sidebarLinks.map((link) => {
        const isActive = pathname.startsWith(link.route) && link.route.length > 1 || pathname === link.route;

        if (link.route === '/profile') link.route = `${link.route}/${userId}`

        return (
          <Link key={link.route} href={link.route === '/search' ? '/search/recipes' : link.route} className={`link-button ${isActive && 'link-button-active'}`}>
            {link.image}
            <span className="leftsidebar__text ml-2">{link.label}</span>
          </Link>
        )
      })}
    </aside>
  )
};

export default LeftSidebar;