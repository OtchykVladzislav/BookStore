import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusRequestsController } from './status_requests.controller';
import { Status_Request } from './status_requests.model';
import { StatusRequestsService } from './status_requests.service';
import { AuthModule } from 'auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Status_Request]),
    AuthModule
  ],
  controllers: [StatusRequestsController],
  providers: [StatusRequestsService],
  exports: [StatusRequestsService]
})
export class StatusRequestsModule {}
