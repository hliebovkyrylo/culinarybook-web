import {
  useGetPopularRecipesQuery,
  useGetRecommendedRecipesQuery,
} from "@/lib/api/recipeApi";

export const useRecipes = (page: number, me?: boolean, recipeTitle?: any) => {
  const query = me ? useGetRecommendedRecipesQuery : useGetPopularRecipesQuery;
  const { data: recipes, isLoading } = query({
    page,
    limit: 12,
    recipeName: recipeTitle,
  });

  return { recipes, isLoading };
};
