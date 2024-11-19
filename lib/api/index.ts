import { ApiError } from "@/typings/error";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { IAuthResponse } from "./authApi";

export const baseUrl = process.env.NEXT_PUBLIC_APP_API_URL as string;

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: "include",
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get("access_token");

    if (accessToken) {
      headers.set("Authorization", accessToken);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.data &&
    (result.error.data as ApiError).code === "jwt-expired"
  ) {
    try {
      const refreshResult = await baseQuery(
        { url: "/auth/refresh-token", method: "POST" },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const newAccessToken = (refreshResult.data as IAuthResponse)
          .access_token;

        Cookies.set("access_token", newAccessToken, { expires: 2 });

        if (typeof args === "string") {
          args = { url: args };
        }
        if (!args.headers) {
          args.headers = {};
        }

        if (args.headers instanceof Headers) {
          args.headers.set("Authorization", newAccessToken);
        } else if (Array.isArray(args.headers)) {
          args.headers.push(["Authorization", newAccessToken]);
        } else {
          args.headers["Authorization"] = newAccessToken;
        }

        result = await baseQuery(args, api, extraOptions);
      }
    } catch (error) {
      Cookies.remove("access_token");
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["user", "recipe"],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
