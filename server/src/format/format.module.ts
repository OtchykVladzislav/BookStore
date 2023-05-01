import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatController } from './format.controller';
import { Format } from './format.model';
import { FormatService } from './format.service';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Format]),
    AuthModule
  ],
  controllers: [FormatController],
  providers: [FormatService]
})
export class FormatModule {}
