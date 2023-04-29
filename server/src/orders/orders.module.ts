import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.model';
import { StatusOrdersModule } from 'status_orders/status_orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    StatusOrdersModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
