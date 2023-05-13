import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image_User } from './image_user.model';
import { CreateImageUserDto } from './dto/create-image-user.dto';

@Injectable()
export class ImageUserService {
    constructor(
        @InjectRepository(Image_User)
        private imageUserRepository: Repository<Image_User>
    ) {}

    async add(dto: CreateImageUserDto): Promise<Image_User> {
        const data = await this.imageUserRepository.create({...dto});
        return await this.imageUserRepository.save(data);
      }
  
    async edit(id: number, dto: CreateImageUserDto): Promise<boolean> {
        await this.imageUserRepository.update({ id }, { ...dto });
        return true;
    }

    async remove(id: number): Promise<boolean> {
        await this.imageUserRepository.delete(id);
        return true;
    }
}
