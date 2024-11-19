import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

export const SearchButtons = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = router.pathname;

  const { t } = useTranslation("common");

  const isActiveRecipesSearch = pathname === `/search/recipes`;
  const isActiveUsersSearch = pathname === `/search/users`;

  return (
    <div className={`flex ${className}`}>
      <Link
        href={`/search/recipes`}
        className={`search-button mr-2 ${
          isActiveRecipesSearch ? "link-text" : ""
        }`}
      >
        {t("recipes-button")}
      </Link>
      <Link
        href={`/search/users`}
        className={`search-button ${isActiveUsersSearch ? "link-text" : ""}`}
      >
        {t("users-button")}
      </Link>
    </div>
  );
};
