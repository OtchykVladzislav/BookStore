import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.model';
import { StatusOrdersModule } from 'status_orders/status_orders.module';
import { AuthModule } from 'auth/auth.module';
import { OrderBook } from './orderBook.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderBook]),
    StatusOrdersModule,
    AuthModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
