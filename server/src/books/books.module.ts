import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { Book } from './books.model';
import { BooksService } from './books.service';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    AuthModule
  ],
  exports: [BooksService],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
