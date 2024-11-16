import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/db/prisma.service'; // Сервис Prisma
import { CreateWellDto } from './dto/create-well.dto';
import { UpdateWellDto } from './dto/update-well.dto';

@Injectable()
export class WellsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createWellDto: CreateWellDto) {
    return this.prisma.well.create({ data: createWellDto });
  }

  findAll() {
    return this.prisma.well.findMany();
  }

  findOne(id: number) {
    return this.prisma.well.findUnique({ where: { id } });
  }

  update(id: number, updateWellDto: UpdateWellDto) {
    return this.prisma.well.update({
      where: { id },
      data: updateWellDto,
    });
  }

  remove(id: number) {
    return this.prisma.well.delete({ where: { id } });
  }

  // 1. Топ-10 самых производительных или энергозатратных скважин
  async getTopWells(type: 'debit' | 'ee_consume') {
    return this.prisma.wellDayHistories.findMany({
      orderBy: { [type]: 'desc' },
      take: 10,
    });
  }

  // 2. Количество скважин в разрезе месторождений, цехов или подразделений
  async getWellCountsByField(field: 'field' | 'division' | 'department') {
    return this.prisma.well.groupBy({
      by: [field],
      _count: { _all: true },
    });
  }

  // 3. Суммарный объем добытой нефти за период в указанном подразделении
  async getTotalDebitByDivision(
    startDate: Date,
    endDate: Date,
    divisionId: number,
  ) {
    return this.prisma.wellDayHistories.aggregate({
      _sum: { debit: true },
      where: {
        date_fact: { gte: startDate, lte: endDate },
        well: { divisionId },
      },
    });
  }
}
