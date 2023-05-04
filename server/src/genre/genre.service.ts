/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Genre } from './genre.model';

@Injectable()
export class GenresService {

  constructor(
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>,
  ) { }

  async createGenre(dto: CreateGenreDto) {
    const genre = await this.genresRepository.create({
      ...dto
    });
    await this.genresRepository.save(genre)
    return genre;
  }

  async getAllGenres() {
    const genres = await this.genresRepository.find();
    return genres;
  }

  async getGenreById(id: number) {
    const genre = await this.genresRepository.findOne({
      where: {
        id
      },
      relations: {
        books: true
      }
    })
    return genre;
  }

  async removeGenre(id: number): Promise<boolean> {
    await this.genresRepository.delete(id)
    return true
  }
}
