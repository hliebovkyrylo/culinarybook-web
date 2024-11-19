import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { LogoIcon } from "@/icons/icons/LogoIcon/LogoIcon";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { IUserMe } from "@/typings/user";
import Image from "next/image";

export const MainLeftSidebar = ({ user }: { user?: IUserMe }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const pathname = router.asPath;

  const links = sidebarLinks.map((link) => {
    let route = link.route;
    if (link.route === "/profile") {
      route = user ? `${link.route}/${user.id}` : "/sign-in";
    } else if (link.route === "/create-recipe" && !user) {
      route = "/sign-in";
    }
    return { ...link, route };
  });

  return (
    <aside className="sticky top-0 pt-12 px-3 flex flex-col w-width-300 h-screen bg-[#F6F6F6] dark:bg-[#141414] border-r-[1px] dark:border-[#242424] border-[#ddd] max-2xl:hidden drop-shadow-xl">
      <Link href={"/"} className="flex items-center justify-center my-6 gap-1">
        <Image src={"/logo.png"} width={72} height={72} alt="Logo" />
        <span className="leftsidebar__text">
          Culinarybook <b className="dark:text-white text-black italic">beta</b>
        </span>
      </Link>
      {links.map((link, index) => {
        const isActive =
          (pathname.startsWith(link.route) && link.route.length > 1) ||
          pathname === link.route;
        const label = link.label;
        return (
          <Link
            key={index}
            href={link.route === "/search" ? "/search/recipes" : link.route}
            className={`flex items-center gap-3 dark:hover:bg-bg-c-3 hover:bg-[#ddd] px-10 py-2 rounded-lg mt-1 transition-all ${
              isActive && "link-button-active"
            }`}
          >
            {link.image}
            <span className="dark:text-white text-black">{t(label)}</span>
          </Link>
        );
      })}
    </aside>
  );
};
