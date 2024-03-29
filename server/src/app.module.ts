import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'users/users.module';
import { BooksModule } from './books/books.module';
import { GenreModule } from 'genre/genre.module';
import { CommentsModule } from 'comment/comment.module';
import { TypesModule } from './types/types.module';
import { FormatModule } from './format/format.module';
import { RequestsModule } from './requests/requests.module';
import { StatusRequestsModule } from './status_requests/status_requests.module';
import { StatusOrdersModule } from 'status_orders/status_orders.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from 'auth/auth.module';
import { RedisModule } from 'redis/redis.module';
import { RolesModule } from 'roles/roles.module';
import { CityModule } from './city/city.module';
import { ImageUserModule } from './image_user/image_user.module';
import { ImageGenreModule } from './image_genre/image_genre.module';
import { ImageBookModule } from './image_book/image_book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: +process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AppModule,
    RedisModule,
    AuthModule,
    UsersModule,
    BooksModule,
    GenreModule,
    CommentsModule,
    TypesModule,
    FormatModule,
    RequestsModule,
    StatusRequestsModule,
    StatusOrdersModule,
    OrdersModule,
    RolesModule,
    CityModule,
    ImageUserModule,
    ImageGenreModule,
    ImageBookModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
