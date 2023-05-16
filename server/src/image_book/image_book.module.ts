import { Module, forwardRef } from '@nestjs/common';
import { ImageBookController } from './image_book.controller';
import { ImageBookService } from './image_book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image_Book } from './image_book.model';
import { BooksModule } from 'books/books.module';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image_Book]),
    forwardRef(() => BooksModule),
    AuthModule
  ],
  exports: [ImageBookService],
  controllers: [ImageBookController],
  providers: [ImageBookService]
})
export class ImageBookModule {}
