import { Module } from '@nestjs/common';
import { ImageGenreController } from './image_genre.controller';
import { ImageGenreService } from './image_genre.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image_Genre } from './image_genre.model';

@Module({
  imports: [TypeOrmModule.forFeature([Image_Genre])],
  exports: [ImageGenreService],
  controllers: [ImageGenreController],
  providers: [ImageGenreService]
})
export class ImageGenreModule {}
