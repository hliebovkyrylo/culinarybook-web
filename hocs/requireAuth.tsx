import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { useGetMeQuery } from "@/lib/api/userApi";

export const RequireAuth = <Props extends object>(Component: FunctionComponent<Props>) => (props: Props) => {
  const { data: user, isLoading } = useGetMeQuery();

  const router = useRouter();

  if (isLoading) return null;

  if (user?.isVerified === false) {
    router.push('/verify-account');
    return null;
  }

  if (user?.canResetPassword) {
    router.push('/reset-password');
  }

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  return (
    <Component {...props} />
  )
}