import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image_Book } from './image_book.model';
import { CreateImageBookDto } from './dto/create-image-book.dto';

@Injectable()
export class ImageBookService {
    constructor(
        @InjectRepository(Image_Book)
        private imageBookRepository: Repository<Image_Book>
    ) {}

    async add(dto: CreateImageBookDto): Promise<Image_Book> {
        const data = this.imageBookRepository.create({...dto});
        return await this.imageBookRepository.save(data);
      }
  
    async edit(id: number, dto: CreateImageBookDto): Promise<boolean> {
        await this.imageBookRepository.update({ id }, { ...dto });
        return true;
    }

    async remove(id: number): Promise<boolean> {
        await this.imageBookRepository.delete(id);
        return true;
    }
}
