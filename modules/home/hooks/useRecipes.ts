import { useGetPopularRecipesQuery, useGetRecommendedRecipesQuery } from "@/lib/api/recipeApi";

export const useRecipes = (accessToken: string, page = 1, limit = 6) => {
  const { data: recommendedRecipes, isLoading: isLoadingRecommendedRecipes } = useGetRecommendedRecipesQuery({ page, limit });
  const { data: popularRecipes, isLoading: isLoadingPopularRecipes }         = useGetPopularRecipesQuery({ page, limit });

  const recipes          = accessToken ? recommendedRecipes : popularRecipes;
  const isLoadingRecipes = accessToken ? isLoadingRecommendedRecipes : isLoadingPopularRecipes;

  return { recipes, isLoadingRecipes };
};