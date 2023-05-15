import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeDto } from './dto/create-type.dto';
import { Type } from './types.model';


@Injectable()
export class TypesService {

  constructor(
    @InjectRepository(Type)
    private typesRepository: Repository<Type>,
  ) { }

  async createType(dto: CreateTypeDto) {
    const data = await this.typesRepository.create({
      ...dto
    });
    await this.typesRepository.save(data)
    return data;
  }

  async getAllTypes() {
    const data = await this.typesRepository.find();
    return data;
  }

  async filterByName(query: string) {
    const data = await this.typesRepository.find();
    return data.filter(e => e.name.includes(query));
  }

  async getTypeByName(name: string) {
    const data = await this.typesRepository.findOne({
      where: {
        name
      }
    })
    return data;
  }

  async removeType(id: number): Promise<boolean> {
    await this.typesRepository.delete(id)
    return true
  }
}
