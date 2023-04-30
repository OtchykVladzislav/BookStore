import { Injectable } from '@nestjs/common';
import { City } from './city.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(City)
        private citiesRepository: Repository<City>,
      ) { }
    
      async create(dto: CreateCityDto) {
        const data = await this.citiesRepository.create({
          ...dto
        });
        await this.citiesRepository.save(data)
        return data;
      }
    
      async getAll() {
        const data = await this.citiesRepository.find();
        return data;
      }
    
      async getByName(name: string) {
        const data = await this.citiesRepository.findOne({
          where: {
            name
          }
        })
        return data;
      }
    
      async remove(id: number): Promise<boolean> {
        await this.citiesRepository.delete(id)
        return true
      }
}
