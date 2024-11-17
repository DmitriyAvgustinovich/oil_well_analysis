import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/utils/db/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}
  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return this.prisma.notifications.findMany();
  }

  findOne(id: number) {
    try {
      return this.prisma.notifications.findUnique({ where: { id } });
    } catch (error) {
      return null;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }

  async findByUserUnread(userId: number) {
    return this.prisma.notifications.findMany({
      where: {
        user_id: userId,
        is_read: false,
      },
    });
  }

  async markAsRead(id: number) {
    return this.prisma.notifications.update({
      where: { id },
      data: { is_read: true },
    });
  }
}
