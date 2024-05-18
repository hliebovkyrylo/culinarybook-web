import { useGetPopularUsersQuery, useGetRecommendedUsersQuery } from "@/lib/api/userApi";

export const useUsers = (accessToken: string, page = 1, limit = 8) => {
  const { data: recommendedUsers, isLoading: isLoadingRecommendedUsers } = useGetRecommendedUsersQuery({ page, limit });
  const { data: popularUsers, isLoading: isLoadingPopularUsers }         = useGetPopularUsersQuery({ page, limit });

  const users          = accessToken ? recommendedUsers : popularUsers;
  const isLoadingUsers = accessToken ? isLoadingRecommendedUsers : isLoadingPopularUsers;

  return { users, isLoadingUsers };
}