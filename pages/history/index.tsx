import { RequireAuth }            from "@/hocs/requireAuth";
import { useInfiniteScroll }      from "@/hooks/useInfiniteScroll";
import { useGetMyVisitedQuery }   from "@/lib/api/recipeApi";
import { HistoryRecipesContent }  from "@/modules/history";
import { MainLayout }             from "@/modules/layouts";
import { IRecipePreview }         from "@/typings/recipe";
import { useTranslation }         from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState }    from "react";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const History = () => {
  const { t } = useTranslation('common');

  const [ page, setPage ] = useState<number>(1);
  const [ visitedRecipes, setVisitedRecipes ] = useState<IRecipePreview[]>([]);
  const [ isLoadingMore, setIsLoadingMore ] = useState<boolean>(false);

  const { data: newVisitedRecipes, isLoading: isLoadingRecipes } = useGetMyVisitedQuery({ page: page, limit: 10 });

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