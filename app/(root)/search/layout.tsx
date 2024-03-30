"use client"

import { SearchButtons, SearchField, SearchLayout } from "@/components/search";
import { GlassIcon }                                from "@/icons";
import { useTranslation }                           from "react-i18next";

const SearchPageLayout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  return (
    <SearchLayout title={t('title-search')}>
      <div className="my-6">
        <SearchField 
          placeholder={t('input-placeholder')}
          leftIcon={<GlassIcon className="absolute top-1.5 left-3 fill-[#666]" />} 
        />
        <SearchButtons className="mt-3" />
      </div>
      
        {children}
      
    </SearchLayout>
  )
}

export default SearchPageLayout;