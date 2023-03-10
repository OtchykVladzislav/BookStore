/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.model';
import { AuthModule } from 'auth/auth.module';
import { Role } from 'roles/roles.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    forwardRef(() => AuthModule),

  ],
  providers: [UsersService],
  exports: [
    UsersService,
  ],
  controllers: [UsersController],
})
export class UsersModule {

}
