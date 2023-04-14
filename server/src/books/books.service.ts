import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'users/users.model';
import { Book } from './books.model';
import { CreateBookDto } from './genre/dto/create-book.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>
    ) {}

    async findAll(limit: string, page: string): Promise<[Book[], number]> {
        const skip = (Number(limit) * Number(page)) - Number(limit);
        const [data, count] = await this.booksRepository.findAndCount({
          relations: {
            user: true,
          },
          take: Number(limit),
          skip: skip,
        })
        return [data, count];
    }

    async searchItems(query: string , limit: string, page: string): Promise<[Book[], number]> {
      const skip = (Number(limit) * Number(page)) - Number(limit);
      const data = await this.booksRepository.find({
        relations: {
          user: true,
        },
        take: Number(limit),
        skip: skip,
      })
      const arr = [...data.filter(e => e.name.includes(query))]
      return [arr, arr.length != 0 ? arr.length : 1 ];
  }

    async findOne(id: number): Promise<Book> {
      const data = await this.booksRepository.findOne({
        where: {
          id
        },
        relations: {
          user: true,
        },
      });
      return data;
  }

    async add(dto: CreateBookDto): Promise<Book> {
      const userId = 1
      const data = await this.booksRepository.create({
        ...dto,
        user: { id: userId } as User,
      });
      await this.booksRepository.save(data);
      return data;
    }

    async edit(id: number, dto: CreateBookDto): Promise<boolean> {
      const userId = 1;
      const newsId = await this.booksRepository.findOne({
        where: {
          id: userId,
        },
        relations: {
          user: true,
        },
      });
      await this.booksRepository.update({ id }, { ...dto });
      return true;
    }

    async remove(id: number): Promise<boolean> {
      const userId = 1;
      const dataId = await this.booksRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          user: true,
        },
      });
      await this.booksRepository.delete(id);
      return true;
    }
}
