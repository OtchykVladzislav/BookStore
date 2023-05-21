import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { Request } from './requests.model';
import { StatusRequestsService } from 'status_requests/status_requests.service';
import { User } from 'users/users.model';

@Injectable()
export class RequestsService {
    constructor(
        @InjectRepository(Request)
        private requestRepository: Repository<Request>,
        private statusRequestService: StatusRequestsService
    ) {}

    sortArr(str: string, array: Request[]): Request[]{
      switch(str){
        case 'numberIncrease': return [...array].sort((a,b) => a["count_copies"] - b["count_copies"])
        case 'numberDecrease': return [...array].sort((a,b) => b["count_copies"] - a["count_copies"])
        default : return array
      }
    }

    async findAll(limit: string, page: string): Promise<[Request[], number]> {
      const skip = (Number(limit) * Number(page)) - Number(limit);
      const [data, count] = await this.requestRepository.findAndCount({
        relations: {
          book: true,
          user: true,
          status: true,
          city: true
        },
        take: Number(limit),
        skip: skip,
      })
      return [data, count];
    }

    async filterItems(query: string, sort: string,limit: string, page: string): Promise<[Request[], number]> {
      const skip = Number(limit) * Number(page);
      const data = await this.requestRepository.find({
        relations: {
          book: true,
          user: true,
          status: true,
          city: true
        }
      })
      const arr = [...this.sortArr(sort, data).filter(e => e.user.username.includes(query))]
      if(arr.length >= skip + Number(limit) && page != '1') return [arr.slice(skip, skip + Number(limit)), arr.length];
      if(page == '1') return [arr, arr.length];
      return [arr.slice(skip), arr.length];
    }


    async findByUser(id: number): Promise<Request[]> {
      const data = await this.requestRepository.find({
          where: {
            user: { id }
          },
          relations: {
              book: true,
              format: true, 
              type: true,
              status: true
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
          book: true,
          format: true, 
          type: true,
          status: true,
          city: true
        }
      });
      return data;
  }

    async add(dto: CreateRequestDto, id: number): Promise<Request> {
      let book : any;
      const status = await this.statusRequestService.add()
      dto.book ? book = dto.book : book = null
      const data = this.requestRepository.create({...dto, book: book});
      data.user = {id} as User
      data.status = status
      return await this.requestRepository.save(data);
    }

    async edit(id: number, dto: CreateRequestDto, user: any): Promise<boolean> {
      const data = await this.requestRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          user: true,
        },
      });
      if (user.id !== data.user.id && user.roleWeight != 3) {
        throw new UnauthorizedException({ message: 'user has no rights' });
      }
      await this.requestRepository.update({ id }, { ...dto });
      return true;
    }

    async remove(id: number, user: any): Promise<boolean> {
      const data = await this.requestRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          user: true,
        },
      });
      await this.statusRequestService.delete(data.status.id)
      if (user.id !== data.user.id && user.roleWeight != 3) {
        throw new UnauthorizedException({ message: 'user has no rights' });
      }
      await this.requestRepository.remove(data);
      return true;
    }
}
