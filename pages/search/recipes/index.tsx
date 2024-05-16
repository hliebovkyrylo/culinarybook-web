"use client"

import { renderMetaTags }      from "@/pages/meta";
import { RecipeCardSkeleton }  from "@/components/cards";
import RecipeCard              from "@/components/cards/RecipeCard/RecipeCard";
import { 
  useGetPopularRecipesQuery, 
  useGetRecipesByTitleQuery, 
  useGetRecommendedRecipesQuery 
}                              from "@/lib/api/recipeApi";
import { IAppState }           from "@/lib/store";
import { IRecipePreview }      from "@/typings/recipe";
import { useSearchParams }     from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation }      from "react-i18next";
import { useSelector }         from "react-redux";

const Search = () => {
  const { t } = useTranslation();

  const searchParams = useSearchParams();
  const accessToken  = useSelector((state: IAppState) => state.auth.accessToken);

  const search = searchParams.get("title");

  const [pageFindedRecipes, setPageFindedRecipes]           = useState(1);
  const [pageRecommendedRecipes, setPageRecommendedRecipes] = useState(1);
  const [pagePopularRecipes, setPagePopularRecipes]         = useState(1);

  const [findedRecipes, setFindedRecipes]           = useState<IRecipePreview[]>([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState<IRecipePreview[]>([]);
  const [popularRecipes, setPopularRecipes]         = useState<IRecipePreview[]>([]);

  const { data: newFindedRecipes, isLoading: isLoadingSearch }           = useGetRecipesByTitleQuery({ page: pageFindedRecipes, limit: 12, title: search as string });
  const { data: newRecommendedRecipes, isLoading: isLoadingRecommended } = useGetRecommendedRecipesQuery({ page: pageRecommendedRecipes, limit: 12 });
  const { data: newPopularRecipes, isLoading: isLoadingPopular }         = useGetPopularRecipesQuery({ page: pagePopularRecipes, limit: 12 });

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (search === null) {
      setFindedRecipes([]);
    }
    if (newFindedRecipes) {
      setFindedRecipes((prevRecipes) => {
        const uniqueNewRecipes = newFindedRecipes.filter(
          (newRecipe) => !prevRecipes.some((prevRecipe) => prevRecipe.id === newRecipe.id)
        );
        return [...prevRecipes, ...uniqueNewRecipes];
      });
    }
  }, [newFindedRecipes, search]);

  useEffect(() => {
    if (accessToken && newRecommendedRecipes) {
      setRecommendedRecipes((prevRecipes) => {
        const uniqueNewRecipes = newRecommendedRecipes.filter(
          (newRecipe) => !prevRecipes.some((prevRecipe) => prevRecipe.id === newRecipe.id)
        );

        return [...prevRecipes, ...uniqueNewRecipes];
      });
    }
  }, [newRecommendedRecipes]);

  useEffect(() => {
    if (newPopularRecipes) {
      setPopularRecipes((prevRecipes) => {
        const uniqueNewRecipes = newPopularRecipes.filter(
          (newRecipe) => !prevRecipes.some((prevRecipe) => prevRecipe.id === newRecipe.id)
        );
        return [...prevRecipes, ...uniqueNewRecipes];
      });
    }
  }, [newPopularRecipes]);

  const recipes   = accessToken ? recommendedRecipes : popularRecipes;
  const isLoading = isLoadingSearch || isLoadingRecommended || isLoadingPopular;

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop    = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (
        newPopularRecipes && newPopularRecipes.length === 12
        || accessToken && newRecommendedRecipes && newRecommendedRecipes.length === 12
        || newFindedRecipes && newFindedRecipes.length >= 12
      ) {
        setIsLoadingMore(true);
        if (search !== null) {
          setPageFindedRecipes((prevPage) => prevPage + 1);
        } else if (accessToken) {
          setPageRecommendedRecipes((prevPage) => prevPage + 1);
        }
        setPagePopularRecipes((prevPage) => prevPage + 1);
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
  }, [newRecommendedRecipes, newPopularRecipes, newFindedRecipes]);

  return (
    <>
      {renderMetaTags({ title: `${t('search-recipe-meta-title')} | Culinarybook`, description: t('search-recipe-meta-description') })}
      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-[746px]:grid-cols-1 mb-8 max-2xl:!mb-16 relative">
        {isLoading ? (
          <>
            {[...Array(8)].map((_, index) => (
              <RecipeCardSkeleton key={index} className="mb-4 max-[746px]:!w-full" />
            ))}
          </>
        ) : (
          <>
            {search ? (
              <>
                {findedRecipes && findedRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    recipeName={recipe.title}
                    recipeImage={recipe.image}
                    foodType={recipe.typeOfFood}
                    cookingTime={recipe.coockingTime}
                    complexity={recipe.complexity}
                    authorImage={recipe.owner.image}
                    authorName={recipe.owner.name}
                    className="mb-4 max-[746px]:!w-full"
                  />
                ))}
              </>
            ) : (
              <>
                {recipes && recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    recipeName={recipe.title}
                    recipeImage={recipe.image}
                    foodType={recipe.typeOfFood}
                    cookingTime={recipe.coockingTime}
                    complexity={recipe.complexity}
                    authorImage={recipe.owner.image}
                    authorName={recipe.owner.name}
                    className="mb-4 max-[746px]:!w-full"
                  />
                ))}
              </>
            )}
          </>
        )}
        {isLoadingMore && (
          <div className={`absolute left-[calc(50%-24px)] -bottom-4 flex justify-center items-center z-50 dark:bg-bg-c bg-bg-c-7`}>
            <div className=" dark:border-[#222222] border-neutral-300 h-6 w-6 animate-spin rounded-full border-4 dark:border-t-[#DDDF72] border-t-[#C77D0A]" />
          </div>
        )}
      </div>
    </>
  )
}

export default Search;