import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image_Book } from './image_book.model';
import { CreateImageBookDto } from './dto/create-image-book.dto';
import { BooksService } from 'books/books.service';
import { CreateBookDto } from 'books/dto/create-book.dto';

@Injectable()
export class ImageBookService {
    constructor(
        @InjectRepository(Image_Book)
        private imageBookRepository: Repository<Image_Book>,
        private booksService: BooksService
    ) {}

    async book(dto: CreateBookDto, id: number){
        const save = await this.booksService.add(dto, id)
        const image = await this.add(dto.image, save.id)
        return {...save, image}
    }

    async add(dto: CreateImageBookDto, id: number): Promise<Image_Book> {
        const data = this.imageBookRepository.create({name: dto.name, type: dto.type});
        data.picByte = Buffer.from(dto.picByte, 'base64')
        const result = await this.imageBookRepository.save(data);
        await this.booksService.changeImage(id, result)
        return result
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
