import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'books/books.model';
import { Repository } from 'typeorm';
import { User } from 'users/users.model';
import { CreateRequestDto } from './dto/create-request.dto';
import { Request } from './requests.model';

@Injectable()
export class RequestsService {
    constructor(
        @InjectRepository(Request)
        private requestRepository: Repository<Request>
    ) {}

    async findAll(id: number): Promise<Request[]> {
        const data = await this.requestRepository.find({
            where: {
                book: { id: id } as Book
            },
            relations: {
                user: true,
            }
        })
        return data;
    }

    async findOne(id: number): Promise<Request> {
      const data = await this.requestRepository.findOne({
        where: {
          id
        },
        relations: {
          user: true,
        },
      });
      return data;
  }

    async add(dto: CreateRequestDto): Promise<Request> {
      const userId = 1
      const data = await this.requestRepository.create({
        ...dto,
        user: { id: userId } as User,
      });
      await this.requestRepository.save(data);
      return data;
    }

    async edit(id: number, dto: CreateRequestDto): Promise<boolean> {
      const userId = 1;
      const newsId = await this.requestRepository.findOne({
        where: {
          id: userId,
        },
        relations: {
          user: true,
        },
      });
      await this.requestRepository.update({ id }, { ...dto });
      return true;
    }

    async remove(id: number): Promise<boolean> {
      const userId = 1;
      const dataId = await this.requestRepository.findOne({
        where: {
          id: id,
        }
      });
      await this.requestRepository.delete(id);
      return true;
    }
}
