import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { IUserMe } from "@/typings/user";

export const MainBottombar = ({ user }: { user?: IUserMe }) => {
  const { t } = useTranslation('common');

  const router = useRouter();
  const pathname = router.pathname;

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
    <footer className="bottombar">
      {links.map((link, index) => {
        const isActive = pathname.startsWith(link.route) && link.route.length > 1 || pathname === link.route;

        const label = link.label;
        return (
          <Link key={index} href={link.route === '/search' ? '/search/recipes' : link.route} className={`bottombar__link ${isActive && 'link-button-active'}`}>
            {link.image}
            <span className="max-sm:hidden text-white mt-1">{t(label)}</span>
          </Link>
        )
      })}
    </footer>
  )
};