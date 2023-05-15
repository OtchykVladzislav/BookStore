import { Body, Controller, Delete, Get, Param, Post, UseGuards, Query } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { TypesService } from './types.service';
import { RolesGuard } from 'roles/roles.guards';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { Roles } from 'roles/roles.decorator';

@Controller('types')
export class TypesController {

    constructor(private typesService: TypesService) { }

    
    @Get()
    getAll(){
        return this.typesService.getAllTypes()
    }

    @Get('/search')
    filterItems(@Query('query') query: string) {
        return this.typesService.filterByName(query);
    }


    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Post()
    add(@Body() dto: CreateTypeDto){
        return this.typesService.createType(dto)
    }


    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    delete(@Param('id') id: number){
        return this.typesService.removeType(id)
    }
}
