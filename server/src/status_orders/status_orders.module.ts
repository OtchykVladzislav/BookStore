import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusOrderService } from './status_orders.service';
import { Status_Order } from './status_orders.model';
import { StatusOrdersController } from './status_orders.controller';
import { AuthModule } from 'auth/auth.module';
import { UsersModule } from 'users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Status_Order]),
    UsersModule,
    AuthModule
  ],
  controllers: [StatusOrdersController],
  providers: [StatusOrderService],
  exports: [StatusOrderService]
})
export class StatusOrdersModule {}
