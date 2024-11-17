import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OilForecastService } from './oil_forecast.service';
import * as multer from 'multer';

@Controller('oil-forecast')
export class OilForecastController {
  constructor(private readonly oilForecastService: OilForecastService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) =>
          cb(null, `${Date.now()}-${file.originalname}`),
      }),
    }),
  )
  async uploadAndGenerateForecast(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    try {
      const forecastCsv = await this.oilForecastService.generateForecast(
        file.path,
      );
      return { forecast: forecastCsv };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error processing file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
