import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsInt } from 'class-validator';

export class CreateWellStringDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  well: number;

  @ApiProperty()
  @IsNotEmpty()
  date_fact: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  debit: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  ee_consume: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  expenses: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pump_operating: number;
}
export class CreateWellDateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  well: number;

  @ApiProperty()
  @IsNotEmpty()
  date_fact: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  debit: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  ee_consume: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  expenses: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pump_operating: number;
}
