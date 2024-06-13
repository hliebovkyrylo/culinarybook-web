import { useInfiniteScroll }      from "@/hooks/useInfiniteScroll";
import { GlassIcon }              from "@/icons";
import { MainLayout }             from "@/modules/layouts";
import { 
  SearchButtons, 
  SearchInput, 
  SearchRecipesContent, 
  useRecipes 
}                                 from "@/modules/search";
import { IRecipePreview }         from "@/typings/recipe";
import { useTranslation }         from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter }              from "next/router";
import { useEffect, useState }    from "react";
import Cookies                    from "js-cookie";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

const SearchRecipes = () => {
  const accessToken = Cookies.get('access_token');
  const { t }       = useTranslation("common");
  const router      = useRouter();

  const searchParams = router.query.title;
  const [page, setPage] = useState(1);

  const { recipes: newRecipes, isLoading } = useRecipes(page, !!accessToken, searchParams);
  const [recipes, setRecipes]              = useState<IRecipePreview[]>([]);
  const [findedRecipes, setFindedRecipes]  = useState<IRecipePreview[]>([]);

  const [ isLoadingMore, setIsLoadingMore ] = useState<boolean>(false);

  useEffect(() => {
    if (searchParams && newRecipes) {
      setFindedRecipes([]);
      setPage(1);
      setFindedRecipes(prevRecipes => [...prevRecipes, ...newRecipes]);
    }
  }, [newRecipes, searchParams])

  useInfiniteScroll(newRecipes, searchParams ? setFindedRecipes : setRecipes, 12, setPage, setIsLoadingMore);
  return (
    <MainLayout
      pageTitle={t('title-search')}
      pageDescription={'search-recipe-meta-description'}
      containerSize="small"
      metaTitle={`${t('search-recipe-meta-title')} | Culinarybook`}
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