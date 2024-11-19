import { profileLinks } from "@/constants";
import { ArrowSortDownIcon, ArrowSortUpIcon } from "@/icons";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface IProfileNavigationPanel {
  userId: string;
  className?: string;
  selfId?: string;
}

export const ProfileNavigationPanel = ({
  userId,
  className,
  selfId,
}: IProfileNavigationPanel) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const pathname = router.asPath;
  const currentSort = router.query.sortBy;

  const [sortBy, setSortBy] = useState<string>("desc");

  const handleChangeSort = () => {
    setSortBy((prevSortBy) => {
      const newSortBy = prevSortBy === "desc" ? "asc" : "desc";
      router.push(`/profile/${userId}?sortBy=${newSortBy}`);
      return newSortBy;
    });
  };

  return (
    <nav
      className={`w-full flex justify-between py-1 px-3 max-[409px]:dark:bg-[#171818] max-[409px]:bg-bg-c-8 rounded-xl ${className}`}
    >
      <div className="flex w-full max-w-xs max-[695px]:max-w-[200px] justify-between">
        {profileLinks.map((link) => {
          let route = link.route;

          if (route === "/profile") route = `${route}/${userId}`;

          if (route === "/profile/liked") {
            route = `/profile/${selfId}/liked`;
            if (userId !== selfId) {
              return null;
            }
          }

          if (route === "/profile/saved") {
            route = `/profile/${selfId}/saved`;
            if (userId !== selfId) {
              return null;
            }
          }

          let isActive = pathname === route;
          let label = link.label;

          if (
            pathname === `/profile/${userId}?sortBy=${currentSort}` &&
            route === `/profile/${userId}`
          ) {
            isActive = true;
          }

          return (
            <Link
              key={link.label}
              className={`${
                route === `/profile/${userId}/saved` && "mx-2"
              } justify-center p-2 my-[6px] min-w-[409px]:px-3 profile-link rounded-xl flex items-center max-w-[186px] max-[695px]:!w-10 ${
                isActive && "link-text profile-link-active"
              }`}
              href={route}
            >
              {link.icon}
              <p className="max-[695px]:hidden ml-1">{t(label)}</p>
            </Link>
          );
        })}
      </div>
      {(pathname === `/profile/${userId}` ||
        pathname === `/profile/${userId}?sortBy=${currentSort}`) && (
        <button onClick={handleChangeSort}>
          {sortBy === "desc" ? (
            <div className="flex gap-3">
              <ArrowSortDownIcon className="w-6 h-6 fill-color-666" />
              <p className="block text-color-666 max-sm:hidden">
                {t("sort-new-old")}
              </p>
            </div>
          ) : (
            <div className="flex gap-3">
              <ArrowSortUpIcon className="w-6 h-6 fill-color-666" />
              <p className="text-color-666 max-sm:hidden">
                {t("sort-old-new")}
              </p>
            </div>
          )}
        </button>
      )}
    </nav>
  );
};
