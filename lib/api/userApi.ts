import { IUser, IUserMe } from "@/typings/user";
import { api }            from ".";

export type IUserMeResponse  = IUserMe;
export type IUserResponse    = IUser;
export type IUsersResponse   = IUser[];

export interface IUpdateUserRequest {
  username       : string;
  name           : string;
  image          : string;
  backgroundImage: string;
  isPrivate      : boolean;
};

export interface IGetUsersRequest {
  page     : number;
  limit    : number;
  username?: string;
};

export interface IGetUsersByUsernameRequest {
  username: string;
  page    : number;
  limit   : number;
};

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<IUserMeResponse, void>({
      query: () => ({
        url: '/user/me'
      }),
      keepUnusedDataFor: 1
    }),
    getUser: builder.query<IUserResponse, string>({
      query: (userId) => ({
        url: `/user/${userId}`
      }),
      providesTags: ['user']
    }),
    updateUser: builder.mutation<IUserMeResponse, IUpdateUserRequest>({
      query: (body) => ({
        url   : '/user/update',
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['user']
    }),
    getRecommendedUsers: builder.query<IUsersResponse, IGetUsersRequest>({
      query: (body) => ({
        url: `/user/recommended/users?page=${body.page}&limit=${body.limit}&username=${body.username}`
      }),
      providesTags: ['user']
    }),
    getPopularUsers: builder.query<IUsersResponse, IGetUsersRequest>({
      query: (body) => ({
        url: `/user/popular/users?page=${body.page}&limit=${body.limit}&username=${body.username}`
      }),
      providesTags: ['user']
    }),
    changeAccountType: builder.mutation<void, void>({
      query: () => ({
        url: '/user/changeType'
      }),
      invalidatesTags: ['user']
    })
  })
});

export const { 
  useGetMeQuery,
  useGetUserQuery,
  useGetRecommendedUsersQuery,
  useGetPopularUsersQuery,
  useChangeAccountTypeMutation,
  useUpdateUserMutation
} = userApi;