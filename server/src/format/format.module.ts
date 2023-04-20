import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatController } from './format.controller';
import { Format } from './format.model';
import { FormatService } from './format.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Format])
  ],
  controllers: [FormatController],
  providers: [FormatService]
})
export class FormatModule {}
