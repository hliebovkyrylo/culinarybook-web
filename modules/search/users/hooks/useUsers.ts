import { useGetPopularUsersQuery, useGetRecommendedUsersQuery } from "@/lib/api/userApi";

export const useUsers = (page: number, me: boolean | undefined, username?: any) => {
  const { data: recommendedUsers, isLoading: isLoadingRecommended } = useGetRecommendedUsersQuery({ page: page, limit: 25, username: username });
  const { data: popularUsers, isLoading: isLoadingPopular }         = useGetPopularUsersQuery({ page: page, limit: 25, username: username });

  const users     = me ? recommendedUsers : popularUsers;
  const isLoading = me ? isLoadingRecommended : isLoadingPopular;

  return { users, isLoading };
}