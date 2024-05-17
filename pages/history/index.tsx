import { RecipeCardSkeleton }     from "@/components/cards";
import RecipeCard                 from "@/components/cards/RecipeCard/RecipeCard";
import { HistoryLayout }          from "@/components/history";
import { useGetMyVisitedQuery }   from "@/lib/api/recipeApi";
import { IAppState }              from "@/lib/store";
import { IRecipePreview }         from "@/typings/recipe";
import { GetStaticPropsContext }  from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter }              from "next/navigation";
import { useEffect, useState }    from "react";
import { useSelector }            from "react-redux";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const HistoryPage = () => {
  const accessToken = useSelector((state: IAppState) => state.auth.accessToken);

  const router = useRouter();

  const { data: newVisitedRecipes, isLoading } = useGetMyVisitedQuery({ page: 1, limit: 10 });
  const [ visitedRecipes, setVisitedRecipes ] = useState<IRecipePreview[]>([]);
  const [ page, setPage ] = useState<number>(1);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (newVisitedRecipes) {
      setVisitedRecipes((prevRecipes) => {
        const uniqueNewRecipes = newVisitedRecipes.filter(
          (newRecipe) => !prevRecipes.some((prevRecipe) => prevRecipe.id === newRecipe.id)
        );
        return [...prevRecipes, ...uniqueNewRecipes];
      });
    }
  }, [newVisitedRecipes]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop    = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (
        newVisitedRecipes && newVisitedRecipes.length === 15
      ) {
        setPage((prevPage) => prevPage + 1);
      } else {
        setIsLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [newVisitedRecipes]);

  if (!accessToken) {
    router.push('/');
    return null;
  }

  return (
    <HistoryLayout
      title="History of views"
    >
      <div className="grid grid-cols-4 mt-8 max-lg:grid-cols-3 max-[746px]:grid-cols-1">
        {isLoading ? (
          <>
            {[...Array(12)].map((_, index) => (
              <RecipeCardSkeleton className="mb-4" key={index} />
            ))}
          </>
        ) : (
          <>
            {visitedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                recipeName={recipe.title}
                recipeImage={recipe.image}
                foodType={recipe.typeOfFood}
                cookingTime={recipe.coockingTime}
                complexity={recipe.complexity}
                authorName={recipe.owner.name}
                authorImage={recipe.owner.image}
                className="mb-4 max-[746px]:!w-full"
              />
            ))}
          </>
        )}
      </div>
      {isLoadingMore && (
        <div className={`absolute left-[calc(54%-24px)] -bottom-4 flex justify-center items-center z-50 dark:bg-bg-c bg-bg-c-7`}>
          <div className=" dark:border-[#222222] border-neutral-300 h-6 w-6 animate-spin rounded-full border-4 dark:border-t-[#DDDF72] border-t-[#C77D0A]" />
        </div>
      )}
    </HistoryLayout>
  )
}

export default HistoryPage;