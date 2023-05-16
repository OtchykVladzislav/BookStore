/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresController } from './genre.controller';
import { Genre } from './genre.model';
import { GenresService } from './genre.service';
import { AuthModule } from 'auth/auth.module';
import { ImageGenreModule } from 'image_genre/image_genre.module';
import { Image_Genre } from 'image_genre/image_genre.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Genre, Image_Genre]),
    forwardRef(() => ImageGenreModule),
    AuthModule
  ],
  exports: [GenresService],
  providers: [GenresService],
  controllers: [GenresController],
})

export class GenreModule {}
