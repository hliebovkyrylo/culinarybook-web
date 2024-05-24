import { useGetPopularRecipesQuery, useGetRecommendedRecipesQuery } from "@/lib/api/recipeApi";

export const useRecipes = (page: number, me: boolean | undefined, recipeTitle?: any) => {
  const { data: recommendedRecipes, isLoading: isLoadingRecommended } = useGetRecommendedRecipesQuery({ page: page, limit: 12, recipeName: recipeTitle });
  const { data: popularRecipes, isLoading: isLoadingPopular }         = useGetPopularRecipesQuery({ page: page, limit: 12, recipeName: recipeTitle });

  const recipes   = me ? recommendedRecipes : popularRecipes;
  const isLoading = me ? isLoadingRecommended : isLoadingPopular;

  return { recipes, isLoading };
}