import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { RolesGuard } from 'roles/roles.guards';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { Roles } from 'roles/roles.decorator';

@Controller('city')
export class CityController {
    constructor(private citiesService: CityService) { }

    @Get()
    getAll(){
        return this.citiesService.getAll()
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Post()
    add(@Body() dto: CreateCityDto){
        return this.citiesService.create(dto)
    }

    @Delete('/:id')
    delete(@Param('id') id: number){
        return this.citiesService.remove(id)
    }
}
