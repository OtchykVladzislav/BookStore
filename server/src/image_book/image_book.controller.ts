import { Body, Controller, Get, Param, Post, UseGuards, Req, Put} from '@nestjs/common';
import { ImageBookService } from './image_book.service';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { CreateImageBookDto } from './dto/create-image-book.dto';
import { CreateBookDto } from 'books/dto/create-book.dto';

@Controller('image_book')
export class ImageBookController {
    constructor(private imageBookService: ImageBookService) { }

    @UseGuards(JwtAuthGuard)
    @Post('/create_book')
    createBook(@Req() req: any, @Body() dto: CreateBookDto){
        return this.imageBookService.book(dto, req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/:id')
    create(@Param('id') id: number, @Body() dto: CreateImageBookDto){
        return this.imageBookService.add(dto, id)
    }


    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    edit(
        @Param('id') id: number,
        @Body() dto: CreateImageBookDto,
    ) {
        return this.imageBookService.edit(id, dto);
    }
}
