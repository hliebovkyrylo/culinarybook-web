import { INotification } from "@/typings/notification";
import { api }           from ".";

export type INotificationsResponse = INotification[];

export interface IUnreadedNotificationsCountResponse {
  unreadedNotifications: number;
}

export const notificationApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllNotifications: builder.query<INotificationsResponse, void>({
      query: () => ({
        url: '/notification/getAll'
      })
    }),
    getUnreadedNotificationsCount: builder.query<IUnreadedNotificationsCountResponse, void>({
      query: () => ({
        url: '/notification/unreaded/count'
      })
    }),
  })
});

export const {
  useGetAllNotificationsQuery,
  useGetUnreadedNotificationsCountQuery,
} = notificationApi;