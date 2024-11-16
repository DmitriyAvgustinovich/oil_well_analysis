import { PartialType } from '@nestjs/swagger';
import { CreateWellDto } from './create-well.dto';

export class UpdateWellDto extends PartialType(CreateWellDto) {}
