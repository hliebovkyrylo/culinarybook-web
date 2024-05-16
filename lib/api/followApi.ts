import { IUser, IUserFollower } from "@/typings/user";
import { api }                  from ".";

export type IUserPreviewResponse  = IUser[];
export type IUserFollowerResponse = IUserFollower[];

export interface IGetUsersRequest {
  page : number;
  limit: number;
};

export interface IGetUsersRequestById {
  userId   : string;
  page    ?: number;
  limit   ?: number;
  username?: string;
};

export interface IGetFollowStateResponse {
  isFollowed: boolean;
}

export interface IGetFollowRequestStateResponse {
  isFollowRequestSent: boolean;
}

export interface IFollowRequestAnsqwear {
  userId : string;
  allowed: boolean;
}

export const followApi = api.injectEndpoints({
  endpoints: builder => ({
    follow: builder.mutation<void, string>({
      query: (userId) => ({
        method: 'POST',
        url: `/follow/${userId}`
      }),
      invalidatesTags: ['user']
    }),
    followRequestAnswear: builder.mutation<void, IFollowRequestAnsqwear>({
      query: ({ userId, ...rest }) => ({
        method: 'POST',
        url: `/follow/${userId}/follow-request`,
        body: rest
      }),
      invalidatesTags: ['user']
    }),
    unfollow: builder.mutation<void, string>({
      query: (userId) => ({
        method: 'DELETE',
        url: `/follow/${userId}/unfollow`
      }),
      invalidatesTags: ['user']
    }),
    cancelFollowRequest: builder.mutation<void, string>({
      query: (userId) => ({
        method: 'DELETE',
        url: `/follow/${userId}/cancel-request`
      }),
      invalidatesTags: ['user']
    }),
    getUserFollowers: builder.query<IUserFollowerResponse, IGetUsersRequestById>({
      query: (body) => ({
        url: `/follow/${body.userId}/followers?username=${body.username}&page=${body.page}&limit=${body.limit}`
      }),
      providesTags: ['user']
    }),
    getUserFollowings: builder.query<IUserFollowerResponse, IGetUsersRequestById>({
      query: (body) => ({
        url: `/follow/${body.userId}/followings?username=${body.username}&page=${body.page}&limit=${body.limit}`
      }),
      providesTags: ['user']
    }),
    getFollowState: builder.query<IGetFollowStateResponse, string>({
      query: (userId) => ({
        url: `/follow/user/${userId}/state`
      }),
      providesTags: ['user']
    }),
    getFollowRequestState: builder.query<IGetFollowRequestStateResponse, string>({
      query: (userId) => ({
        url: `/follow/user/${userId}/follow-request-state`
      }),
      providesTags: ['user']
    })
  })
});

export const {
  useCancelFollowRequestMutation,
  useFollowMutation,
  useFollowRequestAnswearMutation,
  useGetUserFollowersQuery,
  useGetUserFollowingsQuery, 
  useGetFollowStateQuery,
  useUnfollowMutation,
  useGetFollowRequestStateQuery,
} = followApi;