import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/db/prisma.service'; // Сервис Prisma

@Injectable()
export class WellsService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Создание новой записи о скважине
  create(createWellDto) {
    return this.prisma.well.create({ data: createWellDto });
  }

  // 2. Получение всех скважин
  findAll() {
    return this.prisma.well.findMany();
  }

  // 3. Получение информации о скважине по ID
  findOne(well: number) {
    return this.prisma.well.findUnique({ where: { well } });
  }

  // 4. Обновление данных о скважине
  update(well: number, updateWellDto) {
    return this.prisma.well.update({
      where: { well },
      data: updateWellDto,
    });
  }

  // 6. Топ-10 самых производительных или энергозатратных скважин
  async getTopWells(type: 'debit' | 'ee_consume') {
    return this.prisma.well_day_histories.findMany({
      orderBy: { [type]: 'desc' },
      take: 10,
      select: {
        well: true,
        date_fact: true,
        [type]: true,
      },
    });
  }

  // 7. Подсчёт количества записей в разрезе скважин
  async getWellCounts() {
    return this.prisma.well_day_histories.groupBy({
      by: ['well'],
      _count: { _all: true },
    });
  }

  // 8. Суммарный объем добытой нефти за период для конкретной скважины
  async getTotalDebitByWell(startDate: Date, endDate: Date, wellId: number) {
    const result = await this.prisma.well_day_histories.aggregate({
      _sum: { debit: true },
      where: {
        date_fact: { gte: startDate, lte: endDate },
        well: wellId,
      },
    });
    return result._sum.debit || 0;
  }

  async getDailyDebit(wellId: number) {
    const result = await this.prisma.well_day_histories.findMany({
      select: {
        date_fact: true,
        debit: true,
      },
      where: {
        well: wellId,
      },
    });
    return result;
  }
}
