import { useGetPopularRecipesQuery, useGetRecommendedRecipesQuery } from "@/lib/api/recipeApi";

export const useRecipes = (me: boolean, page = 1, limit = 6) => {
  const query = me ? useGetRecommendedRecipesQuery : useGetPopularRecipesQuery;
  const { data: recipes, isLoading: isLoadingRecipes } = query({ page, limit })

  return { recipes, isLoadingRecipes };
};