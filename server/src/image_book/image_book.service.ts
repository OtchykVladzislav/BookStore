import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image_Book } from './image_book.model';
import { CreateImageBookDto } from './dto/create-image-book.dto';
import { BooksService } from 'books/books.service';

@Injectable()
export class ImageBookService {
    constructor(
        @InjectRepository(Image_Book)
        private imageBookRepository: Repository<Image_Book>,
        private booksService: BooksService
    ) {}

    async add(dto: CreateImageBookDto, id: number): Promise<boolean> {
        const data = this.imageBookRepository.create({name: dto.name, type: dto.type});
        data.picByte = Buffer.from(dto.picByte, 'base64')
        const result = await this.imageBookRepository.save(data);
        await this.booksService.changeImage(id, result)
        return true
      }
  
    async edit(id: number, dto: CreateImageBookDto): Promise<boolean> {
        const buffer = Buffer.from(dto.picByte, 'base64')
        await this.imageBookRepository.update({ id }, {name: dto.name, type: dto.type, picByte: buffer});
        return true;
    }

    async remove(id: number): Promise<boolean> {
        await this.imageBookRepository.delete(id);
        return true;
    }
}
