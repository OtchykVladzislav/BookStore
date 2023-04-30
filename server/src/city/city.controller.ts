import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';

@Controller('city')
export class CityController {
    constructor(private citiesService: CityService) { }

    @Get()
    getAll(){
        return this.citiesService.getAll()
    }

    @Post()
    add(@Body() dto: CreateCityDto){
        return this.citiesService.create(dto)
    }

    @Delete('/:id')
    delete(@Param('id') id: number){
        return this.citiesService.remove(id)
    }
}
