import { IUser } from "@/typings/user";
import { api }   from ".";

export type IUserPreviewResponse = IUser[];

export interface IGetUsersRequest {
  page : number;
  limit: number;
};

export interface IGetUsersRequestById {
  userId: string;
  page  : number;
  limit : number;
};

export const followApi = api.injectEndpoints({
  endpoints: builder => ({
    follow: builder.mutation<void, string>({
      query: (userId) => ({
        method: 'POST',
        url: `/follow/${userId}`
      })
    }),
    followRequestAnswear: builder.mutation<void, string>({
      query: (userId) => ({
        method: 'POST',
        url: `/follow/${userId}/follow-request`
      })
    }),
    unfollow: builder.mutation<void, string>({
      query: (userId) => ({
        method: 'DELETE',
        url: `/follow/${userId}/unfollow`
      })
    }),
    cancelFollowRequest: builder.mutation<void, string>({
      query: (userId) => ({
        method: 'DELETE',
        url: `/follow/${userId}/cancel-request`
      })
    }),
    getMyFollowers: builder.query<IUserPreviewResponse, IGetUsersRequest>({
      query: (body) => ({
        url: `/follow/getMyFollowers?page=${body.page}&limit=${body.limit}`
      })
    }),
    getUserFollowers: builder.query<IUserPreviewResponse, IGetUsersRequestById>({
      query: (body) => ({
        url: `/follow/${body.userId}/followers?page=${body.page}&limit=${body.limit}`
      })
    }),
    getMyFollowings: builder.query<IUserPreviewResponse, IGetUsersRequest>({
      query: (body) => ({
        url: `/follow/my/followings?page=${body.page}&limit=${body.limit}`
      })
    }),
    getUserFollowings: builder.query<IUserPreviewResponse, IGetUsersRequestById>({
      query: (body) => ({
        url: `/follow/${body.userId}/followings?page=${body.page}&limit=${body.limit}`
      })
    }),
  })
});

export const {
  useCancelFollowRequestMutation,
  useFollowMutation,
  useFollowRequestAnswearMutation,
  useGetMyFollowersQuery,
  useGetMyFollowingsQuery,
  useGetUserFollowersQuery,
  useGetUserFollowingsQuery
} = followApi;