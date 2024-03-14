import Link from "next/link"
import { usePathname } from "next/navigation";

export const SearchButtons = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  const isActiveRecipesSearch = pathname === '/search/recipes';
  const isActiveUsersSearch   = pathname === '/search/users';

  return (
    <div className={`flex ${className}`}>
      <Link href='/search/recipes' className={`search-button mr-2 ${isActiveRecipesSearch ? "link-text" : ""}`}>
        Recipes
      </Link>
      <Link href='/search/users' className={`search-button ${isActiveUsersSearch ? "link-text" : ""}`}>
        Users
      </Link>
    </div>
  )
}