"use client"

import Link             from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname }  from "next/navigation";
import { LogoIcon }     from "@/icons/icons/LogoIcon/LogoIcon";
import { useTranslation } from "react-i18next";
import { useGetMeQuery } from "@/lib/api/userApi";
import { Loader } from "../../Loader";

export const LeftSidebar = () => {
  const { t }    = useTranslation();
  const pathname = usePathname();

  const { data: user, isLoading } = useGetMeQuery();

  if (isLoading) {
    return <Loader className="absolute left-0 top-0" />
  }

  return (
    <aside className="leftsidebar">
      <div className="flex items-center ml-14 mb-10">
        <LogoIcon className="icon-color"/>
        <span className="leftsidebar__text">Recipebook</span>
      </div>
      {sidebarLinks.map((link) => {
        const isActive = pathname.startsWith(link.route) && link.route.length > 1 || pathname === link.route;

        if (link.route === '/profile') {
          link.route = `${link.route}/${user?.id}`
          if (!user) {
            link.route = '/sign-in'
          }
        }

        if (link.route === '/create-recipe' && !user) {
          link.route = '/sign-in'
        }

        const label = link.label;

        return (
          <Link key={link.route} href={link.route === '/search' ? '/search/recipes' : link.route} className={`link-button ${isActive && 'link-button-active'}`}>
            {link.image}
            <span className="leftsidebar__text ml-2">{t(label)}</span>
          </Link>
        )
      })}
    </aside>
  )
};