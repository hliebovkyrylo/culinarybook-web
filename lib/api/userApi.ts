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
  page : number;
  limit: number;
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
      })
    }),
    getUser: builder.query<IUserResponse, string>({
      query: (userId) => ({
        url: `/user/${userId}`
      }) 
    }),
    getUserByUsername: builder.query<IUsersResponse, IGetUsersByUsernameRequest>({
      query: ({ username, page, limit }) => ({
        url: `/user?username=${username}&page=${page}&limit=${limit}`
      })
    }),
    updateUser: builder.mutation<IUserMeResponse, IUpdateUserRequest>({
      query: (body) => ({
        url   : '/user/update',
        method: 'PATCH',
        body
      })
    }),
    getRecommendedUsers: builder.query<IUsersResponse, IGetUsersRequest>({
      query: (body) => ({
        url: `/user/recommended/users?page=${body.page}&limit=${body.limit}`
      })
    }),
    getPopularUsers: builder.query<IUsersResponse, IGetUsersRequest>({
      query: (body) => ({
        url: `/user/popular/users?page=${body.page}&limit=${body.limit}`
      })
    }),
    changeAccountType: builder.mutation<void, void>({
      query: () => ({
        url: '/user/changeType'
      })
    })
  })
});

export const { 
  useGetMeQuery,
  useGetUserQuery,
  useGetUserByUsernameQuery,
  useGetRecommendedUsersQuery,
  useGetPopularUsersQuery,
  useChangeAccountTypeMutation,
  useUpdateUserMutation
} = userApi;