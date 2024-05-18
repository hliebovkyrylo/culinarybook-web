import Link                       from "next/link";
import { sidebarLinks }           from "@/constants";
import { LogoIcon }               from "@/icons/icons/LogoIcon/LogoIcon";
import { useTranslation }         from "next-i18next";
import { useGetMeQuery }          from "@/lib/api/userApi";
import { Loader }                 from "@/components/shared";
import { useRouter }              from "next/router";

export const MainLeftSidebar = () => {
  const { t } = useTranslation('common');

  const router   = useRouter();
  const pathname = router.pathname;

  const { data: user, isLoading } = useGetMeQuery();

  if (isLoading) {
    return <Loader className="absolute left-0 top-0" />
  }

  return (
    <aside className="leftsidebar">
      <div className="flex items-center my-6 ml-12">
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