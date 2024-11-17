import { rtkApi } from "../rtk-api";
import {
  IMarkNotificationAsReadRequest,
  TGetAllNotificationsRequest,
  TGetAllNotificationsResponse,
  TGetUnreadNotificationsRequest,
  TGetUnreadNotificationsResponse,
  TMarkNotificationAsReadResponse,
} from "./types";

const notificationsApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query<
      TGetAllNotificationsResponse,
      TGetAllNotificationsRequest
    >({
      query: () => `/notifications`,
      providesTags: ["Notifications"],
    }),

    getUnreadNotifications: builder.query<
      TGetUnreadNotificationsResponse,
      TGetUnreadNotificationsRequest
    >({
      query: () => `/notifications/unread`,
      providesTags: ["Notifications"],
    }),

    markNotificationAsRead: builder.mutation<
      TMarkNotificationAsReadResponse,
      IMarkNotificationAsReadRequest
    >({
      query: (body) => ({
        url: `/notifications/${body.id}/mark-as-read`,
        method: "POST",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetUnreadNotificationsQuery,
  useMarkNotificationAsReadMutation,
} = notificationsApi;
