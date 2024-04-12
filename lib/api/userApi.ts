import { IUserMe } from "@/typings/user";
import { api }     from ".";

export type IUserResponse = IUserMe;

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<IUserResponse, void>({
      query: () => ({
        url: '/user/me'
      })
    })
  })
});

export const { 
  useGetMeQuery
} = userApi;