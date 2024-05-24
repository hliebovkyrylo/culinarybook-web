import { useGetPopularRecipesQuery, useGetRecommendedRecipesQuery } from "@/lib/api/recipeApi";

export const useRecipes = (me: boolean, page = 1, limit = 6) => {
  const { data: recommendedRecipes, isLoading: isLoadingRecommendedRecipes } = useGetRecommendedRecipesQuery({ page, limit });
  const { data: popularRecipes, isLoading: isLoadingPopularRecipes }         = useGetPopularRecipesQuery({ page, limit });

  const recipes          = me ? recommendedRecipes : popularRecipes;
  const isLoadingRecipes = me ? isLoadingRecommendedRecipes : isLoadingPopularRecipes;

  return { recipes, isLoadingRecipes };
};