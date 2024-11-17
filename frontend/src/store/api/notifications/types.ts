import { INotification } from "types";

export type TGetAllNotificationsResponse = INotification[];
export type TGetAllNotificationsRequest = void;

export type TGetUnreadNotificationsResponse = INotification[];
export type TGetUnreadNotificationsRequest = void;

export type TMarkNotificationAsReadResponse = void;
export interface IMarkNotificationAsReadRequest {
  id: number;
}
