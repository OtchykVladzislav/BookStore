import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesController } from './types.controller';
import { Type } from './types.model';
import { TypesService } from './types.service';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Type]),
    AuthModule
  ],
  controllers: [TypesController],
  providers: [TypesService]
})
export class TypesModule {}
