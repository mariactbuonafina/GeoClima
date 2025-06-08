import { NotificationType } from '../types/notification.type';

export interface WeatherNotification {
  id: string;
  cityId: string;
  type: NotificationType;
  message: string;
  createdAt: number;
  read: boolean;
}