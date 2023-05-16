import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image_Genre } from './image_genre.model';
import { CreateImageGenreDto } from './dto/create-image-genre.dto';
import { GenresService } from 'genre/genre.service';
import { CreateGenreDto } from 'genre/dto/create-genre.dto';

@Injectable()
export class ImageGenreService {
    constructor(
        @InjectRepository(Image_Genre)
        private imageGenreRepository: Repository<Image_Genre>,
        private genresService: GenresService
    ) {}

    async genre(dto: CreateGenreDto){
        const save = await this.genresService.createGenre(dto.name)
        const image = await this.add(dto.image, save.id)
        return {...save, image}
    }

    async add(dto: CreateImageGenreDto, id: number): Promise<Image_Genre> {
        const data = this.imageGenreRepository.create({name: dto.name, type: dto.type});
        data.picByte = Buffer.from(dto.picByte, 'base64')
        const result = await this.imageGenreRepository.save(data);
        await this.genresService.changeImage(id, result)
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
