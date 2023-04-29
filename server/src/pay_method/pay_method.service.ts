import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pay_Method } from './pay_method.model';
import { Repository } from 'typeorm';
import { CreatePayMethodDto } from './dto/create-pay_method.dto';

@Injectable()
export class PayMethodService {
    constructor(
        @InjectRepository(Pay_Method)
        private payMethodRepository: Repository<Pay_Method>,
      ) { }
    
      async create(dto: CreatePayMethodDto) {
        const data = await this.payMethodRepository.create({
          ...dto
        });
        await this.payMethodRepository.save(data)
        return data;
      }
    
      async getAll() {
        const data = await this.payMethodRepository.find();
        return data;
      }
}
