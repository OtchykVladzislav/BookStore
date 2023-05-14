import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status_Order } from './status_orders.model';

@Injectable()
export class StatusOrderService {
    constructor(
        @InjectRepository(Status_Order)
        private statusOrderRepository: Repository<Status_Order>
    ) {}

    async add(): Promise<Status_Order> {
        const data = this.statusOrderRepository.create({
          status: false
        });
        return await this.statusOrderRepository.save(data);
    }

    async edit(id: number): Promise<boolean> {
      const data = await this.statusOrderRepository.findOne({
        where: {
          id: id,
        }
      });
      await this.statusOrderRepository.update({ id }, { status: true });
      return true;
    }

    async delete(id: number): Promise<boolean>{
      await this.statusOrderRepository.delete(id)
      return true
    }
}
