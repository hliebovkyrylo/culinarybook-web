import { useGetMeQuery, useGetUserQuery } from "@/lib/api/userApi";

export const useUsers = (userId: string) => {
  const { data: user, isLoading: isLoadingUser } = useGetUserQuery(userId);
  const { data: userMe, isLoading: isMeLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true
  });

  return { user, userMe, isLoadingUser, isMeLoading };
};