"use client"

import { SearchButtons, SearchField, SearchLayout } from "@/components/search";
import { GlassIcon }                                from "@/icons";
import { usePathname } from "next/navigation";
import { useTranslation }                           from "react-i18next";

const SearchPageLayout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  const pathname = usePathname();

  let type = pathname === '/search/recipes' ? 'recipes' : 'users' 

  return (
    <SearchLayout title={t('title-search')}>
      <div className="my-6">
        <SearchField 
          placeholder={t('input-placeholder')}
          leftIcon={<GlassIcon className="absolute top-1.5 left-3 fill-[#666]" />} 
          routeType={type}
          searchType={type === 'recipes' ? 'title' : 'username'}
        />
        <SearchButtons className="mt-3" />
      </div>
      {children}
    </SearchLayout>
  )
}

export default SearchPageLayout;