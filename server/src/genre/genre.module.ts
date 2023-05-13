/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresController } from './genre.controller';
import { Genre } from './genre.model';
import { GenresService } from './genre.service';
import { AuthModule } from 'auth/auth.module';
import { ImageGenreModule } from 'image_genre/image_genre.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Genre]),
    ImageGenreModule,
    AuthModule
  ],
  providers: [GenresService],
  exports: [
    GenresService
  ],
  controllers: [GenresController],
})

export class GenreModule {}
