import {
  useGetPopularUsersQuery,
  useGetRecommendedUsersQuery,
} from "@/lib/api/userApi";

export const useUsers = (page: number, me?: boolean, username?: any) => {
  const query = me ? useGetRecommendedUsersQuery : useGetPopularUsersQuery;
  const { data: users, isLoading } = query({
    page: page,
    limit: 25,
    username: username,
  });

  return { users, isLoading };
};
