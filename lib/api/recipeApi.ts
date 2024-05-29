import { IRecipe, IRecipePreview, IStep } from "@/typings/recipe";
import { api }                            from ".";

export type ICreateRecipeRequest = Omit<IRecipe, "id" | "ownerId">;
export type IUpdateRecipeRequest = Omit<IRecipe, "ownerId">;

export type IRecipeResponse         = IRecipe;
export type IRecipesPreviewResponse = IRecipePreview[];

export interface IRecipeQueryRequest {
  page      ?: number;
  limit     ?: number;
  recipeName?: string;
};

export interface IRecipeQueryTitleRequest {
  title: string;
  page : number;
  limit: number;
};

export interface IRecipeRequest {
  userId: string;
  sortBy: string;
};

export interface ICreateStepRequest {
  recipeId: string;
  steps: {
    id            ?: string,
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
      }),
      invalidatesTags: ['recipe']
    }),
    updateRecipe: builder.mutation<IRecipeResponse, IUpdateRecipeRequest>({
      query: ({ id, ...rest }) => ({
        method: 'PATCH', 
        url   : `/recipe/${id}/update`,
        body  : rest
      }),
      invalidatesTags: ['recipe']
    }),
    deleteRecipe: builder.mutation<void, string>({
      query: (recipeId) => ({
        method: 'DELETE',
        url   : `/recipe/${recipeId}/delete`
      }),
      invalidatesTags: ['recipe']
    }),
    getMyLiked: builder.query<IRecipesPreviewResponse, void>({
      query: (body) => ({
        url: '/recipe/my/liked'
      }),
      providesTags: ['user', 'recipe']
    }),
    getMyVisited: builder.query<IRecipesPreviewResponse, IRecipeQueryRequest>({
      query: (body) => ({
        url: `/recipe/my/visited?page=${body.page}&limit=${body.limit}`
      }),
      providesTags: ['user', 'recipe']
    }),
    createSteps: builder.mutation<void, ICreateStepRequest>({
      query: ({ recipeId, steps }) => ({
        method: 'POST',
        url: `/recipe/${recipeId}/createStep`,
        body: steps,
      }),
      invalidatesTags: ['recipe']
    }),        
    getSteps: builder.query<IStepsResponse, string>({
      query: (recipeId) => ({
        url: `/recipe/${recipeId}/steps`
      }),
      providesTags: ['recipe']
    }),
    updateSteps: builder.mutation<IStepsResponse, IUpdateStepsRequest[]>({
      query: (body) => ({
        url   : '/recipe/update/steps',
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['recipe']
    }),
    deleteStep: builder.mutation<void, string>({
      query: (stepId) => ({
        method: 'DELETE', 
        url   : `/recipe/step/delete/${stepId}`
      }),
      invalidatesTags: ['recipe']
    }),
    getMySaved: builder.query<IRecipesPreviewResponse, void>({
      query: (body) => ({
        url: '/recipe/saved/get'
      }),
      providesTags: ['user', 'recipe']
    }),
    getRecommendedRecipes: builder.query<IRecipesPreviewResponse, IRecipeQueryRequest>({
      query: (body) => ({
        url: `/recipe/recommended/recipes?page=${body.page}&limit=${body.limit}&title=${body.recipeName}`
      }),
      providesTags: ['user', 'recipe']
    }),
    getPopularRecipes: builder.query<IRecipesPreviewResponse, IRecipeQueryRequest>({
      query: (body) => ({
        url: `/recipe/popular/recipes?page=${body.page}&limit=${body.limit}&title=${body.recipeName}`
      }),
      providesTags: ['user', 'recipe']
    }),
    getRecipesByUserId: builder.query<IRecipesPreviewResponse, IRecipeRequest>({
      query: (body) => ({
        url: `/recipe/${body.userId}/recipes?sortBy=${body.sortBy}`
      }),
      providesTags: ['user', 'recipe']
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
  useGetRecommendedRecipesQuery,
  useGetStepsQuery,
  useGetRecipesByUserIdQuery,
  useUpdateRecipeMutation,
  useUpdateStepsMutation,
} = recipeApi;