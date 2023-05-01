import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './city.model';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([City]),
    AuthModule
  ],
  controllers: [CityController],
  providers: [CityService]
})
export class CityModule {}
