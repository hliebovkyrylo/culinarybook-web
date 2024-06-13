import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies                       from "js-cookie";

export const baseUrl = process.env.NEXT_PUBLIC_APP_API_URL as string;

export const api = createApi({
  reducerPath: 'api',
  tagTypes   : ['user', 'recipe'],
  baseQuery  : fetchBaseQuery({
    baseUrl       : baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = Cookies.get('access_token');

      if (accessToken) {
        headers.set('authorization', accessToken);
      }

      return headers;
    }
  }),
  endpoints: () => ({}),
});