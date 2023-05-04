import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'books/books.model';
import { Repository } from 'typeorm';
import { User } from 'users/users.model';
import { Comment } from './comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>
    ) {}

    async findAll(id: number): Promise<Comment[]> {
        const data = await this.commentRepository.find({
            where: {
                book: { id: id } as Book
            },
            relations: {
                user: true,
            }
        })
        return data;
    }

    async findOne(id: number): Promise<Comment> {
      const data = await this.commentRepository.findOne({
        where: {
          id
        },
        relations: {
          user: true,
        },
      });
      return data;
  }

    async add(dto: CreateCommentDto): Promise<Comment> {
      const userId = 1
      const data = await this.commentRepository.create({
        ...dto,
        created: new Date().toISOString(),
        user: { id: userId } as User,
      });
      await this.commentRepository.save(data);
      return data;
    }

    async edit(id: number, dto: CreateCommentDto): Promise<boolean> {
      const userId = 1;
      const newsId = await this.commentRepository.findOne({
        where: {
          id: userId,
        },
        relations: {
          user: true,
        },
      });
      await this.commentRepository.update({ id }, { ...dto });
      return true;
    }

    async remove(id: number): Promise<boolean> {
      const userId = 1;
      const dataId = await this.commentRepository.findOne({
        where: {
          id: id,
        }
      });
      await this.commentRepository.delete(id);
      return true;
    }
}
