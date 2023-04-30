import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { TypesService } from './types.service';

@Controller('types')
export class TypesController {

    constructor(private typesService: TypesService) { }

    @Get()
    getAll(){
        return this.typesService.getAllTypes()
    }

    @Post()
    add(@Body() dto: CreateTypeDto){
        return this.typesService.createType(dto)
    }

    @Delete('/:id')
    delete(@Param('id') id: number){
        return this.typesService.removeType(id)
    }
}
