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
import { CreateWellDto } from './dto/create-well.dto';
import { UpdateWellDto } from './dto/update-well.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('wells')
@Controller('wells')
export class WellsController {
  constructor(private readonly wellsService: WellsService) {}

  // 1. Создание записи о скважине
  @Post()
  create(@Body() createWellDto: CreateWellDto) {
    return this.wellsService.create(createWellDto);
  }

  // 2. Получение всех скважин
  @Get()
  findAll() {
    return this.wellsService.findAll();
  }

  // 3. Получение информации о конкретной скважине
  @Get(':well')
  findOne(@Param('well') well: number) {
    return this.wellsService.findOne(+well);
  }

  // 4. Обновление данных о скважине
  @Patch(':well')
  update(@Param('well') well: number, @Body() updateWellDto: UpdateWellDto) {
    return this.wellsService.update(+well, updateWellDto);
  }

  // 6. Топ-10 самых производительных или энергозатратных скважин
  @Get('top/:type')
  getTopWells(@Param('type') type: 'debit' | 'ee_consume') {
    return this.wellsService.getTopWells(type);
  }

  @Get('daily-report/:well')
  getDailyReport(@Param('well') well: number) {
    return this.wellsService.getDailyReport(+well);
  }
  // 7. Подсчёт записей по скважинам
  @Get('counts')
  getWellCounts() {
    return this.wellsService.getWellCounts();
  }

  // 8. Суммарный объём добытой нефти за период для конкретной скважины
  @Get('debit/total/:well')
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
  getDailyDebit(
    @Param('well') well: number,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ) {
    return this.wellsService.getDailyDebit(+well, startDate, endDate);
  }
}
