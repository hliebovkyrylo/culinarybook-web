import { Loader } from "@/components/Loader";
import { RequireAuth } from "@/hocs/requireAuth";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useGetMyAllUnreadedNotificationsQuery } from "@/lib/api/notificationApi";
import { useGetMyVisitedQuery } from "@/lib/api/recipeApi";
import { useGetMeQuery } from "@/lib/api/userApi";
import { HistoryRecipesContent } from "@/modules/history";
import { MainLayout } from "@/modules/layouts";
import { IRecipePreview } from "@/typings/recipe";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const History = () => {
  const { t } = useTranslation('common');

  const [page, setPage] = useState<number>(1);
  const [visitedRecipes, setVisitedRecipes] = useState<IRecipePreview[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const { data: user, isLoading: isLoadingUser } = useGetMeQuery();
  const { data: notifications, isLoading: isLoadingNotifications } = useGetMyAllUnreadedNotificationsQuery();

  const { data: newVisitedRecipes, isLoading: isLoadingRecipes } = useGetMyVisitedQuery({ page: page, limit: 10 });

  if (isLoadingUser || isLoadingNotifications) {
    return <Loader className="absolute top-0 left-0" />
  }

  useEffect(() => {
    if (newVisitedRecipes) {
      setVisitedRecipes([]);
      setPage(1);
      setVisitedRecipes(prevRecipes => [...prevRecipes, ...newVisitedRecipes]);
    }
  }, [newVisitedRecipes])

  useInfiniteScroll(newVisitedRecipes, setVisitedRecipes, 12, setPage, setIsLoadingMore);
  return (
    <MainLayout
      pageTitle={t('title-history')}
      pageDescription={t('history-meta-description')}
      metaTitle={`${t('title-history')} | Culinarybook`}
      containerSize="small"
      user={user}
      notifications={notifications}
    >
      <HistoryRecipesContent
        data={visitedRecipes}
        isLoading={isLoadingRecipes}
        isLoadingMore={isLoadingMore}
      />
    </MainLayout>
  )
}

export default RequireAuth(History);