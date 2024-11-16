import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { WellsService } from './wells.service';
import { CreateWellDto } from './dto/create-well.dto';
import { UpdateWellDto } from './dto/update-well.dto';

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
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wellsService.findOne(+id);
  }

  // 4. Обновление данных о скважине
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWellDto: UpdateWellDto) {
    return this.wellsService.update(+id, updateWellDto);
  }

  // 5. Удаление записи о скважине
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wellsService.remove(+id);
  }

  // 6. Топ-10 самых производительных или энергозатратных скважин
  @Get('top/:type')
  getTopWells(@Param('type') type: 'debit' | 'ee_consume') {
    return this.wellsService.getTopWells(type);
  }

  // 7. Подсчёт записей по скважинам
  @Get('counts')
  getWellCounts() {
    return this.wellsService.getWellCounts();
  }

  // 8. Суммарный объём добытой нефти за период для конкретной скважины
  @Get('debit/total')
  getTotalDebit(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('wellId') wellId: string,
  ) {
    return this.wellsService.getTotalDebitByWell(
      new Date(startDate),
      new Date(endDate),
      +wellId,
    );
  }
}
