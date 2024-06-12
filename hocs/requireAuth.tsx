import { useRouter }             from "next/router";
import { FunctionComponent }     from "react";
import { useGetAuthStatusQuery } from "@/lib/api/authApi";
import { Loader }                from "@/components/Loader";
import { useGetMeQuery }         from "@/lib/api/userApi";

export const RequireAuth = <Props extends object>(Component: FunctionComponent<Props>) => (props: Props) => {
  const { data: user, isLoading: isMeLoading } = useGetMeQuery();
  const { data: authStatus, isLoading }        = useGetAuthStatusQuery();

  const router = useRouter();

  if (isLoading || isMeLoading) {
    return <Loader className="absolute top-0 left-0" />
  }

  if (!user?.isVerified) {
    router.push('/verify-account');
    return null;
  }

  if (!authStatus?.isAuth) {
    router.push('/sign-in');
    return null;
  }

  return (
    <Component {...props} />
  )
}