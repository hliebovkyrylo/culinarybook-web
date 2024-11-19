import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { useGetMeQuery } from "@/lib/api/userApi";
import { Loader } from "@/components/Loader";

export const RequireGuest =
  <Props extends object>(Component: FunctionComponent<Props>) =>
  (props: Props) => {
    const { isLoading, isSuccess } = useGetMeQuery();
    const router = useRouter();

    if (isLoading) {
      return <Loader className="absolute top-0 left-0" />;
    }

    if (isSuccess) {
      router.push("/");
      return null;
    }

    return <Component {...props} />;
  };
