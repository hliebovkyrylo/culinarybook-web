"use client"

import { profileLinks } from "@/constants"
import Link             from "next/link"
import { usePathname }  from "next/navigation"

export const ProfilePanel = ({ userId, className }: { userId: string, className?: string }) => {
  const pathname = usePathname();

  return (
    <nav className={`w-full border-t-2 dark:border-[#363636] border-[#E9E9E9] py-2 ${className}`}>
      <div className="flex w-full max-w-sm mx-auto justify-between">
        {profileLinks.map((link => {
          const isActive = pathname.includes(link.route) && link.route.length > 1 || pathname === link.route;

          if (link.route === '/profile') link.route = `${link.route}/${userId}`

          if (link.route === '/profile/liked') link.route = `/profile/${userId}/liked`

          if (link.route === '/profile/saved') link.route = `/profile/${userId}/saved`

          return (
            <Link key={link.label} className={`my-[6px] profile-link rounded-md flex items-center w-28 justify-center ${isActive && "link-text profile-link-active"}`} href={link.route}>{link.icon}{link.label}</Link>
          )
        }))}
      </div>
    </nav>
  )
}