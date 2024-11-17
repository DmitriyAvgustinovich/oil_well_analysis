import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/db/prisma.service'; // Сервис Prisma
import { Well } from './entities/well.entity';

@Injectable()
export class WellsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new well record.
   *
   * @param {object} createWellDto - The data to create a new well record.
   * @returns {Promise<object>} The created well record.
   */
  create(createWellDto) {
    return this.prisma.well.create({ data: createWellDto });
  }

  /**
   * Retrieves all well records.
   *
   * @returns {Promise<object[]>} An array of all well records.
   */
  findAll() {
    return this.prisma.well.findMany();
  }

  /**
   * Retrieves a well record by its unique identifier.
   *
   * @param {number} well - The unique identifier of the well to retrieve.
   * @returns {Promise<object|null>} The well record if found, otherwise null.
   */
  findOne(well: number) {
    return this.prisma.well.findUnique({ where: { well } });
  }

  /**
   * Updates a well record.
   *
   * @param {number} well - The ID of the well record to update.
   * @param {object} updateWellDto - The updated data for the well record.
   * @returns {Promise<object>} The updated well record.
   */
  update(well: number, updateWellDto) {
    return this.prisma.well.update({
      where: { well },
      data: updateWellDto,
    });
  }

  /**
   * Retrieves the top 10 wells by debit or energy consumption.
   *
   * @param {'debit' | 'ee_consume'} type - The type of sorting (debit or energy consumption).
   * @returns {Promise<object[]>} An array of the top 10 wells.
   */
  async getTopWells(type: 'debit' | 'ee_consume') {
    const result = await this.prisma.well_day_histories.groupBy({
      by: ['well'],
      _sum: { [type]: true },
      orderBy: {
        _sum: { [type]: 'desc' },
      },
      take: 10,
    });

    return result.map((item) => ({ well: item.well, value: item._sum[type] }));
  }

  async getSpecificDebit(
    type: 'specific-debit-ee-consume' | 'specific-debit-expenses',
  ) {
    const field = type.slice(15).replace('-', '_');
    const result = await this.prisma.well_day_histories.groupBy({
      by: ['well'],
      _sum: {
        debit: true,
        [field]: true,
      },
    });
    return result
      .map((item) => ({
        well: item.well,
        value: item._sum.debit / item._sum[field],
      }))
      .sort((item1, item2) => item2.value - item1.value)
      .slice(0, 10);
  }
  /**
   * Retrieves the count of records for each well.
   *
   * @returns {Promise<Record<number, { _count: number }>>} An object with the well IDs as keys and a count of records for each well as value.
   */
  async getWellCounts() {
    return this.prisma.well_day_histories.groupBy({
      by: ['well'],
      _count: { _all: true },
    });
  }

  /**
   * Retrieves the total debit for the specified well over the given period.
   *
   * @param {Date} startDate - The start date of the period.
   * @param {Date} endDate - The end date of the period.
   * @param {number} wellId - The ID of the well.
   * @returns {Promise<number>} The total debit for the specified well over the given period.
   */
  async getTotalDebitByWell(startDate: Date, endDate: Date, wellId: number) {
    const whereCondition: any = { well: wellId };
    const obj = {
      _sum: { debit: true },
      where: await WellsService.mixInWhereClause(
        whereCondition,
        startDate,
        endDate,
      ),
    };
    const result = await this.prisma.well_day_histories.aggregate(obj as any);
    return result._sum.debit || 0;
  }

  /**
   * Retrieves the daily debit for the specified well over the given period.
   *
   * @param {number} wellId - The ID of the well.
   * @param {Date} [startDate] - The start date of the period.
   * @param {Date} [endDate] - The end date of the period.
   * @returns {Promise<{ date_fact: Date, debit: number }[]>} An array of objects with the date and debit for each day.
   */
  async getDailyDebit(wellId: number, startDate?: Date, endDate?: Date) {
    const whereCondition: any = { well: wellId };

    const result = await this.prisma.well_day_histories.findMany({
      select: {
        date_fact: true,
        debit: true,
      },
      where: await WellsService.mixInWhereClause(
        whereCondition,
        startDate,
        endDate,
      ),
    });

    return result;
  }

  /**
   * Retrieves the daily report for a specific well.
   *
   * @param {number} wellId - The ID of the well for which to generate the report.
   * @returns {Promise<object[]>} An array of records containing the daily report data for the specified well.
   */
  async getDailyReport(wellId: number, startDate?: Date, endDate?: Date) {
    const whereCondition: any = { well: wellId };
    const obj = {
      where: await WellsService.mixInWhereClause(
        whereCondition,
        startDate,
        endDate,
      ),
    };
    const result = await this.prisma.well_day_histories.findMany(obj);
    return result;
  }

  static async mixInWhereClause(object: any, startDate?: Date, endDate?: Date) {
    if (startDate || endDate) {
      object.date_fact = {
        ...(startDate && { gte: startDate }),
        ...(endDate && { lte: endDate }),
      };
    }

    return object;
  }
}
