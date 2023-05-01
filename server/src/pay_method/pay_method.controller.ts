import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PayMethodService } from './pay_method.service';
import { CreatePayMethodDto } from './dto/create-pay_method.dto';
import { RolesGuard } from 'roles/roles.guards';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { Roles } from 'roles/roles.decorator';

@Controller('pay_method')
export class PayMethodController {
    constructor(private payMethodService: PayMethodService) { }

    @Get()
    getAll(){
        return this.payMethodService.getAll()
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Post()
    addGenre(@Body() dto: CreatePayMethodDto){
        return this.payMethodService.create(dto)
    }
}
