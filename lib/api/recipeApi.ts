import { IRecipe, IRecipePreview, IStep } from "@/typings/recipe";
import { api }                            from ".";

export type ICreateRecipeRequest = Omit<IRecipe, "id" | "ownerId">;
export type IUpdateRecipeRequest = Omit<IRecipe, "ownerId">;

export type IRecipeResponse         = IRecipe;
export type IRecipesPreviewResponse = IRecipePreview[];

export interface IRecipeQueryRequest {
  page : number;
  limit: number;
};

export interface IRecipeQueryTitleRequest {
  title: string;
  page : number;
  limit: number;
};

export interface ICreateStepRequest {
  recipeId: string;
  steps: {
    stepNumber     : number,
    stepDescription: string,
  }[];
};

export interface IUpdateStepsRequest {
  stepId         : string;
  stepDescription: string;
};

export type IStepsResponse = IStep[];

export const recipeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createRecipe: builder.mutation<IRecipeResponse, ICreateRecipeRequest>({
      query: (body) => ({
        url   : '/recipe/create',
        method: 'POST',
        body
      })
    }),
    getRecipe: builder.query<IRecipeResponse, string>({
      query: (recipeId) => ({
        url: `/recipe/${recipeId}`
      })
    }),
    updateRecipe: builder.mutation<IRecipeResponse, IUpdateRecipeRequest>({
      query: ({ id, ...rest }) => ({
        method: 'PATCH', 
        url   : `/recipe/${id}/update`,
        body  : rest
      })
    }),
    deleteRecipe: builder.mutation<void, string>({
      query: (recipeId) => ({
        method: 'DELETE',
        url   : `/recipe/${recipeId}/delete`
      })
    }),
    getMyLiked: builder.query<IRecipesPreviewResponse, IRecipeQueryRequest>({
      query: (body) => ({
        url: `/recipe/my/liked?page=${body.page}&limit=${body.limit}`
      })
    }),
    getMyVisited: builder.query<IRecipesPreviewResponse, IRecipeQueryRequest>({
      query: (body) => ({
        url: `/recipe/my/visited?page=${body.page}&limit=${body.limit}`
      })
    }),
    createSteps: builder.mutation<void, ICreateStepRequest>({
      query: ({ recipeId, steps }) => ({
        method: 'POST',
        url: `/recipe/${recipeId}/createStep`,
        body: steps,
      })
    }),        
    getSteps: builder.query<IStepsResponse, string>({
      query: (recipeId) => ({
        url: `/recipe/${recipeId}/steps`
      })
    }),
    updateSteps: builder.mutation<IStepsResponse, IUpdateStepsRequest[]>({
      query: (body) => ({
        url: '/recipe/update/steps',
        body
      })
    }),
    deleteStep: builder.mutation<void, string>({
      query: (stepId) => ({
        method: 'DELETE', 
        url   : `/recipe/step/delete/${stepId}`
      })
    }),
    getMySaved: builder.query<IRecipesPreviewResponse, IRecipeQueryRequest>({
      query: (body) => ({
        url: `/recipe/saved/get?page=${body.page}&limit=${body.limit}`
      })
    }),
    getRecommendedRecipes: builder.query<IRecipesPreviewResponse, IRecipeQueryRequest>({
      query: (body) => ({
        url: `/recipe/recommended/recipes?page=${body.page}&limit=${body.limit}`
      })
    }),
    getPopularRecipes: builder.query<IRecipesPreviewResponse, IRecipeQueryRequest>({
      query: (body) => ({
        url: `/recipe/popular/recipes?page=${body.page}&limit=${body.limit}`
      })
    }),
    getRecipesByTitle: builder.query<IRecipesPreviewResponse, IRecipeQueryTitleRequest>({
      query: (body) => ({
        url: `/recipe?title=${body.title}&page=${body.page}&limit=${body.limit}`
      })
    }),
  })
});

export const { 
  useCreateRecipeMutation,
  useCreateStepsMutation,
  useDeleteRecipeMutation,
  useDeleteStepMutation,
  useGetMyLikedQuery,
  useGetMySavedQuery,
  useGetMyVisitedQuery,
  useGetPopularRecipesQuery,
  useGetRecipeQuery,
  useGetRecipesByTitleQuery,
  useGetRecommendedRecipesQuery,
  useGetStepsQuery
} = recipeApi;