import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image_User } from './image_user.model';
import { CreateImageUserDto } from './dto/create-image-user.dto';
import { UsersService } from 'users/users.service';

@Injectable()
export class ImageUserService {
    constructor(
        @InjectRepository(Image_User)
        private imageUserRepository: Repository<Image_User>,
        private userService: UsersService
    ) {}

    async add(dto: CreateImageUserDto, id: number): Promise<true> {
        const data = this.imageUserRepository.create({name: dto.name, type: dto.type});
        data.picByte = Buffer.from(dto.picByte, 'base64')
        const result = await this.imageUserRepository.save(data);
        await this.userService.changeImage(id, result)
        return true
      }
  
    async edit(id: number, dto: CreateImageUserDto): Promise<boolean> {
        const buffer = Buffer.from(dto.picByte, 'base64')
        await this.imageUserRepository.update({ id }, {name: dto.name, type: dto.type, picByte: buffer});
        return true;
    }

    async remove(id: number): Promise<boolean> {
        await this.imageUserRepository.delete(id);
        return true;
    }
}
