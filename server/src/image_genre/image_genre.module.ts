import { Module, forwardRef } from '@nestjs/common';
import { ImageGenreController } from './image_genre.controller';
import { ImageGenreService } from './image_genre.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image_Genre } from './image_genre.model';
import { GenreModule } from 'genre/genre.module';
import { AuthModule } from 'auth/auth.module';
import { Genre } from 'genre/genre.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image_Genre, Genre]),
    forwardRef(() => GenreModule),
    AuthModule
  ],
  exports: [ImageGenreService],
  controllers: [ImageGenreController],
  providers: [ImageGenreService]
})
export class ImageGenreModule {}
