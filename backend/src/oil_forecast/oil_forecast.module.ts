import { Module } from '@nestjs/common';
import { OilForecastService } from './oil_forecast.service';
import { OilForecastController } from './oil_forecast.controller';

@Module({
  controllers: [OilForecastController],
  providers: [OilForecastService],
})
export class OilForecastModule {}
