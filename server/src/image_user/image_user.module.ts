import { Module } from '@nestjs/common';
import { ImageUserController } from './image_user.controller';
import { ImageUserService } from './image_user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image_User } from './image_user.model';
import { UsersModule } from 'users/users.module';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image_User]),
    UsersModule,
    AuthModule
  ],
  controllers: [ImageUserController],
  providers: [ImageUserService]
})
export class ImageUserModule {}
