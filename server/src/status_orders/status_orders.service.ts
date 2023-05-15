import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status_Order } from './status_orders.model';
import { UsersService } from 'users/users.service';

@Injectable()
export class StatusOrderService {
    constructor(
        @InjectRepository(Status_Order)
        private statusOrderRepository: Repository<Status_Order>,
        private userService: UsersService
    ) {}

    async add(): Promise<Status_Order> {
        const data = this.statusOrderRepository.create({
          status: false
        });
        return await this.statusOrderRepository.save(data);
    }

    async edit(id: number, user_id: number, price: number): Promise<boolean> {
      const part = (price * 3)/100
      const user = await this.userService.getUserById(user_id)
      await this.statusOrderRepository.update({ id }, { status: true });
      await this.userService.addBonus(user_id, user.bonus + part)
      return true;
    }

    async delete(id: number): Promise<boolean>{
      await this.statusOrderRepository.delete(id)
      return true
    }
}
