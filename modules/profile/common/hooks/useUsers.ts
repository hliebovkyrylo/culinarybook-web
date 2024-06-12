import { useGetMeQuery, useGetUserQuery } from "@/lib/api/userApi";

export const useUsers = (userId: string) => {
  const { data: user, isLoading: isLoadingUser } = useGetUserQuery(userId);
  const { data: userMe, isLoading: isMeLoading } = useGetMeQuery();

  return { user, userMe, isLoadingUser, isMeLoading };
};