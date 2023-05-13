import { Module } from '@nestjs/common';
import { ImageBookController } from './image_book.controller';
import { ImageBookService } from './image_book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image_Book } from './image_book.model';

@Module({
  imports: [TypeOrmModule.forFeature([Image_Book])],
  controllers: [ImageBookController],
  providers: [ImageBookService]
})
export class ImageBookModule {}
