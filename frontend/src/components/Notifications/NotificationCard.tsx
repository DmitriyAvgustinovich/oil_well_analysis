import React from "react";

import { Card, Button, Typography } from "antd";

import { useMarkNotificationAsReadMutation } from "store/api/notifications/notifications-api";

interface NotificationCardProps {
  id: number;
  text: string;
  isRead: boolean;
  type: string;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  id,
  text,
  isRead,
  type,
}) => {
  const [markAsRead, { isLoading }] = useMarkNotificationAsReadMutation();

  const handleMarkAsRead = async () => {
    try {
      await markAsRead({ id }).unwrap();
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  return (
    <Card
      title={
        <Typography.Text>
          {type === "report_ready"
            ? "Отчет готов"
            : "Предупреждение о неисправности"}
        </Typography.Text>
      }
      style={{
        borderLeft: `4px solid ${isRead ? "#52c41a" : "#ff4d4f"}`,
        marginBottom: 16,
      }}
    >
      <Typography.Text>{text}</Typography.Text>
      <div style={{ marginTop: 8 }}>
        {!isRead && (
          <Button
            type="primary"
            size="small"
            onClick={handleMarkAsRead}
            loading={isLoading}
          >
            Пометить как прочитанное
          </Button>
        )}
      </div>
    </Card>
  );
};
