"use client"

import { profileLinks }                       from "@/constants"
import { ArrowSortDownIcon, ArrowSortUpIcon } from "@/icons"
import Link                                   from "next/link"
import { useParams, usePathname }             from "next/navigation"
import { useTranslation }                     from "react-i18next"

interface IProfilePanel {
  userId: string,
  className?: string,
  sortBy: string,
  handleChangeSort: () => void;
}

export const ProfilePanel = ({ 
  userId, 
  className,
  sortBy,
  handleChangeSort
}: IProfilePanel) => {
  const { t }    = useTranslation();
  const pathname = usePathname();

  const { id } = useParams();

  return (
    <nav className={`w-full flex justify-between py-1 px-3 max-[409px]:dark:bg-[#171818] max-[409px]:bg-bg-c-8 rounded-xl ${className}`}>
      <div className="flex w-full max-w-xs max-[695px]:max-w-[200px] justify-between">
        {profileLinks.map((link) => {
          let route = link.route;

          if (route === '/profile') route = `${route}/${id}`;

          if (route === '/profile/liked') {
            route = `/profile/${id}/liked`;
            if (userId !== id) {
              return null;
            }
          }

          if (route === '/profile/saved') {
            route = `/profile/${id}/saved`;
            if (userId !== id) {
              return null;
            }
          }

          const isActive = pathname === route && route.length > 1;
          let label = link.label;

          return (
            <Link key={link.label} className={`${route === `/profile/${userId}/saved` && 'mx-2'} justify-center p-2 my-[6px] min-w-[409px]:px-3 profile-link rounded-xl flex items-center max-w-[186px] max-[695px]:!w-10 ${isActive && "link-text profile-link-active"}`} href={route}>{link.icon}<p className="max-[695px]:hidden ml-1">{t(label)}</p></Link>
          );
        })}
      </div>
      {pathname === `/profile/${id}` && (
        <button onClick={handleChangeSort}>
          {sortBy === 'desc' ? (
            <div className="flex">
              <ArrowSortDownIcon className="w-6 h-6 fill-color-666" />
              <p className="block text-color-666 ml-3 max-sm:hidden">{t('sort-new-old')}</p>
            </div>
          ) : (
            <div className="flex">
              <ArrowSortUpIcon className="w-6 h-6 fill-color-666" />
              <p className="text-color-666 ml-3 max-sm:hidden">{t('sort-old-new')}</p>
            </div>
          )}
        </button>
      )}

    </nav>
  )
}