/* eslint-disable prettier/prettier */
import { GenresService} from './genre.service';
import { Body, Controller, Get, Post, Delete, Param, UseGuards, Query} from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { RolesGuard } from 'roles/roles.guards';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { Roles } from 'roles/roles.decorator';


@Controller('genres')
export class GenresController {

    constructor(private genresService: GenresService) { }

    @Get()
    getAll(){
        return this.genresService.getAllGenres()
    }

    @Get('/search')
    filterItems(@Query('query') query: string) {
        return this.genresService.filterByName(query);
    }

    @Get('/:id')
    getOne(@Param('id') id: number){
        return this.genresService.getGenreById(id)
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Post()
    addGenre(@Body() dto: CreateGenreDto){
        return this.genresService.createGenre(dto.name)
    }

    @UseGuards(RolesGuard)
    @Roles(3)
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    deleteGenre(@Param('id') id: number){
        return this.genresService.removeGenre(id)
    }
}
