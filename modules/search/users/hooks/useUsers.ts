import { useGetPopularUsersQuery, useGetRecommendedUsersQuery } from "@/lib/api/userApi";

export const useUsers = (page: number, accessToken: string, username?: any) => {
  const { data: recommendedUsers, isLoading: isLoadingRecommended } = useGetRecommendedUsersQuery({ page: page, limit: 25, username: username });
  const { data: popularUsers, isLoading: isLoadingPopular }         = useGetPopularUsersQuery({ page: page, limit: 25, username: username });

  const users     = accessToken ? recommendedUsers : popularUsers;
  const isLoading = accessToken ? isLoadingRecommended : isLoadingPopular;

  return { users, isLoading };
}