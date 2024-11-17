import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ExecutionContext,
  Req,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { User } from 'src/utils/users/user.decorator';
import { JwtService } from '@nestjs/jwt';
import { CookieService } from 'src/utils/cookie/cookie.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private jwtService: JwtService,
  ) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get('unread')
  findOneByIsRead(@Req() req: any) {
    const token = req.cookies[CookieService.tokenKey];
    const user = this.jwtService.decode(token);
    return this.notificationsService.findByUserUnread(user['id']);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.notificationsService.findOne(+id);
  }

  @Post(':id/mark-as-read')
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
