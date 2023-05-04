import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'users/users.model';
import { Book } from './books.model';
import { CreateBookDto } from './dto/create-book.dto';
import { Genre } from 'genre/genre.model';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>
    ) {}
    
    sortArr(str: string, array: Book[]): Book[]{
      switch(str){
        case 'titleIncrease': return [...array].sort((a,b) => a["name"].localeCompare(b["name"]))
        case 'titleDecrease': return [...array].sort((a,b) => b["name"].localeCompare(a["name"]))
        case 'priceIncrease': return [...array].sort((a,b) => a["price"] - b["price"])
        case 'priceDecrease': return [...array].sort((a,b) => b["price"] - a["price"])
        default : return array
      }
    }

    async bookWithoutProperties(): Promise<Book[]>{
      const data = await this.booksRepository.find()
      return data
    }

    async findAll(limit: string, page: string): Promise<[Book[], number]> {
        const skip = (Number(limit) * Number(page)) - Number(limit);
        const [data, count] = await this.booksRepository.findAndCount({
          relations: {
            genres: true,
          },
          take: Number(limit),
          skip: skip,
        })
        return [data, count];
    }

    async filterItems(query: string, sort: string,limit: string, page: string): Promise<[Book[], number]> {
      const skip = Number(limit) * Number(page);
      const data = await this.booksRepository.find({
        relations: {
          genres: true,
        }
      })
      const arr = [...this.sortArr(sort, data).filter(e => e.name.includes(query))]/*.slice(skip, skip + Number(limit))*/
      return [arr, arr.length != 0 ? arr.length : 1 ];
  }

    async findOne(id: number): Promise<Book> {
      const data = await this.booksRepository.findOne({
        where: {
          id
        },
        relations: {
          genres: true,
          comments: true
        },
      });
      return data;
  }

  async findAllBooksByGenre(id: number, limit: string, page: string): Promise<[Book[], number]> {
    const skip = (Number(limit) * Number(page)) - Number(limit);
    const [data, count] = await this.booksRepository.findAndCount({
      relations: ['genres'],
      where: {
        genres: {id}
      },
      take: Number(limit),
      skip: skip,
    })
    return [data, count];
  }

  
    async filterAllBooksByGenre(id: number, query: string, sort: string,limit: string, page: string): Promise<[Book[], number]>{
      const skip = Number(limit) * Number(page);
      const data = await this.booksRepository.find({
        relations: ['genres'],
        where: {
          genres: {id}
        },
      })
      const arr = [...this.sortArr(sort, data).filter(e => e.name.includes(query))]/*.slice(skip, skip + Number(limit))*/
      return [arr, arr.length != 0 ? arr.length : 1 ];
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
          genres: true,
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
        }
      });
      await this.booksRepository.delete(id);
      return true;
    }
}
