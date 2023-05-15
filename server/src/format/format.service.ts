import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Format } from './format.model';
import {CreateFormatDto} from './dto/create-format.dto'

@Injectable()
export class FormatService {
    constructor(
        @InjectRepository(Format)
        private formatsRepository: Repository<Format>,
      ) { }
    
      async createFormat(dto: CreateFormatDto) {
        const data = await this.formatsRepository.create({
          ...dto
        });
        await this.formatsRepository.save(data)
        return data;
      }
    
      async getAllFormats() {
        const data = await this.formatsRepository.find();
        return data;
      }


      async filterByName(query: string) {
        const data = await this.formatsRepository.find();
        return data.filter(e => e.name.includes(query));
      }
    
      async getFormatByName(name: string) {
        const data = await this.formatsRepository.findOne({
          where: {
            name
          }
        })
        return data;
      }
    
      async removeFormat(id: number): Promise<boolean> {
        await this.formatsRepository.delete(id)
        return true
      }
}
