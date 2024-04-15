import { api } from ".";

export interface ILikeResponse {
  isLiked: boolean;
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
      query: (likeId) => ({
        method: 'POST',
        url   : `/like/${likeId}/remove`
      })
    }),
    getLikeState: builder.query<ILikeResponse, string>({
      query: (recipeId) => ({
        url: `/like/recipe/${recipeId}/isLiked`
      })
    })
  })
});

export const {
  useCreateLikeMutation,
  useRemoveLikeMutation
} = likeApi;