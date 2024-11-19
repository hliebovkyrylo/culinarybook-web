import {
  useGetFollowRequestStateQuery,
  useGetFollowStateQuery,
} from "@/lib/api/followApi";

export const useFollowState = (userId: string) => {
  const { data: followState, isLoading: isLoadingFollowState } =
    useGetFollowStateQuery(userId);
  const { data: followRequestState, isLoading: isLoadingFollowRequestState } =
    useGetFollowRequestStateQuery(userId);

  return {
    followState,
    followRequestState,
    isLoadingFollowState,
    isLoadingFollowRequestState,
  };
};
