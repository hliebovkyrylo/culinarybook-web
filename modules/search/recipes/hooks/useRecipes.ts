import { useGetPopularRecipesQuery, useGetRecommendedRecipesQuery } from "@/lib/api/recipeApi";

export const useRecipes = (page: number, accessToken: string, recipeTitle?: any) => {
  const { data: recommendedRecipes, isLoading: isLoadingRecommended } = useGetRecommendedRecipesQuery({ page: page, limit: 12, recipeName: recipeTitle });
  const { data: popularRecipes, isLoading: isLoadingPopular }         = useGetPopularRecipesQuery({ page: page, limit: 12, recipeName: recipeTitle });

  const recipes   = accessToken ? recommendedRecipes : popularRecipes;
  const isLoading = accessToken ? isLoadingRecommended : isLoadingPopular;

  return { recipes, isLoading };
}