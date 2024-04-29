import { url } from "inspector";
import { api } from ".";

export interface ILikeStateResponse {
  isLiked: boolean;
};

export interface ILikeResponse {
  id      : string;
  userId  : string;
  recipeId: string;
};

export const likeApi = api.injectEndpoints({
  endpoints: builder => ({
    createLike: builder.mutation<void, string>({
      query: (recipeId) => ({
        method: 'POST',
        url   : `/like/create/${recipeId}`
      })
    }),
    removeLike: builder.mutation<void, string>({
      query: (recipeId) => ({
        method: 'DELETE',
        url   : `/like/${recipeId}/remove`
      })
    }),
    getLikeState: builder.query<ILikeStateResponse, string>({
      query: (recipeId) => ({
        url: `/like/recipe/${recipeId}/isLiked`
      })
    }),
    getRecipeLikes: builder.query<ILikeResponse[], string>({
      query: (recipeId) => ({
        url: `/like/${recipeId}/getAll`
      })
    })
  })
});

export const {
  useCreateLikeMutation,
  useRemoveLikeMutation,
  useGetLikeStateQuery,
  useGetRecipeLikesQuery,
} = likeApi;