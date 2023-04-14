/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresController } from './genre.controller';
import { Genre } from './genre.model';
import { GenresService } from './genre.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Genre]),
  ],
  providers: [GenresService],
  exports: [
    GenresService
  ],
  controllers: [GenresController],
})
export class UsersModule {

}
