import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { Request } from './requests.model';
import { StatusRequestsService } from 'status_requests/status_requests.service';
import { Status_Request } from 'status_requests/status_requests.model';

@Injectable()
export class RequestsService {
    constructor(
        @InjectRepository(Request)
        private requestRepository: Repository<Request>,
        private statusRequestService: StatusRequestsService
    ) {}

    async findAll(): Promise<Request[]> {
        const data = await this.requestRepository.find({
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
          status: true
        }
      });
      return data;
  }

    async add(dto: CreateRequestDto): Promise<Request> {
      const status = await this.statusRequestService.add()
      const data = this.requestRepository.create({...dto});
      data.status = status
      await this.requestRepository.save(data);
      return data;
    }

    async edit(id: number, dto: CreateRequestDto): Promise<boolean> {
      const userId = 1;
      await this.requestRepository.update({ id }, { ...dto });
      return true;
    }

    async remove(id: number): Promise<boolean> {
      const userId = 1;
      await this.requestRepository.delete(id);
      return true;
    }
}
