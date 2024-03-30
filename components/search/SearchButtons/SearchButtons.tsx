"use client"

import Link            from "next/link"
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export const SearchButtons = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const { t }    = useTranslation()

  const isActiveRecipesSearch = pathname === `/search/recipes`;
  const isActiveUsersSearch   = pathname === `/search/users`;

  return (
    <div className={`flex ${className}`}>
      <Link href={`/search/recipes`} className={`search-button mr-2 ${isActiveRecipesSearch ? "link-text" : ""}`}>{t('recipes-button')}</Link>
      <Link href={`/search/users`} className={`search-button ${isActiveUsersSearch ? "link-text" : ""}`}>{t('users-button')}</Link>
    </div>
  )
}