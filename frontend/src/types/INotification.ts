export interface INotification {
  id: number;
  type: string;
  well_id: number;
  text: string;
  is_read: boolean;
  user_id: number;
}
