import { useGetPopularUsersQuery, useGetRecommendedUsersQuery } from "@/lib/api/userApi";

export const useUsers = (me: boolean, page = 1, limit = 8) => {
  const { data: recommendedUsers, isLoading: isLoadingRecommendedUsers } = useGetRecommendedUsersQuery({ page, limit });
  const { data: popularUsers, isLoading: isLoadingPopularUsers }         = useGetPopularUsersQuery({ page, limit });

  const users          = me ? recommendedUsers : popularUsers;
  const isLoadingUsers = me ? isLoadingRecommendedUsers : isLoadingPopularUsers;

  return { users, isLoadingUsers };
}