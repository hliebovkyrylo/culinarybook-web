import { useRouter }             from "next/router";
import { FunctionComponent }     from "react";
import { useGetAuthStatusQuery } from "@/lib/api/authApi";
import { Loader }                from "@/components/shared";

export const requireGuest = <Props extends object>(Component: FunctionComponent<Props>) => (props: Props) => {
  const { data: authStatus, isLoading } = useGetAuthStatusQuery();
  const router                          = useRouter();

  if (isLoading) {
    return <Loader className="absolute top-0 left-0" />
  }

  if (authStatus?.isAuth) {
    router.push('/');
    return null
  }

  return (
    <Component {...props} />
  )
}