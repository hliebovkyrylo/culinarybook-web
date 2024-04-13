import { api } from ".";

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
  })
});

export const {
  useCreateLikeMutation,
  useRemoveLikeMutation
} = likeApi;