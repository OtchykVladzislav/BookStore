import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from 'redis/redis.module';
import { AuthModule } from 'auth/auth.module';
import { UsersModule } from 'users/users.module';
import { RolesModule } from 'roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`,
      })],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        port: +configService.get('POSTGRES_PORT'),
        database: configService.get('POSTGRES_DB'),
        host: configService.get('POSTGRES_HOST'),
        entities: [],
        autoLoadEntities: true
      })
    }),
    AppModule,
    RedisModule,
    AuthModule,
    UsersModule,
    RolesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
