/* eslint-disable prettier/prettier */
import { GenresService} from './genre.service';
import { Body, Controller, Get, Post, Delete, Param} from '@nestjs/common';
import { CreateGenreDto } from './dto/create-book.dto';


@Controller('genres')
export class GenresController {

    constructor(private genresService: GenresService) { }

    @Get()
    getAll(){
        return this.genresService.getAllGenres()
    }

    @Post()
    addGenre(@Body() dto: CreateGenreDto){
        return this.genresService.createGenre(dto)
    }

    @Delete('/:id')
    deleteGenre(@Param('id') id: number){
        return this.genresService.removeGenre(id)
    }
}
