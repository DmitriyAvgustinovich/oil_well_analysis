import React from "react";

import { Tabs, Typography, Empty } from "antd";

import {
  useGetAllNotificationsQuery,
  useGetUnreadNotificationsQuery,
} from "store/api/notifications/notifications-api";

import { NotificationCard } from "./NotificationCard";

export const Notifications: React.FC = () => {
  const { data: allNotifications } = useGetAllNotificationsQuery();
  const { data: unreadNotifications } = useGetUnreadNotificationsQuery();

  const renderNotifications = (notifications: any[] | undefined) => {
    if (!notifications || notifications.length === 0) {
      return <Empty description="Нет уведомлений" />;
    }

    return notifications.map((notification) => (
      <NotificationCard
        key={notification.id}
        id={notification.id}
        text={notification.text}
        isRead={notification.is_read}
        type={notification.type}
      />
    ));
  };

  const tabItems = [
    {
      key: "1",
      label: "Все уведомления",
      children: renderNotifications(allNotifications),
    },
    {
      key: "2",
      label: "Прочитанные уведомления",
      children: renderNotifications(allNotifications?.filter((n) => n.is_read)),
    },
    {
      key: "3",
      label: "Не прочитанные уведомления",
      children: renderNotifications(
        unreadNotifications ?? allNotifications?.filter((n) => !n.is_read)
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={2}>Уведомления</Typography.Title>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
};
