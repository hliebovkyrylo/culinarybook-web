import { useRouter }         from "next/router";
import { FunctionComponent } from "react";
import { Loader }            from "@/components/Loader";
import { useGetMeQuery }     from "@/lib/api/userApi";

export const RequireAuth = <Props extends object>(Component: FunctionComponent<Props>) => (props: Props) => {
  const { data: user, isLoading: isMeLoading } = useGetMeQuery();

  const router = useRouter();

  if (isMeLoading) {
    return <Loader className="absolute top-0 left-0" />
  }

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