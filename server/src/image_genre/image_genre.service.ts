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

    async add(dto: CreateImageGenreDto): Promise<Image_Genre> {
        const data = this.imageGenreRepository.create({...dto});
        return await this.imageGenreRepository.save(data);
      }
  
    async edit(id: number, dto: CreateImageGenreDto): Promise<boolean> {
        await this.imageGenreRepository.update({ id }, { ...dto });
        return true;
    }

    async remove(id: number): Promise<boolean> {
        await this.imageGenreRepository.delete(id);
        return true;
    }
}
