import { IUser, IUserFollower } from "@/typings/user";
import { api }                  from ".";

export type IUserPreviewResponse  = IUser[];
export type IUserFollowerResponse = IUserFollower[];

export interface IGetUsersRequest {
  page : number;
  limit: number;
};

export interface IGetUsersRequestById {
  userId: string;
  page  ?: number;
  limit ?: number;
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
      })
    }),
    followRequestAnswear: builder.mutation<void, IFollowRequestAnsqwear>({
      query: ({ userId, ...rest }) => ({
        method: 'POST',
        url: `/follow/${userId}/follow-request`,
        body: rest
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
    getUserFollowers: builder.query<IUserFollowerResponse, IGetUsersRequestById>({
      query: (body) => ({
        url: `/follow/${body.userId}/followers?page=${body.page}&limit=${body.limit}`
      })
    }),
    getUserFollowings: builder.query<IUserFollowerResponse, IGetUsersRequestById>({
      query: (body) => ({
        url: `/follow/${body.userId}/followings?page=${body.page}&limit=${body.limit}`
      })
    }),
    getFollowState: builder.query<IGetFollowStateResponse, string>({
      query: (userId) => ({
        url: `/follow/user/${userId}/state`
      })
    }),
    getFollowRequestState: builder.query<IGetFollowRequestStateResponse, string>({
      query: (userId) => ({
        url: `/follow/user/${userId}/follow-request-state`
      })
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