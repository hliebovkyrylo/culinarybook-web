import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = process.env.NEXT_PUBLIC_APP_API_URL as string;

export const api = createApi({
  reducerPath: 'api',
  tagTypes   : ['user', 'recipe'],
  baseQuery  : fetchBaseQuery({
    baseUrl       : baseUrl,
    credentials   : 'include'
  }),
  endpoints: (builder) => ({
    getRecipe: builder.query({
      query: (recipeId) => `recipe/${recipeId}`
    }),
  }),
});