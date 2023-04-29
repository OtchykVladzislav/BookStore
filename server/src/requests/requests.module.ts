import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsController } from './requests.controller';
import { Request } from './requests.model';
import { RequestsService } from './requests.service';
import { StatusRequestsModule } from 'status_requests/status_requests.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request]),
    StatusRequestsModule
  ],
  controllers: [RequestsController],
  providers: [RequestsService]
})
export class RequestsModule {}
