import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusRequestsController } from './status_requests.controller';
import { Status_Request } from './status_requests.model';
import { StatusRequestsService } from './status_requests.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Status_Request])
  ],
  controllers: [StatusRequestsController],
  providers: [StatusRequestsService],
  exports: [StatusRequestsService]
})
export class StatusRequestsModule {}
