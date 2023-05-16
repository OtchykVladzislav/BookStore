import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { Book } from './books.model';
import { BooksService } from './books.service';
import { AuthModule } from 'auth/auth.module';
import { ImageBookModule } from 'image_book/image_book.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    forwardRef(() => ImageBookModule),
    AuthModule
  ],
  exports: [BooksService],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
