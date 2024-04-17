"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ISearchField {
  placeholder: string;
  leftIcon   : React.ReactNode;
  routeType ?: string;
  searchType?: string;
}

export const SearchField = ({
  placeholder,
  leftIcon,
  routeType,
  searchType,
}: ISearchField) => {
  const router              = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/search/${routeType}?${searchType}=` + search);
      } else {
        router.push(`/search/${routeType}`)
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType]);
  return (
    <div className="relative">
      {leftIcon}
      <input onChange={(e) => setSearch(e.target.value)} type="text" className="search-field" placeholder={placeholder} />
    </div>
  )
}