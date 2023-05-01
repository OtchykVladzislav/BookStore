import { Module } from '@nestjs/common';
import { PayMethodController } from './pay_method.controller';
import { PayMethodService } from './pay_method.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pay_Method } from './pay_method.model';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pay_Method]),
    AuthModule
  ],
  controllers: [PayMethodController],
  providers: [PayMethodService]
})
export class PayMethodModule {}
