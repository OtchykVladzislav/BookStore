import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { StatusOrderService } from 'status_orders/status_orders.service';
import { User } from 'users/users.model';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        private statusOrderService: StatusOrderService
    ) {}

    async findAll(): Promise<Order[]> {
        const data = await this.orderRepository.find({
            relations: {
                pay_method: true,
                books: true,
                user: true,
                status: true,
                city: true
            }
        })
        return data;
    }

    async findOne(id: number): Promise<Order> {
      const data = await this.orderRepository.findOne({
        where: {
          id
        },
        relations: {
            pay_method: true,
            books: true,
            user: true,
            status: true,
            city: true
        }
      });
      return data;
  }

    async add(dto: CreateOrderDto): Promise<Order> {
      const status = await this.statusOrderService.add()
      const data = this.orderRepository.create({...dto});
      data.user = {id: 1} as User
      data.status = status
      await this.orderRepository.save(data);
      return data;
    }

    async edit(id: number, dto: CreateOrderDto): Promise<boolean> {
      const userId = 1;
      await this.orderRepository.update({ id }, { ...dto });
      return true;
    }

    async remove(id: number): Promise<boolean> {
      const userId = 1;
      await this.orderRepository.delete(id);
      return true;
    }
}
