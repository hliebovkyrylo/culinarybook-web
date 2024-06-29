import { api } from ".";

interface ISaveResponse {
  isSaved: boolean;
}

export const saveApi = api.injectEndpoints({
  endpoints: builder => ({
    createSave: builder.mutation<void, string>({
      query: (recipeId) => ({
        method: 'POST',
        url: `/save/create/${recipeId}`
      }),
      invalidatesTags: ['user', 'recipe']
    }),
    removeSave: builder.mutation<void, string>({
      query: (recipeId) => ({
        method: 'DELETE',
        url: `/save/delete/${recipeId}`
      }),
      invalidatesTags: ['user', 'recipe']
    }),
    getSaveState: builder.query<ISaveResponse, string>({
      query: (recipeId) => ({
        url: `/save/recipe/${recipeId}/isSaved`
      }),
      providesTags: ['user', 'recipe']
    })
  })
});

export const {
  useCreateSaveMutation,
  useRemoveSaveMutation,
  useGetSaveStateQuery
} = saveApi;