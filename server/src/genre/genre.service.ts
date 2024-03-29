/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Genre } from './genre.model';
import { Image_Genre } from 'image_genre/image_genre.model';
import { ImageGenreService } from 'image_genre/image_genre.service';

@Injectable()
export class GenresService {

  constructor(
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>
  ) { }

  async createGenre(name: string): Promise<Genre>{
    const genre = this.genresRepository.create({name});
    return await this.genresRepository.save(genre)
  }

  async getAllGenres() {
    const genres = await this.genresRepository.find({
      relations: {
        image: true
      }
    });
    return genres;
  }

  async filterByName(query: string) {
    const data = await this.genresRepository.find();
    return data.filter(e => e.name.includes(query));
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

  async changeImage(id: number, image: Image_Genre){
    await this.genresRepository.update({id}, {image})
  }
}
