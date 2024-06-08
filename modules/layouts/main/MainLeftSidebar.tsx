import Link               from "next/link";
import { sidebarLinks }   from "@/constants";
import { LogoIcon }       from "@/icons/icons/LogoIcon/LogoIcon";
import { useTranslation } from "next-i18next";
import { useGetMeQuery }  from "@/lib/api/userApi";
import { Loader }         from "@/components/shared";
import { useRouter }      from "next/router";

export const MainLeftSidebar = () => {
  const { t }  = useTranslation('common');
  const router = useRouter();

  const pathname = router.asPath;

  const { data: user, isLoading } = useGetMeQuery();

  if (isLoading) {
    return <Loader className="absolute left-0 top-0" />
  }

  const links = sidebarLinks.map(link => {
    let route = link.route;
    if (link.route === '/profile') {
      route = user ? `${link.route}/${user.id}` : '/sign-in';
    } else if (link.route === '/create-recipe' && !user) {
      route = '/sign-in';
    }
    return { ...link, route };
  });

  return (
    <aside className="sticky top-0 pt-12 flex flex-col w-width-300 h-screen dark:bg-bg-c-2 bg-white max-2xl:hidden drop-shadow-xl z-50">
      <Link href={'/'} className="flex items-center my-6 ml-12">
        <LogoIcon className="icon-color"/>
        <span className="leftsidebar__text">Culinarybook</span>
      </Link>
      {links.map((link, index) => {
        const isActive = pathname.startsWith(link.route) && link.route.length > 1 || pathname === link.route;
        const label    = link.label;
        return (
          <Link key={index} href={link.route === '/search' ? '/search/recipes' : link.route} className={`link-button ${isActive && 'link-button-active'}`}>
            {link.image}
            <span className="leftsidebar__text ml-2">{t(label)}</span>
          </Link>
        )
      })}
    </aside>
  )
};