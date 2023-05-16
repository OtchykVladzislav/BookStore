import { Body, Controller, Get, Param, Post, UseGuards, Req, Put} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { ImageGenreService } from './image_genre.service';
import { CreateImageGenreDto } from './dto/create-image-genre.dto';
import { CreateGenreDto } from 'genre/dto/create-genre.dto';

@Controller('image_genre')
export class ImageGenreController {
    constructor(private imageGenreService: ImageGenreService) { }

    @UseGuards(JwtAuthGuard)
    @Post('/create_genre')
    createGenre(@Body() dto: CreateGenreDto){
        return this.imageGenreService.genre(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/:id')
    create(@Param('id') id: number, @Body() dto: CreateImageGenreDto){
        return this.imageGenreService.add(dto, id)
    }


    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    edit(
        @Param('id') id: number,
        @Body() dto: CreateImageGenreDto,
    ) {
        return this.imageGenreService.edit(id, dto);
    }

}