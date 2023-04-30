import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './city.model';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [CityController],
  providers: [CityService]
})
export class CityModule {}
