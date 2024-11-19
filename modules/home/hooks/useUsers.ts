import {
  useGetPopularUsersQuery,
  useGetRecommendedUsersQuery,
} from "@/lib/api/userApi";

export const useUsers = (me: boolean, page = 1, limit = 8) => {
  const query = me ? useGetRecommendedUsersQuery : useGetPopularUsersQuery;
  const { data: users, isLoading: isLoadingUsers } = query({ page, limit });

  return { users, isLoadingUsers };
};
