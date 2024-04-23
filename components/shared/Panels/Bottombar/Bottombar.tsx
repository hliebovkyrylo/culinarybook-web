"use client"

import { sidebarLinks }   from "@/constants";
import { useGetMeQuery }  from "@/lib/api/userApi";
import Link               from "next/link";
import { usePathname }    from "next/navigation";
import { useTranslation } from "react-i18next";
import { Loader }         from "../../Loader";

export const Bottombar = () => {
  const { t }     = useTranslation()
  const pathname  = usePathname();

  const { data: user, isLoading } = useGetMeQuery();
  const userId                    = user?.id;

  if (isLoading) {
    return <Loader className="absolute left-0 top-0" />
  }

  return (
    <footer className="bottombar">
      {sidebarLinks.map((link) => {
        const isActive = pathname.startsWith(link.route) && link.route.length > 1 || pathname === link.route;

        if (link.route === '/profile') link.route = `${link.route}/${userId}`

        const label = link.label;

        return (
          <Link key={link.route} href={link.route === '/search' ? '/search/recipes' : link.route} className={`bottombar__link ${isActive && 'link-button-active'}`}>
            {link.image}
            <span className="max-sm:hidden text-white mt-1">{t(label)}</span>
          </Link>
        )
      })}
    </footer>
  )
};