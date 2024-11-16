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

  @Post()
  create(@Body() createWellDto: CreateWellDto) {
    return this.wellsService.create(createWellDto);
  }

  @Get()
  findAll() {
    return this.wellsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wellsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWellDto: UpdateWellDto) {
    return this.wellsService.update(+id, updateWellDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wellsService.remove(+id);
  }

  // 1. Топ-10 самых производительных или энергозатратных скважин
  @Get('top/:type')
  getTopWells(@Param('type') type: 'debit' | 'ee_consume') {
    return this.wellsService.getTopWells(type);
  }

  // 2. Количество скважин в разрезе
  @Get('counts/:field')
  getWellCounts(@Param('field') field: 'field' | 'division' | 'department') {
    return this.wellsService.getWellCountsByField(field);
  }

  // 3. Суммарный объем добычи
  @Get('debit/total')
  getTotalDebit(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('divisionId') divisionId: string,
  ) {
    return this.wellsService.getTotalDebitByDivision(
      new Date(startDate),
      new Date(endDate),
      +divisionId,
    );
  }
}
