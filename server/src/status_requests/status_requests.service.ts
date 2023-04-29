import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status_Request } from './status_requests.model';

@Injectable()
export class StatusRequestsService {
    constructor(
        @InjectRepository(Status_Request)
        private statusRequestRepository: Repository<Status_Request>
    ) {}

    async add(): Promise<Status_Request> {
        const data = await this.statusRequestRepository.create({
          status: false
        });
        return await this.statusRequestRepository.save(data);
      }
  
      async edit(id: number): Promise<boolean> {
        const data = await this.statusRequestRepository.findOne({
          where: {
            id: id,
          }
        });
        await this.statusRequestRepository.update({ id }, { status: true });
        return true;
      }
}
