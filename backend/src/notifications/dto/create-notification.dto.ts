import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  type: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  wall_id: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  user_id: number
}
