import { api } from ".";

interface ISaveResponse {
  isSaved: boolean;
}

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
    }),
    getSaveState: builder.query<ISaveResponse, string>({
      query: (recipeId) => ({
        url: `/save/recipe/${recipeId}/isSaved`
      })
    })
  })
});

export const {
  useCreateSaveMutation,
  useRemoveSaveMutation,
  useGetSaveStateQuery
} = saveApi;