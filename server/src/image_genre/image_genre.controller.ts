import { Body, Controller, Get, Param, Post, UseGuards, Req, Put} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { ImageGenreService } from './image_genre.service';
import { CreateImageGenreDto } from './dto/create-image-genre.dto';

@Controller('image_genre')
export class ImageGenreController {
    constructor(private imageGenreService: ImageGenreService) { }

    @UseGuards(JwtAuthGuard)
    @Post('')
    getUser(@Req() req: any, @Body() dto: CreateImageGenreDto){
        return this.imageGenreService.add(dto, req.user.id)
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