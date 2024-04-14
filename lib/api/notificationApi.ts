import { INotification } from "@/typings/notification";
import { api }           from ".";

export type INotificationsResponse = INotification[];

export const notificationApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllNotifications: builder.query<INotificationsResponse, void>({
      query: () => ({
        url: '/notification/getAll'
      })
    })
  })
});

export const {
  useGetAllNotificationsQuery,
} = notificationApi;