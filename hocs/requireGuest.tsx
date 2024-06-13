import { useRouter }         from "next/router";
import { FunctionComponent } from "react";
import { useSelector }       from "react-redux";
import { IAppState }         from "@/lib/store";
import { useGetMeQuery }     from "@/lib/api/userApi";
import { Loader }            from "@/components/Loader";

export const RequireGuest = <Props extends object>(Component: FunctionComponent<Props>) => (props: Props) => {
  const accessToken   = useSelector((state: IAppState) => state.auth.access_token);
  const { isLoading } = useGetMeQuery();
  const router        = useRouter();

  if (isLoading) {
    return <Loader className="absolute top-0 left-0" />
  }

  if (accessToken) {
    router.push('/');
    return null
  }

  return (
    <Component {...props} />
  )
}