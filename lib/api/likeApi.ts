import { api } from ".";

export interface ILikeStateResponse {
  isLiked: boolean;
}

export interface ILikeResponse {
  id: string;
  userId: string;
  recipeId: string;
}

export const likeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createLike: builder.mutation<void, string>({
      query: (recipeId) => ({
        method: "POST",
        url: `/like/create/${recipeId}`,
      }),
      invalidatesTags: ["recipe"],
    }),
    removeLike: builder.mutation<void, string>({
      query: (recipeId) => ({
        method: "DELETE",
        url: `/like/${recipeId}/remove`,
      }),
      invalidatesTags: ["recipe"],
    }),
    getLikeState: builder.query<ILikeStateResponse, string>({
      query: (recipeId) => ({
        url: `/like/recipe/${recipeId}/isLiked`,
      }),
      providesTags: ["recipe"],
    }),
    getRecipeLikes: builder.query<ILikeResponse[], string>({
      query: (recipeId) => ({
        url: `/like/${recipeId}/getAll`,
      }),
      providesTags: ["recipe"],
    }),
  }),
});

export const {
  useCreateLikeMutation,
  useRemoveLikeMutation,
  useGetLikeStateQuery,
  useGetRecipeLikesQuery,
} = likeApi;
