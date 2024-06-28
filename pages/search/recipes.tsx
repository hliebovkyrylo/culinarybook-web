import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { GlassIcon } from "@/icons";
import { MainLayout } from "@/modules/layouts";
import {
  SearchButtons,
  SearchInput,
  SearchRecipesContent,
  useRecipes,
} from "@/modules/search";
import { IRecipePreview } from "@/typings/recipe";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetMeQuery } from "@/lib/api/userApi";
import { useGetMyAllUnreadedNotificationsQuery } from "@/lib/api/notificationApi";
import { Loader } from "@/components/Loader";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const SearchRecipes = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const searchParams = router.query.title;
  const [page, setPage] = useState(1);

  const { data: notifications, isLoading: isLoadingNotifications } = useGetMyAllUnreadedNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true
  });
  const { data: user, isLoading: isLoadingUser } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true
  });

  const { recipes: newRecipes, isLoading } = useRecipes(page, !!user, searchParams);
  const [recipes, setRecipes] = useState<IRecipePreview[]>([]);
  const [findedRecipes, setFindedRecipes] = useState<IRecipePreview[]>([]);

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    if (searchParams && newRecipes) {
      setFindedRecipes([]);
      setPage(1);
      setFindedRecipes(prevRecipes => [...prevRecipes, ...newRecipes]);
    }
  }, [newRecipes, searchParams])

  useInfiniteScroll(newRecipes, searchParams ? setFindedRecipes : setRecipes, 12, setPage, setIsLoadingMore);

  if (isLoadingUser || isLoadingNotifications) { 
    return <Loader className="absolute top-0 left-0" />
  }

  return (
    <MainLayout
      pageTitle={t('title-search')}
      pageDescription={'search-recipe-meta-description'}
      containerSize="small"
      metaTitle={`${t('search-recipe-meta-title')} | Culinarybook`}
      user={user}
      notifications={notifications}
    >
      <SearchInput
        placeholder={t('input-placeholder')}
        leftIcon={<GlassIcon className="absolute top-1.5 left-3 fill-[#666]" />}
        routeType={"recipes"}
        searchType={"title"}
      />
      <SearchButtons />
      <SearchRecipesContent
        data={searchParams ? findedRecipes : recipes}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
      />
    </MainLayout>
  )
}

export default SearchRecipes;