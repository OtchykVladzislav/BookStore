import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateFormatDto } from './dto/create-format.dto';
import { FormatService } from './format.service';
import { Roles } from 'roles/roles.decorator';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { RolesGuard } from 'roles/roles.guards';

@Controller('format')
export class FormatController {
    constructor(private formatsService: FormatService) { }

    @Get()
    getAll(){
        return this.formatsService.getAllFormats()
    }


    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Post()
    add(@Body() dto: CreateFormatDto){
        return this.formatsService.createFormat(dto)
    }


    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    delete(@Param('id') id: number){
        return this.formatsService.removeFormat(id)
    }
}
