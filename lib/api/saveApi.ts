import { api } from ".";

export const saveApi = api.injectEndpoints({
  endpoints: builder => ({
    createSave: builder.mutation<void, string>({
      query: (recipeId) => ({
        method: 'POST',
        url   : `/save/create/${recipeId}`
      })
    }),
    removeSave: builder.mutation<void, string>({
      query: (recipeId) => ({
        method: 'DELETE',
        url   : `/save/delete/${recipeId}`
      })
    })
  })
});

export const {
  useCreateSaveMutation,
  useRemoveSaveMutation
} = saveApi;