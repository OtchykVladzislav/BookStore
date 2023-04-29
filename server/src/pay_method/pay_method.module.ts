import { Module } from '@nestjs/common';
import { PayMethodController } from './pay_method.controller';
import { PayMethodService } from './pay_method.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pay_Method } from './pay_method.model';

@Module({
  imports: [TypeOrmModule.forFeature([Pay_Method])],
  controllers: [PayMethodController],
  providers: [PayMethodService]
})
export class PayMethodModule {}
