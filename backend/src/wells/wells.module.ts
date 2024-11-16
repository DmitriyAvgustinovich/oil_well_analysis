import { Module } from '@nestjs/common';
import { WellsService } from './wells.service';
import { WellsController } from './wells.controller';
import { PrismaService } from '../utils/db/prisma.service'; // Добавьте Prisma сервис

@Module({
  controllers: [WellsController],
  providers: [WellsService, PrismaService],
})
export class WellsModule {}
