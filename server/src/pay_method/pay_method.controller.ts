import { Controller, Get, Post, Body } from '@nestjs/common';
import { PayMethodService } from './pay_method.service';
import { CreatePayMethodDto } from './dto/create-pay_method.dto';

@Controller('pay_method')
export class PayMethodController {
    constructor(private payMethodService: PayMethodService) { }

    @Get()
    getAll(){
        return this.payMethodService.getAll()
    }

    @Post()
    addGenre(@Body() dto: CreatePayMethodDto){
        return this.payMethodService.create(dto)
    }
}
