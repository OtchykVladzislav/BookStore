import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image_Genre } from './image_genre.model';
import { CreateImageGenreDto } from './dto/create-image-genre.dto';

@Injectable()
export class ImageGenreService {
    constructor(
        @InjectRepository(Image_Genre)
        private imageGenreRepository: Repository<Image_Genre>
    ) {}

    async add(dto: CreateImageGenreDto, id: number): Promise<Image_Genre> {
        const data = this.imageGenreRepository.create({name: dto.name, type: dto.type});
        data.picByte = Buffer.from(dto.picByte, 'base64')
        const result = await this.imageGenreRepository.save(data);
        return result
      }
  
    async edit(id: number, dto: CreateImageGenreDto): Promise<boolean> {
        const buffer = Buffer.from(dto.picByte, 'base64')
        await this.imageGenreRepository.update({ id }, {name: dto.name, type: dto.type, picByte: buffer});
        return true;
    }

    async remove(id: number): Promise<boolean> {
        await this.imageGenreRepository.delete(id);
        return true;
    }
}
