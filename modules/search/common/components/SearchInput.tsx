import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ISearchInput {
  placeholder: string;
  leftIcon: React.ReactNode;
  routeType?: string;
  searchType?: string;
}

export const SearchInput = ({
  placeholder,
  leftIcon,
  routeType,
  searchType,
}: ISearchInput) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search) {
      router.push(`/search/${routeType}?${searchType}=` + search);
    } else {
      router.push(`/search/${routeType}`)
    }
  }, [search, routeType]);
  return (
    <div className="relative my-3">
      {leftIcon}
      <input onChange={(e) => setSearch(e.target.value)} type="text" className="search-field" placeholder={placeholder} />
    </div>
  )
}