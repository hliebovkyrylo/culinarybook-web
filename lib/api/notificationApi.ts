import { INotification } from "@/typings/notification";
import { api } from ".";

export type NotificationsResponse = INotification[];

export const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyAllNotifications: builder.query<NotificationsResponse, void>({
      query: () => ({
        url: "/notification/get/my/all",
      }),
      keepUnusedDataFor: 1,
    }),
    getMyAllUnreadedNotifications: builder.query<NotificationsResponse, void>({
      query: () => ({
        url: "/notification/get/my/all/unreaded",
      }),
    }),
  }),
});

export const {
  useGetMyAllNotificationsQuery,
  useGetMyAllUnreadedNotificationsQuery,
} = notificationApi;
