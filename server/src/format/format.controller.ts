import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateFormatDto } from './dto/create-format.dto';
import { FormatService } from './format.service';

@Controller('format')
export class FormatController {
    constructor(private formatsService: FormatService) { }

    @Get()
    getAll(){
        return this.formatsService.getAllFormats()
    }

    @Post()
    add(@Body() dto: CreateFormatDto){
        return this.formatsService.createFormat(dto)
    }

    @Delete('/:id')
    delete(@Param('id') id: number){
        return this.formatsService.removeFormat(id)
    }
}
