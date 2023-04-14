import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'redis/redis.module';
import { AuthModule } from 'auth/auth.module';
import { UsersModule } from 'users/users.module';
import { RolesModule } from 'roles/roles.module';
import { BooksModule } from './books/books.module';

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
    //RedisModule,
    //AuthModule,
    UsersModule,
    BooksModule,
    //RolesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
