/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Genre } from './genre.model';
import { ImageGenreService } from 'image_genre/image_genre.service';

@Injectable()
export class GenresService {

  constructor(
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>,
    private imageGenreService: ImageGenreService
  ) { }

  async createGenre(dto: CreateGenreDto): Promise<Genre>{
    const image = await this.imageGenreService.add(dto.image)
    const genre = this.genresRepository.create({
      ...dto
    });
    genre.image = image
    await this.genresRepository.save(genre)
    return genre;
  }

  async getAllGenres() {
    const genres = await this.genresRepository.find({
      relations: {
        image: true
      }
    });
    return genres;
  }

  async getGenreById(id: number) {
    const genre = await this.genresRepository.findOne({
      where: {
        id
      },
      relations: {
        books: true,
        image: true
      }
    })
    return genre;
  }

  async removeGenre(id: number): Promise<boolean> {
    await this.genresRepository.delete(id)
    return true
  }
}
