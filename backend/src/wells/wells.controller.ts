import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { WellsService } from './wells.service';
import { CreateWellDateDto, CreateWellStringDto } from './dto/create-well.dto';
import { UpdateWellDto } from './dto/update-well.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('wells')
@Controller('wells')
export class WellsController {
  constructor(private readonly wellsService: WellsService) {}

  // @Post()
  /**
   * Create a new well
   * @param createWellDto - data of the well to create
   * @returns created well
   */
  // create(@Body() createWellDto: CreateWellDto) {
  //   return this.wellsService.create(createWellDto);
  // }
  @Post()
  async createWellDayHistory(@Body() createWellDto: CreateWellStringDto) {
    const dateDto = {
      ...createWellDto,
      date_fact: new Date(createWellDto.date_fact),
    };
    return this.wellsService.createWellDayHistory(dateDto);
  }

  @Get()
  /**
   * Retrieve all wells
   * @returns an array of all wells
   */
  findAll() {
    return this.wellsService.findAll();
  }

  @Get(':well')
  /**
   * Retrieve a well by its ID
   * @param well - the ID of the well to retrieve
   * @returns the well with the given ID
   */
  findOne(@Param('well') well: number) {
    return this.wellsService.findOne(+well);
  }

  @Patch(':well')
  /**
   * Update a well
   * @param well - the ID of the well to update
   * @param updateWellDto - the new data for the well
   * @returns the updated well
   */
  update(@Param('well') well: number, @Body() updateWellDto: UpdateWellDto) {
    return this.wellsService.update(+well, updateWellDto);
  }

  @Get('top/:type')
  getTopWells(
    @Param('type')
    type:
      | 'debit'
      | 'ee_consume'
      | 'specific-debit-ee-consume'
      | 'specific-debit-expenses',
  ) {
    if (
      type === 'specific-debit-ee-consume' ||
      type === 'specific-debit-expenses'
    ) {
      return this.wellsService.getSpecificDebit(type);
    }
    return this.wellsService.getTopWells(type);
  }

  @Get('daily-report/:well')
  /**
   * Retrieves the daily report for a specific well.
   * @param well - The ID of the well for which to generate the report.
   * @returns An array of records containing the daily report data for the specified well.
   */
  getDailyReport(
    @Param('well') well: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    const parsedEndDate = endDate ? new Date(endDate) : undefined;
    return this.wellsService.getDailyReport(
      +well,
      parsedStartDate,
      parsedEndDate,
    );
  }

  @Get('counts')
  /**
   * Retrieves the count of records for each well.
   * @returns An object with the well IDs as keys and a count of records for each well as value.
   */
  getWellCounts() {
    return this.wellsService.getWellCounts();
  }

  @Get('debit/total/:well')
  /**
   * Retrieves the total debit for the specified well over the given period.
   * @param well - The ID of the well.
   * @param startDate - The start date of the period.
   * @param endDate - The end date of the period.
   * @returns The total debit for the specified well over the given period.
   */
  getTotalDebit(
    @Param('well') well: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.wellsService.getTotalDebitByWell(
      new Date(startDate),
      new Date(endDate),
      +well,
    );
  }

  @Get('debit/daily/:well')
  /**
   * Retrieves the daily debit for the specified well over the given period.
   * @param well - The ID of the well.
   * @param startDate - The start date of the period.
   * @param endDate - The end date of the period.
   * @returns An array of objects with the date and debit for each day.
   */
  getDailyDebit(
    @Param('well') well: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    const parsedEndDate = endDate ? new Date(endDate) : undefined;
    return this.wellsService.getDailyDebit(
      +well,
      parsedStartDate,
      parsedEndDate,
    );
  }
}
