import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'user@mail.com' })
  email: string;
  @ApiProperty({ example: 'Чайковский' })
  surname: string;
  @ApiProperty({ example: 'Василий' })
  name: string;
  @ApiProperty({ example: 'Янович' })
  lastname: string;
  @ApiProperty({ example: Role.user })
  role: string;
}
